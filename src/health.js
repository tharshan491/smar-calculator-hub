// worker/src/routes/health.js
// 5 Health endpoints: bmi, calories, 1rm, sleep, macros
import { ok, err } from "../index.js";

export function healthRouter(path, { body }) {
  const route = path.replace("/api/health", "");

  // POST /api/health/bmi
  // Body: { weight (kg), height (cm) }
  if (route === "/bmi") {
    const { weight, height } = body;
    if (!weight || !height) return err("weight and height required");
    const bmi = Number(weight) / Math.pow(Number(height) / 100, 2);
    const category =
      bmi < 18.5 ? "Underweight" :
      bmi < 25   ? "Normal weight" :
      bmi < 30   ? "Overweight" : "Obese";
    const healthyWeightMin = +(18.5 * Math.pow(Number(height) / 100, 2)).toFixed(1);
    const healthyWeightMax = +(24.9 * Math.pow(Number(height) / 100, 2)).toFixed(1);
    return ok({ bmi: +bmi.toFixed(1), category, healthyRange: `${healthyWeightMin}–${healthyWeightMax} kg` });
  }

  // POST /api/health/calories  (Mifflin-St Jeor TDEE)
  // Body: { weight (kg), height (cm), age, gender: "male"|"female", activity }
  // activity: "sedentary"|"light"|"moderate"|"active"|"very_active"
  if (route === "/calories") {
    const { weight, height, age, gender, activity = "moderate" } = body;
    const bmr = gender?.toLowerCase() === "female"
      ? 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) - 161
      : 10 * Number(weight) + 6.25 * Number(height) - 5 * Number(age) + 5;
    const mults = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, very_active: 1.9 };
    const tdee = bmr * (mults[activity.toLowerCase()] || 1.55);
    return ok({
      bmr:      +bmr.toFixed(0),
      tdee:     +tdee.toFixed(0),
      cut500:   +(tdee - 500).toFixed(0),
      cut250:   +(tdee - 250).toFixed(0),
      bulk300:  +(tdee + 300).toFixed(0),
      bulk500:  +(tdee + 500).toFixed(0),
    });
  }

  // POST /api/health/1rm  (Epley formula)
  // Body: { weight (kg), reps }
  if (route === "/1rm") {
    const { weight, reps } = body;
    if (!weight || !reps) return err("weight and reps required");
    const orm = Number(weight) * (1 + Number(reps) / 30);
    return ok({
      orm:    +orm.toFixed(1),
      p95:    +(orm * 0.95).toFixed(1),
      p90:    +(orm * 0.90).toFixed(1),
      p85:    +(orm * 0.85).toFixed(1),
      p80:    +(orm * 0.80).toFixed(1),
      p75:    +(orm * 0.75).toFixed(1),
      p70:    +(orm * 0.70).toFixed(1),
    });
  }

  // POST /api/health/sleep
  // Body: { wakeTime: "HH:MM" }
  if (route === "/sleep") {
    const { wakeTime } = body;
    if (!wakeTime) return err("wakeTime required (HH:MM)");
    const [h, m] = wakeTime.split(":").map(Number);
    if (isNaN(h) || isNaN(m)) return err("Invalid time format. Use HH:MM");
    const wakeMins = h * 60 + m;
    const bedtimes = [6, 5, 4, 3].map(cycles => {
      let bed = wakeMins - cycles * 90 - 15; // 15 min to fall asleep
      if (bed < 0) bed += 1440;
      const bh = Math.floor(bed / 60) % 24, bm = bed % 60;
      return {
        cycles,
        hours:    +(cycles * 1.5).toFixed(1),
        bedtime:  `${String(bh).padStart(2,"0")}:${String(bm).padStart(2,"0")}`,
        quality:  cycles >= 6 ? "Optimal" : cycles === 5 ? "Good" : cycles === 4 ? "Fair" : "Minimal",
      };
    });
    return ok({ wakeTime, bedtimes });
  }

  // POST /api/health/macros
  // Body: { calories, goal: "balanced"|"high_protein"|"keto"|"low_carb" }
  if (route === "/macros") {
    const { calories, goal = "balanced" } = body;
    if (!calories) return err("calories required");
    const splits = {
      balanced:     { carbs: 40, protein: 30, fat: 30 },
      high_protein: { carbs: 30, protein: 40, fat: 30 },
      keto:         { carbs: 5,  protein: 25, fat: 70 },
      low_carb:     { carbs: 20, protein: 35, fat: 45 },
    }[goal.toLowerCase()] || { carbs: 40, protein: 30, fat: 30 };
    return ok({
      goal,
      calories:  +Number(calories).toFixed(0),
      carbsG:    +(Number(calories) * splits.carbs    / 100 / 4).toFixed(0),
      proteinG:  +(Number(calories) * splits.protein  / 100 / 4).toFixed(0),
      fatG:      +(Number(calories) * splits.fat      / 100 / 9).toFixed(0),
      splits,
    });
  }

  return err("Health endpoint not found", 404);
}
