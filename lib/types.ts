export interface PantryItem {
  id: string
  user_id: string
  name: string
  amount: number
  unit: string
  expires_at: string | null
  updated_at?: string
}

export interface RecipeIdea {
  name: string
  description: string
  recipe: string
  imageSearchTerm?: string
}
