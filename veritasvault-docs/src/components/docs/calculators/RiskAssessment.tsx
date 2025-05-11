"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { RiskAssessmentProps, RiskProject } from "./types"
import styles from "./RiskAssessment.module.css"
import { Alert } from "../../common"
import { Radar } from "react-chartjs-2"
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from "chart.js"

// Register ChartJS components
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const defaultProjects: RiskProject[] = [
  {
    name: "Ethereum DeFi Project",
    auditScore: 95,
    tvl: 500000000,
    timeInMarket: 1095,
    hackHistory: 0,
  },
  {
    name: "Solana Protocol",
    auditScore: 82,
    tvl: 150000000,
    timeInMarket: 548,
    hackHistory: 1,
    exploitImpact: 5,
  },
  {
    name: "Polygon Bridge",
    auditScore: 88,
    tvl: 300000000,
    timeInMarket: 730,
    hackHistory: 1,
    exploitImpact: 2,
  },
  {
    name: "New Chain DEX",
    auditScore: 65,
    tvl: 50000000,
    timeInMarket: 120,
    hackHistory: 0,
  },
  {
    name: "Experimental L2",
    auditScore: 70,
    tvl: 75000000,
    timeInMarket: 180,
    hackHistory: 2,
    exploitImpact: 15,
  },
]

const RiskAssessment: React.FC<RiskAssessmentProps> = ({
  className,
  title = "Multi-Chain Protocol Risk Assessment",
  description = "Evaluate the risk profile of blockchain protocols and DeFi projects",
  projects = defaultProjects,
}) => {
  const [selectedProjects, setSelectedProjects] = useState<string[]>(projects.slice(0, 3).map((p) => p.name))
  const [riskScores, setRiskScores] = useState<Record<string, Record<string, number>>>({})

  // Calculate risk scores when selected projects change
  useEffect(() => {
    const calculatedScores: Record<string, Record<string, number>> = {}

    projects.forEach((project) => {
      if (selectedProjects.includes(project.name)) {
        // Calculate various risk metrics (normalized to 0-100 scale)
        const securityScore = project.auditScore

        // Time in market risk (newer = higher risk)
        // 3 years (1095 days) or more is considered low risk (score of 100)
        const timeInMarketScore = Math.min(100, (project.timeInMarket / 1095) * 100)

        // TVL risk (lower TVL = higher risk)
        // $500M or more is considered low risk (score of 100)
        const tvlScore = Math.min(100, (project.tvl / 500000000) * 100)

        // Hack history (more hacks = higher risk)
        // 0 hacks is score of 100, each hack reduces by 25 points
        const hackHistoryScore = Math.max(0, 100 - project.hackHistory * 25)

        // Impact of exploits (higher impact = higher risk)
        // If no exploits, score is 100
        // Otherwise, score is 100 minus the highest impact percentage
        const exploitImpactScore = project.hackHistory === 0 ? 100 : Math.max(0, 100 - (project.exploitImpact || 10))

        // Overall score is weighted average of all factors
        const overallScore =
          securityScore * 0.3 +
          timeInMarketScore * 0.2 +
          tvlScore * 0.2 +
          hackHistoryScore * 0.15 +
          exploitImpactScore * 0.15

        calculatedScores[project.name] = {
          security: securityScore,
          timeInMarket: timeInMarketScore,
          tvl: tvlScore,
          hackHistory: hackHistoryScore,
          exploitImpact: exploitImpactScore,
          overall: overallScore,
        }
      }
    })

    setRiskScores(calculatedScores)
  }, [selectedProjects, projects])

  // Prepare chart data
  const chartData = {
    labels: ["Security Audit", "Time in Market", "TVL Size", "Hack History", "Exploit Impact"],
    datasets: Object.keys(riskScores).map((projectName, index) => {
      const colors = [
        "rgba(53, 162, 235, 0.7)",
        "rgba(255, 99, 132, 0.7)",
        "rgba(75, 192, 192, 0.7)",
        "rgba(255, 205, 86, 0.7)",
        "rgba(153, 102, 255, 0.7)",
      ]

      return {
        label: projectName,
        data: [
          riskScores[projectName].security,
          riskScores[projectName].timeInMarket,
          riskScores[projectName].tvl,
          riskScores[projectName].hackHistory,
          riskScores[projectName].exploitImpact,
        ],
        backgroundColor: colors[index % colors.length].replace("0.7", "0.2"),
        borderColor: colors[index % colors.length],
        borderWidth: 2,
      }
    }),
  }

  const chartOptions = {
    scales: {
      r: {
        min: 0,
        max: 100,
        beginAtZero: true,
        ticks: {
          stepSize: 20,
          callback: (value: number) => `${value}%`,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || ""
            const value = context.raw || 0
            return `${label}: ${value.toFixed(1)}%`
          },
        },
      },
    },
  }

  return (
    <div className={`${styles.container} ${className || ""}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>

      <div className={styles.projectSelector}>
        <h3>Select Projects to Compare (Max 5)</h3>
        <div className={styles.checkboxes}>
          {projects.map((project) => (
            <label key={project.name} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={selectedProjects.includes(project.name)}
                onChange={(e) => {
                  if (e.target.checked) {
                    // Limit to max 5 selections
                    if (selectedProjects.length < 5) {
                      setSelectedProjects([...selectedProjects, project.name])
                    }
                  } else {
                    setSelectedProjects(selectedProjects.filter((p) => p !== project.name))
                  }
                }}
                disabled={selectedProjects.length >= 5 && !selectedProjects.includes(project.name)}
                className={styles.checkbox}
              />
              {project.name}
              <span className={styles.tvlIndicator}>${(project.tvl / 1000000).toFixed(0)}M TVL</span>
            </label>
          ))}
        </div>
      </div>

      {selectedProjects.length === 0 && (
        <Alert type="warning" className={styles.alert}>
          Please select at least one project to assess its risk profile.
        </Alert>
      )}

      {selectedProjects.length > 0 && (
        <>
          <div className={styles.chartContainer}>
            <Radar data={chartData} options={chartOptions} />
          </div>

          <div className={styles.resultsTable}>
            <h3>Risk Assessment Results</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Security Audit</th>
                  <th>Market Maturity</th>
                  <th>TVL Score</th>
                  <th>Security History</th>
                  <th>Overall Risk Score</th>
                  <th>Risk Rating</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(riskScores).map((projectName) => {
                  const scores = riskScores[projectName]
                  let riskRating: string

                  if (scores.overall >= 85) riskRating = "Very Low"
                  else if (scores.overall >= 70) riskRating = "Low"
                  else if (scores.overall >= 50) riskRating = "Medium"
                  else if (scores.overall >= 35) riskRating = "High"
                  else riskRating = "Very High"

                  let riskClass: string
                  if (riskRating === "Very Low") riskClass = "veryLow"
                  else if (riskRating === "Low") riskClass = "low"
                  else if (riskRating === "Medium") riskClass = "medium"
                  else if (riskRating === "High") riskClass = "high"
                  else riskClass = "veryHigh"

                  return (
                    <tr key={projectName}>
                      <td>{projectName}</td>
                      <td>{scores.security.toFixed(1)}%</td>
                      <td>{scores.timeInMarket.toFixed(1)}%</td>
                      <td>{scores.tvl.toFixed(1)}%</td>
                      <td>{scores.hackHistory.toFixed(1)}%</td>
                      <td>{scores.overall.toFixed(1)}%</td>
                      <td>
                        <span className={`${styles.riskPill} ${styles[riskClass]}`}>{riskRating}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.projectDetails}>
            <h3>Project Details</h3>
            {selectedProjects.map((projectName) => {
              const project = projects.find((p) => p.name === projectName)
              if (!project) return null

              return (
                <div key={projectName} className={styles.projectCard}>
                  <h4>{project.name}</h4>
                  <div className={styles.projectDetail}>
                    <strong>TVL:</strong> ${(project.tvl / 1000000).toFixed(1)}M
                  </div>
                  <div className={styles.projectDetail}>
                    <strong>Time in Market:</strong> {(project.timeInMarket / 365).toFixed(1)} years (
                    {project.timeInMarket} days)
                  </div>
                  <div className={styles.projectDetail}>
                    <strong>Audit Score:</strong> {project.auditScore}/100
                  </div>
                  <div className={styles.projectDetail}>
                    <strong>Security Incidents:</strong> {project.hackHistory}{" "}
                    {project.hackHistory === 1 ? "incident" : "incidents"}
                    {project.hackHistory > 0 && project.exploitImpact !== undefined && (
                      <span> (Impact: {project.exploitImpact}% of TVL)</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className={styles.interpretation}>
            <h3>Risk Interpretation</h3>
            <div className={styles.interpretationContent}>
              <p>
                <strong>Security Audit:</strong> Higher scores indicate more thorough security audits and better code
                quality.
              </p>
              <p>
                <strong>Market Maturity:</strong> Higher scores indicate longer time in the market, suggesting more
                battle-testing.
              </p>
              <p>
                <strong>TVL Size:</strong> Higher scores indicate larger TVL, which often correlates with more security
                scrutiny.
              </p>
              <p>
                <strong>Security History:</strong> Higher scores indicate fewer security incidents or hacks.
              </p>
              <p>
                <strong>Overall Risk Score:</strong> A weighted average of all factors, normalized to a 0-100 scale
                where higher is better (less risky).
              </p>
            </div>
          </div>

          <div className={styles.disclaimer}>
            <Alert type="info">
              <p>
                <strong>Disclaimer:</strong> This risk assessment tool provides estimates based on available data. It
                should not be used as the sole basis for investment decisions. Always conduct your own research and
                consider consulting with financial and technical advisors before engaging with blockchain protocols.
              </p>
            </Alert>
          </div>
        </>
      )}
    </div>
  )
}

export default RiskAssessment
