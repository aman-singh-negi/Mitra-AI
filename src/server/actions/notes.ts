'use server'

// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createNote(data: {
  title: string
  content: string
  tags?: string[]
  category?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase.from('notes').insert({
    user_id: user.id,
    title: data.title,
    content: data.content,
    tags: data.tags || [],
    category: data.category || null,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/notes')
  revalidatePath('/dashboard')
}

export async function getNotes() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('user_id', user.id)
    .order('updated_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateNote(id: string, data: {
  title?: string
  content?: string
  tags?: string[]
  category?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('notes')
    .update(data as any)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/notes')
  revalidatePath('/dashboard')
}

export async function deleteNote(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/notes')
  revalidatePath('/dashboard')
}
