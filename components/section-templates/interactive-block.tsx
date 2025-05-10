import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface InteractiveTab {
  title: string
  content: ReactNode
}

interface InteractiveBlockProps {
  title: string
  description?: string
  tabs: InteractiveTab[]
  defaultTab?: string
  footer?: ReactNode
  className?: string
}

export function InteractiveBlock({ title, description, tabs, defaultTab, footer, className }: InteractiveBlockProps) {
  const defaultValue = defaultTab || tabs[0].title.toLowerCase().replace(/\s+/g, "-")

  return (
    <Card className={cn("mb-6", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue={defaultValue}>
          <TabsList className="mb-4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.title} value={tab.title.toLowerCase().replace(/\s+/g, "-")}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.title} value={tab.title.toLowerCase().replace(/\s+/g, "-")}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}
