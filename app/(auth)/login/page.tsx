'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChefHat, Mail, Lock, Check,AlertCircle } from 'lucide-react'
import { login, signup } from '@/app/auth/actions'
import { createClient } from '@/supabase/client'
// Helper function for validation elements
function ValidationItem({ label, isMet }: { label: string; isMet: boolean }) {
  return (
    <div className={`flex items-center gap-2 transition-colors ${isMet ? 'text-emerald-600' : 'text-slate-400'}`}>
      {isMet ? <Check size={14} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1.5 mr-1" />}
      <span>{label}</span>
    </div>
  )
}
// Content component
function LoginContent() {
    const [password, setPassword] = useState('')
    const searchParams = useSearchParams() // This is the line that needs Suspense
    const errorMsg = searchParams.get('error')
    
    const checks = {
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }

    const handleGoogleLogin = async () => {
      const supabase = createClient()
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      })
    }

    const isPasswordValid = Object.values(checks).every(Boolean)

    return (
        <div className="w-full max-w-md">
            {/* Brand Logo */}
            <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-200 mb-4">
                    <ChefHat size={32} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
                <p className="text-slate-500 font-medium">What's for dinner today?</p>
            </div>  
            
            {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                    <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-red-800 font-medium leading-tight">{errorMsg}</p>
                </div>
            )}

            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
                <form className="flex flex-col gap-6">
                    {/* ... Rest of your form inputs (Email, Password, Validation UI, and Buttons) ... */}
                    {/* Ensure you use setPassword and isPasswordValid here as usual */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1">Email Address</label>
                        <input id="email" name="email" type="email" required className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-orange-500" placeholder="chef@example.com" />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-bold text-slate-700 ml-1">Password</label>
                        <input 
                            id="password" name="password" type="password" required 
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-orange-500" 
                        />
                    </div>

                    <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs font-medium">
                        <ValidationItem label="At least 8 characters" isMet={checks.length} />
                        <ValidationItem label="Uppercase & Lowercase" isMet={checks.upper && checks.lower} />
                        <ValidationItem label="Special character (!@#$)" isMet={checks.special} />
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button formAction={login} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800">Log in</button>
                        <button formAction={signup} disabled={!isPasswordValid} className={`w-full py-4 rounded-2xl font-bold ${isPasswordValid ? 'bg-white border-slate-100 text-slate-600' : 'bg-slate-50 text-slate-300'}`}>Create New Account</button>
                        <button onClick={handleGoogleLogin} type="button" className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm">
                          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                          Continue with Google
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

// 3. The exported page now just wraps the content in Suspense
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-100/50 to-transparent -z-10" />
      
      <Suspense fallback={<div className="animate-pulse text-slate-400">Loading kitchen...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  )
}