import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"

export function RiskManagementDiagram() {
  return (
    <section id="risk-management-diagram" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Risk Management Integration Architecture
            <SectionAnchor id="risk-management-diagram" />
          </h2>

          <p className="mb-6 text-base font-normal">
            The diagram below illustrates how VeritasVault.ai integrates with risk management solutions to ensure
            comprehensive risk assessment and mitigation across its multi-chain architecture.
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
                Risk Management Module
              </text>

              {/* Risk Management Integration */}
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
                Risk Bot
              </text>
              <text x="125" y="260" textAnchor="middle" fill="#059669" className="text-xs dark:fill-green-400">
                AI-powered Analysis
              </text>

              {/* In-house Solution */}
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
                In-house Solution
              </text>
              <text x="675" y="260" textAnchor="middle" fill="#3b82f6" className="text-xs dark:fill-blue-400">
                Custom Risk Analysis
              </text>

              {/* Risk Factors */}
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
                Market Risk
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
                Protocol Risk
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
                Liquidity Risk
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
                Security Risk
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
                Internal
              </text>

              {/* Risk Factor Connections */}
              <path d="M125 280 L200 350" stroke="#059669" strokeWidth="2" className="dark:stroke-green-500" />
              <path d="M125 280 L350 350" stroke="#059669" strokeWidth="2" className="dark:stroke-green-500" />
              <path d="M125 280 L500 350" stroke="#059669" strokeWidth="2" className="dark:stroke-green-500" />
              <path d="M125 280 L650 350" stroke="#059669" strokeWidth="2" className="dark:stroke-green-500" />

              <path d="M675 280 L200 350" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-500" />
              <path d="M675 280 L350 350" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-500" />
              <path d="M675 280 L500 350" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-500" />
              <path d="M675 280 L650 350" stroke="#3b82f6" strokeWidth="2" className="dark:stroke-blue-500" />

              {/* Risk Assessment Flow */}
              <path
                d="M400 300 L400 430 L700 430 L700 300"
                stroke="#0f172a"
                strokeWidth="2"
                strokeDasharray="none"
                className="dark:stroke-gray-200"
              />
              <text x="550" y="420" textAnchor="middle" fill="#0f172a" className="text-xs dark:fill-gray-200">
                Risk Assessment & Mitigation
              </text>

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
                Risk Bot Analysis
              </text>

              <line
                x1="70"
                y1="485"
                x2="90"
                y2="485"
                stroke="#3b82f6"
                strokeWidth="2"
                className="dark:stroke-blue-500"
              />
              <text x="130" y="488" textAnchor="start" fill="#0f172a" className="text-xs dark:fill-gray-200">
                In-house Analysis
              </text>
            </svg>
          </div>

          <h3 className="text-xl font-semibold mt-6 mb-2">Integration Architecture</h3>
          <p className="mb-4 text-base font-normal">
            The VeritasVault.ai Risk Management Module integrates with Risk Bot and an in-house solution to provide
            comprehensive risk assessment and mitigation. This architecture ensures:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-base font-normal">
              <strong>Comprehensive Risk Coverage:</strong> The integration covers various risk factors, including
              market risk, protocol risk, liquidity risk, and security risk.
            </li>
            <li className="text-base font-normal">
              <strong>AI-powered Analysis:</strong> Risk Bot provides advanced AI-powered risk analysis, enabling more
              accurate risk prediction and mitigation strategies.
            </li>
            <li className="text-base font-normal">
              <strong>Customized Risk Assessment:</strong> The in-house solution complements Risk Bot by addressing
              specific risk factors unique to VeritasVault.ai's architecture.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
