import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"
import { Badge } from "@/components/ui/badge"
import { Github, Globe, FileText, Shield, Code } from "lucide-react"

interface ProjectOverviewProps {
  id?: string
}

export function ProjectOverview({ id = "project-overview" }: ProjectOverviewProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Project Overview
            <SectionAnchor id={id} />
          </h2>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Version 1.0.0
            </Badge>
            <Badge variant="outline" className="bg-green-500/10 text-green-500">
              Audited
            </Badge>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500">
              Multi-Chain
            </Badge>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-500">
              DeFi
            </Badge>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500">
              Portfolio Management
            </Badge>
          </div>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai is a cutting-edge multi-chain portfolio management platform designed to provide secure,
            transparent, and efficient asset management across multiple blockchain networks. Our architecture leverages
            the unique strengths of various blockchains to create a robust, scalable, and interoperable solution for
            decentralized finance.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Security Features
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Multi-layer security architecture</li>
                <li>Real-time risk monitoring and mitigation</li>
                <li>Decentralized validation mechanisms</li>
                <li>Comprehensive audit framework</li>
                <li>Secure cross-chain communication</li>
              </ul>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Technical Highlights
              </h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Modular architecture for extensibility</li>
                <li>Advanced portfolio optimization algorithms</li>
                <li>Cross-chain asset management</li>
                <li>AI-powered risk assessment</li>
                <li>Decentralized governance framework</li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Key Resources</h3>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="flex items-center gap-2 text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                GitHub Repository
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="h-5 w-5" />
                Official Website
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="h-5 w-5" />
                Technical Documentation
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
