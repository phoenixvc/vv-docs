import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function FinanceModelsOverview() {
  return (
    <section id="finance-models" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Finance Models
            <SectionAnchor id="finance-models" />
          </h2>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai employs sophisticated financial models to optimize portfolio management across multiple
            blockchain networks. These models are specifically adapted for the unique characteristics of crypto assets,
            incorporating on-chain data, market sentiment, and cross-chain risk factors to provide comprehensive
            portfolio optimization and risk management.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-xl font-semibold mb-2">Modern Portfolio Theory Adaptations</h3>
              <p className="mb-2 text-base font-normal">
                VeritasVault.ai extends traditional Modern Portfolio Theory (MPT) to address the unique characteristics
                of crypto assets and multi-chain environments.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>Enhanced Black-Litterman Model:</strong> Combines market equilibrium with investor views,
                  adapted for crypto-specific factors and on-chain data.
                </li>
                <li className="text-base font-normal">
                  <strong>Cross-Chain Correlation Analysis:</strong> Analyzes correlations between assets across
                  different blockchain networks to optimize diversification.
                </li>
                <li className="text-base font-normal">
                  <strong>Non-Normal Distribution Handling:</strong> Accounts for the fat-tailed distributions and
                  extreme volatility common in crypto markets.
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Risk Management Models</h3>
              <p className="mb-2 text-base font-normal">
                Comprehensive risk assessment models that identify, quantify, and mitigate various types of risks in
                multi-chain portfolios.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>Value at Risk (VaR) Extensions:</strong> Modified VaR calculations that account for
                  crypto-specific risk factors and cross-chain dependencies.
                </li>
                <li className="text-base font-normal">
                  <strong>Protocol Risk Assessment:</strong> Quantitative models for evaluating smart contract risks,
                  governance risks, and economic vulnerabilities of DeFi protocols.
                </li>
                <li className="text-base font-normal">
                  <strong>Liquidity Risk Modeling:</strong> Advanced models for assessing liquidity across different
                  blockchain networks and DEXs.
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Predictive Analytics</h3>
              <p className="mb-2 text-base font-normal">
                Machine learning and statistical models that forecast market trends and identify investment
                opportunities across multiple blockchain networks.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>Time Series Analysis:</strong> Advanced time series models adapted for the high volatility and
                  non-stationarity of crypto markets.
                </li>
                <li className="text-base font-normal">
                  <strong>On-Chain Activity Forecasting:</strong> Models that predict future network activity and
                  adoption based on on-chain metrics.
                </li>
                <li className="text-base font-normal">
                  <strong>Sentiment Analysis Integration:</strong> NLP models that analyze social media, news, and
                  community discussions to gauge market sentiment.
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-xl font-semibold mb-2">Optimization Algorithms</h3>
              <p className="mb-2 text-base font-normal">
                Sophisticated optimization techniques that balance risk, return, and constraints across multiple
                blockchain networks.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li className="text-base font-normal">
                  <strong>Multi-Objective Optimization:</strong> Balances multiple objectives such as return
                  maximization, risk minimization, and gas fee optimization.
                </li>
                <li className="text-base font-normal">
                  <strong>Cross-Chain Rebalancing:</strong> Optimizes portfolio rebalancing across different blockchain
                  networks, considering transaction costs and slippage.
                </li>
                <li className="text-base font-normal">
                  <strong>Constraint Handling:</strong> Incorporates various constraints such as liquidity requirements,
                  gas fees, and cross-chain bridge limits.
                </li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Integration with Multi-Chain Architecture</h3>
          <p className="text-base font-normal">
            These financial models are deeply integrated with VeritasVault.ai's multi-chain architecture, enabling
            seamless portfolio management across different blockchain networks. The models leverage data from various
            sources, including on-chain metrics, market data providers, and sentiment analysis, to provide comprehensive
            portfolio optimization and risk management. This integration allows users to make informed investment
            decisions based on a holistic view of the crypto ecosystem, taking advantage of opportunities across
            multiple blockchain networks while managing the associated risks.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
