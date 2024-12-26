# base58check

[![JSR](https://jsr.io/badges/@quentinadam/base58check)](https://jsr.io/@quentinadam/base58check)
[![CI](https://github.com/quentinadam/deno-base58check/actions/workflows/ci.yml/badge.svg)](https://github.com/quentinadam/deno-base58check/actions/workflows/ci.yml)

A simple library to encode and decode base58check strings.

Optionnaly supports specifying the alphabet to use.

## Usage

```ts
import * as base58check from '@quentinadam/base58check';

base58check.encode(new Uint8Array([72, 101, 108, 108, 111])); // returns 'vSxRbq6XzDhP'

base58check.decode('vSxRbq6XzDhP'); // returns Uint8Array([72, 101, 108, 108, 111])
```
