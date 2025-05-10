import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionAnchor } from "@/components/section-anchor"
import { Check, X, AlertCircle, HelpCircle } from "lucide-react"

export function RiskManagementComparison() {
  return (
    <section id="risk-management-comparison" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Risk Management Integrations Comparison
            <SectionAnchor id="risk-management-comparison" />
          </h2>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai has evaluated multiple risk management solutions to ensure comprehensive risk assessment and
            mitigation across its multi-chain architecture. This comparison outlines the key factors in our selection
            process and explains the strengths and weaknesses of each risk management solution.
          </p>

          <div className="overflow-x-auto">
            <Table className="mb-8">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Provider</TableHead>
                  <TableHead>Analysis Depth</TableHead>
                  <TableHead>Real-time Capabilities</TableHead>
                  <TableHead>Multi-chain Coverage</TableHead>
                  <TableHead>AI/ML Capabilities</TableHead>
                  <TableHead>Integration Complexity</TableHead>
                  <TableHead>Customization</TableHead>
                  <TableHead>Selected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Risk Bot</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Excellent</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Extensive</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Advanced</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">In-house Solution</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Good</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Limited</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Basic</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Low</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell>
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gauntlet</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Good</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Limited</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Advanced</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell>
                    <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chaos Labs</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very Good</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Advanced</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
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
              <strong>Comprehensive Analysis:</strong> Risk Bot was selected for its superior analysis depth, real-time
              capabilities, and extensive multi-chain coverage, which are essential for VeritasVault.ai's risk
              management framework.
            </li>
            <li className="text-base font-normal">
              <strong>Complementary Approach:</strong> An in-house solution is being developed as a complementary system
              to address specific risk factors unique to VeritasVault.ai's architecture.
            </li>
            <li className="text-base font-normal">
              <strong>Future Considerations:</strong> While Gauntlet offers advanced risk modeling, its high integration
              complexity and limited multi-chain coverage made it less suitable for the current phase. Chaos Labs is
              under evaluation for potential future integration to enhance specific risk assessment capabilities.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
