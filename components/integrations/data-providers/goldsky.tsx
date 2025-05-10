import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function GoldskyIntegration() {
  return (
    <section id="goldsky-integration" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Goldsky Integration
            <SectionAnchor id="goldsky-integration" />
          </h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai integrates with Goldsky's blockchain data infrastructure to access high-quality, reliable
            on-chain data across multiple networks for enhanced portfolio management and risk assessment.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>High-Performance Data Indexing:</strong> Fast and efficient access to blockchain data.
            </li>
            <li className="text-base font-normal">
              <strong>Multi-chain Support:</strong> Comprehensive coverage across various blockchain networks.
            </li>
            <li className="text-base font-normal">
              <strong>Custom Data Pipelines:</strong> Tailored data processing for specific portfolio management needs.
            </li>
            <li className="text-base font-normal">
              <strong>Real-time Data Streaming:</strong> Continuous data updates for timely decision-making.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Implementation Details</h3>
          <p className="mb-4 text-base font-normal">
            The Goldsky integration is implemented through a specialized adapter in the Data Processing Layer. This
            adapter handles data queries, transformation, and integration with the Core Protocol.
          </p>
          <p className="text-base font-normal">
            Goldsky's robust data infrastructure enhances VeritasVault.ai's ability to analyze on-chain activities,
            monitor smart contract interactions, and track asset movements across multiple blockchain networks,
            providing valuable insights for portfolio optimization and risk management.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
