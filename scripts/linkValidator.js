const fs = require('fs');
const glob = require('glob');

const red = (text) => `\x1b[31m${text}\x1b[0m`;

/** @type {Array<{ ErrType: string, fileName: string, lineContent: string, lineNo: number }>} */
const errors = [];

const validateDocRules = (files) => {
/**
 * Check whether links are not staring with "wiki.fome.tech"
 * @param {Array<string>} files - List of file names to check
 */ 
  const wikiUrl = 'wiki.fome.tech';
  const regexPatternAbsLink = new RegExp(`\\]\\((https|http):\\/\\/${wikiUrl}`, 'i');
  const regexPatternMdLink = new RegExp(`\\/##.*\\.md{wikiUrl}`, 'i');

  console.log('Validating absolute URLs...');

  files.forEach((fileName) => {
    const lines = fs.readFileSync(fileName, 'utf8').split('\n');

    lines.forEach((line) => {
      if (regexPatternAbsLink.test(line)) {
        errors.push({
          ErrType:"AbsLink"
          ,fileName
          ,lineContent: line
          ,lineNo: lines.indexOf(line) + 1
        });
      }
      if (regexPatternMdLink.test(line)) {
        errors.push({
          ErrType:"MdLink"
          ,fileName
          ,lineContent: line
          ,lineNo: lines.indexOf(line) + 1
        });
      }
    });
  });

}

/**
 * Load all md and mdx files from / docs and process them
*/
const main = () => {
  const files = glob.sync('docs/**/*.md?(x)');
  
  // process
  validateDocRules(files);
  
  if (errors.length = 0) {
    console.log('✅ Ok');
  }
  else {
    /* ToDo: correct error messages */
    console.log('❌ Failed\n')
    console.log(red(`Absolute URLs to "${wikiUrl}" found in the following files:\n`));
    errors.forEach((error) => {
      console.log(
        `[${error.fileName}:${error.lineNo}] ${error.lineContent.trim()}`
      );
    });
  
    process.exit(1);
  }
}

main();
