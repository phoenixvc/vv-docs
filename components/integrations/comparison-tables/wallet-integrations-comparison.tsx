import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionAnchor } from "@/components/section-anchor"
import { Check, AlertCircle, HelpCircle } from "lucide-react"

export function WalletIntegrationsComparison() {
  return (
    <section id="wallet-integrations-comparison" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Wallet Integrations Comparison
            <SectionAnchor id="wallet-integrations-comparison" />
          </h2>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai has evaluated multiple wallet integration options to provide secure, user-friendly access to
            multi-chain portfolio management. This comparison outlines the key factors in our selection process and
            explains the strengths and weaknesses of each wallet solution.
          </p>

          <div className="overflow-x-auto">
            <Table className="mb-8">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Provider</TableHead>
                  <TableHead>Security</TableHead>
                  <TableHead>User Experience</TableHead>
                  <TableHead>Multi-chain Support</TableHead>
                  <TableHead>Hardware Wallet Support</TableHead>
                  <TableHead>Integration Complexity</TableHead>
                  <TableHead>Customization</TableHead>
                  <TableHead>Selected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">EtherMail</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Excellent</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Extensive</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Full</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Plurality</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very Good</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Extensive</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Limited</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Low</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">MetaMask</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Good</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Limited</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Good</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very Low</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">Low</TableCell>
                  <TableCell>
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">WalletConnect</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Good</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Extensive</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Full</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell>
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Coinbase Wallet</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very Good</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Limited</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Limited</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Low</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">Very Low</TableCell>
                  <TableCell>
                    <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h3 className="text-xl font-semibold mb-2">Key Insights</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-base font-normal">
              <strong>Security Priority:</strong> EtherMail and Plurality were selected for their superior security
              features and multi-chain support, which are critical for VeritasVault.ai's architecture.
            </li>
            <li className="text-base font-normal">
              <strong>Customization Needs:</strong> The selected wallets offer high customization capabilities, allowing
              for seamless integration with VeritasVault.ai's user interface and security requirements.
            </li>
            <li className="text-base font-normal">
              <strong>Future Integrations:</strong> MetaMask and WalletConnect are planned for future integration to
              expand user options, while Coinbase Wallet is under evaluation for potential inclusion in later phases.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
