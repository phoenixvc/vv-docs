import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function DeFiLlamaIntegration() {
  return (
    <section id="defillama-integration" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            DeFiLlama Integration
            <SectionAnchor id="defillama-integration" />
          </h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai leverages DeFiLlama's comprehensive DeFi protocol data to enhance portfolio management and
            risk assessment across multiple blockchain networks.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Protocol TVL Data:</strong> Accurate information on Total Value Locked across DeFi protocols.
            </li>
            <li className="text-base font-normal">
              <strong>Cross-chain Analytics:</strong> Comprehensive data across multiple blockchain networks.
            </li>
            <li className="text-base font-normal">
              <strong>Yield Information:</strong> Current and historical yield data for various DeFi protocols.
            </li>
            <li className="text-base font-normal">
              <strong>Protocol Health Metrics:</strong> Key indicators of protocol stability and security.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Implementation Details</h3>
          <p className="mb-4 text-base font-normal">
            The DeFiLlama integration is implemented through a specialized adapter in the Data Processing Layer. This
            adapter handles API requests, data normalization, and integration with the Core Protocol.
          </p>
          <p className="text-base font-normal">
            Data from DeFiLlama is particularly valuable for risk assessment, as it provides insights into protocol
            stability, liquidity, and market trends across the DeFi ecosystem.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
