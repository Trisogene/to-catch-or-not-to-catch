import { useVirtualizer } from '@tanstack/react-virtual'
import { useEffect, useMemo, useRef, useState } from 'react'
import { usePokemonData, usePokemonDetails } from '@/features/pokemon/hooks/use-pokemon-data'
import { useAppStore } from '@/store/use-app-store'
import { PokemonGridCard } from './pokemon-grid-card'

export function PokemonList() {
  const isSearching = useAppStore((state) => state.isSearching)
  const parentRef = useRef<HTMLDivElement>(null)

  // Custom Hooks
  const { filteredList, isLoading } = usePokemonData()

  // Grid responsiveness: 1 column by default, 2 columns on 'md' (768px+)
  const [columns, setColumns] = useState(1)

  useEffect(() => {
    const checkColumns = () => {
      // Logic matching standard Tailwind 'md' breakpoint (768px)
      // Note: PokemonGridCard uses grid-cols-1 md:grid-cols-2
      if (window.matchMedia('(min-width: 768px)').matches) {
        setColumns(2)
      } else {
        setColumns(1)
      }
    }

    checkColumns()
    window.addEventListener('resize', checkColumns)
    return () => window.removeEventListener('resize', checkColumns)
  }, [])

  // Virtualization
  const rowCount = Math.ceil(filteredList.length / columns)

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400, // Approximate height of a card row
    overscan: 5,
  })

  // We need details for the currently visible items
  // With virtualization, we calculate which items are visible
  const virtualRows = rowVirtualizer.getVirtualItems()
  
  // Calculate the range of items currently rendered to fetch details for them
  // This is a bit of an optimization: we only want to fetch details for the items that are "visible" (virtualized)
  const visibleItems = useMemo(() => {
    if (!virtualRows.length) return []
    
    const startRow = virtualRows[0].index
    const endRow = virtualRows[virtualRows.length - 1].index
    
    const startIndex = startRow * columns
    const endIndex = Math.min((endRow + 1) * columns, filteredList.length)
    
    return filteredList.slice(startIndex, endIndex)
  }, [virtualRows, columns, filteredList])

  const detailsMap = usePokemonDetails(visibleItems)

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
            {Array.from({ length: 6 }).map((_, i) => (
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
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualRows.map((virtualRow) => {
              const rowIndex = virtualRow.index
              const startItemIndex = rowIndex * columns
              const itemsInRow = filteredList.slice(
                startItemIndex,
                Math.min(startItemIndex + columns, filteredList.length),
              )

              return (
                <div
                  key={virtualRow.key}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6"
                >
                  {itemsInRow.map((item: { name: string; url: string }) => {
                    const details = detailsMap.get(item.name)
                    const isLoading = !details

                    if (isLoading) {
                      return (
                        <div
                          key={item.name}
                          className="h-full w-full rounded-3xl bg-muted/20 animate-shimmer border border-border/30"
                        />
                      )
                    }

                    return <PokemonGridCard key={details.name} details={details} />
                  })}
                  {/* Fill empty space if last row has fewer items than columns */}
                  {itemsInRow.length < columns && <div className="hidden md:block" />}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
