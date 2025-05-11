"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { YieldComparisonProps, ChainYield } from "./types"
import styles from "./YieldComparison.module.css"
import { Alert } from "../../common"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const defaultChains: ChainYield[] = [
  { name: "Ethereum", apy: 4.5, risk: "low", lockupPeriod: 0, minInvestment: 0 },
  { name: "Binance Smart Chain", apy: 7.2, risk: "medium", lockupPeriod: 7, minInvestment: 100 },
  { name: "Solana", apy: 9.8, risk: "medium", lockupPeriod: 14, minInvestment: 50 },
  { name: "Avalanche", apy: 11.5, risk: "high", lockupPeriod: 30, minInvestment: 200 },
  { name: "Polygon", apy: 8.3, risk: "medium", lockupPeriod: 0, minInvestment: 0 },
]

const YieldComparison: React.FC<YieldComparisonProps> = ({
  className,
  title = "Cross-Chain Yield Comparison",
  description = "Compare yield opportunities across different blockchain networks",
  chains = defaultChains,
  defaultInvestment = 1000,
  timeframe = 365,
}) => {
  const [investment, setInvestment] = useState(defaultInvestment)
  const [period, setPeriod] = useState(timeframe)
  const [selectedChains, setSelectedChains] = useState<string[]>(chains.map((chain) => chain.name))
  const [results, setResults] = useState<Array<{ chain: string; yield: number; total: number }>>([])

  // Calculate yields when inputs change
  useEffect(() => {
    const calculatedResults = chains
      .filter((chain) => selectedChains.includes(chain.name))
      .map((chain) => {
        const dailyRate = Math.pow(1 + chain.apy / 100, 1 / 365) - 1
        const totalYield = investment * (Math.pow(1 + dailyRate, period) - 1)
        const total = investment + totalYield

        return {
          chain: chain.name,
          yield: totalYield,
          total: total,
          risk: chain.risk,
          apy: chain.apy,
        }
      })
      .sort((a, b) => b.yield - a.yield)

    setResults(calculatedResults)
  }, [investment, period, selectedChains, chains])

  // Chart data preparation
  const chartData = {
    labels: results.map((result) => result.chain),
    datasets: [
      {
        label: "Expected Yield",
        data: results.map((result) => Number.parseFloat(result.yield.toFixed(2))),
        backgroundColor: results.map((result) => {
          const chain = chains.find((c) => c.name === result.chain)
          if (chain?.risk === "low") return "rgba(53, 162, 235, 0.7)"
          if (chain?.risk === "medium") return "rgba(255, 159, 64, 0.7)"
          return "rgba(255, 99, 132, 0.7)"
        }),
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Expected Yield Over ${period} Days with ${investment} USD Investment`,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const index = context.dataIndex
            const result = results[index]
            return [
              `Yield: $${result.yield.toFixed(2)}`,
              `APY: ${result.apy}%`,
              `Risk Level: ${result.risk}`,
              `Total Value: $${result.total.toFixed(2)}`,
            ]
          },
        },
      },
    },
  }

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      <div className={styles.controls}>
        <div className={styles.inputGroup}>
          <label htmlFor="investment">Investment Amount (USD)</label>
          <input
            id="investment"
            type="number"
            value={investment}
            min={Math.max(...chains.map((c) => c.minInvestment))}
            onChange={(e) => setInvestment(Math.max(0, Number(e.target.value)))}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="period">Time Period (days)</label>
          <input
            id="period"
            type="number"
            value={period}
            min={Math.max(...chains.map((c) => c.lockupPeriod || 0))}
            onChange={(e) => setPeriod(Math.max(1, Number(e.target.value)))}
            className={styles.input}
          />
        </div>
      </div>

      <div className={styles.chainSelector}>
        <h3>Select Chains to Compare</h3>
        <div className={styles.checkboxes}>
          {chains.map((chain) => (
            <label key={chain.name} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedChains.includes(chain.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedChains([...selectedChains, chain.name])
                  } else {
                    setSelectedChains(selectedChains.filter((c) => c !== chain.name))
                  }
                }}
                className={styles.checkbox}
              />
              {chain.name}
              <span className={`${styles.riskIndicator} ${styles[chain.risk]}`}>{chain.risk}</span>
            </label>
          ))}
        </div>
      </div>

      {selectedChains.length === 0 && (
        <Alert type="warning" className={styles.alert}>
          Please select at least one blockchain to compare yields.
        </Alert>
      )}

      {selectedChains.length > 0 && (
        <>
          <div className={styles.chartContainer}>
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className={styles.resultsTable}>
            <h3>Yield Comparison Results</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Blockchain</th>
                  <th>APY</th>
                  <th>Risk Level</th>
                  <th>Lockup Period</th>
                  <th>Min. Investment</th>
                  <th>Expected Yield</th>
                  <th>Final Amount</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => {
                  const chain = chains.find((c) => c.name === result.chain)
                  return (
                    <tr key={result.chain}>
                      <td>{result.chain}</td>
                      <td>{chain?.apy}%</td>
                      <td>
                        <span className={`${styles.riskPill} ${styles[chain?.risk || "medium"]}`}>{chain?.risk}</span>
                      </td>
                      <td>{chain?.lockupPeriod || 0} days</td>
                      <td>${chain?.minInvestment || 0}</td>
                      <td>${result.yield.toFixed(2)}</td>
                      <td>${result.total.toFixed(2)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.disclaimer}>
            <Alert type="info">
              <p>
                <strong>Disclaimer:</strong> The yields shown are estimates based on current APY rates. Actual returns
                may vary due to market conditions, compounding frequency, and other factors. Higher yield opportunities
                often come with increased risk.
              </p>
            </Alert>
          </div>
        </>
      )}
    </div>
  )
}

export default YieldComparison
