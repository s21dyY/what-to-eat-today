'use client'
import { useState } from 'react';
import PantryList from './PantryList';
import RecipeSection from '@/components/recipes/RecipeSection';
import AddItemForm from './AddItemForm';
import ClearButton from './ClearButton';

export default function PantryManager({ initialItems }: { initialItems: any[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectedItems = initialItems.filter(item => selectedIds.includes(item.id));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* LEFT COLUMN */}
      <div className="lg:col-span-5 space-y-5">
        <section>
          <AddItemForm />
        </section>

        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b flex justify-between items-center">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Pantry Inventory ({initialItems.length})
            </h3>
            <ClearButton />
          </div>

          <PantryList 
            initialItems={initialItems} 
            selectedIds={selectedIds} 
            onToggle={handleToggle} 
          />
        </section>
      </div>

      {/* Recipie Section */}
      <div className="lg:col-span-7">
        <div className="sticky top-24"> {/* Stays visible as you scroll the list */}
          <RecipeSection selectedItems={selectedItems} />
        </div>
      </div>

    </div>
  );
}