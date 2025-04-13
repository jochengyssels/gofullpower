"use client"

import { useState, useEffect } from "react"
import { Wind, Droplets, Sun, Cloud, ArrowDown, ArrowUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

type WeatherForecastProps = {
  kitespotId: string
}

type ForecastDay = {
  date: string
  day_name: string
  wind_speed: number
  wind_direction: string
  temperature: number
  humidity: number
  precipitation: number
  weather_condition: string
  kite_score: number
  min_temp: number
  max_temp: number
}

export function KitespotWeatherForecast({ kitespotId }: WeatherForecastProps) {
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("7-day")

  useEffect(() => {
    async function fetchForecast() {
      setLoading(true)

      try {
        // In a real app, you would fetch this from your API
        // For demo purposes, we'll generate mock data
        const mockForecast = generateMockForecast()
        setForecast(mockForecast)
      } catch (error) {
        console.error("Error fetching forecast:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [kitespotId])

  // Generate mock forecast data
  const generateMockForecast = (): ForecastDay[] => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const conditions = ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain", "Windy"]
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"]

    const today = new Date()

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const windSpeed = Math.floor(Math.random() * 15) + 10
      const condition = conditions[Math.floor(Math.random() * conditions.length)]

      // Calculate kite score based on wind speed and conditions
      let kiteScore = 0
      if (windSpeed >= 12 && windSpeed <= 25) {
        kiteScore = 70 + Math.floor(Math.random() * 30)
      } else if (windSpeed > 25) {
        kiteScore = 50 + Math.floor(Math.random() * 20)
      } else {
        kiteScore = 30 + Math.floor(Math.random() * 40)
      }

      // Reduce score if bad weather
      if (condition === "Light Rain") kiteScore = Math.max(kiteScore - 20, 0)

      return {
        date: date.toISOString().split("T")[0],
        day_name: days[date.getDay()],
        wind_speed: windSpeed,
        wind_direction: directions[Math.floor(Math.random() * directions.length)],
        temperature: Math.floor(Math.random() * 15) + 15,
        humidity: Math.floor(Math.random() * 40) + 40,
        precipitation: Math.floor(Math.random() * 30),
        weather_condition: condition,
        kite_score: kiteScore,
        min_temp: Math.floor(Math.random() * 10) + 10,
        max_temp: Math.floor(Math.random() * 10) + 20,
      }
    })
  }

  // Get weather icon based on condition
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
        return <Sun className="h-6 w-6 text-yellow-500" />
      case "partly cloudy":
        return <Cloud className="h-6 w-6 text-gray-400" />
      case "cloudy":
        return <Cloud className="h-6 w-6 text-gray-500" />
      case "light rain":
        return <Droplets className="h-6 w-6 text-blue-400" />
      case "windy":
        return <Wind className="h-6 w-6 text-blue-500" />
      default:
        return <Sun className="h-6 w-6 text-yellow-500" />
    }
  }

  // Get color based on kite score
  const getKiteScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500"
    if (score >= 60) return "text-lime-500"
    if (score >= 40) return "text-yellow-500"
    return "text-red-500"
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold mb-4">Weather Forecast</h2>
        <div className="h-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">Weather Forecast</h2>

      <Tabs defaultValue="7-day" onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="7-day">7-Day Forecast</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="7-day">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {forecast.map((day, index) => (
              <Card key={day.date} className={`overflow-hidden ${index === 0 ? "border-blue-200" : ""}`}>
                <CardContent className="p-4">
                  <div className="text-center mb-2">
                    <p className="font-semibold">{index === 0 ? "Today" : day.day_name}</p>
                    <p className="text-xs text-gray-500">{day.date}</p>
                  </div>

                  <div className="flex justify-center mb-3">{getWeatherIcon(day.weather_condition)}</div>

                  <div className="text-center mb-2">
                    <div className="flex items-center justify-center gap-1 text-sm">
                      <ArrowDown className="h-3 w-3 text-blue-500" />
                      <span>{day.min_temp}°</span>
                      <ArrowUp className="h-3 w-3 text-red-500" />
                      <span>{day.max_temp}°</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-2">
                    <Wind className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{day.wind_speed} knots</span>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-600">Kite Score</p>
                    <p className={`font-bold ${getKiteScoreColor(day.kite_score)}`}>{day.kite_score}%</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hourly">
          <div className="p-4 text-center">
            <p className="text-gray-500">Hourly forecast is available in the premium version.</p>
            <p className="text-sm text-gray-400 mt-2">Get detailed hour-by-hour wind predictions and kite scores.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
