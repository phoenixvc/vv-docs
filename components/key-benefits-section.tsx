import { Card, CardContent } from "@/components/ui/card"

export function KeyBenefitsSection() {
  return (
    <section id="key-benefits">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>

          <h3 className="text-xl font-semibold mt-4 mb-2">Multi-Chain Interoperability</h3>
          <p className="mb-4 text-base font-normal">
            Seamlessly interact with multiple blockchain networks through a unified interface, eliminating the need to
            manage separate wallets and applications for different chains. Our architecture enables frictionless
            cross-chain transactions and portfolio management.
          </p>

          <h3 className="text-xl font-semibold mt-4 mb-2">Enhanced Security</h3>
          <p className="mb-4 text-base font-normal">
            Benefit from our multi-layered security approach that combines on-chain security measures with advanced
            off-chain monitoring systems. Our architecture distributes risk across multiple chains while implementing
            robust verification protocols to protect against attacks.
          </p>

          <h3 className="text-xl font-semibold mt-4 mb-2">Advanced Risk Management</h3>
          <p className="mb-4 text-base font-normal">
            Leverage sophisticated risk assessment tools powered by machine learning algorithms and real-time data
            analytics. Our platform continuously monitors market conditions and portfolio performance to identify
            potential risks and opportunities.
          </p>

          <h3 className="text-xl font-semibold mt-4 mb-2">Optimized Performance</h3>
          <p className="mb-4 text-base font-normal">
            Achieve superior portfolio performance through our intelligent asset allocation strategies and automated
            rebalancing mechanisms. Our architecture selects the most efficient chains for different operations,
            minimizing fees and maximizing returns.
          </p>

          <h3 className="text-xl font-semibold mt-4 mb-2">Transparent Governance</h3>
          <p className="text-base font-normal">
            Participate in a decentralized governance system that ensures all stakeholders have a voice in the
            platform's development. Our transparent decision-making processes and on-chain voting mechanisms create a
            truly community-driven ecosystem.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
