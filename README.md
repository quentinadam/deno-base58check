# @quentinadam/base58check

[![JSR][jsr-image]][jsr-url] [![NPM][npm-image]][npm-url] [![CI][ci-image]][ci-url]

A simple library to encode and decode base58check strings.

Optionnaly supports specifying the alphabet to use.

## Usage

```ts
import * as base58check from '@quentinadam/base58check';

base58check.encode(new Uint8Array([72, 101, 108, 108, 111])); // returns 'vSxRbq6XzDhP'

base58check.decode('vSxRbq6XzDhP'); // returns Uint8Array([72, 101, 108, 108, 111])
```

[ci-image]: https://img.shields.io/github/actions/workflow/status/quentinadam/deno-base58check/ci.yml?branch=main&logo=github&style=flat-square
[ci-url]: https://github.com/quentinadam/deno-base58check/actions/workflows/ci.yml
[npm-image]: https://img.shields.io/npm/v/@quentinadam/base58check.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@quentinadam/base58check
[jsr-image]: https://jsr.io/badges/@quentinadam/base58check?style=flat-square
[jsr-url]: https://jsr.io/@quentinadam/base58check
