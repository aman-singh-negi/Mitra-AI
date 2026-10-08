'use server'

// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createHabit(data: {
  name: string
  description?: string
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY'
  target: number
  reminder?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase.from('habits').insert({
    user_id: user.id,
    name: data.name,
    description: data.description || null,
    frequency: data.frequency,
    target: data.target,
    reminder: data.reminder || null,
    start_date: new Date().toISOString().split('T')[0],
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/habits')
  revalidatePath('/dashboard')
}

export async function getHabits() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('habits')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getHabitCompletions(habitId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('habit_completions')
    .select('*')
    .eq('habit_id', habitId)

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function completeHabit(habitId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const today = new Date().toISOString().split('T')[0]

  const { error } = await supabase.from('habit_completions').insert({
    habit_id: habitId,
    completed_at: today,
  } as any)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/habits')
  revalidatePath('/dashboard')
}

export async function updateHabit(id: string, data: {
  name?: string
  description?: string
  frequency?: 'DAILY' | 'WEEKLY' | 'MONTHLY'
  target?: number
  reminder?: string
  status?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('habits')
    .update(data as any)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/habits')
  revalidatePath('/dashboard')
}

export async function deleteHabit(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('habits')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/habits')
  revalidatePath('/dashboard')
}
