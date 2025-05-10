import type React from "react"

interface PDFContentWrapperProps {
  children: React.ReactNode
}

export function PDFContentWrapper({ children }: PDFContentWrapperProps) {
  return (
    <div className="pdf-content-wrapper">
      {children}
      <div className="page-break"></div>
    </div>
  )
}
