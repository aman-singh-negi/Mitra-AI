import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { env } from '@/lib/validation/env'

export async function GET() {
  try {
    const checks = {
      application: true,
      database: false,
      environment: false,
    }

    const errors: Record<string, string> = {}

    try {
      const supabase = await createClient()
      const { error } = await supabase.from('profiles').select('id').limit(1)
      if (error) {
        errors.database = error.message
      } else {
        checks.database = true
      }
    } catch (dbError) {
      errors.database = dbError instanceof Error ? dbError.message : 'Database connection failed'
    }

    try {
      env
      checks.environment = true
    } catch (envError) {
      errors.environment = envError instanceof Error ? envError.message : 'Environment validation failed'
    }

    const allHealthy = Object.values(checks).every(Boolean)

    const health = {
      status: allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      checks,
      errors: Object.keys(errors).length > 0 ? errors : undefined,
    }

    return NextResponse.json(health, { status: allHealthy ? 200 : 503 })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
