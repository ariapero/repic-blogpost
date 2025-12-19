import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Stakeholder } from "@/lib/game-types"

interface StakeholderCardProps {
  stakeholder: Stakeholder
  isHighlighted?: boolean
}

export default function StakeholderCard({ stakeholder, isHighlighted }: StakeholderCardProps) {
  return (
    <Card className={`transition-colors ${isHighlighted ? "border-secondary bg-secondary/5" : "border-primary/20"}`}>
      <CardHeader>
        <CardTitle className="text-base text-primary">{stakeholder.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground/70">{stakeholder.description}</p>
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Key Priorities:</p>
          <div className="flex flex-wrap gap-1">
            {stakeholder.priorities.map((priority) => (
              <span key={priority} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded font-medium">
                {priority}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
