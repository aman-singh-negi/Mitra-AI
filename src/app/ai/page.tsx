import { Card, CardContent } from '@/components/ui/card'
import { MessageSquare } from 'lucide-react'

export default function AIPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">AI Companion</h1>
        <p className="text-gray-600 mt-1">Your personal AI assistant</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <MessageSquare className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Configure Supabase and Gemini API credentials to enable AI features</p>
        </CardContent>
      </Card>
    </div>
  )
}
