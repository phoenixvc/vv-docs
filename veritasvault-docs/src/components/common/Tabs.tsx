"use client"

import type React from "react"
import { useState } from "react"
import styles from "./Tabs.module.css"

export interface TabItem {
  /**
   * Unique identifier for the tab
   */
  id: string

  /**
   * Label to display in the tab
   */
  label: React.ReactNode

  /**
   * Content to display when tab is active
   */
  content: React.ReactNode

  /**
   * Whether the tab is disabled
   */
  disabled?: boolean
}

export interface TabsProps {
  /**
   * Array of tab items to display
   */
  items: TabItem[]

  /**
   * ID of the initially active tab
   */
  defaultActiveTab?: string

  /**
   * Optional additional CSS class
   */
  className?: string

  /**
   * Optional additional CSS class for the tab list
   */
  tabListClassName?: string

  /**
   * Optional additional CSS class for the tab content
   */
  tabContentClassName?: string

  /**
   * Callback when a tab is selected
   */
  onTabChange?: (tabId: string) => void
}

/**
 * Tabs component for organizing content into separate views
 */
export const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveTab,
  className = "",
  tabListClassName = "",
  tabContentClassName = "",
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || (items.length > 0 ? items[0].id : ""))

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  const activeTabContent = items.find((item) => item.id === activeTab)?.content

  return (
    <div className={`${styles.tabsContainer} ${className}`}>
      <div className={`${styles.tabList} ${tabListClassName}`} role="tablist">
        {items.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ""} ${tab.disabled ? styles.disabled : ""}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`tabpanel-${activeTab}`}
        className={`${styles.tabContent} ${tabContentClassName}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTabContent}
      </div>
    </div>
  )
}

export default Tabs
