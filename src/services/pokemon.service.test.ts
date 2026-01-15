import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchPokemonSpecies } from './pokemon.service'
import { translateToShakespearean } from './shakespeare.service'

describe('pokemon.service', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  describe('fetchPokemonSpecies', () => {
    it('should fetch pokemon species data from PokeAPI', async () => {
      const mockResponse = {
        id: 25,
        name: 'pikachu',
        flavor_text_entries: [
          {
            flavor_text: 'A mouse-type Pokemon.',
            language: { name: 'en', url: '' },
            version: { name: 'red', url: '' },
          },
        ],
      }

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await fetchPokemonSpecies('pikachu')

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon-species/pikachu')
      expect(result).toEqual(mockResponse)
    })

    it('should throw error when pokemon is not found', async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        status: 404,
      })

      await expect(fetchPokemonSpecies('notapokemon')).rejects.toThrow('Pokemon not found')
    })
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

      await expect(translateToShakespearean('You are a pokemon!')).rejects.toMatchObject({
        name: 'RateLimitError',
      })
    })
  })
})
