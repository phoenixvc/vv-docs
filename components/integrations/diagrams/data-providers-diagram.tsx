import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function DataProvidersDiagram() {
  return (
    <section id="data-providers-diagram" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Data Providers Integration Architecture
            <SectionAnchor id="data-providers-diagram" />
          </h2>

          <p className="mb-6 text-base font-normal">
            The diagram below illustrates how VeritasVault.ai integrates with various data providers to ensure
            comprehensive, accurate, and reliable data for portfolio management and risk assessment.
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
                Data Processing Layer
              </text>

              {/* Data Providers */}
              <rect
                x="50"
                y="50"
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
                y="90"
                textAnchor="middle"
                fill="#059669"
                className="text-sm font-medium dark:fill-green-500"
              >
                CoinGecko
              </text>
              <text x="125" y="110" textAnchor="middle" fill="#059669" className="text-xs dark:fill-green-400">
                Market Data
              </text>

              <rect
                x="50"
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
                x="125"
                y="240"
                textAnchor="middle"
                fill="#3b82f6"
                className="text-sm font-medium dark:fill-blue-500"
              >
                DeFiLlama
              </text>
              <text x="125" y="260" textAnchor="middle" fill="#3b82f6" className="text-xs dark:fill-blue-400">
                Protocol Analytics
              </text>

              <rect
                x="50"
                y="350"
                width="150"
                height="80"
                rx="8"
                fill="#fef2f2"
                stroke="#ef4444"
                strokeWidth="2"
                className="dark:fill-red-900/30 dark:stroke-red-500"
              />
              <text
                x="125"
                y="390"
                textAnchor="middle"
                fill="#ef4444"
                className="text-sm font-medium dark:fill-red-500"
              >
                Pinax
              </text>
              <text x="125" y="410" textAnchor="middle" fill="#ef4444" className="text-xs dark:fill-red-400">
                On-chain Data
              </text>

              <rect
                x="600"
                y="200"
                width="150"
                height="80"
                rx="8"
                fill="#fdf4ff"
                stroke="#d946ef"
                strokeWidth="2"
                className="dark:fill-purple-900/30 dark:stroke-purple-500"
              />
              <text
                x="675"
                y="240"
                textAnchor="middle"
                fill="#d946ef"
                className="text-sm font-medium dark:fill-purple-500"
              >
                Goldsky
              </text>
              <text x="675" y="260" textAnchor="middle" fill="#d946ef" className="text-xs dark:fill-purple-400">
                Blockchain Indexing
              </text>

              {/* Connections */}
              <path
                d="M200 90 L300 220"
                stroke="#059669"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-green-500"
              />
              <text
                x="240"
                y="130"
                textAnchor="middle"
                fill="#059669"
                className="text-xs dark:fill-green-500"
                transform="rotate(-30 240 130)"
              >
                API
              </text>

              <path
                d="M200 240 L300 240"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-blue-500"
              />
              <text x="250" y="230" textAnchor="middle" fill="#3b82f6" className="text-xs dark:fill-blue-500">
                API
              </text>

              <path
                d="M200 390 L300 280"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-red-500"
              />
              <text
                x="240"
                y="350"
                textAnchor="middle"
                fill="#ef4444"
                className="text-xs dark:fill-red-500"
                transform="rotate(30 240 350)"
              >
                API
              </text>

              <path
                d="M600 240 L500 240"
                stroke="#d946ef"
                strokeWidth="2"
                strokeDasharray="5,5"
                className="dark:stroke-purple-500"
              />
              <text x="550" y="230" textAnchor="middle" fill="#d946ef" className="text-xs dark:fill-purple-500">
                API
              </text>

              {/* Data Flow */}
              <path
                d="M400 300 L400 350 L600 350 L600 300"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="none"
                className="dark:stroke-gray-200"
              />
              <text x="500" y="340" textAnchor="middle" fill="#0f172a" className="text-xs dark:fill-gray-200">
                Data Normalization & Storage
              </text>

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
                Market Data
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
                Protocol Data
              </text>

              <rect
                x="620"
                y="475"
                width="10"
                height="10"
                fill="#fef2f2"
                stroke="#ef4444"
                strokeWidth="1"
                className="dark:fill-red-900/30 dark:stroke-red-500"
              />
              <text x="680" y="483" textAnchor="start" fill="#0f172a" className="text-xs dark:fill-gray-200">
                On-chain Data
              </text>
            </svg>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Integration Architecture</h3>
          <p className="mb-4 text-base font-normal">
            The VeritasVault.ai Data Processing Layer integrates with multiple data providers through specialized
            adapters that handle authentication, rate limiting, and data normalization. This architecture ensures:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-base font-normal">
              <strong>Comprehensive Data Coverage:</strong> By combining market data from CoinGecko, protocol analytics
              from DeFiLlama, and on-chain data from Pinax and Goldsky, VeritasVault.ai creates a complete view of the
              crypto ecosystem.
            </li>
            <li className="text-base font-normal">
              <strong>Redundancy and Reliability:</strong> Multiple data sources provide redundancy for critical data
              points, ensuring reliability even if individual providers experience downtime.
            </li>
            <li className="text-base font-normal">
              <strong>Normalized Data Format:</strong> All data is processed and normalized into a consistent format,
              enabling seamless integration with the portfolio management and risk assessment modules.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
