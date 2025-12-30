import { login, signup } from '@/app/auth/actions'
import { ChefHat, Mail, Lock } from 'lucide-react'

export default function LoginPage() {
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
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  id="password" 
                  name="password" 
                  type="password" 
                  required 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl text-slate-900 focus:ring-2 focus:ring-orange-500 transition-all" 
                  placeholder="••••••••"
                />
              </div>
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
                className="w-full bg-white border-2 border-slate-100 text-slate-600 py-4 rounded-2xl font-bold hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-[0.98]"
              >
                Create New Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}