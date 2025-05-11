"use client"

import React, { useEffect, useState } from "react"
import DocSidebar from "@theme-original/DocSidebar"
import { calculateOverallProgress, getReadingProgress } from "@sidebar-utils"

interface DocSidebarProps {
  sidebar?: any[]
  [key: string]: any
}

interface WindowWithSidebarConfig extends Window {
  sidebarEnhancedConfig?: {
    showProgressIndicators?: boolean
    [key: string]: any
  }
}

declare let window: WindowWithSidebarConfig

function DocSidebarWithProgress(props: DocSidebarProps): JSX.Element {
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Calculate progress whenever the component renders
    const progressData = getReadingProgress()
    const currentSidebar = props.sidebar || []

    const calculatedProgress = calculateOverallProgress(currentSidebar, progressData)
    setProgress(calculatedProgress)

    // Set up event listener for storage changes (for multi-tab support)
    const handleStorageChange = () => {
      const updatedProgressData = getReadingProgress()
      const updatedProgress = calculateOverallProgress(currentSidebar, updatedProgressData)
      setProgress(updatedProgress)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [props.sidebar])

  return (
    <React.Fragment>
      <DocSidebar {...props} />
      {typeof window !== "undefined" && window.sidebarEnhancedConfig?.showProgressIndicators && (
        <div className="section-progress-container" title={`Reading progress: ${Math.round(progress)}%`}>
          <div className="section-progress-bar" style={{ width: `${progress}%` }} />
        </div>
      )}
    </React.Fragment>
  )
}

export default DocSidebarWithProgress
