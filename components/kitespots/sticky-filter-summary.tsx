"use client"

import { useEffect, useState } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export function StickyFilterSummary() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const difficulty = searchParams.get("difficulty") || ""
  const continent = searchParams.get("continent") || ""
  const country = searchParams.get("country") || ""
  const waterType = searchParams.get("water_type") || ""
  const month = searchParams.get("month") || ""

  // Count active filters
  const activeFilters = [difficulty, continent, country, waterType, month].filter(Boolean)
  const hasActiveFilters = activeFilters.length > 0

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky filter when scrolling past 500px
      setIsVisible(window.scrollY > 500 && hasActiveFilters)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasActiveFilters])

  const clearAllFilters = () => {
    router.push("/kitespots")
  }

  const removeFilter = (name: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(name)
    router.push(`/kitespots?${params.toString()}`)
  }

  if (!hasActiveFilters) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-16 left-0 right-0 z-40 bg-white shadow-md border-b border-gray-200 py-2"
        >
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium mr-3">Active filters:</span>
              <div className="flex flex-wrap gap-2">
                {difficulty && (
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                    Difficulty: {difficulty}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("difficulty")} />
                  </Badge>
                )}
                {continent && (
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                    Continent: {continent}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("continent")} />
                  </Badge>
                )}
                {country && (
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                    Country: {country}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("country")} />
                  </Badge>
                )}
                {waterType && (
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                    Water: {waterType}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("water_type")} />
                  </Badge>
                )}
                {month && (
                  <Badge className="bg-blue-100 text-blue-800 border border-blue-200 flex items-center gap-1">
                    Month: {month}
                    <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeFilter("month")} />
                  </Badge>
                )}
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-200" onClick={clearAllFilters}>
              Clear All
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
