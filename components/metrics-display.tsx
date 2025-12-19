import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metrics } from "@/lib/game-types"

interface MetricsDisplayProps {
  metrics: Metrics
  label?: string
}

const MetricBar = ({ label, value, color }: { label: string; value: number; color: string }) => {
  const percentage = Math.min(100, Math.max(0, value))
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm font-medium text-foreground">
        <span>{label}</span>
        <span className="text-muted-foreground">{Math.round(percentage)}/100</span>
      </div>
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-300 ${color}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  )
}

export default function MetricsDisplay({ metrics, label }: MetricsDisplayProps) {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-lg text-primary">{label || "City Metrics"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <MetricBar label="Jobs & Economy" value={metrics.jobs} color="bg-blue-500" />
        <MetricBar label="Equity & Trust" value={metrics.equity} color="bg-secondary" />
        <MetricBar label="Political Support" value={metrics.support} color="bg-primary" />
        <MetricBar label="Climate & Environment" value={metrics.climate} color="bg-green-500" />
      </CardContent>
    </Card>
  )
}
