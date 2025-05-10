import { SectionLevelOne } from "./section-templates/section-level-one"
import { SectionLevelTwo } from "./section-templates/section-level-two"
import { SectionLevelThree } from "./section-templates/section-level-three"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function VisualHierarchyExamples() {
  return (
    <div className="space-y-12">
      <div>
        <h2 className="text-3xl font-bold mb-6">Visual Hierarchy Examples</h2>
        <p className="text-lg text-muted-foreground mb-8">
          These examples demonstrate the visual hierarchy system used throughout the documentation. Each level has
          distinct visual indicators to help users understand the content structure.
        </p>
      </div>

      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="sections">Section Levels</TabsTrigger>
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="content">Content Types</TabsTrigger>
          <TabsTrigger value="states">Interactive States</TabsTrigger>
        </TabsList>

        <TabsContent value="sections" className="space-y-10">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Section Level Examples</h3>

            <SectionLevelOne
              id="example-level-one"
              title="Level One Section"
              description="Main section with primary visual importance"
              sectionNumber="1"
            >
              <p className="mb-4">
                This is a Level One section, representing a major topic in the documentation. It uses the largest
                heading size, a prominent badge, and a strong left border.
              </p>

              <SectionLevelTwo
                id="example-level-two"
                title="Level Two Section"
                description="Subsection with secondary visual importance"
                sectionNumber="1.1"
              >
                <p className="mb-4">
                  This is a Level Two section, representing a subtopic within the main section. It uses a medium heading
                  size, a medium badge, and a medium left border.
                </p>

                <SectionLevelThree
                  id="example-level-three"
                  title="Level Three Section"
                  description="Detailed component with tertiary visual importance"
                  sectionNumber="1.1.1"
                >
                  <p>
                    This is a Level Three section, representing a detailed component within a subtopic. It uses a
                    smaller heading size, a small badge, and a subtle left border. It also has left indentation to
                    indicate its nesting level.
                  </p>
                </SectionLevelThree>
              </SectionLevelTwo>
            </SectionLevelOne>
          </div>
        </TabsContent>

        <TabsContent value="navigation" className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Navigation Hierarchy Examples</h3>

            <div className="border rounded-md p-4 bg-background">
              <h4 className="text-lg font-medium mb-3">Sidebar Navigation</h4>

              <div className="space-y-1 border-l-2 border-primary/20 pl-3">
                <div className="py-1">
                  <span className="text-sm">1. Project Overview</span>
                </div>

                <div className="py-1 bg-primary/10 -ml-3 pl-3 border-l-2 border-primary">
                  <span className="text-sm font-medium text-primary">2. System Architecture</span>
                </div>

                <div className="ml-4 space-y-1 border-l border-muted/30 pl-2">
                  <div className="py-1">
                    <span className="text-xs">2.1 Architecture Overview</span>
                  </div>

                  <div className="py-1 bg-primary/5 -ml-2 pl-2 border-l border-primary/50">
                    <span className="text-xs font-medium text-primary/80">2.2 Layered Architecture</span>
                  </div>

                  <div className="ml-3 space-y-1 border-l border-muted/20 pl-2">
                    <div className="py-1 bg-primary/5 -ml-2 pl-2 border-l border-primary/30">
                      <span className="text-xs text-primary/70">2.2.1 Data Layer</span>
                    </div>

                    <div className="py-1">
                      <span className="text-xs">2.2.2 Service Layer</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <span className="text-xs">2.3 Architecture Diagrams</span>
                  </div>
                </div>

                <div className="py-1">
                  <span className="text-sm">3. Finance Models</span>
                </div>
              </div>
            </div>

            <div className="border rounded-md p-4 bg-background mt-6">
              <h4 className="text-lg font-medium mb-3">Table of Contents</h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="rounded-md py-1">
                    <span className="text-sm">1. Project Overview</span>
                  </div>

                  <div className="rounded-md bg-primary/10 py-1 px-2">
                    <span className="text-sm font-medium text-primary">2. System Architecture</span>
                  </div>

                  <div className="ml-4 space-y-1 border-l pl-2 border-primary/50">
                    <div className="py-1">
                      <span className="text-xs">2.1 Architecture Overview</span>
                    </div>

                    <div className="py-1 bg-primary/5 -ml-2 pl-2 border-l border-primary/50">
                      <span className="text-xs font-medium text-primary/80">2.2 Layered Architecture</span>
                    </div>

                    <div className="py-1">
                      <span className="text-xs">2.3 Architecture Diagrams</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="rounded-md py-1">
                    <span className="text-sm">3. Finance Models</span>
                  </div>

                  <div className="rounded-md py-1">
                    <span className="text-sm">4. Technical Infrastructure</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Content Type Examples</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Text Content</CardTitle>
                  <CardDescription>Standard text formatting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm dark:prose-invert">
                    <p>This is standard text content with paragraph styling.</p>
                    <p>It uses the default text size and spacing for readability.</p>
                    <ul>
                      <li>List items are properly formatted</li>
                      <li>With consistent indentation</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Code Example</CardTitle>
                  <CardDescription>Code block formatting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-md p-4 font-mono text-sm">
                    <pre>{`function calculateTokenValue(
  basePrice: number, 
  marketFactor: number
): number {
  // Apply market adjustment
  return basePrice * marketFactor;
}`}</pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Diagram</CardTitle>
                  <CardDescription>Visual content formatting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md p-2 bg-background">
                    <div className="h-32 bg-muted/30 flex items-center justify-center">[Diagram Placeholder]</div>
                    <p className="text-xs text-center text-muted-foreground mt-2">
                      Figure 2.1: Example architecture diagram
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Table</CardTitle>
                  <CardDescription>Tabular data formatting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-md overflow-hidden">
                    <table className="w-full border-collapse">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="p-2 text-left text-sm font-medium border-b">Token</th>
                          <th className="p-2 text-left text-sm font-medium border-b">Allocation</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="even:bg-muted/20">
                          <td className="p-2 text-sm">Community</td>
                          <td className="p-2 text-sm">40%</td>
                        </tr>
                        <tr className="even:bg-muted/20">
                          <td className="p-2 text-sm">Team</td>
                          <td className="p-2 text-sm">15%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="states" className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-4">Interactive States</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Navigation States</CardTitle>
                  <CardDescription>Visual indicators for navigation</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center p-2 rounded-md">
                    <span className="text-sm text-muted-foreground">Normal item</span>
                  </div>

                  <div className="flex items-center p-2 rounded-md bg-primary/10 border-l-2 border-primary pl-3">
                    <span className="text-sm font-medium text-primary">Active item</span>
                  </div>

                  <div className="flex items-center p-2 rounded-md bg-primary/5">
                    <span className="text-sm text-primary/80">Parent of active item</span>
                  </div>

                  <div className="flex items-center p-2 rounded-md hover:bg-muted/30 transition-colors">
                    <span className="text-sm text-muted-foreground hover:text-foreground">Hover state</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Focus States</CardTitle>
                  <CardDescription>Visual indicators for focus</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <button className="px-3 py-1 border rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                      Normal Button
                    </button>
                  </div>

                  <div>
                    <button className="px-3 py-1 border rounded-md bg-primary/10 text-primary border-primary/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
                      Active Button
                    </button>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Focus example"
                      className="px-3 py-1 border rounded-md w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
