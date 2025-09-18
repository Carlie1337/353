"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Eye, RefreshCw, MapPin, Clock } from "lucide-react"

interface WeatherData {
  current: {
    temperature: number
    condition: string
    humidity: number
    windSpeed: number
    visibility: number
    uvIndex: number
    feelsLike: number
  }
  forecast: Array<{
    day: string
    high: number
    low: number
    condition: string
    precipitation: number
  }>
  location: string
  lastUpdated: string
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadWeatherData()

    // Update weather every 10 minutes
    const interval = setInterval(loadWeatherData, 10 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  const loadWeatherData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Sample weather data - in production, this would come from a weather API
      const sampleWeather: WeatherData = {
        current: {
          temperature: 28,
          condition: "Partly Cloudy",
          humidity: 75,
          windSpeed: 12,
          visibility: 10,
          uvIndex: 6,
          feelsLike: 32,
        },
        forecast: [
          { day: "Today", high: 30, low: 24, condition: "Partly Cloudy", precipitation: 20 },
          { day: "Tomorrow", high: 29, low: 23, condition: "Rainy", precipitation: 80 },
          { day: "Wednesday", high: 27, low: 22, condition: "Thunderstorms", precipitation: 90 },
          { day: "Thursday", high: 31, low: 25, condition: "Sunny", precipitation: 10 },
          { day: "Friday", high: 32, low: 26, condition: "Partly Cloudy", precipitation: 30 },
        ],
        location: "Barangay Bucana, Davao City",
        lastUpdated: new Date().toISOString(),
      }

      setWeather(sampleWeather)
    } catch (err: any) {
      console.error("Error loading weather data:", err)
      setError("Failed to load weather data")
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (condition: string) => {
    const lowerCondition = condition.toLowerCase()

    if (lowerCondition.includes("sunny") || lowerCondition.includes("clear")) {
      return Sun
    } else if (lowerCondition.includes("rain") || lowerCondition.includes("shower")) {
      return CloudRain
    } else if (lowerCondition.includes("snow")) {
      return CloudSnow
    } else if (lowerCondition.includes("cloud")) {
      return Cloud
    } else {
      return Cloud
    }
  }

  const getUVIndexColor = (uvIndex: number) => {
    if (uvIndex <= 2) return "bg-green-100 text-green-800"
    if (uvIndex <= 5) return "bg-yellow-100 text-yellow-800"
    if (uvIndex <= 7) return "bg-orange-100 text-orange-800"
    if (uvIndex <= 10) return "bg-red-100 text-red-800"
    return "bg-purple-100 text-purple-800"
  }

  const getUVIndexLabel = (uvIndex: number) => {
    if (uvIndex <= 2) return "Low"
    if (uvIndex <= 5) return "Moderate"
    if (uvIndex <= 7) return "High"
    if (uvIndex <= 10) return "Very High"
    return "Extreme"
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <Skeleton className="h-16 w-16 rounded-full mx-auto mb-2" />
            <Skeleton className="h-8 w-20 mx-auto mb-1" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="h-4 w-16 mx-auto mb-1" />
                <Skeleton className="h-6 w-12 mx-auto" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error || !weather) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Cloud className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 mb-4">{error || "Weather data unavailable"}</p>
            <Button onClick={loadWeatherData} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const CurrentIcon = getWeatherIcon(weather.current.condition)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CurrentIcon className="h-5 w-5" />
            Weather
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={loadWeatherData}
            className="flex items-center gap-1 bg-transparent"
          >
            <RefreshCw className="h-3 w-3" />
            Refresh
          </Button>
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {weather.location}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Current Weather */}
        <div className="text-center mb-6">
          <CurrentIcon className="h-16 w-16 mx-auto mb-2 text-blue-500" />
          <div className="text-3xl font-bold text-gray-900 mb-1">{weather.current.temperature}°C</div>
          <div className="text-gray-600 mb-2">{weather.current.condition}</div>
          <div className="text-sm text-gray-500">Feels like {weather.current.feelsLike}°C</div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <Droplets className="h-4 w-4 mx-auto mb-1 text-blue-500" />
            <div className="text-sm font-medium">{weather.current.humidity}%</div>
            <div className="text-xs text-gray-500">Humidity</div>
          </div>

          <div className="text-center">
            <Wind className="h-4 w-4 mx-auto mb-1 text-gray-500" />
            <div className="text-sm font-medium">{weather.current.windSpeed} km/h</div>
            <div className="text-xs text-gray-500">Wind</div>
          </div>

          <div className="text-center">
            <Eye className="h-4 w-4 mx-auto mb-1 text-green-500" />
            <div className="text-sm font-medium">{weather.current.visibility} km</div>
            <div className="text-xs text-gray-500">Visibility</div>
          </div>

          <div className="text-center">
            <Sun className="h-4 w-4 mx-auto mb-1 text-yellow-500" />
            <div className="text-sm font-medium">{weather.current.uvIndex}</div>
            <div className="text-xs text-gray-500">UV Index</div>
          </div>
        </div>

        {/* UV Index Warning */}
        <div className="mb-6">
          <Badge className={`w-full justify-center ${getUVIndexColor(weather.current.uvIndex)}`}>
            UV Index: {weather.current.uvIndex} - {getUVIndexLabel(weather.current.uvIndex)}
          </Badge>
        </div>

        {/* 5-Day Forecast */}
        <div>
          <h4 className="font-semibold mb-3 text-sm">5-Day Forecast</h4>
          <div className="space-y-2">
            {weather.forecast.map((day, index) => {
              const DayIcon = getWeatherIcon(day.condition)

              return (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <DayIcon className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium w-20">{day.day}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{day.precipitation}%</span>
                    <Droplets className="h-3 w-3 text-blue-400" />
                  </div>

                  <div className="text-sm">
                    <span className="font-medium">{day.high}°</span>
                    <span className="text-gray-500 ml-1">{day.low}°</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Last Updated */}
        <div className="mt-4 pt-4 border-t text-center">
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>Updated: {formatTime(weather.lastUpdated)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
