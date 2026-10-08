'use server'

// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createGoal(data: {
  name: string
  description?: string
  category?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  target_date?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase.from('goals').insert({
    user_id: user.id,
    name: data.name,
    description: data.description || null,
    category: data.category || null,
    priority: data.priority,
    target_date: data.target_date || null,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/goals')
  revalidatePath('/dashboard')
}

export async function getGoals() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('goals')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateGoal(id: string, data: {
  name?: string
  description?: string
  category?: string
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  target_date?: string
  status?: string
  progress?: number
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('goals')
    .update(data as any)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/goals')
  revalidatePath('/dashboard')
}

export async function deleteGoal(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('goals')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/goals')
  revalidatePath('/dashboard')
}
