import { login, signup } from '@/app/auth/actions'
export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white shadow-md rounded-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">What To Eat Today</h1>
        <form className="flex flex-col gap-4">
          <label htmlFor="email">Email:</label>
          <input 
            id="email" name="email" type="email" required 
            className="border p-2 rounded" placeholder="chef@example.com"
          />
          
          <label htmlFor="password">Password:</label>
          <input 
            id="password" name="password" type="password" required 
            className="border p-2 rounded" 
          />

          <div className="flex gap-2 mt-4">
            <button formAction={login} className="flex-1 bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition">
              Log in
            </button>
            <button formAction={signup} className="flex-1 border border-orange-500 text-orange-500 p-2 rounded hover:bg-orange-50 transition">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}