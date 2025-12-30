import { createServerSideClient } from '@/lib/supabase' 
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createServerSideClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // If something goes wrong, send them back to login with an error
  return NextResponse.redirect(`${origin}/login?error=Google authentication failed`)
}