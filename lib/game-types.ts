export interface Metrics {
  jobs: number
  equity: number // Combines equity & inclusion with community trust
  climate: number
  support: number // Political support - can be negatively impacted by NIMBY, business opposition, etc.
}

export interface Stakeholder {
  id: string
  name: string
  priorities: string[]
  description: string
}

export interface Policy {
  id: string
  name: string
  description: string
  cost: number
  effects: {
    jobs: number
    equity: number
    climate: number
    support: number
  }
  narrative: string
  unlockedBy?: string // Policy ID that must be selected first to unlock this
  isUpgrade?: boolean
}

export interface GameState {
  round: number
  budget: number
  metrics: Metrics
  policies: Policy[]
  events: GameEvent[]
  selectedPolicies: string[]
}

export interface GameEvent {
  round: number
  policy: string
  narrative: string
  metricChanges: Partial<Metrics>
}

export const STAKEHOLDERS: Stakeholder[] = [
  {
    id: "factory-workers",
    name: "Former Factory Workers",
    priorities: ["Jobs", "Stability"],
    description: "Want economic security and meaningful employment in the rebuilt city",
  },
  {
    id: "transit-students",
    name: "Bus Riders & Students",
    priorities: ["Equity", "Mobility"],
    description: "Need affordable transit, housing, and access to quality education",
  },
  {
    id: "environmental",
    name: "Environmental Justice Coalition",
    priorities: ["Climate", "Equity"],
    description: "Fighting for clean air, water, and environmental remediation for all",
  },
  {
    id: "business",
    name: "Downtown Business Association",
    priorities: ["Jobs", "Political Support"],
    description: "Want vibrant downtown with growth opportunities and favorable policy environment",
  },
]

export const BASE_POLICIES: Policy[] = [
  {
    id: "tech-jobs",
    name: "Tech Sector Development Fund",
    description: "Attract tech companies and startups with tax incentives and office space",
    cost: 35,
    effects: {
      jobs: 15,
      equity: -8,
      climate: -3,
      support: -10, // Existing residents oppose gentrification risk
    },
    narrative:
      "New tech companies arrive, creating high-paying jobs—but many go to outside talent. Long-time residents fear displacement and rising rents. Opposition grows. (Trade-off: growth vs. inclusion)",
  },
  {
    id: "workforce-training",
    name: "Community Workforce Training Program",
    description: "Fund job training for displaced workers in clean energy and healthcare",
    cost: 30,
    effects: {
      jobs: 8,
      equity: 18,
      climate: 5,
      support: 12, // Builds broad community support
    },
    narrative:
      "Local workers gain skills and secure good jobs. Community trusts city leadership. A slower path to growth, but more equitable and politically popular. (Trade-off: inclusion over quick gains)",
  },
  {
    id: "affordable-housing",
    name: "Affordable Housing Initiative",
    description: "Convert abandoned buildings into mixed-income housing with community input",
    cost: 40,
    effects: {
      jobs: 5,
      equity: 20,
      climate: 3,
      support: -12, // Affluent residents and developers strongly oppose (NIMBY)
    },
    narrative:
      "Families can afford to stay. But wealthy homeowners fight back hard, fearing property values will drop. Political opposition is fierce. (Trade-off: equity vs. powerful interests)",
  },
  {
    id: "brownfield-cleanup",
    name: "Brownfield Cleanup & Green Space",
    description: "Clean up contaminated industrial site and convert to basic park with walking paths",
    cost: 25,
    effects: {
      jobs: 3,
      equity: 12,
      climate: 10,
      support: 8, // Broadly popular, low controversy
    },
    narrative:
      "The contaminated lot becomes safe and accessible. Families can finally enjoy green space. Nearly everyone supports this common-sense improvement. (Foundation for future development)",
  },
  {
    id: "participatory-budget",
    name: "Participatory Budgeting Platform",
    description: "Let residents vote on how to spend city funds—using a digital platform",
    cost: 20,
    effects: {
      jobs: 1,
      equity: 15,
      climate: 2,
      support: -8, // Business interests and political insiders resist losing control
    },
    narrative:
      "Citizens feel genuinely heard for the first time. But powerful interests lose influence and push back. Lobbyists work to undermine the initiative. (Trade-off: transparency vs. entrenched power)",
  },
  {
    id: "health-equity",
    name: "Community Health & Broadband Program",
    description: "Expand healthcare access and digital connectivity to underserved neighborhoods",
    cost: 30,
    effects: {
      jobs: 4,
      equity: 18,
      climate: 2,
      support: 6, // Generally popular but doesn't address deeper structural issues
    },
    narrative:
      "Residents can access telehealth and remote jobs. Digital equity improves. Some worry it's a band-aid, but most appreciate the tangible help. (Trade-off: immediate relief vs. systemic change)",
  },
  {
    id: "cultural-hub",
    name: "Arts & Cultural District Development",
    description: "Support local artists, galleries, music venues, and creative enterprises",
    cost: 28,
    effects: {
      jobs: 7,
      equity: 10,
      climate: 1,
      support: -6, // Artists support it, but gentrification concerns create opposition
    },
    narrative:
      "The city gains a vibrant cultural identity and attracts visitors. But residents fear the 'creative class' will price them out. Opposition grows from those worried about displacement. (Trade-off: vibrancy and risk)",
  },
  {
    id: "transit-expansion",
    name: "Public Transit Expansion",
    description: "Extend bus routes to connect isolated neighborhoods with job centers",
    cost: 32,
    effects: {
      jobs: 6,
      equity: 16,
      climate: 8,
      support: 4, // Car-centric residents resist, but most support it
    },
    narrative:
      "Workers can reach jobs without cars. Students access better schools. Some car owners complain about bus lanes. But mobility becomes more accessible for all. (Foundation for equitable access)",
  },
]

export const UPGRADE_POLICIES: Policy[] = [
  {
    id: "tech-jobs-equity",
    name: "Tech Sector: Local Hiring Mandate",
    description: "Require tech companies to hire and train local residents for new positions",
    cost: 25,
    effects: {
      jobs: 8,
      equity: 20,
      climate: 2,
      support: -15, // Tech companies lobby hard against this regulation
    },
    narrative:
      "Tech companies now hire from the community. Long-time residents get training and high-paying jobs. But companies threaten to leave, and business lobby works to repeal the mandate. (Upgrade: equity vs. business opposition)",
    unlockedBy: "tech-jobs",
    isUpgrade: true,
  },
  {
    id: "brownfield-playground",
    name: "Add Community Playground & Sports Field",
    description: "Expand the cleaned brownfield with playground equipment and sports facilities",
    cost: 22,
    effects: {
      jobs: 2,
      equity: 14,
      climate: 5,
      support: 10, // Universally popular with families
    },
    narrative:
      "Families gather at the new playground. Kids have safe space to play. The park becomes a beloved community hub. Nearly everyone celebrates this investment. (Building on previous cleanup work)",
    unlockedBy: "brownfield-cleanup",
    isUpgrade: true,
  },
  {
    id: "housing-cooperative",
    name: "Tenant-Owned Housing Cooperative",
    description: "Help residents form cooperatives to collectively own and manage housing",
    cost: 35,
    effects: {
      jobs: 4,
      equity: 25,
      climate: 4,
      support: -20, // Real estate industry fights this hard
    },
    narrative:
      "Residents gain ownership and control. Displacement stops. But landlords and developers launch a fierce campaign. Political pressure is intense. This is a battle. (Deep equity achievement vs. powerful opposition)",
    unlockedBy: "affordable-housing",
    isUpgrade: true,
  },
  {
    id: "solar-microgrid",
    name: "Community Solar Microgrid",
    description: "Install solar panels and battery storage for neighborhood energy independence",
    cost: 45,
    effects: {
      jobs: 7,
      equity: 12,
      climate: 22,
      support: -8, // Utility companies lobby against losing customers
    },
    narrative:
      "The neighborhood generates its own clean energy. Bills drop. Resilience improves. But the power company fights back, funding opposition campaigns. (Major climate milestone vs. utility opposition)",
    unlockedBy: "brownfield-cleanup",
    isUpgrade: true,
  },
  {
    id: "rapid-transit",
    name: "Rapid Bus Transit Lanes",
    description: "Dedicated bus lanes with priority signals for faster, more reliable service",
    cost: 30,
    effects: {
      jobs: 4,
      equity: 18,
      climate: 12,
      support: -10, // Car commuters strongly oppose losing lanes
    },
    narrative:
      "Buses become faster than driving. Ridership soars. But drivers are furious about losing lanes. Angry opposition forms. The city moves toward car-free future despite pushback. (Transit upgrade vs. car culture)",
    unlockedBy: "transit-expansion",
    isUpgrade: true,
  },
  {
    id: "cultural-cooperative",
    name: "Artist-Owned Creative Cooperative",
    description: "Help artists collectively own buildings and studios to prevent displacement",
    cost: 24,
    effects: {
      jobs: 5,
      equity: 16,
      climate: 2,
      support: -5, // Property owners resist tenants gaining ownership
    },
    narrative:
      "Artists now own their spaces. Culture thrives without displacement. Landlords oppose losing investment properties, but community celebrates the victory. (Anti-gentrification success vs. property interests)",
    unlockedBy: "cultural-hub",
    isUpgrade: true,
  },
]

export const POLICIES: Policy[] = [...BASE_POLICIES, ...UPGRADE_POLICIES]

export function calculateMetricChange(selectedPolicies: string[]): Partial<Metrics> {
  const changes = {
    jobs: 0,
    equity: 0,
    climate: 0,
    support: 0,
  }

  selectedPolicies.forEach((policyId) => {
    const policy = POLICIES.find((p) => p.id === policyId)
    if (policy) {
      changes.jobs += policy.effects.jobs
      changes.equity += policy.effects.equity
      changes.climate += policy.effects.climate
      changes.support += policy.effects.support
    }
  })

  return changes
}

export function applyMetricChanges(metrics: Metrics, changes: Partial<Metrics>): Metrics {
  return {
    jobs: Math.max(0, Math.min(100, (metrics.jobs || 0) + (changes.jobs || 0))),
    equity: Math.max(0, Math.min(100, (metrics.equity || 0) + (changes.equity || 0))),
    climate: Math.max(0, Math.min(100, (metrics.climate || 0) + (changes.climate || 0))),
    support: Math.max(0, Math.min(100, (metrics.support || 0) + (changes.support || 0))),
  }
}

export function getAvailablePolicies(selectedPolicyIds: string[]): Policy[] {
  // Start with base policies that haven't been selected
  const availableBase = BASE_POLICIES.filter((p) => !selectedPolicyIds.includes(p.id))

  // Add upgrades whose dependencies have been selected
  const availableUpgrades = UPGRADE_POLICIES.filter((p) => {
    // Must not be already selected
    if (selectedPolicyIds.includes(p.id)) return false
    // Must have dependency selected
    return p.unlockedBy ? selectedPolicyIds.includes(p.unlockedBy) : true
  })

  return [...availableBase, ...availableUpgrades]
}
