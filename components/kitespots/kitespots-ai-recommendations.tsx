"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Sparkles, Wind, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function KitespotsAIRecommendations() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [windSpeed, setWindSpeed] = useState([15])
  const [experience, setExperience] = useState("intermediate")
  const [wavePreference, setWavePreference] = useState("flat")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      // In a real app, this would call an API to get AI recommendations
      // For now, we'll just redirect to a filtered view
      router.push(`/kitespots?difficulty=${experience}&water_type=${wavePreference}`)
      setIsLoading(false)
      setIsOpen(false)
    }, 1500)
  }

  if (!isOpen) {
    return (
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md transform transition-transform hover:scale-[1.01] duration-300">
        <div className="flex items-center">
          <div className="bg-white/20 p-3 rounded-full mr-4">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">AI Kitespot Finder</h3>
            <p className="text-blue-100 text-sm">Get personalized recommendations based on your preferences</p>
          </div>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-white text-blue-600 hover:bg-blue-50 border-none shadow-md"
          size="lg"
        >
          Find My Perfect Spot
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-md border border-blue-200">
      <div className="flex items-center mb-4">
        <div className="bg-blue-500 p-2 rounded-full mr-3">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <h3 className="font-semibold text-blue-800 text-lg">AI Kitespot Finder</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Wind Speed Preference */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <label className="text-sm font-medium flex items-center text-blue-800 mb-3">
              <Wind className="h-4 w-4 mr-1 text-blue-600" />
              Preferred Wind Speed: {windSpeed[0]} knots
            </label>
            <Slider value={windSpeed} onValueChange={setWindSpeed} min={5} max={30} step={1} className="py-4" />
          </div>

          {/* Experience Level */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <label className="text-sm font-medium text-blue-800 mb-3 block">Experience Level</label>
            <div className="grid grid-cols-3 gap-2">
              {["beginner", "intermediate", "advanced"].map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={experience === level ? "default" : "outline"}
                  className={experience === level ? "bg-blue-600" : ""}
                  onClick={() => setExperience(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Wave Preference */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <label className="text-sm font-medium text-blue-800 mb-3 block">Water Conditions</label>
            <div className="grid grid-cols-3 gap-2">
              {["flat", "choppy", "waves"].map((type) => (
                <Button
                  key={type}
                  type="button"
                  variant={wavePreference === type ? "default" : "outline"}
                  className={wavePreference === type ? "bg-blue-600" : ""}
                  onClick={() => setWavePreference(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isLoading} size="lg">
            {isLoading ? (
              <>
                <span className="mr-2">Finding spots...</span>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                Find Perfect Spots
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
