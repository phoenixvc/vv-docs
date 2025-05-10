"use client"

import { useState, useEffect } from "react"
import { Clock } from "lucide-react"

interface ReadingTimeIndicatorProps {
  contentSelector: string
}

export function ReadingTimeIndicator({ contentSelector }: ReadingTimeIndicatorProps) {
  const [readingTime, setReadingTime] = useState(0)

  useEffect(() => {
    // Calculate reading time based on content
    const content = document.querySelector(contentSelector)
    if (content) {
      const text = content.textContent || ""
      const wordCount = text.split(/\s+/).length
      // Average reading speed: 200 words per minute
      const time = Math.ceil(wordCount / 200)
      setReadingTime(time)
    }
  }, [contentSelector])

  return (
    <div className="flex items-center text-xs text-muted-foreground">
      <Clock className="h-3 w-3 mr-1" />
      <span>{readingTime} min read</span>
    </div>
  )
}
