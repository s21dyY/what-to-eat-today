import { addPantryItem } from '@/app/auth/actions'
import { PlusCircle, Utensils, Calendar } from 'lucide-react'
import { SubmitButton } from './SubmitButton' // Use the SubmitButton we created earlier

export default function AddItemForm() {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const defaultDate = nextWeek.toISOString().split('T')[0];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 transition-all">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-orange-50 rounded-lg">
          <Utensils className="text-orange-500 w-4 h-4" />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Add Ingredients</h2>
      </div>
      
      <form action={addPantryItem} className="space-y-4">
        {/* Row 1: Ingredient Name (Full Width) */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Ingredient Name</label>
          <input
            name="name" type="text" placeholder="e.g. Fresh Spinach" required
            className="w-full bg-slate-50 border-none ring-1 ring-slate-200 p-3 rounded-xl 
             focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none 
             transition-all text-slate-900 font-medium placeholder:text-slate-300"
          />
        </div>

        {/* Row 2: Qty and Unit (Split 50/50) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Quantity</label>
            <input
              name="amount" type="number" step="0.1" placeholder="0" required
              className="w-full bg-slate-50 border-none ring-1 ring-slate-200 p-3 rounded-xl 
                        focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none 
                        transition-all text-slate-900 font-medium"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Unit</label>
            <select 
              name="unit" 
              className="w-full bg-slate-50 border-none ring-1 ring-slate-200 p-3 rounded-xl 
                        focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none 
                        transition-all cursor-pointer text-slate-900 font-medium appearance-none"
            >
              <option value="pcs">pcs</option>
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="ml">ml</option>
            </select>
          </div>
        </div>

        {/* Row 3: Expiration Date */}
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Expiration Date</label>
          <div className="relative">
            <input
              name="expires_at" type="date" defaultValue={defaultDate}
              className="w-full bg-slate-50 border-none ring-1 ring-slate-200 p-3 rounded-xl 
                        focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none 
                        transition-all text-slate-900 font-medium pr-10"
            />
          </div>
        </div>

        {/* Row 4: Submit Button */}
        <div className="pt-2">
          <SubmitButton /> 
        </div>
      </form>
    </div>
  )
}