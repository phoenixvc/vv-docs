"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function TokenBurnMechanism() {
  const [activeTab, setActiveTab] = useState("overview")

  // Memoize the burn data to prevent recalculations on every render
  const burnData = useMemo(() => {
    return [
      { quarter: "Q1 2023", amount: 250000, cumulative: 250000 },
      { quarter: "Q2 2023", amount: 320000, cumulative: 570000 },
      { quarter: "Q3 2023", amount: 410000, cumulative: 980000 },
      { quarter: "Q4 2023", amount: 520000, cumulative: 1500000 },
      { quarter: "Q1 2024", amount: 650000, cumulative: 2150000 },
      { quarter: "Q2 2024", amount: 780000, cumulative: 2930000 },
      { quarter: "Q3 2024", amount: 920000, cumulative: 3850000 },
      { quarter: "Q4 2024", amount: 1050000, cumulative: 4900000 },
    ]
  }, [])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4">Token Burn Mechanism</h3>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="chart">Burn Chart</TabsTrigger>
                <TabsTrigger value="schedule">Burn Schedule</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 pt-4">
                <p>
                  The VVAI token implements a deflationary mechanism through systematic token burns, reducing the total
                  supply over time and potentially increasing the value of remaining tokens.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Buy-Back and Burn</h4>
                    <p>
                      30% of all platform fees are allocated to buying back VVAI tokens from the open market and burning
                      them, permanently removing them from circulation.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Burn Events</h4>
                    <p>
                      Token burns occur quarterly, with the amount determined by platform revenue and usage metrics. All
                      burn transactions are publicly verifiable on-chain.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Supply Cap</h4>
                    <p>
                      The maximum supply of VVAI tokens is capped at 100,000,000. Through the burn mechanism, this
                      supply will decrease over time, potentially reaching as low as 70,000,000.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Transparency</h4>
                    <p>
                      All burn events are announced in advance and documented in quarterly reports, ensuring full
                      transparency for the community.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="chart" className="pt-4">
                <div className="h-[400px] w-full">
                  <ChartContainer
                    config={{
                      amount: {
                        label: "Quarterly Burn Amount",
                        color: "hsl(var(--chart-1))",
                      },
                      cumulative: {
                        label: "Cumulative Burn",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={burnData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Line type="monotone" dataKey="amount" stroke="var(--color-amount)" strokeWidth={2} />
                        <Line type="monotone" dataKey="cumulative" stroke="var(--color-cumulative)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="pt-4">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted">
                        <th className="border p-2 text-left">Quarter</th>
                        <th className="border p-2 text-right">Burn Amount</th>
                        <th className="border p-2 text-right">Cumulative Burn</th>
                        <th className="border p-2 text-right">% of Total Supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      {burnData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                          <td className="border p-2">{item.quarter}</td>
                          <td className="border p-2 text-right">{item.amount.toLocaleString()}</td>
                          <td className="border p-2 text-right">{item.cumulative.toLocaleString()}</td>
                          <td className="border p-2 text-right">{((item.cumulative / 100000000) * 100).toFixed(2)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Burn Schedule Notes</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Burn amounts may vary based on actual platform revenue</li>
                    <li>Additional one-time burns may occur for special events</li>
                    <li>The burn schedule will continue beyond 2024 until the target supply is reached</li>
                    <li>All burn transactions will be executed through a transparent multi-sig process</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
