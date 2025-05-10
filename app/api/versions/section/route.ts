import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const version = searchParams.get("version")

    if (version) {
      const sections = await getSectionVersionsByVersion(version)
      return NextResponse.json(sections)
    } else {
      const sections = await getAllSectionVersions()
      return NextResponse.json(sections)
    }
  } catch (error) {
    console.error("Error fetching section versions:", error)
    return NextResponse.json({ error: "Failed to fetch section versions" }, { status: 500 })
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
    const newSection = await createSectionVersion(data as Omit<SectionVersion, "id">)

    return NextResponse.json(newSection)
  } catch (error) {
    console.error("Error creating section version:", error)
    return NextResponse.json({ error: "Failed to create section version" }, { status: 500 })
  }
}
