import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

// This endpoint will be called by a scheduled job to refresh the materialized view
export async function POST(request: NextRequest) {
  try {
    // Check for a secret key to secure the endpoint
    const authHeader = request.headers.get("authorization")
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = createClient()

    // Call the refresh function we created
    const { error } = await supabase.rpc("refresh_kitespots_view")

    if (error) {
      console.error("Error refreshing materialized view:", error)
      return NextResponse.json({ error: "Failed to refresh view" }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Materialized view refreshed successfully" })
  } catch (error) {
    console.error("Error in refresh endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
