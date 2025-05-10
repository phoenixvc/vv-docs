import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function DataProviders() {
  return (
    <section id="data-providers" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Data Providers
            <SectionAnchor id="data-providers" />
          </h2>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai integrates with leading data providers to ensure accurate, reliable, and comprehensive
            market data for portfolio management and risk assessment. These integrations enable real-time data analysis
            and informed decision-making across multiple blockchain networks.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold">Key Benefits of Data Provider Integrations:</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Real-time market data across multiple blockchains</li>
                <li>Comprehensive protocol analytics for risk assessment</li>
                <li>Historical data for backtesting and model training</li>
                <li>Reliable price feeds for accurate portfolio valuation</li>
                <li>Cross-chain liquidity insights for optimal trade execution</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
