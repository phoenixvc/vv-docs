"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy } from "lucide-react"
import { cn } from "@/lib/utils"

interface CodeTab {
  title: string
  language: string
  code: string
}

interface CodeExampleBlockProps {
  title: string
  description?: string
  tabs: CodeTab[]
  className?: string
}

export function CodeExampleBlock({ title, description, tabs, className }: CodeExampleBlockProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card className={cn("mb-6", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2">
        <Tabs defaultValue={tabs[0].title.toLowerCase().replace(/\s+/g, "-")}>
          <TabsList className="mb-2">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.title} value={tab.title.toLowerCase().replace(/\s+/g, "-")}>
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.title} value={tab.title.toLowerCase().replace(/\s+/g, "-")} className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => copyToClipboard(tab.code)}
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copy code</span>
              </Button>
              <pre className={`language-${tab.language} p-4 rounded-md bg-muted overflow-x-auto`}>
                <code>{tab.code}</code>
              </pre>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
