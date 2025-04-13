"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, ChevronDown, Globe, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createClient } from "@/lib/supabase/client"
import { MonthPicker } from "@/components/ui/month-picker"
import { Badge } from "@/components/ui/badge"

const difficulties = ["Beginner", "Intermediate", "Advanced", "All Levels"]
const waterTypes = ["Flat", "Choppy", "Waves", "Mixed"]

export function KitespotsFilters({
  continent = "",
  country = "",
  month = "",
  totalKitespots = 0,
}: {
  continent?: string
  country?: string
  month?: string
  totalKitespots?: number
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [continents, setContinents] = useState<Array<{ name: string; count: number }>>([])
  const [countries, setCountries] = useState<Array<{ name: string; count: number }>>([])
  const [difficultyCounts, setDifficultyCounts] = useState<Record<string, number>>({})
  const [waterTypeCounts, setWaterTypeCounts] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const currentDifficulty = searchParams.get("difficulty") || ""
  const currentWaterType = searchParams.get("water_type") || ""
  const currentContinent = continent || searchParams.get("continent") || ""
  const currentCountry = country || searchParams.get("country") || ""
  const currentMonth = month || searchParams.get("month") || ""
  const currentDate = searchParams.get("date") || ""

  // Set initial selected date based on current month
  useEffect(() => {
    if (currentMonth) {
      // Convert month name to date
      const monthIndex = new Date(Date.parse(`${currentMonth} 1, 2023`)).getMonth()
      const newDate = new Date()
      newDate.setMonth(monthIndex)
      setSelectedDate(newDate)
    } else if (!selectedDate) {
      // Default to current month
      setSelectedDate(new Date())
    }
  }, [currentMonth])

  // Fetch continents and countries with counts
  useEffect(() => {
    async function fetchFilters() {
      setLoading(true)
      const supabase = createClient()

      try {
        // Fetch continents with counts
        const { data: continentData, error: continentError } = await supabase
          .from("continents")
          .select("name")
          .order("name")

        if (continentError) {
          console.error("Error fetching continents:", continentError)
        }

        // Fetch countries based on selected continent
        let countryQuery = supabase.from("countries").select("name").order("name")

        if (currentContinent) {
          countryQuery = countryQuery.eq("continent", currentContinent)
        }

        const { data: countryData, error: countryError } = await countryQuery

        if (countryError) {
          console.error("Error fetching countries:", countryError)
        }

        // Get kitespot counts for each continent
        const continentCounts: Record<string, number> = {}
        if (continentData) {
          for (const continent of continentData) {
            const {
              data: kitespots,
              error,
              count,
            } = await supabase
              .from("kitespots_with_images")
              .select("id", { count: "exact" })
              .in("country", countryData?.filter((c) => c.continent === continent.name).map((c) => c.name) || [])

            if (error) {
              console.error(`Error fetching kitespots for continent ${continent.name}:`, error)
            } else {
              continentCounts[continent.name] = count || 0
            }
          }
        }

        // Get kitespot counts for each country
        const countryCounts: Record<string, number> = {}
        if (countryData) {
          for (const country of countryData) {
            const {
              data: kitespots,
              error,
              count,
            } = await supabase
              .from("kitespots_with_images")
              .select("id", { count: "exact" })
              .eq("country", country.name)

            if (error) {
              console.error(`Error fetching kitespots for country ${country.name}:`, error)
            } else {
              countryCounts[country.name] = count || 0
            }
          }
        }

        // Fetch difficulty counts
        const { data: difficultyData, error: difficultyError } = await supabase
          .from("kitespots_with_images")
          .select("difficulty")
          .not("difficulty", "is", null)

        if (difficultyError) {
          console.error("Error fetching difficulty counts:", difficultyError)
        }

        // Fetch water type counts
        const { data: waterTypeData, error: waterTypeError } = await supabase
          .from("kitespots_with_images")
          .select("water_type")
          .not("water_type", "is", null)

        if (waterTypeError) {
          console.error("Error fetching water type counts:", waterTypeError)
        }

        // Process the data
        const processedContinents = continentData
          ? continentData.map((continent) => ({
              name: continent.name,
              count: continentCounts[continent.name] || 0,
            }))
          : []

        const processedCountries = countryData
          ? countryData.map((country) => ({
              name: country.name,
              count: countryCounts[country.name] || 0,
            }))
          : []

        setContinents(processedContinents)
        setCountries(processedCountries)

        // Count difficulties
        const difficultyCountsObj: Record<string, number> = {}
        if (difficultyData) {
          difficultyData.forEach((item) => {
            if (item.difficulty) {
              difficultyCountsObj[item.difficulty] = (difficultyCountsObj[item.difficulty] || 0) + 1
            }
          })
        }
        setDifficultyCounts(difficultyCountsObj)

        // Count water types
        const waterTypeCountsObj: Record<string, number> = {}
        if (waterTypeData) {
          waterTypeData.forEach((item) => {
            if (item.water_type) {
              waterTypeCountsObj[item.water_type] = (waterTypeCountsObj[item.water_type] || 0) + 1
            }
          })
        }
        setWaterTypeCounts(waterTypeCountsObj)

        setLoading(false)
      } catch (error) {
        console.error("Error in fetchFilters:", error)
        setLoading(false)
      }
    }

    fetchFilters()
  }, [currentContinent])

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1") // Reset to first page when filtering

    if (value) {
      params.set(name, value)
    } else {
      params.delete(name)
    }

    // If changing continent, clear country
    if (name === "continent" && value !== currentContinent) {
      params.delete("country")
    }

    return params.toString()
  }

  const handleMonthChange = (date: Date | undefined) => {
    setSelectedDate(date)
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", "1")

    if (date) {
      const monthName = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)
      params.set("month", monthName)
    } else {
      params.delete("month")
    }

    router.push(`/kitespots?${params.toString()}`)
  }

  // Count active filters
  const activeFilterCount = [
    currentDifficulty,
    currentWaterType,
    currentContinent,
    currentCountry,
    currentMonth,
    currentDate,
  ].filter(Boolean).length

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex items-center">
          <Filter className="mr-2 h-5 w-5 text-blue-600" />
          <span className="text-gray-700 font-medium">Filters</span>

          {/* Total kitespots count badge */}
          <Badge variant="outline" className="ml-3 bg-blue-50 text-blue-700">
            {totalKitespots} kitespots found
          </Badge>

          {/* Active filters count */}
          {activeFilterCount > 0 && (
            <Badge className="ml-2 bg-blue-600">
              {activeFilterCount} active {activeFilterCount === 1 ? "filter" : "filters"}
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {activeFilterCount > 0 && (
            <Button variant="ghost" className="text-blue-600" onClick={() => router.push("/kitespots")}>
              Clear All
            </Button>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        {/* Month Picker for Best Month - Removed label, updated placeholder */}
        <MonthPicker month={selectedDate} onSelect={handleMonthChange} placeholder="Spots by best month" />

        {/* Continent Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <Globe className="h-4 w-4 mr-1" />
              {currentContinent || "All Continents"}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={!currentContinent ? "bg-blue-50" : ""}
                onClick={() => {
                  router.push(`/kitespots?${createQueryString("continent", "")}`)
                }}
              >
                <span className="flex justify-between w-full">
                  <span>All Continents</span>
                  <span className="text-gray-500">{totalKitespots}</span>
                </span>
              </DropdownMenuItem>
              {continents.map((cont) => (
                <DropdownMenuItem
                  key={cont.name}
                  className={currentContinent === cont.name ? "bg-blue-50" : ""}
                  onClick={() => {
                    router.push(`/kitespots?${createQueryString("continent", cont.name)}`)
                  }}
                >
                  <span className="flex justify-between w-full">
                    <span>{cont.name}</span>
                    <span className="text-gray-500">{cont.count}</span>
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Countries Filter - Always show, but populate based on selected continent */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              <MapPin className="h-4 w-4 mr-1" />
              {currentCountry || "All Countries"}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64 max-h-[300px] overflow-y-auto">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={!currentCountry ? "bg-blue-50" : ""}
                onClick={() => {
                  router.push(`/kitespots?${createQueryString("country", "")}`)
                }}
              >
                <span className="flex justify-between w-full">
                  <span>All Countries</span>
                  <span className="text-gray-500">
                    {currentContinent ? countries.reduce((sum, country) => sum + country.count, 0) : totalKitespots}
                  </span>
                </span>
              </DropdownMenuItem>
              {countries.map((country) => (
                <DropdownMenuItem
                  key={country.name}
                  className={currentCountry === country.name ? "bg-blue-50" : ""}
                  onClick={() => {
                    router.push(`/kitespots?${createQueryString("country", country.name)}`)
                  }}
                >
                  <span className="flex justify-between w-full">
                    <span>{country.name}</span>
                    <span className="text-gray-500">{country.count}</span>
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Difficulty Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              {currentDifficulty || "Difficulty"}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={!currentDifficulty ? "bg-blue-50" : ""}
                onClick={() => {
                  router.push(`/kitespots?${createQueryString("difficulty", "")}`)
                }}
              >
                <span className="flex justify-between w-full">
                  <span>All Levels</span>
                  <span className="text-gray-500">{totalKitespots}</span>
                </span>
              </DropdownMenuItem>
              {difficulties
                .filter((d) => d !== "All Levels")
                .map((difficulty) => (
                  <DropdownMenuItem
                    key={difficulty}
                    className={currentDifficulty === difficulty ? "bg-blue-50" : ""}
                    onClick={() => {
                      router.push(`/kitespots?${createQueryString("difficulty", difficulty)}`)
                    }}
                  >
                    <span className="flex justify-between w-full">
                      <span>{difficulty}</span>
                      <span className="text-gray-500">{difficultyCounts[difficulty] || 0}</span>
                    </span>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Water Type Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-1">
              {currentWaterType || "Water Type"}
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={!currentWaterType ? "bg-blue-50" : ""}
                onClick={() => {
                  router.push(`/kitespots?${createQueryString("water_type", "")}`)
                }}
              >
                <span className="flex justify-between w-full">
                  <span>All Types</span>
                  <span className="text-gray-500">{totalKitespots}</span>
                </span>
              </DropdownMenuItem>
              {waterTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  className={currentWaterType === type ? "bg-blue-50" : ""}
                  onClick={() => {
                    router.push(`/kitespots?${createQueryString("water_type", type)}`)
                  }}
                >
                  <span className="flex justify-between w-full">
                    <span>{type}</span>
                    <span className="text-gray-500">{waterTypeCounts[type] || 0}</span>
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
