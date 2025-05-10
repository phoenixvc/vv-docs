"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Info, ChevronDown, ChevronUp } from "lucide-react"

export function PageStructureExplanation() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="mb-6 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Info className="text-amber-500 mt-1 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="text-amber-600 dark:text-amber-400 font-medium mb-1">About the Page Structure</h3>
            <p className="text-sm text-amber-600/80 dark:text-amber-400/80 mb-2">
              Currently, all integrations, technical infrastructure, and governance sections are displayed on a single
              page for simplicity. This makes the content easier to navigate during the initial development phase.
            </p>

            {isExpanded && (
              <div className="text-sm text-amber-600/80 dark:text-amber-400/80 space-y-2 mt-2">
                <p>
                  In the final version, these sections will be separated into individual pages with proper navigation
                  between them. This will improve:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Page load performance</li>
                  <li>Content organization</li>
                  <li>User experience when navigating between sections</li>
                  <li>Print and PDF export functionality</li>
                </ul>
                <p>
                  The sidebar navigation already supports this structure, and clicking on different sections will
                  navigate to the appropriate pages once they are implemented.
                </p>
              </div>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-1 text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-800/40 p-1 h-auto"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4 mr-1" /> Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4 mr-1" /> Learn More
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
