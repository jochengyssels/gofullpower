import { KitespotCard } from "@/components/kitespots/kitespot-card"

type SimilarKitespotsProps = {
  kitespotId: string
  country: string
  waterType: string
}

export async function SimilarKitespots({ kitespotId, country, waterType }: SimilarKitespotsProps) {
  // In a real app, you would fetch this from your database
  // For demo purposes, we'll use mock data
  const similarSpots = await getMockSimilarKitespots(kitespotId, country, waterType)

  if (similarSpots.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Similar Kitespots</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {similarSpots.map((spot) => (
          <KitespotCard key={spot.id} kitespot={spot} />
        ))}
      </div>
    </div>
  )
}

// Mock function to get similar kitespots
async function getMockSimilarKitespots(kitespotId: string, country: string, waterType: string) {
  // In a real app, you would fetch this from your database
  // For demo purposes, we'll return mock data

  // Simulate a database query
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "similar1",
      name: "Windy Bay",
      location: "Costa Calma",
      country: country,
      difficulty: "Intermediate",
      water_type: waterType,
      description: "A beautiful spot with consistent wind conditions, perfect for freestyle tricks.",
      main_image_url: "/kitesurfing-windy-bay-action.png",
      latitude: 28.1,
      longitude: -14.2,
      avg_wind_speed: 18,
    },
    {
      id: "similar2",
      name: "Golden Beach",
      location: "Playa Blanca",
      country: country,
      difficulty: "Beginner",
      water_type: waterType,
      description: "Shallow waters and steady winds make this an ideal spot for beginners.",
      main_image_url: "/golden-beach-kitesurfer.png",
      latitude: 28.2,
      longitude: -14.3,
      avg_wind_speed: 15,
    },
    {
      id: "similar3",
      name: "Wave Point",
      location: "El Médano",
      country: country,
      difficulty: "Advanced",
      water_type: waterType,
      description: "Known for its challenging waves and strong winds, perfect for experienced riders.",
      main_image_url: "/placeholder.svg?height=400&width=600&query=kitesurfing at Wave Point",
      latitude: 28.3,
      longitude: -14.4,
      avg_wind_speed: 22,
    },
  ]
}
