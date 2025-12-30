'use client'

import { useState } from 'react'
import { Pencil, Check, X } from 'lucide-react' // Using Lucide icons
import { updatePantryItem } from '@/app/auth/actions'

export default function PantryItem({item, deletePantryItem: deleteItemAction,isSelected, onToggle }: { 
                                    item: any, deletePantryItem: any,isSelected: boolean,onToggle: () => void }) {
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: item.name,
        amount: item.amount,
        expires_at: item.expires_at
    })

    const handleSave = async () => {
        await updatePantryItem(item.id, formData)
        setIsEditing(false)
    }

    // Expiry Status Calculation
    const today = new Date();
    const expiryDate = new Date(item.expires_at);
    const diffInMs = expiryDate.getTime() - today.getTime();
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    const isExpired = item.expires_at && diffInDays < 0;
    const isAlmostExpired = item.expires_at && diffInDays >= 0 && diffInDays <= 3;

  return (
    <div onClick={onToggle} 
      className={`p-4 flex justify-between items-center cursor-pointer transition-all ${
        isSelected ? 'bg-blue-50/50 border-l-4 border-l-blue-500' : 'hover:bg-slate-50'}`}>
    
      <div className="flex gap-4 items-center flex-1">
        {/* Custom Checkbox */}
        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
          isSelected ? 'bg-blue-500 border-blue-500' : 'border-slate-300 bg-white'
        }`}>
          {isSelected && <Check size={14} className="text-white" />}
        </div>
        
        {/* Vertical Line on the left*/}
        <div className={`w-1.5 h-10 rounded-full ${
            isExpired ? 'bg-red-500' : 
            isAlmostExpired ? 'bg-amber-400' : 
            'bg-emerald-400'
        }`} />
        
        <div className="flex-1">
          {isEditing ? (
            <div className="grid grid-cols-1 gap-2">
              <input 
                className="font-bold text-slate-800 border rounded px-2 py-1 text-sm outline-blue-500"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <div className="flex gap-2">
                <input 
                  type="number"
                  className="text-xs border rounded px-2 py-1 w-20"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                />
                <input 
                  type="date"
                  className="text-xs border rounded px-2 py-1"
                  value={formData.expires_at || ''}
                  onChange={(e) => setFormData({...formData, expires_at: e.target.value})}
                />
              </div>
            </div>
          ) : (
            <>
              <p className="font-bold text-slate-800 capitalize leading-none mb-1">{formData.name}</p>
              <p className="text-xs font-medium text-slate-500">
                {formData.amount} <span className="text-slate-400">{item.unit}</span>
              </p>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isEditing ? (
          <div className="flex gap-1">
            <button onClick={handleSave} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
              <Check size={18} />
            </button>
            <button onClick={() => setIsEditing(false)} className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg">
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            {/* Status Badge (Hidden when editing) */}
            <div className="text-right hidden sm:block">
                {item.expires_at && (
                    <div className="flex flex-col items-end">
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-black tracking-tighter border ${
                        isExpired 
                        ? 'bg-red-50 text-red-600 border-red-100' 
                        : isAlmostExpired 
                            ? 'bg-amber-50 text-amber-600 border-amber-100' 
                            : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                    }`}>
                        {isExpired ? 'EXPIRED' : isAlmostExpired ? 'USE SOON' : 'FRESH'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5 font-medium">
                        {item.expires_at}
                    </span>
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-lg group-hover:transition-all">
              <Pencil size={18} />
            </button>
            
            <form action={deleteItemAction}>
              <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg group-hover:transition-all" type="submit">
                <X size={18} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}