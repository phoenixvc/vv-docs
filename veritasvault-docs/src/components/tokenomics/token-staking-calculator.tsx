"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calculator, RefreshCw, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function TokenStakingCalculator() {
  // Staking parameters
  const [tokenAmount, setTokenAmount] = useState<number>(10000)
  const [stakingPeriod, setStakingPeriod] = useState<number>(12) // months
  const [stakingTier, setStakingTier] = useState<string>("silver")
  const [compounding, setCompounding] = useState<boolean>(true)

  // APY rates by tier
  const tierRates = {
    bronze: 0.08, // 8%
    silver: 0.12, // 12%
    gold: 0.18, // 18%
    platinum: 0.25, // 25%
  }

  // Tier requirements
  const tierRequirements = {
    bronze: 5000, // 5,000 VVAI
    silver: 10000, // 10,000 VVAI
    gold: 50000, // 50,000 VVAI
    platinum: 100000, // 100,000 VVAI
  }

  // Fee discount rates by tier
  const feeDiscounts = {
    bronze: 0.1, // 10%
    silver: 0.25, // 25%
    gold: 0.5, // 50%
    platinum: 0.75, // 75%
  }

  // Calculate staking rewards
  const calculateRewards = () => {
    const rate = tierRates[stakingTier as keyof typeof tierRates]

    if (compounding) {
      // Monthly compounding
      const monthlyRate = rate / 12
      return tokenAmount * Math.pow(1 + monthlyRate, stakingPeriod) - tokenAmount
    } else {
      // Simple interest
      return tokenAmount * rate * (stakingPeriod / 12)
    }
  }

  // Calculate total value after staking period
  const totalValue = tokenAmount + calculateRewards()

  // Calculate APY
  const effectiveAPY = compounding
    ? Math.pow(1 + tierRates[stakingTier as keyof typeof tierRates] / 12, 12) - 1
    : tierRates[stakingTier as keyof typeof tierRates]

  // Calculate fee savings on a hypothetical $10,000 in trading fees
  const tradingFeeSavings = 10000 * feeDiscounts[stakingTier as keyof typeof feeDiscounts]

  // Reset calculator to defaults
  const resetCalculator = () => {
    setTokenAmount(10000)
    setStakingPeriod(12)
    setStakingTier("silver")
    setCompounding(true)
  }

  // Determine if user qualifies for selected tier
  const qualifiesForTier = tokenAmount >= tierRequirements[stakingTier as keyof typeof tierRequirements]

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold flex items-center">
        Token Staking Calculator
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2 h-6 w-6 p-0">
                <Info className="h-4 w-4" />
                <span className="sr-only">Info</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                Calculate potential rewards from staking VVAI tokens. Rates are estimates and may change based on
                protocol performance.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>

      <Tabs defaultValue="calculator" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="calculator">Calculator</TabsTrigger>
          <TabsTrigger value="tiers">Staking Tiers</TabsTrigger>
        </TabsList>

        <TabsContent value="calculator" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="token-amount">Amount to Stake (VVAI)</Label>
                  <span className="text-sm text-muted-foreground">{tokenAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    id="token-amount"
                    type="number"
                    min="1000"
                    max="1000000"
                    value={tokenAmount}
                    onChange={(e) => setTokenAmount(Number(e.target.value))}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="staking-period">Staking Period (Months)</Label>
                  <span className="text-sm text-muted-foreground">{stakingPeriod} months</span>
                </div>
                <Slider
                  id="staking-period"
                  min={1}
                  max={48}
                  step={1}
                  value={[stakingPeriod]}
                  onValueChange={(value) => setStakingPeriod(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="staking-tier">Staking Tier</Label>
                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(tierRates).map((tier) => (
                    <Button
                      key={tier}
                      type="button"
                      variant={stakingTier === tier ? "default" : "outline"}
                      className="capitalize"
                      onClick={() => setStakingTier(tier)}
                    >
                      {tier}
                    </Button>
                  ))}
                </div>
                {!qualifiesForTier && (
                  <p className="text-sm text-yellow-500 dark:text-yellow-400">
                    You need at least {tierRequirements[stakingTier as keyof typeof tierRequirements].toLocaleString()}{" "}
                    VVAI for this tier
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="compounding"
                  checked={compounding}
                  onChange={(e) => setCompounding(e.target.checked)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="compounding" className="text-sm font-normal">
                  Enable monthly compounding
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                        <Info className="h-3 w-3" />
                        <span className="sr-only">Compounding Info</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        When enabled, rewards are automatically restaked each month to earn compound interest.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Button variant="outline" size="sm" className="flex items-center" onClick={resetCalculator}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset Calculator
              </Button>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 space-y-4">
              <h4 className="font-semibold text-center flex items-center justify-center">
                <Calculator className="mr-2 h-5 w-5" />
                Staking Results
              </h4>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staking APY:</span>
                  <span className="font-medium">{(effectiveAPY * 100).toFixed(2)}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Initial Stake:</span>
                  <span className="font-medium">{tokenAmount.toLocaleString()} VVAI</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Staking Rewards:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    +{calculateRewards().toLocaleString(undefined, { maximumFractionDigits: 2 })} VVAI
                  </span>
                </div>

                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Total Value:</span>
                  <span className="font-bold">
                    {totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })} VVAI
                  </span>
                </div>

                <div className="pt-2">
                  <div className="text-sm font-medium mb-1">Additional Benefits:</div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trading Fee Discount:</span>
                    <span>{(feeDiscounts[stakingTier as keyof typeof feeDiscounts] * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Est. Annual Fee Savings:</span>
                    <span>${tradingFeeSavings.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tiers" className="pt-4">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3">Tier</th>
                  <th className="text-left py-2 px-3">Min. Stake</th>
                  <th className="text-left py-2 px-3">Base APY</th>
                  <th className="text-left py-2 px-3">Fee Discount</th>
                  <th className="text-left py-2 px-3">Premium Features</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-3 font-medium">Bronze</td>
                  <td className="py-3 px-3">5,000 VVAI</td>
                  <td className="py-3 px-3">8%</td>
                  <td className="py-3 px-3">10%</td>
                  <td className="py-3 px-3">Basic Analytics</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-3 font-medium">Silver</td>
                  <td className="py-3 px-3">10,000 VVAI</td>
                  <td className="py-3 px-3">12%</td>
                  <td className="py-3 px-3">25%</td>
                  <td className="py-3 px-3">+ Advanced Analytics</td>
                </tr>
                <tr className="border-b hover:bg-muted/50">
                  <td className="py-3 px-3 font-medium">Gold</td>
                  <td className="py-3 px-3">50,000 VVAI</td>
                  <td className="py-3 px-3">18%</td>
                  <td className="py-3 px-3">50%</td>
                  <td className="py-3 px-3">+ AI Strategy Insights</td>
                </tr>
                <tr className="hover:bg-muted/50">
                  <td className="py-3 px-3 font-medium">Platinum</td>
                  <td className="py-3 px-3">100,000 VVAI</td>
                  <td className="py-3 px-3">25%</td>
                  <td className="py-3 px-3">75%</td>
                  <td className="py-3 px-3">+ Custom Strategy Creation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Note: APY rates are subject to change based on protocol governance decisions and market conditions. Higher
            tiers include all benefits from lower tiers.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}
