'use client'
import PantryItem from './PantryItem';
import { deletePantryItem } from '@/app/auth/actions';

// PantryList Interface
interface PantryListProps {
  initialItems: any[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export default function PantryList({ initialItems, selectedIds, onToggle }: PantryListProps) {
  return (
    <section className="bg-white shadow-sm border border-slate-200 overflow-hidden">
      <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto custom-scrollbar">
        {initialItems.length > 0 ? (
          initialItems.map((item) => (
            <PantryItem 
              key={item.id} 
              item={item}
              // We bind the ID for the server action
              deletePantryItem={deletePantryItem.bind(null, String(item.id))}
              isSelected={selectedIds.includes(item.id)} 
              onToggle={() => onToggle(item.id)} // Use the prop function here    
            />
          ))
        ) : (
          <div className="p-12 text-center">
            <p className="text-sm text-slate-400 italic">Your pantry is currently empty.</p>
          </div>
        )}
      </div>
    </section>
  );
}