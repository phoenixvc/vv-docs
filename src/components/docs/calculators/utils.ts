/**
 * Calculate staking rewards based on amount, APY, and duration
 */
export function calculateStakingRewards(
  amount: number,
  apy: number,
  durationMonths: number,
): { rewards: number; total: number } {
  // Convert APY to monthly rate
  const monthlyRate = apy / 100 / 12

  // Calculate rewards using compound interest formula
  const total = amount * Math.pow(1 + monthlyRate, durationMonths)
  const rewards = total - amount

  return {
    rewards,
    total,
  }
}

/**
 * Format a number as currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Calculate yield comparison between different staking options
 */
export function calculateYieldComparison(
  amount: number,
  options: Array<{ name: string; apy: number }>,
): Array<{ name: string; apy: number; monthly: number; yearly: number }> {
  return options.map((option) => {
    const monthlyYield = amount * (option.apy / 100 / 12)
    const yearlyYield = amount * (option.apy / 100)

    return {
      name: option.name,
      apy: option.apy,
      monthly: monthlyYield,
      yearly: yearlyYield,
    }
  })
}

/**
 * Calculate risk-adjusted returns using Sharpe ratio
 */
export function calculateRiskAdjustedReturn(
  expectedReturn: number,
  riskFreeRate: number,
  standardDeviation: number,
): number {
  // Sharpe ratio = (Expected Return - Risk Free Rate) / Standard Deviation
  return (expectedReturn - riskFreeRate) / standardDeviation
}

/**
 * Run Monte Carlo simulation for portfolio performance
 */
export function runMonteCarloSimulation(
  initialInvestment: number,
  expectedReturn: number,
  volatility: number,
  years: number,
  simulations: number,
): Array<Array<number>> {
  const results: Array<Array<number>> = []

  for (let sim = 0; sim < simulations; sim++) {
    const simulationPath: number[] = [initialInvestment]
    let currentValue = initialInvestment

    for (let year = 1; year <= years; year++) {
      // Generate random return based on expected return and volatility
      const annualReturn = generateRandomReturn(expectedReturn, volatility)
      currentValue = currentValue * (1 + annualReturn)
      simulationPath.push(currentValue)
    }

    results.push(simulationPath)
  }

  return results
}

/**
 * Generate a random return based on expected return and volatility
 */
function generateRandomReturn(expectedReturn: number, volatility: number): number {
  // Using Box-Muller transform to generate normally distributed random numbers
  const u1 = Math.random()
  const u2 = Math.random()

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)

  // Return = Expected Return + Volatility * Random Normal Variable
  return expectedReturn / 100 + (volatility / 100) * z0
}
