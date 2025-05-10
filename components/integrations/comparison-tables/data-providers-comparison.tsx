import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SectionAnchor } from "@/components/section-anchor"
import { Check, X, AlertCircle } from "lucide-react"

export function DataProvidersComparison() {
  return (
    <section id="data-providers-comparison" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Data Providers Comparison
            <SectionAnchor id="data-providers-comparison" />
          </h2>

          <p className="mb-6 text-base font-normal">
            VeritasVault.ai has evaluated multiple data provider options to ensure comprehensive, accurate, and reliable
            data for portfolio management and risk assessment. This comparison outlines the key factors in our selection
            process and explains the strengths and weaknesses of each provider.
          </p>

          <div className="overflow-x-auto">
            <Table className="mb-8">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Provider</TableHead>
                  <TableHead>Data Quality</TableHead>
                  <TableHead>API Reliability</TableHead>
                  <TableHead>Coverage</TableHead>
                  <TableHead>Update Frequency</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Integration Complexity</TableHead>
                  <TableHead>Selected</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">CoinGecko</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Extensive</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">5 min</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Low</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">DeFiLlama</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Extensive</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">10 min</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Low</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pinax</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Good</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Real-time</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Goldsky</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Very High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Good</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Real-time</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell>
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">CryptoCompare</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Good</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">1 min</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">Very High</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Low</TableCell>
                  <TableCell>
                    <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">The Graph</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">High</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Limited</TableCell>
                  <TableCell className="text-green-600 dark:text-green-400">Real-time</TableCell>
                  <TableCell className="text-amber-600 dark:text-amber-400">Medium</TableCell>
                  <TableCell className="text-red-600 dark:text-red-400">High</TableCell>
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
              <strong>Complementary Strengths:</strong> CoinGecko provides broad market data, while DeFiLlama excels in
              DeFi protocol metrics. Pinax and Goldsky offer real-time on-chain data with different coverage areas.
            </li>
            <li className="text-base font-normal">
              <strong>Cost vs. Quality:</strong> While CryptoCompare offers high-quality data, its cost is prohibitive
              for the current phase. The selected providers offer the best balance of quality and cost.
            </li>
            <li className="text-base font-normal">
              <strong>Integration Strategy:</strong> The Graph is being evaluated for future integration to enhance
              specific on-chain data queries as the platform scales.
            </li>
          </ul>
        </CardContent>
      </Card>
    </section>
  )
}
