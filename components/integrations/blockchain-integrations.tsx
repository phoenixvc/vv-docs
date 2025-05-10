import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function BlockchainIntegrations() {
  return (
    <section id="blockchain-integrations" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Blockchain Integrations
            <SectionAnchor id="blockchain-integrations" />
          </h2>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai's multi-chain architecture is built on strategic blockchain integrations that enhance
            security, scalability, and interoperability. These integrations form the foundation of our cross-chain
            portfolio management capabilities.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold">Key Benefits of Blockchain Integrations:</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Cross-chain communication and asset transfers</li>
                <li>Enhanced security through distributed validation</li>
                <li>Improved scalability and transaction throughput</li>
                <li>Access to diverse DeFi ecosystems and opportunities</li>
                <li>Reduced dependency on any single blockchain network</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
