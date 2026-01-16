import { BookOpen, Ruler, Weight } from 'lucide-react'
import { ShakespeareCard } from '@/features/common/components/shakespeare-card'
import { cn } from '@/lib/utils'
import { FavoriteButton } from './favorite-button'
import { PokeballDecoration } from './pokeball-decoration'
import { PokemonImage } from './pokemon-image'
import { StatBadge } from './stat-badge'
import { TypeBadge } from './type-badge'

// Types
export interface Pokemon {
  id: number
  name: string
  imageUrl: string
  spriteUrl?: string
  types: string[]
  height: number
  weight: number
  description: string | null
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

export function PokemonCard({ details }: { details: Pokemon }) {
  const primaryType = details.types?.[0] || 'normal'
  const description = details.description || 'No description available for this Pokémon.'

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

        {/* Pokédex Entry */}
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
}
