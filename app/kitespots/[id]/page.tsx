import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { getKitespotById } from "@/lib/kitespots"
import { KitespotDetail } from "@/components/kitespots/kitespot-detail"
import { KitespotDetailSkeleton } from "@/components/kitespots/kitespot-detail-skeleton"
import { KitespotWeatherForecast } from "@/components/kitespots/kitespot-weather-forecast"
import { NearbyKiteschools } from "@/components/kitespots/nearby-kiteschools"
import { SimilarKitespots } from "@/components/kitespots/similar-kitespots"

export const dynamic = "force-dynamic"
export const revalidate = 300 // Revalidate every 5 minutes

export default async function KitespotDetailPage({ params }: { params: { id: string } }) {
  try {
    const kitespot = await getKitespotById(params.id)

    if (!kitespot) {
      notFound()
    }

    return (
      <main className="min-h-screen bg-white">
        <Navbar />

        <Suspense fallback={<KitespotDetailSkeleton />}>
          <KitespotDetail kitespot={kitespot} />
        </Suspense>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
                <KitespotWeatherForecast kitespotId={params.id} />
              </Suspense>
            </div>

            <div>
              <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div>}>
                <NearbyKiteschools kitespotId={params.id} />
              </Suspense>
            </div>
          </div>

          <div className="mt-12">
            <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse rounded-lg"></div>}>
              <SimilarKitespots kitespotId={params.id} country={kitespot.country} waterType={kitespot.water_type} />
            </Suspense>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    console.error("Error in kitespot detail page:", error)
    notFound()
  }
}
