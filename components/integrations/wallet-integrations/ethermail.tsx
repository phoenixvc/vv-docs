import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function EtherMailIntegration() {
  return (
    <section id="ethermail-integration" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            EtherMail Integration
            <SectionAnchor id="ethermail-integration" />
          </h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai integrates with EtherMail to provide secure, decentralized communication and wallet
            functionality for users managing multi-chain portfolios.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Secure Authentication:</strong> Decentralized identity verification for platform access.
            </li>
            <li className="text-base font-normal">
              <strong>Multi-chain Wallet Support:</strong> Seamless management of assets across multiple blockchains.
            </li>
            <li className="text-base font-normal">
              <strong>Encrypted Communications:</strong> Secure messaging for portfolio alerts and notifications.
            </li>
            <li className="text-base font-normal">
              <strong>Transaction Signing:</strong> Secure approval of cross-chain transactions.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Implementation Details</h3>
          <p className="mb-4 text-base font-normal">
            The EtherMail integration is implemented through a dedicated connector in the Security Layer. This connector
            handles user authentication, transaction signing, and secure communications.
          </p>
          <p className="text-base font-normal">
            EtherMail's decentralized approach to identity and communication aligns with VeritasVault.ai's commitment to
            security and user privacy in multi-chain portfolio management.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
