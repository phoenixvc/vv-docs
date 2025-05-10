"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ChevronDown } from "lucide-react"
import { EnhancedPDFSelector } from "./pdf/enhanced-pdf-selector"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function LandingPageDownloads() {
  const handleDirectDownload = (type: string) => {
    if (type === "tokenomics") {
      window.open(`/tokenomics-download?t=${Date.now()}`, "_blank")
    } else {
      const url = `/pdf-preview?type=${type}&includeAll=${type === "whitepaper"}&t=${Date.now()}`
      window.open(url, "_blank")
    }
  }

  return (
    <div className="container py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Download Documentation</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Whitepaper</CardTitle>
            <CardDescription>Complete technical documentation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Comprehensive overview of the VeritasVault.ai multi-chain architecture, including technical details,
              tokenomics, and implementation roadmap.
            </p>
          </CardContent>
          <CardFooter>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleDirectDownload("whitepaper")}>Full Whitepaper</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDirectDownload("litepaper")}>Litepaper</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDirectDownload("executive-summary")}>
                  Executive Summary
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <EnhancedPDFSelector className="w-full justify-start p-0 h-auto font-normal text-sm" />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tokenomics</CardTitle>
            <CardDescription>Token economics details</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Detailed information about the VVAI token, including distribution, utility, governance mechanisms, and
              economic model.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => handleDirectDownload("tokenomics")}>
              <Download className="mr-2 h-4 w-4" />
              Download Tokenomics
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Document</CardTitle>
            <CardDescription>Select specific sections</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create a custom document by selecting only the sections you're interested in. Perfect for focusing on
              specific aspects of the architecture.
            </p>
          </CardContent>
          <CardFooter>
            <EnhancedPDFSelector className="w-full" buttonText="Create Custom Document" variant="default" />
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
