import { createFileRoute } from '@tanstack/react-router'
import { FavoritesList } from '@/features/favorites/components/favorites-list'
import { BottomNav } from '@/features/navigation/components/bottom-nav'
import { NavBar } from '@/features/navigation/components/nav-bar'
import { PokemonList } from '@/features/pokemon/components/pokemon-list'
import { fetchAllPokemonBasicInfo } from '@/services/pokemon.service'
import { useAppStore } from '@/store/use-app-store'
import { queryClient } from './__root'

export const Route = createFileRoute('/')({
  component: App,
  loader: () =>
    queryClient.ensureQueryData({
      queryKey: ['allPokemonBasic'],
      queryFn: fetchAllPokemonBasicInfo,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    }),
})

function App() {
  const activeTab = useAppStore((state) => state.activeTab)

  return (
    <div
      id="App-Container"
      className="h-[100dvh] w-full flex flex-col overflow-hidden"
    >
      <NavBar />

      <div className="flex-1 w-full min-h-0 container mx-auto px-4 py-4 max-w-7xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          <section
            className={`lg:col-span-2 h-full overflow-hidden flex flex-col ${activeTab !== 'pokemon' ? 'hidden lg:flex' : 'flex'}`}
          >
            <div className="flex-1 min-h-0">
              <PokemonList />
            </div>
          </section>

          <section
            className={`h-full overflow-hidden flex flex-col ${activeTab !== 'favorites' ? 'hidden lg:flex' : 'flex'}`}
          >
            <div className="flex-1 min-h-0">
              <FavoritesList />
            </div>
          </section>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
