'use client'
import { useState } from 'react'
import { Sparkles, ChefHat, Loader2, BookOpen, ExternalLink } from 'lucide-react'
import { generateRecipe } from '@/app/auth/actions'
import ReactMarkdown from 'react-markdown'


export default function RecipeSection({ selectedItems }: { selectedItems: any[] }) {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);
  
  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateRecipe(selectedItems);
    setIdeas(JSON.parse(result).ideas);
    setLoading(false);
  };

  return (
    <div className="space-y-8">

      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 shadow-xl">
        {/* Decorative background elements */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-500/20">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-white">
                  Meal Brainstorming
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${selectedItems.length > 0 ? 'bg-orange-400 animate-pulse' : 'bg-slate-600'}`} />
                  <p className="text-sm font-medium text-slate-400">
                    {selectedItems.length > 0 
                      ? `${selectedItems.length} ingredients ready to mix` 
                      : "Select items from your pantry"}
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleGenerate} 
              disabled={loading || selectedItems.length === 0}
              className="group relative w-full overflow-hidden rounded-2xl bg-white px-8 py-4 font-bold text-slate-900 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:hover:scale-100 md:w-auto"
            >
              <div className="flex items-center justify-center gap-2">
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
                ) : (
                  <Sparkles className="h-5 w-5 text-orange-500 transition-transform group-hover:rotate-12" />
                )}
                <span>{ideas.length > 0 ? "Refresh Ideas" : "Generate Recipes"}</span>
              </div>
            </button>
          </div>

          {/* Selected Items "Pantry Tag" Section */}
          {selectedItems.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 rounded-2xl bg-white/5 p-4 backdrop-blur-sm border border-white/10">
              {selectedItems.map(item => (
                <span key={item.id} className="flex items-center gap-1.5 px-3 py-1 bg-white/10 text-orange-200 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-white/5">
                  <div className="w-1 h-1 rounded-full bg-orange-400" />
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Feed */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-white rounded-[2rem] border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : ideas.length > 0 ? (
          ideas.map((idea, index) => (
            <div key={index} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:border-orange-100 transition-all duration-300">
              <div className="p-5 md:p-8">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-orange-600 transition-colors">
                      {idea.name}
                    </h3>
                    <p className="text-slate-500 leading-relaxed text-sm max-w-2xl">
                      {idea.description}
                    </p>
                  </div>
                  <a 
                    href={`https://www.google.com/search?q=${idea.name}+recipe`} 
                    target="_blank" 
                    className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-orange-50 hover:text-orange-500 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>

                {/* Recipe Content Box */}
                <div className="mt-6 bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Step</span>
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {idea.recipe}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="bg-white rounded-[2rem] p-16 border-2 border-dashed border-slate-100 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-slate-300" />
            </div>
            <h3 className="text-slate-800 font-bold text-lg">No recipes yet</h3>
            <p className="text-slate-400 text-sm">Select ingredients to get some idea!</p>
          </div>
        )}
      </div>
    </div>
  )
}