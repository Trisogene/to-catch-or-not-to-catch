import { Loader2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useShakespeareTranslation } from '@/features/common/hooks/use-shakespeare-translation'
import { usePokemonData, usePokemonDetails } from '@/features/pokemon/hooks/use-pokemon-data'
import { getCachedTranslation } from '@/lib/translation-cache'
import { useAppStore } from '@/store/use-app-store'
import { PokemonGridCard } from './pokemon-grid-card'

export function PokemonList() {
  const isSearching = useAppStore((state) => state.isSearching)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const favorites = useAppStore((state) => state.favorites)

  const isFavorite = (id: number) => favorites.some((p) => p.id === id)

  const parentRef = useRef<HTMLDivElement>(null)

  // Custom Hooks
  const { filteredList, isLoading } = usePokemonData()
  const {
    translate,
    isLoading: isTranslating,
    error: rateLimitError,
    activeId,
  } = useShakespeareTranslation()

  // Wrap translate to match the signature or just use it directly
  // The hook's translate returns string | null, which is fine to ignore.

  // Infinite Scroll Logic
  const [visibleCount, setVisibleCount] = useState(12)
  const loaderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setVisibleCount(12)
    if (parentRef.current) parentRef.current.scrollTop = 0
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 12, filteredList.length))
        }
      },
      { root: parentRef.current, threshold: 0.1, rootMargin: '400px' },
    )

    const currentLoader = loaderRef.current
    if (currentLoader) observer.observe(currentLoader)
    return () => {
      if (currentLoader) observer.unobserve(currentLoader)
    }
  }, [filteredList.length])

  const visibleList = useMemo(
    () => filteredList.slice(0, visibleCount),
    [filteredList, visibleCount],
  )
  const detailsMap = usePokemonDetails(visibleList)

  // Loading Skeleton
  if (isLoading || isSearching) {
    return (
      <div className="h-full flex flex-col">
        {/* Skeleton Header */}
        <div className="flex-shrink-0 pb-6 pt-4 px-8">
          <div className="h-8 w-48 bg-muted/20 animate-pulse rounded-lg" />
        </div>
        <div className="flex-1 overflow-auto px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8 pb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton loaders don't have IDs
                key={i}
                className="h-96 w-full rounded-[2rem] bg-muted/10 animate-pulse border border-border/40"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 pb-6 pt-4 px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">All Pokémon</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
              {filteredList.length}
            </span>
          </div>
        </div>
      </div>

      <div ref={parentRef} className="flex-1 overflow-auto px-8 w-full">
        {filteredList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <p className="text-lg font-medium">No Pokémon found</p>
          </div>
        ) : (
          <div className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2  gap-8">
              {visibleList.map((item: { name: string; url: string }) => {
                const details = detailsMap.get(item.name)
                const isLoading = !details
                const isFav = details ? isFavorite(details.id) : false

                // Logic to get translation: Check cache.
                const shakespeareDesc = details ? getCachedTranslation(details.id) || null : null
                const isItemTranslating = isTranslating && activeId === details?.id

                if (isLoading) {
                  return (
                    <div
                      key={item.name}
                      className="h-96 w-full rounded-[2rem] bg-muted/20 animate-pulse border border-border/40"
                    />
                  )
                }

                return (
                  <PokemonGridCard
                    key={details.name}
                    details={details}
                    isFavorite={isFav}
                    onToggleFavorite={toggleFavorite}
                    shakespeareDesc={shakespeareDesc}
                    isTranslating={isItemTranslating}
                    rateLimitError={rateLimitError}
                    onTranslate={(p) => {
                      translate(p)
                    }}
                  />
                )
              })}
            </div>

            {visibleCount < filteredList.length && (
              <div ref={loaderRef} className="h-24 flex items-center justify-center w-full mt-8">
                <Loader2 className="h-8 w-8 text-muted-foreground/40 animate-spin" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
