'use client' //run on the client side

import { clearPantry } from '@/app/auth/actions'
export default function ClearPantry() {
  return (
    <div className="flex justify-between items-end mb-4">        
        {/* The Clear Button Form */}
        <form action={clearPantry}>
            <button 
            type="submit"
            className="text-xs font-bold text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors flex items-center gap-1"
            onSubmit={(e) => {
                if (!confirm("Are you sure you want to clear your entire fridge?")) {
                e.preventDefault();
                }
            }}
            >
            <span>Clear All</span>
            </button>
        </form>
    </div>
  )
}