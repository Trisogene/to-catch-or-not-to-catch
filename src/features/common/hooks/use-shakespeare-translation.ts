import { useMutation } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { getCachedTranslation, setCachedTranslation } from '@/lib/translation-cache'
import { isRateLimitError, translateToShakespearean } from '@/services/shakespeare.service'
import { useAppStore } from '@/store/use-app-store'
import type { FavoritePokemon } from '@/types'

export function useShakespeareTranslation() {
  const [rateLimitError, setRateLimitError] = useState<string | null>(null)
  const updateFavorite = useAppStore((state) => state.updateFavorite)

  const mutation = useMutation({
    mutationFn: async (pokemon: { id: number; description?: string | null }) => {
      if (!pokemon.description) throw new Error('No description to translate')

      const translation = await translateToShakespearean(pokemon.description)
      setCachedTranslation(pokemon.id, pokemon.description, translation)
      return { id: pokemon.id, translation }
    },
    onSuccess: ({ id, translation }) => {
      setRateLimitError(null)
      // If the pokemon is a favorite, update it in the store
      // We assume the caller might want to do local state updates too
      updateFavorite({ id, shakespeareanDescription: translation } as FavoritePokemon)
    },
    onError: (error) => {
      if (isRateLimitError(error)) {
        setRateLimitError('Rate limit reached (10/hour). Try again later.')
      }
    },
  })

  const translate = useCallback(
    (pokemon: { id: number; description?: string | null }) => {
      setRateLimitError(null)
      if (!pokemon.description) return

      const cached = getCachedTranslation(pokemon.id)
      if (cached) {
        // If cached, we can effectively "simulate" a success or just return it.
        // For consistency with the mutation pattern, we might want to ensure the UI updates.
        // Since this hook is intended to be used where we want the result,
        // we can update the favorite store immediately if it's there.
        updateFavorite({ id: pokemon.id, shakespeareanDescription: cached } as FavoritePokemon)
        return cached
      }

      mutation.mutate(pokemon)
      return null
    },
    [mutation, updateFavorite],
  )

  return {
    translate,
    isLoading: mutation.isPending,
    error: rateLimitError,
    activeId: mutation.variables?.id,
  }
}
