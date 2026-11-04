// Tiny in-memory sliding-window rate limiter.
// Best-effort only: state lives in this server instance's memory, so it resets
// on restart/redeploy and is not shared across instances or serverless workers.

type Limiter = {
  /** Records a hit for `key`; returns false when the key is over its limit. */
  check: (key: string) => { ok: boolean; retryAfterMs: number };
};

export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }): Limiter {
  const hits = new Map<string, number[]>();

  function prune(now: number) {
    // Keep memory bounded: drop keys whose newest hit is outside the window.
    if (hits.size < 1000) return;
    for (const [key, times] of hits) {
      if (now - times[times.length - 1] >= windowMs) hits.delete(key);
    }
  }

  return {
    check(key) {
      const now = Date.now();
      prune(now);
      const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (recent.length >= limit) {
        hits.set(key, recent);
        return { ok: false, retryAfterMs: windowMs - (now - recent[0]) };
      }
      recent.push(now);
      hits.set(key, recent);
      return { ok: true, retryAfterMs: 0 };
    },
  };
}
