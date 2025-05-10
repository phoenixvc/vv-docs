"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error("Error caught by error boundary:", error)
      setError(error.error || new Error("Unknown error occurred"))
      setHasError(true)
    }

    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  if (hasError) {
    if (fallback) return <>{fallback}</>

    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardHeader className="bg-red-50 dark:bg-red-900/20">
          <CardTitle className="flex items-center text-red-700 dark:text-red-400">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">We encountered an error while processing your document. This could be due to:</p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Large document size</li>
            <li>Network connectivity issues</li>
            <li>Server processing limitations</li>
          </ul>
          <p className="text-sm text-muted-foreground border-l-4 border-amber-500 pl-3 py-2 bg-amber-50 dark:bg-amber-900/20">
            Error details: {error?.message || "Unknown error"}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </CardFooter>
      </Card>
    )
  }

  return <>{children}</>
}
