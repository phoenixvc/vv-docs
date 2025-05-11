"use client"
import { useState } from "react"

interface UtilityNode {
  id: string
  title: string
  description: string
  position: { x: number; y: number }
  connections: string[]
}

export function TokenUtilityDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const utilityNodes: UtilityNode[] = [
    {
      id: "governance",
      title: "Governance",
      description: "Vote on protocol upgrades, parameter adjustments, and treasury allocations",
      position: { x: 50, y: 20 },
      connections: ["staking", "treasury"],
    },
    {
      id: "staking",
      title: "Staking",
      description: "Lock tokens to earn rewards and gain access to premium features",
      position: { x: 20, y: 50 },
      connections: ["discounts", "premium"],
    },
    {
      id: "discounts",
      title: "Fee Discounts",
      description: "Receive discounts on platform fees based on staking tier",
      position: { x: 20, y: 80 },
      connections: [],
    },
    {
      id: "premium",
      title: "Premium Features",
      description: "Access advanced analytics and specialized investment strategies",
      position: { x: 50, y: 80 },
      connections: [],
    },
    {
      id: "liquidity",
      title: "Liquidity Mining",
      description: "Earn VVAI tokens by providing liquidity to supported pools",
      position: { x: 80, y: 50 },
      connections: ["treasury"],
    },
    {
      id: "treasury",
      title: "Treasury",
      description: "Protocol-owned assets used for development and ecosystem growth",
      position: { x: 80, y: 20 },
      connections: ["governance"],
    },
    {
      id: "vvai",
      title: "VVAI Token",
      description: "The core utility token of the VeritasVault.ai ecosystem",
      position: { x: 50, y: 50 },
      connections: ["governance", "staking", "liquidity", "treasury", "discounts", "premium"],
    },
  ]

  const handleNodeHover = (nodeId: string) => {
    setActiveNode(nodeId)
  }

  const handleNodeLeave = () => {
    setActiveNode(null)
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Token Utility Diagram</h3>
      <p className="text-muted-foreground">
        The VVAI token serves multiple functions within the VeritasVault.ai ecosystem, creating a cohesive economic
        model.
      </p>

      <div className="relative w-full h-[500px] border rounded-lg bg-muted/20 overflow-hidden">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" className="text-primary/70" />
            </marker>
          </defs>
          {utilityNodes.map((node) =>
            node.connections.map((targetId) => {
              const target = utilityNodes.find((n) => n.id === targetId)
              if (!target) return null

              const isActive = activeNode === node.id || activeNode === targetId

              return (
                <line
                  key={`${node.id}-${targetId}`}
                  x1={`${node.position.x}%`}
                  y1={`${node.position.y}%`}
                  x2={`${target.position.x}%`}
                  y2={`${target.position.y}%`}
                  stroke={isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"}
                  strokeWidth={isActive ? 2 : 1}
                  strokeDasharray={node.id !== "vvai" && targetId !== "vvai" ? "5,5" : ""}
                  markerEnd="url(#arrowhead)"
                  className="transition-all duration-300"
                />
              )
            }),
          )}
        </svg>

        {/* Nodes */}
        {utilityNodes.map((node) => (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
              node.id === "vvai"
                ? "w-32 h-32 rounded-full bg-primary/10 border-2 border-primary z-10"
                : "w-28 h-28 rounded-lg bg-card border shadow-sm hover:shadow-md"
            } ${activeNode === node.id ? "ring-2 ring-primary ring-offset-2" : ""}`}
            style={{
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
              opacity:
                activeNode === null ||
                activeNode === node.id ||
                utilityNodes.find((n) => n.id === activeNode)?.connections.includes(node.id) ||
                node.connections.includes(activeNode || "")
                  ? 1
                  : 0.5,
            }}
            onMouseEnter={() => handleNodeHover(node.id)}
            onMouseLeave={handleNodeLeave}
          >
            <div className="flex flex-col items-center justify-center w-full h-full p-2 text-center">
              <h4 className={`font-semibold ${node.id === "vvai" ? "text-primary" : ""}`}>{node.title}</h4>
              {(activeNode === node.id || node.id === "vvai") && (
                <p className="text-xs mt-1 text-muted-foreground line-clamp-3">{node.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-muted-foreground italic">
        Hover over each node to see its connections and description.
      </div>
    </div>
  )
}
