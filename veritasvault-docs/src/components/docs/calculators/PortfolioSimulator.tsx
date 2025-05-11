"use client"

import type React from "react"
import { useState } from "react"
import type { PortfolioSimulatorProps, PortfolioAsset, SimulationResult } from "./types"
import styles from "./PortfolioSimulator.module.css"
import { Alert } from "../../common"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const defaultAssets: PortfolioAsset[] = [
  {
    name: "Ethereum",
    allocation: 40,
    expectedReturn: 15,
    volatility: 75,
  },
  {
    name: "Bitcoin",
    allocation: 30,
    expectedReturn: 12,
    volatility: 70,
  },
  {
    name: "Solana",
    allocation: 10,
    expectedReturn: 25,
    volatility: 100,
  },
  {
    name: "Stablecoin Yield",
    allocation: 15,
    expectedReturn: 6,
    volatility: 5,
  },
  {
    name: "DeFi Index",
    allocation: 5,
    expectedReturn: 30,
    volatility: 110,
  },
]

// Default correlation matrix (simplified)
const defaultCorrelation: Record<string, Record<string, number>> = {
  Ethereum: { Ethereum: 1, Bitcoin: 0.8, Solana: 0.7, "Stablecoin Yield": 0.1, "DeFi Index": 0.6 },
  Bitcoin: { Ethereum: 0.8, Bitcoin: 1, Solana: 0.6, "Stablecoin Yield": 0.1, "DeFi Index": 0.5 },
  Solana: { Ethereum: 0.7, Bitcoin: 0.6, Solana: 1, "Stablecoin Yield": 0.2, "DeFi Index": 0.7 },
  "Stablecoin Yield": { Ethereum: 0.1, Bitcoin: 0.1, Solana: 0.2, "Stablecoin Yield": 1, "DeFi Index": 0.3 },
  "DeFi Index": { Ethereum: 0.6, Bitcoin: 0.5, Solana: 0.7, "Stablecoin Yield": 0.3, "DeFi Index": 1 },
}

// Box-Muller transform to generate normally distributed random numbers
function boxMullerTransform() {
  const u1 = Math.random()
  const u2 = Math.random()

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2)
  return z0
}

// Generate correlated random returns
function generateCorrelatedReturns(
  assets: PortfolioAsset[],
  correlationMatrix: Record<string, Record<string, number>>,
) {
  const uncorrelatedReturns = assets.map(() => boxMullerTransform())
  const correlatedReturns: number[] = []

  for (let i = 0; i < assets.length; i++) {
    let correlatedReturn = 0

    for (let j = 0; j <= i; j++) {
      const correlation = j === i ? 1 : correlationMatrix[assets[i].name][assets[j].name]

      correlatedReturn += correlation * uncorrelatedReturns[j]
    }

    correlatedReturns.push(correlatedReturn)
  }

  return correlatedReturns
}

// Run Monte Carlo simulation for portfolio
function runSimulation(
  assets: PortfolioAsset[],
  initialInvestment: number,
  days: number,
  numSimulations: number,
): SimulationResult {
  // Normalize allocations to ensure they sum to 100%
  const totalAllocation = assets.reduce((sum, asset) => sum + asset.allocation, 0)
  const normalizedAssets = assets.map((asset) => ({
    ...asset,
    allocation: (asset.allocation / totalAllocation) * 100,
  }))

  // Prepare correlation matrix
  const correlationMatrix: Record<string, Record<string, number>> = {}
  normalizedAssets.forEach((asset1) => {
    correlationMatrix[asset1.name] = {}
    normalizedAssets.forEach((asset2) => {
      // Use defaultCorrelation if available, otherwise use default values
      correlationMatrix[asset1.name][asset2.name] =
        defaultCorrelation[asset1.name]?.[asset2.name] || (asset1.name === asset2.name ? 1 : 0.5)
    })
  })

  // Convert annual parameters to daily
  const assetsDaily = normalizedAssets.map((asset) => ({
    ...asset,
    dailyReturn: Math.pow(1 + asset.expectedReturn / 100, 1 / 365) - 1,
    dailyVolatility: asset.volatility / 100 / Math.sqrt(365),
  }))

  // Initialize tracking variables
  let bestFinalValue = 0
  let worstFinalValue = Number.POSITIVE_INFINITY
  let sumFinalValues = 0
  let sumSquaredReturns = 0
  let minDrawdown = 0

  // Store daily values for the "median" simulation
  let representativeSimulation: number[] = []

  // Run multiple simulations
  for (let sim = 0; sim < numSimulations; sim++) {
    // Initialize portfolio value for this simulation
    let portfolioValue = initialInvestment
    const dailyValues: number[] = [portfolioValue]
    let peakValue = portfolioValue
    let maxDrawdown = 0

    // Simulate each day
    for (let day = 1; day <= days; day++) {
      // Generate correlated random returns
      const correlatedRandoms = generateCorrelatedReturns(assetsDaily, correlationMatrix)

      // Calculate portfolio return for this day
      let portfolioReturn = 0
      for (let i = 0; i < assetsDaily.length; i++) {
        const asset = assetsDaily[i]
        const randomReturn = correlatedRandoms[i]

        // Daily return formula using volatility and expected return
        const assetReturn = asset.dailyReturn + asset.dailyVolatility * randomReturn
        portfolioReturn += (asset.allocation / 100) * assetReturn
      }

      // Update portfolio value
      portfolioValue *= 1 + portfolioReturn
      dailyValues.push(portfolioValue)

      // Track maximum drawdown
      if (portfolioValue > peakValue) {
        peakValue = portfolioValue
      } else {
        const drawdown = (peakValue - portfolioValue) / peakValue
        maxDrawdown = Math.max(maxDrawdown, drawdown)
      }
    }

    // Update statistics
    const finalValue = dailyValues[dailyValues.length - 1]
    const totalReturn = (finalValue - initialInvestment) / initialInvestment

    sumFinalValues += finalValue
    sumSquaredReturns += totalReturn * totalReturn

    if (finalValue > bestFinalValue) {
      bestFinalValue = finalValue
    }
    if (finalValue < worstFinalValue) {
      worstFinalValue = finalValue
    }
    if (maxDrawdown > minDrawdown) {
      minDrawdown = maxDrawdown
    }

    // Store a representative simulation (middle of the road)
    if (sim === Math.floor(numSimulations / 2)) {
      representativeSimulation = dailyValues
    }
  }

  // Calculate final statistics
  const avgFinalValue = sumFinalValues / numSimulations
  const avgReturn = (avgFinalValue - initialInvestment) / initialInvestment
  const returnStdDev = Math.sqrt(sumSquaredReturns / numSimulations - avgReturn * avgReturn)
  const sharpeRatio = returnStdDev > 0 ? avgReturn / returnStdDev : 0

  return {
    finalValue: avgFinalValue,
    returns: avgReturn * 100, // convert to percentage
    maxDrawdown: minDrawdown * 100, // convert to percentage
    sharpeRatio: sharpeRatio,
    dailyValues: representativeSimulation,
    bestFinalValue,
    worstFinalValue,
  }
}

const PortfolioSimulator: React.FC<PortfolioSimulatorProps> = ({
  className,
  title = "Multi-Chain Portfolio Simulator",
  description = "Simulate portfolio performance across multiple blockchain assets",
  assets = defaultAssets,
  initialInvestment = 10000,
  simulationPeriod = 365,
}) => {
  const [investment, setInvestment] = useState(initialInvestment)
  const [period, setPeriod] = useState(simulationPeriod)
  const [portfolioAssets, setPortfolioAssets] = useState<PortfolioAsset[]>(assets)
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [showBounds, setShowBounds] = useState(false)

  // Handle asset allocation change
  const handleAllocationChange = (index: number, value: number) => {
    const newAssets = [...portfolioAssets]
    newAssets[index].allocation = value
    setPortfolioAssets(newAssets)
  }

  // Run simulation
  const handleRunSimulation = () => {
    setIsSimulating(true)

    // Use setTimeout to allow UI to update before starting the calculation
    setTimeout(() => {
      const result = runSimulation(portfolioAssets, investment, period, 100)
      setSimulationResult(result)
      setIsSimulating(false)
    }, 10)
  }

  // Prepare chart data
  const prepareChartData = () => {
    if (!simulationResult) return null

    const labels = Array.from({ length: simulationResult.dailyValues.length }, (_, i) => {
      if (simulationResult.dailyValues.length <= 30) {
        // Show all days if we have 30 or fewer
        return `Day ${i}`
      } else if (
        i % Math.floor(simulationResult.dailyValues.length / 10) === 0 ||
        i === simulationResult.dailyValues.length - 1
      ) {
        // Show approximately 10 labels
        return `Day ${i}`
      }
      return ""
    })

    return {
      labels,
      datasets: [
        {
          label: "Portfolio Value",
          data: simulationResult.dailyValues,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    }
  }

  // Check if allocations sum to approximately 100%
  const isAllocationValid = () => {
    const total = portfolioAssets.reduce((sum, asset) => sum + asset.allocation, 0)
    return Math.abs(total - 100) < 1 // Allow small rounding errors
  }

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <label htmlFor="investment">Initial Investment (USD)</label>
          <input
            id="investment"
            type="number"
            value={investment}
            min={1000}
            onChange={(e) => setInvestment(Math.max(1000, Number(e.target.value)))}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="period">Simulation Period (days)</label>
          <input
            id="period"
            type="number"
            value={period}
            min={30}
            max={3650}
            onChange={(e) => setPeriod(Math.max(30, Math.min(3650, Number(e.target.value))))}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.portfolioBuilder}>
        <h3>Portfolio Allocation</h3>
        <p className={styles.hint}>Adjust the percentage allocation for each asset. Total should equal 100%.</p>

        <div className={styles.assetAllocation}>
          {portfolioAssets.map((asset, index) => (
            <div key={asset.name} className={styles.assetRow}>
              <div className={styles.assetInfo}>
                <span className={styles.assetName}>{asset.name}</span>
                <span className={styles.assetMetrics}>
                  Expected Return: {asset.expectedReturn}% | Volatility: {asset.volatility}%
                </span>
              </div>
              <div className={styles.allocationControl}>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={asset.allocation}
                  onChange={(e) => handleAllocationChange(index, Number(e.target.value))}
                  className={styles.allocationSlider}
                />
                <div className={styles.allocationValue}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={asset.allocation}
                    onChange={(e) => handleAllocationChange(index, Number(e.target.value))}
                    className={styles.allocationInput}
                  />
                  <span>%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.totalAllocation}>
          <div>Total Allocation:</div>
          <div className={isAllocationValid() ? styles.validAllocation : styles.invalidAllocation}>
            {portfolioAssets.reduce((sum, asset) => sum + asset.allocation, 0).toFixed(1)}%
          </div>
        </div>

        {!isAllocationValid() && (
          <Alert type="warning" className={styles.alert}>
            Total allocation should equal 100%. Please adjust your allocations.
          </Alert>
        )}

        <div className={styles.simulationControls}>
          <button
            onClick={handleRunSimulation}
            disabled={!isAllocationValid() || isSimulating}
            className={styles.simulateButton}
          >
            {isSimulating ? "Simulating..." : "Run Simulation"}
          </button>

          {simulationResult && (
            <label className={styles.boundsToggle}>
              <input type="checkbox" checked={showBounds} onChange={(e) => setShowBounds(e.target.checked)} />
              Show Potential Range
            </label>
          )}
        </div>
      </div>

      {simulationResult && (
        <>
          <div className={styles.simulationResults}>
            <h3>Simulation Results</h3>

            <div className={styles.metrics}>
              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Expected Final Value</div>
                <div className={styles.metricValue}>${simulationResult.finalValue.toFixed(2)}</div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Expected Return</div>
                <div className={styles.metricValue}>{simulationResult.returns.toFixed(2)}%</div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Maximum Drawdown</div>
                <div className={styles.metricValue}>{simulationResult.maxDrawdown.toFixed(2)}%</div>
              </div>

              <div className={styles.metricCard}>
                <div className={styles.metricLabel}>Sharpe Ratio</div>
                <div className={styles.metricValue}>{simulationResult.sharpeRatio.toFixed(2)}</div>
              </div>
            </div>

            {showBounds && (
              <div className={styles.potentialRange}>
                <div className={styles.rangeBound}>
                  <div className={styles.boundLabel}>Potential Upside</div>
                  <div className={styles.boundValue}>${simulationResult.bestFinalValue?.toFixed(2)}</div>
                </div>

                <div className={styles.rangeBound}>
                  <div className={styles.boundLabel}>Potential Downside</div>
                  <div className={styles.boundValue}>${simulationResult.worstFinalValue?.toFixed(2)}</div>
                </div>
              </div>
            )}

            <div className={styles.chartContainer}>
              <Line
                data={prepareChartData() || { labels: [], datasets: [] }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    title: {
                      display: true,
                      text: `Portfolio Value Simulation (${period} days)`,
                      font: {
                        size: 16,
                      },
                    },
                    tooltip: {
                      mode: "index",
                      intersect: false,
                      callbacks: {
                        label: (context) => `Value: $${Number(context.raw).toFixed(2)}`,
                      },
                    },
                  },
                  scales: {
                    y: {
                      ticks: {
                        callback: (value) => `$${value}`,
                      },
                    },
                  },
                }}
              />
            </div>

            <div className={styles.interpretation}>
              <h3>Results Interpretation</h3>
              <div className={styles.interpretationContent}>
                <p>
                  <strong>Expected Final Value:</strong> The average projected value of your portfolio after {period}{" "}
                  days, based on the simulation.
                </p>
                <p>
                  <strong>Expected Return:</strong> The percentage return on your initial investment.
                </p>
                <p>
                  <strong>Maximum Drawdown:</strong> The largest percentage drop from a peak to a trough in the
                  portfolio value. Lower is better.
                </p>
                <p>
                  <strong>Sharpe Ratio:</strong> A measure of risk-adjusted return. Higher values indicate better
                  risk-adjusted performance.
                </p>
                {showBounds && (
                  <>
                    <p>
                      <strong>Potential Upside:</strong> A optimistic scenario for portfolio performance (top 10% of
                      simulations).
                    </p>
                    <p>
                      <strong>Potential Downside:</strong> A pessimistic scenario for portfolio performance (bottom 10%
                      of simulations).
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className={styles.disclaimer}>
            <Alert type="info">
              <p>
                <strong>Disclaimer:</strong> This simulation is for educational purposes only and uses a simplified
                model. Past performance is not indicative of future results. Crypto assets are highly volatile, and
                returns may vary significantly from these simulations. Always conduct thorough research before
                investing.
              </p>
            </Alert>
          </div>
        </>
      )}
    </div>
  )
}

export default PortfolioSimulator
