"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import MetricsDisplay from "./metrics-display"
import BudgetDisplay from "./budget-display"
import IsometricCityMap from "./isometric-city-map"
import EventLog from "./event-log"
import ResultsScreen from "./results-screen"
import {
  STAKEHOLDERS,
  type GameState,
  applyMetricChanges,
  calculateMetricChange,
  getAvailablePolicies,
} from "@/lib/game-types"

interface GameViewProps {
  onBack: () => void
}

const INITIAL_BUDGET = 100
const MAX_ROUNDS = 4

export default function GameView({ onBack }: GameViewProps) {
  const [historicalSelections, setHistoricalSelections] = useState<string[]>([])
  const [gameState, setGameState] = useState<GameState>({
    round: 1,
    budget: INITIAL_BUDGET,
    metrics: {
      jobs: 50,
      equity: 50,
      climate: 50,
      support: 50,
    },
    policies: getAvailablePolicies([]),
    events: [],
    selectedPolicies: [],
  })

  const [gameOver, setGameOver] = useState(false)

  const handleSelectPolicy = useCallback(
    (policyId: string) => {
      setGameState((prev) => {
        const policy = prev.policies.find((p) => p.id === policyId)
        if (!policy) return prev

        if (prev.selectedPolicies.includes(policyId)) {
          const newSelected = prev.selectedPolicies.filter((id) => id !== policyId)
          const newBudget = prev.budget + policy.cost
          const metricChanges = calculateMetricChange(newSelected)
          const roundStartMetrics = applyMetricChanges(
            { jobs: 50, equity: 50, climate: 50, support: 50 },
            calculateMetricChange(historicalSelections),
          )
          const newMetrics = applyMetricChanges(roundStartMetrics, metricChanges)

          return {
            ...prev,
            budget: newBudget,
            selectedPolicies: newSelected,
            metrics: newMetrics,
          }
        }

        if (prev.budget < policy.cost) {
          return prev
        }

        const newSelected = [...prev.selectedPolicies, policyId]
        const newBudget = prev.budget - policy.cost
        const metricChanges = calculateMetricChange(newSelected)
        const roundStartMetrics = applyMetricChanges(
          { jobs: 50, equity: 50, climate: 50, support: 50 },
          calculateMetricChange(historicalSelections),
        )
        const newMetrics = applyMetricChanges(roundStartMetrics, metricChanges)

        return {
          ...prev,
          budget: newBudget,
          selectedPolicies: newSelected,
          metrics: newMetrics,
        }
      })
    },
    [historicalSelections],
  )

  const handleSubmitRound = useCallback(() => {
    if (gameState.selectedPolicies.length === 0) {
      alert("Please select at least one policy before advancing.")
      return
    }

    setGameState((prev) => {
      const newHistoricalSelections = [...historicalSelections, ...prev.selectedPolicies]
      setHistoricalSelections(newHistoricalSelections)

      const newEvents = prev.selectedPolicies.map((policyId) => {
        const policy = prev.policies.find((p) => p.id === policyId)
        return {
          round: prev.round,
          policy: policyId,
          narrative: policy?.narrative || "",
          metricChanges: policy?.effects || {},
        }
      })

      const isLastRound = prev.round >= MAX_ROUNDS

      const nextAvailablePolicies = getAvailablePolicies(newHistoricalSelections)

      const cumulativeChanges = calculateMetricChange(newHistoricalSelections)
      const newMetrics = applyMetricChanges({ jobs: 50, equity: 50, climate: 50, support: 50 }, cumulativeChanges)

      return {
        ...prev,
        events: [...prev.events, ...newEvents],
        selectedPolicies: [],
        round: isLastRound ? prev.round : prev.round + 1,
        budget: INITIAL_BUDGET,
        policies: nextAvailablePolicies,
        metrics: newMetrics,
      }
    })

    if (gameState.round >= MAX_ROUNDS) {
      setGameOver(true)
    }
  }, [gameState, historicalSelections])

  if (gameOver) {
    return (
      <ResultsScreen
        metrics={gameState.metrics}
        events={gameState.events}
        onRestart={() => {
          setHistoricalSelections([])
          setGameState({
            round: 1,
            budget: INITIAL_BUDGET,
            metrics: {
              jobs: 50,
              equity: 50,
              climate: 50,
              support: 50,
            },
            policies: getAvailablePolicies([]),
            events: [],
            selectedPolicies: [],
          })
          setGameOver(false)
        }}
        onHome={onBack}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <Button onClick={onBack} variant="outline" size="sm" className="mb-4 bg-transparent">
            ← Back to Blog
          </Button>
          <h1 className="text-4xl font-bold text-foreground">Mayor of Reddale</h1>
          <p className="text-lg text-foreground/70">
            Year {gameState.round} of {MAX_ROUNDS} — Click on buildings to implement policies. Hover to see details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BudgetDisplay budget={gameState.budget} maxBudget={INITIAL_BUDGET} />
          <Card className="border-primary/20 p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{MAX_ROUNDS - gameState.round + 1}</div>
              <div className="text-sm text-muted-foreground">Years Remaining</div>
            </div>
          </Card>
          <div className="hidden md:block" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <MetricsDisplay metrics={gameState.metrics} label="Current Metrics" />
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3 px-1">Key Stakeholders</h3>
              <div className="space-y-2 text-xs">
                {STAKEHOLDERS.map((stakeholder) => (
                  <div key={stakeholder.id} className="p-2 bg-muted/30 rounded border border-primary/10">
                    <div className="font-semibold text-foreground">{stakeholder.name}</div>
                    <div className="text-foreground/60 text-xs mt-1">{stakeholder.priorities.join(", ")}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <IsometricCityMap
              budget={gameState.budget}
              selectedPolicies={gameState.selectedPolicies}
              historicalSelections={historicalSelections}
              availablePolicies={gameState.policies}
              onSelectPolicy={handleSelectPolicy}
              metrics={gameState.metrics}
            />
            <div className="mt-4 p-3 bg-primary/5 rounded border border-primary/20 text-xs text-foreground/70">
              <p className="font-semibold mb-1">How to play:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Your 100-point budget resets each year, but metric effects are cumulative</li>
                <li>Hover over buildings to see cost and policy effects</li>
                <li>Click buildings to select them (narrative appears next to building)</li>
                <li>Click again to deselect and refund the budget</li>
                <li>Click elsewhere to close popup and confirm selection</li>
                <li>Pick policies that balance all metrics wisely</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <EventLog events={gameState.events} />
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
            Back to Blog
          </Button>
          <Button
            onClick={handleSubmitRound}
            disabled={gameState.selectedPolicies.length === 0}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {gameState.round >= MAX_ROUNDS ? "Complete Simulation" : "Advance to Next Year"}
          </Button>
        </div>
      </div>
    </div>
  )
}
