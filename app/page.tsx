// Libraries
import { createServerSideClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import { logout } from '@/app/auth/actions'
import { deletePantryItem } from '@/app/auth/actions'

// Components
import AddItemForm from '@/components/pantry/AddItemForm'
import ClearButton from '@/components/pantry/ClearButton'
import RecipeSection from '@/components/recipes/RecipeSection'
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: PANTRY MANAGEMENT (5 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <section>
              <AddItemForm />
            </section>
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Table Header with integrated Clear Button */}
              <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Items
                </h3>
                <ClearButton /> {/* Moves the clear action into the natural header area */}
              </div>

              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto custom-scrollbar">
                {pantryItems && pantryItems.length > 0 ? (
                  pantryItems.map((item) => {
                    const isExpired = item.expires_at && new Date(item.expires_at) < new Date();
                    const deleteItemWithId = deletePantryItem.bind(null, item.id); // Bind the ID for the server action

                    return (
                      <div key={item.id} className="p-4 flex justify-between items-center hover:bg-slate-50/80 transition-colors group">
                        <div className="flex gap-4 items-center">
                          {/* Visual Indicator */}
                          <div className={`w-1.5 h-10 rounded-full ${isExpired ? 'bg-red-400' : 'bg-emerald-400'}`} />
                          <div>
                            <p className="font-bold text-slate-800 capitalize leading-none mb-1">{item.name}</p>
                            <p className="text-xs font-medium text-slate-500">
                              {item.amount} <span className="text-slate-400">{item.unit}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Status Badge */}
                          <div className="text-right hidden sm:block">
                            {item.expires_at && (
                              <div className="flex flex-col items-end">
                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-black tracking-tighter ${
                                  isExpired ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                }`}>
                                  {isExpired ? 'ALMOST EXPIRED' : 'FRESH'}
                                </span>
                                <span className="text-[10px] text-slate-400 mt-0.5 font-medium">{item.expires_at}</span>
                              </div>
                            )}
                          </div>

                          {/* Individual Delete Action */}
                          <form action={async () => {
                                          'use server'
                                          await deletePantryItem(String(item.id))
                                        }}>
                            <button 
                              className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                              type="submit"
                            >
                              {/* Use a trash icon or simple X */}
                              <span className="text-lg">✕</span>
                            </button>
                          </form>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-12 text-center">
                    <p className="text-sm text-slate-400 italic">Your pantry is currently empty.</p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: RECIPE RECOMMENDATIONS (7 Cols) */}
          <div className="lg:col-span-6">
            <RecipeSection ingredients={pantryItems || []} />
          </div>

        </div>
      </main>
    </div>
  )
}