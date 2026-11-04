import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-04T10:00:00Z"));
  });
  afterEach(() => vi.useRealTimers());

  it("allows hits up to the limit", () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 60_000 });
    expect([1, 2, 3].map(() => limiter.check("ip").ok)).toEqual([true, true, true]);
  });

  it("blocks the hit after the limit and reports how long to wait", () => {
    const limiter = createRateLimiter({ limit: 2, windowMs: 60_000 });
    limiter.check("ip");
    vi.advanceTimersByTime(10_000);
    limiter.check("ip");

    const result = limiter.check("ip");

    expect(result.ok).toBe(false);
    expect(result.retryAfterMs).toBe(50_000);
  });

  it("allows hits again once the window has passed", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 });
    limiter.check("ip");
    vi.advanceTimersByTime(60_000);

    expect(limiter.check("ip").ok).toBe(true);
  });

  it("counts each key separately", () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 60_000 });
    limiter.check("a");

    expect(limiter.check("b").ok).toBe(true);
    expect(limiter.check("a").ok).toBe(false);
  });
});
