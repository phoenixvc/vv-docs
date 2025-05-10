import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionAnchor } from "@/components/section-anchor"
import { Check, AlertCircle, HelpCircle } from "lucide-react"

export function BlockchainIntegrationsComparison() {
  return (
    <section id="blockchain-integrations-comparison" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Blockchain Integrations Comparison
            <SectionAnchor id="blockchain-integrations-comparison" />
          </h2>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai has evaluated multiple blockchain integration options to create a robust, secure, and
            scalable multi-chain architecture. This comparison outlines the key factors in our selection process and
            explains the strengths and weaknesses of each blockchain solution.
          </p>

          <div className="overflow-x-auto">
            <Table className="mb-8">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Provider</TableHead>
                  <TableHead>Security</TableHead>
                  <TableHead>Scalability</TableHead>
                  <TableHead>Interoperability</TableHead>
                  <TableHead>Developer Support</TableHead>
                  <TableHead>Transaction Costs</TableHead>
                  <TableHead>Ecosystem Maturity</TableHead>
                  <TableHead>Selected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">EigenLayer</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Good</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Growing</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">EtherLink</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Low</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Emerging</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Polygon</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Excellent</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Low</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Mature</TableCell>
                  <TableCell>
                    <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Arbitrum</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Good</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Low</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Mature</TableCell>
                  <TableCell>
                    <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cosmos</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Mature</TableCell>
                  <TableCell>
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <h3 className="text-xl font-semibold mb-2">Key Insights</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-base font-normal">
              <strong>Security and Interoperability Balance:</strong> EigenLayer was selected for its superior security
              features through restaking, while EtherLink provides excellent cross-chain communication capabilities.
            </li>
            <li className="text-base font-normal">
              <strong>Ecosystem Considerations:</strong> While Polygon and Arbitrum offer mature ecosystems, they are
              still under evaluation for specific use cases within the VeritasVault.ai architecture.
            </li>
            <li className="text-base font-normal">
              <strong>Future Expansion:</strong> Cosmos is being considered for future integration due to its strong
              interoperability features, which could enhance VeritasVault.ai's cross-chain capabilities in later phases.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
