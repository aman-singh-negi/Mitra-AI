'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckSquare, FolderKanban, Target, Flame, FileText, Sparkles, Loader2 } from 'lucide-react'
import { getTasks } from '@/server/actions/tasks'
import { getProjects } from '@/server/actions/projects'
import { getGoals } from '@/server/actions/goals'
import { getHabits } from '@/server/actions/habits'
import { getNotes } from '@/server/actions/notes'

export default function DashboardPage() {
  const [greeting, setGreeting] = useState('Welcome')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    tasks: 0,
    completedToday: 0,
    projects: 0,
    goals: 0,
    averageProgress: 0,
    habits: 0,
    streak: 0,
    notes: 0,
    completionRate: 0,
  })

  useEffect(() => {
    const today = new Date()
    const hour = today.getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      const [tasks, projects, goals, habits, notes] = await Promise.all([
        getTasks(),
        getProjects(),
        getGoals(),
        getHabits(),
        getNotes(),
      ])

      const today = new Date().toISOString().split('T')[0]
      const completedToday = tasks?.filter((t: any) => t.status === 'COMPLETED' && t.completed_at?.startsWith(today)).length || 0
      const totalTasks = tasks?.length || 0
      const totalCompleted = tasks?.filter((t: any) => t.status === 'COMPLETED').length || 0
      const completionRate = totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0
      const averageProgress = goals?.length > 0
        ? Math.round(goals.reduce((sum: number, g: any) => sum + g.progress, 0) / goals.length)
        : 0

      setStats({
        tasks: totalTasks,
        completedToday,
        projects: projects?.length || 0,
        goals: goals?.length || 0,
        averageProgress,
        habits: habits?.length || 0,
        streak: 0,
        notes: notes?.length || 0,
        completionRate,
      })
    } catch (error) {
      console.error('Failed to load stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">{greeting}</h1>
        <p className="text-gray-600 mt-1">Welcome to MITRA</p>
      </div>

      {loading ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Loader2 className="h-8 w-8 mx-auto text-gray-400 animate-spin" />
            <p className="text-gray-500 mt-2">Loading dashboard...</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
                <CheckSquare className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stats.tasks}</div>
                <p className="text-xs text-gray-500 mt-1">{stats.completedToday} completed today</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <FolderKanban className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stats.projects}</div>
                <p className="text-xs text-gray-500 mt-1">Total projects</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals Progress</CardTitle>
                <Target className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stats.averageProgress}%</div>
                <p className="text-xs text-gray-500 mt-1">Average completion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Habits</CardTitle>
                <Flame className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stats.habits}</div>
                <p className="text-xs text-gray-500 mt-1">Active habits</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Notes</CardTitle>
                <FileText className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stats.notes}</div>
                <p className="text-xs text-gray-500 mt-1">Total notes</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                <Sparkles className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{stats.completionRate}%</div>
                <p className="text-xs text-gray-500 mt-1">Overall</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Personalized recommendations based on your data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600">
                  AI recommendations will be available once the recommendation engine is implemented. Currently using real data from your tasks, projects, goals, habits, and notes.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>Overview of your productivity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Total Goals</p>
                    <span className="text-sm font-medium">{stats.goals}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Active Habits</p>
                    <span className="text-sm font-medium">{stats.habits}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Total Notes</p>
                    <span className="text-sm font-medium">{stats.notes}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Getting Started</CardTitle>
                <CardDescription>Tips to make the most of MITRA</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <p className="text-sm">Create your first task</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <p className="text-sm">Set up a project</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <p className="text-sm">Define your goals</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <p className="text-sm">Track your habits</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
