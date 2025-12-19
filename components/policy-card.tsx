"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Policy } from "@/lib/game-types"

interface PolicyCardProps {
  policy: Policy
  budget: number
  onSelect: (policyId: string) => void
  isSelected: boolean
}

export default function PolicyCard({ policy, budget, onSelect, isSelected }: PolicyCardProps) {
  const [showDetails, setShowDetails] = useState(false)
  const canAfford = budget >= policy.cost
  const isDisabled = !canAfford || isSelected

  return (
    <Card
      className={`transition-all cursor-pointer border-2 ${
        isSelected
          ? "border-primary bg-primary/5"
          : canAfford
            ? "border-muted hover:border-primary/50"
            : "border-muted bg-muted/30 opacity-60"
      }`}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base text-foreground flex-1">{policy.name}</CardTitle>
          <div
            className={`text-sm font-bold px-2 py-1 rounded ${canAfford ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"}`}
          >
            {policy.cost} pts
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground/70">{policy.description}</p>

        {showDetails && (
          <div className="space-y-3 pt-3 border-t border-border">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div
                className={`px-2 py-1.5 rounded ${policy.effects.jobs > 0 ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"}`}
              >
                <span className="font-semibold">Jobs:</span> {policy.effects.jobs > 0 ? "+" : ""}
                {policy.effects.jobs}
              </div>
              <div
                className={`px-2 py-1.5 rounded ${policy.effects.equity > 0 ? "bg-secondary/20 text-secondary" : "bg-red-50 text-red-700"}`}
              >
                <span className="font-semibold">Equity:</span> {policy.effects.equity > 0 ? "+" : ""}
                {policy.effects.equity}
              </div>
              <div
                className={`px-2 py-1.5 rounded ${policy.effects.support > 0 ? "bg-primary/20 text-primary" : "bg-red-50 text-red-700"}`}
              >
                <span className="font-semibold">Support:</span> {policy.effects.support > 0 ? "+" : ""}
                {policy.effects.support}
              </div>
              <div
                className={`px-2 py-1.5 rounded ${policy.effects.climate > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
              >
                <span className="font-semibold">Climate:</span> {policy.effects.climate > 0 ? "+" : ""}
                {policy.effects.climate}
              </div>
            </div>

            <div className="bg-muted/50 p-2 rounded text-xs text-foreground/80">
              <p className="font-semibold mb-1">Real-World Impact:</p>
              <p className="italic">{policy.narrative}</p>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={() => setShowDetails(!showDetails)} className="flex-1">
            {showDetails ? "Hide" : "Details"}
          </Button>
          <Button
            size="sm"
            onClick={() => onSelect(policy.id)}
            disabled={isDisabled}
            className={`flex-1 ${isSelected ? "bg-primary text-primary-foreground" : ""}`}
          >
            {isSelected ? "Selected" : "Choose"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
