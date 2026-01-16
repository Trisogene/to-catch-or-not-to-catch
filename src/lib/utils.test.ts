import { describe, expect, it } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('c-1', 'c-2')).toBe('c-1 c-2')
  })

  it('should handle conditional classes', () => {
    expect(cn('c-1', true && 'c-2', false && 'c-3')).toBe('c-1 c-2')
  })

  it('should merge tailwind classes properly', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4')
  })

  it('should handle arrays and objects', () => {
    expect(cn(['c-1', 'c-2'], { 'c-3': true, 'c-4': false })).toBe('c-1 c-2 c-3')
  })
})
