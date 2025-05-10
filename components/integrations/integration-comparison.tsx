import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionAnchor } from "@/components/section-anchor"
import { Check, X, AlertCircle, HelpCircle } from "lucide-react"

export function IntegrationComparison() {
  return (
    <section id="integration-comparison" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Integration Comparison
            <SectionAnchor id="integration-comparison" />
          </h2>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai has evaluated multiple integration options across different categories to ensure the most
            robust, secure, and efficient multi-chain architecture. This comparison outlines the key factors in our
            selection process and explains why specific integrations were chosen.
          </p>

          <h3 className="text-xl font-semibold mb-4">Data Providers</h3>
          <Table className="mb-8">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Provider</TableHead>
                <TableHead>Data Quality</TableHead>
                <TableHead>API Reliability</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Selected</TableHead>
                <TableHead>Rationale</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">CoinGecko</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-green-600">Extensive</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell>
                  <Check className="h-5 w-5 text-green-600" />
                </TableCell>
                <TableCell>Comprehensive market data with reliable API</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">DeFiLlama</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell className="text-green-600">Extensive</TableCell>
                <TableCell className="text-green-600">Low</TableCell>
                <TableCell>
                  <Check className="h-5 w-5 text-green-600" />
                </TableCell>
                <TableCell>Best-in-class DeFi protocol data</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">CryptoCompare</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-amber-600">Good</TableCell>
                <TableCell className="text-red-600">High</TableCell>
                <TableCell>
                  <X className="h-5 w-5 text-red-600" />
                </TableCell>
                <TableCell>Cost prohibitive for current phase</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="text-xl font-semibold mb-4">Wallet Integrations</h3>
          <Table className="mb-8">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Provider</TableHead>
                <TableHead>Security</TableHead>
                <TableHead>User Experience</TableHead>
                <TableHead>Multi-chain Support</TableHead>
                <TableHead>Integration Ease</TableHead>
                <TableHead>Selected</TableHead>
                <TableHead>Rationale</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">EtherMail</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-green-600">Excellent</TableCell>
                <TableCell className="text-green-600">Extensive</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell>
                  <Check className="h-5 w-5 text-green-600" />
                </TableCell>
                <TableCell>Best-in-class security and user experience</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">MetaMask</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell className="text-amber-600">Good</TableCell>
                <TableCell className="text-amber-600">Limited</TableCell>
                <TableCell className="text-green-600">Easy</TableCell>
                <TableCell>
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </TableCell>
                <TableCell>Planned for future integration</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">WalletConnect</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-amber-600">Good</TableCell>
                <TableCell className="text-green-600">Extensive</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell>
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </TableCell>
                <TableCell>Planned for future integration</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="text-xl font-semibold mb-4">Blockchain Integrations</h3>
          <Table className="mb-8">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Provider</TableHead>
                <TableHead>Security</TableHead>
                <TableHead>Scalability</TableHead>
                <TableHead>Interoperability</TableHead>
                <TableHead>Developer Support</TableHead>
                <TableHead>Selected</TableHead>
                <TableHead>Rationale</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Pinax</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-green-600">Excellent</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-green-600">Excellent</TableCell>
                <TableCell>
                  <Check className="h-5 w-5 text-green-600" />
                </TableCell>
                <TableCell>Superior cross-chain communication</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Plurality</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-amber-600">Good</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-amber-600">Good</TableCell>
                <TableCell>
                  <Check className="h-5 w-5 text-green-600" />
                </TableCell>
                <TableCell>Excellent for data verification</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">EigenLayer</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell className="text-green-600">Good</TableCell>
                <TableCell>
                  <Check className="h-5 w-5 text-green-600" />
                </TableCell>
                <TableCell>Restaking capabilities enhance security</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">EtherLink</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell>
                  <Check className="h-5 w-5 text-green-600" />
                </TableCell>
                <TableCell>Optimized for cross-chain data transfer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Polygon</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell className="text-green-600">Excellent</TableCell>
                <TableCell>
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                </TableCell>
                <TableCell>Under evaluation for future integration</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="text-xl font-semibold mb-4">Risk Management</h3>
          <Table className="mb-8">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Provider</TableHead>
                <TableHead>Analysis Depth</TableHead>
                <TableHead>Real-time Capabilities</TableHead>
                <TableHead>Integration Complexity</TableHead>
                <TableHead>Customization</TableHead>
                <TableHead>Selected</TableHead>
                <TableHead>Rationale</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Risk Bot</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell className="text-green-600">Excellent</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell className="text-green-600">High</TableCell>
                <TableCell>
                  <Check className="h-5 w-5 text-green-600" />
                </TableCell>
                <TableCell>Best-in-class risk analysis with AI capabilities</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">In-house Solution</TableCell>
                <TableCell className="text-amber-600">Medium</TableCell>
                <TableCell className="text-amber-600">Good</TableCell>
                <TableCell className="text-green-600">Low</TableCell>
                <TableCell className="text-green-600">Very High</TableCell>
                <TableCell>
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                </TableCell>
                <TableCell>Under development as complementary system</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <h3 className="text-xl font-semibold mb-4">Integration Strategy</h3>
          <p className="mb-4 text-base font-normal">
            VeritasVault.ai has adopted a phased integration approach to ensure system stability and security:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-base font-normal">
              <strong>Phase 1:</strong> Core integrations (CoinGecko, DeFiLlama, EtherMail, Pinax, Risk Bot)
            </li>
            <li className="text-base font-normal">
              <strong>Phase 2:</strong> Secondary integrations (Plurality, EigenLayer, EtherLink)
            </li>
            <li className="text-base font-normal">
              <strong>Phase 3:</strong> Expanded wallet support (MetaMask, WalletConnect) and additional blockchain
              integrations
            </li>
          </ul>

          <p className="text-base font-normal">
            This strategic approach allows for thorough testing and optimization at each phase while maintaining a focus
            on security, reliability, and user experience. The modular architecture of VeritasVault.ai enables seamless
            addition of new integrations without disrupting existing functionality.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
