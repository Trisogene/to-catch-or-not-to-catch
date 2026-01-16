import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAppStore } from './use-app-store'

// Mock persistence to avoid local storage issues in tests
vi.mock('zustand/middleware', () => ({
  persist: (fn: any) => fn,
}))

describe('useAppStore', () => {
  beforeEach(() => {
    // Reset store before each test
    act(() => {
      useAppStore.setState({
        favorites: [],
        theme: 'system',
        searchQuery: '',
        selectedTypes: [],
        isSearching: false,
        activeTab: 'pokemon',
      })
    })
  })

  describe('Favorites Logic', () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      types: ['electric'],
      imageUrl: 'pikachu.png',
      spriteUrl: 'pikachu-sprite.png',
      description: 'Pika!',
      height: 4,
      weight: 60,
    }

    it('should add a favorite', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addFavorite(mockPokemon)
      })

      expect(result.current.favorites).toHaveLength(1)
      expect(result.current.favorites[0]).toEqual(mockPokemon)
      expect(result.current.isFavorite(25)).toBe(true)
    })

    it('should remove a favorite', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addFavorite(mockPokemon)
        result.current.removeFavorite(25)
      })

      expect(result.current.favorites).toHaveLength(0)
      expect(result.current.isFavorite(25)).toBe(false)
    })

    it('should toggle a favorite', () => {
      const { result } = renderHook(() => useAppStore())

      // Toggle on
      act(() => {
        result.current.toggleFavorite(mockPokemon)
      })
      expect(result.current.isFavorite(25)).toBe(true)

      // Toggle off
      act(() => {
        result.current.toggleFavorite(mockPokemon)
      })
      expect(result.current.isFavorite(25)).toBe(false)
    })
  })

  describe('UI State', () => {
    it('should set search query', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.setSearchQuery('char')
      })

      expect(result.current.searchQuery).toBe('char')
    })

    it('should set theme', () => {
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.setTheme('dark')
      })

      expect(result.current.theme).toBe('dark')
      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('should toggle theme', () => {
      const { result } = renderHook(() => useAppStore())

      // Initial state is system (mocked as light/dark depending on implementation, let's explicit set first)
      act(() => {
        result.current.setTheme('light')
      })

      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe('dark')

      act(() => {
        result.current.toggleTheme()
      })
      expect(result.current.theme).toBe('light')
    })
  })

  describe('Update Favorite', () => {
    it('should update favorite details', () => {
      const mockPokemon = {
          id: 25,
          name: 'pikachu',
          types: ['electric'],
          imageUrl: 'pikachu.png',
          spriteUrl: 'pikachu-sprite.png',
          description: 'Pika!',
          height: 4,
          weight: 60,
      }
      
      const { result } = renderHook(() => useAppStore())

      act(() => {
        result.current.addFavorite(mockPokemon)
        result.current.updateFavorite({ ...mockPokemon, description: 'Updated Pika!' })
      })

      expect(result.current.favorites[0].description).toBe('Updated Pika!')
    })
  })
})
