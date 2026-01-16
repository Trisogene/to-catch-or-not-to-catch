import { Heart } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/use-app-store'

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

export function FavoriteButton({ pokemon }: { pokemon: Pokemon }) {
  const [isAnimating, setIsAnimating] = useState(false)

  const favorites = useAppStore((state) => state.favorites)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)

  const isFavorite = favorites.some((p) => p.id === pokemon.id)

  const handleClick = () => {
    setIsAnimating(true)
    toggleFavorite(pokemon)
  }

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
