"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import type { VersionMetadata } from "@/types/version"

interface VersionSelectorProps {
  className?: string
}

export function VersionSelector({ className }: VersionSelectorProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [metadata, setMetadata] = useState<VersionMetadata | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const currentVersion = searchParams.get('version') || metadata?.currentVersion || '1.0.0'
  const documentType = searchParams.get('type') || 'whitepaper'
  
  // Fetch version metadata
  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await fetch('/api/versions')
        if (!res.ok) {
          throw new Error(`Failed to fetch version metadata: ${res.statusText}`)
        }
        const data = await res.json()
        setMetadata(data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching version metadata:', err)
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
        setLoading(false)
      }
    }
    
    fetchMetadata()
  }, [])
  
  // Handle version change
  const handleVersionChange = (version: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('version', version)
    router.push(`?${params.toString()}`)
  }
  
  if (loading) {
    return (
      <div className={className}>
        <Badge variant="outline" className="animate-pulse">
          Loading...
        </Badge>
      </div>
    )
  }
  
  if (error || !metadata) {
    return (
      <div className={className}>
        <Badge variant="destructive">Error loading  {\
    return (
      <div className={className}>
        <Badge variant="destructive">Error loading versions</Badge>
      </div>
    )
  }
  
  return (
    <div className={className}>
      <Select value={currentVersion} onValueChange={handleVersionChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select version" />
        </SelectTrigger>
        <SelectContent>
          {metadata.versions.map(version => (
            <SelectItem key={version} value={version}>
              v{version} {version === metadata.latestVersions[documentType as keyof typeof metadata.latestVersions] && '(Latest)'}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
