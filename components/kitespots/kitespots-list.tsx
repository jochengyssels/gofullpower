import { getKitespots } from "@/lib/kitespots"
import { KitespotCard } from "@/components/kitespots/kitespot-card"
import { Pagination } from "@/components/kitespots/pagination"
import { AlertCircle } from "lucide-react"

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
    const { kitespots, totalPages } = await getKitespots({
      page,
      pageSize: 10,
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kitespots.map((kitespot) => (
            <KitespotCard key={kitespot.id} kitespot={kitespot} showPredictability={!!date} />
          ))}
        </div>

        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    )
  } catch (error) {
    console.error("Error rendering kitespots list:", error)

    // Fallback UI for error state
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load kitespots</h3>
        <p className="text-red-600 mb-4">We're experiencing some technical difficulties. Please try again later.</p>
        <p className="text-sm text-gray-600">
          In the meantime, you can explore our featured kitespots or adjust your filters.
        </p>
      </div>
    )
  }
}
