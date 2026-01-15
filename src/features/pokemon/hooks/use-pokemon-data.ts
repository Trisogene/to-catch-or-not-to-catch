import { useQueries, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import {
  fetchAllPokemonBasicInfo,
  fetchPokemonByType,
  getPokemonWithDescription,
} from '@/services/pokemon.service'
import { useAppStore } from '@/store/use-app-store'

export function usePokemonData() {
  const searchQuery = useAppStore((state) => state.searchQuery)
  const selectedTypes = useAppStore((state) => state.selectedTypes)

  // 1. Fetch ALL pokemon names (Global Search)
  const { data: allPokemonData, isLoading: isLoadingAll } = useQuery({
    queryKey: ['allPokemonBasic'],
    queryFn: fetchAllPokemonBasicInfo,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  // 2. Fetch pokemon by Type if filters active
  const { data: typeFilteredPokemon, isLoading: isLoadingTypes } = useQuery({
    queryKey: ['pokemonByTypes', selectedTypes],
    queryFn: async () => {
      if (selectedTypes.length === 0) return null
      const nestedResults = await Promise.all(selectedTypes.map((type) => fetchPokemonByType(type)))
      const allResults = nestedResults.flat()
      const seen = new Set()
      const deduped: { name: string; url: string }[] = []

      for (const p of allResults) {
        if (!seen.has(p.name)) {
          seen.add(p.name)
          deduped.push(p)
        }
      }
      return deduped
    },
    enabled: selectedTypes.length > 0,
    staleTime: 1000 * 60 * 60, // 1 hour
  })

  // 3. Filter Logic
  const filteredList = useMemo(() => {
    if (!allPokemonData?.results) return []

    let list =
      selectedTypes.length > 0 && typeFilteredPokemon ? typeFilteredPokemon : allPokemonData.results

    if (searchQuery) {
      const q = searchQuery.toLowerCase().trim()
      list = list.filter((p: { name: string }) => p.name.includes(q))
    }

    return list
  }, [allPokemonData, typeFilteredPokemon, searchQuery, selectedTypes])

  const isLoading = isLoadingAll || (selectedTypes.length > 0 && isLoadingTypes)

  return {
    filteredList,
    isLoading,
  }
}

export function usePokemonDetails(visibleList: { name: string; url: string }[]) {
  const pokemonDetailQueries = useQueries({
    queries: visibleList.map((p) => ({
      queryKey: ['pokemonDetail', p.name],
      queryFn: () => getPokemonWithDescription(p.name, p.url),
      staleTime: 1000 * 60 * 60,
    })),
  })

  const detailsMap = useMemo(() => {
    const map = new Map()
    pokemonDetailQueries.forEach((q) => {
      if (q.data) map.set(q.data.name, q.data)
    })
    return map
  }, [pokemonDetailQueries])

  return detailsMap
}
