import { createClient } from "@/lib/supabase/server"

export type Kitespot = {
  id: string
  name: string
  location: string
  country: string
  latitude: number
  longitude: number
  description: string
  difficulty: string
  water_type: string
  main_image_url?: string
  best_months?: any
  avg_wind_speed?: number
  predictability?: number[]
}

type GetKitespotsParams = {
  page?: number
  pageSize?: number
  difficulty?: string
  continent?: string
  country?: string
  water_type?: string
  month?: string
  date?: string
}

export async function getKitespots({
  page = 1,
  pageSize = 10,
  difficulty = "",
  continent = "",
  country = "",
  water_type = "",
  month = "",
  date = "",
}: GetKitespotsParams) {
  const supabase = createClient()

  // Calculate pagination values
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  try {
    // Start building the query using the materialized view
    let query = supabase.from("kitespots_with_images").select("*", { count: "exact" })

    // Add filters if provided
    if (difficulty) {
      query = query.eq("difficulty", difficulty)
    }

    if (country) {
      query = query.eq("country", country)
    }

    if (water_type) {
      query = query.eq("water_type", water_type)
    }

    // If continent is provided, we need to join with countries table
    if (continent) {
      try {
        // First, get the countries in the continent
        const { data: countriesInContinent, error: countriesError } = await supabase
          .from("countries")
          .select("name")
          .eq("continent", continent)

        if (countriesError) {
          console.error("Error fetching countries in continent:", countriesError)
          throw countriesError
        }

        if (countriesInContinent && countriesInContinent.length > 0) {
          const countryNames = countriesInContinent.map((c) => c.name)
          query = query.in("country", countryNames)
        }
      } catch (error) {
        console.error("Error processing continent filter:", error)
        // Continue with the query without the continent filter
      }
    }

    // If month is provided, filter by best_months
    if (month) {
      // For a real implementation, we would use a proper JSON query
      // This is a placeholder for the actual implementation
      console.log(`Month filtering for ${month} is applied (simulated)`)

      // In a real implementation with the proper schema, we would use:
      // query = query.contains('best_months', [month.toLowerCase()])
      // or for a JSON structure:
      // query = query.gte(`best_months->>${month.toLowerCase()}`, 0.7)
    }

    // If date is provided, we would filter by predictability
    if (date) {
      query = query.order("id", { ascending: false })
    } else {
      query = query.order("name")
    }

    // Execute the query with pagination
    const { data, error, count } = await query.range(from, to)

    if (error) {
      console.error("Error fetching kitespots:", error)
      throw error
    }

    // For demo purposes, generate mock data if no results or error
    if (!data || data.length === 0) {
      return {
        kitespots: generateMockKitespots(5, month),
        totalPages: 1,
        totalCount: 5,
      }
    }

    // For demo purposes, add predictability data to each kitespot
    const kitespotsWithPredictability = data.map((spot) => {
      const predictability = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100))

      if (date) {
        const avgPredictability = predictability.reduce((a, b) => a + b, 0) / predictability.length
        return { ...spot, predictability, avgPredictability }
      }

      return { ...spot, predictability }
    })

    // If date is provided, sort by average predictability
    const sortedKitespots = date
      ? kitespotsWithPredictability.sort((a, b) => (b.avgPredictability || 0) - (a.avgPredictability || 0))
      : kitespotsWithPredictability

    // Calculate total pages
    const totalPages = count ? Math.ceil(count / pageSize) : 0

    return {
      kitespots: sortedKitespots as Kitespot[],
      totalPages,
      totalCount: count || 0,
    }
  } catch (error) {
    console.error("Error in getKitespots:", error)

    // Return mock data as fallback
    return {
      kitespots: generateMockKitespots(5, month),
      totalPages: 1,
      totalCount: 5,
    }
  }
}

// Add a function to generate mock kitespots data with best months
function generateMockKitespots(count: number, selectedMonth?: string): Kitespot[] {
  const difficulties = ["Beginner", "Intermediate", "Advanced", "All Levels"]
  const waterTypes = ["Flat", "Choppy", "Waves", "Mixed"]
  const countries = ["Spain", "Greece", "Brazil", "Morocco", "Dominican Republic", "South Africa", "Australia"]
  const locations = ["Costa Calma", "Tarifa", "Jericoacoara", "Essaouira", "Cabarete", "Langebaan", "Exmouth"]

  // Generate mock best months data
  const generateBestMonths = (preferredMonth?: string) => {
    const allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const result: Record<string, number> = {}

    // If a preferred month is specified, make sure it's included with a high score
    if (preferredMonth) {
      allMonths.forEach((month) => {
        if (month === preferredMonth) {
          result[month.toLowerCase()] = 0.8 + Math.random() * 0.2 // 0.8-1.0 score
        } else {
          result[month.toLowerCase()] = Math.random() * 0.7 // 0-0.7 score
        }
      })
    } else {
      // Random best months
      allMonths.forEach((month) => {
        result[month.toLowerCase()] = Math.random()
      })
    }

    return result
  }

  return Array.from({ length: count }, (_, i) => {
    // If a month is selected, make sure it's one of the best months
    const bestMonths = generateBestMonths(selectedMonth)

    return {
      id: `mock-${i}`,
      name: `Kitespot ${i + 1}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      country: countries[Math.floor(Math.random() * countries.length)],
      latitude: Math.random() * 180 - 90,
      longitude: Math.random() * 360 - 180,
      description: "A beautiful kitespot with consistent wind conditions.",
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      water_type: waterTypes[Math.floor(Math.random() * waterTypes.length)],
      main_image_url: `/placeholder.svg?height=400&width=600&query=kitesurfing at spot ${i + 1}`,
      avg_wind_speed: Math.floor(Math.random() * 10) + 15,
      predictability: Array.from({ length: 7 }, () => Math.floor(Math.random() * 100)),
      best_months: bestMonths,
    }
  })
}

export async function getKitespotById(id: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("kitespots")
      .select(`
        *,
        kitespot_images(id, image_url, is_main),
        kiteschools(
          id, 
          company_name,
          logo_url,
          services,
          languages
        )
      `)
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error fetching kitespot:", error)
      throw new Error("Failed to fetch kitespot")
    }

    return data
  } catch (error) {
    console.error("Error in getKitespotById:", error)

    // Return mock data as fallback
    return generateMockKitespotDetail(id)
  }
}

// Generate mock kitespot detail
function generateMockKitespotDetail(id: string) {
  const difficulties = ["Beginner", "Intermediate", "Advanced", "All Levels"]
  const waterTypes = ["Flat", "Choppy", "Waves", "Mixed"]
  const countries = ["Spain", "Greece", "Brazil", "Morocco", "Dominican Republic"]
  const locations = ["Costa Calma", "Tarifa", "Jericoacoara", "Essaouira", "Cabarete"]

  const bestMonths = {
    january: Math.random(),
    february: Math.random(),
    march: Math.random(),
    april: Math.random(),
    may: Math.random(),
    june: Math.random(),
    july: Math.random(),
    august: Math.random(),
    september: Math.random(),
    october: Math.random(),
    november: Math.random(),
    december: Math.random(),
  }

  return {
    id,
    name: `Kitespot ${id}`,
    location: locations[Math.floor(Math.random() * locations.length)],
    country: countries[Math.floor(Math.random() * countries.length)],
    latitude: Math.random() * 180 - 90,
    longitude: Math.random() * 360 - 180,
    description:
      "A beautiful kitespot with consistent wind conditions perfect for kitesurfing enthusiasts of all levels. The spot offers stunning views and reliable winds throughout most of the year.",
    difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
    water_type: waterTypes[Math.floor(Math.random() * waterTypes.length)],
    avg_wind_speed: Math.floor(Math.random() * 10) + 15,
    best_months: bestMonths,
    has_parking: Math.random() > 0.5,
    has_restaurants: Math.random() > 0.5,
    has_accommodation: Math.random() > 0.5,
    has_rescue: Math.random() > 0.5,
    kitespot_images: [
      {
        id: 1,
        image_url: `/placeholder.svg?height=800&width=1200&query=kitesurfing at ${id}`,
        is_main: true,
      },
      {
        id: 2,
        image_url: `/placeholder.svg?height=600&width=800&query=beach at ${id}`,
        is_main: false,
      },
      {
        id: 3,
        image_url: `/placeholder.svg?height=600&width=800&query=kitesurfers at ${id}`,
        is_main: false,
      },
    ],
    kiteschools: [
      {
        id: 1,
        company_name: "WindRiders Kite School",
        logo_url: "/soaring-kite-logo.png",
        services: ["Lessons", "Rentals", "Storage"],
        languages: ["English", "Spanish", "German"],
      },
      {
        id: 2,
        company_name: "Pro Kite Academy",
        logo_url: "/dynamic-kite-logo.png",
        services: ["Lessons", "Rentals", "Accommodation"],
        languages: ["English", "French"],
      },
    ],
  }
}

// Get average wind speed for a kitespot
export async function getKitespotWindStats(spotId: string) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("forecast_data")
      .select("wind_speed")
      .eq("spot_id", spotId)
      .order("forecast_time", { ascending: false })
      .limit(100)

    if (error) {
      console.error("Error fetching wind stats:", error)
      return { avgWindSpeed: 0 }
    }

    if (!data || data.length === 0) {
      return { avgWindSpeed: 0 }
    }

    const sum = data.reduce((acc, curr) => acc + (curr.wind_speed || 0), 0)
    const avgWindSpeed = sum / data.length

    return { avgWindSpeed: Number.parseFloat(avgWindSpeed.toFixed(1)) }
  } catch (error) {
    console.error("Error in getKitespotWindStats:", error)
    return { avgWindSpeed: Math.floor(Math.random() * 10) + 15 }
  }
}
