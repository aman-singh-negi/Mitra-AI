'use server'

// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createTask(data: {
  title: string
  description?: string
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  due_date?: string
  estimated_duration?: number
  project_id?: string
  goal_id?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase.from('tasks').insert({
    user_id: user.id,
    title: data.title,
    description: data.description || null,
    priority: data.priority,
    due_date: data.due_date || null,
    estimated_duration: data.estimated_duration || null,
    project_id: data.project_id || null,
    goal_id: data.goal_id || null,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/tasks')
  revalidatePath('/dashboard')
}

export async function getTasks() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateTask(id: string, data: {
  title?: string
  description?: string
  status?: 'TODO' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
  priority?: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
  due_date?: string
  estimated_duration?: number
  actual_duration?: number
  project_id?: string
  goal_id?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const updateData: any = { ...data }
  if (data.status === 'COMPLETED' && !data.completed_at) {
    updateData.completed_at = new Date().toISOString()
  }

  const { error } = await supabase
    .from('tasks')
    .update(updateData)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/tasks')
  revalidatePath('/dashboard')
}

export async function deleteTask(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/tasks')
  revalidatePath('/dashboard')
}
