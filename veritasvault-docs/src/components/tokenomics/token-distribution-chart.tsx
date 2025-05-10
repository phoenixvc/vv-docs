"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function TokenDistributionChart() {
  const tokenDistribution = [
    { name: "Public Sale", value: 20, color: "hsl(var(--primary))" },
    { name: "Team & Advisors", value: 15, color: "hsl(var(--primary) / 0.8)" },
    { name: "Ecosystem Development", value: 20, color: "hsl(var(--primary) / 0.6)" },
    { name: "Treasury", value: 15, color: "hsl(var(--primary) / 0.4)" },
    { name: "Liquidity Provision", value: 10, color: "hsl(var(--primary) / 0.3)" },
    { name: "Strategic Partners", value: 10, color: "hsl(var(--primary) / 0.2)" },
    { name: "Community Rewards", value: 10, color: "hsl(var(--primary) / 0.1)" },
  ]

  return (
    <ChartContainer
      config={{
        "Public Sale": {
          label: "Public Sale",
          color: "hsl(var(--primary))",
        },
        "Team & Advisors": {
          label: "Team & Advisors",
          color: "hsl(var(--primary) / 0.8)",
        },
        "Ecosystem Development": {
          label: "Ecosystem Development",
          color: "hsl(var(--primary) / 0.6)",
        },
        Treasury: {
          label: "Treasury",
          color: "hsl(var(--primary) / 0.4)",
        },
        "Liquidity Provision": {
          label: "Liquidity Provision",
          color: "hsl(var(--primary) / 0.3)",
        },
        "Strategic Partners": {
          label: "Strategic Partners",
          color: "hsl(var(--primary) / 0.2)",
        },
        "Community Rewards": {
          label: "Community Rewards",
          color: "hsl(var(--primary) / 0.1)",
        },
      }}
      className="h-full w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={tokenDistribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {tokenDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend layout="vertical" verticalAlign="middle" align="right" />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
