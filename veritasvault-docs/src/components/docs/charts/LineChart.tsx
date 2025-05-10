"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, registerables } from "chart.js"
import { cn } from "@/lib/utils"
import type { ChartData, ChartOptions } from "./types"

// Register Chart.js components
Chart.register(...registerables)

export interface LineChartProps {
  data: ChartData
  options?: ChartOptions
  height?: number
  width?: number
  className?: string
}

export const LineChart: React.FC<LineChartProps> = ({ data, options = {}, height = 300, width = 500, className }) => {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstanceRef = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart instance
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Default options for line charts
    const defaultOptions: ChartConfiguration<"line">["options"] = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          labels: {
            usePointStyle: true,
            boxWidth: 6,
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            borderDash: [2],
            drawBorder: false,
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 3,
          hoverRadius: 5,
        },
      },
    }

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: data.datasets.map((dataset) => ({
          ...dataset,
          borderWidth: dataset.borderWidth || 2,
          pointBackgroundColor: dataset.pointBackgroundColor || dataset.borderColor,
        })),
      },
      options: {
        ...defaultOptions,
        ...options,
      },
    })

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy()
      }
    }
  }, [data, options])

  return (
    <div className={cn("relative", className)} style={{ height: `${height}px`, width: width ? `${width}px` : "100%" }}>
      <canvas ref={chartRef} />
    </div>
  )
}

export default LineChart
