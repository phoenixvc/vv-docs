export function SecurityArchitectureDiagram() {
  return (
    <div className="w-full overflow-auto bg-white dark:bg-gray-900 p-4 rounded-lg border border-border">
      <svg
        width="100%"
        height="500"
        viewBox="0 0 800 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto"
      >
        {/* External Layer - Perimeter Security */}
        <rect
          x="50"
          y="50"
          width="700"
          height="400"
          rx="10"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="dark:fill-gray-800 dark:stroke-gray-400"
        />
        <text x="400" y="80" textAnchor="middle" fill="#64748b" className="text-sm font-medium dark:fill-gray-400">
          Perimeter Security Layer
        </text>

        {/* Application Security Layer */}
        <rect
          x="100"
          y="100"
          width="600"
          height="300"
          rx="10"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="dark:fill-green-900/30 dark:stroke-green-500"
        />
        <text x="400" y="130" textAnchor="middle" fill="#22c55e" className="text-sm font-medium dark:fill-green-500">
          Application Security Layer
        </text>

        {/* Data Security Layer */}
        <rect
          x="150"
          y="150"
          width="500"
          height="200"
          rx="10"
          fill="#eff6ff"
          stroke="#3b82f6"
          strokeWidth="2"
          strokeDasharray="5,5"
          className="dark:fill-blue-900/30 dark:stroke-blue-500"
        />
        <text x="400" y="180" textAnchor="middle" fill="#3b82f6" className="text-sm font-medium dark:fill-blue-500">
          Data Security Layer
        </text>

        {/* Blockchain Security Layer */}
        <rect
          x="200"
          y="200"
          width="400"
          height="100"
          rx="10"
          fill="#fef2f2"
          stroke="#ef4444"
          strokeWidth="2"
          className="dark:fill-red-900/30 dark:stroke-red-500"
        />
        <text x="400" y="230" textAnchor="middle" fill="#ef4444" className="text-sm font-medium dark:fill-red-500">
          Blockchain Security Layer
        </text>

        {/* Core Components */}
        <rect
          x="250"
          y="250"
          width="100"
          height="40"
          rx="5"
          fill="#fdf4ff"
          stroke="#d946ef"
          strokeWidth="2"
          className="dark:fill-purple-900/30 dark:stroke-purple-500"
        />
        <text x="300" y="275" textAnchor="middle" fill="#d946ef" className="text-xs font-medium dark:fill-purple-500">
          Key Management
        </text>

        <rect
          x="450"
          y="250"
          width="100"
          height="40"
          rx="5"
          fill="#fdf4ff"
          stroke="#d946ef"
          strokeWidth="2"
          className="dark:fill-purple-900/30 dark:stroke-purple-500"
        />
        <text x="500" y="275" textAnchor="middle" fill="#d946ef" className="text-xs font-medium dark:fill-purple-500">
          Transaction Verification
        </text>

        {/* Perimeter Security Components */}
        <rect
          x="150"
          y="70"
          width="80"
          height="30"
          rx="5"
          fill="#f1f5f9"
          stroke="#0f172a"
          strokeWidth="1"
          className="dark:fill-gray-700 dark:stroke-gray-300"
        />
        <text x="190" y="90" textAnchor="middle" fill="#0f172a" className="text-xs font-medium dark:fill-gray-300">
          DDoS Protection
        </text>

        <rect
          x="250"
          y="70"
          width="80"
          height="30"
          rx="5"
          fill="#f1f5f9"
          stroke="#0f172a"
          strokeWidth="1"
          className="dark:fill-gray-700 dark:stroke-gray-300"
        />
        <text x="290" y="90" textAnchor="middle" fill="#0f172a" className="text-xs font-medium dark:fill-gray-300">
          WAF
        </text>

        <rect
          x="350"
          y="70"
          width="80"
          height="30"
          rx="5"
          fill="#f1f5f9"
          stroke="#0f172a"
          strokeWidth="1"
          className="dark:fill-gray-700 dark:stroke-gray-300"
        />
        <text x="390" y="90" textAnchor="middle" fill="#0f172a" className="text-xs font-medium dark:fill-gray-300">
          API Gateway
        </text>

        <rect
          x="450"
          y="70"
          width="80"
          height="30"
          rx="5"
          fill="#f1f5f9"
          stroke="#0f172a"
          strokeWidth="1"
          className="dark:fill-gray-700 dark:stroke-gray-300"
        />
        <text x="490" y="90" textAnchor="middle" fill="#0f172a" className="text-xs font-medium dark:fill-gray-300">
          Rate Limiting
        </text>

        {/* Application Security Components */}
        <rect
          x="150"
          y="120"
          width="100"
          height="30"
          rx="5"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="1"
          className="dark:fill-green-900/20 dark:stroke-green-400"
        />
        <text x="200" y="140" textAnchor="middle" fill="#22c55e" className="text-xs font-medium dark:fill-green-400">
          Input Validation
        </text>

        <rect
          x="270"
          y="120"
          width="100"
          height="30"
          rx="5"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="1"
          className="dark:fill-green-900/20 dark:stroke-green-400"
        />
        <text x="320" y="140" textAnchor="middle" fill="#22c55e" className="text-xs font-medium dark:fill-green-400">
          Authentication
        </text>

        <rect
          x="390"
          y="120"
          width="100"
          height="30"
          rx="5"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="1"
          className="dark:fill-green-900/20 dark:stroke-green-400"
        />
        <text x="440" y="140" textAnchor="middle" fill="#22c55e" className="text-xs font-medium dark:fill-green-400">
          Authorization
        </text>

        <rect
          x="510"
          y="120"
          width="100"
          height="30"
          rx="5"
          fill="#f0fdf4"
          stroke="#22c55e"
          strokeWidth="1"
          className="dark:fill-green-900/20 dark:stroke-green-400"
        />
        <text x="560" y="140" textAnchor="middle" fill="#22c55e" className="text-xs font-medium dark:fill-green-400">
          Secure Coding
        </text>

        {/* Data Security Components */}
        <rect
          x="200"
          y="170"
          width="100"
          height="30"
          rx="5"
          fill="#eff6ff"
          stroke="#3b82f6"
          strokeWidth="1"
          className="dark:fill-blue-900/20 dark:stroke-blue-400"
        />
        <text x="250" y="190" textAnchor="middle" fill="#3b82f6" className="text-xs font-medium dark:fill-blue-400">
          Encryption
        </text>

        <rect
          x="350"
          y="170"
          width="100"
          height="30"
          rx="5"
          fill="#eff6ff"
          stroke="#3b82f6"
          strokeWidth="1"
          className="dark:fill-blue-900/20 dark:stroke-blue-400"
        />
        <text x="400" y="190" textAnchor="middle" fill="#3b82f6" className="text-xs font-medium dark:fill-blue-400">
          Access Control
        </text>

        <rect
          x="500"
          y="170"
          width="100"
          height="30"
          rx="5"
          fill="#eff6ff"
          stroke="#3b82f6"
          strokeWidth="1"
          className="dark:fill-blue-900/20 dark:stroke-blue-400"
        />
        <text x="550" y="190" textAnchor="middle" fill="#3b82f6" className="text-xs font-medium dark:fill-blue-400">
          Data Integrity
        </text>

        {/* Monitoring Layer */}
        <rect
          x="100"
          y="350"
          width="600"
          height="50"
          rx="10"
          fill="#fff7ed"
          stroke="#f97316"
          strokeWidth="2"
          className="dark:fill-orange-900/30 dark:stroke-orange-500"
        />
        <text x="400" y="380" textAnchor="middle" fill="#f97316" className="text-sm font-medium dark:fill-orange-500">
          Security Monitoring & Incident Response Layer
        </text>

        {/* Monitoring Components */}
        <rect
          x="150"
          y="360"
          width="100"
          height="30"
          rx="5"
          fill="#fff7ed"
          stroke="#f97316"
          strokeWidth="1"
          className="dark:fill-orange-900/20 dark:stroke-orange-400"
        />
        <text x="200" y="380" textAnchor="middle" fill="#f97316" className="text-xs font-medium dark:fill-orange-400">
          Logging
        </text>

        <rect
          x="300"
          y="360"
          width="100"
          height="30"
          rx="5"
          fill="#fff7ed"
          stroke="#f97316"
          strokeWidth="1"
          className="dark:fill-orange-900/20 dark:stroke-orange-400"
        />
        <text x="350" y="380" textAnchor="middle" fill="#f97316" className="text-xs font-medium dark:fill-orange-400">
          Threat Detection
        </text>

        <rect
          x="450"
          y="360"
          width="100"
          height="30"
          rx="5"
          fill="#fff7ed"
          stroke="#f97316"
          strokeWidth="1"
          className="dark:fill-orange-900/20 dark:stroke-orange-400"
        />
        <text x="500" y="380" textAnchor="middle" fill="#f97316" className="text-xs font-medium dark:fill-orange-400">
          Incident Response
        </text>

        {/* Legend */}
        <rect
          x="600"
          y="410"
          width="150"
          height="30"
          rx="5"
          fill="#f8fafc"
          stroke="#64748b"
          strokeWidth="1"
          className="dark:fill-gray-800 dark:stroke-gray-400"
        />
        <text x="675" y="430" textAnchor="middle" fill="#0f172a" className="text-xs font-medium dark:fill-gray-200">
          Security Architecture Layers
        </text>
      </svg>
    </div>
  )
}
