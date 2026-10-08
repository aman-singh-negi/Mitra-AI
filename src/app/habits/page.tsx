'use client'

// @ts-nocheck
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Plus, X, Flame, CheckCircle, Loader2 } from 'lucide-react'
import { createHabit, getHabits, deleteHabit, completeHabit, getHabitCompletions } from '@/server/actions/habits'

interface Habit {
  id: string
  name: string
  description: string | null
  frequency: string
  target: number
  start_date: string
  status: string
}

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [completions, setCompletions] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newHabit, setNewHabit] = useState({
    name: '',
    description: '',
    frequency: 'DAILY',
    target: 1,
  })

  useEffect(() => {
    loadHabits()
  }, [])

  const loadHabits = async () => {
    try {
      setLoading(true)
      const data = await getHabits()
      setHabits(data || [])

      const completionsData: Record<string, string[]> = {}
      for (const habit of data || []) {
        const habitCompletions = await getHabitCompletions(habit.id)
        completionsData[habit.id] = habitCompletions?.map((c: any) => c.completed_at) || []
      }
      setCompletions(completionsData)
    } catch (error) {
      console.error('Failed to load habits:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newHabit.name.trim()) return

    try {
      await createHabit({
        name: newHabit.name,
        description: newHabit.description,
        frequency: newHabit.frequency as 'DAILY' | 'WEEKLY' | 'MONTHLY',
        target: newHabit.target,
      })
      setNewHabit({ name: '', description: '', frequency: 'DAILY', target: 1 })
      setShowCreateForm(false)
      await loadHabits()
    } catch (error) {
      console.error('Failed to create habit:', error)
      alert('Failed to create habit. Please try again.')
    }
  }

  const handleDeleteHabit = async (habitId: string) => {
    try {
      await deleteHabit(habitId)
      await loadHabits()
    } catch (error) {
      console.error('Failed to delete habit:', error)
      alert('Failed to delete habit. Please try again.')
    }
  }

  const handleCompleteHabit = async (habitId: string) => {
    try {
      await completeHabit(habitId)
      await loadHabits()
    } catch (error) {
      console.error('Failed to complete habit:', error)
      alert('Failed to complete habit. Please try again.')
    }
  }

  const getStreak = (habitId: string) => {
    let streak = 0
    const today = new Date()
    const habitCompletions = completions[habitId] || []
    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      if (habitCompletions.includes(dateStr)) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return streak
  }

  const getToday = () => new Date().toISOString().split('T')[0]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Habits</h1>
          <p className="text-gray-600 mt-1">Track your daily habits</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          New Habit
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Habit</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateHabit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Habit Name
                </label>
                <Input
                  id="name"
                  placeholder="e.g., Exercise, Read, Meditate"
                  value={newHabit.name}
                  onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Habit description"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="frequency" className="text-sm font-medium">
                    Frequency
                  </label>
                  <select
                    id="frequency"
                    value={newHabit.frequency}
                    onChange={(e) => setNewHabit({ ...newHabit, frequency: e.target.value })}
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="DAILY">Daily</option>
                    <option value="WEEKLY">Weekly</option>
                    <option value="MONTHLY">Monthly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="target" className="text-sm font-medium">
                    Target (times per frequency)
                  </label>
                  <Input
                    id="target"
                    type="number"
                    min="1"
                    value={newHabit.target}
                    onChange={(e) => setNewHabit({ ...newHabit, target: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Habit</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <Loader2 className="h-8 w-8 mx-auto text-gray-400 animate-spin" />
              <p className="text-gray-500 mt-2">Loading habits...</p>
            </CardContent>
          </Card>
        ) : habits.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <Flame className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No habits yet</p>
            </CardContent>
          </Card>
        ) : (
          habits.map((habit) => {
            const streak = getStreak(habit.id)
            const today = getToday()
            const completedToday = (completions[habit.id] || []).includes(today)

            return (
              <Card key={habit.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{habit.name}</CardTitle>
                      <span className="inline-block mt-2 text-xs text-gray-500">
                        {habit.frequency} • Target: {habit.target}
                      </span>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteHabit(habit.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {habit.description && (
                    <p className="text-sm text-gray-600 mb-4">{habit.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span className="font-medium">{streak} day streak</span>
                    </div>
                    <Button
                      size="sm"
                      variant={completedToday ? 'secondary' : 'default'}
                      onClick={() => handleCompleteHabit(habit.id)}
                      disabled={completedToday}
                    >
                      {completedToday ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Done
                        </>
                      ) : (
                        'Complete'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
