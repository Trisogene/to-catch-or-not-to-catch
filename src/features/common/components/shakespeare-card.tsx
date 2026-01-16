import { Feather, Loader2, RefreshCw, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useShakespeareTranslation } from '@/features/common/hooks/use-shakespeare-translation'
import { getCachedTranslation } from '@/lib/translation-cache'

interface Pokemon {
  id: number
  name: string
  description: string | null
}

interface ShakespeareCardProps {
  pokemon: Pokemon
}

// Constants
const MIN_CONTENT_HEIGHT = 'min-h-[3.75rem]' // ~3 lines

// Sub-components
function SectionHeader() {
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="p-1 rounded-full bg-primary/10">
        <Feather className="h-3 w-3 text-primary" />
      </div>
      <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
        Shakespearean
      </span>
    </div>
  )
}

function TranslatedContent({ text }: { text: string }) {
  return (
    <div className="pt-3 border-t border-border/30">
      <SectionHeader />
      <p className={`text-sm text-foreground/80 italic leading-relaxed ${MIN_CONTENT_HEIGHT}`}>
        "{text}"
      </p>
    </div>
  )
}

function LoadingState() {
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

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2 animate-in slide-in-from-bottom-2">
      <span className="text-xs text-destructive font-medium bg-destructive/10 px-3 py-1 rounded-md text-center">
        {error}
      </span>
      <Button onClick={onRetry} variant="ghost" size="sm" className="h-7 text-xs gap-1">
        <RefreshCw className="h-3 w-3" />
        Try Again
      </Button>
    </div>
  )
}

function TranslatePrompt({
  onTranslate,
  disabled,
  error,
}: {
  onTranslate: () => void
  disabled: boolean
  error: string | null
}) {
  return (
    <div className="pt-3 border-t border-border/30">
      <div className="rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 to-transparent p-4">
        <SectionHeader />
        <div className={`flex flex-col items-center justify-center gap-3 ${MIN_CONTENT_HEIGHT}`}>
          <p className="text-xs text-muted-foreground/60 italic">
            "To translate or not to translate..."
          </p>
          {error ? (
            <ErrorState error={error} onRetry={onTranslate} />
          ) : (
            <Button
              onClick={onTranslate}
              disabled={disabled}
              size="sm"
              className="rounded-full bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border border-primary/20 hover:border-primary transition-all font-medium gap-1.5 h-8 px-4"
            >
              <Sparkles className="h-3 w-3" />
              Translate
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// Main Component
export function ShakespeareCard({ pokemon }: ShakespeareCardProps) {
  const {
    translate,
    isLoading: isTranslating,
    error: rateLimitError,
    activeId,
  } = useShakespeareTranslation()

  // Check cache first
  const cachedTranslation = getCachedTranslation(pokemon.id)
  const isLoading = isTranslating && activeId === pokemon.id

  if (cachedTranslation) {
    return <TranslatedContent text={cachedTranslation} />
  }

  if (isLoading) {
    return <LoadingState />
  }

  return (
    <TranslatePrompt
      onTranslate={() => translate(pokemon)}
      disabled={!pokemon.description}
      error={rateLimitError}
    />
  )
}
