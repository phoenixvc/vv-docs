import { type NextRequest, NextResponse } from "next/server"
import { getAllDocumentVersions, getDocumentVersionsByType, createDocumentVersion } from "@/lib/version-service"
import type { DocumentVersion } from "@/types/version"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const documentType = searchParams.get("type")

    if (documentType) {
      const versions = await getDocumentVersionsByType(documentType)
      return NextResponse.json(versions)
    } else {
      const versions = await getAllDocumentVersions()
      return NextResponse.json(versions)
    }
  } catch (error) {
    console.error("Error fetching document versions:", error)
    return NextResponse.json({ error: "Failed to fetch document versions" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify API key
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ error: "Unauthorized: Invalid API key" }, { status: 401 })
    }

    const data = await request.json()
    const newVersion = await createDocumentVersion(data as Omit<DocumentVersion, "id">)

    return NextResponse.json(newVersion)
  } catch (error) {
    console.error("Error creating document version:", error)
    return NextResponse.json({ error: "Failed to create document version" }, { status: 500 })
  }
}
