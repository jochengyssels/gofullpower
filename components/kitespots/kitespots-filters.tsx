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

const difficulties = ["Beginner", "Intermediate", "Advanced", "All Levels"]
const waterTypes = ["Flat", "Choppy", "Waves", "Mixed"]

export function KitespotsFilters({
  continent = "",
  country = "",
  month = "",
}: {
  continent?: string
  country?: string
  month?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [continents, setContinents] = useState<string[]>([])
  const [countries, setCountries] = useState<string[]>([])
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

  // Fetch continents and countries
  useEffect(() => {
    async function fetchFilters() {
      setLoading(true)
      const supabase = createClient()

      // Fetch distinct continents from the continents table
      const { data: continentData, error: continentError } = await supabase
        .from("continents")
        .select("name")
        .order("name")

      if (continentError) {
        console.error("Error fetching continents:", continentError)
      }

      // Fetch countries based on selected continent
      let countryQuery = supabase.from("countries").select("name").order("name").is("name", "not", null)

      if (currentContinent) {
        countryQuery = countryQuery.eq("continent", currentContinent)
      }

      const { data: countryData, error: countryError } = await countryQuery

      if (countryError) {
        console.error("Error fetching countries:", countryError)
      }

      // Extract unique values
      const uniqueContinents = continentData?.map((item) => item.name) || []
      const uniqueCountries = Array.from(new Set(countryData?.map((item) => item.name) || []))

      setContinents(uniqueContinents as string[])
      setCountries(uniqueCountries as string[])
      setLoading(false)
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

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <div className="flex items-center">
          <Filter className="mr-2 h-5 w-5 text-blue-600" />
          <span className="text-gray-700 font-medium">Filters</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {(currentDifficulty ||
            currentWaterType ||
            currentContinent ||
            currentCountry ||
            currentMonth ||
            currentDate) && (
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
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={!currentContinent ? "bg-blue-50" : ""}
                onClick={() => {
                  router.push(`/kitespots?${createQueryString("continent", "")}`)
                }}
              >
                All Continents
              </DropdownMenuItem>
              {continents.map((cont) => (
                <DropdownMenuItem
                  key={cont}
                  className={currentContinent === cont ? "bg-blue-50" : ""}
                  onClick={() => {
                    router.push(`/kitespots?${createQueryString("continent", cont)}`)
                  }}
                >
                  {cont}
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
          <DropdownMenuContent align="start" className="w-48 max-h-[300px] overflow-y-auto">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={!currentCountry ? "bg-blue-50" : ""}
                onClick={() => {
                  router.push(`/kitespots?${createQueryString("country", "")}`)
                }}
              >
                All Countries
              </DropdownMenuItem>
              {countries.map((country) => (
                <DropdownMenuItem
                  key={country}
                  className={currentCountry === country ? "bg-blue-50" : ""}
                  onClick={() => {
                    router.push(`/kitespots?${createQueryString("country", country)}`)
                  }}
                >
                  {country}
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
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={!currentDifficulty ? "bg-blue-50" : ""}
                onClick={() => {
                  router.push(`/kitespots?${createQueryString("difficulty", "")}`)
                }}
              >
                All Levels
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
                    {difficulty}
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
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem
                className={!currentWaterType ? "bg-blue-50" : ""}
                onClick={() => {
                  router.push(`/kitespots?${createQueryString("water_type", "")}`)
                }}
              >
                All Types
              </DropdownMenuItem>
              {waterTypes.map((type) => (
                <DropdownMenuItem
                  key={type}
                  className={currentWaterType === type ? "bg-blue-50" : ""}
                  onClick={() => {
                    router.push(`/kitespots?${createQueryString("water_type", type)}`)
                  }}
                >
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
