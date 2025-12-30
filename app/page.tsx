import { createServerSideClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { ChefHat, Sparkles, ShieldCheck, Zap } from 'lucide-react'

export default async function LandingPage() {
  const supabase = await createServerSideClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If already logged in, skip the landing page
  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Simple Nav */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-orange-200">W</div>
          <span className="text-xl font-bold tracking-tight text-slate-900">WhatToEatToday</span>
        </div>
        <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors">
          Sign In
        </Link>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-24 pb-32 overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 -right-20 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10" />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8 border border-orange-200">
              <Sparkles size={14} className="animate-bounce" />
              Next-Gen Meal Planner
            </div>
            
            <h1 className="text-7xl font-black text-slate-900 leading-tight mb-8">
              Finally! Someone make <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-500">
                Decision!
              </span>
            </h1>
            
            <p className="text-xl text-slate-500 mb-10 leading-relaxed max-w-md font-medium">
              Make decision with your undecisive friends!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/login" className="group relative bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold transition-all hover:bg-orange-500 hover:ring-4 ring-orange-100 flex items-center justify-center gap-2">
                Start Cooking
                <Zap size={18} className="fill-current" />
              </Link>
            </div>
          </div>

          {/* 3. The "Visual" - Bento Style Mockup */}
          <div className="relative group">
            {/* Floating Badge */}
            <div className="absolute -top-6 -left-6 bg-white shadow-xl rounded-2xl p-4 z-20 animate-bounce transition-transform hover:scale-110 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Status</p>
                  <p className="text-sm font-bold text-slate-800">3 Items Fresh</p>
                </div>
              </div>
            </div>

            <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-white border border-slate-200 rounded-[3rem] shadow-2xl p-4 rotate-2 group-hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-white rounded-[2.2rem] shadow-inner overflow-hidden border border-slate-100 flex flex-col p-6">
                <div className="flex justify-between items-center mb-8">
                    <div className="space-y-1">
                      <div className="h-2 w-12 bg-slate-200 rounded-full" />
                      <div className="h-3 w-24 bg-slate-900 rounded-full" />
                    </div>
                    <ChefHat className="text-orange-500" size={28} />
                </div>
                
                <div className="space-y-4">
                    {[1,2].map(i => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl shadow-sm" />
                          <div className="space-y-2">
                            <div className="h-2 w-16 bg-slate-300 rounded-full" />
                            <div className="h-2 w-8 bg-slate-200 rounded-full" />
                          </div>
                        </div>
                        <div className="w-4 h-4 rounded-full border-2 border-orange-500" />
                      </div>
                    ))}
                    <div className="mt-4 p-4 bg-orange-500 rounded-2xl text-white text-center font-bold text-sm shadow-lg shadow-orange-200">
                      Generating Ideas...
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}