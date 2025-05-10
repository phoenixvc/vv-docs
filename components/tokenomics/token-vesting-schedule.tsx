"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, LineChart, Line } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function TokenVestingSchedule() {
  const [viewType, setViewType] = useState<"quarterly" | "cumulative">("quarterly")

  // Quarterly token release data (in millions)
  const quarterlyData = [
    {
      quarter: "TGE",
      "Public Sale": 10,
      "Team & Advisors": 0,
      Ecosystem: 2,
      Treasury: 1.5,
      Liquidity: 5,
      Partners: 2,
      Community: 1,
    },
    {
      quarter: "Q1",
      "Public Sale": 2.5,
      "Team & Advisors": 0,
      Ecosystem: 1,
      Treasury: 1,
      Liquidity: 1,
      Partners: 1,
      Community: 1,
    },
    {
      quarter: "Q2",
      "Public Sale": 2.5,
      "Team & Advisors": 0,
      Ecosystem: 1,
      Treasury: 1,
      Liquidity: 1,
      Partners: 1,
      Community: 1,
    },
    {
      quarter: "Q3",
      "Public Sale": 2.5,
      "Team & Advisors": 0,
      Ecosystem: 1,
      Treasury: 1,
      Liquidity: 1,
      Partners: 1,
      Community: 1,
    },
    {
      quarter: "Q4",
      "Public Sale": 2.5,
      "Team & Advisors": 3.75,
      Ecosystem: 1,
      Treasury: 1,
      Liquidity: 1,
      Partners: 1,
      Community: 1,
    },
    {
      quarter: "Q5",
      "Public Sale": 0,
      "Team & Advisors": 0.94,
      Ecosystem: 1,
      Treasury: 1,
      Liquidity: 1,
      Partners: 1,
      Community: 1,
    },
    {
      quarter: "Q6",
      "Public Sale": 0,
      "Team & Advisors": 0.94,
      Ecosystem: 1,
      Treasury: 1,
      Liquidity: 0,
      Partners: 1,
      Community: 1,
    },
    {
      quarter: "Q7",
      "Public Sale": 0,
      "Team & Advisors": 0.94,
      Ecosystem: 1,
      Treasury: 1,
      Liquidity: 0,
      Partners: 1,
      Community: 1,
    },
    {
      quarter: "Q8",
      "Public Sale": 0,
      "Team & Advisors": 0.94,
      Ecosystem: 1,
      Treasury: 1,
      Liquidity: 0,
      Partners: 1,
      Community: 1,
    },
  ]

  // Calculate cumulative data
  const cumulativeData = quarterlyData.reduce(
    (acc, current, index) => {
      if (index === 0) {
        return [{ ...current }]
      }

      const previous = acc[index - 1]
      const cumulative = {
        quarter: current.quarter,
        "Public Sale": previous["Public Sale"] + current["Public Sale"],
        "Team & Advisors": previous["Team & Advisors"] + current["Team & Advisors"],
        Ecosystem: previous["Ecosystem"] + current["Ecosystem"],
        Treasury: previous["Treasury"] + current["Treasury"],
        Liquidity: previous["Liquidity"] + current["Liquidity"],
        Partners: previous["Partners"] + current["Partners"],
        Community: previous["Community"] + current["Community"],
      }

      return [...acc, cumulative]
    },
    [] as typeof quarterlyData,
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <p className="text-muted-foreground max-w-2xl">
          The VVAI token follows a carefully designed vesting schedule to ensure long-term alignment of incentives and
          sustainable token distribution over time. The schedule below shows the token release over a 2-year period.
        </p>

        <div className="flex space-x-2">
          <Button
            variant={viewType === "quarterly" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType("quarterly")}
          >
            Quarterly Release
          </Button>
          <Button
            variant={viewType === "cumulative" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType("cumulative")}
          >
            Cumulative
          </Button>
        </div>
      </div>

      <div className="h-80">
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
            Ecosystem: {
              label: "Ecosystem",
              color: "hsl(var(--primary) / 0.6)",
            },
            Treasury: {
              label: "Treasury",
              color: "hsl(var(--primary) / 0.4)",
            },
            Liquidity: {
              label: "Liquidity",
              color: "hsl(var(--primary) / 0.3)",
            },
            Partners: {
              label: "Partners",
              color: "hsl(var(--primary) / 0.2)",
            },
            Community: {
              label: "Community",
              color: "hsl(var(--primary) / 0.1)",
            },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            {viewType === "quarterly" ? (
              <BarChart data={quarterlyData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" angle={-45} textAnchor="end" height={70} />
                <YAxis label={{ value: "Tokens (millions)", angle: -90, position: "insideLeft" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="Public Sale" stackId="a" fill="var(--color-Public-Sale)" />
                <Bar dataKey="Team & Advisors" stackId="a" fill="var(--color-Team-&-Advisors)" />
                <Bar dataKey="Ecosystem" stackId="a" fill="var(--color-Ecosystem)" />
                <Bar dataKey="Treasury" stackId="a" fill="var(--color-Treasury)" />
                <Bar dataKey="Liquidity" stackId="a" fill="var(--color-Liquidity)" />
                <Bar dataKey="Partners" stackId="a" fill="var(--color-Partners)" />
                <Bar dataKey="Community" stackId="a" fill="var(--color-Community)" />
              </BarChart>
            ) : (
              <LineChart data={cumulativeData} margin={{ top: 20, right: 30, left: 20, bottom: 70 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="quarter" angle={-45} textAnchor="end" height={70} />
                <YAxis label={{ value: "Cumulative Tokens (millions)", angle: -90, position: "insideLeft" }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="Public Sale"
                  stroke="var(--color-Public-Sale)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Team & Advisors"
                  stroke="var(--color-Team-&-Advisors)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Ecosystem"
                  stroke="var(--color-Ecosystem)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Treasury"
                  stroke="var(--color-Treasury)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Liquidity"
                  stroke="var(--color-Liquidity)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Partners"
                  stroke="var(--color-Partners)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
                <Line
                  type="monotone"
                  dataKey="Community"
                  stroke="var(--color-Community)"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="mt-6 space-y-4">
        <h4 className="font-semibold">Vesting Terms by Allocation</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">Public Sale (20%)</h5>
            <p className="text-sm text-muted-foreground">
              50% unlocked at TGE, remaining 50% vested linearly over 12 months.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">Team & Advisors (15%)</h5>
            <p className="text-sm text-muted-foreground">12-month cliff, then vested linearly over 36 months.</p>
          </div>

          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">Ecosystem Development (20%)</h5>
            <p className="text-sm text-muted-foreground">
              10% unlocked at TGE, remaining 90% vested linearly over 48 months.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">Treasury (15%)</h5>
            <p className="text-sm text-muted-foreground">
              10% unlocked at TGE, remaining 90% vested linearly over 36 months.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">Liquidity Provision (10%)</h5>
            <p className="text-sm text-muted-foreground">
              50% unlocked at TGE, remaining 50% vested linearly over 12 months.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h5 className="font-medium mb-2">Strategic Partners (10%)</h5>
            <p className="text-sm text-muted-foreground">
              20% unlocked at TGE, remaining 80% vested linearly over 24 months.
            </p>
          </div>

          <div className="border rounded-lg p-4 md:col-span-2">
            <h5 className="font-medium mb-2">Community Rewards (10%)</h5>
            <p className="text-sm text-muted-foreground">
              10% unlocked at TGE, remaining 90% vested linearly over 36 months for community incentives, airdrops, and
              rewards.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
