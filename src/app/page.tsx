import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-[var(--background)] font-sans">
      <main className="flex flex-1 w-full max-w-4xl flex-col items-center justify-center py-20 px-6">
        <div className="text-center space-y-10">
          <h1 className="text-6xl font-semibold tracking-tight text-[var(--foreground)]">
            MITRA
          </h1>
          <p className="text-2xl text-[var(--muted-foreground)] max-w-2xl mx-auto font-medium">
            Your Personal AI Companion
          </p>
          <p className="text-[var(--muted-foreground)] max-w-xl mx-auto text-lg leading-relaxed">
            An AI-powered personal productivity and life-management platform that understands how you work and helps you achieve your goals.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90 active:scale-[0.98] h-12 px-10"
            >
              Get Started
            </Link>
            <Link
              href="/api/health"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 border border-[var(--border)] bg-transparent hover:bg-[var(--accent)] text-[var(--foreground)] active:scale-[0.98] h-12 px-10"
            >
              Health Check
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
