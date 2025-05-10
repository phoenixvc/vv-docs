import { type NextRequest, NextResponse } from "next/server"
import { updateVersionMetadata, getVersionMetadata } from "@/lib/version-service"
import type { VersionMetadata } from "@/types/version"

export async function POST(request: NextRequest) {
  try {
    // Verify API key
    const apiKey = request.headers.get("x-api-key")
    if (apiKey !== process.env.API_KEY) {
      return NextResponse.json({ error: "Unauthorized: Invalid API key" }, { status: 401 })
    }

    const data = await request.json()
    const currentMetadata = await getVersionMetadata()

    // Update metadata with new values
    const updatedMetadata: VersionMetadata = {
      ...currentMetadata,
      ...data,
    }

    await updateVersionMetadata(updatedMetadata)

    return NextResponse.json({
      success: true,
      message: "Version metadata updated successfully",
      metadata: updatedMetadata,
    })
  } catch (error) {
    console.error("Error updating version metadata:", error)
    return NextResponse.json({ error: "Failed to update version metadata" }, { status: 500 })
  }
}
