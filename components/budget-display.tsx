import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface BudgetDisplayProps {
  budget: number
  maxBudget: number
}

export default function BudgetDisplay({ budget, maxBudget }: BudgetDisplayProps) {
  const percentage = Math.min(100, Math.max(0, (budget / maxBudget) * 100))
  const isLow = percentage < 20

  return (
    <Card className={`border-primary/20 ${isLow ? "bg-destructive/5" : "bg-muted/30"}`}>
      <CardHeader>
        <CardTitle className="text-lg text-primary">City Budget</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-foreground">
            <span>Remaining Funds</span>
            <span className={isLow ? "text-destructive font-bold" : "text-foreground"}>
              {budget} / {maxBudget} points
            </span>
          </div>
          <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isLow ? "bg-destructive" : "bg-primary"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
        {isLow && (
          <p className="text-xs text-destructive font-semibold">
            Budget running low! Consider your next move carefully.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
