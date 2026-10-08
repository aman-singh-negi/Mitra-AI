import { NextResponse } from 'next/server'
import { generateText } from '@/lib/ai/gemini'

export async function GET() {
  try {
    const testPrompt = 'Respond with exactly: {"status": "ok"}'
    const result = await generateText(testPrompt)

    if (result.error) {
      return NextResponse.json(
        {
          status: 'error',
          provider: 'gemini',
          error: result.error,
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      status: 'ok',
      provider: 'gemini',
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        provider: 'gemini',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
