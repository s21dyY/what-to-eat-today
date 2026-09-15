-- The app code (AddItemForm, PantryItem, dashboard query) has relied on
-- pantry.expires_at for a while, but the tracked schema never had it —
-- it was likely added directly via the Supabase dashboard. This migration
-- brings the migration history back in sync with the live schema.
ALTER TABLE "public"."pantry"
  ADD COLUMN IF NOT EXISTS "expires_at" timestamp with time zone;
