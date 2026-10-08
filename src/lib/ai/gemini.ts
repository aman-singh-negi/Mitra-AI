import { GoogleGenerativeAI } from '@google/generative-ai'
import { env } from '@/lib/validation/env'

export interface AIResponse {
  text: string
  error?: string
}

function getGeminiModel() {
  if (!env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set')
  }

  if (!env.GEMINI_MODEL) {
    throw new Error('GEMINI_MODEL is not set')
  }

  const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY)
  return genAI.getGenerativeModel({ model: env.GEMINI_MODEL })
}

export async function generateText(prompt: string): Promise<AIResponse> {
  try {
    const model = getGeminiModel()
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return { text }
  } catch (error) {
    console.error('Gemini API error:', error)
    return {
      text: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}

export async function generateStructuredResponse<T>(
  prompt: string,
  schema: any
): Promise<{ data: T | null; error?: string }> {
  try {
    const model = getGeminiModel()
    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    // Parse the structured response
    const data = JSON.parse(text) as T

    return { data }
  } catch (error) {
    console.error('Gemini structured API error:', error)
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
