import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function MonteCarloSimulation() {
  return (
    <section id="monte-carlo-simulation" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Monte Carlo Simulation
            <SectionAnchor id="monte-carlo-simulation" />
          </h2>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai implements advanced Monte Carlo simulation techniques to model the potential future
            performance of multi-chain portfolios under various market scenarios. These simulations provide valuable
            insights into portfolio risk, return potential, and the impact of different investment strategies across
            multiple blockchain networks.
          </p>

          <h3 className="text-xl font-semibold mb-2">Simulation Methodology</h3>
          <p className="mb-4 text-base font-normal">
            The Monte Carlo simulation engine generates thousands of potential future scenarios based on historical
            data, statistical models, and user-defined parameters. These scenarios are then analyzed to provide a
            comprehensive view of portfolio performance under different market conditions.
          </p>

          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-2">Technical Implementation</h4>
            <p className="mb-2 text-base font-normal">The simulation process involves several key steps:</p>
            <ol className="list-decimal pl-6 space-y-1">
              <li className="text-base font-normal">
                <strong>Data Preparation:</strong> Historical price data, volatility, correlations, and on-chain metrics
                are collected and processed.
              </li>
              <li className="text-base font-normal">
                <strong>Model Calibration:</strong> Statistical models are calibrated to capture the unique
                characteristics of crypto assets, including fat-tailed distributions and regime-switching behavior.
              </li>
              <li className="text-base font-normal">
                <strong>Scenario Generation:</strong> Thousands of potential future price paths are generated for each
                asset in the portfolio.
              </li>
              <li className="text-base font-normal">
                <strong>Portfolio Evaluation:</strong> The portfolio's performance is evaluated under each scenario,
                considering cross-chain interactions and constraints.
              </li>
              <li className="text-base font-normal">
                <strong>Results Analysis:</strong> The simulation results are analyzed to extract key metrics and
                insights.
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-semibold mb-2">Crypto-Specific Adaptations</h3>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai has made several adaptations to traditional Monte Carlo simulation techniques to better
            address the unique characteristics of crypto assets and multi-chain environments:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="text-lg font-semibold mb-1">Non-Normal Return Distributions</h4>
              <p className="text-base font-normal">
                Instead of assuming normal distributions, the simulation uses more appropriate distributions such as
                t-distributions or mixture models to capture the fat tails and extreme events common in crypto markets.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">Regime-Switching Models</h4>
              <p className="text-base font-normal">
                The simulation incorporates regime-switching models to capture the distinct market regimes (bull, bear,
                and sideways) observed in crypto markets, with different volatility and correlation parameters for each
                regime.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">On-Chain Data Integration</h4>
              <p className="text-base font-normal">
                The simulation incorporates on-chain metrics such as network activity, token velocity, and smart
                contract interactions to provide a more comprehensive view of asset behavior.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">Cross-Chain Dependency Modeling</h4>
              <p className="text-base font-normal">
                The simulation models dependencies between different blockchain networks, capturing how events on one
                chain can impact assets on another chain.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Applications in Portfolio Management</h3>
          <p className="mb-4 text-base font-normal">
            Monte Carlo simulation provides several valuable applications for multi-chain portfolio management:
          </p>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li className="text-base font-normal">
              <strong>Risk Assessment:</strong> Quantifying the probability of different loss levels and identifying
              potential tail risks across multiple blockchain networks.
            </li>
            <li className="text-base font-normal">
              <strong>Strategy Evaluation:</strong> Testing different investment strategies under various market
              scenarios to identify robust approaches.
            </li>
            <li className="text-base font-normal">
              <strong>Portfolio Optimization:</strong> Identifying optimal asset allocations across different blockchain
              networks that balance risk and return objectives.
            </li>
            <li className="text-base font-normal">
              <strong>Stress Testing:</strong> Evaluating portfolio performance under extreme market conditions,
              including cross-chain contagion scenarios.
            </li>
            <li className="text-base font-normal">
              <strong>Retirement Planning:</strong> Assessing the probability of achieving long-term financial goals
              through crypto investments across multiple blockchain networks.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-2">Benefits for Multi-Chain Portfolio Management</h3>
          <p className="text-base font-normal">
            Monte Carlo simulation provides several key benefits for multi-chain portfolio management:
          </p>

          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li className="text-base font-normal">
              <strong>Comprehensive Risk Assessment:</strong> By simulating thousands of potential scenarios, Monte
              Carlo provides a more complete view of portfolio risk than traditional metrics.
            </li>
            <li className="text-base font-normal">
              <strong>Forward-Looking Analysis:</strong> Unlike historical analysis, Monte Carlo simulation is
              forward-looking, helping investors prepare for future market conditions.
            </li>
            <li className="text-base font-normal">
              <strong>Cross-Chain Insights:</strong> The simulation captures interactions between different blockchain
              networks, providing insights into cross-chain diversification benefits and risks.
            </li>
            <li className="text-base font-normal">
              <strong>Probabilistic Thinking:</strong> Monte Carlo encourages investors to think in terms of
              probabilities rather than point estimates, leading to more robust decision-making.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
