// worker/src/routes/history.js
// Supabase (Postgres) integration for calc history
// env.SUPABASE_URL and env.SUPABASE_ANON_KEY set via: wrangler secret put
import { ok, err } from "../index.js";

// ── Supabase REST API helper ──────────────────────────────────────────────────
async function sbFetch(env, method, endpoint, body = null) {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    throw new Error("Supabase not configured");
  }
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1${endpoint}`, {
    method,
    headers: {
      "Content-Type":  "application/json",
      "apikey":        env.SUPABASE_ANON_KEY,
      "Authorization": `Bearer ${env.SUPABASE_ANON_KEY}`,
      "Prefer":        method === "POST" ? "return=representation" : "return=minimal",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(text);
  return text ? JSON.parse(text) : null;
}

// ── Auto-save helper (called by other routes, non-blocking) ───────────────────
export async function saveHistory(env, { category, calculator, inputs, result, sessionId }) {
  try {
    await sbFetch(env, "POST", "/calc_history", {
      category,
      calculator,
      inputs:     inputs   || {},
      result:     result   || {},
      session_id: sessionId || null,
    });
  } catch (_) {
    // Non-blocking — never fail the API response over a history write
  }
}

// ── History router ────────────────────────────────────────────────────────────
export async function historyRouter(path, { url, method, body, env, request }) {
  const route = path.replace("/api/history", "") || "/";

  // GET /api/history/stats — usage counts per calculator
  if (route === "/stats" && method === "GET") {
    try {
      const data = await sbFetch(env, "POST", "/rpc/calc_stats", {});
      return ok(data || []);
    } catch (e) {
      return err(e.message, 500);
    }
  }

  // DELETE /api/history/:id
  if (route.length > 1 && method === "DELETE") {
    const id = route.slice(1);
    try {
      await sbFetch(env, "DELETE", `/calc_history?id=eq.${id}`, null);
      return ok({ deleted: true, id });
    } catch (e) {
      return err(e.message, 500);
    }
  }

  // GET /api/history — list history with optional filters
  if (route === "/" && method === "GET") {
    const category  = url.searchParams.get("category");
    const session   = url.searchParams.get("session");
    const limit     = url.searchParams.get("limit") || "20";
    let qs = `?order=created_at.desc&limit=${limit}`;
    if (category) qs += `&category=eq.${encodeURIComponent(category)}`;
    if (session)  qs += `&session_id=eq.${encodeURIComponent(session)}`;
    try {
      const data = await sbFetch(env, "GET", `/calc_history${qs}`, null);
      return ok({ count: (data || []).length, records: data || [] });
    } catch (e) {
      return err(e.message, 500);
    }
  }

  // POST /api/history — manual save
  if (route === "/" && method === "POST") {
    try {
      const record = await sbFetch(env, "POST", "/calc_history", {
        category:   body.category,
        calculator: body.calculator,
        inputs:     body.inputs || {},
        result:     body.result || {},
        session_id: body.sessionId || request.headers.get("x-session-id") || null,
      });
      return ok(record);
    } catch (e) {
      return err(e.message, 500);
    }
  }

  return err("History endpoint not found", 404);
}
