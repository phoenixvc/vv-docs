"use client"

import { useState, useEffect } from "react"
import clsx from "clsx"
import { CopyIcon, CheckIcon } from "./icons"

interface CopyButtonProps {
  text: string
  className?: string
}

/**
 * Copy button component for copying text to clipboard
 */
export function CopyButton({ text, className }: CopyButtonProps): JSX.Element {
  const [copied, setCopied] = useState<boolean>(false)

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <button
      type="button"
      className={clsx(
        "inline-flex h-8 w-8 items-center justify-center rounded-md border bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
    </button>
  )
}
