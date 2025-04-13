"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Wind, Waves, BarChart, ArrowRight, Star, Calendar, School, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PredictabilityChart } from "@/components/kitespots/predictability-chart"
import { KitespotQuickView } from "@/components/kitespots/kitespot-quick-view"

type KitespotCardProps = {
  kitespot: {
    id: string
    name: string
    location: string
    country: string
    difficulty: string
    water_type: string
    description: string
    main_image_url?: string
    latitude: number
    longitude: number
    best_months?: any
    avg_wind_speed?: number
    predictability?: number[]
  }
  showPredictability?: boolean
}

export function KitespotCard({ kitespot, showPredictability = false }: KitespotCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)

  // Generate a random rating between 3.5 and 5.0 for demo purposes
  // In a real app, this would come from the database
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1)

  // Generate random average wind speed if not provided (for demo purposes)
  const avgWindSpeed = kitespot.avg_wind_speed || Math.floor(Math.random() * 10) + 15

  // Generate random predictability data for the next 7 days if not provided
  const predictabilityData = kitespot.predictability || Array.from({ length: 7 }, () => Math.random() * 100)

  // Get best months from array or handle null case
  const getBestMonths = () => {
    if (kitespot.best_months && Array.isArray(kitespot.best_months)) {
      try {
        // If best_months is an array of month names, join them
        return kitespot.best_months.slice(0, 3).join(", ")
      } catch (e) {
        // Fallback to "Not specified"
        return "Not specified"
      }
    }

    // If best_months is null or not an array
    return "Not specified"
  }

  // Get difficulty icon and color
  const getDifficultyDetails = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return { icon: <BarChart className="h-4 w-4" />, color: "bg-green-100 text-green-800 border-green-200" }
      case "intermediate":
        return { icon: <BarChart className="h-4 w-4" />, color: "bg-blue-100 text-blue-800 border-blue-200" }
      case "advanced":
        return { icon: <BarChart className="h-4 w-4" />, color: "bg-purple-100 text-purple-800 border-purple-200" }
      default:
        return { icon: <BarChart className="h-4 w-4" />, color: "bg-gray-100 text-gray-800 border-gray-200" }
    }
  }

  // Get water type icon
  const getWaterTypeIcon = (type: string) => {
    switch (type?.toLowerCase()) {
      case "flat":
        return <Waves className="h-4 w-4" />
      case "choppy":
        return <Waves className="h-4 w-4" />
      case "waves":
        return <Waves className="h-4 w-4" />
      default:
        return <Waves className="h-4 w-4" />
    }
  }

  const difficultyDetails = getDifficultyDetails(kitespot.difficulty)
  const bestMonths = getBestMonths()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 overflow-hidden">
          <Image
            src={
              kitespot.main_image_url || `/placeholder.svg?height=400&width=600&query=kitesurfing at ${kitespot.name}`
            }
            alt={kitespot.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized={kitespot.main_image_url?.startsWith("http")}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsQuickViewOpen(true)
            }}
            className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
            aria-label="Quick view"
          >
            <Eye className="h-4 w-4 text-blue-600" />
          </button>

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center shadow-sm">
            <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm font-medium">{rating}</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-semibold text-white">{kitespot.name}</h3>
            <div className="flex items-center text-white/90 text-sm">
              <MapPin className="h-3 w-3 mr-1" />
              <span>
                {kitespot.location || ""} {kitespot.country}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-1 mb-3">
            <Badge variant="outline" className={difficultyDetails.color + " text-xs border"}>
              {difficultyDetails.icon}
              <span className="ml-1">{kitespot.difficulty || "All Levels"}</span>
            </Badge>

            <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs border border-blue-200">
              {getWaterTypeIcon(kitespot.water_type)}
              <span className="ml-1">{kitespot.water_type || "Mixed"}</span>
            </Badge>

            {/* Wind Speed Badge */}
            <Badge variant="outline" className="bg-cyan-100 text-cyan-800 text-xs border border-cyan-200">
              <Wind className="h-3 w-3 mr-1" />
              <span>{avgWindSpeed} knots</span>
            </Badge>
          </div>

          {/* Show predictability chart if requested */}
          {showPredictability && (
            <div className="mb-3 bg-gray-50 p-2 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-600">7-Day Kite Predictability</span>
                <span className="text-xs font-medium text-blue-600">
                  {Math.round(predictabilityData.reduce((a, b) => a + b, 0) / predictabilityData.length)}% avg
                </span>
              </div>
              <PredictabilityChart data={predictabilityData} />
            </div>
          )}

          {/* Best Months (only show if not showing predictability) */}
          {!showPredictability && (
            <div className="flex items-center text-xs text-gray-600 mb-2 bg-gray-50 p-2 rounded-lg">
              <Calendar className="h-3 w-3 mr-1 text-blue-500" />
              <span>Best: {bestMonths}</span>
            </div>
          )}

          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {kitespot.description || "Discover this amazing kitespot with perfect wind conditions."}
          </p>

          <div className="flex justify-between items-center">
            <Link href={`/kitespots/${kitespot.id}`}>
              <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50 border-blue-200">
                View details
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Link>

            <Link href={`/kitespots/${kitespot.id}/courses`}>
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs">
                Book Course
                <School className="ml-1 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Subtle hover effects instead of full overlay */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered ? "0 10px 25px -5px rgba(59, 130, 246, 0.5)" : "0 0 0 0 rgba(0, 0, 0, 0)",
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Quick info tooltip on hover */}
        <motion.div
          className="absolute top-0 right-0 left-0 bg-gradient-to-b from-blue-600/90 to-blue-700/90 p-3 text-white transform origin-top z-10 pointer-events-none"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-sm font-medium line-clamp-3">
            {kitespot.description || "Discover this amazing kitespot with perfect wind conditions."}
          </p>
        </motion.div>
      </motion.div>

      {/* Quick View Modal */}
      <KitespotQuickView kitespot={kitespot} isOpen={isQuickViewOpen} onClose={() => setIsQuickViewOpen(false)} />
    </>
  )
}
