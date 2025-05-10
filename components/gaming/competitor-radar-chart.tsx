"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const competitorData = [
  {
    metric: "TVL",
    "VV-X": 75,
    NFTfi: 90,
    "Arcade.xyz": 45,
    BendDAO: 70,
    Tessera: 20,
  },
  {
    metric: "Chain Coverage",
    "VV-X": 95,
    NFTfi: 30,
    "Arcade.xyz": 50,
    BendDAO: 30,
    Tessera: 30,
  },
  {
    metric: "Gaming Focus",
    "VV-X": 90,
    NFTfi: 40,
    "Arcade.xyz": 30,
    BendDAO: 35,
    Tessera: 45,
  },
  {
    metric: "Fractionalization",
    "VV-X": 85,
    NFTfi: 0,
    "Arcade.xyz": 20,
    BendDAO: 0,
    Tessera: 95,
  },
  {
    metric: "Lending",
    "VV-X": 80,
    NFTfi: 90,
    "Arcade.xyz": 85,
    BendDAO: 95,
    Tessera: 0,
  },
  {
    metric: "Risk Management",
    "VV-X": 90,
    NFTfi: 50,
    "Arcade.xyz": 70,
    BendDAO: 40,
    Tessera: 30,
  },
  {
    metric: "Insurance",
    "VV-X": 95,
    NFTfi: 10,
    "Arcade.xyz": 30,
    BendDAO: 20,
    Tessera: 0,
  },
]

export function CompetitorRadarChart() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Competitor Capability Comparison</CardTitle>
        <CardDescription>Relative strengths across key metrics (0-100 scale)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={competitorData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
              <Radar
                name="VV-X"
                dataKey="VV-X"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary))"
                fillOpacity={0.5}
              />
              <Radar name="NFTfi" dataKey="NFTfi" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
              <Radar name="Arcade.xyz" dataKey="Arcade.xyz" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
              <Radar name="BendDAO" dataKey="BendDAO" stroke="#ffc658" fill="#ffc658" fillOpacity={0.3} />
              <Radar name="Tessera" dataKey="Tessera" stroke="#ff8042" fill="#ff8042" fillOpacity={0.3} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-muted-foreground text-center">
          Comparative analysis based on Q2 2025 capabilities and feature sets
        </div>
      </CardContent>
    </Card>
  )
}
