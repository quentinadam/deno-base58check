import assert from '@quentinadam/assert';
import * as base58 from '@quentinadam/base58';
import sha256 from '@quentinadam/hash/sha256';
import * as Uint8ArrayExtension from '@quentinadam/uint8array-extension';

function computeChecksum(buffer: Uint8Array) {
  return sha256(sha256(buffer)).slice(0, 4);
}

/** Options for {@linkcode encode} and {@linkcode decode}. */
export interface Options {
  /**
   * The alphabet to use.
   * The alphabet must be a string of 58 unique characters.
   *
   * @default {'123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'}
   */
  alphabet?: string;
}

/**
 * Encodes a Uint8Array buffer into a base58check string.
 *
 * @param buffer The buffer to encode.
 * @param options The options to use for encoding.
 * @returns The base58check encoded string.
 */
export function encode(buffer: Uint8Array, options?: Options): string {
  return base58.encode(Uint8ArrayExtension.concat([buffer, computeChecksum(buffer)]), options);
}

/**
 * Decodes a base58check encoded string into a Uint8Array buffer.
 *
 * @param string The base58check encoded string.
 * @param options The options to use for decoding.
 * @returns The decoded buffer.
 */
export function decode(string: string, options?: Options): Uint8Array {
  const { buffer, checkSum } = (() => {
    const buffer = base58.decode(string, options);
    assert(buffer.length >= 4);
    return { buffer: buffer.slice(0, -4), checkSum: buffer.slice(-4) };
  })();
  assert(Uint8ArrayExtension.equals(computeChecksum(buffer), checkSum));
  return buffer;
}
