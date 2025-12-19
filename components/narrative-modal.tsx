"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Policy } from "@/lib/game-types"

interface NarrativeModalProps {
  policy: Policy | null
  isOpen: boolean
  onClose: () => void
  metrics: {
    jobs: number
    equity: number
    support: number
    climate: number
  }
}

export default function NarrativeModal({ policy, isOpen, onClose, metrics }: NarrativeModalProps) {
  if (!isOpen || !policy) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full bg-white border-2 border-primary/30">
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-foreground">{policy.name}</h2>
            <p className="text-lg text-foreground/70">Implementation Report</p>
          </div>

          {/* Narrative Section */}
          <div className="space-y-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-foreground">What Happened?</h3>
            <p className="text-base text-foreground leading-relaxed">{policy.narrative}</p>
          </div>

          {/* Impact Summary */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Impact on Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Jobs", value: policy.effects.jobs, color: "bg-blue-100 text-blue-700" },
                { label: "Equity", value: policy.effects.equity, color: "bg-green-100 text-green-700" },
                { label: "Support", value: policy.effects.support, color: "bg-purple-100 text-purple-700" },
                { label: "Climate", value: policy.effects.climate, color: "bg-emerald-100 text-emerald-700" },
              ].map((metric) => (
                <div key={metric.label} className="p-3 border border-border rounded">
                  <div className="text-sm text-foreground/70 mb-1">{metric.label}</div>
                  <div className={`text-2xl font-bold ${metric.color} px-2 py-1 rounded w-fit`}>
                    {metric.value > 0 ? "+" : ""}
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cost Display */}
          <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
            <div className="text-sm text-foreground/70 mb-1">Budget Cost</div>
            <div className="text-2xl font-bold text-accent">{policy.cost} points</div>
          </div>

          {/* Close Button */}
          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
            Continue
          </Button>
        </div>
      </Card>
    </div>
  )
}
