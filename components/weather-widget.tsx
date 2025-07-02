"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Cloud, CloudRain, MapPin } from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Mock weather data for demo
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setWeather({
          location: "Davao City",
          temperature: 28,
          condition: "Partly Cloudy",
          humidity: 75,
        })
      } catch (error) {
        console.error("Failed to fetch weather:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "partly cloudy":
      case "cloudy":
        return <Cloud className="h-5 w-5 text-gray-500" />
      case "rain":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />
    }
  }

  if (loading) {
    return (
      <Card className="w-full max-w-sm">
        <CardContent className="p-4">
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!weather) return null

  return (
    <Card className="w-full max-w-sm bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-sm">
            <MapPin className="h-3 w-3" />
            {weather.location}
          </div>
          {getWeatherIcon(weather.condition)}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold">{weather.temperature}°C</div>
            <div className="text-sm opacity-90">{weather.condition}</div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {weather.humidity}% humidity
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
