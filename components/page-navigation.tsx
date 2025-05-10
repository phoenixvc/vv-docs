import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PageNavigationProps {
  previousPage: { title: string; href: string } | null
  nextPage: { title: string; href: string } | null
}

export function PageNavigation({ previousPage, nextPage }: PageNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-12 pt-6 border-t">
      {previousPage ? (
        <Link href={previousPage.href}>
          <Button variant="outline" className="flex items-center gap-2 group">
            <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">{previousPage.title}</span>
            <span className="sm:hidden">Previous</span>
          </Button>
        </Link>
      ) : (
        <div></div>
      )}

      {nextPage ? (
        <Link href={nextPage.href}>
          <Button variant="outline" className="flex items-center gap-2 group">
            <span className="hidden sm:inline">{nextPage.title}</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      ) : (
        <div></div>
      )}
    </div>
  )
}
