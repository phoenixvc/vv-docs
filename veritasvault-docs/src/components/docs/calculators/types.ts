export interface CalculatorProps {
  className?: string
  title?: string
  description?: string
}

export interface YieldComparisonProps extends CalculatorProps {
  chains?: ChainYield[]
  defaultInvestment?: number
  timeframe?: number // in days
}

export interface ChainYield {
  name: string
  apy: number
  risk: "low" | "medium" | "high"
  lockupPeriod?: number // in days
  minInvestment?: number
}

export interface RiskAssessmentProps extends CalculatorProps {
  projects?: RiskProject[]
}

export interface RiskProject {
  name: string
  auditScore: number // 0-100
  tvl: number // in USD
  timeInMarket: number // in days
  hackHistory: number // number of incidents
  exploitImpact?: number // as percentage of TVL
}

export interface PortfolioSimulatorProps extends CalculatorProps {
  assets?: PortfolioAsset[]
  initialInvestment?: number
  simulationPeriod?: number // in days
}

export interface PortfolioAsset {
  name: string
  allocation: number // percentage
  expectedReturn: number // annual percentage
  volatility: number // standard deviation
  correlation?: Record<string, number> // correlation with other assets
}

export interface SimulationResult {
  finalValue: number
  returns: number // percentage
  maxDrawdown: number // percentage
  sharpeRatio: number
  dailyValues: number[]
}
