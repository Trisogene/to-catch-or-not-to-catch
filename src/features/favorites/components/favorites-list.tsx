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
      <CardHeader className="flex-shrink-0 pb-4 px-2">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <Heart className="h-5 w-5 text-primary fill-primary" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">Your Favorites</CardTitle>
          {favorites.length > 0 && (
            <Badge className="rounded-full bg-primary/10 text-primary border-0 font-bold">
              {favorites.length}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-auto px-2">
        {favorites.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 py-12">
            <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-2 animate-float">
              <Heart className="h-10 w-10 text-muted-foreground/20 fill-current" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-bold text-foreground/80">No favorites yet</p>
              <p className="text-sm text-muted-foreground">
                Click the heart on any Pokémon to add it here
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 pb-4">
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
