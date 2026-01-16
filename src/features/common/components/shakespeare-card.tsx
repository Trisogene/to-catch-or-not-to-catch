import { Feather, Loader2, RefreshCw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useShakespeareTranslation } from '@/features/common/hooks/use-shakespeare-translation'
import { getCachedTranslation } from '@/lib/translation-cache'

interface Pokemon {
  id: number
  name: string
  description: string | null
}

const MIN_CONTENT_HEIGHT = 'min-h-[3.75rem]'

export function ShakespeareCard({ pokemon }: { pokemon: Pokemon }) {
  const { translate, isLoading, error, activeId } = useShakespeareTranslation()

  const cachedTranslation = getCachedTranslation(pokemon.id)
  const isThisLoading = isLoading && activeId === pokemon.id

  // Already translated
  if (cachedTranslation) {
    return (
      <div className="pt-3 border-t border-border/30">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1 rounded-full bg-primary/10">
            <Feather className="h-3 w-3 text-primary" />
          </div>
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
            Shakespearean
          </span>
        </div>
        <p className={`text-sm text-foreground/80 italic leading-relaxed ${MIN_CONTENT_HEIGHT}`}>
          "{cachedTranslation}"
        </p>
      </div>
    )
  }

  // Loading state
  if (isThisLoading) {
    return (
      <div className="pt-3 border-t border-border/30">
        <div
          className={`rounded-xl bg-muted/20 border border-border/30 flex flex-col items-center justify-center gap-2 ${MIN_CONTENT_HEIGHT} py-4`}
        >
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
          <span className="text-xs text-primary/70 font-medium">Consulting the Bard...</span>
        </div>
      </div>
    )
  }

  // Translate prompt (default state)
  return (
    <div className="pt-3 border-t border-border/30">
      <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
            Shakespearean
          </span>
          {error ? (
            <div className="flex flex-col items-center gap-2 animate-in slide-in-from-bottom-2">
              <span className="text-xs text-destructive font-medium bg-destructive/10 px-3 py-1 rounded-md text-center">
                {error}
              </span>
              <Button
                onClick={() => translate(pokemon)}
                variant="ghost"
                size="sm"
                className="h-7 text-xs gap-1"
              >
                <RefreshCw className="h-3 w-3" />
                Try Again
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => translate(pokemon)}
              disabled={!pokemon.description}
              size="sm"
              variant={'default'}
            >
              Translate
            </Button>
          )}
        </div>
        <div className={`flex flex-col items-center justify-center gap-3 ${MIN_CONTENT_HEIGHT}`}>
          <p className="text-xs text-muted-foreground/60 italic">
            "To translate or not to translate..."
          </p>
        </div>
      </div>
    </div>
  )
}
