"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Printer, Download } from "lucide-react"
import { TokenDistributionChart } from "@/components/tokenomics/token-distribution-chart"
import { TokenVestingSchedule } from "@/components/tokenomics/token-vesting-schedule"
import { TokenUtilityDiagram } from "@/components/tokenomics/token-utility-diagram"
import { TokenEconomicsFlowchart } from "@/components/tokenomics/token-economics-flowchart"

export default function TokenomicsDownloadPage() {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 300)
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 text-center">VeritasVault.ai Tokenomics</h1>
        <p className="text-lg text-muted-foreground text-center max-w-3xl mb-6">
          A comprehensive overview of the VVAI token distribution, utility, and economic model.
        </p>
        <div className="flex gap-4">
          <Button onClick={handlePrint} disabled={isPrinting} className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            {isPrinting ? "Preparing PDF..." : "Download as PDF"}
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} className="flex items-center gap-2">
            Back to Whitepaper
          </Button>
        </div>
      </div>

      <div className="space-y-12 max-w-5xl mx-auto print:space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Token Overview</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">VVAI Token</h3>
                  <p className="mb-4">
                    The VVAI token is the native utility and governance token of the VeritasVault.ai ecosystem. It is
                    designed to align incentives among all participants and enable decentralized governance of the
                    protocol.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">Token Name:</span>
                      <span>VeritasVault.ai Token</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Token Symbol:</span>
                      <span>VVAI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Total Supply:</span>
                      <span>1,000,000,000 VVAI</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Token Standard:</span>
                      <span>ERC-20</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Initial Price:</span>
                      <span>$0.10 USD</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Initial Market Cap</span>
                        <span className="font-medium">$10,000,000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Fully Diluted Valuation</span>
                        <span className="font-medium">$100,000,000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Initial Circulating Supply</span>
                        <span className="font-medium">100,000,000 VVAI (10%)</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Token Distribution</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Allocation Breakdown</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary mr-2"></div>
                      <span className="flex-1">Public Sale: 20% (200,000,000 VVAI)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary/80 mr-2"></div>
                      <span className="flex-1">Team & Advisors: 15% (150,000,000 VVAI)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary/60 mr-2"></div>
                      <span className="flex-1">Ecosystem Development: 20% (200,000,000 VVAI)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary/40 mr-2"></div>
                      <span className="flex-1">Treasury: 15% (150,000,000 VVAI)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary/30 mr-2"></div>
                      <span className="flex-1">Liquidity Provision: 10% (100,000,000 VVAI)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary/20 mr-2"></div>
                      <span className="flex-1">Strategic Partners: 10% (100,000,000 VVAI)</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-primary/10 mr-2"></div>
                      <span className="flex-1">Community Rewards: 10% (100,000,000 VVAI)</span>
                    </li>
                  </ul>
                </div>
                <div className="h-80">
                  <TokenDistributionChart />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Vesting Schedule</h2>
          <Card>
            <CardContent className="p-6">
              <TokenVestingSchedule />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Token Utility</h2>
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <p className="mb-4">
                  The VVAI token is designed with multiple utilities to create a sustainable ecosystem with aligned
                  incentives for all participants. Key utilities include:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-primary text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Governance</h4>
                      <p className="text-sm text-muted-foreground">
                        Vote on protocol upgrades, parameter adjustments, and treasury allocations
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-primary text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Staking Rewards</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn passive income by staking VVAI tokens in the protocol
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-primary text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Fee Discounts</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive discounts on platform fees based on VVAI holdings
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-primary text-sm font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Premium Features</h4>
                      <p className="text-sm text-muted-foreground">
                        Access advanced analytics and specialized investment strategies
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-primary text-sm font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Liquidity Mining</h4>
                      <p className="text-sm text-muted-foreground">
                        Earn additional VVAI by providing liquidity to supported pools
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                      <span className="text-primary text-sm font-bold">6</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Protocol Access</h4>
                      <p className="text-sm text-muted-foreground">
                        Use VVAI to access certain protocol features and services
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <TokenUtilityDiagram />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Token Economics</h2>
          <Card>
            <CardContent className="p-6">
              <TokenEconomicsFlowchart />
            </CardContent>
          </Card>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Governance Framework</h2>
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Governance Process</h3>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-sm font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Proposal Submission</h4>
                        <p className="text-sm text-muted-foreground">
                          Any token holder with at least 1% of the circulating supply can submit a proposal
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-sm font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Discussion Period</h4>
                        <p className="text-sm text-muted-foreground">
                          7-day discussion period for community feedback and proposal refinement
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-sm font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Voting Period</h4>
                        <p className="text-sm text-muted-foreground">
                          5-day voting period where token holders can cast their votes
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-primary text-sm font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="font-medium">Implementation</h4>
                        <p className="text-sm text-muted-foreground">
                          If approved, changes are implemented after a 48-hour timelock period
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Voting Power</h3>
                  <p className="mb-4">
                    Voting power is determined by the amount of VVAI tokens held or staked. The governance system
                    includes the following features:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-primary/80 mr-2 mt-1"></div>
                      <span>1 VVAI = 1 vote (basic voting)</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-primary/80 mr-2 mt-1"></div>
                      <span>Staked tokens receive a 1.5x voting multiplier</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-primary/80 mr-2 mt-1"></div>
                      <span>Long-term stakers ({">"}6 months) receive a 2x voting multiplier</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-primary/80 mr-2 mt-1"></div>
                      <span>Delegation of voting power is supported</span>
                    </li>
                  </ul>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-medium mb-2">Quorum Requirements</h4>
                    <p className="text-sm mb-2">For a proposal to pass, it must meet the following requirements:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Minimum 10% of circulating supply must participate</li>
                      <li>• Simple majority ({">"}50%) for standard proposals</li>
                      <li>• Supermajority ({">"}66%) for critical protocol changes</li>
                      <li>
                        • Supermajority ({">"}75%) for treasury expenditures {">"}$1M
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="print:hidden mt-8 flex justify-center">
          <Button onClick={handlePrint} disabled={isPrinting} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {isPrinting ? "Preparing PDF..." : "Download as PDF"}
          </Button>
        </div>

        <div className="print:block hidden">
          <div className="text-center text-sm text-muted-foreground mt-8 pt-8 border-t">
            <p>© 2023 VeritasVault.ai. All rights reserved.</p>
            <p>This document was generated on {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 1.5cm;
          }
          
          body {
            font-size: 12pt;
            color: black;
            background-color: white;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:block {
            display: block !important;
          }
          
          h1 {
            font-size: 24pt;
          }
          
          h2 {
            font-size: 18pt;
            margin-top: 1cm;
          }
          
          h3 {
            font-size: 14pt;
          }
          
          .card {
            border: 1px solid #ddd;
            box-shadow: none !important;
            break-inside: avoid;
          }
          
          section {
            break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
