import { Card, CardContent } from "@/components/ui/card"

export function ProjectOverviewSection() {
  return (
    <section id="project-overview">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai is a pioneering multi-chain architecture designed to revolutionize portfolio management in
            the decentralized finance space. Our platform leverages the unique capabilities of multiple blockchain
            networks to create a secure, efficient, and transparent system for managing digital assets.
          </p>
          <p className="mb-4 text-base font-normal">
            At its core, VeritasVault.ai addresses the critical challenges faced by DeFi users today: fragmented
            liquidity across chains, complex cross-chain operations, security vulnerabilities, and limited risk
            management tools. By building a unified interface that seamlessly connects to multiple blockchains, we
            enable users to manage their entire portfolio from a single dashboard while maintaining the highest
            standards of security and transparency.
          </p>
          <p className="text-base font-normal">
            Our architecture incorporates advanced machine learning algorithms, real-time data analytics, and
            sophisticated risk management protocols to optimize portfolio performance while minimizing exposure to
            market volatility and security threats. Through strategic partnerships with leading blockchain protocols and
            data providers, VeritasVault.ai creates a comprehensive ecosystem that empowers users to make informed
            investment decisions across the decentralized landscape.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
