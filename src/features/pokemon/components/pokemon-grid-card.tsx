import { BookOpen, Heart, Ruler, Weight } from 'lucide-react'
import { memo, useCallback, useEffect, useState } from 'react'
import { ShakespeareCard } from '@/features/common/components/shakespeare-card'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/use-app-store'

// Types
interface Pokemon {
  id: number
  name: string
  imageUrl: string
  spriteUrl?: string
  types: string[]
  height: number
  weight: number
  description: string | null
}

// Constants
const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-orange-500 text-white',
  water: 'bg-blue-500 text-white',
  grass: 'bg-emerald-500 text-white',
  electric: 'bg-yellow-400 text-gray-900',
  ice: 'bg-cyan-400 text-gray-900',
  fighting: 'bg-red-700 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-amber-600 text-white',
  flying: 'bg-indigo-400 text-white',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-gray-900',
  rock: 'bg-stone-500 text-white',
  ghost: 'bg-violet-600 text-white',
  dragon: 'bg-indigo-600 text-white',
  dark: 'bg-gray-700 text-white',
  steel: 'bg-slate-400 text-gray-900',
  fairy: 'bg-pink-300 text-gray-900',
  normal: 'bg-gray-400 text-gray-900',
}

const TYPE_GRADIENTS: Record<string, string> = {
  fire: 'type-gradient-fire',
  water: 'type-gradient-water',
  grass: 'type-gradient-grass',
  electric: 'type-gradient-electric',
  ice: 'type-gradient-ice',
  psychic: 'type-gradient-psychic',
  dragon: 'type-gradient-dragon',
  dark: 'type-gradient-dark',
  fairy: 'type-gradient-fairy',
}

const GLOW_COLORS: Record<string, string> = {
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-emerald-500',
  electric: 'bg-yellow-400',
}

// Sub-components
function PokeballDecoration() {
  return (
    <div className="absolute top-4 right-4 w-20 h-20 opacity-[0.03] pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="4" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
    </div>
  )
}

function PokemonImage({
  src,
  name,
  primaryType,
}: {
  src: string
  name: string
  primaryType: string
}) {
  const glowColor = GLOW_COLORS[primaryType] || 'bg-primary'

  return (
    <div className="relative w-24 h-24 flex-shrink-0">
      <div
        className={cn(
          'absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500',
          glowColor,
        )}
      />
      <img
        src={src}
        alt={name}
        width={96}
        height={96}
        className="w-full h-full object-contain transition-transform group-hover:scale-110 duration-300 drop-shadow-lg relative z-10"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider',
        TYPE_COLORS[type] || 'bg-gray-500 text-white',
      )}
    >
      {type}
    </span>
  )
}

function StatBadge({
  icon: Icon,
  value,
  unit,
}: {
  icon: typeof Ruler
  value: number
  unit: string
}) {
  return (
    <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground">
      <Icon className="h-3 w-3" />
      {(value / 10).toFixed(1)}
      {unit}
    </span>
  )
}

function FavoriteButton({ pokemon }: { pokemon: Pokemon }) {
  const [isAnimating, setIsAnimating] = useState(false)

  const favorites = useAppStore((state) => state.favorites)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)

  const isFavorite = favorites.some((p) => p.id === pokemon.id)

  const handleClick = useCallback(() => {
    setIsAnimating(true)
    toggleFavorite(pokemon)
  }, [pokemon, toggleFavorite])

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 400)
      return () => clearTimeout(timer)
    }
  }, [isAnimating])

  return (
    <button
      type="button"
      onClick={handleClick}
      className="p-2 -mr-2 -mt-1 rounded-full hover:bg-primary/10 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-all',
          isAnimating && 'animate-heart-bounce',
          isFavorite
            ? 'fill-primary text-primary'
            : 'text-muted-foreground/30 hover:text-primary/60',
        )}
      />
    </button>
  )
}

// Main Component

export const PokemonGridCard = memo(function PokemonGridCard({ details }: { details: Pokemon }) {
  const primaryType = details.types?.[0] || 'normal'

  const description = details.description || 'No description available for this Pokémon.'

  // The ShakespeareCard now handles its own translation logic via the hook
  return (
    <article
      className={cn(
        'relative p-5 rounded-2xl transition-all duration-300',
        'bg-card/60 backdrop-blur-md',
        'border border-white/10 hover:border-primary/20',
        'shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-primary/10',
        'group',
        TYPE_GRADIENTS[primaryType],
      )}
    >
      <PokeballDecoration />

      <div className="relative z-10 space-y-4">
        {/* Header */}
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <PokemonImage
              src={details.spriteUrl || details.imageUrl}
              name={details.name}
              primaryType={primaryType}
            />
            <span className="text-[10px] text-muted-foreground/50 font-mono font-semibold">
              #{details.id.toString().padStart(3, '0')}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold capitalize text-lg text-foreground group-hover:text-primary transition-colors">
                {details.name}
              </h3>
              <FavoriteButton pokemon={details} />
            </div>

            {details.types?.length > 0 && (
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {details.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
            )}

            <div className="flex gap-2 mt-3">
              <StatBadge icon={Ruler} value={details.height || 0} unit="m" />
              <StatBadge icon={Weight} value={details.weight || 0} unit="kg" />
            </div>
          </div>
        </div>

        {/* Pokédex Entry - Fixed 3 lines min height */}
        <div className="pt-3 border-t border-border/30">
          <div className="flex items-center gap-2 text-muted-foreground/60 mb-2">
            <BookOpen className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Pokédex Entry</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed min-h-[3.75rem]">
            {description}
          </p>
        </div>

        {/* Shakespeare Translation */}
        <ShakespeareCard pokemon={details} />
      </div>
    </article>
  )
})
