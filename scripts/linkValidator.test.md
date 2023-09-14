# Tests for linkValidator.js

## 1. test case prevented by markdownlint MD034/no-bare-urls

[T] (https://wikiXfome.tech/01-test.md) 

## 2. test case prevented by markdownlint MD034/no-bare-urls

blah (https://wiki.fome.tech/01-test.md) 

[T](https://wiki.fome.tech/01-test.md)
[T](https://wikiXfome.tech/01-test.md) # tbc: false positive but extreme unlikely to hit in real world
(/01-test.md)
(test.md)
(test.md) blah
blah (test.md) blah
[T] (test.md) blah
blah [T] (test.md) blah
../test.mdx
test.jpg
../../test.mdx
