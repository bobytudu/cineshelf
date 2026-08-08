import { describe, it, expect } from 'vitest';
import { parsePageParam } from './pageParam';

describe('parsePageParam', () => {
  it('defaults missing/invalid to 0', () => {
    expect(parsePageParam(null)).toBe(0);
    expect(parsePageParam('')).toBe(0);
    expect(parsePageParam('abc')).toBe(0);
    expect(parsePageParam('-1')).toBe(0);
  });

  it('parses non-negative integers', () => {
    expect(parsePageParam('0')).toBe(0);
    expect(parsePageParam('3')).toBe(3);
  });
});
