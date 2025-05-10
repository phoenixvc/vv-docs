import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function PluralityIntegration() {
  return (
    <section id="plurality-integration" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Plurality Integration
            <SectionAnchor id="plurality-integration" />
          </h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai integrates with Plurality's advanced wallet infrastructure to provide secure, user-friendly
            multi-chain wallet capabilities for portfolio management.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Multi-chain Support:</strong> Seamless management of assets across various blockchain networks.
            </li>
            <li className="text-base font-normal">
              <strong>Enhanced Security:</strong> Advanced cryptographic security for user assets.
            </li>
            <li className="text-base font-normal">
              <strong>User-friendly Interface:</strong> Intuitive wallet experience for portfolio management.
            </li>
            <li className="text-base font-normal">
              <strong>Cross-chain Transactions:</strong> Simplified execution of transactions across different
              blockchains.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Implementation Details</h3>
          <p className="mb-4 text-base font-normal">
            The Plurality integration is implemented through a specialized connector in the Security Layer. This
            connector handles wallet operations, transaction signing, and user authentication.
          </p>
          <p className="text-base font-normal">
            Plurality's advanced wallet technology enhances VeritasVault.ai's ability to provide secure, seamless
            multi-chain portfolio management, enabling users to interact with various blockchain networks through a
            unified interface.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
