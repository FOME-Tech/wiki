# Tests for linkValidator.js

## 1. test case prevented by markdownlint MD034/no-bare-urls

[T] (https://wikiXfome.tech/01-test.md) 

## 2. test case prevented by markdownlint MD034/no-bare-urls

blah (https://wiki.fome.tech/01-test.md) 

## 3. test case expected: MdLink + AbsLink + NumPrefix

[T](https://wiki.fome.tech/01-test.md)

## 4. test case expected: false positive AbsLink

[T](https://wikiXfome.tech/test) # note: false positive, but extreme unlikely to hit in real world

## 5. test case expected: MdLink + NumPrefix

(/01-test.md)

## 6. test case expected: MdLink

(test.md)

## 7. test case expected: MdLink

(test.md) blah

## 8. test case expected: MdLink

blah (test.md) blah

## 9. test case expected: MdLink

(../test.mdx)

## 10. test case expected: no error

(T)(test.jpg)

## 11. test case expected: no error

(T)(../../test)

## 12. test case expected: NumPrefix

(/01-test)

