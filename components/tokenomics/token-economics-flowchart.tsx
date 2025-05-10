"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  ArrowDown,
  ArrowUp,
  Repeat,
  Users,
  Wallet,
  BarChart3,
  Flame,
  Lock,
  Coins,
  Building,
  ShieldCheck,
  Info,
} from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TokenEconomicsFlowchart() {
  const [activeFlow, setActiveFlow] = useState<string | null>(null)

  const handleNodeHover = (flowId: string) => {
    setActiveFlow(flowId)
  }

  const handleNodeLeave = () => {
    setActiveFlow(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Token Economics Flowchart</h3>
        <p className="mb-4">
          The VVAI token economics are designed to create a sustainable ecosystem with balanced incentives for all
          participants. This flowchart illustrates how value flows through the ecosystem and the economic mechanisms
          that drive token utility and value.
        </p>
      </div>

      <Tabs defaultValue="flowchart" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-4">
          <TabsTrigger value="flowchart">Visual Flowchart</TabsTrigger>
          <TabsTrigger value="mechanisms">Economic Mechanisms</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="flowchart" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-muted/20 rounded-lg p-4">
                <TooltipProvider>
                  {/* Central Token Node */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg cursor-pointer"
                          onMouseEnter={() => handleNodeHover("token")}
                          onMouseLeave={handleNodeLeave}
                        >
                          <div className="text-center">
                            <Coins className="h-8 w-8 mx-auto mb-1" />
                            <div className="text-xs font-semibold">VVAI Token</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Central token that powers the entire ecosystem</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Users Node */}
                  <div className="absolute top-[15%] left-[20%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-md cursor-pointer ${activeFlow === "users" || activeFlow === "staking" ? "ring-2 ring-primary" : ""}`}
                          onMouseEnter={() => handleNodeHover("users")}
                          onMouseLeave={handleNodeLeave}
                        >
                          <div className="text-center">
                            <Users className="h-6 w-6 mx-auto mb-1" />
                            <div className="text-xs font-semibold">Users</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Platform users who hold and utilize VVAI tokens</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Staking Node */}
                  <div className="absolute top-[15%] right-[20%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-20 h-20 rounded-full bg-green-500 flex items-center justify-center text-white shadow-md cursor-pointer ${activeFlow === "staking" ? "ring-2 ring-primary" : ""}`}
                          onMouseEnter={() => handleNodeHover("staking")}
                          onMouseLeave={handleNodeLeave}
                        >
                          <div className="text-center">
                            <Lock className="h-6 w-6 mx-auto mb-1" />
                            <div className="text-xs font-semibold">Staking</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Token staking for rewards and governance power</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Treasury Node */}
                  <div className="absolute bottom-[15%] left-[20%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-md cursor-pointer ${activeFlow === "treasury" ? "ring-2 ring-primary" : ""}`}
                          onMouseEnter={() => handleNodeHover("treasury")}
                          onMouseLeave={handleNodeLeave}
                        >
                          <div className="text-center">
                            <Building className="h-6 w-6 mx-auto mb-1" />
                            <div className="text-xs font-semibold">Treasury</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Protocol treasury funded by fees and token allocations</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Burn Mechanism Node */}
                  <div className="absolute bottom-[15%] right-[20%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-20 h-20 rounded-full bg-red-500 flex items-center justify-center text-white shadow-md cursor-pointer ${activeFlow === "burn" ? "ring-2 ring-primary" : ""}`}
                          onMouseEnter={() => handleNodeHover("burn")}
                          onMouseLeave={handleNodeLeave}
                        >
                          <div className="text-center">
                            <Flame className="h-6 w-6 mx-auto mb-1" />
                            <div className="text-xs font-semibold">Token Burn</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Deflationary mechanism that reduces token supply</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Platform Fees Node */}
                  <div className="absolute top-[50%] left-[5%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white shadow-md cursor-pointer ${activeFlow === "fees" ? "ring-2 ring-primary" : ""}`}
                          onMouseEnter={() => handleNodeHover("fees")}
                          onMouseLeave={handleNodeLeave}
                        >
                          <div className="text-center">
                            <Wallet className="h-5 w-5 mx-auto mb-0.5" />
                            <div className="text-[10px] font-semibold">Fees</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Platform fees collected from transactions</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Governance Node */}
                  <div className="absolute top-[50%] right-[5%]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-md cursor-pointer ${activeFlow === "governance" ? "ring-2 ring-primary" : ""}`}
                          onMouseEnter={() => handleNodeHover("governance")}
                          onMouseLeave={handleNodeLeave}
                        >
                          <div className="text-center">
                            <ShieldCheck className="h-5 w-5 mx-auto mb-0.5" />
                            <div className="text-[10px] font-semibold">Governance</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Decentralized governance system for protocol decisions</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Market Node */}
                  <div className="absolute bottom-[30%] left-[50%] transform -translate-x-1/2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className={`w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-white shadow-md cursor-pointer ${activeFlow === "market" ? "ring-2 ring-primary" : ""}`}
                          onMouseEnter={() => handleNodeHover("market")}
                          onMouseLeave={handleNodeLeave}
                        >
                          <div className="text-center">
                            <BarChart3 className="h-5 w-5 mx-auto mb-0.5" />
                            <div className="text-[10px] font-semibold">Market</div>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-sm">Secondary market where tokens are traded</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  {/* Connection Lines */}
                  {/* These would be better with SVG paths, but for simplicity using positioned divs */}

                  {/* Users to Token */}
                  <div
                    className={`absolute h-[1px] w-[15%] bg-blue-400 top-[25%] left-[35%] transform rotate-45 ${activeFlow === "users" ? "h-[2px] bg-blue-600" : ""}`}
                  ></div>
                  <div
                    className={`absolute h-[1px] w-[15%] bg-blue-400 top-[35%] left-[30%] transform rotate-[30deg] ${activeFlow === "users" ? "h-[2px] bg-blue-600" : ""}`}
                  ></div>

                  {/* Token to Staking */}
                  <div
                    className={`absolute h-[1px] w-[15%] bg-green-400 top-[25%] right-[35%] transform -rotate-45 ${activeFlow === "staking" ? "h-[2px] bg-green-600" : ""}`}
                  ></div>
                  <div
                    className={`absolute h-[1px] w-[15%] bg-green-400 top-[35%] right-[30%] transform -rotate-[30deg] ${activeFlow === "staking" ? "h-[2px] bg-green-600" : ""}`}
                  ></div>

                  {/* Token to Treasury */}
                  <div
                    className={`absolute h-[1px] w-[15%] bg-amber-400 bottom-[25%] left-[35%] transform -rotate-45 ${activeFlow === "treasury" ? "h-[2px] bg-amber-600" : ""}`}
                  ></div>
                  <div
                    className={`absolute h-[1px] w-[15%] bg-amber-400 bottom-[35%] left-[30%] transform -rotate-[30deg] ${activeFlow === "treasury" ? "h-[2px] bg-amber-600" : ""}`}
                  ></div>

                  {/* Token to Burn */}
                  <div
                    className={`absolute h-[1px] w-[15%] bg-red-400 bottom-[25%] right-[35%] transform rotate-45 ${activeFlow === "burn" ? "h-[2px] bg-red-600" : ""}`}
                  ></div>
                  <div
                    className={`absolute h-[1px] w-[15%] bg-red-400 bottom-[35%] right-[30%] transform rotate-[30deg] ${activeFlow === "burn" ? "h-[2px] bg-red-600" : ""}`}
                  ></div>

                  {/* Fees to Treasury */}
                  <div
                    className={`absolute h-[1px] w-[10%] bg-purple-400 bottom-[40%] left-[10%] transform rotate-[60deg] ${activeFlow === "fees" ? "h-[2px] bg-purple-600" : ""}`}
                  ></div>

                  {/* Governance to Token */}
                  <div
                    className={`absolute h-[1px] w-[10%] bg-indigo-400 top-[50%] right-[15%] ${activeFlow === "governance" ? "h-[2px] bg-indigo-600" : ""}`}
                  ></div>

                  {/* Market to Token */}
                  <div
                    className={`absolute h-[1px] w-[10%] bg-cyan-400 bottom-[35%] left-[45%] transform rotate-90 ${activeFlow === "market" ? "h-[2px] bg-cyan-600" : ""}`}
                  ></div>

                  {/* Flow Arrows */}
                  {activeFlow === "users" && (
                    <div className="absolute top-[28%] left-[40%] transform rotate-45">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </div>
                  )}

                  {activeFlow === "staking" && (
                    <div className="absolute top-[28%] right-[40%] transform -rotate-45">
                      <Repeat className="h-4 w-4 text-green-600" />
                    </div>
                  )}

                  {activeFlow === "treasury" && (
                    <div className="absolute bottom-[28%] left-[40%] transform -rotate-45">
                      <ArrowUp className="h-4 w-4 text-amber-600" />
                    </div>
                  )}

                  {activeFlow === "burn" && (
                    <div className="absolute bottom-[28%] right-[40%] transform rotate-45">
                      <ArrowDown className="h-4 w-4 text-red-600" />
                    </div>
                  )}

                  {activeFlow === "fees" && (
                    <div className="absolute bottom-[35%] left-[15%] transform rotate-[60deg]">
                      <ArrowRight className="h-4 w-4 text-purple-600" />
                    </div>
                  )}

                  {activeFlow === "governance" && (
                    <div className="absolute top-[50%] right-[18%]">
                      <ArrowRight className="h-4 w-4 text-indigo-600" />
                    </div>
                  )}

                  {activeFlow === "market" && (
                    <div className="absolute bottom-[32%] left-[48%]">
                      <ArrowUp className="h-4 w-4 text-cyan-600" />
                    </div>
                  )}
                </TooltipProvider>

                {/* Legend */}
                <div className="absolute bottom-2 left-2 bg-background/80 p-2 rounded-md text-xs">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                      <span>Users</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                      <span>Staking</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
                      <span>Treasury</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                      <span>Burn</span>
                    </div>
                  </div>
                </div>

                {/* Hover Instructions */}
                <div className="absolute top-2 right-2 bg-background/80 p-2 rounded-md text-xs flex items-center">
                  <Info className="h-3 w-3 mr-1" />
                  <span>Hover over nodes to see token flows</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Value Inflows</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="font-medium">User Acquisition</span>: New users purchase tokens for platform
                      access and utility
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-purple-500 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="font-medium">Platform Fees</span>: 30% of all platform fees are directed to token
                      value accrual
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="font-medium">Staking Demand</span>: Users stake tokens for rewards and governance
                      rights
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-indigo-500 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="font-medium">Governance Participation</span>: Tokens locked for governance
                      increase scarcity
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Value Outflows</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-amber-500 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="font-medium">Treasury Allocations</span>: Tokens used for ecosystem development
                      and grants
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-green-500 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="font-medium">Staking Rewards</span>: New tokens distributed to stakers as
                      incentives
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-cyan-500 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="font-medium">Market Selling</span>: Users selling tokens for profit or to exit
                      positions
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0 mt-0.5"></div>
                    <div>
                      <span className="font-medium">Token Burns</span>: Permanent removal of tokens from circulation
                      (deflationary)
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="mechanisms" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Deflationary Mechanisms</h4>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Fee Burn Mechanism</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      30% of all platform fees are used to buy back and burn VVAI tokens from the open market.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Burn Amount = Platform Fees × 30%</code>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Governance Burn</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Failed governance proposals result in 10% of the proposal deposit being burned.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Burn Amount = Proposal Deposit × 10%</code>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Buyback and Burn</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Quarterly buybacks from treasury funds based on platform growth metrics.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Quarterly Burn = min(5% of Treasury, Platform Growth × Multiplier)</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Staking Mechanisms</h4>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Base Staking Rewards</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Stakers earn a base APY from the staking rewards pool, which decreases over time.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Base APY = Initial APY × (1 - Decay Rate × Time)</code>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Fee Sharing</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      40% of platform fees are distributed to stakers proportional to their stake.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Staker Reward = (User Stake ÷ Total Staked) × Platform Fees × 40%</code>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Lock-up Multiplier</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Longer staking periods receive higher rewards through a multiplier.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Effective APY = Base APY × (1 + Lock Period Multiplier)</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Utility Mechanisms</h4>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Fee Discounts</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Token holders receive fee discounts based on their holdings.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Fee Discount = min(Base Fee × (Token Holdings ÷ Tier Threshold), Max Discount)</code>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Feature Access</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Premium features require token staking, creating utility-driven demand.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Feature Tier = f(Staked Amount, Staking Duration)</code>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Liquidity Mining</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Liquidity providers earn additional tokens as rewards.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>LP Rewards = (User LP ÷ Total LP) × Reward Pool × Pool Weight</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Treasury Mechanisms</h4>
                <div className="space-y-4">
                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Revenue Allocation</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Platform revenue is allocated to different ecosystem functions.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>
                        Revenue Split:
                        <br />- 40% to Stakers
                        <br />- 30% to Token Burns
                        <br />- 20% to Treasury
                        <br />- 10% to Development
                      </code>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Ecosystem Grants</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Treasury funds allocated to ecosystem development and partnerships.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Quarterly Grant Budget = min(5% of Treasury, $500,000)</code>
                    </div>
                  </div>

                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium mb-1">Stability Reserve</h5>
                    <p className="text-xs text-muted-foreground mb-2">
                      Treasury maintains a reserve for market operations and stability.
                    </p>
                    <div className="bg-muted p-2 rounded-md text-xs">
                      <code>Stability Reserve = 20% of Treasury</code>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Supply Metrics</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Total Supply</span>
                    <span className="font-medium">100,000,000 VVAI</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Circulating Supply</span>
                    <span className="font-medium">25,000,000 VVAI</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Staked Supply</span>
                    <span className="font-medium">12,500,000 VVAI (50%)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Locked in Governance</span>
                    <span className="font-medium">5,000,000 VVAI (20%)</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Treasury Holdings</span>
                    <span className="font-medium">15,000,000 VVAI</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Burned to Date</span>
                    <span className="font-medium">2,500,000 VVAI</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Economic Metrics</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Current Price</span>
                    <span className="font-medium">$0.35</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Market Cap</span>
                    <span className="font-medium">$8,750,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Fully Diluted Valuation</span>
                    <span className="font-medium">$35,000,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Daily Trading Volume</span>
                    <span className="font-medium">$450,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Staking APY</span>
                    <span className="font-medium">12.5% - 25%</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Burn Rate (Monthly)</span>
                    <span className="font-medium">125,000 VVAI</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Platform Metrics</h4>
                <ul className="space-y-3">
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Active Users</span>
                    <span className="font-medium">15,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Monthly Revenue</span>
                    <span className="font-medium">$250,000</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Fee Discount Usage</span>
                    <span className="font-medium">65% of users</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Premium Feature Access</span>
                    <span className="font-medium">35% of users</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Governance Participation</span>
                    <span className="font-medium">23.7% of supply</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-sm">Protocol Integrations</span>
                    <span className="font-medium">12 active</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Projected Token Metrics (5-Year Forecast)</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Year 1
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Year 2
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Year 3
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Year 5
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-3 py-2 text-sm font-medium">Circulating Supply</td>
                      <td className="px-3 py-2 text-sm">25M (25%)</td>
                      <td className="px-3 py-2 text-sm">40M (40%)</td>
                      <td className="px-3 py-2 text-sm">60M (60%)</td>
                      <td className="px-3 py-2 text-sm">85M (85%)</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm font-medium">Staked Percentage</td>
                      <td className="px-3 py-2 text-sm">50%</td>
                      <td className="px-3 py-2 text-sm">55%</td>
                      <td className="px-3 py-2 text-sm">60%</td>
                      <td className="px-3 py-2 text-sm">65%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm font-medium">Cumulative Burn</td>
                      <td className="px-3 py-2 text-sm">2.5M</td>
                      <td className="px-3 py-2 text-sm">5M</td>
                      <td className="px-3 py-2 text-sm">8M</td>
                      <td className="px-3 py-2 text-sm">15M</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm font-medium">Staking APY</td>
                      <td className="px-3 py-2 text-sm">20%</td>
                      <td className="px-3 py-2 text-sm">15%</td>
                      <td className="px-3 py-2 text-sm">12%</td>
                      <td className="px-3 py-2 text-sm">8%</td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm font-medium">Monthly Active Users</td>
                      <td className="px-3 py-2 text-sm">15K</td>
                      <td className="px-3 py-2 text-sm">50K</td>
                      <td className="px-3 py-2 text-sm">150K</td>
                      <td className="px-3 py-2 text-sm">500K</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
