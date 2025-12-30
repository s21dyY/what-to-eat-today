'use client'
import { useState } from 'react'
import { Sparkles, ChefHat, Loader2, BookOpen } from 'lucide-react'
import { generateRecipe } from '@/app/auth/actions'
import ReactMarkdown from 'react-markdown'


export default function RecipeSection({ ingredients }: { ingredients: any[] }) {
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);
  
  const handleGenerate = async () => {
    setLoading(true);
    const result = await generateRecipe(ingredients);
    setIdeas(JSON.parse(result).ideas);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
        <ChefHat className="w-10 h-10 mx-auto mb-4 text-orange-500" />
        <h2 className="text-2xl font-bold text-slate-800">Meal Brainstorming</h2>
        <p className="text-slate-500 mb-6 text-sm">We found {ingredients.length} items to work with</p>
        
        <button 
          onClick={handleGenerate}
          disabled={loading || ingredients.length === 0}
          className="bg-slate-900 text-white px-8 py-3 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5 text-orange-400" />}
          {ideas.length > 0 ? "Refresh Ideas" : "Start Brainstorming"}
        </button>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-white rounded-3xl border border-slate-100" />
            ))}
          </div>
        ) : (
          ideas.map((idea, index) => (
            <div key={index} className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
              <div className="p-4 flex-1">
                <a href={`https://www.google.com/search?q=${idea.name}`} target="blank">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{idea.name}</h3>
                </a>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{idea.description}</p>
                
                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100">
                  <div className="flex items-center gap-2 mb-2 text-orange-700">
                    <BookOpen size={14} className="font-bold" />
                    <span className="text-xs font-bold uppercase tracking-wider">Quick Recipe</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {idea.recipe}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}