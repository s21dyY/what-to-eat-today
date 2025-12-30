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
          <span className="text-xl font-bold tracking-tight text-slate-900">WhatToEat</span>
        </div>
        <Link href="/login" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors">
          Sign In
        </Link>
      </nav>

      {/* 2. Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <Sparkles size={16} />
            AI-Powered Kitchen Assistant
          </div>
          <h1 className="text-6xl font-black text-slate-900 leading-[1.1] mb-6">
            Stop staring at your fridge, <span className="text-orange-500">start cooking.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
            WhatToEat tracks your pantry and uses AI to brainstorm creative recipes based on what you actually have. Reduce waste, save money, and eat better.
          </p>
          
          <div className="flex gap-4">
            <Link href="/login" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all hover:scale-105">
              Get Started for Free
            </Link>
          </div>
        </div>

        {/* 3. The "Visual" - A preview of the app or a cool card */}
        <div className="relative">
          <div className="absolute -inset-4 bg-orange-500/10 rounded-3xl blur-3xl" />
          <div className="relative bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 overflow-hidden">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
             </div>
             <div className="space-y-4">
                <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                <div className="h-4 bg-slate-100 rounded-full w-full" />
                <div className="h-32 bg-orange-50 rounded-2xl w-full border border-orange-100 flex items-center justify-center">
                   <ChefHat className="text-orange-200 w-12 h-12" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Features Section */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Zap className="text-orange-500" />} 
            title="Instant Brainstorming" 
            desc="Llama 3 AI generates 3 unique recipe ideas in milliseconds." 
          />
          <FeatureCard 
            icon={<ShieldCheck className="text-emerald-500" />} 
            title="Expiry Tracking" 
            desc="Visual alerts for items that are about to expire so you use them first." 
          />
          <FeatureCard 
            icon={<ChefHat className="text-blue-500" />} 
            title="Smart Pantry" 
            desc="Easily manage your ingredients with our intuitive checkbox system." 
          />
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