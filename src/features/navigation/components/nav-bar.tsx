import { Moon, Search, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/store/use-app-store'
import { SearchBar } from './search-bar'

export function NavBar() {
  const theme = useAppStore((state) => state.theme)
  const toggleTheme = useAppStore((state) => state.toggleTheme)

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
      <SearchBar />

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
