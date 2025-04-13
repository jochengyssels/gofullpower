import { School, Star, ExternalLink, MapPin } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

type NearbyKiteschoolsProps = {
  kitespotId: string
}

export async function NearbyKiteschools({ kitespotId }: NearbyKiteschoolsProps) {
  // In a real app, you would fetch this from your database
  // For demo purposes, we'll use mock data
  const kiteschools = await getMockKiteschools(kitespotId)

  if (kiteschools.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Nearby Kiteschools</h2>
        <div className="text-center py-8">
          <School className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No kiteschools found near this spot.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Nearby Kiteschools</h2>

      <div className="space-y-4">
        {kiteschools.map((school) => (
          <div key={school.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
              {school.logo_url ? (
                <Image
                  src={school.logo_url || "/placeholder.svg"}
                  alt={school.company_name}
                  width={48}
                  height={48}
                  className="rounded-full mr-3"
                />
              ) : (
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <School className="h-6 w-6 text-blue-600" />
                </div>
              )}

              <div>
                <h3 className="font-semibold">{school.company_name}</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" fill="currentColor" />
                  <span>
                    {school.rating} ({school.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-start text-sm text-gray-600 mb-3">
              <MapPin className="h-4 w-4 text-gray-400 mr-1 mt-0.5 flex-shrink-0" />
              <span>{school.location}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {school.services.map((service, index) => (
                <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {service}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-500">Languages: {school.languages.join(", ")}</div>

              <Button size="sm" variant="outline" className="text-blue-600 border-blue-200">
                <ExternalLink className="h-3 w-3 mr-1" />
                Visit Website
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Button variant="link" className="text-blue-600">
          View all kiteschools
        </Button>
      </div>
    </div>
  )
}

// Mock function to get kiteschools
async function getMockKiteschools(kitespotId: string) {
  // In a real app, you would fetch this from your database
  // For demo purposes, we'll return mock data

  // Simulate a database query
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: "1",
      company_name: "WindRiders Kite School",
      logo_url: "/soaring-kite-logo.png",
      location: "500m from the kitespot",
      rating: 4.8,
      reviews: 42,
      services: ["Lessons", "Rentals", "Storage"],
      languages: ["English", "Spanish", "German"],
      website_url: "#",
    },
    {
      id: "2",
      company_name: "Pro Kite Academy",
      logo_url: "/dynamic-kite-logo.png",
      location: "1.2km from the kitespot",
      rating: 4.6,
      reviews: 38,
      services: ["Lessons", "Rentals", "Accommodation"],
      languages: ["English", "French"],
      website_url: "#",
    },
  ]
}
