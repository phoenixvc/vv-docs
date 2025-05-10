"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import styles from "./DocVersionDropdown.module.css"
import { ChevronDownIcon } from "../common/icons"

export interface DocVersion {
  /**
   * The version number or name
   */
  version: string
  /**
   * The URL to this version of the documentation
   */
  url: string
  /**
   * Optional label (e.g., "Latest", "Beta")
   */
  label?: string
}

export interface DocVersionDropdownProps {
  /**
   * The currently selected version
   */
  currentVersion: string
  /**
   * List of available versions
   */
  versions: DocVersion[]
  /**
   * Optional CSS class name for additional styling
   */
  className?: string
}

/**
 * DocVersionDropdown component for switching between different versions
 * of documentation.
 */
export const DocVersionDropdown: React.FC<DocVersionDropdownProps> = ({ currentVersion, versions, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Find the current version object
  const currentVersionObj = versions.find((v) => v.version === currentVersion) || versions[0]

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={`${styles.versionDropdown} ${className}`} ref={dropdownRef}>
      <button
        className={styles.versionDropdownButton}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className={styles.versionDropdownLabel}>Version:</span>
        <span className={styles.versionDropdownCurrent}>
          {currentVersionObj.version}
          {currentVersionObj.label && <span className={styles.versionLabel}>{currentVersionObj.label}</span>}
        </span>
        <ChevronDownIcon className={`${styles.dropdownIcon} ${isOpen ? styles.dropdownIconOpen : ""}`} />
      </button>

      {isOpen && (
        <div className={styles.versionDropdownMenu} role="menu">
          {versions.map((version) => (
            <a
              key={version.version}
              href={version.url}
              className={`${styles.versionDropdownItem} ${version.version === currentVersion ? styles.active : ""}`}
              role="menuitem"
            >
              <span className={styles.versionDropdownItemVersion}>{version.version}</span>
              {version.label && <span className={styles.versionLabel}>{version.label}</span>}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default DocVersionDropdown
