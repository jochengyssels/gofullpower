import { getKitespots } from "@/lib/kitespots"
import { KitespotCard } from "@/components/kitespots/kitespot-card"
import { Pagination } from "@/components/kitespots/pagination"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Wind } from "lucide-react"

export async function KitespotsList({
  page = 1,
  difficulty = "",
  country = "",
  water_type = "",
  continent = "",
  month = "",
  date = "",
}: {
  page: number
  difficulty?: string
  country?: string
  water_type?: string
  continent?: string
  month?: string
  date?: string
}) {
  try {
    const { kitespots, totalPages, totalCount } = await getKitespots({
      page,
      pageSize: 12, // Increased from 10 to 12 to show more spots
      difficulty,
      country,
      water_type,
      continent,
      month,
      date,
    })

    if (kitespots.length === 0) {
      return (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
          <div className="bg-gray-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <Wind className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No kitespots found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            Try adjusting your filters or search criteria to find kitespots that match your preferences.
          </p>
          <Link href="/kitespots">
            <Button className="mt-6 bg-blue-600">Clear All Filters</Button>
          </Link>
        </div>
      )
    }

    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {kitespots.map((kitespot) => (
            <KitespotCard key={kitespot.id} kitespot={kitespot} showPredictability={!!date} />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    )
  } catch (error) {
    console.error("Error rendering kitespots list:", error)

    // Get a more specific error message if possible
    const errorMessage =
      error instanceof Error ? error.message : "We're experiencing some technical difficulties. Please try again later."

    // Determine if it's likely a rate limit issue
    const isRateLimitError =
      errorMessage.includes("Too Many") || errorMessage.includes("rate limit") || errorMessage.includes("429")

    // Fallback UI for error state with more specific information
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <div className="bg-red-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h3 className="text-xl font-medium text-red-800 mb-3">Unable to load kitespots</h3>

        {isRateLimitError ? (
          <p className="text-red-600 mb-4 max-w-md mx-auto">
            We're experiencing high traffic at the moment. Please try again in a few moments.
          </p>
        ) : (
          <p className="text-red-600 mb-4 max-w-md mx-auto">{errorMessage}</p>
        )}

        <div className="flex justify-center mt-6">
          <Link href="/kitespots">
            <Button variant="outline" className="flex items-center gap-2 border-red-300 text-red-700 hover:bg-red-50">
              Try Again
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
