// worker/src/routes/tools.js
// 6 Tools endpoints: tip, discount, convert, currency, fuel, rent-split
import { ok, err } from "../index.js";

// All length/weight/volume units converted to a base unit
const UNIT_BASE = {
  // Length → meters
  m: 1, km: 1000, miles: 1609.344, yards: 0.9144, feet: 0.3048, inches: 0.0254, cm: 0.01, mm: 0.001,
  // Weight → kg
  kg: 1, lbs: 0.453592, oz: 0.0283495, grams: 0.001, tonnes: 1000, stones: 6.35029,
  // Volume → liters
  liters: 1, gallons: 3.78541, "fl_oz": 0.0295735, ml: 0.001, cups: 0.236588, pints: 0.473176, quarts: 0.946353,
  // Speed → km/h
  "km/h": 1, "mph": 1.60934, "m/s": 3.6, "knots": 1.852,
};

// Hardcoded indicative rates (replace with live API for production)
const FX_RATES = {
  USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149.5, CAD: 1.36,
  AUD: 1.53, CHF: 0.88, CNY: 7.24, INR: 83.1, MXN: 17.2,
  BRL: 4.97, SGD: 1.34, HKD: 7.82, SEK: 10.42, NOK: 10.55,
};

export function toolsRouter(path, { body }) {
  const route = path.replace("/api/tools", "");

  // POST /api/tools/tip
  // Body: { bill, tipPercent, people }
  if (route === "/tip") {
    const { bill, tipPercent, people = 1 } = body;
    if (!bill) return err("bill is required");
    const tip     = Number(bill) * Number(tipPercent) / 100;
    const total   = Number(bill) + tip;
    const perPerson = total / (Number(people) || 1);
    return ok({
      tip:       +tip.toFixed(2),
      total:     +total.toFixed(2),
      perPerson: +perPerson.toFixed(2),
      bill:      +Number(bill).toFixed(2),
      tipPercent: +Number(tipPercent),
      people:    +Number(people),
    });
  }

  // POST /api/tools/discount
  // Body: { price, discountPercent }
  if (route === "/discount") {
    const { price, discountPercent } = body;
    if (!price) return err("price is required");
    const saved = Number(price) * Number(discountPercent) / 100;
    const final = Number(price) - saved;
    return ok({
      final:           +final.toFixed(2),
      saved:           +saved.toFixed(2),
      original:        +Number(price).toFixed(2),
      discountPercent: +Number(discountPercent),
      savingsPercent:  +Number(discountPercent).toFixed(1),
    });
  }

  // POST /api/tools/convert
  // Body: { value, from, to }
  if (route === "/convert") {
    const { value, from, to } = body;
    if (!from || !to) return err("from and to units are required");

    // Temperature: special case (not multiplicative)
    const tempConversions = {
      "C-F": x => x * 9/5 + 32,
      "F-C": x => (x - 32) * 5/9,
      "C-K": x => x + 273.15,
      "K-C": x => x - 273.15,
      "F-K": x => (x - 32) * 5/9 + 273.15,
      "K-F": x => (x - 273.15) * 9/5 + 32,
    };
    const tempKey = `${from}-${to}`;
    if (tempConversions[tempKey]) {
      const result = tempConversions[tempKey](Number(value));
      return ok({ result: +result.toFixed(4), from, to, value: +Number(value) });
    }

    if (!UNIT_BASE[from] || !UNIT_BASE[to]) {
      return err(`Unsupported conversion: ${from} → ${to}. Supported: ${Object.keys(UNIT_BASE).join(", ")}, C, F, K`);
    }
    const result = Number(value) * UNIT_BASE[from] / UNIT_BASE[to];
    return ok({ result: +result.toFixed(8), from, to, value: +Number(value) });
  }

  // POST /api/tools/currency
  // Body: { amount, from, to }
  // Note: rates are indicative — integrate exchangerate.host for live rates
  if (route === "/currency") {
    const { amount, from, to } = body;
    const fromUpper = from?.toUpperCase(), toUpper = to?.toUpperCase();
    if (!FX_RATES[fromUpper] || !FX_RATES[toUpper]) {
      return err(`Unsupported currency. Supported: ${Object.keys(FX_RATES).join(", ")}`);
    }
    const rate   = FX_RATES[toUpper] / FX_RATES[fromUpper];
    const result = Number(amount) * rate;
    return ok({
      result:  +result.toFixed(4),
      rate:    +rate.toFixed(6),
      from:    fromUpper,
      to:      toUpper,
      amount:  +Number(amount),
      note:    "Indicative rate. Not for financial transactions.",
    });
  }

  // POST /api/tools/fuel
  // Body: { distance (km), efficiency (L/100km), pricePerLiter }
  if (route === "/fuel") {
    const { distance, efficiency, pricePerLiter } = body;
    if (!distance || !efficiency || !pricePerLiter) return err("distance, efficiency and pricePerLiter required");
    const liters  = (Number(distance) / 100) * Number(efficiency);
    const cost    = liters * Number(pricePerLiter);
    return ok({
      liters:     +liters.toFixed(2),
      cost:       +cost.toFixed(2),
      perKm:      +(cost / Number(distance)).toFixed(4),
      per100km:   +(cost / Number(distance) * 100).toFixed(2),
    });
  }

  // POST /api/tools/rent-split
  // Body: { rent, people }
  if (route === "/rent-split") {
    const { rent, people } = body;
    if (!rent || !people) return err("rent and people required");
    const each = Number(rent) / Number(people);
    return ok({
      each:   +each.toFixed(2),
      total:  +Number(rent).toFixed(2),
      people: +Number(people),
      annual: +(each * 12).toFixed(2),
    });
  }

  return err("Tools endpoint not found", 404);
}
