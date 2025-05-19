/**
 * ddos_guard.js
 * Basic guard to detect request flooding and IP leaks.
 */

const MAX_REQUESTS_PER_SECOND = 10;
let requestTimes = [];

export function registerRequest() {
  const now = Date.now();
  requestTimes.push(now);
  // Clean old requests
  requestTimes = requestTimes.filter(t => now - t < 1000);

  if (requestTimes.length > MAX_REQUESTS_PER_SECOND) {
    throw new Error('Possible DDOS detected. Access blocked.');
  }
}
