import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function CoinGeckoIntegration() {
  return (
    <section id="coingecko-integration" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            CoinGecko Integration
            <SectionAnchor id="coingecko-integration" />
          </h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai integrates with CoinGecko's comprehensive cryptocurrency data API to provide accurate and
            up-to-date market information for portfolio management and risk assessment.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Comprehensive Market Data:</strong> Access to price, volume, market cap, and other key metrics for
              thousands of cryptocurrencies.
            </li>
            <li className="text-base font-normal">
              <strong>Historical Data:</strong> Extensive historical data for backtesting and trend analysis.
            </li>
            <li className="text-base font-normal">
              <strong>Real-time Updates:</strong> Frequent data updates to ensure timely decision-making.
            </li>
            <li className="text-base font-normal">
              <strong>Multi-currency Support:</strong> Data available in multiple fiat currencies for global users.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Implementation Details</h3>
          <p className="mb-4 text-base font-normal">
            The CoinGecko integration is implemented through a dedicated adapter in the Data Processing Layer. This
            adapter handles API authentication, rate limiting, data normalization, and caching to ensure efficient and
            reliable data access.
          </p>
          <p className="text-base font-normal">
            Data from CoinGecko is combined with information from other sources to create a comprehensive market view,
            which is then used by the Core Protocol for portfolio optimization and risk management.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
