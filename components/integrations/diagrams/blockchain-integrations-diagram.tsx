import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function BlockchainIntegrationsDiagram() {
  return (
    <section id="blockchain-integrations-diagram" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Blockchain Integrations Architecture
            <SectionAnchor id="blockchain-integrations-diagram" />
          </h2>

          <p className="mb-6 text-base font-normal">
            The diagram below illustrates how VeritasVault.ai integrates with blockchain networks to create a secure,
            scalable multi-chain architecture for portfolio management.
          </p>

          <div className="w-full overflow-auto bg-white dark:bg-gray-900 p-4 rounded-lg border border-border">
            <svg
              width="100%"
              height="500"
              viewBox="0 0 800 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              {/* Main Platform */}
              <rect
                x="300"
                y="200"
                width="200"
                height="100"
                rx="8"
                fill="#f1f5f9"
                stroke="#0f172a"
                strokeWidth="2"
                className="dark:fill-gray-800 dark:stroke-gray-200"
              />
              <text
                x="400"
                y="250"
                textAnchor="middle"
                fill="#0f172a"
                className="text-sm font-medium dark:fill-gray-200"
              >
                VeritasVault.ai Core
              </text>
              <text x="400" y="270" textAnchor="middle" fill="#64748b" className="text-xs dark:fill-gray-400">
                Blockchain Connectors
              </text>

              {/* Blockchain Integrations */}
              <rect
                x="50"
                y="200"
                width="150"
                height="80"
                rx="8"
                fill="#ecfdf5"
                stroke="#059669"
                strokeWidth="2"
                className="dark:fill-green-900/30 dark:stroke-green-500"
              />
              <text
                x="125"
                y="240"
                textAnchor="middle"
                fill="#059669"
                className="text-sm font-medium dark:fill-green-500"
              >
                EigenLayer
              </text>
              <text x="125" y="260" textAnchor="middle" fill="#059669" className="text-xs dark:fill-green-400">
                Restaking Security
              </text>

              <rect
                x="600"
                y="200"
                width="150"
                height="80"
                rx="8"
                fill="#eff6ff"
                stroke="#3b82f6"
                strokeWidth="2"
                className="dark:fill-blue-900/30 dark:stroke-blue-500"
              />
              <text
                x="675"
                y="240"
                textAnchor="middle"
                fill="#3b82f6"
                className="text-sm font-medium dark:fill-blue-500"
              >
                EtherLink
              </text>
              <text x="675" y="260" textAnchor="middle" fill="#3b82f6" className="text-xs dark:fill-blue-400">
                Cross-chain Messaging
              </text>

              {/* Blockchain Networks */}
              <rect
                x="150"
                y="350"
                width="100"
                height="60"
                rx="8"
                fill="#fef2f2"
                stroke="#ef4444"
                strokeWidth="2"
                className="dark:fill-red-900/30 dark:stroke-red-500"
              />
              <text
                x="200"
                y="380"
                textAnchor="middle"
                fill="#ef4444"
                className="text-xs font-medium dark:fill-red-500"
              >
                Ethereum
              </text>

              <rect
                x="300"
                y="350"
                width="100"
                height="60"
                rx="8"
                fill="#fdf4ff"
                stroke="#d946ef"
                strokeWidth="2"
                className="dark:fill-purple-900/30 dark:stroke-purple-500"
              />
              <text
                x="350"
                y="380"
                textAnchor="middle"
                fill="#d946ef"
                className="text-xs font-medium dark:fill-purple-500"
              >
                Solana
              </text>

              <rect
                x="450"
                y="350"
                width="100"
                height="60"
                rx="8"
                fill="#fff7ed"
                stroke="#f97316"
                strokeWidth="2"
                className="dark:fill-orange-900/30 dark:stroke-orange-500"
              />
              <text
                x="500"
                y="380"
                textAnchor="middle"
                fill="#f97316"
                className="text-xs font-medium dark:fill-orange-500"
              >
                Polygon
              </text>

              <rect
                x="600"
                y="350"
                width="100"
                height="60"
                rx="8"
                fill="#f0fdf4"
                stroke="#22c55e"
                strokeWidth="2"
                className="dark:fill-green-900/30 dark:stroke-green-500"
              />
              <text
                x="650"
                y="380"
                textAnchor="middle"
                fill="#22c55e"
                className="text-xs font-medium dark:fill-green-500"
              >
                Avalanche
              </text>

              {/* Connections */}
              <path
                d="M200 240 L300 240"
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-green-500"
              />
              <text x="250" y="230" textAnchor="middle" fill="#059669" className="text-xs dark:fill-green-500">
                Security Layer
              </text>

              <path
                d="M500 240 L600 240"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-blue-500"
              />
              <text x="550" y="230" textAnchor="middle" fill="#3b82f6" className="text-xs dark:fill-blue-500">
                Messaging Layer
              </text>

              {/* Blockchain Connections */}
              <path d="M125 280 L200 350" stroke="#059669" strokeWidth="2" className="dark:stroke-green-500" />
              <path d="M675 280 L650 350" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-500" />

              <path
                d="M350 300 L200 350"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="3,3"
                className="dark:stroke-gray-200"
              />
              <path
                d="M400 300 L350 350"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="3,3"
                className="dark:stroke-gray-200"
              />
              <path
                d="M400 300 L500 350"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="3,3"
                className="dark:stroke-gray-200"
              />
              <path
                d="M450 300 L650 350"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="3,3"
                className="dark:stroke-gray-200"
              />

              {/* Cross-chain Communication */}
              <path
                d="M200 380 C 250 420, 300 420, 350 380"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-blue-500"
              />
              <path
                d="M350 380 C 400 420, 450 420, 500 380"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-blue-500"
              />
              <path
                d="M500 380 C 550 420, 600 420, 650 380"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-blue-500"
              />

              {/* Legend */}
              <rect
                x="50"
                y="430"
                width="150"
                height="60"
                rx="8"
                fill="#f8fafc"
                stroke="#64748b"
                strokeWidth="1"
                className="dark:fill-gray-800 dark:stroke-gray-400"
              />
              <text
                x="125"
                y="450"
                textAnchor="middle"
                fill="#0f172a"
                className="text-xs font-medium dark:fill-gray-200"
              >
                Legend
              </text>

              <line
                x1="70"
                y1="465"
                x2="90"
                y2="465"
                stroke="#059669"
                strokeWidth="2"
                className="dark:stroke-green-500"
              />
              <text x="130" y="468" textAnchor="start" fill="#0f172a" className="text-xs dark:fill-gray-200">
                Security Connection
              </text>

              <line
                x1="70"
                y1="485"
                x2="90"
                y2="485"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-blue-500"
              />
              <text x="130" y="488" textAnchor="start" fill="#0f172a" className="text-xs dark:fill-gray-200">
                Cross-chain Messaging
              </text>
            </svg>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Integration Architecture</h3>
          <p className="mb-4 text-base font-normal">
            The VeritasVault.ai Blockchain Connectors layer integrates with blockchain networks through specialized
            adapters that handle cross-chain communication, transaction verification, and security. This architecture
            ensures:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-base font-normal">
              <strong>Enhanced Security:</strong> EigenLayer provides additional security through restaking, creating a
              more robust and resilient infrastructure for multi-chain portfolio management.
            </li>
            <li className="text-base font-normal">
              <strong>Seamless Cross-chain Communication:</strong> EtherLink enables efficient and secure communication
              between different blockchain networks, facilitating cross-chain operations.
            </li>
            <li className="text-base font-normal">
              <strong>Multi-chain Support:</strong> The architecture supports multiple blockchain networks, allowing
              users to manage assets across various ecosystems through a unified interface.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
