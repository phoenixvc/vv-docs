import type { ChartOptions } from "./types"

/**
 * Format a number with specified options
 */
export function formatNumber(
  value: number,
  options: {
    format?: "number" | "currency" | "percent"
    currency?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
  } = {},
): string {
  const { format = "number", currency = "USD", minimumFractionDigits = 0, maximumFractionDigits = 2 } = options

  try {
    if (format === "currency") {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(value)
    }

    if (format === "percent") {
      return new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits,
        maximumFractionDigits,
      }).format(value / 100)
    }

    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(value)
  } catch (error) {
    console.error("Error formatting number:", error)
    return value.toString()
  }
}

/**
 * Generate a random color
 */
export function generateRandomColor(): string {
  const letters = "0123456789ABCDEF"
  let color = "#"
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

/**
 * Generate an array of colors
 */
export function generateColors(count: number): string[] {
  // Predefined colors for better visual consistency
  const predefinedColors = [
    "#4299e1", // blue
    "#48bb78", // green
    "#ed8936", // orange
    "#9f7aea", // purple
    "#f56565", // red
    "#38b2ac", // teal
    "#ecc94b", // yellow
    "#667eea", // indigo
    "#fc8181", // light red
    "#68d391", // light green
    "#f6ad55", // light orange
    "#b794f4", // light purple
  ]

  if (count <= predefinedColors.length) {
    return predefinedColors.slice(0, count)
  }

  // If we need more colors than predefined, generate random ones
  const colors = [...predefinedColors]
  for (let i = predefinedColors.length; i < count; i++) {
    colors.push(generateRandomColor())
  }

  return colors
}

/**
 * Get default chart options based on chart type
 */
export function getDefaultOptions(chartType: string): ChartOptions {
  const baseOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll use our custom legend component
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
  }

  switch (chartType) {
    case "line":
      return {
        ...baseOptions,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
      }

    case "bar":
      return {
        ...baseOptions,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
      }

    case "pie":
    case "doughnut":
      return {
        ...baseOptions,
        cutout: chartType === "doughnut" ? "50%" : "0",
      }

    case "radar":
      return {
        ...baseOptions,
        scales: {
          r: {
            beginAtZero: true,
            angleLines: {
              color: "rgba(0, 0, 0, 0.1)",
            },
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
      }

    default:
      return baseOptions
  }
}

/**
 * Calculate the maximum value in a dataset
 */
export function getMaxValue(data: number[]): number {
  return Math.max(...data, 0)
}

/**
 * Calculate the minimum value in a dataset
 */
export function getMinValue(data: number[]): number {
  return Math.min(...data)
}

/**
 * Calculate the average value in a dataset
 */
export function getAverageValue(data: number[]): number {
  if (data.length === 0) return 0
  const sum = data.reduce((acc, val) => acc + val, 0)
  return sum / data.length
}

/**
 * Format a date for display on charts
 */
export function formatDate(date: Date, format: "short" | "medium" | "long" = "medium"): string {
  try {
    switch (format) {
      case "short":
        return new Intl.DateTimeFormat("en-US", {
          month: "numeric",
          day: "numeric",
        }).format(date)
      case "long":
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(date)
      case "medium":
      default:
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }).format(date)
    }
  } catch (error) {
    console.error("Error formatting date:", error)
    return date.toLocaleDateString()
  }
}
