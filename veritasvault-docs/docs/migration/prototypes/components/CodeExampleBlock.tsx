import clsx from "clsx"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"
import CodeBlock from "@theme/CodeBlock"
import { CopyButton } from "./CopyButton"

interface CodeTabDefinition {
  title: string
  language: string
  code: string
}

interface CodeExampleBlockProps {
  title: string
  description?: string
  tabs: CodeTabDefinition[]
  className?: string
}

/**
 * Code example block component for displaying code snippets with tabs
 */
export function CodeExampleBlock({ title, description, tabs, className }: CodeExampleBlockProps): JSX.Element {
  return (
    <div className={clsx("mb-6 rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="flex flex-col space-y-1.5 p-6 pb-2">
        <h4 className="text-lg font-semibold leading-none tracking-tight">{title}</h4>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="p-6 pt-2">
        <Tabs>
          {tabs.map((tab) => (
            <TabItem key={tab.title} value={tab.title.toLowerCase().replace(/\s+/g, "-")} label={tab.title}>
              <div className="relative">
                <CodeBlock language={tab.language}>{tab.code}</CodeBlock>
                <div className="absolute top-2 right-2">
                  <CopyButton text={tab.code} />
                </div>
              </div>
            </TabItem>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
