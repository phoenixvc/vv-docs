import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface DiagramBlockProps {
  title: string
  description?: string
  imageSrc: string
  imageAlt: string
  caption?: string
  width?: number
  height?: number
  className?: string
}

export function DiagramBlock({
  title,
  description,
  imageSrc,
  imageAlt,
  caption,
  width = 800,
  height = 500,
  className,
}: DiagramBlockProps) {
  return (
    <Card className={cn("mb-6", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-2 flex flex-col items-center">
        <div className="relative w-full max-w-3xl">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={width}
            height={height}
            className="rounded-md"
          />
        </div>
        {caption && <p className="text-sm text-muted-foreground mt-2 text-center max-w-2xl">{caption}</p>}
      </CardContent>
    </Card>
  )
}
