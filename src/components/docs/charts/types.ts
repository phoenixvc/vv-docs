import type React from "react"
export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string
  borderWidth?: number
  pointBackgroundColor?: string
  fill?: boolean
  tension?: number
  [key: string]: any
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
}

export interface ChartOptions {
  responsive?: boolean
  maintainAspectRatio?: boolean
  plugins?: {
    legend?: {
      position?: "top" | "bottom" | "left" | "right"
      display?: boolean
      [key: string]: any
    }
    tooltip?: {
      mode?: "index" | "point" | "nearest" | "dataset"
      intersect?: boolean
      [key: string]: any
    }
    [key: string]: any
  }
  scales?: {
    x?: {
      grid?: {
        display?: boolean
        [key: string]: any
      }
      [key: string]: any
    }
    y?: {
      beginAtZero?: boolean
      grid?: {
        [key: string]: any
      }
      [key: string]: any
    }
    [key: string]: any
  }
  [key: string]: any
}

export interface TooltipProps {
  title?: string
  content: React.ReactNode
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

export interface LegendItem {
  label: string
  color: string
  shape?: "circle" | "square" | "line"
  onClick?: () => void
}

export interface LegendProps {
  items: LegendItem[]
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

export interface ChartContainerProps {
  title?: string
  description?: string
  children: React.ReactNode
  className?: string
  legendItems?: LegendItem[]
  legendPosition?: "top" | "bottom" | "left" | "right"
}
