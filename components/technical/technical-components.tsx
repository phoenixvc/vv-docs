"use client"
import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, ServerIcon, DatabaseIcon, ShieldIcon, BarChartIcon, PiIcon as ApiIcon } from "lucide-react"

export function TechnicalComponents() {
  return (
    <section id="technical-components" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Technical Components
            <SectionAnchor id="technical-components" />
          </h2>

          <p className="mb-4 text-base font-normal">
            VeritasVault.ai's technical infrastructure is built on a modular architecture that leverages cutting-edge
            technologies to provide a secure, scalable, and efficient platform for multi-chain portfolio management. The
            following components form the backbone of our technical infrastructure:
          </p>

          <Tabs defaultValue="api-gateway" className="mb-6">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="api-gateway">API Gateway</TabsTrigger>
              <TabsTrigger value="data-processing">Data Processing</TabsTrigger>
              <TabsTrigger value="blockchain-connectors">Blockchain Connectors</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="api-gateway" className="p-4 border rounded-md mt-2">
              <div className="flex items-start gap-3 mb-3">
                <ApiIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-lg">API Gateway</h4>
                  <p className="text-muted-foreground">Unified entry point for all client interactions</p>
                </div>
              </div>

              <p className="mb-3">
                Our API Gateway serves as the central entry point for all client interactions with the VeritasVault.ai
                platform. It handles authentication, request routing, rate limiting, and protocol translation, ensuring
                secure and efficient communication between clients and backend services.
              </p>

              <h5 className="font-medium mb-2">Key Features:</h5>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Multi-protocol support (REST, GraphQL, WebSockets)</li>
                <li>JWT-based authentication and authorization</li>
                <li>Request validation and sanitization</li>
                <li>Adaptive rate limiting based on user tiers</li>
                <li>Request/response transformation</li>
                <li>Circuit breaking for fault tolerance</li>
                <li>API versioning and documentation</li>
              </ul>

              <h5 className="font-medium mb-2">Implementation:</h5>
              <p>
                The API Gateway is implemented using a combination of Kong API Gateway for traffic management and custom
                middleware for blockchain-specific functionality. It's deployed as a horizontally scalable service
                across multiple availability zones to ensure high availability.
              </p>
            </TabsContent>

            <TabsContent value="data-processing" className="p-4 border rounded-md mt-2">
              <div className="flex items-start gap-3 mb-3">
                <DatabaseIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-lg">Data Processing Pipeline</h4>
                  <p className="text-muted-foreground">Real-time and batch processing of multi-chain data</p>
                </div>
              </div>

              <p className="mb-3">
                Our data processing pipeline collects, cleans, transforms, and analyzes data from multiple blockchain
                networks and external sources. It supports both real-time streaming for immediate insights and batch
                processing for complex analytics.
              </p>

              <h5 className="font-medium mb-2">Pipeline Components:</h5>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Function</TableHead>
                    <TableHead>Technology</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Data Ingestion</TableCell>
                    <TableCell>Collect data from multiple sources</TableCell>
                    <TableCell>Kafka, RabbitMQ</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Data Transformation</TableCell>
                    <TableCell>Clean and normalize data</TableCell>
                    <TableCell>Spark, Flink</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Data Storage</TableCell>
                    <TableCell>Store processed data</TableCell>
                    <TableCell>TimescaleDB, Redis</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Data Analysis</TableCell>
                    <TableCell>Generate insights and metrics</TableCell>
                    <TableCell>Python, R, TensorFlow</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h5 className="font-medium mt-3 mb-2">Data Sources:</h5>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>Blockchain node RPC endpoints</li>
                <li>Indexed blockchain data (via TheGraph, Goldsky)</li>
                <li>Market data APIs (CoinGecko, DeFiLlama)</li>
                <li>On-chain oracle data feeds</li>
                <li>User interaction data</li>
              </ul>
            </TabsContent>

            <TabsContent value="blockchain-connectors" className="p-4 border rounded-md mt-2">
              <div className="flex items-start gap-3 mb-3">
                <ServerIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-lg">Blockchain Connectors</h4>
                  <p className="text-muted-foreground">Specialized modules for cross-chain operations</p>
                </div>
              </div>

              <p className="mb-3">
                Our blockchain connectors enable seamless interaction with multiple blockchain networks, handling the
                complexities of different protocols, transaction formats, and consensus mechanisms. These connectors
                provide a unified interface for cross-chain operations.
              </p>

              <h5 className="font-medium mb-2">Supported Blockchains:</h5>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border p-3 rounded-md">
                  <h6 className="font-medium">Layer 1 Blockchains</h6>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Ethereum</li>
                    <li>Solana</li>
                    <li>Avalanche</li>
                    <li>Tezos</li>
                    <li>Cosmos</li>
                  </ul>
                </div>
                <div className="border p-3 rounded-md">
                  <h6 className="font-medium">Layer 2 Solutions</h6>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Arbitrum</li>
                    <li>Optimism</li>
                    <li>zkSync</li>
                    <li>StarkNet</li>
                    <li>Polygon zkEVM</li>
                  </ul>
                </div>
              </div>

              <h5 className="font-medium mb-2">Connector Architecture:</h5>
              <p className="mb-3">Each blockchain connector consists of several components:</p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>
                  <strong>Protocol Adapter:</strong> Handles blockchain-specific RPC calls and transaction formats
                </li>
                <li>
                  <strong>State Manager:</strong> Maintains and synchronizes blockchain state information
                </li>
                <li>
                  <strong>Transaction Manager:</strong> Handles transaction creation, signing, and submission
                </li>
                <li>
                  <strong>Event Listener:</strong> Monitors blockchain events and triggers appropriate actions
                </li>
                <li>
                  <strong>Error Handler:</strong> Manages blockchain-specific error conditions and recovery strategies
                </li>
              </ul>
            </TabsContent>

            <TabsContent value="security" className="p-4 border rounded-md mt-2">
              <div className="flex items-start gap-3 mb-3">
                <ShieldIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-lg">Security Infrastructure</h4>
                  <p className="text-muted-foreground">Comprehensive protection for multi-chain operations</p>
                </div>
              </div>

              <p className="mb-3">
                Our security infrastructure provides comprehensive protection for all aspects of the VeritasVault.ai
                platform, from user authentication to transaction validation and data integrity. It implements multiple
                layers of security to defend against various threats.
              </p>

              <Alert className="mb-4">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Security-First Approach</AlertTitle>
                <AlertDescription>
                  Security is integrated into every aspect of our development process, from design to deployment and
                  ongoing operations.
                </AlertDescription>
              </Alert>

              <h5 className="font-medium mb-2">Security Layers:</h5>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Layer</TableHead>
                    <TableHead>Protection Mechanisms</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Network Security</TableCell>
                    <TableCell>DDoS protection, WAF, network segmentation, TLS encryption</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Application Security</TableCell>
                    <TableCell>Input validation, output encoding, CSRF protection, rate limiting</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Data Security</TableCell>
                    <TableCell>Encryption at rest and in transit, key management, data minimization</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Identity Security</TableCell>
                    <TableCell>MFA, role-based access control, session management, OAuth/OIDC</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Blockchain Security</TableCell>
                    <TableCell>Transaction validation, smart contract auditing, key protection</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <h5 className="font-medium mt-3 mb-2">Security Operations:</h5>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>24/7 security monitoring and incident response</li>
                <li>Regular penetration testing and vulnerability assessments</li>
                <li>Automated security scanning in CI/CD pipeline</li>
                <li>Bug bounty program for responsible disclosure</li>
                <li>Regular security training for all team members</li>
              </ul>
            </TabsContent>

            <TabsContent value="monitoring" className="p-4 border rounded-md mt-2">
              <div className="flex items-start gap-3 mb-3">
                <BarChartIcon className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-lg">Monitoring & Observability</h4>
                  <p className="text-muted-foreground">Comprehensive visibility into system performance</p>
                </div>
              </div>

              <p className="mb-3">
                Our monitoring and observability system provides comprehensive visibility into the performance, health,
                and behavior of the VeritasVault.ai platform. It enables proactive identification and resolution of
                issues before they impact users.
              </p>

              <h5 className="font-medium mb-2">Monitoring Components:</h5>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>
                  <strong>Metrics Collection:</strong> Gathering performance data from all system components
                </li>
                <li>
                  <strong>Log Aggregation:</strong> Centralizing and analyzing logs from multiple sources
                </li>
                <li>
                  <strong>Distributed Tracing:</strong> Tracking requests across multiple services
                </li>
                <li>
                  <strong>Synthetic Monitoring:</strong> Simulating user interactions to detect issues
                </li>
                <li>
                  <strong>Alerting System:</strong> Notifying operators of potential issues
                </li>
                <li>
                  <strong>Dashboards:</strong> Visualizing system health and performance
                </li>
              </ul>

              <h5 className="font-medium mb-2">Key Metrics:</h5>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border p-3 rounded-md">
                  <h6 className="font-medium">System Metrics</h6>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Service response times</li>
                    <li>Error rates and types</li>
                    <li>Resource utilization</li>
                    <li>Queue depths and processing times</li>
                    <li>Database performance</li>
                  </ul>
                </div>
                <div className="border p-3 rounded-md">
                  <h6 className="font-medium">Blockchain Metrics</h6>
                  <ul className="list-disc pl-6 mt-1">
                    <li>Transaction confirmation times</li>
                    <li>Gas prices and consumption</li>
                    <li>Node synchronization status</li>
                    <li>Smart contract execution metrics</li>
                    <li>Cross-chain bridge performance</li>
                  </ul>
                </div>
              </div>

              <h5 className="font-medium mb-2">Implementation:</h5>
              <p>
                Our monitoring system is implemented using a combination of Prometheus for metrics collection, Grafana
                for visualization, Loki for log aggregation, and Jaeger for distributed tracing. Custom alerting rules
                are defined to detect anomalies and potential issues before they impact users.
              </p>
            </TabsContent>
          </Tabs>

          <h3 className="text-xl font-semibold mb-3">System Architecture</h3>
          <p className="mb-4 text-base font-normal">
            These technical components are organized into a layered architecture that provides separation of concerns
            and enables independent scaling of different components:
          </p>

          <div className="border p-4 rounded-md mb-6">
            <pre className="text-sm overflow-x-auto">
              {`┌─────────────────────────────────────────────────────────────┐
│                      Client Applications                      │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                         API Gateway                          │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      Service Layer                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Portfolio   │  │ User        │  │ Risk                │  │
│  │ Management  │  │ Management  │  │ Management          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                      Domain Layer                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Finance     │  │ Security    │  │ Blockchain          │  │
│  │ Models      │  │ Models      │  │ Operations          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Integration Layer                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Blockchain  │  │ Data        │  │ External            │  │
│  │ Connectors  │  │ Providers   │  │ Services            │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────▼─────────────────────────────────┐
│                    Infrastructure Layer                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Data        │  │ Monitoring  │  │ Security            │  │
│  │ Storage     │  │ & Logging   │  │ Infrastructure      │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘`}
            </pre>
          </div>

          <h3 className="text-xl font-semibold mb-3">Technology Stack</h3>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai leverages a modern technology stack to implement its technical components:
          </p>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Technologies</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Programming Languages</TableCell>
                <TableCell>Rust, TypeScript, Python, Solidity</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Backend Services</TableCell>
                <TableCell>Node.js, Actix Web, FastAPI, gRPC</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Data Processing</TableCell>
                <TableCell>Apache Kafka, Apache Spark, Redis Streams</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Databases</TableCell>
                <TableCell>PostgreSQL, TimescaleDB, Redis, MongoDB</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Infrastructure</TableCell>
                <TableCell>Kubernetes, Terraform, Docker, AWS/GCP</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Monitoring</TableCell>
                <TableCell>Prometheus, Grafana, Jaeger, ELK Stack</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Security</TableCell>
                <TableCell>Vault, OAuth2, JWT, TLS, WAF</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="text-xl font-semibold mt-6 mb-3">Deployment Architecture</h3>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai is deployed using a cloud-native architecture that leverages containerization,
            orchestration, and infrastructure as code to ensure reliability, scalability, and security:
          </p>

          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Multi-Region Deployment:</strong> Services are deployed across multiple geographic regions to
              ensure low latency and high availability.
            </li>
            <li className="text-base font-normal">
              <strong>Kubernetes Orchestration:</strong> All services are containerized and managed by Kubernetes for
              automated scaling, deployment, and recovery.
            </li>
            <li className="text-base font-normal">
              <strong>Infrastructure as Code:</strong> All infrastructure is defined and managed using Terraform,
              enabling consistent and repeatable deployments.
            </li>
            <li className="text-base font-normal">
              <strong>CI/CD Pipeline:</strong> Automated testing, building, and deployment processes ensure rapid and
              reliable updates.
            </li>
            <li className="text-base font-normal">
              <strong>Blue-Green Deployments:</strong> New versions are deployed alongside existing versions to enable
              seamless updates and rollbacks.
            </li>
          </ul>

          <p className="text-base font-normal">
            This comprehensive technical infrastructure provides the foundation for VeritasVault.ai's multi-chain
            portfolio management capabilities, ensuring security, scalability, and reliability across all operations.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
