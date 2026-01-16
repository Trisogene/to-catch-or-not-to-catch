import { beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchAllPokemonBasicInfo, fetchPokemonByType, fetchPokemonList, fetchPokemonSpecies, getPokemonWithDescription } from './pokemon.service'


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

  describe('fetchPokemonList', () => {
    it('should fetch pokemon list', async () => {
      const mockResponse = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      }

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await fetchPokemonList(0, 2)

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?offset=0&limit=2')
      expect(result).toEqual(mockResponse)
    })
  })

  describe('fetchAllPokemonBasicInfo', () => {
    it('should fetch all pokemon basic info', async () => {
      const mockResponse = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        ],
      }

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await fetchAllPokemonBasicInfo()

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=10000')
      expect(result).toEqual(mockResponse)
    })
  })

  describe('fetchPokemonByType', () => {
    it('should fetch pokemon by type and transform response', async () => {
      const mockResponse = {
        pokemon: [
          {
            pokemon: {
              name: 'pikachu',
              url: 'https://pokeapi.co/api/v2/pokemon/25/',
            },
          },
        ],
      }

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      })

      const result = await fetchPokemonByType('electric')

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/type/electric')
      expect(result).toEqual([
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ])
    })
  })



  describe('getPokemonWithDescription', () => {
    it('should aggregate pokemon data and description', async () => {
      // Mock species response
      const mockSpecies = {
        flavor_text_entries: [
          {
            flavor_text: 'A mouse.',
            language: { name: 'en' },
          },
        ],
      }

      // Mock pokemon details response
      const mockPokemon = {
        types: [{ type: { name: 'electric' } }],
        height: 4,
        weight: 60,
      }

      global.fetch = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockSpecies),
        }) // First call for species
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve(mockPokemon),
        }) // Second call for pokemon details

      const result = await getPokemonWithDescription('pikachu', 'https://pokeapi.co/api/v2/pokemon/25/')

      expect(result).toEqual({
        id: 25,
        name: 'pikachu',
        description: 'A mouse.',
        imageUrl: expect.stringContaining('25.png'),
        spriteUrl: expect.stringContaining('25.png'),
        types: ['electric'],
        height: 4,
        weight: 60,
      })
    })

    it('should return default data on error', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      const result = await getPokemonWithDescription('pikachu', 'https://pokeapi.co/api/v2/pokemon/25/')

      expect(result).toEqual(expect.objectContaining({
        id: 25,
        name: 'pikachu',
        description: '',
        types: [],
      }))
    })
  })
})
