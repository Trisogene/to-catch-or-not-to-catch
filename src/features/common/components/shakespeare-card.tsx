import { Feather, Loader2, RefreshCw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShakespeareCardProps {
  description: string
  shakespeareDescription: string | null
  isLoading: boolean
  rateLimitError: string | null
  onTranslate: () => void
}

export function ShakespeareCard({
  description,
  shakespeareDescription,
  isLoading,
  rateLimitError,
  onTranslate,
}: ShakespeareCardProps) {
  // If we have a translation, show it cleanly
  if (shakespeareDescription) {
    return (
      <div className="pt-3 border-t border-border/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Feather className="h-4 w-4 text-amber-500" />
            <span className="text-xs font-medium text-amber-500 uppercase tracking-wide">
              Shakespearean
            </span>
          </div>
        </div>
        <div className="min-h-[60px]">
          <p className="text-base text-foreground italic leading-relaxed animate-in fade-in duration-500">
            "{shakespeareDescription}"
          </p>
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="pt-3 border-t border-border/30">
        <div className="h-[90px] w-full relative rounded-xl overflow-hidden bg-muted/10 border border-border/50 flex flex-col items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 text-amber-500 animate-spin" />
          <span className="text-xs text-amber-500/80 font-medium animate-pulse">
            Consulting the Bard...
          </span>
        </div>
      </div>
    )
  }

  // Untranslated state with Glassmorphism
  return (
    <div className="pt-3 border-t border-border/30">
      <div className="relative group overflow-hidden rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-amber-900/5 p-4 shadow-sm transition-all hover:shadow-md hover:border-amber-500/40">
        <div className="absolute inset-0 bg-grid-white/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

        <div className="flex items-center gap-2 mb-3">
          <div className="p-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Feather className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest flex items-center gap-2">
            Shakespearean
            {isLoading && <Loader2 className="h-3 w-3 animate-spin" />}
          </h4>
        </div>

        <div className="relative min-h-[80px] flex items-center">
          {shakespeareDescription ? (
            <p className="text-base font-serif italic text-foreground/90 leading-relaxed drop-shadow-sm selection:bg-amber-500/20">
              "{shakespeareDescription}"
            </p>
          ) : (
            <div className="w-full flex flex-col items-center justify-center gap-3 py-2">
              <p className="text-sm text-muted-foreground italic text-center opacity-70">
                "To translate or not to translate..."
              </p>
              {rateLimitError ? (
                <div className="flex flex-col items-center gap-2 w-full animate-in slide-in-from-bottom-2">
                  <span className="text-xs text-red-500 font-medium bg-red-500/10 px-3 py-1.5 rounded-md text-center">
                    {rateLimitError}
                  </span>
                  <Button
                    onClick={onTranslate}
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-muted-foreground hover:text-foreground gap-1.5"
                  >
                    <RefreshCw className="h-3 w-3" />
                    Try Again
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={onTranslate}
                  disabled={isLoading || !description}
                  variant="outline"
                  size="sm"
                  className="rounded-full border-amber-500/30 text-amber-600 hover:bg-amber-500 hover:text-white dark:text-amber-400 dark:hover:bg-amber-500/20 transition-all font-semibold gap-2 shadow-sm"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Translate
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
