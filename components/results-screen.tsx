"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MetricsDisplay from "./metrics-display"
import type { Metrics, GameEvent } from "@/lib/game-types"
import { POLICIES } from "@/lib/game-types"

interface ResultsScreenProps {
  metrics: Metrics
  events: GameEvent[]
  onRestart: () => void
  onHome: () => void
}

function getOutcomeMessage(metrics: Metrics): { title: string; description: string } {
  const jobsGood = metrics.jobs >= 65
  const jobsGreat = metrics.jobs >= 80
  const equityGood = metrics.equity >= 65
  const equityGreat = metrics.equity >= 80
  const supportGood = metrics.support >= 65
  const supportGreat = metrics.support >= 80
  const climateGood = metrics.climate >= 65
  const climateGreat = metrics.climate >= 80

  const jobsBad = metrics.jobs < 50
  const equityBad = metrics.equity < 50
  const supportBad = metrics.support < 50
  const climateBad = metrics.climate < 50

  // Ideal outcomes - all metrics high
  if (jobsGreat && equityGreat && supportGreat && climateGreat) {
    return {
      title: "Reddale Renaissance",
      description:
        "Against all odds, you've achieved what many thought impossible: equitable growth with environmental sustainability and broad political support. Reddale is now studied as a national model for post-industrial transformation. Other struggling cities send delegations to learn from your approach.",
    }
  }

  // Strong outcomes - most metrics good
  if (jobsGood && equityGood && supportGood && climateGood) {
    return {
      title: "A City Transformed",
      description:
        "Reddale is thriving. You've balanced job creation with equity, earned political support across stakeholder groups, and made meaningful environmental progress. The city still faces challenges, but the foundation for long-term prosperity is solid.",
    }
  }

  // Tech-led growth without equity
  if (jobsGreat && climateBad && (equityBad || supportBad)) {
    return {
      title: "The Tech Boom's Shadow",
      description:
        "Job growth is undeniable—new offices, rising wages, declining unemployment. But longtime residents feel left behind. Rents are climbing faster than wages for service workers. Political tensions are high. Without addressing equity and inclusion, this growth may prove fragile and divisive.",
    }
  }

  // Green transition without jobs
  if (climateGreat && jobsBad && supportBad) {
    return {
      title: "Green But Struggling",
      description:
        "Reddale's environmental metrics are impressive—solar panels, clean transit, restored parks. But unemployment remains high and political opposition is mounting. Residents wonder: 'What good is a green city if I can't afford to live here or find work?' Economic opportunity must accompany environmental progress.",
    }
  }

  // Equity focus without economic base
  if (equityGood && jobsBad) {
    return {
      title: "Good Intentions, Hard Realities",
      description:
        "You've prioritized equity and community voice, which matters deeply. But without job creation, the city's tax base continues to shrink. Participatory governance can't substitute for economic opportunity. The challenge is building equity alongside growth, not instead of it.",
    }
  }

  // Strong jobs and support, weak equity and climate
  if (jobsGood && supportGood && equityBad && climateBad) {
    return {
      title: "Growth for Some",
      description:
        "The downtown is buzzing with new businesses and the business community is pleased. But low-income neighborhoods see little benefit, environmental justice concerns are ignored, and gentrification pressures are mounting. This is far from sustainable growth.",
    }
  }

  // High equity and climate, low support
  if (equityGood && climateGood && supportBad) {
    return {
      title: "Progressive Vision, Political Resistance",
      description:
        "You've championed equity and environmental justice, earning praise from activists. However, political opposition is fierce. Business interests and some residents feel alienated. Building coalitions across divides will be essential for lasting change.",
    }
  }

  // Strong support but weak on everything else
  if ((supportGood || supportGreat) && (jobsBad || equityBad || climateBad)) {
    return {
      title: "Popular but Unfinished",
      description:
        "You've maintained broad political support—no small feat in a polarized environment. But support alone doesn't pay bills or clean the air. The hard work of addressing jobs, equity, or climate remains. Political capital is valuable, but it must be spent on tangible improvements.",
    }
  }

  // Mixed bag - some good, some bad
  if ((jobsGood || equityGood || supportGood || climateGood) && (jobsBad || equityBad || supportBad || climateBad)) {
    return {
      title: "A City of Contrasts",
      description:
        "Reddale tells different stories depending on who you ask. Some neighborhoods are thriving, others declining. Some metrics improved, others worsened. The challenge ahead is ensuring progress reaches everyone—that economic opportunity, equity, political legitimacy, and environmental health move forward together.",
    }
  }

  // Moderate across the board
  const avg = (metrics.jobs + metrics.equity + metrics.support + metrics.climate) / 4
  if (avg >= 55 && avg < 65) {
    return {
      title: "Incremental Progress",
      description:
        "You've made steady, if modest, gains across multiple fronts. No metric collapsed, but none soared either. Reddale is better than it was four years ago, but the transformation you hoped for remains elusive.",
    }
  }

  // Poor outcomes - most metrics low
  if (jobsBad && equityBad && supportBad) {
    return {
      title: "Deepening Struggles",
      description:
        "Reddale faces mounting challenges. Economic stagnation persists, inequality has grown, and political polarization is high. Residents are frustrated, and trust in leadership is eroding. The next mayor will inherit a difficult situation. Sometimes setbacks teach us what not to do—a hard but valuable lesson.",
    }
  }

  // Catch-all for other combinations
  return {
    title: "Mixed Results",
    description:
      "Your tenure brought both progress and setbacks. Some constituencies benefited, others didn't. Trade-offs are inherent in governance, but Reddale needs more cohesive, inclusive strategies. Reflect on which voices were centered, which were ignored, and how to build broader coalitions next time.",
  }
}

export default function ResultsScreen({ metrics, events, onRestart, onHome }: ResultsScreenProps) {
  const outcome = getOutcomeMessage(metrics)

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-8">
        {/* Outcome Message */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-3xl text-primary text-balance">{outcome.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-foreground/80 leading-relaxed">{outcome.description}</p>
          </CardContent>
        </Card>

        {/* Final Metrics */}
        <MetricsDisplay metrics={metrics} label="Final City Metrics" />

        {/* Game Summary */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg text-primary">Your Decisions Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {events.length === 0 ? (
                <p className="text-sm text-muted-foreground">You didn't enact any policies.</p>
              ) : (
                events.map((event, idx) => {
                  const policy = POLICIES.find((p) => p.id === event.policy)
                  return (
                    <div key={idx} className="text-sm border-b border-border pb-2 last:border-0">
                      <p className="font-semibold text-foreground">
                        Year {event.round}: {policy?.name}
                      </p>
                      <p className="text-foreground/70 text-xs mt-1">{event.narrative}</p>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reflection */}
        <Card className="border-secondary/20 bg-secondary/5">
          <CardHeader>
            <CardTitle className="text-primary">Reflect on the Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground mb-2">What Did You Learn?</h4>
              <ul className="list-disc pl-4.5 space-y-2 text-foreground/80">
                <li>Post-industrial recovery requires balancing multiple stakeholder priorities</li>
                <li>Quick economic gains sometimes come at the cost of equity and/or political support</li>
                <li>Environmental and social justice are interconnected—you can't have one without the other</li>
                <li>Participatory approaches build legitimacy but can threaten established power structures</li>
                <li>
                  Progressive policies often face opposition from powerful, established interests who otherwise benefit from the status quo (NIMBY, businesses, utilities)
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Conclusion Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-primary">Conclusion: The Work Continues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground/80 leading-relaxed">
              Whether your time as Mayor ended in success or failure, one truth remains: healing post-industrial cities
              is a long-term endeavor requiring persistence, creativity, coalition-building, and political will.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Playing "Mayor of Reddale" reveals the core dilemma of governance: every choice boosts one metric—jobs, equity, etc.—but may strain another. Add trees? Sustainability and climate measures jump, but developers grumble about "wasted" land. Extend the bus line? Equity rises, yet budgets for road repairs and bike lanes shrink.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Reddale isn't real, but its lessons are. Real cities like Buffalo, New York (mapping brownfields for safe reuse [<a href="https://www.buffalourbandevelopment.com/brownfield-opportunity-areas"><u>1</u></a>, <a href="https://www.thepartnership.org/brownfield-cleanup-program/"><u>2</u></a>]) and Manchester, England (heat-mapping to prioritize shade across the city [<a href="https://www.greatermanchester-ca.gov.uk/media/gu1jp0qi/27666_gmca-environment-heat-networks_v6.pdf"><u>1</u></a>, <a href="https://www.metoffice.gov.uk/binaries/content/assets/metofficegovuk/pdf/research/spf/ukcr_heat_pack_manchester.pdf"><u>2</u></a>])
              are dealing with these same tensions right
              now. Some succeed, some fail, and most fall somewhere in
              between.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Civic tech won't magically "fix" decades of disinvestment but, when implemented with care and transparency, these kinds of tools have the potential to equip and empower everyday residents to lead their cities toward more just futures.
            </p>
            <p className="text-foreground/80 leading-relaxed">
              This requires a consistent consideration of data justice: auditing for bias (who's in the dataset? Often not renters or migrants), diverse tool-builders/-designers (planners partnering with affected residents, not just Silicon Valley consultants), and safeguards against repeating the displacements of past "revitalizations."
            </p>
            <p className="text-foreground/80 leading-relaxed">
              Thus, as you reflect on your Reddale experience, ask yourself: Whose voices did I prioritize? Who benefited,
              and who was left behind? What would I do differently now? These are the questions that real mayors, city councils,
              and community organizers must ask themselves every day. And the answers matter not just for policy but for people's
              lives.
            </p>
            <p className="text-foreground/80 leading-relaxed font-semibold">
              Thank you for exploring this simulation. May it inspire you to think critically about the role of
              technology, equity, and democracy in shaping our cities' futures. :)
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            size="lg"
            onClick={onRestart}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Play Again
          </Button>
          <Button size="lg" onClick={onHome} variant="outline" className="flex-1 bg-transparent">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
