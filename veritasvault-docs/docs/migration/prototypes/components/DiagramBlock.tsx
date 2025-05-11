import clsx from "clsx"
import ThemedImage from "@theme/ThemedImage"
import useBaseUrl from "@docusaurus/useBaseUrl"

interface DiagramBlockProps {
  title: string
  description?: string
  lightImage: string
  darkImage?: string
  alt: string
  caption?: string
  width?: number
  height?: number
  className?: string
}

/**
 * Diagram block component for displaying diagrams with title, description, and caption
 */
export function DiagramBlock({
  title,
  description,
  lightImage,
  darkImage,
  alt,
  caption,
  width = 800,
  height = 500,
  className,
}: DiagramBlockProps): JSX.Element {
  const lightImageUrl = useBaseUrl(lightImage)
  const darkImageUrl = useBaseUrl(darkImage || lightImage)

  return (
    <div className={clsx("mb-6 rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
      <div className="flex flex-col space-y-1.5 p-6 pb-2">
        <h4 className="text-lg font-semibold leading-none tracking-tight">{title}</h4>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="p-6 pt-2 flex flex-col items-center">
        <div className="relative w-full max-w-3xl">
          <ThemedImage
            sources={{
              light: lightImageUrl,
              dark: darkImageUrl,
            }}
            alt={alt}
            width={width}
            height={height}
            className="rounded-md"
          />
        </div>
        {caption && <p className="text-sm text-muted-foreground mt-2 text-center max-w-2xl">{caption}</p>}
      </div>
    </div>
  )
}
