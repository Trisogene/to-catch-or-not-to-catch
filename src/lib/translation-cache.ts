const TRANSLATIONS_STORAGE_KEY = 'shakespeare-translations'

interface TranslationCache {
  [pokemonId: number]: {
    originalDescription: string
    shakespeareanDescription: string
    timestamp: number
  }
}

export function getTranslationCache(): TranslationCache {
  try {
    const stored = localStorage.getItem(TRANSLATIONS_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function getCachedTranslation(pokemonId: number): string | null {
  const cache = getTranslationCache()
  const entry = cache[pokemonId]
  return entry?.shakespeareanDescription || null
}

export function setCachedTranslation(
  pokemonId: number,
  originalDescription: string,
  shakespeareanDescription: string,
): void {
  const cache = getTranslationCache()
  cache[pokemonId] = {
    originalDescription,
    shakespeareanDescription,
    timestamp: Date.now(),
  }
  localStorage.setItem(TRANSLATIONS_STORAGE_KEY, JSON.stringify(cache))
}

export function getAllCachedTranslations(): TranslationCache {
  return getTranslationCache()
}
