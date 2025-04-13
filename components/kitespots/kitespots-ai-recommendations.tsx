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
      <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
          <span className="font-medium">Get AI-powered kitespot recommendations based on your preferences</span>
        </div>
        <Button onClick={() => setIsOpen(true)} className="bg-blue-600">
          Find My Spot
        </Button>
      </div>
    )
  }

  return (
    <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
        <h3 className="font-medium text-lg">AI Kitespot Finder</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Wind Speed Preference */}
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center">
              <Wind className="h-4 w-4 mr-1 text-blue-600" />
              Preferred Wind Speed: {windSpeed[0]} knots
            </label>
            <Slider value={windSpeed} onValueChange={setWindSpeed} min={5} max={30} step={1} className="py-4" />
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Experience Level</label>
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Water Conditions</label>
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

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" className="bg-blue-600" disabled={isLoading}>
            {isLoading ? "Finding spots..." : "Find Perfect Spots"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}
