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
        <div className="flex-shrink-0 pb-6 pt-4 px-6">
          <div className="h-8 w-48 bg-muted/30 animate-shimmer rounded-xl" />
        </div>
        <div className="flex-1 overflow-auto px-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: Skeleton loaders don't have IDs
                key={i}
                className="h-96 w-full rounded-3xl bg-muted/20 animate-shimmer border border-border/30"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-shrink-0 pb-6 pt-4 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight">All Pokémon</h2>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
              {filteredList.length}
            </span>
          </div>
        </div>
      </div>

      <div ref={parentRef} className="flex-1 overflow-auto px-6 w-full">
        {filteredList.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground py-16">
            <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-4 animate-float">
              <svg
                viewBox="0 0 100 100"
                className="w-12 h-12 text-muted-foreground/30"
                aria-hidden="true"
              >
                <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" />
                <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="4" />
                <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-foreground/70">No Pokémon found</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters</p>
          </div>
        ) : (
          <div className="pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      className="h-96 w-full rounded-3xl bg-muted/20 animate-shimmer border border-border/30"
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
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Loader2 className="h-6 w-6 animate-spin text-primary/50" />
                  <span className="text-sm font-medium">Loading more...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
