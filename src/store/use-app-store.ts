import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FavoritePokemon } from '@/types'

interface AppState {
  // Favorites
  favorites: FavoritePokemon[]
  addFavorite: (pokemon: FavoritePokemon) => void
  removeFavorite: (id: number) => void
  updateFavorite: (pokemon: FavoritePokemon) => void
  toggleFavorite: (pokemon: FavoritePokemon) => void
  isFavorite: (id: number) => boolean

  // UI State
  activeTab: 'pokemon' | 'favorites'
  setActiveTab: (tab: 'pokemon' | 'favorites') => void

  searchQuery: string
  setSearchQuery: (query: string) => void

  selectedTypes: string[]
  setSelectedTypes: (types: string[]) => void

  isSearching: boolean
  setIsSearching: (isSearching: boolean) => void

  // Theme
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Favorites Logic
      favorites: [],
      addFavorite: (pokemon) =>
        set((state) => ({
          favorites: [...state.favorites, pokemon],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((p) => p.id !== id),
        })),
      updateFavorite: (pokemon) =>
        set((state) => ({
          favorites: state.favorites.map((p) => (p.id === pokemon.id ? { ...p, ...pokemon } : p)),
        })),
      toggleFavorite: (pokemon) =>
        set((state) => {
          const exists = state.favorites.some((p) => p.id === pokemon.id)
          if (exists) {
            return { favorites: state.favorites.filter((p) => p.id !== pokemon.id) }
          }
          return { favorites: [...state.favorites, pokemon] }
        }),
      isFavorite: (id) => {
        return get().favorites.some((p) => p.id === id)
      },

      // UI State Logic
      activeTab: 'pokemon',
      setActiveTab: (activeTab) => set({ activeTab }),

      searchQuery: '',
      setSearchQuery: (searchQuery) => set({ searchQuery }),

      selectedTypes: [],
      setSelectedTypes: (selectedTypes) => set({ selectedTypes }),

      isSearching: false,
      setIsSearching: (isSearching) => set({ isSearching }),

      // Theme Logic
      theme: 'system',
      setTheme: (theme) => {
        set({ theme })
        applyTheme(theme)
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light'
          applyTheme(newTheme)
          return { theme: newTheme }
        })
      },
    }),
    {
      name: 'tcontc-app-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        theme: state.theme,
      }), // Only persist favorites and theme
      onRehydrateStorage: () => (state) => {
        // Apply theme on hydration
        if (state) {
          applyTheme(state.theme)
        }
      },
    },
  ),
)

// Helper to apply theme to document
function applyTheme(theme: 'light' | 'dark' | 'system') {
  const root = window.document.documentElement
  root.classList.remove('light', 'dark')

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    root.classList.add(systemTheme)
    return
  }

  root.classList.add(theme)
}
