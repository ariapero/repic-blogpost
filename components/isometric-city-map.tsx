"use client"
import { useState, useRef } from "react"
import type React from "react"

import type { Policy, Metrics } from "@/lib/game-types"
import { POLICIES } from "@/lib/game-types"

interface IsometricCityMapProps {
  budget: number
  selectedPolicies: string[]
  historicalSelections: string[]
  availablePolicies: Policy[]
  onSelectPolicy: (policyId: string) => void
  onPolicySelected?: (policy: Policy) => void
  metrics: Metrics
}

interface HoverState {
  policyId: string | null
  x: number
  y: number
}

const COLORS = {
  sage: { light: "#D4F1E8", medium: "#A8D5BA", dark: "#6BA384" },
  pink: { light: "#F1D4D4", medium: "#E8B4B4", dark: "#D98888" },
  teal: { light: "#A8E6DB", medium: "#6DC7BA", dark: "#3DA599" },
  orange: { light: "#FFD6B8", medium: "#FFB380", dark: "#FF8C42" },
  purple: { light: "#D4C5F9", medium: "#B8A2E8", dark: "#9370DB" },
  blue: { light: "#B8D8FF", medium: "#80B3FF", dark: "#4A90E2" },
  white: "#FFFFFF",
  darkGray: "#4A4A4A",
  lightGray: "#E0E0E0",
  yellow: "#FFE082",
}

// Tech building: Modern glass office with blue windows
function TechBuilding({ x, y, isSelected, isHovered, isAffordable, onClick, isPermanent, isUpgraded }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      {/* Base */}
      <polygon
        points={`${x},${y + 30} ${x + 35},${y + 15} ${x + 70},${y + 30} ${x + 70},${y + 110} ${x + 35},${y + 125} ${x},${y + 110}`}
        fill={COLORS.blue.medium}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {/* Windows grid - more/smaller if upgraded */}
      {!isUpgraded ? (
        [0, 1, 2, 3].map((row) =>
          [0, 1].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={x + 16 + col * 22}
              y={y + 40 + row * 18}
              width="15"
              height="12"
              fill={COLORS.blue.light}
              stroke={COLORS.blue.dark}
              strokeWidth="1"
            />
          )),
        )
      ) : (
        <>
          {[0, 1, 2, 3, 4, 5].map((row) =>
            [0, 1, 2, 3].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={x + 8 + col * 15}
                y={y + 33.5 + row * 13}
                width="10"
                height="9"
                fill={COLORS.blue.light}
                stroke={COLORS.blue.dark}
                strokeWidth="0.5"
              />
            )),
          )}
          {/* Solar panels on roof to show upgrade */}
          <rect
            x={x + 19}
            y={y + 28}
            width="32"
            height="3"
            fill={COLORS.blue.dark}
            stroke={COLORS.darkGray}
            strokeWidth="0.5"
          />
          <rect
            x={x + 19}
            y={y + 110}
            width="32"
            height="3"
            fill={COLORS.blue.dark}
            stroke={COLORS.darkGray}
            strokeWidth="0.5"
          />
        </>
      )}
      {/* Roof */}
      <polygon
        points={`${x},${y + 30} ${x + 35},${y + 15} ${x + 70},${y + 30} ${x + 35},${y + 20}`}
        fill={COLORS.blue.dark}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {isSelected && (
        <ellipse
          cx={x + 35}
          cy={y + 70}
          rx="60"
          ry="60"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

// Housing: Residential building with varied colors and balconies
function HousingBuilding({ x, y, isSelected, isHovered, isAffordable, onClick, isUpgraded, isPermanent }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  const color = isUpgraded ? COLORS.yellow : COLORS.pink.medium

  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      {/* Main building */}
      <polygon
        points={`${x},${y + 35} ${x + 40},${y + 18} ${x + 80},${y + 35} ${x + 80},${y + 105} ${x + 40},${y + 122} ${x},${y + 105}`}
        fill={color}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {/* Windows and balconies */}
      {[0, 1, 2].map((row) =>
        [0, 1].map((col) => (
          <g key={`${row}-${col}`}>
            <rect
              x={x + 17 + col * 28}
              y={y + 42 + row * 22}
              width="18"
              height="16"
              fill={isUpgraded ? COLORS.pink.medium : COLORS.yellow}
              stroke={COLORS.darkGray}
              strokeWidth="1"
            />
            {isUpgraded && (
              <rect
                x={x + 15 + col * 28}
                y={y + 58 + row * 22}
                width="22"
                height="3"
                fill={COLORS.teal.dark}
                stroke={COLORS.darkGray}
                strokeWidth="1"
              />
            )}
          </g>
        )),
      )}
      {/* Roof */}
      <polygon
        points={`${x},${y + 35} ${x + 40},${y + 18} ${x + 80},${y + 35} ${x + 40},${y + 18}`}
        fill={COLORS.orange.dark}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {isSelected && (
        <ellipse
          cx={x + 40}
          cy={y + 70}
          rx="60"
          ry="60"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

// Hospital/Health building with red cross
function HealthBuilding({ x, y, isSelected, isHovered, isAffordable, onClick, isPermanent }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      <polygon
        points={`${x},${y + 28} ${x + 45},${y + 10} ${x + 90},${y + 28} ${x + 90},${y + 108} ${x + 45},${y + 126} ${x},${y + 108}`}
        fill={COLORS.white}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {/* Windows */}
      {[0, 1, 2, 3].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={x + 14 + col * 25}
            y={y + 38 + row * 18}
            width="12"
            height="12"
            fill={COLORS.blue.light}
            stroke={COLORS.blue.dark}
            strokeWidth="1"
          />
        )),
      )}
      {/* Red cross */}
      <g fill={COLORS.pink.dark}>
        <rect x={x + 32} y={y + 34.5} width="26" height="13" />
        <rect x={x + 38.5} y={y + 28} width="13" height="26" />
      </g>
      <polygon
        points={`${x},${y + 28} ${x + 45},${y + 10} ${x + 90},${y + 28} ${x + 45},${y + 18}`}
        fill={COLORS.pink.medium}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {isSelected && (
        <ellipse
          cx={x + 45}
          cy={y + 68}
          rx="60"
          ry="60"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

// Brownfield: Empty contaminated lot or upgraded park
function BrownfieldArea({ x, y, isSelected, isHovered, isAffordable, onClick, isUpgraded, isPermanent }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  if (!isUpgraded) {
    // Contaminated empty lot
    return (
      <g
        opacity={opacity}
        className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
        onClick={onClick}
      >
        <rect
          x={x}
          y={y}
          width="110"
          height="90"
          fill={COLORS.lightGray}
          stroke={COLORS.darkGray}
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <text x={x + 25} y={y + 50} fontSize="12" fill={COLORS.darkGray}>
          Brownfield
        </text>
        {isSelected && (
          <rect
            x={x - 5}
            y={y - 5}
            width="120"
            height="100"
            fill="none"
            stroke={COLORS.pink.dark}
            strokeWidth="3"
            strokeDasharray="8,4"
          />
        )}
      </g>
    )
  }

  // Green park with trees
  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      <rect x={x} y={y} width="110" height="90" fill={COLORS.sage.light} stroke={COLORS.sage.dark} strokeWidth="2" />
      {/* Trees */}
      {[
        { x: x + 20, y: y + 30 },
        { x: x + 50, y: y + 25 },
        { x: x + 80, y: y + 35 },
        { x: x + 35, y: y + 65 },
        { x: x + 70, y: y + 70 },
      ].map((pos, i) => (
        <g key={i}>
          <circle cx={pos.x} cy={pos.y} r="8" fill={COLORS.sage.dark} />
          <circle cx={pos.x} cy={pos.y - 6} r="10" fill={COLORS.sage.medium} />
        </g>
      ))}
      {isSelected && (
        <rect
          x={x - 5}
          y={y - 5}
          width="120"
          height="100"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

// Playground upgrade
function PlaygroundArea({ x, y, isSelected, isHovered, isAffordable, onClick, isPermanent }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      <rect x={x} y={y} width="110" height="90" fill={COLORS.sage.medium} stroke={COLORS.sage.dark} strokeWidth="2" />
      {/* Playground equipment */}
      <rect x={x + 20} y={y + 40} width="15" height="30" fill={COLORS.orange.medium} stroke={COLORS.darkGray} />
      <circle cx={x + 55} cy={y + 50} r="12" fill="none" stroke={COLORS.purple.dark} strokeWidth="3" />
      <rect x={x + 75} y={y + 35} width="20" height="35" fill={COLORS.blue.medium} stroke={COLORS.darkGray} />
      {isSelected && (
        <rect
          x={x - 5}
          y={y - 5}
          width="120"
          height="100"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

// Cultural building with colorful facade
function CulturalBuilding({ x, y, isSelected, isHovered, isAffordable, onClick, isUpgraded, isPermanent }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      <polygon
        points={`${x},${y + 32} ${x + 42},${y + 15} ${x + 84},${y + 32} ${x + 84},${y + 100} ${x + 42},${y + 117} ${x},${y + 100}`}
        fill={COLORS.purple.medium}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {/* Colorful panels */}
      <rect x={x + 14} y={y + 45} width="25" height="20" fill={COLORS.orange.medium} />
      <rect x={x + 44} y={y + 45} width="25" height="20" fill={COLORS.pink.medium} />
      <rect x={x + 14} y={y + 70} width="25" height="20" fill={COLORS.blue.medium} />
      <rect x={x + 44} y={y + 70} width="25" height="20" fill={COLORS.teal.medium} />
      {isUpgraded && (
        <text x={x + 15} y={y + 40} fontSize="10" fill={COLORS.white} fontWeight="bold">
          CO-OP
        </text>
      )}
      <polygon
        points={`${x},${y + 32} ${x + 42},${y + 15} ${x + 84},${y + 32} ${x + 42},${y + 22}`}
        fill={COLORS.purple.dark}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {isSelected && (
        <ellipse
          cx={x + 42}
          cy={y + 66}
          rx="60"
          ry="60"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

// Transit: Bus station with waiting area
function TransitBuilding({ x, y, isSelected, isHovered, isAffordable, onClick, isUpgraded, isPermanent }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      <polygon
        points={`${x},${y + 25} ${x + 38},${y + 12} ${x + 76},${y + 25} ${x + 76},${y + 85} ${x + 38},${y + 98} ${x},${y + 85}`}
        fill={COLORS.orange.medium}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />

      {!isUpgraded ? (
        <>
          {/* One large bus */}
          <rect
            x={x + 15}
            y={y + 45}
            width="46"
            height="28"
            fill={COLORS.white}
            stroke={COLORS.darkGray}
            rx="4"
            strokeWidth="2"
          />
          <rect x={x + 20} y={y + 50} width="14" height="12" fill={COLORS.blue.light} />
          <rect x={x + 38} y={y + 50} width="14" height="12" fill={COLORS.blue.light} />
          <circle cx={x + 25} cy={y + 70} r="3" fill={COLORS.darkGray} />
          <circle cx={x + 51} cy={y + 70} r="3" fill={COLORS.darkGray} />
        </>
      ) : (
        <>
          <rect x={x + 8} y={y + 38} width="60" height="4" fill={COLORS.orange.dark} stroke={COLORS.darkGray} />

          {/* Two smaller buses side by side */}
          <rect
            x={x + 8}
            y={y + 48}
            width="28"
            height="18"
            fill={COLORS.white}
            stroke={COLORS.darkGray}
            rx="2"
            strokeWidth="1.5"
          />
          <rect x={x + 12} y={y + 52} width="8" height="8" fill={COLORS.blue.light} />
          <rect x={x + 22} y={y + 52} width="8" height="8" fill={COLORS.blue.light} />
          <circle cx={x + 14} cy={y + 64} r="2" fill={COLORS.darkGray} />
          <circle cx={x + 30} cy={y + 64} r="2" fill={COLORS.darkGray} />

          <rect
            x={x + 40}
            y={y + 48}
            width="28"
            height="18"
            fill={COLORS.white}
            stroke={COLORS.darkGray}
            rx="2"
            strokeWidth="1.5"
          />
          <rect x={x + 44} y={y + 52} width="8" height="8" fill={COLORS.blue.light} />
          <rect x={x + 54} y={y + 52} width="8" height="8" fill={COLORS.blue.light} />
          <circle cx={x + 46} cy={y + 64} r="2" fill={COLORS.darkGray} />
          <circle cx={x + 62} cy={y + 64} r="2" fill={COLORS.darkGray} />
        </>
      )}

      <polygon
        points={`${x},${y + 25} ${x + 38},${y + 12} ${x + 76},${y + 25} ${x + 38},${y + 18}`}
        fill={COLORS.orange.dark}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {isSelected && (
        <ellipse
          cx={x + 38}
          cy={y + 55}
          rx="60"
          ry="60"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

// Training center building
function TrainingBuilding({ x, y, isSelected, isHovered, isAffordable, onClick, isPermanent }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      <polygon
        points={`${x},${y + 30} ${x + 36},${y + 16} ${x + 72},${y + 30} ${x + 72},${y + 95} ${x + 36},${y + 109} ${x},${y + 95}`}
        fill={COLORS.teal.medium}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {/* Entrance */}
      <rect x={x + 24} y={y + 75} width="22" height="25" fill={COLORS.teal.dark} stroke={COLORS.darkGray} />
      {/* Windows */}
      {[0, 1].map((row) =>
        [0, 1].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={x + 16 + col * 24}
            y={y + 38 + row * 18}
            width="14"
            height="12"
            fill={COLORS.yellow}
            stroke={COLORS.darkGray}
          />
        )),
      )}
      {/* Book icon */}
      <rect x={x + 28} y={y + 48} width="16" height="12" fill={COLORS.white} stroke={COLORS.darkGray} />
      <polygon
        points={`${x},${y + 30} ${x + 36},${y + 16} ${x + 72},${y + 30} ${x + 36},${y + 23}`}
        fill={COLORS.teal.dark}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {isSelected && (
        <ellipse
          cx={x + 36}
          cy={y + 62}
          rx="60"
          ry="60"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

// Participatory budgeting: city hall-style building
function ParticipationBuilding({ x, y, isSelected, isHovered, isAffordable, onClick, isPermanent }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      <polygon
        points={`${x},${y + 35} ${x + 44},${y + 18} ${x + 88},${y + 35} ${x + 88},${y + 100} ${x + 44},${y + 117} ${x},${y + 100}`}
        fill={COLORS.white}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {/* Columns */}
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={x + 10 + i * 20}
          y={y + 48}
          width="8"
          height="45"
          fill={COLORS.lightGray}
          stroke={COLORS.darkGray}
        />
      ))}
      {/* Roof */}
      <polygon
        points={`${x - 5},${y + 35} ${x + 44},${y + 13} ${x + 93},${y + 35} ${x + 44},${y + 23}`}
        fill={COLORS.blue.dark}
        stroke={COLORS.darkGray}
        strokeWidth="2"
      />
      {isSelected && (
        <ellipse
          cx={x + 44}
          cy={y + 65}
          rx="60"
          ry="60"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

// Solar microgrid: panels and battery storage
function SolarArea({ x, y, isSelected, isHovered, isAffordable, onClick, isPermanent }: any) {
  let opacity = isPermanent ? 1 : isSelected ? 1 : isAffordable ? 0.5 : 0.3
  if (isHovered && isAffordable && !isPermanent) opacity = 0.85

  return (
    <g
      opacity={opacity}
      className={isAffordable && !isPermanent ? "cursor-pointer" : "cursor-not-allowed"}
      onClick={onClick}
    >
      <rect x={x} y={y} width="110" height="90" fill={COLORS.sage.light} stroke={COLORS.sage.dark} strokeWidth="2" />
      {/* Solar panels */}
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => (
          <rect
            key={`${row}-${col}`}
            x={x + 10 + col * 32}
            y={y + 15 + row * 24}
            width="28"
            height="18"
            fill={COLORS.blue.dark}
            stroke={COLORS.darkGray}
            strokeWidth="1.5"
          />
        )),
      )}
      {isSelected && (
        <rect
          x={x - 5}
          y={y - 5}
          width="120"
          height="100"
          fill="none"
          stroke={COLORS.pink.dark}
          strokeWidth="3"
          strokeDasharray="8,4"
        />
      )}
    </g>
  )
}

function Road({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={COLORS.darkGray} strokeWidth="20" opacity="0.4" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="2" strokeDasharray="8,6" opacity="0.8" />
    </g>
  )
}

function Tree({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  const size = 16 * scale
  return (
    <g opacity="0.6">
      <polygon
        points={`${x},${y - size * 0.8} ${x + size * 0.3},${y} ${x - size * 0.3},${y}`}
        fill={COLORS.sage.dark}
      />
      <polygon
        points={`${x},${y - size * 0.4} ${x + size * 0.4},${y + size * 0.2} ${x - size * 0.4},${y + size * 0.2}`}
        fill={COLORS.sage.medium}
      />
      <line x1={x} y1={y + size * 0.2} x2={x} y2={y + size * 0.5} stroke="#8B6F47" strokeWidth={1 * scale} />
    </g>
  )
}

export default function IsometricCityMap({
  budget,
  selectedPolicies,
  historicalSelections,
  availablePolicies,
  onSelectPolicy,
  onPolicySelected,
  metrics,
}: IsometricCityMapProps) {
  const [hover, setHover] = useState<HoverState>({ policyId: null, x: 0, y: 0 })
  const [showBudgetWarning, setShowBudgetWarning] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  const getPolicy = (policyId: string) => availablePolicies.find((p) => p.id === policyId)
  const canAfford = (policy: Policy) => budget >= policy.cost
  const isSelected = (policyId: string) => selectedPolicies.includes(policyId)
  const isPermanentlySelected = (policyId: string) => historicalSelections.includes(policyId)

  const handlePolicyClick = (policyId: string) => {
    const policy = getPolicy(policyId)
    if (!policy) return

    if (isPermanentlySelected(policyId)) return

    if (isSelected(policyId)) {
      onSelectPolicy(policyId)
      return
    }

    if (!canAfford(policy)) {
      setShowBudgetWarning(true)
      setTimeout(() => setShowBudgetWarning(false), 3000)
      return
    }

    onSelectPolicy(policyId)
    if (onPolicySelected) {
      onPolicySelected(policy)
    }
  }

  const handleMouseEnter = (policyId: string, event: React.MouseEvent) => {
    const rect = mapRef.current?.getBoundingClientRect()
    if (rect) {
      setHover({
        policyId,
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      })
    }
  }

  const getBuildingComponent = (policyId: string) => {
    if (policyId === "tech-jobs") return TechBuilding
    if (policyId === "tech-jobs-equity") return TechBuilding
    if (policyId === "affordable-housing") return HousingBuilding
    if (policyId === "housing-cooperative") return HousingBuilding
    if (policyId === "health-equity") return HealthBuilding
    if (policyId === "brownfield-cleanup") return BrownfieldArea
    if (policyId === "brownfield-playground") return PlaygroundArea
    if (policyId === "cultural-hub") return CulturalBuilding
    if (policyId === "cultural-cooperative") return CulturalBuilding
    if (policyId === "transit-expansion") return TransitBuilding
    if (policyId === "rapid-transit") return TransitBuilding
    if (policyId === "workforce-training") return TrainingBuilding
    if (policyId === "participatory-budget") return ParticipationBuilding
    if (policyId === "solar-microgrid") return SolarArea
    return TechBuilding
  }

  const renderBuildings = () => {
    const allBuildingsToShow = new Map<string, { policy: Policy; isPermanent: boolean }>()

    // First, add all currently available policies (these are selectable)
    availablePolicies.forEach((policy) => {
      allBuildingsToShow.set(policy.id, { policy, isPermanent: false })
    })

    // Then, add historical selections that are NOT in availablePolicies
    // These should be shown as permanent buildings (full opacity, non-clickable)
    historicalSelections.forEach((policyId) => {
      if (!allBuildingsToShow.has(policyId)) {
        const policy = POLICIES.find((p: Policy) => p.id === policyId)
        if (policy) {
          // Check if this policy has an upgrade available in availablePolicies
          const hasUpgradeAvailable = POLICIES.some(
            (p: Policy) => p.isUpgrade && p.unlockedBy === policyId && availablePolicies.some((ap) => ap.id === p.id),
          )

          // If there's an upgrade available, don't show the base version
          // The upgrade will already be in availablePolicies with the upgraded visual
          if (!hasUpgradeAvailable) {
            // No upgrade available, so show as permanent
            allBuildingsToShow.set(policyId, { policy, isPermanent: true })
          }
        }
      }
    })

    return Array.from(allBuildingsToShow.values()).map(({ policy, isPermanent }) => {
      const positions: Record<string, { x: number; y: number }> = {
        "tech-jobs": { x: 160, y: 80 },
        "affordable-housing": { x: 770, y: 225 },
        "health-equity": { x: 562, y: 80 },
        "brownfield-cleanup": { x: 135, y: 250 },
        "participatory-budget": { x: 355, y: 230 },
        "cultural-hub": { x: 565, y: 230 },
        "workforce-training": { x: 160, y: 400 },
        "transit-expansion": { x: 600, y: 395 },
        "tech-jobs-equity": { x: 160, y: 80 }, // Same as tech-jobs
        "brownfield-playground": { x: 135, y: 250 }, // Same as brownfield-cleanup
        "housing-cooperative": { x: 770, y: 225 }, // Same as affordable-housing
        "solar-microgrid": { x: 550, y: 540 }, // alternative upgrade?
        "rapid-transit": { x: 600, y: 395 }, // Same as transit-expansion
        "cultural-cooperative": { x: 565, y: 230 }, // Same as cultural-hub
      }

      const pos = positions[policy.id]
      if (!pos) return null

      const policyObj = getPolicy(policy.id)
      const highlighted = isSelected(policy.id) || isPermanentlySelected(policy.id)
      const BuildingComponent = getBuildingComponent(policy.id)

      // Show upgraded version if the base policy was selected and now we're looking at the upgrade
      const isUpgraded =
        policy.isUpgrade || (policy.id === "brownfield-cleanup" && historicalSelections.includes("brownfield-cleanup"))

      return (
        <g
          key={policy.id}
          onMouseEnter={(e) => !isPermanent && handleMouseEnter(policy.id, e)}
          onMouseLeave={() => setHover({ policyId: null, x: 0, y: 0 })}
        >
          <BuildingComponent
            x={pos.x}
            y={pos.y}
            isSelected={highlighted}
            isHovered={hover.policyId === policy.id}
            isAffordable={policyObj ? canAfford(policyObj) : false}
            onClick={() => handlePolicyClick(policy.id)}
            isUpgraded={isUpgraded}
            isPermanent={isPermanent}
          />
        </g>
      )
    })
  }

  return (
    <div
      ref={mapRef}
      className="relative w-full bg-gradient-to-b from-sky-100 to-emerald-50 rounded-lg overflow-visible"
    >
      {showBudgetWarning && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold text-sm animate-pulse">
          Insufficient budget for this policy!
        </div>
      )}

      <svg
        className="w-full h-auto"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid meet"
        style={{ minHeight: "600px", background: "linear-gradient(180deg, #F0FBF9 0%, #EAF5F3 100%)" }}
      >
        <Road x1="100" y1="220" x2="900" y2="220" />
        <Road x1="100" y1="370" x2="900" y2="370" />
        <Road x1="100" y1="570" x2="900" y2="470" />
        <Road x1="290" y1="80" x2="290" y2="650" />
        <Road x1="500" y1="80" x2="500" y2="650" />
        <Road x1="710" y1="80" x2="710" y2="650" />

        <Tree x={120} y={120} scale={4} />
        <Tree x={880} y={140} scale={4} />
        <Tree x={150} y={600} scale={4} />
        <Tree x={895} y={620} scale={4} />
        <Tree x={860} y={600} scale={2} />
        <Tree x={920} y={570} scale={1.5} />

        {renderBuildings()}
      </svg>

      {hover.policyId && getPolicy(hover.policyId) && (
        <div
          className="absolute z-50 bg-white rounded-lg shadow-xl border-2 border-primary/30 p-4 w-80 pointer-events-none"
          style={{
            left: `${Math.min(hover.x + 20, 600)}px`,
            top: `${Math.max(hover.y - 50, 10)}px`,
            maxWidth: "320px",
          }}
        >
          <div className="space-y-3">
            <div>
              <h4 className="font-bold text-foreground text-sm mb-1">{getPolicy(hover.policyId)?.name}</h4>
              <p className="text-xs text-foreground/60">{getPolicy(hover.policyId)?.description}</p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold">Cost:</span>
              <span
                className={`px-2 py-1 rounded font-bold text-xs ${
                  canAfford(getPolicy(hover.policyId)!) ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }`}
              >
                {getPolicy(hover.policyId)?.cost} points
              </span>
            </div>

            <div className="p-3 bg-primary/5 rounded border border-primary/20">
              <p className="text-xs text-foreground leading-relaxed">{getPolicy(hover.policyId)?.narrative}</p>
            </div>

            <div className="grid grid-cols-4 gap-2 text-xs">
              {[
                { label: "Jobs", value: getPolicy(hover.policyId)?.effects.jobs },
                { label: "Equity", value: getPolicy(hover.policyId)?.effects.equity },
                { label: "Support", value: getPolicy(hover.policyId)?.effects.support },
                { label: "Climate", value: getPolicy(hover.policyId)?.effects.climate },
              ].map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-foreground/60 text-[10px]">{metric.label}</div>
                  <div
                    className={`font-bold ${(metric.value || 0) > 0 ? "text-green-600" : (metric.value || 0) < 0 ? "text-red-600" : "text-gray-500"}`}
                  >
                    {(metric.value || 0) > 0 ? "+" : ""}
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-foreground/60 text-center pt-2 border-t">
              {isSelected(hover.policyId) ? "Click to deselect" : "Click to select"}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
