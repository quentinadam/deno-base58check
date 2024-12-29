import assert from '@quentinadam/assert';
import * as hex from '@quentinadam/hex';
import * as Uint8ArrayExtension from '@quentinadam/uint8array-extension';
import * as base58check from '../src/base58check.ts';

const vectors = [
  { decoded: 'Hello', encoded: 'vSxRbq6XzDhP' },
  { decoded: 'Hello World!', encoded: '9wWTEnNTUzJGD7cXz99ejY' },
  {
    decoded: 'The quick brown fox jumps over the lazy dog.',
    encoded: '46auvTd4NTVoJhFVnfh9reLsP21HQAQUFXCCBzNZjAPwQBRpaSp4aDLzWajGrqq21B',
  },
  { decoded: hex.decode('61'), encoded: 'C2dGTwc' },
  { decoded: hex.decode('626262'), encoded: '4jF5uERJAK' },
  { decoded: hex.decode('636363'), encoded: '4mT4krqUYJ' },
  { decoded: hex.decode('73696d706c792061206c6f6e6720737472696e67'), encoded: 'BXF1HuEUCqeVzZdrKeJjG74rjeXxqJ7dW' },
  {
    decoded: hex.decode('00eb15231dfceb60925886b67d065299925915aeb172c06647'),
    encoded: '13REmUhe2ckUKy1FvM7AMCdtyYq831yxM3QeyEu4',
  },
  { decoded: hex.decode('516b6fcd0f'), encoded: '237LSrY9NUUas' },
  { decoded: hex.decode('bf4f89001e670274dd'), encoded: 'GwDDDeduj1jpykc27e' },
  { decoded: hex.decode('572e4794'), encoded: 'FamExfqCeza' },
  { decoded: hex.decode('ecac89cad93923c02321'), encoded: '2W1Yd5Zu6WGyKVtHGMrH' },
  { decoded: hex.decode('10c8511e'), encoded: '3op3iuGMmhs' },
  { decoded: new Uint8Array(10), encoded: '111111111146Momb' },
  {
    decoded: hex.decode('000111d38e5fc9071ffcd20b4a763cc9ae4f252bb4e48fd66a835e252ada93ff480d6dd43dc62a641155a5'),
    encoded: '17mxz9b2TuLnDf6XyQrHjAc3UvMoEg7YzRsJkBd4VwNpFh8a1StKmCe5WtAW27Y',
  },
  {
    decoded: new Uint8Array(Array.from({ length: 256 }, (_, i) => i)),
    // deno-fmt-ignore
    encoded: '151KWPPBRzdWPr1ASeu172gVgLf1YfUp6VJyk6K9t4cLqYtFHcMa2iX8S3NJEprUcW7W5LvaPRpz7UG7puBj5STE3nKhCGt5eckYq7mMn5nT7oTTic2BAX6zDdqrmGCnkszQkzkz8e5QLGDjf7KeQgtEDm4UER6DMSdBjFQVa6cHrrJn9myVyyhUrsVnfUk2WmNFZvkWv3Tnvzo2cJ1xW62XDfUgYz1pd97eUGGPuXvDFfLsBVd1dfdUhPwxW7pMPgdWHTmg5uqKGFF6vE4xXpAqZTbTxRZjCDdTn68c2wrcxApm8hq3JX65Hix7VtcD13FF8b7BzBtwjXq1ze6NMjKgUcqpGV5XA5',
  },
];

Deno.test('encode', () => {
  for (const { decoded, encoded } of vectors) {
    const result = base58check.encode(typeof decoded === 'string' ? new TextEncoder().encode(decoded) : decoded);
    assert(result === encoded, `Expected ${JSON.stringify(encoded)} but got ${JSON.stringify(result)}`);
  }
});

Deno.test('decode', () => {
  for (const { decoded, encoded } of vectors) {
    if (typeof decoded === 'string') {
      const result = new TextDecoder().decode(base58check.decode(encoded));
      assert(result === decoded, `Expected ${JSON.stringify(decoded)} but got ${JSON.stringify(result)}`);
    } else {
      const result = base58check.decode(encoded);
      assert(
        Uint8ArrayExtension.equals(result, decoded),
        `Expected [${hex.encode(decoded)}] but got [${hex.encode(result)}]`,
      );
    }
  }
});
