export function PokeballDecoration() {
  return (
    <div className="absolute top-4 right-4 w-20 h-20 opacity-[0.03] pointer-events-none">
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="4" />
        <line x1="2" y1="50" x2="98" y2="50" stroke="currentColor" strokeWidth="4" />
        <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
      </svg>
    </div>
  )
}
