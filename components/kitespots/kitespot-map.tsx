"use client"

import { useState } from "react"

import { useEffect, useRef } from "react"
import { Loader } from "lucide-react"

type KitespotMapProps = {
  latitude: number
  longitude: number
  name: string
}

export function KitespotMap({ latitude, longitude, name }: KitespotMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if coordinates are valid
    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
      setError("Invalid coordinates")
      setIsLoading(false)
      return
    }

    // For demo purposes, we'll use a static map image
    // In a real app, you would integrate with a mapping library like Mapbox, Google Maps, or Leaflet
    const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/outdoors-v12/static/pin-l-water(${longitude},${latitude})/${longitude},${latitude},11,0/600x400@2x?access_token=YOUR_MAPBOX_TOKEN`

    // Simulate loading a map
    const timer = setTimeout(() => {
      if (mapRef.current) {
        // In a real app, you would initialize your map library here
        // For now, we'll just show a static image
        mapRef.current.innerHTML = `
          <div class="relative w-full h-full">
            <img 
              src="/map-location.png" 
              alt="Map of ${name}"
              class="w-full h-full object-cover"
            />
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
        `
        setIsLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [latitude, longitude, name])

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
        </div>
      )}
      <div ref={mapRef} className="w-full h-full"></div>
    </div>
  )
}
