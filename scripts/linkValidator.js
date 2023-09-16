/*
* usage:
* note: Windows path separator used below! (to avoid error with parsing of this comment block)
* " node .\scripts\linkValidator.js 'docs\**\*.md?(x)' "
*
* for testing:
* "node linkValidator.js .\linkValidator.test.md"
*/

const fs = require('fs');
const glob = require('glob');

const red = (text) => `\x1b[31m${text}\x1b[0m`;

/** @type {Array<{ ErrType: string, fileName: string, lineContent: string, lineNo: number }>} */
const errors = [];
const wikiUrl = 'wiki.fome.tech';

const validateDocRules = (files) => {
  /**
   * Check whether links are adhering to custom rules
   * @param {Array<string>} files - List of file names to check
  */
  fileMatchIndicator = ""
  if (files.length == 0){
   throw new Error("UsageError: no files qualify!")
  }
  if (files.length > 1){
      fileMatchIndicator = `${files.length} files`
  } else {
      fileMatchIndicator = files[0]
  }
  console.log(`Validating rules for URL links in:  ${fileMatchIndicator}`);
 
  // * Check whether links are not staring with "https://wiki.fome.tech"
  // Note: dynamic javascript string interpolation is used here (see https://www.crstin.com/js-regex-interpolation/)
  const regexPatternDynAbsLink = new RegExp(`\\]\\((https|http):\\/\\/${wikiUrl}`, 'i');
  // hint: test static regex via https://regex101.com
  // * Check whether links are not using a "numbered prefix" like "(/01-blah)"
  const regexPatternStatNumPrefix = new RegExp(/\(.*\/\d\d\-.*\)/, 'i');
  // * Check whether links are not markdown links, meaning ending with .md or .mdx like "(/01-blah.md)"
  const regexPatternStatMdLink = new RegExp(/\(.*\.(md|mdx)\)/, 'i');

  files.forEach((fileName) => {
    const lines = fs.readFileSync(fileName, 'utf8').split('\n');

    lines.forEach((line) => {
      if (regexPatternDynAbsLink.test(line)) {
        errors.push({
          ErrType:"AbsLink"
          ,fileName
          ,lineContent: line
          ,lineNo: lines.indexOf(line) + 1
        });
      }
      if (regexPatternStatMdLink.test(line)) {
        errors.push({
          ErrType:"MdLink"
          ,fileName
          ,lineContent: line
          ,lineNo: lines.indexOf(line) + 1
        });
      }
      if (regexPatternStatNumPrefix.test(line)) {
        errors.push({
          ErrType:"NumPrefix"
          ,fileName
          ,lineContent: line
          ,lineNo: lines.indexOf(line) + 1
        });
      }
    });
  });
};

/**
 * Load all md and mdx files from / docs and process them
*/
const main = () => {
  // ToDo: add try + catch?
  const args = process.argv.slice(2);
  const files = glob.sync(args[0]);

  // process
  validateDocRules(files);
  
  if (errors.length == 0) {
    console.log('✅ Ok');
  }
  else {
    console.log('❌ Failed\n')
    console.log(red(`Number of Errors found: ${errors.length}`))
    errors.forEach((error) => {
      console.log(
        `[${error.fileName}][Line:${error.lineNo}][ErrType:${error.ErrType}]"${error.lineContent.trim()}"`
      );
    });
  
    process.exit(1);
  }
};

main();
