"use client"

import { useEffect, useState } from "react"
import { useLocation } from "@docusaurus/router"
import { useActiveDocContext } from "@docusaurus/plugin-content-docs/client"
import DefaultSidebarItem from "@theme-original/SidebarItem"
import { trackReadingProgress, getReadingProgress } from "@sidebar-utils"

interface SidebarItemProps {
  type: string
  docId?: string
  activePath?: string
  label: string
  sectionNumber?: string
  [key: string]: any
}

function SidebarItemWithProgress(props: SidebarItemProps): JSX.Element {
  const location = useLocation()
  const activeDocContext = useActiveDocContext()
  const [readingProgress, setReadingProgress] = useState<Record<string, boolean>>({})

  // Load reading progress on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      setReadingProgress(getReadingProgress())
    }
  }, [])

  // Track reading progress when a doc is active
  useEffect(() => {
    if (typeof window !== "undefined" && activeDocContext.activeDoc) {
      trackReadingProgress(activeDocContext.activeDoc.id)
      setReadingProgress(getReadingProgress())
    }
  }, [activeDocContext.activeDoc])

  // Check if this item has been read
  const isRead = props.type === "doc" && props.docId && readingProgress[props.docId]

  // Check if this is the active item
  const isActive = props.activePath === location.pathname

  // Add section number if available and enabled
  let label = props.label
  if (typeof window !== "undefined" && window.sidebarEnhancedConfig?.sectionNumbering && props.sectionNumber) {
    label = `${props.sectionNumber}. ${props.label}`
  }

  return (
    <div className="sidebar-item-container">
      {typeof window !== "undefined" && window.sidebarEnhancedConfig?.showProgressIndicators && (
        <div
          className={`sidebar-item-progress ${isRead ? "read" : ""} ${isActive ? "active" : ""}`}
          title={isRead ? "Read" : "Unread"}
        />
      )}
      <DefaultSidebarItem {...props} label={label} />
    </div>
  )
}

export default SidebarItemWithProgress
