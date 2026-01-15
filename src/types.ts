export interface Pokemon {
  id: number
  name: string
  description: string | null
  shakespeareanDescription: string
  imageUrl: string
}

export interface PokemonSpeciesResponse {
  id: number
  name: string
  flavor_text_entries: FlavorTextEntry[]
}

export interface FlavorTextEntry {
  flavor_text: string
  language: {
    name: string
    url: string
  }
  version: {
    name: string
    url: string
  }
}

export interface ShakespeareTranslationResponse {
  success: {
    total: number
  }
  contents: {
    translated: string
    text: string
    translation: string
  }
}

export interface FavoritePokemon {
  id: number
  name: string
  imageUrl: string
  spriteUrl?: string
  description: string | null
  shakespeareanDescription?: string
  types: string[]
  height: number
  weight: number
}

export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: PokemonListItem[]
}

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonWithDescription {
  id: number
  name: string
  description: string
  imageUrl: string
  spriteUrl?: string
  types: string[]
  height: number
  weight: number
}
