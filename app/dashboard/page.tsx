// Libraries
import { createServerSideClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { logout } from '@/app/auth/actions'

// Components
import PantryManager from '@/components/pantry/PantryManager';
export default async function DashboardPage() {
  // Initialize the server-side Supabase client
  const supabase = await createServerSideClient()

  // Current user's session data
  const { data: { user }, error } = await supabase.auth.getUser()

  // Security Check: If no user is found, redirect to login
  if (error || !user) {
    redirect('/login')
  }

  // Fetch pantry items for the logged-in user using sql
  const { data: pantryItems, error: pantryError } = await supabase
  .from('pantry')
  .select('*')
  .eq('user_id', user.id) 
  .order('expires_at', { ascending: true }) 

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900">
      {/* Navigation Bar */}
      <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">W</div>
            <h1 className="text-xl font-bold tracking-tight">What To Eat Today</h1>
          </div>
                    <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 hidden sm:block font-medium">
              {user.email}
            </span>
            <form action={logout}>
              <button className="text-sm font-semibold px-5 py-2 rounded-full border border-red-100 text-red-500 bg-red-50/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 active:scale-95 shadow-sm">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        
        <PantryManager initialItems={pantryItems || []} />
      </main>

      <footer className="text-center py-6 text-sm text-slate-400">
        &copy; {new Date().getFullYear()} What To Eat Today. All rights reserved.
      </footer>
    </div>
  )
}