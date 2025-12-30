'use client' // Required to use useFormStatus

import { useFormStatus } from 'react-dom'
import { PlusCircle, Loader2 } from 'lucide-react'

export function SubmitButton() {
  // pending is true while the server action addPantryItem is running
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit"
      disabled={pending}
      className="w-full bg-orange-500 text-white p-3 rounded-xl 
                 hover:bg-orange-600 active:scale-95 transition-all 
                 font-bold flex items-center justify-center gap-2 
                 shadow-lg shadow-orange-200 disabled:opacity-70 
                 disabled:cursor-not-allowed"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <PlusCircle size={18} />
          <span>Add Item</span>
        </>
      )}
    </button>
  )
}