import { beforeEach, describe, expect, it, vi } from 'vitest'
import { RateLimitError, isRateLimitError, translateToShakespearean } from './shakespeare.service'

describe('shakespeare.service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  describe('translateToShakespearean', () => {
    it('should translate text to Shakespearean style', async () => {
      const mockResponse = {
        success: { total: 1 },
        contents: {
          translated: 'Thee art a pokemon!',
          text: 'You are a pokemon!',
          translation: 'shakespeare',
        },
      }

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await translateToShakespearean('You are a pokemon!')

      expect(result).toBe('Thee art a pokemon!')
    })

    it('should throw RateLimitError when rate limited', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: () =>
          Promise.resolve({
            error: {
              code: 429,
              message:
                'Too Many Requests: Rate limit of 10 requests per hour exceeded. Please wait for 30 minutes and 4 seconds.',
            },
          }),
      })

      try {
        await translateToShakespearean('You are a pokemon!')
      } catch (error) {
        expect(isRateLimitError(error)).toBe(true)
        if (isRateLimitError(error)) {
          // 30 min (1800s) + 4s = 1804s
          expect(error.waitSeconds).toBe(1804)
          expect(error.name).toBe('RateLimitError')
        }
      }
    })

    it('should default waitSeconds to 1 hour if message parsing fails', async () => {
       global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 429,
        json: () =>
          Promise.resolve({
            error: {
              code: 429,
              message: 'Rate limit exceeded',
            },
          }),
      })

      try {
        await translateToShakespearean('Test')
      } catch (error) {
         if (isRateLimitError(error)) {
          expect(error.waitSeconds).toBe(3600)
         }
      }
    })

    it('should throw generic error on other failures', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Server Error',
      })

      await expect(translateToShakespearean('Test')).rejects.toThrow('Translation failed')
    })
  })

  describe('isRateLimitError', () => {
    it('should identify RateLimitError correctly', () => {
      const error = new Error('Limit') as RateLimitError
      error.name = 'RateLimitError'
      error.waitSeconds = 100
      expect(isRateLimitError(error)).toBe(true)
    })

    it('should return false for standard Error', () => {
      expect(isRateLimitError(new Error('Generic'))).toBe(false)
    })
  })
})
