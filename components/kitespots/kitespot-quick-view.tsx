"use client"
import { X, Wind, MapPin, Calendar, Star, Waves, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

type KitespotQuickViewProps = {
  kitespot: any
  isOpen: boolean
  onClose: () => void
}

export function KitespotQuickView({ kitespot, isOpen, onClose }: KitespotQuickViewProps) {
  // Generate a random rating between 3.5 and 5.0 for demo purposes
  const rating = (Math.random() * 1.5 + 3.5).toFixed(1)

  // Get best months from array or handle null case
  const getBestMonths = () => {
    if (kitespot.best_months && Array.isArray(kitespot.best_months)) {
      try {
        return kitespot.best_months.join(", ")
      } catch (e) {
        return "Not specified"
      }
    }
    return "Not specified"
  }

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200"
      case "intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "advanced":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const bestMonths = getBestMonths()
  const difficultyColor = getDifficultyColor(kitespot.difficulty)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-3xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/80 rounded-full p-1 hover:bg-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                {/* Image section */}
                <div className="relative h-64 md:h-full">
                  <Image
                    src={
                      kitespot.main_image_url ||
                      `/placeholder.svg?height=600&width=800&query=kitesurfing at ${kitespot.name}`
                    }
                    alt={kitespot.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content section */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold">{kitespot.name}</h3>
                    <div className="flex items-center bg-yellow-50 rounded-full px-2 py-1">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="font-medium">{rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>
                      {kitespot.location || ""}, {kitespot.country}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className={difficultyColor}>
                      <BarChart className="h-3.5 w-3.5 mr-1" />
                      {kitespot.difficulty || "All Levels"}
                    </Badge>

                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                      <Waves className="h-3.5 w-3.5 mr-1" />
                      {kitespot.water_type || "Mixed"}
                    </Badge>

                    <Badge variant="outline" className="bg-cyan-100 text-cyan-800 border-cyan-200">
                      <Wind className="h-3.5 w-3.5 mr-1" />
                      {kitespot.avg_wind_speed || Math.floor(Math.random() * 10) + 15} knots
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center text-gray-700 mb-1">
                      <Calendar className="h-4 w-4 mr-1 text-blue-600" />
                      <span className="font-medium">Best months:</span>
                    </div>
                    <p className="text-gray-600 ml-5">{bestMonths}</p>
                  </div>

                  <p className="text-gray-700 mb-6">
                    {kitespot.description ||
                      "Discover this amazing kitespot with perfect wind conditions and beautiful surroundings. Ideal for kitesurfers of all levels looking for a great experience."}
                  </p>

                  <div className="flex gap-3">
                    <Link href={`/kitespots/${kitespot.id}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">View Details</Button>
                    </Link>
                    <Link href={`/kitespots/${kitespot.id}/courses`} className="flex-1">
                      <Button variant="outline" className="w-full border-green-300 text-green-700 hover:bg-green-50">
                        Book Course
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
