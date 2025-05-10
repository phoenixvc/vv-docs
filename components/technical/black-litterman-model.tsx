import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function BlackLittermanModel() {
  return (
    <section id="black-litterman" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Black-Litterman Model
            <SectionAnchor id="black-litterman" />
          </h2>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai implements an enhanced version of the Black-Litterman model, adapted for the unique
            characteristics of crypto assets and multi-chain portfolio management. This sophisticated approach combines
            market equilibrium with investor views to create optimal portfolio allocations across multiple blockchain
            networks.
          </p>

          <h3 className="text-xl font-semibold mb-2">Model Overview</h3>
          <p className="mb-4 text-base font-normal">
            The Black-Litterman model starts with a market equilibrium portfolio and then incorporates investor views to
            generate a new set of expected returns. These expected returns are then used to optimize the portfolio
            allocation. VeritasVault.ai's implementation extends this approach to account for the unique characteristics
            of crypto assets and multi-chain environments.
          </p>

          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-2">Mathematical Foundation</h4>
            <p className="mb-2 text-base font-normal">
              The Black-Litterman model combines the market equilibrium portfolio with investor views using Bayesian
              statistics. The formula for the new expected returns (E[R]) is:
            </p>
            <div className="bg-background p-3 rounded-md font-mono text-sm overflow-x-auto">
              E[R] = [(τΣ)^(-1) + P'Ω^(-1)P]^(-1) × [(τΣ)^(-1)Π + P'Ω^(-1)Q]
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Where Π is the market equilibrium returns, P is the view matrix, Q is the view returns, Σ is the
              covariance matrix, Ω is the uncertainty in views, and τ is a scaling parameter.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-2">Crypto-Specific Adaptations</h3>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai has made several adaptations to the traditional Black-Litterman model to better suit the
            crypto asset class:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="text-lg font-semibold mb-1">Dynamic Market Equilibrium</h4>
              <p className="text-base font-normal">
                Instead of using a static market capitalization-weighted portfolio as the equilibrium, VeritasVault.ai
                implements a dynamic equilibrium that accounts for the rapidly changing nature of crypto markets.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">Multi-Chain Risk Factors</h4>
              <p className="text-base font-normal">
                The model incorporates blockchain-specific risk factors, such as network security, decentralization
                metrics, and cross-chain interoperability, to better assess the risk-return profile of assets across
                different chains.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">On-Chain Data Integration</h4>
              <p className="text-base font-normal">
                VeritasVault.ai enriches the model with on-chain data, including transaction volumes, active addresses,
                and smart contract interactions, providing a more comprehensive view of asset fundamentals.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">Sentiment Analysis</h4>
              <p className="text-base font-normal">
                The model incorporates sentiment analysis from social media and news sources, using natural language
                processing to gauge market sentiment and adjust expected returns accordingly.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Implementation in VeritasVault.ai</h3>
          <p className="mb-4 text-base font-normal">
            The enhanced Black-Litterman model is implemented in the Core Protocol's Portfolio Optimization Engine. The
            implementation follows these steps:
          </p>

          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li className="text-base font-normal">
              <strong>Market Equilibrium Calculation:</strong> Compute the dynamic market equilibrium based on market
              capitalization, liquidity, and on-chain metrics.
            </li>
            <li className="text-base font-normal">
              <strong>View Generation:</strong> Generate views based on quantitative analysis, on-chain data, and
              sentiment analysis.
            </li>
            <li className="text-base font-normal">
              <strong>Model Calibration:</strong> Calibrate the model parameters based on historical performance and
              market conditions.
            </li>
            <li className="text-base font-normal">
              <strong>Expected Return Calculation:</strong> Compute the new expected returns using the Black-Litterman
              formula.
            </li>
            <li className="text-base font-normal">
              <strong>Portfolio Optimization:</strong> Use the expected returns to optimize the portfolio allocation
              across multiple blockchain networks.
            </li>
            <li className="text-base font-normal">
              <strong>Rebalancing Recommendations:</strong> Generate rebalancing recommendations based on the optimized
              portfolio and current holdings.
            </li>
          </ol>

          <h3 className="text-xl font-semibold mb-2">Benefits for Multi-Chain Portfolio Management</h3>
          <p className="text-base font-normal">
            The enhanced Black-Litterman model provides several benefits for multi-chain portfolio management:
          </p>

          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li className="text-base font-normal">
              <strong>Improved Risk-Adjusted Returns:</strong> By incorporating investor views and market equilibrium,
              the model generates portfolios with better risk-adjusted returns.
            </li>
            <li className="text-base font-normal">
              <strong>Cross-Chain Diversification:</strong> The model optimizes asset allocation across multiple
              blockchain networks, reducing blockchain-specific risks.
            </li>
            <li className="text-base font-normal">
              <strong>Adaptive to Market Changes:</strong> The dynamic nature of the model allows it to adapt to rapidly
              changing market conditions in the crypto space.
            </li>
            <li className="text-base font-normal">
              <strong>Quantitative Rigor:</strong> The mathematical foundation of the model provides a rigorous approach
              to portfolio optimization, reducing emotional biases in investment decisions.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
