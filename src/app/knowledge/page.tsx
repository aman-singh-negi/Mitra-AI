import { Card, CardContent } from '@/components/ui/card'
import { Network } from 'lucide-react'

export default function KnowledgePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Knowledge Graph</h1>
        <p className="text-gray-600 mt-1">Visualize your connections</p>
      </div>

      <Card>
        <CardContent className="py-12 text-center">
          <Network className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500">Coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
