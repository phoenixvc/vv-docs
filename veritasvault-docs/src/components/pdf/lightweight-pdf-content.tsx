"use client"

import { Card, CardContent } from "@/components/ui/card"

interface LightweightPDFContentProps {
  title: string
  sections: string[]
}

export function LightweightPDFContent({ title, sections }: LightweightPDFContentProps) {
  return (
    <div className="space-y-8 print-content">
      <section>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <p className="mb-4">This document contains the following sections:</p>
            <ul className="list-disc pl-6 space-y-2">
              {sections.map((section) => (
                <li key={section}>{section}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
