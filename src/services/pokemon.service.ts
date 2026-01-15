import type { PokemonListResponse, PokemonSpeciesResponse, PokemonWithDescription } from '@/types'

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(
  offset: number = 0,
  limit: number = 20,
): Promise<PokemonListResponse> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`)

  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list')
  }

  return response.json()
}

// Fetch all pokemon names and urls for client-side filtering
export async function fetchAllPokemonBasicInfo(): Promise<PokemonListResponse> {
  // Limit 10000 to get all pokemon
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=10000`)

  if (!response.ok) {
    throw new Error('Failed to fetch all Pokemon')
  }

  return response.json()
}

interface TypePokemonResponse {
  pokemon: {
    pokemon: {
      name: string
      url: string
    }
  }[]
}

export async function fetchPokemonByType(type: string): Promise<{ name: string; url: string }[]> {
  const response = await fetch(`${POKEAPI_BASE_URL}/type/${type.toLowerCase()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon by type')
  }

  const data: TypePokemonResponse = await response.json()
  return data.pokemon.map((p) => ({
    name: p.pokemon.name,
    url: p.pokemon.url,
  }))
}

export async function fetchPokemonSpecies(name: string): Promise<PokemonSpeciesResponse> {
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon-species/${name.toLowerCase()}`)

  if (!response.ok) {
    throw new Error('Pokemon not found')
  }

  return response.json()
}

// RateLimitError and translateToShakespearean moved to shakespeare.service.ts
function getEnglishFlavorText(entries: PokemonSpeciesResponse['flavor_text_entries']): string {
  const englishEntry = entries.find((entry) => entry.language.name === 'en')
  if (!englishEntry) return ''
  return englishEntry.flavor_text.replace(/\f|\n/g, ' ').replace(/\s+/g, ' ').trim()
}

function extractIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean)
  return parseInt(parts[parts.length - 1], 10)
}

export async function getPokemonWithDescription(
  name: string,
  url: string,
): Promise<PokemonWithDescription> {
  const id = extractIdFromUrl(url)
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

  try {
    const [species, pokemonData] = await Promise.all([
      fetchPokemonSpecies(name),
      fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`).then((r) => r.json()),
    ])

    const description = getEnglishFlavorText(species.flavor_text_entries)
    const types = pokemonData.types?.map((t: { type: { name: string } }) => t.type.name) || []

    return {
      id,
      name,
      description,
      imageUrl,
      spriteUrl,
      types,
      height: pokemonData.height || 0,
      weight: pokemonData.weight || 0,
    }
  } catch {
    return {
      id,
      name,
      description: '',
      imageUrl,
      spriteUrl,
      types: [],
      height: 0,
      weight: 0,
    }
  }
}

// End of file
