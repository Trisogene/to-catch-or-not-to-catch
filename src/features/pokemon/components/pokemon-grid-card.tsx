import { BookOpen, Heart, Ruler, Weight } from 'lucide-react'
import { memo } from 'react'
import { ShakespeareCard } from '@/features/common/components/shakespeare-card'
import { cn } from '@/lib/utils'

// Re-defining for self-containment or import from types if available
interface DetailedPokemon {
  id: number
  name: string
  imageUrl: string
  spriteUrl?: string
  types: string[]
  height: number
  weight: number
  description: string | null
}

interface PokemonGridCardProps {
  details: DetailedPokemon
  isFavorite: boolean
  onToggleFavorite: (pokemon: DetailedPokemon) => void
  shakespeareDesc: string | null
  isTranslating: boolean
  rateLimitError: string | null
  onTranslate: (pokemon: DetailedPokemon) => void
}

const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-orange-500/80 text-white',
  water: 'bg-blue-500/80 text-white',
  grass: 'bg-green-500/80 text-white',
  electric: 'bg-yellow-500/80 text-black',
  ice: 'bg-cyan-400/80 text-black',
  fighting: 'bg-red-700/80 text-white',
  poison: 'bg-purple-500/80 text-white',
  ground: 'bg-amber-600/80 text-white',
  flying: 'bg-indigo-400/80 text-white',
  psychic: 'bg-pink-500/80 text-white',
  bug: 'bg-lime-500/80 text-black',
  rock: 'bg-stone-500/80 text-white',
  ghost: 'bg-violet-600/80 text-white',
  dragon: 'bg-indigo-600/80 text-white',
  dark: 'bg-gray-700/80 text-white',
  steel: 'bg-slate-400/80 text-black',
  fairy: 'bg-pink-300/80 text-black',
  normal: 'bg-gray-400/80 text-black',
}

export const PokemonGridCard = memo(function PokemonGridCard({
  details,
  isFavorite,
  onToggleFavorite,
  shakespeareDesc,
  isTranslating,
  rateLimitError,
  onTranslate,
}: PokemonGridCardProps) {
  return (
    <div className="relative p-4 sm:p-6 rounded-[2rem] bg-card hover:bg-card/90 transition-all duration-300 h-full flex flex-col border border-border/40 hover:border-amber-500/30 hover:shadow-xl group">
      <div className="space-y-3 flex-1 flex flex-col">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-transparent rounded-full transition-all duration-500" />
              <img
                src={details.spriteUrl || details.imageUrl}
                alt={details.name}
                width={96}
                height={96}
                className="w-24 h-24 object-contain transition-transform hover:scale-110 duration-300 drop-shadow-sm"
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className="text-xs text-muted-foreground font-mono font-medium opacity-70">
              #{details.id.toString().padStart(3, '0')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold capitalize text-lg tracking-tight text-foreground/90 group-hover:text-foreground transition-colors">
                {details.name}
              </h3>
              <button
                type="button"
                onClick={() => onToggleFavorite(details)}
                className="p-2 -mr-2 -mt-2 rounded-full hover:bg-muted/50 transition-colors focus:outline-none"
              >
                <Heart
                  className={cn(
                    'h-6 w-6 transition-all',
                    isFavorite
                      ? 'fill-red-500 text-red-500 scale-110 drop-shadow-sm'
                      : 'text-muted-foreground/40 hover:text-red-400',
                  )}
                />
              </button>
            </div>

            {details.types && details.types.length > 0 && (
              <div className="flex gap-1.5 mt-2 flex-wrap">
                {(details.types || []).map((type: string) => (
                  <span
                    key={type}
                    className={cn(
                      'px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bol tracking-wider shadow-sm border border-black/5',
                      TYPE_COLORS[type] || 'bg-gray-500/80 text-white',
                    )}
                  >
                    {type}
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3 mt-4 text-xs font-medium text-muted-foreground/80">
              <span className="flex items-center gap-1.5 bg-muted/40 px-2 py-1 rounded-md border border-border/50">
                <Ruler className="h-3 w-3" />
                {((details.height || 0) / 10).toFixed(1)}m
              </span>
              <span className="flex items-center gap-1.5 bg-muted/40 px-2 py-1 rounded-md border border-border/50">
                <Weight className="h-3 w-3" />
                {((details.weight || 0) / 10).toFixed(1)}kg
              </span>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-2 border-t border-border/40 flex-1 flex flex-col gap-2">
          {/* Default Pokedex Entry - simplified or integrated */}
          {/* Default Pokedex Entry */}
          <div className="flex items-center gap-2 opacity-60">
            <BookOpen className="h-3 w-3" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Entry</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {details.description || 'No description available for this Pokémon.'}
          </p>

          <ShakespeareCard
            description={details.description || ''}
            shakespeareDescription={shakespeareDesc}
            isLoading={isTranslating}
            rateLimitError={rateLimitError}
            onTranslate={() => onTranslate(details)}
          />
        </div>
      </div>
    </div>
  )
})
