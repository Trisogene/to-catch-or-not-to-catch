export const SHAKESPEARE_API_URL = 'https://api.funtranslations.com/translate/shakespeare.json'

export interface RateLimitError extends Error {
  waitSeconds: number
}

export function isRateLimitError(error: unknown): error is RateLimitError {
  return error instanceof Error && error.name === 'RateLimitError' && 'waitSeconds' in error
}

export async function translateToShakespearean(text: string): Promise<string> {
  const response = await fetch(SHAKESPEARE_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `text=${encodeURIComponent(text)}`,
  })

  if (response.status === 429) {
    const data = await response.json()
    const match = data.error?.message?.match(/(\d+)\s*minutes?\s*and\s*(\d+)\s*seconds?/)
    let waitSeconds = 3600
    if (match) {
      waitSeconds = parseInt(match[1], 10) * 60 + parseInt(match[2], 10)
    }

    const error = new Error(data.error?.message || 'Rate limit exceeded') as RateLimitError
    error.name = 'RateLimitError'
    error.waitSeconds = waitSeconds
    throw error
  }

  if (!response.ok) {
    throw new Error('Translation failed')
  }

  const data = await response.json()
  return data.contents.translated
}
