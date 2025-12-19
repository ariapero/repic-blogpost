import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { GameEvent } from "@/lib/game-types"
import { POLICIES } from "@/lib/game-types"

interface EventLogProps {
  events: GameEvent[]
}

export default function EventLog({ events }: EventLogProps) {
  return (
    <Card className="border-primary/20 h-full">
      <CardHeader>
        <CardTitle className="text-lg text-primary">City Chronicle</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {events.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">
              No policies enacted yet. Your decisions will appear here.
            </p>
          ) : (
            [...events].reverse().map((event, idx) => {
              const policy = POLICIES.find((p) => p.id === event.policy)
              return (
                <div key={idx} className="border-l-2 border-primary/30 pl-3 py-2">
                  <div className="text-xs font-semibold text-muted-foreground">Year {event.round}</div>
                  <div className="text-sm font-medium text-foreground">{policy?.name}</div>
                  <p className="text-xs text-foreground/70 mt-1">{event.narrative}</p>
                </div>
              )
            })
          )}
        </div>
      </CardContent>
    </Card>
  )
}
