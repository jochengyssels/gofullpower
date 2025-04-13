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
  best_months?: string[] | null
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
  pageSize = 12, // Increased from 10 to 12
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
    console.log("Fetching kitespots with params:", {
      page,
      pageSize,
      difficulty,
      continent,
      country,
      water_type,
      month,
      date,
    })

    // Start building the query using the materialized view
    let query = supabase
      .from("kitespots_with_images")
      .select("*, kitespot_images!inner(image_url, is_main)", { count: "exact" })

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
      // Only include kitespots where best_months is not null and contains the selected month
      query = query.not("best_months", "is", null).contains("best_months", [month])
    }

    // If date is provided, we would filter by predictability
    if (date) {
      query = query.order("id", { ascending: false })
    } else {
      query = query.order("name")
    }

    console.log("Executing Supabase query...")

    // Execute the query with pagination
    const response = await query.range(from, to)

    // Check for errors in the response
    if (response.error) {
      console.error("Supabase error fetching kitespots:", response.error)
      throw new Error(`Supabase error: ${response.error.message}`)
    }

    const { data, count } = response

    console.log(`Query successful. Retrieved ${data?.length || 0} kitespots out of ${count || 0} total.`)

    // If no data is returned, return empty results
    if (!data || data.length === 0) {
      console.log("No kitespots found matching the criteria.")
      return {
        kitespots: [],
        totalPages: 0,
        totalCount: 0,
      }
    }

    // For demo purposes, add predictability data to each kitespot
    const kitespotsWithPredictability = data.map((spot) => {
      const predictability = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100))

      // Extract main image URL from the joined kitespot_images
      let mainImageUrl = null
      if (spot.kitespot_images && Array.isArray(spot.kitespot_images)) {
        const mainImage = spot.kitespot_images.find((img: any) => img.is_main === true)
        if (mainImage) {
          mainImageUrl = mainImage.image_url
        }
      }

      if (date) {
        const avgPredictability = predictability.reduce((a, b) => a + b, 0) / predictability.length
        return {
          ...spot,
          predictability,
          avgPredictability,
          main_image_url: mainImageUrl,
        }
      }

      return {
        ...spot,
        predictability,
        main_image_url: mainImageUrl,
      }
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
    // Log detailed error information
    console.error("Error in getKitespots:", error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      params: { page, pageSize, difficulty, continent, country, water_type, month, date },
    })

    // Re-throw the error to be handled by the component
    throw error
  }
}

// Add function to get total count of kitespots
export async function getTotalKitespotsCount({
  difficulty = "",
  continent = "",
  country = "",
  water_type = "",
  month = "",
}: {
  difficulty?: string
  continent?: string
  country?: string
  water_type?: string
  month?: string
}) {
  const supabase = createClient()

  try {
    // Start building the query
    let query = supabase.from("kitespots_with_images").select("id", { count: "exact" })

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
      // Only include kitespots where best_months is not null and contains the selected month
      query = query.not("best_months", "is", null).contains("best_months", [month])
    }

    // Execute the query
    const { count, error } = await query

    if (error) {
      console.error("Error fetching kitespot count:", error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error("Error in getTotalKitespotsCount:", error)
    return 0
  }
}

// Add the missing generateMockKitespots function if it doesn't exist
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

    // If a preferred month is specified, make sure it's included
    if (preferredMonth) {
      const result = [preferredMonth]
      // Add 2-4 random additional months
      const additionalMonthCount = Math.floor(Math.random() * 3) + 2

      for (let i = 0; i < additionalMonthCount; i++) {
        const randomMonth = allMonths[Math.floor(Math.random() * allMonths.length)]
        if (!result.includes(randomMonth)) {
          result.push(randomMonth)
        }
      }

      return result
    } else {
      // Random 3-5 best months
      const result = []
      const monthCount = Math.floor(Math.random() * 3) + 3

      for (let i = 0; i < monthCount; i++) {
        const randomMonth = allMonths[Math.floor(Math.random() * allMonths.length)]
        if (!result.includes(randomMonth)) {
          result.push(randomMonth)
        }
      }

      return result
    }
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

// Rest of the file remains the same...
export async function getKitespotById(id: string) {
  const supabase = createClient()

  try {
    console.log(`Fetching kitespot details for ID: ${id}`)

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
      console.error(`Error fetching kitespot with ID ${id}:`, error)
      throw new Error(`Failed to fetch kitespot: ${error.message}`)
    }

    if (!data) {
      console.error(`No kitespot found with ID ${id}`)
      throw new Error("Kitespot not found")
    }

    console.log(`Successfully retrieved kitespot with ID ${id}`)
    return data
  } catch (error) {
    console.error("Error in getKitespotById:", error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      id,
    })
    throw error
  }
}

// Generate mock kitespot detail
function generateMockKitespotDetail(id: string) {
  const difficulties = ["Beginner", "Intermediate", "Advanced", "All Levels"]
  const waterTypes = ["Flat", "Choppy", "Waves", "Mixed"]
  const countries = ["Spain", "Greece", "Brazil", "Morocco", "Dominican Republic"]
  const locations = ["Costa Calma", "Tarifa", "Jericoacoara", "Essaouira", "Cabarete"]

  const bestMonths = ["April", "May", "June", "July", "August", "September"]

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
    console.log(`Fetching wind stats for kitespot ID: ${spotId}`)

    const { data, error } = await supabase
      .from("forecast_data")
      .select("wind_speed")
      .eq("spot_id", spotId)
      .order("forecast_time", { ascending: false })
      .limit(100)

    if (error) {
      console.error(`Error fetching wind stats for kitespot ID ${spotId}:`, error)
      return { avgWindSpeed: 0 }
    }

    if (!data || data.length === 0) {
      console.log(`No wind data found for kitespot ID ${spotId}`)
      return { avgWindSpeed: 0 }
    }

    const sum = data.reduce((acc, curr) => acc + (curr.wind_speed || 0), 0)
    const avgWindSpeed = sum / data.length

    console.log(
      `Successfully calculated average wind speed for kitespot ID ${spotId}: ${avgWindSpeed.toFixed(1)} knots`,
    )
    return { avgWindSpeed: Number.parseFloat(avgWindSpeed.toFixed(1)) }
  } catch (error) {
    console.error(`Error in getKitespotWindStats for kitespot ID ${spotId}:`, error)
    console.error("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      spotId,
    })
    return { avgWindSpeed: 0 }
  }
}
