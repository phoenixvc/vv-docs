import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function WalletIntegrations() {
  return (
    <section id="wallet-integrations" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Wallet Integrations
            <SectionAnchor id="wallet-integrations" />
          </h2>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai provides seamless wallet integrations to enable secure, user-friendly access to multi-chain
            portfolio management. These integrations prioritize security, user experience, and cross-chain
            compatibility.
          </p>

          <div className="space-y-4">
            <div className="border-l-4 border-primary pl-4">
              <h3 className="text-lg font-semibold">Key Benefits of Wallet Integrations:</h3>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Secure authentication and transaction signing</li>
                <li>Multi-chain asset management from a single interface</li>
                <li>Simplified user onboarding and experience</li>
                <li>Enhanced security through hardware wallet support</li>
                <li>Seamless cross-chain transactions and portfolio rebalancing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
