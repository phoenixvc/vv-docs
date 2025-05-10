"use client"

import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

interface ArchitectureSectionProps {
  id?: string
  isPrintMode?: boolean
}

export function ArchitectureSection({ id = "architecture", isPrintMode = false }: ArchitectureSectionProps) {
  return (
    <section id={id} className={isPrintMode ? "" : "scroll-mt-20"}>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            System Architecture
            {!isPrintMode && <SectionAnchor id={id} />}
          </h2>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai employs a modular, multi-layered architecture designed to provide secure, scalable, and
            efficient portfolio management across multiple blockchain networks. The architecture consists of several key
            layers:
          </p>

          <div className="space-y-6 mb-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Application Layer</h3>
              <p className="text-base font-normal">
                The top-most layer that provides user interfaces and APIs for interacting with the platform. This layer
                includes web applications, mobile apps, and programmatic interfaces for developers.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Business Logic Layer</h3>
              <p className="text-base font-normal">
                Implements the core functionality of the platform, including portfolio optimization algorithms, risk
                management strategies, and governance mechanisms. This layer processes user requests and coordinates
                actions across the system.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Data Processing Layer</h3>
              <p className="text-base font-normal">
                Responsible for collecting, cleaning, and processing data from various sources, including on-chain data,
                market data, and user-generated data. This layer provides the necessary inputs for the business logic
                layer.
              </p>
            </div>

            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Blockchain Integration Layer</h3>
              <p className="text-base font-normal">
                Connects the platform to various blockchain networks, enabling cross-chain operations and asset
                management. This layer includes specialized connectors for each supported blockchain.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="text-lg font-semibold mb-2">Security Layer</h3>
              <p className="text-base font-normal">
                Provides comprehensive security infrastructure that protects the platform from various threats and
                ensures the integrity of operations. This layer includes authentication, authorization, encryption, and
                audit mechanisms.
              </p>
            </div>
          </div>

          <p className="text-base font-normal">
            These layers work together to provide a secure, efficient, and user-friendly platform for multi-chain
            portfolio management. The modular design allows for flexibility, scalability, and adaptability to changing
            market conditions and user needs.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
