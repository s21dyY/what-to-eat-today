'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChefHat, AlertCircle } from 'lucide-react'
import { updatePasswordAction } from '@/app/auth/actions'

function UpdatePasswordContent() {
  const [password, setPassword] = useState('')
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get('error')

  const checks = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }
  const isPasswordValid = Object.values(checks).every(Boolean)

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-200 mb-4">
          <ChefHat size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Set a New Password</h1>
        <p className="text-slate-500 font-medium">Almost back in the kitchen</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
          <p className="text-sm text-red-800 font-medium leading-tight">{errorMsg}</p>
        </div>
      )}

      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <form action={updatePasswordAction} className="flex flex-col gap-6">
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-bold text-slate-700 ml-1">New Password</label>
            <input
              id="password" name="password" type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-4 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs font-medium">
            <div className={checks.length ? 'text-emerald-600' : 'text-slate-400'}>At least 8 characters</div>
            <div className={checks.upper && checks.lower ? 'text-emerald-600' : 'text-slate-400'}>Uppercase & Lowercase</div>
            <div className={checks.special ? 'text-emerald-600' : 'text-slate-400'}>Special character (!@#$)</div>
          </div>

          <button
            type="submit"
            disabled={!isPasswordValid}
            className={`w-full py-4 rounded-2xl font-bold ${isPasswordValid ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-slate-100 text-slate-300'}`}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  )
}

export default function UpdatePasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-orange-100/50 to-transparent -z-10" />
      <Suspense fallback={<div className="animate-pulse text-slate-400">Loading...</div>}>
        <UpdatePasswordContent />
      </Suspense>
    </div>
  )
}
