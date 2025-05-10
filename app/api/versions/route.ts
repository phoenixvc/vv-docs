import { NextResponse } from "next/server"
import { getVersionMetadata } from "@/lib/version-service"

export async function GET() {
  try {
    const metadata = await getVersionMetadata()
    return NextResponse.json(metadata)
  } catch (error) {
    console.error("Error fetching version metadata:", error)
    return NextResponse.json({ error: "Failed to fetch version metadata" }, { status: 500 })
  }
}
