-- Run this in Supabase SQL Editor → New query
-- Creates the access_requests table for tracking all user access

CREATE TABLE IF NOT EXISTS access_requests (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email           text NOT NULL,
  first_name      text NOT NULL,
  last_name       text NOT NULL,
  company         text,
  tier_requested  text NOT NULL DEFAULT 'free',
  tier_granted    text,
  status          text NOT NULL DEFAULT 'pending',
  approved_by     text,
  source          text,
  notes           text,
  approval_token  text UNIQUE,
  requested_at    timestamptz DEFAULT now(),
  approved_at     timestamptz,
  invite_sent_at  timestamptz
);

ALTER TABLE access_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert" ON access_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "No public read" ON access_requests FOR SELECT USING (false);
