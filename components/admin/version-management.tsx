"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { DocumentVersion, SectionVersion, VersionMetadata } from "@/types/version"
import { AlertCircle, CheckCircle2, FileText, BookText, BarChart, FileDigit, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function VersionManagement() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<VersionMetadata | null>(null)
  const [documentVersions, setDocumentVersions] = useState<DocumentVersion[]>([])
  const [sectionVersions, setSectionVersions] = useState<SectionVersion[]>([])

  // Form states
  const [newDocumentVersion, setNewDocumentVersion] = useState({
    version: "",
    documentType: "whitepaper",
    title: "",
    description: "",
    isLatest: true,
    changelog: "",
    sections: [] as string[],
  })

  const [newSectionVersion, setNewSectionVersion] = useState({
    sectionId: "",
    title: "",
    path: "",
    version: "",
    documentTypes: [] as string[],
    tags: [] as string[],
  })

  // Fetch data
  const fetchData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch metadata
      const metadataRes = await fetch("/api/versions")
      if (!metadataRes.ok) {
        throw new Error(`Failed to fetch metadata: ${metadataRes.statusText}`)
      }
      const metadataData = await metadataRes.json()
      setMetadata(metadataData)

      // Fetch document versions
      const documentRes = await fetch("/api/versions/document")
      if (!documentRes.ok) {
        throw new Error(`Failed to fetch document versions: ${documentRes.statusText}`)
      }
      const documentData = await documentRes.json()
      setDocumentVersions(documentData)

      // Fetch section versions
      const sectionRes = await fetch("/api/versions/section")
      if (!sectionRes.ok) {
        throw new Error(`Failed to fetch section versions: ${sectionRes.statusText}`)
      }
      const sectionData = await sectionRes.json()
      setSectionVersions(sectionData)

      setLoading(false)
    } catch (err) {
      console.error("Error fetching version data:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      setLoading(false)
    }
  }

  // Create document version
  const createDocumentVersion = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("/api/versions/document", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
        body: JSON.stringify({
          ...newDocumentVersion,
          releaseDate: new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to create document version: ${res.statusText}`)
      }

      const data = await res.json()
      setSuccess(`Document version ${data.version} created successfully`)

      // Reset form
      setNewDocumentVersion({
        version: "",
        documentType: "whitepaper",
        title: "",
        description: "",
        isLatest: true,
        changelog: "",
        sections: [],
      })

      // Refresh data
      fetchData()
    } catch (err) {
      console.error("Error creating document version:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      setLoading(false)
    }
  }

  // Create section version
  const createSectionVersion = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await fetch("/api/versions/section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.API_KEY || "",
        },
        body: JSON.stringify({
          ...newSectionVersion,
          lastUpdated: new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        throw new Error(`Failed to create section version: ${res.statusText}`)
      }

      const data = await res.json()
      setSuccess(`Section version ${data.title} created successfully`)

      // Reset form
      setNewSectionVersion({
        sectionId: "",
        title: "",
        path: "",
        version: "",
        documentTypes: [],
        tags: [],
      })

      // Refresh data
      fetchData()
    } catch (err) {
      console.error("Error creating section version:", err)
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      setLoading(false)
    }
  }

  // Handle document type selection
  const handleDocumentTypeChange = (value: string) => {
    setNewDocumentVersion({
      ...newDocumentVersion,
      documentType: value as "whitepaper" | "litepaper" | "tokenomics" | "executiveSummary",
    })
  }

  // Handle section selection
  const handleSectionChange = (sectionId: string, checked: boolean) => {
    if (checked) {
      setNewDocumentVersion({
        ...newDocumentVersion,
        sections: [...newDocumentVersion.sections, sectionId],
      })
    } else {
      setNewDocumentVersion({
        ...newDocumentVersion,
        sections: newDocumentVersion.sections.filter((id) => id !== sectionId),
      })
    }
  }

  // Handle document type selection for section
  const handleSectionDocumentTypeChange = (docType: string, checked: boolean) => {
    if (checked) {
      setNewSectionVersion({
        ...newSectionVersion,
        documentTypes: [...newSectionVersion.documentTypes, docType],
      })
    } else {
      setNewSectionVersion({
        ...newSectionVersion,
        documentTypes: newSectionVersion.documentTypes.filter((type) => type !== docType),
      })
    }
  }

  // Handle tag input
  const handleTagInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      const input = event.currentTarget
      const tag = input.value.trim()

      if (tag && !newSectionVersion.tags.includes(tag)) {
        setNewSectionVersion({
          ...newSectionVersion,
          tags: [...newSectionVersion.tags, tag],
        })
        input.value = ""
      }
    }
  }

  // Remove tag
  const removeTag = (tag: string) => {
    setNewSectionVersion({
      ...newSectionVersion,
      tags: newSectionVersion.tags.filter((t) => t !== tag),
    })
  }

  // Load data on mount
  useEffect(() => {
    fetchData()
  }, [])

  // Document type icons
  const documentTypeIcons = {
    whitepaper: <FileText className="h-5 w-5" />,
    litepaper: <BookText className="h-5 w-5" />,
    tokenomics: <BarChart className="h-5 w-5" />,
    executiveSummary: <FileDigit className="h-5 w-5" />,
  }

  if (loading && !metadata) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 animate-spin" />
          <span>Loading version data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">{success}</AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Version Management</h1>
        <Button onClick={fetchData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {metadata && (
        <Card>
          <CardHeader>
            <CardTitle>Version Metadata</CardTitle>
            <CardDescription>Current version information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Current Version</h3>
                <Badge variant="outline" className="text-lg px-3 py-1">
                  v{metadata.currentVersion}
                </Badge>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Available Versions</h3>
                <div className="flex flex-wrap gap-2">
                  {metadata.versions.map((version) => (
                    <Badge key={version} variant="outline">
                      v{version}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="text-sm font-medium mb-2">Latest Document Versions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">Whitepaper:</span>
                    <Badge>v{metadata.latestVersions.whitepaper}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookText className="h-4 w-4" />
                    <span className="text-sm">Litepaper:</span>
                    <Badge>v{metadata.latestVersions.litepaper}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    <span className="text-sm">Tokenomics:</span>
                    <Badge>v{metadata.latestVersions.tokenomics}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileDigit className="h-4 w-4" />
                    <span className="text-sm">Executive Summary:</span>
                    <Badge>v{metadata.latestVersions.executiveSummary}</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="documents">
        <TabsList>
          <TabsTrigger value="documents">Document Versions</TabsTrigger>
          <TabsTrigger value="sections">Section Versions</TabsTrigger>
          <TabsTrigger value="create-document">Create Document Version</TabsTrigger>
          <TabsTrigger value="create-section">Create Section Version</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Document Versions</CardTitle>
              <CardDescription>Manage document versions</CardDescription>
            </CardHeader>
            <CardContent>
              {documentVersions.length === 0 ? (
                <div className="text-center p-4">
                  <p>No document versions found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {["whitepaper", "litepaper", "tokenomics", "executiveSummary"].map((docType) => {
                    const versions = documentVersions.filter((v) => v.documentType === docType)
                    if (versions.length === 0) return null

                    return (
                      <div key={docType} className="space-y-2">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          {documentTypeIcons[docType as keyof typeof documentTypeIcons]}
                          {docType.charAt(0).toUpperCase() + docType.slice(1)}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {versions.map((version) => (
                            <Card key={version.id} className="border-l-4 border-l-primary">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-lg">v{version.version}</CardTitle>
                                  {version.isLatest && (
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                      Latest
                                    </Badge>
                                  )}
                                </div>
                                <CardDescription>{version.title}</CardDescription>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <p className="text-sm text-muted-foreground mb-2">{version.description}</p>
                                <p className="text-xs text-muted-foreground">
                                  Released: {new Date(version.releaseDate).toLocaleDateString()}
                                </p>

                                {version.changelog && (
                                  <div className="mt-2">
                                    <h4 className="text-xs font-medium">Changelog:</h4>
                                    <p className="text-xs text-muted-foreground">{version.changelog}</p>
                                  </div>
                                )}
                              </CardContent>
                              <CardFooter>
                                <div className="w-full">
                                  <h4 className="text-xs font-medium mb-1">Sections:</h4>
                                  <div className="flex flex-wrap gap-1">
                                    {version.sections.map((sectionId) => {
                                      const section = sectionVersions.find((s) => s.sectionId === sectionId)
                                      return (
                                        <Badge key={sectionId} variant="secondary" className="text-xs">
                                          {section ? section.title : sectionId}
                                        </Badge>
                                      )
                                    })}
                                  </div>
                                </div>
                              </CardFooter>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sections">
          <Card>
            <CardHeader>
              <CardTitle>Section Versions</CardTitle>
              <CardDescription>Manage section versions</CardDescription>
            </CardHeader>
            <CardContent>
              {sectionVersions.length === 0 ? (
                <div className="text-center p-4">
                  <p>No section versions found</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Section</th>
                        <th className="text-left py-3 px-4">Version</th>
                        <th className="text-left py-3 px-4">Path</th>
                        <th className="text-left py-3 px-4">Document Types</th>
                        <th className="text-left py-3 px-4">Last Updated</th>
                        <th className="text-left py-3 px-4">Tags</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sectionVersions.map((section) => (
                        <tr key={section.id} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="font-medium">{section.title}</div>
                            <div className="text-xs text-muted-foreground">{section.sectionId}</div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="outline">v{section.version}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <code className="text-sm bg-muted px-1 py-0.5 rounded">{section.path}</code>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {section.documentTypes.map((type) => (
                                <Badge key={type} variant="outline">
                                  {type}
                                </Badge>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-4">{new Date(section.lastUpdated).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <div className="flex flex-wrap gap-1">
                              {section.tags.map((tag) => (
                                <Badge key={tag} variant="secondary">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create-document">
          <Card>
            <CardHeader>
              <CardTitle>Create Document Version</CardTitle>
              <CardDescription>Add a new document version</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      placeholder="1.0.0"
                      value={newDocumentVersion.version}
                      onChange={(e) => setNewDocumentVersion({ ...newDocumentVersion, version: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="documentType">Document Type</Label>
                    <Select value={newDocumentVersion.documentType} onValueChange={handleDocumentTypeChange}>
                      <SelectTrigger id="documentType">
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whitepaper">Whitepaper</SelectItem>
                        <SelectItem value="litepaper">Litepaper</SelectItem>
                        <SelectItem value="tokenomics">Tokenomics</SelectItem>
                        <SelectItem value="executiveSummary">Executive Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Document title"
                      value={newDocumentVersion.title}
                      onChange={(e) => setNewDocumentVersion({ ...newDocumentVersion, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isLatest" className="flex items-center space-x-2 cursor-pointer">
                      <Checkbox
                        id="isLatest"
                        checked={newDocumentVersion.isLatest}
                        onCheckedChange={(checked) =>
                          setNewDocumentVersion({
                            ...newDocumentVersion,
                            isLatest: checked as boolean,
                          })
                        }
                      />
                      <span>Set as latest version</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      This will update the latest version for this document type
                    </p>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Document description"
                      value={newDocumentVersion.description}
                      onChange={(e) => setNewDocumentVersion({ ...newDocumentVersion, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="changelog">Changelog</Label>
                    <Textarea
                      id="changelog"
                      placeholder="What's new in this version?"
                      value={newDocumentVersion.changelog || ""}
                      onChange={(e) => setNewDocumentVersion({ ...newDocumentVersion, changelog: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Sections</Label>
                    <div className="border rounded-md p-4 space-y-2">
                      {sectionVersions.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No sections available</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {sectionVersions.map((section) => (
                            <div key={section.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`section-${section.id}`}
                                checked={newDocumentVersion.sections.includes(section.sectionId)}
                                onCheckedChange={(checked) =>
                                  handleSectionChange(section.sectionId, checked as boolean)
                                }
                              />
                              <Label htmlFor={`section-${section.id}`} className="cursor-pointer text-sm">
                                {section.title}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                onClick={createDocumentVersion}
                disabled={
                  !newDocumentVersion.version ||
                  !newDocumentVersion.title ||
                  !newDocumentVersion.description ||
                  newDocumentVersion.sections.length === 0
                }
              >
                Create Document Version
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="create-section">
          <Card>
            <CardHeader>
              <CardTitle>Create Section Version</CardTitle>
              <CardDescription>Add a new section version</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sectionId">Section ID</Label>
                    <Input
                      id="sectionId"
                      placeholder="architecture"
                      value={newSectionVersion.sectionId}
                      onChange={(e) => setNewSectionVersion({ ...newSectionVersion, sectionId: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Unique identifier for this section</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Section title"
                      value={newSectionVersion.title}
                      onChange={(e) => setNewSectionVersion({ ...newSectionVersion, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="path">Path</Label>
                    <Input
                      id="path"
                      placeholder="/architecture"
                      value={newSectionVersion.path}
                      onChange={(e) => setNewSectionVersion({ ...newSectionVersion, path: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">URL path to this section</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="version">Version</Label>
                    <Input
                      id="version"
                      placeholder="1.0.0"
                      value={newSectionVersion.version}
                      onChange={(e) => setNewSectionVersion({ ...newSectionVersion, version: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label>Document Types</Label>
                    <div className="border rounded-md p-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                      {["whitepaper", "litepaper", "tokenomics", "executiveSummary"].map((docType) => (
                        <div key={docType} className="flex items-center space-x-2">
                          <Checkbox
                            id={`docType-${docType}`}
                            checked={newSectionVersion.documentTypes.includes(docType)}
                            onCheckedChange={(checked) => handleSectionDocumentTypeChange(docType, checked as boolean)}
                          />
                          <Label htmlFor={`docType-${docType}`} className="cursor-pointer text-sm">
                            {docType.charAt(0).toUpperCase() + docType.slice(1)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="space-y-2">
                      <Input
                        id="tags"
                        placeholder="Add tags (press Enter or comma to add)"
                        onKeyDown={handleTagInput}
                      />

                      <div className="flex flex-wrap gap-2 mt-2">
                        {newSectionVersion.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-xs hover:text-destructive"
                            >
                              ×
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                onClick={createSectionVersion}
                disabled={
                  !newSectionVersion.sectionId ||
                  !newSectionVersion.title ||
                  !newSectionVersion.path ||
                  !newSectionVersion.version ||
                  newSectionVersion.documentTypes.length === 0
                }
              >
                Create Section Version
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
