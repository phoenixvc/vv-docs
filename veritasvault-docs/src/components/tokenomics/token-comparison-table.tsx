"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { InfoIcon as InfoCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TokenComparisonTable() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Token Comparison</h3>
        <div className="text-sm text-muted-foreground">Last updated: May 2025</div>
      </div>

      <p className="text-muted-foreground">
        This comparison analyzes how VVAI token compares to other similar utility tokens in the multi-chain architecture
        space.
      </p>

      <Card>
        <CardContent className="p-0 overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Token</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Utility</TableHead>
                <TableHead>Governance</TableHead>
                <TableHead>Burn Mechanism</TableHead>
                <TableHead>Staking APY</TableHead>
                <TableHead>Ecosystem</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-primary/5">
                <TableCell className="font-medium">
                  VVAI
                  <Badge variant="outline" className="ml-2">
                    Our Token
                  </Badge>
                </TableCell>
                <TableCell>$50M (projected)</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Badge variant="secondary">Fee Discounts</Badge>
                    <Badge variant="secondary">Premium Features</Badge>
                    <Badge variant="secondary">Staking</Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center">
                        On-chain DAO
                        <InfoCircle className="h-4 w-4 ml-1" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Fully decentralized governance with on-chain voting and proposal execution
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-600">30% of fees</Badge>
                </TableCell>
                <TableCell>8-24%</TableCell>
                <TableCell>Multi-chain</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">AAVE</TableCell>
                <TableCell>$1.2B</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Badge variant="outline">Governance</Badge>
                    <Badge variant="outline">Staking</Badge>
                  </div>
                </TableCell>
                <TableCell>On-chain DAO</TableCell>
                <TableCell>
                  <Badge variant="outline">Partial</Badge>
                </TableCell>
                <TableCell>3-7%</TableCell>
                <TableCell>Multi-chain</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">UNI</TableCell>
                <TableCell>$3.8B</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Badge variant="outline">Governance</Badge>
                  </div>
                </TableCell>
                <TableCell>On-chain DAO</TableCell>
                <TableCell>
                  <Badge variant="outline">None</Badge>
                </TableCell>
                <TableCell>0%</TableCell>
                <TableCell>Multi-chain</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">COMP</TableCell>
                <TableCell>$320M</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Badge variant="outline">Governance</Badge>
                    <Badge variant="outline">Rewards</Badge>
                  </div>
                </TableCell>
                <TableCell>On-chain DAO</TableCell>
                <TableCell>
                  <Badge variant="outline">None</Badge>
                </TableCell>
                <TableCell>3-5%</TableCell>
                <TableCell>Multi-chain</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">LINK</TableCell>
                <TableCell>$7.5B</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Badge variant="outline">Node Operation</Badge>
                    <Badge variant="outline">Service Payment</Badge>
                  </div>
                </TableCell>
                <TableCell>Centralized</TableCell>
                <TableCell>
                  <Badge variant="outline">None</Badge>
                </TableCell>
                <TableCell>5-8%</TableCell>
                <TableCell>Multi-chain</TableCell>
              </TableRow>

              <TableRow>
                <TableCell className="font-medium">MKR</TableCell>
                <TableCell>$950M</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Badge variant="outline">Governance</Badge>
                    <Badge variant="outline">Utility</Badge>
                  </div>
                </TableCell>
                <TableCell>On-chain DAO</TableCell>
                <TableCell>
                  <Badge variant="outline">Buyback & Burn</Badge>
                </TableCell>
                <TableCell>0%</TableCell>
                <TableCell>Ethereum</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground mt-2">
        <p>
          Note: Market cap values are approximate and subject to change. Utility features and APY ranges may vary based
          on market conditions and protocol updates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">VVAI Competitive Advantages</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Higher burn rate than comparable tokens</li>
              <li>Multi-tiered staking with higher APY potential</li>
              <li>Comprehensive utility across the entire ecosystem</li>
              <li>Balanced token distribution with focus on community</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Market Positioning</h4>
            <p>
              VVAI is positioned as a utility-first token with strong governance features, offering a balanced approach
              between utility, staking rewards, and deflationary mechanisms to ensure long-term value accrual.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
