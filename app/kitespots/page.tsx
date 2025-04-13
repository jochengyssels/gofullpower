import { Suspense } from "react"
import { KitespotsList } from "@/components/kitespots/kitespots-list"
import { KitespotsFilters } from "@/components/kitespots/kitespots-filters"
import { KitespotsHeader } from "@/components/kitespots/kitespots-header"
import { KitespotsLoading } from "@/components/kitespots/kitespots-loading"
import { KitespotsInsights } from "@/components/kitespots/kitespots-insights"
import { Navbar } from "@/components/navbar"
import { KitespotsAIRecommendations } from "@/components/kitespots/kitespots-ai-recommendations"
import { getTotalKitespotsCount } from "@/lib/kitespots"
import { StickyFilterSummary } from "@/components/kitespots/sticky-filter-summary"
import { BackToTop } from "@/components/back-to-top"

export const dynamic = "force-dynamic"
export const revalidate = 300 // Revalidate every 5 minutes

export default async function KitespotsPage({
  searchParams,
}: {
  searchParams: {
    page?: string
    difficulty?: string
    continent?: string
    country?: string
    water_type?: string
    month?: string
    date?: string
  }
}) {
  const page = Number(searchParams.page) || 1
  const difficulty = searchParams.difficulty || ""
  const continent = searchParams.continent || ""
  const country = searchParams.country || ""
  const water_type = searchParams.water_type || ""
  const month = searchParams.month || ""
  const date = searchParams.date || ""

  // Get total count of kitespots for the filters display
  const totalKitespots = await getTotalKitespotsCount({
    difficulty,
    continent,
    country,
    water_type,
    month,
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <KitespotsHeader />
      <StickyFilterSummary />

      {/* Insights section with improved styling */}
      <section className="relative z-10 -mt-16">
        <div className="container mx-auto px-4">
          <KitespotsInsights />
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and AI recommendations in a card for visual grouping */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <KitespotsFilters continent={continent} country={country} month={month} totalKitespots={totalKitespots} />
          <div className="mt-6">
            <KitespotsAIRecommendations />
          </div>
        </div>

        {/* Results section with improved heading */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Discover Kitespots</h2>
          <p className="text-gray-600">Browse our collection of the world's best kiteboarding destinations</p>
        </div>

        <Suspense fallback={<KitespotsLoading />}>
          <KitespotsList
            page={page}
            difficulty={difficulty}
            continent={continent}
            country={country}
            water_type={water_type}
            month={month}
            date={date}
          />
        </Suspense>
      </div>

      {/* Back to top button */}
      <BackToTop />
    </main>
  )
}
