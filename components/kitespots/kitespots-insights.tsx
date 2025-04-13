"use client"

import { useState, useEffect } from "react"
import { Wind } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useSearchParams } from "next/navigation"
import { RegionalWindChart } from "@/components/kitespots/regional-wind-chart"

export function KitespotsInsights() {
  const searchParams = useSearchParams()
  const [stats, setStats] = useState({
    totalSpots: 0,
    avgWindSpeed: 0,
    topCountry: "",
    bestMonth: "",
  })
  const [loading, setLoading] = useState(true)

  const continent = searchParams.get("continent") || ""
  const country = searchParams.get("country") || ""
  const month = searchParams.get("month") || ""
  const difficulty = searchParams.get("difficulty") || ""
  const water_type = searchParams.get("water_type") || ""

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      const supabase = createClient()

      // Start building the query
      let query = supabase.from("kitespots_with_images").select("id, country", { count: "exact" })

      // Apply filters
      if (continent) {
        // Get countries in continent
        const { data: countriesInContinent } = await supabase
          .from("countries")
          .select("name")
          .eq("continent", continent)

        if (countriesInContinent && countriesInContinent.length > 0) {
          const countryNames = countriesInContinent.map((c) => c.name)
          query = query.in("country", countryNames)
        }
      }

      if (country) {
        query = query.eq("country", country)
      }

      if (difficulty) {
        query = query.eq("difficulty", difficulty)
      }

      if (water_type) {
        query = query.eq("water_type", water_type)
      }

      // Execute the query
      const { count } = await query

      // Get average wind speed (simulated for demo)
      const avgWindSpeed = 18 + Math.random() * 5

      // Get top country (simulated for demo)
      const topCountries = ["Spain", "Brazil", "South Africa", "Greece", "Morocco", "Dominican Republic", "Australia"]
      const topCountry = country || topCountries[Math.floor(Math.random() * topCountries.length)]

      // Get best month (simulated for demo)
      const bestMonths = ["June", "July", "August", "September", "December", "January", "February"]
      const bestMonth = month || bestMonths[Math.floor(Math.random() * bestMonths.length)]

      setStats({
        totalSpots: count || 0,
        avgWindSpeed: Number.parseFloat(avgWindSpeed.toFixed(1)),
        topCountry,
        bestMonth,
      })

      setLoading(false)
    }

    fetchStats()
  }, [continent, country, month, difficulty, water_type])

  return (
    <div className="bg-white py-8 -mt-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Kitespots Card */}
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Wind className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Kitespots</p>
              <h3 className="text-2xl font-semibold">{loading ? "Loading..." : `${stats.totalSpots}+`}</h3>
              <p className="text-sm text-gray-500">
                {continent ? `in ${continent}` : "worldwide"}
                {country ? `, ${country}` : ""}
              </p>
            </div>
          </div>

          {/* Regional Wind Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-medium">Regional Wind Statistics</h3>
            </div>
            <RegionalWindChart region={continent || country || "Global"} />
          </div>
        </div>
      </div>
    </div>
  )
}
