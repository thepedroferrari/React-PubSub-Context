function getFibonacciNumber(n: number): number {
  if (n <= 2) return 1;
  return getFibonacciNumber(n - 1) + getFibonacciNumber(n - 2);
}

export const slowFunc = () => getFibonacciNumber(32);
