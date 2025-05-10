import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function EtherLinkIntegration() {
  return (
    <section id="etherlink-integration" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            EtherLink Integration
            <SectionAnchor id="etherlink-integration" />
          </h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai integrates with EtherLink to enable efficient cross-chain communication and data transfer
            within its multi-chain architecture.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Cross-chain Messaging:</strong> Secure and efficient communication between different blockchain
              networks.
            </li>
            <li className="text-base font-normal">
              <strong>Data Transfer:</strong> Reliable transfer of data across multiple chains.
            </li>
            <li className="text-base font-normal">
              <strong>Transaction Verification:</strong> Cryptographic verification of cross-chain transactions.
            </li>
            <li className="text-base font-normal">
              <strong>Interoperability:</strong> Enhanced compatibility between different blockchain protocols.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Implementation Details</h3>
          <p className="mb-4 text-base font-normal">
            The EtherLink integration is implemented through specialized adapters in the Blockchain Connectors layer.
            These adapters handle cross-chain communication, data verification, and transaction routing.
          </p>
          <p className="text-base font-normal">
            EtherLink's cross-chain communication protocol enhances VeritasVault.ai's ability to coordinate operations
            across multiple blockchain networks, enabling seamless portfolio management and risk assessment across the
            entire multi-chain architecture.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
