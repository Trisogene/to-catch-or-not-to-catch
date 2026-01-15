import { Heart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useShakespeareTranslation } from '@/features/common/hooks/use-shakespeare-translation'
import { PokemonGridCard } from '@/features/pokemon/components/pokemon-grid-card'
import { getCachedTranslation } from '@/lib/translation-cache'
import { useAppStore } from '@/store/use-app-store'

export function FavoritesList() {
  const favorites = useAppStore((state) => state.favorites)
  const toggleFavorite = useAppStore((state) => state.toggleFavorite)
  const {
    translate,
    isLoading: isTranslating,
    error: rateLimitError,
    activeId,
  } = useShakespeareTranslation()

  return (
    <Card className="h-full flex flex-col border-0 shadow-none bg-transparent ring-0">
      <CardHeader className="flex-shrink-0 pb-3">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
          <CardTitle className="text-base sm:text-lg">Your Favorites</CardTitle>
          {favorites.length > 0 && (
            <Badge variant="secondary" className="rounded-full">
              {favorites.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto">
        {favorites.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4">
            <div className="w-20 h-20 rounded-full bg-muted/20 flex items-center justify-center mb-2 animate-pulse">
              <Heart className="h-8 w-8 text-muted-foreground/30 fill-current" />
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-foreground">No favorites yet</p>
              <p className="text-sm text-muted-foreground mt-1">Click the heart to add Pokémon</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pb-4">
            {favorites.map((pokemon) => {
              const isItemTranslating = isTranslating && activeId === pokemon.id

              return (
                <div key={pokemon.id} className="h-full">
                  <PokemonGridCard
                    details={pokemon}
                    isFavorite={true}
                    onToggleFavorite={toggleFavorite}
                    shakespeareDesc={
                      pokemon.shakespeareanDescription || getCachedTranslation(pokemon.id) || null
                    }
                    isTranslating={isItemTranslating}
                    rateLimitError={rateLimitError}
                    onTranslate={translate}
                  />
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
