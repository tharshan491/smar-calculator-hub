-- ─────────────────────────────────────────────────────────────────────────────
-- Smart Calculator Hub – Supabase SQL Setup
-- Run this once in: Supabase Dashboard → SQL Editor → New Query → Run
-- ─────────────────────────────────────────────────────────────────────────────

-- 1. History table
CREATE TABLE IF NOT EXISTS calc_history (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  category    TEXT        NOT NULL,
  calculator  TEXT        NOT NULL,
  inputs      JSONB       DEFAULT '{}',
  result      JSONB       DEFAULT '{}',
  session_id  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Online users table (for live user tracking)
CREATE TABLE IF NOT EXISTS online_users (
  id          TEXT        PRIMARY KEY,
  last_seen   TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Indexes
CREATE INDEX IF NOT EXISTS idx_history_category   ON calc_history (category);
CREATE INDEX IF NOT EXISTS idx_history_session    ON calc_history (session_id);
CREATE INDEX IF NOT EXISTS idx_history_created    ON calc_history (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_history_calculator ON calc_history (calculator);
CREATE INDEX IF NOT EXISTS idx_online_users_seen  ON online_users (last_seen DESC);

-- 4. Row Level Security
ALTER TABLE calc_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE online_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon_insert" ON calc_history FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_select" ON calc_history FOR SELECT TO anon USING (true);
CREATE POLICY "anon_delete" ON calc_history FOR DELETE TO anon USING (true);

CREATE POLICY "online_users_insert" ON online_users FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "online_users_select" ON online_users FOR SELECT TO anon USING (true);
CREATE POLICY "online_users_delete" ON online_users FOR DELETE TO anon USING (true);
CREATE POLICY "online_users_update" ON online_users FOR UPDATE TO anon USING (true);

-- 5. Stats RPC function — used by GET /api/history/stats
CREATE OR REPLACE FUNCTION calc_stats()
RETURNS TABLE(category TEXT, calculator TEXT, count BIGINT)
LANGUAGE SQL STABLE SECURITY DEFINER
AS $$
  SELECT
    category,
    calculator,
    COUNT(*) AS count
  FROM calc_history
  GROUP BY category, calculator
  ORDER BY count DESC;
$$;

-- 6. Auto-cleanup: delete records older than 90 days
-- (Optional) Enable pg_cron in Supabase and uncomment:
-- SELECT cron.schedule(
--   'cleanup-old-history',
--   '0 3 * * *',
--   $$ DELETE FROM calc_history WHERE created_at < NOW() - INTERVAL '90 days' $$
-- );

-- 7. Auto-cleanup: delete inactive users (older than 5 minutes)
-- (Optional) Enable pg_cron in Supabase and uncomment:
-- SELECT cron.schedule(
--   'cleanup-inactive-users',
--   '*/1 * * * *',
--   $$ DELETE FROM online_users WHERE last_seen < NOW() - INTERVAL '5 minutes' $$
-- );

-- ─────────────────────────────────────────────────────────────────────────────
-- Verify setup:
-- SELECT COUNT(*) FROM calc_history;
-- SELECT * FROM calc_stats();
-- ─────────────────────────────────────────────────────────────────────────────
