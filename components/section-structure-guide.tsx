import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SectionStructureGuide() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Documentation Structure Guide</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="guidelines">Structure Guidelines</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <p>
              This documentation follows a consistent hierarchical structure to ensure information is organized
              logically and accessibly. Each major section contains 2-7 subsections, with a maximum of 3 levels of
              nesting to maintain clarity.
            </p>
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-2">Structure Overview:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>10 main sections (Level 1)</li>
                <li>2-7 subsections per main section (Level 2)</li>
                <li>Selected Level 2 sections have child sections (Level 3)</li>
                <li>No content is nested beyond 3 levels</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-4 mt-4">
            <h4 className="font-medium mb-2">Section Structure Guidelines:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Main Sections (Level 1):</strong> Represent major topic areas with clear boundaries
              </li>
              <li>
                <strong>Subsections (Level 2):</strong> Cover distinct aspects of the parent topic
              </li>
              <li>
                <strong>Child Sections (Level 3):</strong> Provide detailed information on specific components
              </li>
              <li>
                <strong>Content Organization:</strong> Related concepts are grouped together under common parent
                sections
              </li>
              <li>
                <strong>Progressive Disclosure:</strong> Information flows from general to specific as you navigate
                deeper
              </li>
            </ul>
          </TabsContent>

          <TabsContent value="examples" className="space-y-4 mt-4">
            <h4 className="font-medium mb-2">Structure Examples:</h4>
            <div className="bg-muted p-4 rounded-md mb-4">
              <p className="font-medium">Finance Models Section:</p>
              <ul className="list-disc pl-5">
                <li>3.1 Finance Models Overview (Level 2)</li>
                <li>
                  3.2 Portfolio Optimization (Level 2)
                  <ul className="list-circle pl-5">
                    <li>3.2.1 Monte Carlo Simulation (Level 3)</li>
                    <li>3.2.2 Factor Models (Level 3)</li>
                    <li>3.2.3 Black-Litterman Model (Level 3)</li>
                  </ul>
                </li>
                <li>3.3 Yield Strategies (Level 2)</li>
                <li>3.4 AI Models (Level 2)</li>
              </ul>
            </div>
            <div className="bg-muted p-4 rounded-md">
              <p className="font-medium">Tokenomics Section:</p>
              <ul className="list-disc pl-5">
                <li>5.1 Tokenomics Overview (Level 2)</li>
                <li>
                  5.2 Token Model (Level 2)
                  <ul className="list-circle pl-5">
                    <li>5.2.1 Token Distribution (Level 3)</li>
                    <li>5.2.2 Token Vesting Schedule (Level 3)</li>
                  </ul>
                </li>
                <li>5.3 Token Utility (Level 2)</li>
                <li>5.4 Token Economics (Level 2)</li>
                <li>5.5 Token Governance (Level 2)</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
