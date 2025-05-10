"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionAnchor } from "@/components/section-anchor"
import { TokenDistributionChart } from "@/components/tokenomics/token-distribution-chart"
import { TokenUtilityDiagram } from "@/components/tokenomics/token-utility-diagram"
import { TokenEconomicsFlowchart } from "@/components/tokenomics/token-economics-flowchart"
import { TokenGovernanceDetails } from "@/components/tokenomics/token-governance-details"
import { TokenVestingSchedule } from "@/components/tokenomics/token-vesting-schedule"
import { TokenStakingCalculator } from "@/components/tokenomics/token-staking-calculator"
import { TokenBurnMechanism } from "@/components/tokenomics/token-burn-mechanism"
import { TokenComparisonTable } from "@/components/tokenomics/token-comparison-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield, Coins, BarChart3, Users, Clock, Percent, Flame, LineChart } from "lucide-react"

export function TokenomicsOverview() {
  const [activeTab, setActiveTab] = useState("distribution")

  return (
    <div className="space-y-12">
      <section id="tokenomics-overview" className="scroll-mt-20">
        <SectionAnchor id="tokenomics-overview" />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Tokenomics Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="mr-2 h-5 w-5 text-primary" />
                  VVAI Token Fundamentals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                    <span>
                      <strong>Token Type:</strong> ERC-20 / Multi-chain
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                    <span>
                      <strong>Total Supply:</strong> 1,000,000,000 VVAI
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                    <span>
                      <strong>Initial Circulating Supply:</strong> 150,000,000 VVAI (15%)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                    <span>
                      <strong>Emission Schedule:</strong> Deflationary with burn mechanism
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Token Utility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                    <span>
                      <strong>Governance:</strong> Protocol parameter voting rights
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                    <span>
                      <strong>Staking:</strong> Earn protocol fees and rewards
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                    <span>
                      <strong>Fee Discount:</strong> Reduced trading and platform fees
                    </span>
                  </li>
                  <li className="flex items-start">
                    <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                    <span>
                      <strong>Insurance:</strong> Backstop for protocol risk management
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Dual-Token System: VVAI & VV-X</CardTitle>
              <CardDescription>
                The VeritasVault.ai ecosystem operates with a dual-token model that separates core protocol governance
                from higher-risk DeFi primitives.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3 p-4 border rounded-lg">
                  <h4 className="text-lg font-semibold text-primary">VVAI Token</h4>
                  <p className="text-sm text-muted-foreground">
                    Core governance and staking token that underpins cross-chain risk and liquidity intelligence.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                      <span>Protocol governance and parameter control</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                      <span>Fee distribution from core protocol services</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                      <span>Staking rewards from network security</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3 p-4 border rounded-lg">
                  <h4 className="text-lg font-semibold text-primary">VV-X Token</h4>
                  <p className="text-sm text-muted-foreground">
                    Utility & fee-capture token for higher-risk, higher-yield DeFi primitives in gaming assets.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                      <span>NFT fractionalization and lending governance</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                      <span>Fee asset (50% of lending interest & FNFT swap fees)</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                      <span>Insurance staking for bad debt coverage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Tabs defaultValue="distribution" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start md:justify-center p-0 bg-muted/50 rounded-md">
          <TabsTrigger
            value="distribution"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Coins className="mr-2 h-4 w-4" />
            Distribution
          </TabsTrigger>
          <TabsTrigger
            value="utility"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Shield className="mr-2 h-4 w-4" />
            Utility
          </TabsTrigger>
          <TabsTrigger
            value="utility-diagram"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Utility Diagram
          </TabsTrigger>
          <TabsTrigger
            value="economics"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <LineChart className="mr-2 h-4 w-4" />
            Economics
          </TabsTrigger>
          <TabsTrigger
            value="economics-flow"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Economics Flow
          </TabsTrigger>
          <TabsTrigger
            value="governance"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Users className="mr-2 h-4 w-4" />
            Governance
          </TabsTrigger>
          <TabsTrigger
            value="vesting"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Clock className="mr-2 h-4 w-4" />
            Vesting
          </TabsTrigger>
          <TabsTrigger
            value="staking"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Percent className="mr-2 h-4 w-4" />
            Staking
          </TabsTrigger>
          <TabsTrigger
            value="burn"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Flame className="mr-2 h-4 w-4" />
            Burn Mechanism
          </TabsTrigger>
          <TabsTrigger
            value="comparison"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Comparison
          </TabsTrigger>
        </TabsList>

        <TabsContent value="distribution" className="mt-6">
          <SectionAnchor id="token-distribution" />
          <TokenDistributionChart />
        </TabsContent>

        <TabsContent value="utility" className="mt-6">
          <SectionAnchor id="token-utility" />
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Token Utility</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>VVAI Token Utility</CardTitle>
                  <CardDescription>Core protocol governance and staking token</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Governance Rights</h4>
                        <p className="text-sm text-muted-foreground">
                          Vote on protocol upgrades, parameter changes, and treasury allocations
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Percent className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fee Sharing</h4>
                        <p className="text-sm text-muted-foreground">
                          Stakers earn a share of protocol fees proportional to their stake
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Risk Management</h4>
                        <p className="text-sm text-muted-foreground">
                          Participate in risk assessment and oracle validation
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Coins className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fee Discounts</h4>
                        <p className="text-sm text-muted-foreground">Reduced platform fees based on VVAI holdings</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>VV-X Token Utility</CardTitle>
                  <CardDescription>Gaming asset financialization token</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Specialized Governance</h4>
                        <p className="text-sm text-muted-foreground">
                          Control parameters for NFT fractionalization and lending
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Flame className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fee Asset</h4>
                        <p className="text-sm text-muted-foreground">
                          50% of lending interest & FNFT swap fees paid in VV-X (buy-and-burn)
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Shield className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Insurance Staking</h4>
                        <p className="text-sm text-muted-foreground">
                          VV-X staked in Safety Module backs bad debt with slashing risk
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Percent className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">Yield Boosting</h4>
                        <p className="text-sm text-muted-foreground">
                          Enhanced yields for liquidity providers in gaming asset pools
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="utility-diagram" className="mt-6">
          <SectionAnchor id="token-utility-diagram" />
          <TokenUtilityDiagram />
        </TabsContent>

        <TabsContent value="economics" className="mt-6">
          <SectionAnchor id="token-economics" />
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">Token Economics</h3>
            <p className="text-muted-foreground">
              The VVAI token economics are designed to create a sustainable ecosystem with balanced incentives for all
              participants.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Economic Model</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg">Value Accrual Mechanisms</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                          <span>
                            <strong>Protocol Fees:</strong> 0.05-0.25% of transaction volume
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                          <span>
                            <strong>Staking Rewards:</strong> 30% of protocol fees
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                          <span>
                            <strong>Buyback & Burn:</strong> 20% of protocol fees
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                          <span>
                            <strong>Treasury:</strong> 50% of protocol fees
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold text-lg">Deflationary Mechanisms</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                          <span>
                            <strong>Quarterly Burns:</strong> Based on protocol revenue
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                          <span>
                            <strong>Fee Burning:</strong> Portion of transaction fees
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                          <span>
                            <strong>Governance Burning:</strong> Proposal fees
                          </span>
                        </li>
                        <li className="flex items-start">
                          <ArrowRight className="mr-2 h-4 w-4 text-primary mt-1" />
                          <span>
                            <strong>Fixed Supply:</strong> No inflation after initial distribution
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold text-lg mb-3">Dual-Token Economic Synergy</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The VVAI and VV-X tokens create a complementary economic system that balances risk and reward
                      across the ecosystem:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-md">
                        <h5 className="font-medium text-primary">VVAI Economic Focus</h5>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex items-start">
                            <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                            <span>Core protocol stability and governance</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                            <span>Lower risk, steady fee generation</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                            <span>Cross-chain risk analytics revenue</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-3 border rounded-md">
                        <h5 className="font-medium text-primary">VV-X Economic Focus</h5>
                        <ul className="mt-2 space-y-1 text-sm">
                          <li className="flex items-start">
                            <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                            <span>Gaming asset financialization</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                            <span>Higher risk, higher yield opportunities</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRight className="mr-2 h-3 w-3 text-primary mt-1" />
                            <span>NFT lending and fractionalization fees</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="economics-flow" className="mt-6">
          <SectionAnchor id="token-economics-flow" />
          <TokenEconomicsFlowchart />
        </TabsContent>

        <TabsContent value="governance" className="mt-6">
          <SectionAnchor id="token-governance" />
          <TokenGovernanceDetails />
        </TabsContent>

        <TabsContent value="vesting" className="mt-6">
          <SectionAnchor id="token-vesting" />
          <TokenVestingSchedule />
        </TabsContent>

        <TabsContent value="staking" className="mt-6">
          <SectionAnchor id="token-staking" />
          <TokenStakingCalculator />
        </TabsContent>

        <TabsContent value="burn" className="mt-6">
          <SectionAnchor id="token-burn" />
          <TokenBurnMechanism />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <SectionAnchor id="token-comparison" />
          <TokenComparisonTable />
        </TabsContent>
      </Tabs>
    </div>
  )
}
