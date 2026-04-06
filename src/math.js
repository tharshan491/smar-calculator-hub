// worker/src/routes/math.js
// 7 Math endpoints: percentage, roots, primes, log, stddev, factorial, quadratic
import { ok, err } from "../index.js";

export function mathRouter(path, { body }) {
  const route = path.replace("/api/math", "");

  // POST /api/math/percentage
  // Body: { value, total }
  if (route === "/percentage") {
    const { value, total } = body;
    if (!total || Number(total) === 0) return err("total cannot be zero");
    const pct = (Number(value) / Number(total)) * 100;
    return ok({
      percentage:    +pct.toFixed(4),
      asDecimal:     +(pct / 100).toFixed(6),
      inverse:       +(100 - pct).toFixed(4),
      valueOfTotal:  +Number(value).toFixed(4),
    });
  }

  // POST /api/math/roots
  // Body: { n }
  if (route === "/roots") {
    const n = Number(body.n);
    return ok({
      sqrt:   +Math.sqrt(n).toFixed(8),
      cbrt:   +Math.cbrt(n).toFixed(8),
      square: +(n * n),
      cube:   +(n * n * n),
      sqrt4:  +Math.pow(n, 0.25).toFixed(8),
    });
  }

  // POST /api/math/primes
  // Body: { n }  — checks if n is prime and lists primes up to n (max 1000)
  if (route === "/primes") {
    const n = Math.floor(Number(body.n));
    const isPrime = x => { if (x < 2) return false; for (let i = 2; i <= Math.sqrt(x); i++) if (x % i === 0) return false; return true; };
    const limit = Math.min(Math.abs(n), 1000);
    const primes = [];
    for (let i = 2; i <= limit && primes.length < 100; i++) if (isPrime(i)) primes.push(i);
    const factors = [];
    let tmp = Math.abs(n);
    for (let d = 2; d * d <= tmp; d++) { while (tmp % d === 0) { factors.push(d); tmp /= d; } }
    if (tmp > 1) factors.push(tmp);
    return ok({ n, isPrime: isPrime(n), primes, primeCount: primes.length, primeFactors: factors });
  }

  // POST /api/math/log
  // Body: { n, base }  — base=0 means natural log
  if (route === "/log") {
    const n = Number(body.n), base = Number(body.base ?? 10);
    if (n <= 0) return err("n must be greater than 0");
    const result = base === 0 ? Math.log(n) : Math.log(n) / Math.log(base);
    return ok({
      result: +result.toFixed(10),
      log2:   +Math.log2(n).toFixed(10),
      log10:  +Math.log10(n).toFixed(10),
      ln:     +Math.log(n).toFixed(10),
    });
  }

  // POST /api/math/stddev
  // Body: { data: number[] }
  if (route === "/stddev") {
    const { data } = body;
    if (!Array.isArray(data) || data.length < 2) return err("Provide at least 2 numbers in data array");
    const nums = data.map(Number).filter(x => !isNaN(x));
    const n = nums.length;
    const mean = nums.reduce((a, b) => a + b, 0) / n;
    const variance = nums.reduce((s, x) => s + Math.pow(x - mean, 2), 0) / n;
    const varianceSample = nums.reduce((s, x) => s + Math.pow(x - mean, 2), 0) / (n - 1);
    return ok({
      mean:           +mean.toFixed(6),
      stddev:         +Math.sqrt(variance).toFixed(6),        // population
      stddevSample:   +Math.sqrt(varianceSample).toFixed(6),  // sample
      variance:       +variance.toFixed(6),
      min:            Math.min(...nums),
      max:            Math.max(...nums),
      range:          +(Math.max(...nums) - Math.min(...nums)).toFixed(6),
      count:          n,
    });
  }

  // POST /api/math/factorial
  // Body: { n }  — supports 0–20
  if (route === "/factorial") {
    const n = Math.min(Math.max(0, Math.floor(Number(body.n))), 20);
    let f = 1n;
    for (let i = 2n; i <= BigInt(n); i++) f *= i;
    const nCr = (nr, r) => {
      if (r > nr) return 0n;
      let res = 1n;
      for (let i = 0n; i < BigInt(r); i++) res = res * (BigInt(nr) - i) / (i + 1n);
      return res;
    };
    return ok({
      n,
      factorial:     f.toString(),
      permutations:  n > 1 ? (f / BigInt(n - 1 > 0 ? n-1 : 1)).toString() : "1",
    });
  }

  // POST /api/math/quadratic
  // Body: { a, b, c }  — solves ax² + bx + c = 0
  if (route === "/quadratic") {
    const a = Number(body.a), b = Number(body.b), c = Number(body.c);
    if (a === 0) return err("Coefficient 'a' cannot be zero (not a quadratic)");
    const discriminant = b * b - 4 * a * c;
    const vertex = { x: +(-b / (2 * a)).toFixed(6), y: +(c - b * b / (4 * a)).toFixed(6) };
    if (discriminant < 0) {
      const realPart = +(-b / (2 * a)).toFixed(6);
      const imagPart = +(Math.sqrt(-discriminant) / (2 * a)).toFixed(6);
      return ok({ discriminant, realRoots: false, vertex, complexRoots: [`${realPart} + ${imagPart}i`, `${realPart} - ${imagPart}i`] });
    }
    return ok({
      discriminant,
      realRoots: true,
      x1: +((-b + Math.sqrt(discriminant)) / (2 * a)).toFixed(8),
      x2: +((-b - Math.sqrt(discriminant)) / (2 * a)).toFixed(8),
      vertex,
    });
  }

  return err("Math endpoint not found", 404);
}
