import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function FactorModels() {
  return (
    <section id="factor-models" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Factor Models
            <SectionAnchor id="factor-models" />
          </h2>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai implements sophisticated factor models to analyze and predict the performance of crypto
            assets across multiple blockchain networks. These models identify the key drivers of returns and risks,
            enabling more effective portfolio construction and risk management in the multi-chain environment.
          </p>

          <h3 className="text-xl font-semibold mb-2">Model Framework</h3>
          <p className="mb-4 text-base font-normal">
            The factor model framework decomposes asset returns into systematic factors and idiosyncratic components,
            providing a structured approach to understanding the drivers of performance across different blockchain
            networks.
          </p>

          <div className="bg-muted/30 p-4 rounded-lg mb-6">
            <h4 className="text-lg font-semibold mb-2">Mathematical Foundation</h4>
            <p className="mb-2 text-base font-normal">The multi-chain factor model can be expressed as:</p>
            <div className="bg-background p-3 rounded-md font-mono text-sm overflow-x-auto">
              R_i = α_i + β_i1 × F_1 + β_i2 × F_2 + ... + β_ik × F_k + ε_i
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Where R_i is the return of asset i, α_i is the asset-specific return, β_ij is the sensitivity of asset i
              to factor j, F_j is the return of factor j, and ε_i is the idiosyncratic return component.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-2">Crypto-Specific Factors</h3>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai has identified and incorporated several crypto-specific factors that drive returns across
            different blockchain networks:
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h4 className="text-lg font-semibold mb-1">Market Beta</h4>
              <p className="text-base font-normal">
                Measures an asset's sensitivity to the overall crypto market, capturing systematic market risk across
                blockchain networks.
              </p>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">Network Value Factor</h4>
              <p className="text-base font-normal">
                Captures the relationship between an asset's price and its network activity metrics such as active
                addresses, transaction volume, and network growth.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">Liquidity Factor</h4>
              <p className="text-base font-normal">
                Measures the impact of liquidity on asset returns, accounting for differences in liquidity across
                different blockchain networks and trading venues.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">Momentum Factor</h4>
              <p className="text-base font-normal">
                Captures the tendency of assets with strong recent performance to continue outperforming in the near
                term, with adjustments for the unique momentum characteristics of crypto markets.
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">Volatility Factor</h4>
              <p className="text-base font-normal">
                Measures the impact of volatility on asset returns, with specific attention to the extreme volatility
                events common in crypto markets.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="text-lg font-semibold mb-1">Blockchain-Specific Factors</h4>
              <p className="text-base font-normal">
                Captures the unique characteristics of different blockchain networks, including consensus mechanisms,
                scalability, security, and ecosystem development.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Cross-Chain Factor Analysis</h3>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai extends traditional factor analysis to the multi-chain environment through several
            innovative approaches:
          </p>

          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li className="text-base font-normal">
              <strong>Cross-Chain Factor Identification:</strong> Identifying factors that affect assets across multiple
              blockchain networks, such as overall market sentiment, regulatory developments, and macroeconomic trends.
            </li>
            <li className="text-base font-normal">
              <strong>Chain-Specific Factor Analysis:</strong> Analyzing factors that are specific to particular
              blockchain networks, such as governance decisions, protocol upgrades, and ecosystem growth.
            </li>
            <li className="text-base font-normal">
              <strong>Factor Interaction Modeling:</strong> Modeling how factors interact across different blockchain
              networks, capturing spillover effects and contagion dynamics.
            </li>
            <li className="text-base font-normal">
              <strong>Time-Varying Factor Exposures:</strong> Accounting for how factor exposures change over time and
              across different market regimes, particularly during periods of market stress.
            </li>
            <li className="text-base font-normal">
              <strong>Factor-Based Risk Decomposition:</strong> Breaking down portfolio risk into contributions from
              different factors across multiple blockchain networks, enabling more targeted risk management.
            </li>
          </ol>

          <h3 className="text-xl font-semibold mb-2">Applications in Portfolio Management</h3>
          <p className="text-base font-normal">
            Factor models provide several valuable applications for multi-chain portfolio management:
          </p>

          <ul className="list-disc pl-6 space-y-1 mt-2">
            <li className="text-base font-normal">
              <strong>Risk Factor Exposure Management:</strong> Controlling exposure to specific risk factors across
              different blockchain networks to achieve desired risk characteristics.
            </li>
            <li className="text-base font-normal">
              <strong>Factor-Based Portfolio Construction:</strong> Building portfolios that target specific factor
              exposures to achieve desired return and risk profiles.
            </li>
            <li className="text-base font-normal">
              <strong>Performance Attribution:</strong> Analyzing portfolio performance in terms of factor exposures to
              better understand the sources of returns and risks.
            </li>
            <li className="text-base font-normal">
              <strong>Cross-Chain Diversification:</strong> Identifying diversification opportunities across different
              blockchain networks based on factor exposures.
            </li>
            <li className="text-base font-normal">
              <strong>Smart Beta Strategies:</strong> Developing systematic investment strategies that target specific
              factors with attractive risk-return characteristics.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
