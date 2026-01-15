import { Heart, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/use-app-store'

export function BottomNav() {
  const activeTab = useAppStore((state) => state.activeTab)
  const setActiveTab = useAppStore((state) => state.setActiveTab)
  const favoritesCount = useAppStore((state) => state.favorites.length)

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-around h-16">
        <Button
          variant={'link'}
          onClick={() => setActiveTab('pokemon')}
          className={cn(
            'flex flex-col items-center gap-1 transition-colors ',
            activeTab === 'pokemon' ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          <List className="h-5 w-5" />
          <span className="text-xs font-medium">Pokémon</span>
        </Button>

        <Button
          variant={'link'}
          onClick={() => setActiveTab('favorites')}
          className={cn(
            'flex flex-col items-center gap-1 transition-colors relative',
            activeTab === 'favorites' ? 'text-primary' : 'text-muted-foreground',
          )}
        >
          <div className="relative">
            <Heart className={cn('h-5 w-5', activeTab === 'favorites' && 'fill-current')} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 h-4 min-w-4 px-1 text-[10px] font-bold bg-red-500 text-white rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-xs font-medium">Favorites</span>
        </Button>
      </div>
    </nav>
  )
}
