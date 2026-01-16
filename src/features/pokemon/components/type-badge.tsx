import { cn } from '@/lib/utils'

const TYPE_COLORS: Record<string, string> = {
  fire: 'bg-orange-500 text-white',
  water: 'bg-blue-500 text-white',
  grass: 'bg-emerald-500 text-white',
  electric: 'bg-yellow-400 text-gray-900',
  ice: 'bg-cyan-400 text-gray-900',
  fighting: 'bg-red-700 text-white',
  poison: 'bg-purple-500 text-white',
  ground: 'bg-amber-600 text-white',
  flying: 'bg-indigo-400 text-white',
  psychic: 'bg-pink-500 text-white',
  bug: 'bg-lime-500 text-gray-900',
  rock: 'bg-stone-500 text-white',
  ghost: 'bg-violet-600 text-white',
  dragon: 'bg-indigo-600 text-white',
  dark: 'bg-gray-700 text-white',
  steel: 'bg-slate-400 text-gray-900',
  fairy: 'bg-pink-300 text-gray-900',
  normal: 'bg-gray-400 text-gray-900',
}

export function TypeBadge({ type }: { type: string }) {
  return (
    <span
      className={cn(
        'px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider',
        TYPE_COLORS[type] || 'bg-gray-500 text-white',
      )}
    >
      {type}
    </span>
  )
}
