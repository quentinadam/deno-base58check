import assert from '@quentinadam/assert';
import Uint8ArrayExtension from '@quentinadam/uint8array-extension';
import sha256 from '@quentinadam/hash/sha256';
import * as base58 from '@quentinadam/base58';

function computeChecksum(buffer: Uint8Array) {
  return sha256(sha256(buffer)).slice(0, 4);
}

export function decode(string: string, options?: base58.Options): Uint8Array {
  const { buffer, checkSum } = (() => {
    const buffer = base58.decode(string, options);
    assert(buffer.length >= 4);
    return { buffer: buffer.slice(0, -4), checkSum: buffer.slice(-4) };
  })();
  assert(new Uint8ArrayExtension(computeChecksum(buffer)).equals(checkSum));
  return buffer;
}

export function encode(buffer: Uint8Array, options?: base58.Options): string {
  return base58.encode(Uint8ArrayExtension.concat([buffer, computeChecksum(buffer)]), options);
}
