import { getKitespots } from "@/lib/kitespots"
import { KitespotCard } from "@/components/kitespots/kitespot-card"
import { Pagination } from "@/components/kitespots/pagination"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900">No kitespots found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria.</p>
        </div>
      )
    }

    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load kitespots</h3>

        {isRateLimitError ? (
          <p className="text-red-600 mb-4">
            We're experiencing high traffic at the moment. Please try again in a few moments.
          </p>
        ) : (
          <p className="text-red-600 mb-4">{errorMessage}</p>
        )}

        <div className="flex justify-center mt-4">
          <Link href="/kitespots">
            <Button variant="outline" className="flex items-center gap-2">
              Try Again
            </Button>
          </Link>
        </div>
      </div>
    )
  }
}
