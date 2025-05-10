"use client"
import { Card, CardContent } from "@/components/ui/card"
import { SectionAnchor } from "@/components/section-anchor"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export function BlackLittermanModel() {
  return (
    <section id="black-litterman" className="scroll-mt-20">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 group flex items-center">
            Black-Litterman Model
            <SectionAnchor id="black-litterman" />
          </h2>

          <p className="mb-4 text-base font-normal">
            The Black-Litterman model is a sophisticated portfolio optimization framework that combines market
            equilibrium returns with investor views to generate more stable and intuitive portfolio allocations.
            VeritasVault.ai has adapted this model specifically for multi-chain crypto asset portfolios.
          </p>

          <Alert className="mb-6">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Key Innovation</AlertTitle>
            <AlertDescription>
              Our implementation extends the traditional Black-Litterman model to incorporate on-chain metrics,
              cross-chain correlations, and blockchain-specific risk factors.
            </AlertDescription>
          </Alert>

          <h3 className="text-xl font-semibold mb-3">Model Components</h3>

          <Tabs defaultValue="equilibrium" className="mb-6">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="equilibrium">Market Equilibrium</TabsTrigger>
              <TabsTrigger value="views">Investor Views</TabsTrigger>
              <TabsTrigger value="optimization">Portfolio Optimization</TabsTrigger>
            </TabsList>
            <TabsContent value="equilibrium" className="p-4 border rounded-md mt-2">
              <h4 className="font-medium mb-2">Market Equilibrium Returns</h4>
              <p className="mb-3">
                We derive market equilibrium returns from on-chain metrics, market capitalization, and trading volumes
                across multiple blockchains. This provides a baseline for expected returns that reflects the current
                state of the crypto market.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data Source</TableHead>
                    <TableHead>Contribution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>On-chain metrics</TableCell>
                    <TableCell>Network activity, transaction volume, active addresses</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Market data</TableCell>
                    <TableCell>Market capitalization, trading volume, liquidity</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Cross-chain analytics</TableCell>
                    <TableCell>Bridge volumes, cross-chain correlations</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="views" className="p-4 border rounded-md mt-2">
              <h4 className="font-medium mb-2">Investor Views Integration</h4>
              <p className="mb-3">
                Our model allows for the incorporation of both quantitative and qualitative investor views on specific
                assets or blockchain ecosystems. These views are weighted based on confidence levels and integrated with
                market equilibrium returns.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>View Type</TableHead>
                    <TableHead>Implementation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Absolute views</TableCell>
                    <TableCell>Direct return expectations for specific assets</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Relative views</TableCell>
                    <TableCell>Comparative performance expectations between assets</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Ecosystem views</TableCell>
                    <TableCell>Expectations for entire blockchain ecosystems</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="optimization" className="p-4 border rounded-md mt-2">
              <h4 className="font-medium mb-2">Portfolio Optimization Process</h4>
              <p className="mb-3">
                The final step combines market equilibrium returns with investor views to generate optimized portfolio
                weights. Our implementation includes constraints specific to crypto assets, such as liquidity thresholds
                and cross-chain exposure limits.
              </p>
              <ol className="list-decimal pl-5 space-y-2 mb-4">
                <li>Calculate posterior returns by combining market equilibrium with investor views</li>
                <li>Estimate the covariance matrix using historical data and on-chain metrics</li>
                <li>Apply optimization algorithm with crypto-specific constraints</li>
                <li>Generate optimal portfolio weights across multiple blockchain networks</li>
                <li>Implement rebalancing recommendations with cross-chain efficiency considerations</li>
              </ol>
            </TabsContent>
          </Tabs>

          <h3 className="text-xl font-semibold mb-3">Multi-Chain Adaptation</h3>
          <p className="mb-4 text-base font-normal">
            Our adaptation of the Black-Litterman model for multi-chain environments addresses several unique
            challenges:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Cross-Chain Correlations:</strong> We analyze how assets across different blockchains correlate,
              accounting for ecosystem-specific risks and opportunities.
            </li>
            <li className="text-base font-normal">
              <strong>Blockchain-Specific Risk Factors:</strong> Each blockchain has unique risk characteristics related
              to consensus mechanisms, security models, and governance structures.
            </li>
            <li className="text-base font-normal">
              <strong>Liquidity Variations:</strong> The model accounts for significant differences in liquidity across
              different blockchain networks.
            </li>
            <li className="text-base font-normal">
              <strong>Gas and Transaction Costs:</strong> Optimization includes considerations for cross-chain
              transaction costs and gas fees.
            </li>
          </ul>

          <h3 className="text-xl font-semibold mb-3">Implementation Example</h3>
          <p className="mb-4 text-base font-normal">
            The following code snippet illustrates the core mathematical implementation of our multi-chain
            Black-Litterman model:
          </p>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto mb-4">
            <code>{`
# Python implementation of Multi-Chain Black-Litterman
import numpy as np
from scipy.optimize import minimize

def multi_chain_black_litterman(
    market_caps, 
    cov_matrix, 
    views, 
    view_confidences, 
    risk_aversion=2.5,
    cross_chain_constraints=None
):
    # Calculate market equilibrium returns
    weights_market = market_caps / np.sum(market_caps)
    pi = risk_aversion * np.dot(cov_matrix, weights_market)
    
    # Process investor views
    P = np.array(views)  # View matrix
    Omega = np.diag(view_confidences)  # Diagonal matrix of view confidences
    
    # Combine market equilibrium with views
    tau = 0.05  # Scaling parameter
    M = np.linalg.inv(tau * np.linalg.inv(cov_matrix) + P.T @ np.linalg.inv(Omega) @ P)
    combined_returns = M @ (tau * np.linalg.inv(cov_matrix) @ pi + P.T @ np.linalg.inv(Omega) @ views)
    
    # Optimize portfolio with cross-chain constraints
    def objective(weights):
        return -np.dot(weights, combined_returns) + risk_aversion * weights @ cov_matrix @ weights
    
    # Apply cross-chain specific constraints
    constraints = [{'type': 'eq', 'fun': lambda x: np.sum(x) - 1}]  # Sum to 1
    if cross_chain_constraints:
        constraints.extend(cross_chain_constraints)
    
    bounds = [(0, 1) for _ in range(len(market_caps))]  # No short selling
    
    result = minimize(objective, weights_market, bounds=bounds, constraints=constraints)
    return result.x  # Optimal portfolio weights
`}</code>
          </pre>

          <h3 className="text-xl font-semibold mb-3">Performance Benefits</h3>
          <p className="mb-4 text-base font-normal">
            Our multi-chain adaptation of the Black-Litterman model has demonstrated several key benefits:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li className="text-base font-normal">
              <strong>Improved Diversification:</strong> More effective risk distribution across multiple blockchain
              ecosystems.
            </li>
            <li className="text-base font-normal">
              <strong>Reduced Estimation Error:</strong> By combining market equilibrium with investor views, the model
              reduces the impact of estimation errors.
            </li>
            <li className="text-base font-normal">
              <strong>Enhanced Stability:</strong> Portfolio allocations are more stable and less sensitive to small
              changes in input parameters.
            </li>
            <li className="text-base font-normal">
              <strong>Intuitive Allocations:</strong> The resulting portfolios better align with investor expectations
              and market realities.
            </li>
          </ul>

          <p className="text-base font-normal">
            By incorporating the Black-Litterman model into our finance models suite, VeritasVault.ai provides users
            with sophisticated portfolio optimization capabilities that are specifically tailored for the unique
            characteristics of multi-chain crypto assets.
          </p>
        </CardContent>
      </Card>
    </section>
  )
}
