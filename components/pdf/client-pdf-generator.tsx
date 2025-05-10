"use client"

import { useEffect } from "react"

export function ClientPDFGenerator() {
  useEffect(() => {
    // Add a small delay to ensure the page is fully rendered
    const timer = setTimeout(() => {
      // Add a class to the body to indicate we're ready to print
      document.body.classList.add("pdf-ready")

      // Focus the window to ensure print dialog works properly
      window.focus()

      // Trigger the print dialog
      window.print()
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return null
}
