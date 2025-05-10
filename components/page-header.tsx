import { ReadingTimeIndicator } from "@/components/reading-time-indicator"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { PDFDownloadButton } from "@/components/pdf/pdf-download-button"
import Link from "next/link"

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs: Array<{ label: string; value: string }>
  onNavigate?: (sectionId: string) => void
  contentSelector?: string
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  onNavigate,
  contentSelector = ".main-content",
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <BreadcrumbNavigation items={breadcrumbs} onNavigate={onNavigate} />
        <div className="md:hidden flex items-center space-x-2">
          <PDFDownloadButton type="pdf" iconSize={3} />
          <PDFDownloadButton type="whitepaper" iconSize={3} />
          <Link href="/pdf-preview" className="download-button text-sm">
            <span>Preview</span>
          </Link>
        </div>
      </div>

      <div className="mb-2">
        <h1 className="text-4xl font-bold text-primary">{title}</h1>
        {description && <p className="text-xl text-muted-foreground mt-2">{description}</p>}
      </div>

      <div className="flex items-center justify-between">
        <ReadingTimeIndicator contentSelector={contentSelector} />
        <div className="hidden md:flex items-center space-x-2">
          <PDFDownloadButton type="pdf" iconSize={4} />
          <PDFDownloadButton type="whitepaper" iconSize={4} />
        </div>
      </div>
    </div>
  )
}
