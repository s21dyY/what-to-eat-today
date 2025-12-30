'use client'

import { useState } from 'react'
import { login, signup } from '@/app/auth/actions'
import { ChefHat, Mail, Lock, Check, X, Eye, EyeOff,AlertCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/supabase/client'
function ValidationItem({ label, isMet }: { label: string; isMet: boolean }) {
  return (
    <div className={`flex items-center gap-2 transition-colors ${isMet ? 'text-emerald-600' : 'text-slate-400'}`}>
      {isMet ? <Check size={14} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-300 ml-1.5 mr-1" />}
      <span>{label}</span>
    </div>
  )
}
export default function LoginPage() {
    const [password, setPassword] = useState('')
    
    // Validation Rules
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
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    }

    const isPasswordValid = Object.values(checks).every(Boolean)
    const searchParams = useSearchParams()
    const errorMsg = searchParams.get('error')

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      {/* Background Decorative Blob */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-100/50 to-transparent -z-10" />

      <div className="w-full max-w-md">
        
        {/* Brand Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-200 mb-4">
            <ChefHat size={32} />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium">What's for dinner today?</p>
        </div>  
        
        {/*Error Message for repeated signup*/}
        {errorMsg && (
          <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-red-800 font-medium leading-tight">
              {errorMsg}
            </p>
          </div>
        )}
        

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <form className="flex flex-col gap-6">
            
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-orange-500 transition-all font-medium" 
                  placeholder="chef@example.com"
                />
              </div>
            </div>
            
            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold text-slate-700 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="..." size={18} />
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  className="..." 
                />
              </div>
            </div>
            {/* Real-time Validation UI */}
            <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs font-medium">
                <p className="text-slate-400 uppercase tracking-widest font-bold mb-3">Requirements</p>
                <ValidationItem label="At least 8 characters" isMet={checks.length} />
                <ValidationItem label="Uppercase & Lowercase" isMet={checks.upper && checks.lower} />
                <ValidationItem label="Special character (!@#$)" isMet={checks.special} />
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <button 
                formAction={login} 
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg shadow-slate-200"
              >
                Log in
              </button>
              
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-bold">Or</span></div>
              </div>

              <button 
                formAction={signup} 
                disabled={!isPasswordValid} // disables the button if password invalid
                className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-[0.98] border-2 
                  ${isPasswordValid 
                    ? 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50 hover:border-slate-200' 
                    : 'bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed opacity-60'
                  }`}>
                Create New Account
              </button>
              <button 
                onClick={handleGoogleLogin}
                type="button" // Important: prevents form submission
                className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
                    Continue with Google
              </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}