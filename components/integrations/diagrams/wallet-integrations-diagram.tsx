import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function WalletIntegrationsDiagram() {
  return (
    <section id="wallet-integrations-diagram" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Wallet Integrations Architecture
            <SectionAnchor id="wallet-integrations-diagram" />
          </h2>

          <p className="mb-6 text-base font-normal">
            The diagram below illustrates how VeritasVault.ai integrates with wallet providers to enable secure,
            user-friendly access to multi-chain portfolio management.
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
              {/* User */}
              <circle
                cx="400"
                cy="80"
                r="40"
                fill="#f1f5f9"
                stroke="#0f172a"
                strokeWidth="2"
                className="dark:fill-gray-800 dark:stroke-gray-200"
              />
              <text
                x="400"
                y="85"
                textAnchor="middle"
                fill="#0f172a"
                className="text-sm font-medium dark:fill-gray-200"
              >
                User
              </text>

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
                Security Layer
              </text>

              {/* Wallet Providers */}
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
                EtherMail
              </text>
              <text x="125" y="260" textAnchor="middle" fill="#059669" className="text-xs dark:fill-green-400">
                Secure Communication
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
                Plurality
              </text>
              <text x="675" y="260" textAnchor="middle" fill="#3b82f6" className="text-xs dark:fill-blue-400">
                Multi-chain Wallet
              </text>

              {/* Blockchain Networks */}
              <rect
                x="200"
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
                x="250"
                y="380"
                textAnchor="middle"
                fill="#ef4444"
                className="text-xs font-medium dark:fill-red-500"
              >
                Ethereum
              </text>

              <rect
                x="350"
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
                x="400"
                y="380"
                textAnchor="middle"
                fill="#d946ef"
                className="text-xs font-medium dark:fill-purple-500"
              >
                Solana
              </text>

              <rect
                x="500"
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
                x="550"
                y="380"
                textAnchor="middle"
                fill="#f97316"
                className="text-xs font-medium dark:fill-orange-500"
              >
                Polygon
              </text>

              {/* Connections */}
              <path d="M400 120 L400 200" stroke="#0f172a" strokeWidth="2" className="dark:stroke-gray-200" />
              <text x="420" y="160" textAnchor="start" fill="#0f172a" className="text-xs dark:fill-gray-200">
                Authentication
              </text>

              <path
                d="M200 240 L300 240"
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-green-500"
              />
              <text x="250" y="230" textAnchor="middle" fill="#059669" className="text-xs dark:fill-green-500">
                API
              </text>

              <path
                d="M500 240 L600 240"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-blue-500"
              />
              <text x="550" y="230" textAnchor="middle" fill="#3b82f6" className="text-xs dark:fill-blue-500">
                API
              </text>

              {/* Blockchain Connections */}
              <path
                d="M350 300 L250 350"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="3,3"
                className="dark:stroke-gray-200"
              />
              <path
                d="M400 300 L400 350"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="3,3"
                className="dark:stroke-gray-200"
              />
              <path
                d="M450 300 L550 350"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="3,3"
                className="dark:stroke-gray-200"
              />

              {/* Legend */}
              <rect
                x="600"
                y="400"
                width="150"
                height="80"
                rx="8"
                fill="#f8fafc"
                stroke="#64748b"
                strokeWidth="1"
                className="dark:fill-gray-800 dark:stroke-gray-400"
              />
              <text
                x="675"
                y="420"
                textAnchor="middle"
                fill="#0f172a"
                className="text-xs font-medium dark:fill-gray-200"
              >
                Legend
              </text>

              <rect
                x="620"
                y="435"
                width="10"
                height="10"
                fill="#ecfdf5"
                stroke="#059669"
                strokeWidth="1"
                className="dark:fill-green-900/30 dark:stroke-green-500"
              />
              <text x="680" y="443" textAnchor="start" fill="#0f172a" className="text-xs dark:fill-gray-200">
                Secure Communication
              </text>

              <rect
                x="620"
                y="455"
                width="10"
                height="10"
                fill="#eff6ff"
                stroke="#3b82f6"
                strokeWidth="1"
                className="dark:fill-blue-900/30 dark:stroke-blue-500"
              />
              <text x="680" y="463" textAnchor="start" fill="#0f172a" className="text-xs dark:fill-gray-200">
                Multi-chain Wallet
              </text>

              <line
                x1="620"
                y1="475"
                x2="640"
                y2="475"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="3,3"
                className="dark:stroke-gray-200"
              />
              <text x="680" y="478" textAnchor="start" fill="#0f172a" className="text-xs dark:fill-gray-200">
                Blockchain Connection
              </text>
            </svg>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Integration Architecture</h3>
          <p className="mb-4 text-base font-normal">
            The VeritasVault.ai Security Layer integrates with wallet providers through specialized connectors that
            handle authentication, transaction signing, and secure communications. This architecture ensures:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-base font-normal">
              <strong>Secure Authentication:</strong> EtherMail provides secure, decentralized identity verification for
              platform access, while Plurality enables seamless multi-chain wallet management.
            </li>
            <li className="text-base font-normal">
              <strong>Cross-chain Transactions:</strong> The integration allows users to manage assets and execute
              transactions across multiple blockchain networks through a unified interface.
            </li>
            <li className="text-base font-normal">
              <strong>Enhanced Security:</strong> By leveraging the security features of specialized wallet providers,
              VeritasVault.ai enhances the protection of user assets and sensitive information.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
