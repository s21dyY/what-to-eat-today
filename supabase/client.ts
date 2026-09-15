// app/supabase/client.ts
// Kept separate from lib/supabase.ts, which imports `next/headers` at module
// scope — that import isn't safe to pull into a Client Component bundle even
// if only this browser-safe export is used from it.
import { createBrowserClient } from '@supabase/ssr'
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
