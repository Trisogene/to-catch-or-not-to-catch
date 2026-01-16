import { cn } from '@/lib/utils'

const GLOW_COLORS: Record<string, string> = {
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-emerald-500',
  electric: 'bg-yellow-400',
}

interface PokemonImageProps {
  src: string
  name: string
  primaryType: string
}

export function PokemonImage({ src, name, primaryType }: PokemonImageProps) {
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
