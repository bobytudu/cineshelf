export function parsePageParam(value: string | null): number {
  if (value == null || value === '') return 0;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}
