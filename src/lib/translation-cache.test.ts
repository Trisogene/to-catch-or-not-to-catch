import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  getAllCachedTranslations,
  getCachedTranslation,
  setCachedTranslation,
} from './translation-cache'

describe('translation-cache', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('should return null if translation is not cached', () => {
    expect(getCachedTranslation(25)).toBeNull()
  })

  it('should save and retrieve translation', () => {
    setCachedTranslation(25, 'Original', 'Shakespearean')
    expect(getCachedTranslation(25)).toBe('Shakespearean')
  })

  it('should return empty object if cache is empty', () => {
    expect(getAllCachedTranslations()).toEqual({})
  })

  it('should return all cached translations', () => {
    setCachedTranslation(25, 'Original25', 'Shakespearean25')
    setCachedTranslation(1, 'Original1', 'Shakespearean1')

    const all = getAllCachedTranslations()
    expect(all[25].shakespeareanDescription).toBe('Shakespearean25')
    expect(all[1].shakespeareanDescription).toBe('Shakespearean1')
  })

  it('should handle corrupted local storage gracefully', () => {
    localStorage.setItem('shakespeare-translations', 'invalid-json')
    expect(getAllCachedTranslations()).toEqual({})
    expect(getCachedTranslation(25)).toBeNull()
  })
})
