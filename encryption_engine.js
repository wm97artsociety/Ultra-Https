/**
 * encryption_engine.js
 * Core encryption and decryption engine with rotating keys.
 */

import { getContentFromFirebase } from './firebase_api.js';

const KEY_COUNT = 10000;
const ROTATE_INTERVAL = 5000; // 5 seconds

// Generate 10,000 random keys on init (or fetched from Firebase)
let keys = new Array(KEY_COUNT).fill(0).map(() =>
  crypto.getRandomValues(new Uint8Array(16))
);

let currentKeyIndex = 0;

// Rotate keys every 5 seconds
setInterval(() => {
  currentKeyIndex = (currentKeyIndex + 1) % KEY_COUNT;
}, ROTATE_INTERVAL);

/**
 * Encrypt data with current rotating key
 * @param {Uint8Array} data
 */
export function encrypt(data) {
  const key = keys[currentKeyIndex];
  // Example using XOR encryption for demo
  let encrypted = new Uint8Array(data.length);
  for (let i = 0; i < data.length; i++) {
    encrypted[i] = data[i] ^ key[i % key.length];
  }
  return encrypted;
}

/**
 * Decrypt data with current rotating key
 * @param {Uint8Array} encrypted
 */
export function decrypt(encrypted) {
  const key = keys[currentKeyIndex];
  let decrypted = new Uint8Array(encrypted.length);
  for (let i = 0; i < encrypted.length; i++) {
    decrypted[i] = encrypted[i] ^ key[i % key.length];
  }
  return decrypted;
}

/**
 * Get current key index (used for challenge)
 */
export function getCurrentKeyIndex() {
  return currentKeyIndex;
}
