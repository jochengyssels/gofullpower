import { Suspense } from "react"
import { KitespotsList } from "@/components/kitespots/kitespots-list"
import { KitespotsFilters } from "@/components/kitespots/kitespots-filters"
import { KitespotsHeader } from "@/components/kitespots/kitespots-header"
import { KitespotsLoading } from "@/components/kitespots/kitespots-loading"
import { KitespotsInsights } from "@/components/kitespots/kitespots-insights"
import { Navbar } from "@/components/navbar"
import { KitespotsAIRecommendations } from "@/components/kitespots/kitespots-ai-recommendations"

export const dynamic = "force-dynamic"
export const revalidate = 300 // Revalidate every 5 minutes

export default function KitespotsPage({
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

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <KitespotsHeader />
      <KitespotsInsights />

      <div className="container mx-auto px-4 py-8">
        <KitespotsFilters continent={continent} country={country} month={month} />

        <KitespotsAIRecommendations />

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
    </main>
  )
}
