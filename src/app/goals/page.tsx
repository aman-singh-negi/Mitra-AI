'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Plus, X, Target, Calendar, Loader2 } from 'lucide-react'
import { createGoal, getGoals, deleteGoal, updateGoal } from '@/server/actions/goals'

type GoalPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

interface Goal {
  id: string
  name: string
  description: string | null
  category: string | null
  priority: GoalPriority
  target_date: string | null
  status: string
  progress: number
  created_at: string
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    name: '',
    description: '',
    category: '',
    priority: 'MEDIUM' as GoalPriority,
    target_date: '',
  })

  useEffect(() => {
    loadGoals()
  }, [])

  const loadGoals = async () => {
    try {
      setLoading(true)
      const data = await getGoals()
      setGoals(data || [])
    } catch (error) {
      console.error('Failed to load goals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGoal.name.trim()) return

    try {
      await createGoal({
        name: newGoal.name,
        description: newGoal.description,
        category: newGoal.category,
        priority: newGoal.priority,
        target_date: newGoal.target_date || undefined,
      })
      setNewGoal({ name: '', description: '', category: '', priority: 'MEDIUM', target_date: '' })
      setShowCreateForm(false)
      await loadGoals()
    } catch (error) {
      console.error('Failed to create goal:', error)
      alert('Failed to create goal. Please try again.')
    }
  }

  const handleDeleteGoal = async (goalId: string) => {
    try {
      await deleteGoal(goalId)
      await loadGoals()
    } catch (error) {
      console.error('Failed to delete goal:', error)
      alert('Failed to delete goal. Please try again.')
    }
  }

  const handleUpdateProgress = async (goalId: string, progress: number) => {
    try {
      await updateGoal(goalId, { progress })
      await loadGoals()
    } catch (error) {
      console.error('Failed to update goal:', error)
      alert('Failed to update goal. Please try again.')
    }
  }

  const priorityColors = {
    LOW: 'bg-blue-100 text-blue-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Goals</h1>
          <p className="text-gray-600 mt-1">Track your long-term goals</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Goal Name
                </label>
                <Input
                  id="name"
                  placeholder="Goal name"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Goal description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Input
                    id="category"
                    placeholder="e.g., Health, Career"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <select
                    id="priority"
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as GoalPriority })}
                    className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm"
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="target_date" className="text-sm font-medium">
                  Target Date
                </label>
                <Input
                  id="target_date"
                  type="date"
                  value={newGoal.target_date}
                  onChange={(e) => setNewGoal({ ...newGoal, target_date: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit">Create Goal</Button>
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
              <p className="text-gray-500 mt-2">Loading goals...</p>
            </CardContent>
          </Card>
        ) : goals.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <Target className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">No goals yet</p>
            </CardContent>
          </Card>
        ) : (
          goals.map((goal) => (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                    {goal.category && (
                      <span className="inline-block mt-2 text-xs text-gray-500">
                        {goal.category}
                      </span>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteGoal(goal.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {goal.description && (
                  <p className="text-sm text-gray-600 mb-4">{goal.description}</p>
                )}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Progress</span>
                    <span className="font-medium">{goal.progress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={goal.progress}
                    onChange={(e) => handleUpdateProgress(goal.id, parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {goal.target_date ? new Date(goal.target_date).toLocaleDateString() : 'No target date'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
