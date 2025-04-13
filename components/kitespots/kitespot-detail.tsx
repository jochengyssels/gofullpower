import Image from "next/image"
import Link from "next/link"
import { MapPin, Wind, Waves, Calendar, Star, ArrowLeft, Share2, Bookmark } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { KitespotMap } from "@/components/kitespots/kitespot-map"
import { KitespotGallery } from "@/components/kitespots/kitespot-gallery"

type KitespotDetailProps = {
  kitespot: any
}

export function KitespotDetail({ kitespot }: KitespotDetailProps) {
  // Extract main image and additional images
  const mainImage =
    kitespot.kitespot_images?.find((img: any) => img.is_main)?.image_url ||
    `/placeholder.svg?height=800&width=1200&query=kitesurfing at ${kitespot.name}`

  const additionalImages =
    kitespot.kitespot_images?.filter((img: any) => !img.is_main).map((img: any) => img.image_url) || []

  // Generate a random rating between 4.0 and 5.0 for demo purposes
  const rating = (Math.random() * 1.0 + 4.0).toFixed(1)

  // Get best months from array or handle null case
  const getBestMonths = () => {
    if (kitespot.best_months && Array.isArray(kitespot.best_months)) {
      try {
        // If best_months is an array of month names, join them
        return kitespot.best_months.join(", ")
      } catch (e) {
        // Fallback to "Not specified"
        return "Not specified"
      }
    }

    // If best_months is null or not an array
    return "Not specified"
  }

  const bestMonths = getBestMonths()

  return (
    <div>
      {/* Hero Section with Main Image */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image src={mainImage || "/placeholder.svg"} alt={kitespot.name} fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

        {/* Back Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/kitespots">
            <Button variant="outline" size="sm" className="bg-white/80 hover:bg-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Kitespots
            </Button>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button variant="outline" size="icon" className="bg-white/80 hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/80 hover:bg-white">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>

        {/* Kitespot Info */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{kitespot.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-1" />
                <span>
                  {kitespot.location || ""}, {kitespot.country}
                </span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" fill="currentColor" />
                <span>
                  {rating} ({Math.floor(Math.random() * 100) + 50} reviews)
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white">
                <Wind className="h-4 w-4 mr-1" />
                {kitespot.avg_wind_speed || Math.floor(Math.random() * 10) + 15} knots avg
              </Badge>
              <Badge className="bg-green-500 hover:bg-green-600 text-white">
                <Waves className="h-4 w-4 mr-1" />
                {kitespot.water_type || "Mixed"}
              </Badge>
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
                <Calendar className="h-4 w-4 mr-1" />
                Best: {bestMonths}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description and Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">About this Kitespot</h2>
              <p className="text-gray-700 mb-6">
                {kitespot.description ||
                  `${kitespot.name} is a popular kiteboarding destination known for its consistent wind conditions and beautiful surroundings. 
                  Located in ${kitespot.location || ""}, ${kitespot.country}, this spot offers excellent conditions for kitesurfers of all levels.
                  The spot is characterized by ${kitespot.water_type?.toLowerCase() || "mixed"} water conditions.`}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Kitespot Details</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="font-medium w-32">Difficulty:</span>
                      <span>{kitespot.difficulty || "All Levels"}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Water Type:</span>
                      <span>{kitespot.water_type || "Mixed"}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Wind Direction:</span>
                      <span>{kitespot.wind_direction || "Various"}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Best Months:</span>
                      <span>{bestMonths}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Facilities</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center">
                      <span className="font-medium w-32">Parking:</span>
                      <span>{kitespot.has_parking ? "Available" : "Limited"}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Restaurants:</span>
                      <span>{kitespot.has_restaurants ? "Nearby" : "Not available"}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Accommodation:</span>
                      <span>{kitespot.has_accommodation ? "Available" : "Limited options"}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Rescue Service:</span>
                      <span>{kitespot.has_rescue ? "Available" : "Not available"}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Photo Gallery */}
            {additionalImages.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Photo Gallery</h2>
                <KitespotGallery mainImage={mainImage} additionalImages={additionalImages} />
              </div>
            )}
          </div>

          {/* Right Column - Map and Quick Info */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-lg font-bold mb-4">Location</h2>
              <div className="h-[300px] rounded-lg overflow-hidden mb-4">
                <KitespotMap latitude={kitespot.latitude} longitude={kitespot.longitude} name={kitespot.name} />
              </div>
              <p className="text-sm text-gray-600">
                {kitespot.location || ""}, {kitespot.country}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-bold mb-4">Quick Tips</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex">
                  <Wind className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Best wind conditions in the {kitespot.best_time_of_day || "afternoon"}</span>
                </li>
                <li className="flex">
                  <Waves className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Watch out for {kitespot.hazards || "shallow areas at low tide"}</span>
                </li>
                <li className="flex">
                  <Calendar className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Avoid crowded conditions on {kitespot.crowded_days || "weekends and holidays"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
