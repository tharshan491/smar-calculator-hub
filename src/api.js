// frontend/src/utils/api.js
// All API calls go to the Cloudflare Worker backend
// Set REACT_APP_API_URL in your Vercel environment variables

const BASE = process.env.REACT_APP_API_URL || "https://smart-calc-api.30259256blackpool.workers.dev/api";

// ── Session tracking (anonymous) ────────────────────────────────────────────
function getSessionId() {
  let sid = localStorage.getItem("calc_session");
  if (!sid) { sid = crypto.randomUUID(); localStorage.setItem("calc_session", sid); }
  return sid;
}

// ── Core fetch helpers ───────────────────────────────────────────────────────
async function post(path, data) {
  const res = await fetch(`${BASE}${path}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json", "x-session-id": getSessionId() },
    body:    JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Request failed");
  return json;
}

async function get(path) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "x-session-id": getSessionId() },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || "Request failed");
  return json;
}

async function del(path) {
  const res = await fetch(`${BASE}${path}`, { method: "DELETE", headers: { "x-session-id": getSessionId() } });
  return res.json();
}

// ── Finance ──────────────────────────────────────────────────────────────────
export const calcCompound    = (d) => post("/finance/compound",    d);
export const calcLoan        = (d) => post("/finance/loan",        d);
export const calcVAT         = (d) => post("/finance/vat",         d);
export const calcProfit      = (d) => post("/finance/profit",      d);
export const calcSalary      = (d) => post("/finance/salary",      d);
export const calcRetirement  = (d) => post("/finance/retirement",  d);
export const calcBreakeven   = (d) => post("/finance/breakeven",   d);

// ── Health ───────────────────────────────────────────────────────────────────
export const calcBMI         = (d) => post("/health/bmi",          d);
export const calcCalories    = (d) => post("/health/calories",     d);
export const calc1RM         = (d) => post("/health/1rm",          d);
export const calcSleep       = (d) => post("/health/sleep",        d);
export const calcMacros      = (d) => post("/health/macros",       d);

// ── Math ─────────────────────────────────────────────────────────────────────
export const calcPercentage  = (d) => post("/math/percentage",     d);
export const calcRoots       = (d) => post("/math/roots",          d);
export const calcPrimes      = (d) => post("/math/primes",         d);
export const calcLog         = (d) => post("/math/log",            d);
export const calcStddev      = (d) => post("/math/stddev",         d);
export const calcFactorial   = (d) => post("/math/factorial",      d);
export const calcQuadratic   = (d) => post("/math/quadratic",      d);

// ── Tools ────────────────────────────────────────────────────────────────────
export const calcTip         = (d) => post("/tools/tip",           d);
export const calcDiscount    = (d) => post("/tools/discount",      d);
export const calcConvert     = (d) => post("/tools/convert",       d);
export const calcCurrency    = (d) => post("/tools/currency",      d);
export const calcFuel        = (d) => post("/tools/fuel",          d);
export const calcRentSplit   = (d) => post("/tools/rent-split",    d);

// ── History ──────────────────────────────────────────────────────────────────
export const getHistory  = (params = {}) => get("/history?" + new URLSearchParams(params));
export const deleteEntry = (id)           => del(`/history/${id}`);
export const getStats    = ()             => get("/history/stats");
