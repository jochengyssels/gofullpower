"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Wind, Waves, BarChart, ArrowRight, Star, Calendar, School } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { PredictabilityChart } from "@/components/kitespots/predictability-chart"

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

  // Generate a random rating between 3.5 and 5.0 for demo purposes
  // In a real app, this would come from the database
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1)

  // Generate random average wind speed if not provided (for demo purposes)
  const avgWindSpeed = kitespot.avg_wind_speed || Math.floor(Math.random() * 10) + 15

  // Generate random predictability data for the next 7 days if not provided
  const predictabilityData = kitespot.predictability || Array.from({ length: 7 }, () => Math.random() * 100)

  // Get best months from JSON or generate random ones
  const getBestMonths = () => {
    if (kitespot.best_months && typeof kitespot.best_months === "object") {
      try {
        // Try to extract months with high scores
        const months = Object.entries(kitespot.best_months)
          .filter(([_, score]) => (score as number) > 0.7)
          .map(([month]) => month)
          .slice(0, 3)

        if (months.length > 0) {
          return months.join(", ")
        }
      } catch (e) {
        // Fallback to random months
      }
    }

    // Fallback: random months
    const allMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const randomMonths = []
    const numMonths = Math.floor(Math.random() * 3) + 1

    for (let i = 0; i < numMonths; i++) {
      const randomIndex = Math.floor(Math.random() * allMonths.length)
      randomMonths.push(allMonths[randomIndex])
      allMonths.splice(randomIndex, 1)
    }

    return randomMonths.join(", ")
  }

  // Get difficulty icon and color
  const getDifficultyDetails = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return { icon: <BarChart className="h-4 w-4" />, color: "bg-green-100 text-green-800" }
      case "intermediate":
        return { icon: <BarChart className="h-4 w-4" />, color: "bg-blue-100 text-blue-800" }
      case "advanced":
        return { icon: <BarChart className="h-4 w-4" />, color: "bg-purple-100 text-purple-800" }
      default:
        return { icon: <BarChart className="h-4 w-4" />, color: "bg-gray-100 text-gray-800" }
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={kitespot.main_image_url || `/placeholder.svg?height=400&width=600&query=kitesurfing at ${kitespot.name}`}
          alt={kitespot.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 flex items-center shadow-sm">
          <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" fill="currentColor" />
          <span className="text-sm font-medium">{rating}</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl font-medium text-white">{kitespot.name}</h3>
          <div className="flex items-center text-white/90 text-sm">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            <span>
              {kitespot.location} {kitespot.country}
            </span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className={difficultyDetails.color}>
            {difficultyDetails.icon}
            <span className="ml-1">{kitespot.difficulty || "All Levels"}</span>
          </Badge>

          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {getWaterTypeIcon(kitespot.water_type)}
            <span className="ml-1">{kitespot.water_type || "Mixed"}</span>
          </Badge>

          {/* Wind Speed Badge */}
          <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
            <Wind className="h-4 w-4 mr-1" />
            <span>{avgWindSpeed} knots</span>
          </Badge>
        </div>

        {/* Show predictability chart if requested */}
        {showPredictability && (
          <div className="mb-3">
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
          <div className="flex items-center text-sm text-gray-600 mb-3">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            <span>Best: {bestMonths}</span>
          </div>
        )}

        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {kitespot.description || "Discover this amazing kitespot with perfect wind conditions."}
        </p>

        <div className="flex justify-between items-center">
          <Link
            href={`/kitespots/${kitespot.id}`}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>

          <Link
            href={`/kitespots/${kitespot.id}/courses`}
            className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 transition-colors"
          >
            Kite courses
            <School className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Hover overlay with additional info */}
      <motion.div
        className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center p-6 text-white opacity-0 pointer-events-none"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <Wind className="h-10 w-10 mb-4 text-blue-400" />
        <h3 className="text-xl font-medium mb-2">{kitespot.name}</h3>
        <div className="flex items-center mb-2">
          <Wind className="h-4 w-4 mr-1 text-blue-400" />
          <span className="text-blue-300">{avgWindSpeed} knots avg wind</span>
        </div>
        <p className="text-center text-sm mb-4">{kitespot.description}</p>
        <Link
          href={`/kitespots/${kitespot.id}`}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-sm font-medium transition-colors"
        >
          Explore Kitespot
        </Link>
      </motion.div>
    </motion.div>
  )
}
