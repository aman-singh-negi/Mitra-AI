import { Card, CardContent } from '@/components/ui/card'
import { Inbox } from 'lucide-react'

export default function InboxPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Inbox</h1>
        <p className="text-gray-600 mt-1">Quick capture for tasks and ideas</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <Inbox className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
