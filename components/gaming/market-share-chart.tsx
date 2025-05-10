"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const marketShareData = [
  { quarter: "Q4 2025", tvl: 10, marketShare: 2, totalMarket: 500 },
  { quarter: "Q1 2026", tvl: 25, marketShare: 5, totalMarket: 550 },
  { quarter: "Q2 2026", tvl: 45, marketShare: 8, totalMarket: 600 },
  { quarter: "Q3 2026", tvl: 75, marketShare: 12, totalMarket: 650 },
  { quarter: "Q4 2026", tvl: 110, marketShare: 15, totalMarket: 700 },
  { quarter: "Q1 2027", tvl: 150, marketShare: 18, totalMarket: 800 },
  { quarter: "Q2 2027", tvl: 200, marketShare: 21, totalMarket: 900 },
  { quarter: "Q3 2027", tvl: 250, marketShare: 23, totalMarket: 1050 },
  { quarter: "Q4 2027", tvl: 300, marketShare: 25, totalMarket: 1200 },
]

export function MarketShareChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">VV-X Market Share Projection</CardTitle>
        <CardDescription>Projected TVL and market share growth (2025-2027)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            tvl: {
              label: "TVL (millions USD)",
              color: "hsl(var(--chart-1))",
            },
            marketShare: {
              label: "Market Share (%)",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketShareData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTvl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-tvl)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-tvl)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="colorMarketShare" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-marketShare)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-marketShare)" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="quarter" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="tvl"
                stroke="var(--color-tvl)"
                fillOpacity={1}
                fill="url(#colorTvl)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="marketShare"
                stroke="var(--color-marketShare)"
                fillOpacity={1}
                fill="url(#colorMarketShare)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Based on projected total market size growing to $1.2B by end of 2027
        </div>
      </CardContent>
    </Card>
  )
}
