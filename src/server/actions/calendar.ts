'use server'

// @ts-nocheck
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createEvent(data: {
  title: string
  description?: string
  start_time: string
  end_time: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase.from('calendar_events').insert({
    user_id: user.id,
    title: data.title,
    description: data.description || null,
    start_time: data.start_time,
    end_time: data.end_time,
  } as any)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/calendar')
  revalidatePath('/dashboard')
}

export async function getEvents() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data, error } = await supabase
    .from('calendar_events')
    .select('*')
    .eq('user_id', user.id)
    .order('start_time', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateEvent(id: string, data: {
  title?: string
  description?: string
  start_time?: string
  end_time?: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('calendar_events')
    .update(data as any)
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/calendar')
  revalidatePath('/dashboard')
}

export async function deleteEvent(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { error } = await supabase
    .from('calendar_events')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/calendar')
  revalidatePath('/dashboard')
}
