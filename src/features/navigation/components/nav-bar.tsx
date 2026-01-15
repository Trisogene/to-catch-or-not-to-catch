import { Check, Moon, Search, Sun, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useAppStore } from '@/store/use-app-store'

const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'steel',
  'dark',
  'fairy',
]

const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  grass: 'bg-green-500',
  electric: 'bg-yellow-500',
  ice: 'bg-cyan-400',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-500',
  rock: 'bg-stone-500',
  ghost: 'bg-violet-600',
  dragon: 'bg-indigo-600',
  dark: 'bg-gray-700',
  steel: 'bg-slate-400',
  fairy: 'bg-pink-300',
  normal: 'bg-gray-400',
}

export function NavBar() {
  const searchQuery = useAppStore((state) => state.searchQuery)
  const setSearchQuery = useAppStore((state) => state.setSearchQuery)
  const selectedTypes = useAppStore((state) => state.selectedTypes)
  const setSelectedTypes = useAppStore((state) => state.setSelectedTypes)
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)
  const setIsSearching = useAppStore((state) => state.setIsSearching)

  const [localSearch, setLocalSearch] = useState(searchQuery)
  const debouncedSearchRef = useRef(searchQuery)

  // Internal state for filter modal
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [pendingTypes, setPendingTypes] = useState(selectedTypes)
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Sync local search with store when it changes externally
  useEffect(() => {
    if (searchQuery !== debouncedSearchRef.current) {
      setLocalSearch(searchQuery)
      debouncedSearchRef.current = searchQuery
    }
  }, [searchQuery])

  // Debounce search updates
  useEffect(() => {
    // Notify start of debounce (loading)
    if (localSearch !== debouncedSearchRef.current) {
      setIsSearching(true)
    }

    const timer = setTimeout(() => {
      if (localSearch !== debouncedSearchRef.current) {
        setSearchQuery(localSearch)
        debouncedSearchRef.current = localSearch
      }
      // Notify end of debounce (loaded)
      setIsSearching(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [localSearch, setSearchQuery, setIsSearching])

  // Reset pending filters when modal opens
  useEffect(() => {
    if (isFilterOpen) {
      setPendingTypes(selectedTypes)
    }
  }, [isFilterOpen, selectedTypes])

  const toggleType = (type: string) => {
    setPendingTypes((current) =>
      current.includes(type) ? current.filter((t) => t !== type) : [...current, type],
    )
  }

  // Handle open change (auto-apply on close)
  const handleOpenChange = (open: boolean) => {
    setIsFilterOpen(open)
    if (!open) {
      // If closing, auto-apply pending types
      setSelectedTypes(pendingTypes)
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between gap-4 max-w-7xl">
        {/* Logo */}
        <Button
          variant={'ghost'}
          tabIndex={0}
          className="flex items-center gap-3 flex-shrink-0 cursor-pointer group select-none min-w-0"
          onClick={() => window.scrollTo(0, 0)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo(0, 0)
            }
          }}
        >
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-red-500 blur-md opacity-20 rounded-full group-hover:opacity-40 transition-opacity" />
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 relative z-10 drop-shadow-sm fill-white"
            >
              <title>Logo</title>
              <circle cx="12" cy="12" r="10" />
              <path d="M2.5 12h19" />
              <circle cx="12" cy="12" r="3" className="fill-white" />
              <circle cx="12" cy="12" r="1.5" className="fill-foreground" />
            </svg>
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-extrabold text-lg sm:text-xl leading-none tracking-tighter text-foreground group-hover:text-red-600 transition-colors truncate">
              toCATCH
            </span>
            <span className="hidden xs:block font-bold text-[10px] leading-tight text-muted-foreground uppercase tracking-[0.2em] mt-0.5 truncate">
              or not to catch
            </span>
          </div>
        </Button>

        {/* Airbnb-style Search Pill - Ultimate Fidelity */}
        <div className="hidden sm:flex items-center justify-center flex-1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[850px]">
          {/* Main Pill Container */}
          <div className="flex items-center bg-background border border-border shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.15)] hover:bg-muted/20 transition-all duration-300 rounded-full h-16 pl-0 relative group/pill divide-x divide-border/0 cursor-pointer">
            {/* Search Input Section - "Where" */}
            <label className="flex-[1.5] h-full flex flex-col justify-center px-8 rounded-full cursor-text transition-colors relative z-10">
              <span className="text-[11px] font-extrabold tracking-wider text-foreground select-none cursor-pointer pl-0.5">
                Name
              </span>
              <div className="relative w-full">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search Pokémon..."
                  className="w-full bg-transparent border-0 p-0 text-[15px] font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-0 truncate leading-tight"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                />
                {localSearch && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation() // Prevent triggering the pill click
                      setLocalSearch('')
                      searchInputRef.current?.focus() // Keep focus
                    }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground transition-all z-20"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </label>

            {/* Vertical Divider */}
            <div className="w-[1px] h-8 bg-border/40 flex-shrink-0 my-auto hidden group-hover/pill:block" />

            {/* Filter Trigger Section - "Type" */}
            <DropdownMenu open={isFilterOpen} onOpenChange={handleOpenChange}>
              <DropdownMenuTrigger className="flex-1 h-full flex flex-col justify-center px-8 rounded-full cursor-pointer transition-colors select-none relative z-10 text-left border-l border-border/0 hover:border-border/0 bg-transparent hover:bg-transparent shadow-none focus:ring-0 focus:outline-none">
                {/* Pseudo-border handling: In Airbnb, dividers disappear on hover. handled by div above */}
                <div className="w-[1px] h-8 bg-border/40 absolute left-0 top-1/2 -translate-y-1/2 group-hover:opacity-0 transition-opacity" />

                <span className="text-[12px] font-bold tracking-wide text-foreground/80 cursor-pointer mb-0.5 block">
                  Type
                </span>
                <div className="flex items-center justify-between w-full">
                  <span
                    className={cn(
                      'text-[15px] truncate block',
                      selectedTypes.length > 0
                        ? 'font-semibold text-foreground'
                        : 'font-normal text-muted-foreground/60',
                    )}
                  >
                    {selectedTypes.length === 0 ? 'Any Type' : `${selectedTypes.length} selected`}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[360px] p-0 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-border/60 bg-card/95 backdrop-blur-xl mt-4 overflow-hidden z-50"
              >
                <div className="p-6 border-b border-border/50 flex items-center justify-between bg-muted/10">
                  <span className="font-bold text-xl tracking-tight">Filter by Type</span>
                  {pendingTypes.length > 0 && (
                    <Button
                      variant="link"
                      onClick={(e) => {
                        e.preventDefault() // prevent closing logic triggering early if needed
                        setPendingTypes([])
                        setSelectedTypes([]) // Clear immediately
                      }}
                      className="h-auto p-0 text-xs font-bold text-muted-foreground hover:text-foreground hover:no-underline transition-colors uppercase tracking-wider underline underline-offset-4"
                    >
                      Clear all
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 p-6 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {POKEMON_TYPES.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault()
                        toggleType(type)
                      }}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all border select-none group/item w-full text-left',
                        pendingTypes.includes(type)
                          ? 'bg-amber-500/5 border-amber-500/30 shadow-sm'
                          : 'hover:bg-muted/50 border-transparent hover:border-border/50',
                      )}
                    >
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full flex-shrink-0 shadow-sm ring-2 ring-white/20 transition-transform group-hover/item:scale-110',
                          TYPE_COLORS[type],
                        )}
                      />
                      <span
                        className={cn(
                          'capitalize flex-1 text-sm tracking-tight',
                          pendingTypes.includes(type)
                            ? 'font-bold text-foreground'
                            : 'font-medium text-muted-foreground',
                        )}
                      >
                        {type}
                      </span>
                      {pendingTypes.includes(type) && (
                        <Check className="h-4 w-4 text-amber-500 stroke-[3]" />
                      )}
                    </button>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search Button Circle */}
            <div className="pl-2 pr-2">
              <button
                type="button"
                onClick={() => {
                  setSearchQuery(localSearch)
                }}
                className="w-12 h-12 bg-[#FF385C] hover:bg-[#D90B3E] rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 cursor-pointer border-none p-0"
              >
                <svg
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                  style={{
                    display: 'block',
                    fill: 'none',
                    height: '16px',
                    width: '16px',
                    stroke: 'currentcolor',
                    strokeWidth: 4,
                    overflow: 'visible',
                  }}
                >
                  <g fill="none">
                    <path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9" />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Theme Toggle */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Button */}
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden text-muted-foreground hover:text-foreground"
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </nav>
  )
}
