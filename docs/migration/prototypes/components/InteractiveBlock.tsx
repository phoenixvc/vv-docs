import type React from "react"
import clsx from "clsx"
import Tabs from "@theme/Tabs"
import TabItem from "@theme/TabItem"

interface TabDefinition {
  title: string
  content: React.ReactNode
}

interface InteractiveBlockProps {
  title: string
  description?: string
  tabs: TabDefinition[]
  defaultTab?: string
  footer?: React.ReactNode
  className?: string
}

/**
 * Interactive block component with tabs for displaying different content sections
 */
export function InteractiveBlock({
  title,
  description,
  tabs,
  defaultTab,
  footer,
  className,
}: InteractiveBlockProps): JSX.Element {
  const defaultValue = defaultTab || tabs[0].title.toLowerCase().replace(/\s+/g, "-")

  return (
    <div className={clsx("mb-6 rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="flex flex-col space-y-1.5 p-6 pb-2">
        <h4 className="text-lg font-semibold leading-none tracking-tight">{title}</h4>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="p-6 pt-2">
        <Tabs defaultValue={defaultValue}>
          {tabs.map((tab) => (
            <TabItem key={tab.title} value={tab.title.toLowerCase().replace(/\s+/g, "-")} label={tab.title}>
              {tab.content}
            </TabItem>
          ))}
        </Tabs>
      </div>
      {footer && <div className="flex items-center p-6 pt-0">{footer}</div>}
    </div>
  )
}
