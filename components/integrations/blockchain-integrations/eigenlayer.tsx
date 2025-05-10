import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function EigenLayerIntegration() {
  return (
    <section id="eigenlayer-integration" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            EigenLayer Integration
            <SectionAnchor id="eigenlayer-integration" />
          </h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai integrates with EigenLayer to leverage its restaking capabilities, enhancing security and
            capital efficiency across the multi-chain architecture.
          </p>
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Restaking Capabilities:</strong> Ability to reuse staked assets for additional security and yield.
            </li>
            <li className="text-base font-normal">
              <strong>Enhanced Security:</strong> Increased cryptoeconomic security for the platform.
            </li>
            <li className="text-base font-normal">
              <strong>Capital Efficiency:</strong> Improved utilization of staked assets.
            </li>
            <li className="text-base font-normal">
              <strong>Decentralized Validation:</strong> Access to EigenLayer's network of validators.
            </li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Implementation Details</h3>
          <p className="mb-4 text-base font-normal">
            The EigenLayer integration is implemented through specialized modules in the Blockchain Connectors layer.
            These modules handle restaking operations, validator selection, and reward distribution.
          </p>
          <p className="text-base font-normal">
            EigenLayer's restaking technology enhances VeritasVault.ai's security model by allowing the platform to
            leverage the security of multiple staking pools, creating a more robust and resilient infrastructure for
            multi-chain portfolio management.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
