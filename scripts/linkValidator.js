const fs = require('fs');
const glob = require('glob');

/**
 * Load all md and mdx files from /docs and check whether links are not staring with "wiki.fome.tech"
 * @param {Array<string>} files - List of file names to check
 */
const validateAbsoluteUrls = (files) => {
  const wikiUrl = 'wiki.fome.tech';
  const regexPattern = new RegExp(`\\]\\((https|http):\\/\\/${wikiUrl}`, 'i');

  /** @type {Array<{ fileName: string, lineContent: string, lineNo: number }>} */
  const errors = [];

  files.forEach((fileName) => {
    const lines = fs.readFileSync(fileName, 'utf8').split('\n');

    lines.forEach((line) => {
      if (regexPattern.test(line)) {
        errors.push({
          fileName,
          lineContent: line,
          lineNo: lines.indexOf(line) + 1,
        });
      }
    });
  });

  if (errors.length > 0) {
    console.log('❌ Failed\n');
    console.log(`Absolute URLs to "${wikiUrl}" found in the following files:\n`);
    errors.forEach((error) => {
      console.log(
        `[${error.fileName}:${error.lineNo}] ${error.lineContent.trim()}`
      );
    });

    process.exit(1);
  }

  console.log('✅ Ok');
}

const files = glob.sync('docs/**/*.md?(x)');

console.log('Validating links...');

validateAbsoluteUrls(files);
