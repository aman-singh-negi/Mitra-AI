import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-50 font-sans">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-20 px-6">
        <div className="text-center space-y-8">
          <h1 className="text-5xl font-semibold tracking-tight text-gray-900">
            MITRA
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your Personal AI Companion
          </p>
          <p className="text-gray-500 max-w-xl mx-auto">
            An AI-powered personal productivity and life-management platform that understands how you work and helps you achieve your goals.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-gray-900 text-white hover:bg-gray-800 h-11 px-8"
            >
              Get Started
            </Link>
            <Link
              href="/api/health"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border border-gray-300 bg-transparent hover:bg-gray-50 h-11 px-8"
            >
              Health Check
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
