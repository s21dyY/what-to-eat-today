'use client'
import { ChefHat, Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { resetPasswordAction } from '@/app/auth/actions'

export default function ForgotPassword() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-8 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> Back to Login
        </Link>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900">Reset Password</h1>
            <p className="text-slate-500 text-sm mt-2">Enter your email and we'll send you a link to get back into your kitchen.</p>
          </div>

          <form action={resetPasswordAction} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="email" type="email" required className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-orange-500" placeholder="chef@example.com" />
              </div>
            </div>
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}