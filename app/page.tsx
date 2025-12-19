"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import GameView from "@/components/game-view"

export default function Home() {
  const [showGame, setShowGame] = useState(false)

  if (showGame) {
    return <GameView onBack={() => setShowGame(false)} />
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="relative bg-gradient-to-b from-primary/5 via-transparent to-background px-4 py-16 md:pt-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Can Code Help Heal Post-Industrial Cities?
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-8 text-balance">
            Explore how civic technology and digital solutions can address the complex challenges facing communities
            rebuilding from industrial decline.
          </p>
          <Button
            size="lg"
            onClick={() => setShowGame(true)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Play the Mayor Simulation
          </Button>
        </div>
      </section>

      <section className="bg-background px-4 pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl space-y-12">
          {/* Section 1: The Challenge */}
          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader>
              <CardTitle className="text-secondary">The Challenge: Post-Industrial Decline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 -mt-2">
              <p className="text-foreground/80 leading-relaxed">
                For decades, many American cities thrived on manufacturing. Steel mills, auto plants, and textile
                factories provided stable employment and funded public services. But as these industries relocated or
                automated, entire communities faced sudden economic collapse.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Today, post-industrial cities struggle with abandoned buildings, unemployment, population loss, and
                underfunded schools and infrastructure. This leaves social networks to erode as residents leave and tax bases
                shrink.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Now, picture <i>Reddale</i>: one of such struggling cities. Once a bustling manufacturing hub, today a city of shuttered factories and half-empty
                neighborhoods. The steel mill that employed thousands closed decades ago. Population has dropped by
                half. Young people leave for opportunity elsewhere. Tax revenues can't keep pace with crumbling
                infrastructure.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Yet amid these challenges, innovation is emerging... Community organizers are mapping vacant lots for urban gardens. Former
                factory workers are learning to code. City officials are experimenting with participatory budgeting.
                Enter <b>civic tech</b>: everyday software tools—dashboards, platforms, apps, etc.—that help governments and
                communities collaboratively make decisions, track progress, and, hopefully, rebuild trust.
              </p>
            </CardContent>
          </Card>

          {/* Section 2: What is Civic Tech? */}
          <Card className="border-primary/20 bg-muted/30">
            <CardHeader>
              <CardTitle className="text-primary">What is Civic Tech?</CardTitle>
              <CardDescription className="italic">
                Digital tools that help governments and communities solve problems together
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/80 leading-relaxed">
                Civic tech uses data and digital platforms to make cities work better for everyone. Examples include:
              </p>
              <ul className="list-disc pl-4.5 space-y-2 text-foreground/80">
                <li>
                  <strong>Participatory budgeting platforms</strong> where residents vote on how to spend public funds (e.g., <a href="https://www.decidim.barcelona/"><u>Barcelona Decidim</u></a> and the <a href="https://pbstanford.org/"><u>Stanford Participatory Budgeting Platform</u></a>)
                </li>
                <li>
                  <strong>Digital engagement tools</strong> that make it easier for residents to voice concerns and co-create solutions, e.g., virtual town halls for resident feedback 
                </li>
                <li>
                  <strong>Sensors and data dashboards</strong> that track health, employment, environmental metrics, etc. in real time
                </li>
                <li>
                  <strong>Digital/community platforms</strong> that connect neighbors and local organizations; that match workers to training + high-demand roles; or that connect local entrepreneurs with funding and mentorship, helping small businesses grow
                </li>
                <li>
                  <strong>Maps</strong>, e.g., revealing "transit deserts" where kids walk miles to school or highlighting which city blocks lack shade trees (and are thus susceptible to overheating)
                </li>
                <li>
                  <strong>Digital equity programs</strong> ensuring internet access reaches underserved neighborhoods
                </li>
                <li>
                  <strong>Educational and outreach tools</strong> like interactive tutorials, multilingual apps, digital workshops, or even <b><i>video/web games</i></b> that teach residents how to use civic platforms or that inform residents on current events, ongoing initiatives, and/or planned developments.
                </li>
              </ul>
              <p className="text-foreground/80 leading-relaxed">
                These tools work best when the same communities they are meant to be implemented in help to design them—ensuring equity and amplifying marginalized voices.
              </p>
            </CardContent>
          </Card>

          {/* Section 3: The Equity Question */}
          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader>
              <CardTitle className="text-secondary">The Equity Challenge</CardTitle>
              <CardDescription className="italic">Why digital solutions alone aren't enough</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/80 leading-relaxed">
                Technology isn't neutral. Without careful design, digital tools can exclude people who lack internet
                access, digital literacy, or trust in institutions. Post-industrial cities often have both the greatest
                needs and the fewest resources for digital transformation.
              </p>
              <p className="text-foreground/80 leading-relaxed">Effective civic tech requires:</p>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                <li>Investing in broadband and digital skills training</li>
                <li>Centering voices of people most affected by decline</li>
                <li>Building trust through transparency and accountability</li>
                <li>Pairing technology with human support and community organizing</li>
              </ul>
            </CardContent>
          </Card>

          {/* Section 4: Call to Action */}
          <div className="text-center space-y-6 pt-8">
            <h3 className="text-2xl font-semibold text-foreground">Ready to explore solutions?</h3>
            <p className="text-foreground/70">
              In the following simulation, you'll step into the role of Mayor of Reddale—a post-industrial city facing some
              tough choices. Each decision has trade-offs. With limited budget and competing needs from residents, workers, and businesses, can you balance economic growth, equity, political support, and sustainability?
            </p>
            <Button
              size="lg"
              onClick={() => setShowGame(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Start the Simulation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border px-4 py-8 text-center text-foreground/60 text-sm">
        <p>A civic technology exploration by Ari Peró.</p>
        <p><b>Disclaimer:</b> Certain technical implementations (debugging, formatting, styling) were supported by v0 (Vercel 2025). All project concepts, analysis, and content are original student work.</p>
      </footer>
    </main>
  )
}
