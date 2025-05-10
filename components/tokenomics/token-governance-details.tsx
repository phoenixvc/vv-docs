"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, Vote, FileText, CheckSquare, Clock, ShieldAlert, BarChart3, Settings } from "lucide-react"

export function TokenGovernanceDetails() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-3">Token Governance</h3>
        <p className="mb-4">
          The VVAI token serves as the governance token for the VeritasVault.ai ecosystem, enabling token holders to
          participate in the decision-making process. The governance system is designed to be transparent, fair, and
          resistant to centralization.
        </p>
      </div>

      <Tabs defaultValue="process" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="process">Governance Process</TabsTrigger>
          <TabsTrigger value="voting">Voting Mechanism</TabsTrigger>
          <TabsTrigger value="parameters">Governance Parameters</TabsTrigger>
          <TabsTrigger value="security">Security Measures</TabsTrigger>
        </TabsList>

        <TabsContent value="process" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-start space-x-3">
                  <FileText className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">1. Proposal Creation</h4>
                    <p className="text-sm text-muted-foreground">
                      Any token holder with at least 100,000 VVAI tokens (1% of total supply) can create a governance
                      proposal. Proposals must include a detailed description, implementation plan, and expected impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">2. Discussion Period</h4>
                    <p className="text-sm text-muted-foreground">
                      Each proposal undergoes a 7-day discussion period where community members can debate the merits
                      and potential issues. The proposer can make amendments based on feedback.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Vote className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">3. Voting Period</h4>
                    <p className="text-sm text-muted-foreground">
                      After the discussion period, a 5-day voting period begins. Token holders can vote "For,"
                      "Against," or "Abstain" with voting power proportional to their token holdings.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckSquare className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">4. Execution</h4>
                    <p className="text-sm text-muted-foreground">
                      If the proposal passes (&gt;50% approval with at least 10% quorum), it enters a 2-day timelock
                      before execution. Critical proposals require higher thresholds (66% approval, 20% quorum).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Proposal Categories</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Protocol Parameters</span>
                        <span className="text-sm text-muted-foreground">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Treasury Allocation</span>
                        <span className="text-sm text-muted-foreground">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Feature Development</span>
                        <span className="text-sm text-muted-foreground">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Integrations</span>
                        <span className="text-sm text-muted-foreground">15%</span>
                      </div>
                      <Progress value={15} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Governance Changes</span>
                        <span className="text-sm text-muted-foreground">5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Governance Timeline</h4>
                  <div className="relative pt-1">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                        <Clock className="h-4 w-4" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium">Phase 1: Bootstrap Governance</h5>
                        <p className="text-xs text-muted-foreground">Q2 2023 - Q4 2023</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/80 flex items-center justify-center text-primary-foreground">
                        <Vote className="h-4 w-4" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium">Phase 2: Community Voting</h5>
                        <p className="text-xs text-muted-foreground">Q1 2024 - Q2 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/60 flex items-center justify-center text-primary-foreground">
                        <Settings className="h-4 w-4" />
                      </div>
                      <div className="ml-3">
                        <h5 className="text-sm font-medium">Phase 3: Full DAO Governance</h5>
                        <p className="text-xs text-muted-foreground">Q3 2024 onwards</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="voting" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h4 className="font-semibold">Voting Power Calculation</h4>
                <p className="text-sm">
                  Voting power in the VeritasVault.ai governance system is determined by a combination of token holdings
                  and staking duration:
                </p>
                <div className="p-3 bg-muted rounded-md">
                  <code className="text-sm">Voting Power = Token Balance × (1 + Staking Multiplier)</code>
                </div>
                <p className="text-sm">The staking multiplier increases based on the lock-up period:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>No lock-up: 0x multiplier (base voting power)</li>
                  <li>3-month lock: 0.5x multiplier (1.5x voting power)</li>
                  <li>6-month lock: 1x multiplier (2x voting power)</li>
                  <li>12-month lock: 1.5x multiplier (2.5x voting power)</li>
                  <li>24-month lock: 2x multiplier (3x voting power)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-4">
                <h4 className="font-semibold">Voting Methods</h4>
                <div className="space-y-3">
                  <div className="p-3 border rounded-md">
                    <h5 className="font-medium text-sm mb-1">Single Choice Voting</h5>
                    <p className="text-xs text-muted-foreground">
                      Standard voting method for binary decisions (yes/no) or selecting a single option from multiple
                      choices.
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h5 className="font-medium text-sm mb-1">Quadratic Voting</h5>
                    <p className="text-xs text-muted-foreground">
                      Used for decisions with multiple options. Cost of votes increases quadratically, reducing the
                      influence of large token holders.
                    </p>
                  </div>
                  <div className="p-3 border rounded-md">
                    <h5 className="font-medium text-sm mb-1">Conviction Voting</h5>
                    <p className="text-xs text-muted-foreground">
                      For continuous funding proposals. Voting power builds up over time, rewarding long-term
                      commitment.
                    </p>
                  </div>
                </div>

                <h4 className="font-semibold mt-2">Delegation</h4>
                <p className="text-sm">
                  Token holders can delegate their voting power to trusted community members who actively participate in
                  governance. Delegation can be revoked at any time.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Voting Analytics</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-muted/50 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Average Participation</p>
                  <p className="text-2xl font-bold">23.7%</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Proposals Passed</p>
                  <p className="text-2xl font-bold">37/42</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Active Voters</p>
                  <p className="text-2xl font-bold">1,243</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Delegated Voting</p>
                  <p className="text-2xl font-bold">31.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="parameters" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Proposal Thresholds</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between text-sm">
                    <span>Proposal Creation</span>
                    <span className="font-medium">100,000 VVAI</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Standard Quorum</span>
                    <span className="font-medium">10% of Supply</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Critical Quorum</span>
                    <span className="font-medium">20% of Supply</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Standard Approval</span>
                    <span className="font-medium">50% + 1</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Critical Approval</span>
                    <span className="font-medium">66%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Time Parameters</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between text-sm">
                    <span>Discussion Period</span>
                    <span className="font-medium">7 days</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Voting Period</span>
                    <span className="font-medium">5 days</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Timelock Delay</span>
                    <span className="font-medium">2 days</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Emergency Timelock</span>
                    <span className="font-medium">24 hours</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Minimum Delegation</span>
                    <span className="font-medium">3 days</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Treasury Parameters</h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex justify-between text-sm">
                    <span>Max Single Allocation</span>
                    <span className="font-medium">5% of Treasury</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Quarterly Budget Cap</span>
                    <span className="font-medium">15% of Treasury</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Emergency Fund</span>
                    <span className="font-medium">20% of Treasury</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Grant Approval Threshold</span>
                    <span className="font-medium">55%</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span>Protocol Fee Adjustment</span>
                    <span className="font-medium">66%</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Adjustable Parameters</h4>
              <p className="text-sm mb-4">
                The following parameters can be adjusted through governance proposals. Any changes to these parameters
                require a standard approval threshold (50% + 1) with a 10% quorum.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-3 border rounded-md">
                  <h5 className="text-sm font-medium">Fee Structure</h5>
                  <p className="text-xs text-muted-foreground">Platform fees, revenue distribution, burn rate</p>
                </div>
                <div className="p-3 border rounded-md">
                  <h5 className="text-sm font-medium">Staking Rewards</h5>
                  <p className="text-xs text-muted-foreground">APY rates, lock-up bonuses, reward distribution</p>
                </div>
                <div className="p-3 border rounded-md">
                  <h5 className="text-sm font-medium">Voting Parameters</h5>
                  <p className="text-xs text-muted-foreground">Quorum requirements, approval thresholds</p>
                </div>
                <div className="p-3 border rounded-md">
                  <h5 className="text-sm font-medium">Treasury Allocation</h5>
                  <p className="text-xs text-muted-foreground">Budget caps, grant sizes, emergency fund</p>
                </div>
                <div className="p-3 border rounded-md">
                  <h5 className="text-sm font-medium">Protocol Integrations</h5>
                  <p className="text-xs text-muted-foreground">Adding/removing supported protocols</p>
                </div>
                <div className="p-3 border rounded-md">
                  <h5 className="text-sm font-medium">Risk Parameters</h5>
                  <p className="text-xs text-muted-foreground">Collateralization ratios, liquidation thresholds</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <ShieldAlert className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Governance Security Measures</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">1</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Timelock Mechanism</h5>
                      <p className="text-xs text-muted-foreground">
                        All passed proposals are subject to a timelock delay before execution, allowing token holders to
                        exit if they disagree with a passed proposal.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">2</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Emergency Cancellation</h5>
                      <p className="text-xs text-muted-foreground">
                        A security council can cancel malicious proposals during the timelock period. This power is
                        limited to clear security threats.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">3</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Gradual Parameter Changes</h5>
                      <p className="text-xs text-muted-foreground">
                        Critical parameter changes are implemented gradually over time rather than immediately,
                        preventing sudden destabilizing changes.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium">4</span>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium">Value Limits</h5>
                      <p className="text-xs text-muted-foreground">
                        Treasury transactions have value limits that increase with higher approval thresholds,
                        preventing large fund movements without strong consensus.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3">Security Council</h4>
                <p className="text-sm mb-4">
                  The Security Council is a 9-member multisig that can veto malicious proposals during the timelock
                  period. Members are elected by token holders for 6-month terms.
                </p>

                <h5 className="text-sm font-medium mb-2">Security Council Powers</h5>
                <ul className="list-disc pl-5 text-xs space-y-1 mb-4">
                  <li>Veto malicious proposals during timelock</li>
                  <li>Pause protocol functions for up to 72 hours in emergencies</li>
                  <li>Fast-track critical security patches</li>
                  <li>Freeze compromised contracts</li>
                </ul>

                <h5 className="text-sm font-medium mb-2">Checks and Balances</h5>
                <ul className="list-disc pl-5 text-xs space-y-1">
                  <li>Council actions require 6/9 signatures</li>
                  <li>All actions are publicly visible on-chain</li>
                  <li>Council members can be removed by token holder vote</li>
                  <li>Council decisions can be overridden by 75% token holder vote</li>
                  <li>Regular rotation of council members</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Governance Attack Vectors & Mitigations</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Attack Vector
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Mitigation
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-3 py-2 text-sm font-medium">Flash Loan Attack</td>
                      <td className="px-3 py-2 text-sm">Borrowing tokens to gain temporary voting power</td>
                      <td className="px-3 py-2 text-sm">
                        Voting power snapshot taken 1 block before proposal creation
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm font-medium">Bribery</td>
                      <td className="px-3 py-2 text-sm">Paying voters to vote in a specific way</td>
                      <td className="px-3 py-2 text-sm">
                        Quadratic voting, delayed execution, security council oversight
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm font-medium">Governance Capture</td>
                      <td className="px-3 py-2 text-sm">Accumulation of tokens to control decisions</td>
                      <td className="px-3 py-2 text-sm">
                        High quorum requirements, supermajority for critical changes
                      </td>
                    </tr>
                    <tr>
                      <td className="px-3 py-2 text-sm font-medium">Low Participation</td>
                      <td className="px-3 py-2 text-sm">
                        Insufficient voter turnout leading to unrepresentative decisions
                      </td>
                      <td className="px-3 py-2 text-sm">Delegation, voting incentives, minimum quorum requirements</td>
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
