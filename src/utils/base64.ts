/* eslint-disable no-bitwise */

// from https://gist.github.com/jonleighton/958841
export function base64Encode(arrayBuffer: Uint8Array | ArrayBuffer): string {
  let base64 = '';
  const encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  const bytes = new Uint8Array(arrayBuffer);
  const { byteLength } = bytes;
  const byteRemainder = byteLength % 3;
  const mainLength = byteLength - byteRemainder;

  let chunk;

  // Main loop deals with bytes in chunks of 3
  for (let i = 0; i < mainLength; i += 3) {
    // Combine the three bytes into a single integer
    chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

    // Use bitmasks to extract 6-bit segments from the triplet
    const a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
    const b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
    const c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
    const d = chunk & 63; // 63       = 2^6 - 1

    // Convert the raw binary segments to the appropriate ASCII encoding
    base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
  }

  // Deal with the remaining bytes and padding
  if (byteRemainder === 1) {
    chunk = bytes[mainLength];

    const a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

    // Set the 4 least significant bits to zero
    const b = (chunk & 3) << 4; // 3   = 2^2 - 1

    base64 += encodings[a];
    base64 += encodings[b];
    base64 += '==';
  } else if (byteRemainder === 2) {
    chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

    const a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
    const b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

    // Set the 2 least significant bits to zero
    const c = (chunk & 15) << 2; // 15    = 2^4 - 1

    base64 += encodings[a];
    base64 += encodings[b];
    base64 += encodings[c];
    base64 += '=';
  }

  return base64;
}
