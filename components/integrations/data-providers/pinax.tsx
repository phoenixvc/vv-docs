import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function PinaxIntegration() {
  return (
    <section id="pinax-integration" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Pinax Integration
            <SectionAnchor id="pinax-integration" />
          </h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai leverages Pinax's advanced data indexing and querying capabilities to access comprehensive
            on-chain data across multiple blockchain networks.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Multi-chain Data Indexing:</strong> Efficient indexing of data across various blockchain networks.
            </li>
            <li className="text-base font-normal">
              <strong>Real-time Data Access:</strong> Low-latency access to on-chain data for timely decision-making.
            </li>
            <li className="text-base font-normal">
              <strong>Historical Data Analysis:</strong> Comprehensive historical data for trend analysis and
              backtesting.
            </li>
            <li className="text-base font-normal">
              <strong>Custom Data Queries:</strong> Flexible query capabilities for specific data requirements.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Implementation Details</h3>
          <p className="mb-4 text-base font-normal">
            The Pinax integration is implemented through a dedicated connector in the Data Processing Layer. This
            connector handles data queries, response processing, and caching to ensure efficient access to on-chain
            data.
          </p>
          <p className="text-base font-normal">
            Pinax's data indexing capabilities are particularly valuable for VeritasVault.ai's multi-chain architecture,
            as they provide a unified interface for accessing data across different blockchain networks, enabling more
            comprehensive portfolio analysis and risk assessment.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
