import type { LucideIcon } from 'lucide-react'

interface StatBadgeProps {
  icon: LucideIcon
  value: number
  unit: string
}

export function StatBadge({ icon: Icon, value, unit }: StatBadgeProps) {
  return (
    <span className="flex items-center gap-1 bg-muted/50 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground">
      <Icon className="h-3 w-3" />
      {(value / 10).toFixed(1)}
      {unit}
    </span>
  )
}
