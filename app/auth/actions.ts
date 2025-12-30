'use server' // run this code only on the server

import { createClient, createServerSideClient } from '@/lib/supabase'
import { refresh, revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// recipie generation with Groq
import Groq from "groq-sdk";

// keys
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// User login
export async function login(formData: FormData) {
  const supabase = await createServerSideClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error){
    if (error.status === 400 || error.message.includes("Invalid login credentials")) {
      return redirect('/login?error=Incorrect password or email. Please try again.')
    }
    return redirect(`/login?error=${error.message}`)
  } 

  redirect('/dashboard')
}
// User signip
export async function signup(formData: FormData) {
  const supabase = await createServerSideClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    console.log("Testing RRRRRL", error.status)
    if (error.status === 422 || error.message.toLowerCase().includes("already")) {
       return redirect('/login?error=It looks like you already have an account with this email. Try logging in!')
    }
    return redirect('/login?error=Check your credentials')
  }

  return redirect('/dashboard')
}

// User logout
export async function logout() {
  const supabase = await createServerSideClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error logging out:', error.message)
    return
  }
  redirect('/') // Once signed out, send back to login page
}
// User: Forget password
export async function resetPasswordAction(formData: FormData) {
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm-reset`,
  })

  if (error) {
    return redirect('/forgot-password?error=' + error.message)
  }

  return redirect('/login?error=Check your email for the reset link!')
}

// Add pantry item for the logged-in user
export async function addPantryItem(formData: FormData) {
  const supabase = await createServerSideClient()
  
  // Get the current user to link the item to them
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  const name = formData.get('name') as string
  const amount = parseFloat(formData.get('amount') as string)
  const unit = formData.get('unit') as string
  const expires_at = formData.get('expires_at') as string

  const { error } = await supabase
    .from('pantry')
    .insert([
      { 
        name, 
        amount, 
        unit, 
        user_id: user.id, 
        expires_at: expires_at || null
      }
    ])

  if (error) {
    console.error('Error adding item:', error.message)
    return
  }
  revalidatePath('/dashboard')  // refresh the dashboard to show the new item
}

export async function updatePantryItem(id: string, updates: { name: string }) {
  const supabase = await createServerSideClient()
  const { error } = await supabase
    .from('pantry')
    .update(updates)
    .eq('id', id)

  if (!error) {
    revalidatePath('/pantry') // Refresh the data
  }
}

//clear all pantry items for the logged-in user
export async function clearPantry() {
  const supabase = await createServerSideClient()
    const { data: { user } } = await supabase.auth.getUser()
  if (!user) return

  // Delete all pantry items for the current user
  const { error } = await supabase
    .from('pantry')
    .delete()
    .eq('user_id', user.id)

  if (error) {
    console.error('Error clearing pantry:', error.message)
    return
  }
  revalidatePath('/dashboard')  // refresh the dashboard to show the new item
}


// delete pantry items
export async function deletePantryItem(id: string | number) {
  const supabase = await createServerSideClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  // Supabase RLS will also block this if the user_id doesn't match
  const { error } = await supabase
    .from('pantry')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id) // Double-check security: item must belong to this user

  if (error) {
    console.error('Delete error:', error.message)
    return { error: error.message }
  }
  revalidatePath('/dashboard')
}

// Generate recipe based on pantry items
export async function generateRecipe(ingredients: any[]) {
  try {
    const list = ingredients.map(i => `${i.amount} ${i.unit} of ${i.name}`).join(", ");
    
    const chatCompletion = await groq.chat.completions.create({
        messages: [{
        role: "system",
        content: `You are a creative chef. 
          Return exactly four meal ideas based on the user's ingredients. 
          The four meal ideas should be diverse and unique and not repeat the same type of dish.
          If the item is almost expired, prioritize using it in the recipes.
          Return ONLY a JSON object with this structure:
          {
            "ideas": [
              {
                "name": "Dish Name",
                "description": "Short 1-sentence description",
                "recipe": "Quick 3-step instructions",
                "imageSearchTerm": "A single food-related keyword for an image search"
              }
            ]
          }`
        },
        { role: "user", content: `Ingredients: ${list}` }
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" }, // Forces JSON output
    });

    return chatCompletion.choices[0]?.message?.content || "No recipe found.";
  } catch (error) {
    console.error("Groq Error:", error);
    return "The kitchen is closed! (API Error)";
  }
}