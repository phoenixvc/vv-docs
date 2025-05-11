import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavigationItem {
  title: string
  href: string
  description?: string
}

interface SectionNavigationProps {
  previous?: NavigationItem
  next?: NavigationItem
  parent?: NavigationItem
  className?: string
}

export function SectionNavigation({ previous, next, parent, className }: SectionNavigationProps) {
  return (
    <div className={cn("my-10 grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {previous && (
        <Link href={previous.href} className="col-span-1">
          <Card className="h-full hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center text-muted-foreground mb-1">
                <ChevronLeft className="h-4 w-4 mr-1" />
                <span className="text-sm">Previous</span>
              </div>
              <div className="font-medium">{previous.title}</div>
              {previous.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{previous.description}</p>
              )}
            </CardContent>
          </Card>
        </Link>
      )}

      {parent && !previous && (
        <Link href={parent.href} className="col-span-1">
          <Card className="h-full hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center text-muted-foreground mb-1">
                <Home className="h-4 w-4 mr-1" />
                <span className="text-sm">Up to</span>
              </div>
              <div className="font-medium">{parent.title}</div>
              {parent.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{parent.description}</p>
              )}
            </CardContent>
          </Card>
        </Link>
      )}

      {next && (
        <Link href={next.href} className={cn("col-span-1", !previous && !parent && "md:col-start-2")}>
          <Card className="h-full hover:border-primary/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center justify-end text-muted-foreground mb-1">
                <span className="text-sm">Next</span>
                <ChevronRight className="h-4 w-4 ml-1" />
              </div>
              <div className="font-medium text-right">{next.title}</div>
              {next.description && (
                <p className="text-sm text-muted-foreground mt-1 text-right line-clamp-2">{next.description}</p>
              )}
            </CardContent>
          </Card>
        </Link>
      )}
    </div>
  )
}
