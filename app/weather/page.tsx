"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Eye,
  MapPin,
  Clock,
  Sunrise,
  Sunset,
  Gauge,
} from "lucide-react"

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  windDirection: number
  visibility: number
  pressure: number
  uvIndex: number
  sunrise: string
  sunset: string
  feelsLike: number
  dewPoint: number
}

interface ForecastDay {
  date: string
  day: string
  high: number
  low: number
  condition: string
  humidity: number
  windSpeed: number
  precipitation: number
}

export default function WeatherPage() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastDay[]>([])
  const [hourlyForecast, setHourlyForecast] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchLocation, setSearchLocation] = useState("")

  // Mock weather data
  const mockCurrentWeather: WeatherData = {
    location: "Davao City, Philippines",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 75,
    windSpeed: 12,
    windDirection: 180,
    visibility: 10,
    pressure: 1013,
    uvIndex: 8,
    sunrise: "6:15 AM",
    sunset: "6:30 PM",
    feelsLike: 32,
    dewPoint: 23,
  }

  const mockForecast: ForecastDay[] = [
    {
      date: "2024-01-15",
      day: "Today",
      high: 30,
      low: 24,
      condition: "Partly Cloudy",
      humidity: 75,
      windSpeed: 12,
      precipitation: 20,
    },
    {
      date: "2024-01-16",
      day: "Tomorrow",
      high: 29,
      low: 23,
      condition: "Thunderstorms",
      humidity: 85,
      windSpeed: 15,
      precipitation: 80,
    },
    {
      date: "2024-01-17",
      day: "Wednesday",
      high: 31,
      low: 25,
      condition: "Sunny",
      humidity: 65,
      windSpeed: 8,
      precipitation: 10,
    },
    {
      date: "2024-01-18",
      day: "Thursday",
      high: 32,
      low: 26,
      condition: "Partly Cloudy",
      humidity: 70,
      windSpeed: 10,
      precipitation: 15,
    },
    {
      date: "2024-01-19",
      day: "Friday",
      high: 28,
      low: 22,
      condition: "Rain",
      humidity: 90,
      windSpeed: 18,
      precipitation: 90,
    },
  ]

  const mockHourlyForecast = [
    { time: "12:00 PM", temp: 28, condition: "Partly Cloudy", precipitation: 20 },
    { time: "1:00 PM", temp: 29, condition: "Partly Cloudy", precipitation: 15 },
    { time: "2:00 PM", temp: 30, condition: "Sunny", precipitation: 10 },
    { time: "3:00 PM", temp: 31, condition: "Sunny", precipitation: 5 },
    { time: "4:00 PM", temp: 30, condition: "Partly Cloudy", precipitation: 20 },
    { time: "5:00 PM", temp: 29, condition: "Cloudy", precipitation: 30 },
    { time: "6:00 PM", temp: 27, condition: "Rain", precipitation: 70 },
    { time: "7:00 PM", temp: 26, condition: "Rain", precipitation: 80 },
  ]

  useEffect(() => {
    // Simulate loading weather data
    const loadWeatherData = async () => {
      setLoading(true)
      try {
        // In a real app, you would fetch from weather API here
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setCurrentWeather(mockCurrentWeather)
        setForecast(mockForecast)
        setHourlyForecast(mockHourlyForecast)
      } catch (err) {
        setError("Failed to load weather data")
      } finally {
        setLoading(false)
      }
    }

    loadWeatherData()
  }, [])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny":
      case "clear":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "partly cloudy":
      case "cloudy":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "rain":
      case "thunderstorms":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      case "snow":
        return <CloudSnow className="h-8 w-8 text-blue-200" />
      default:
        return <Sun className="h-8 w-8 text-yellow-500" />
    }
  }

  const getUVIndexColor = (uvIndex: number) => {
    if (uvIndex <= 2) return "bg-green-500"
    if (uvIndex <= 5) return "bg-yellow-500"
    if (uvIndex <= 7) return "bg-orange-500"
    if (uvIndex <= 10) return "bg-red-500"
    return "bg-purple-500"
  }

  const getUVIndexLabel = (uvIndex: number) => {
    if (uvIndex <= 2) return "Low"
    if (uvIndex <= 5) return "Moderate"
    if (uvIndex <= 7) return "High"
    if (uvIndex <= 10) return "Very High"
    return "Extreme"
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading weather data...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Weather Updates</h1>
          <p className="text-muted-foreground">Current weather conditions and forecasts</p>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Search location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="w-64"
          />
          <Button>
            <MapPin className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Current Weather */}
      {currentWeather && (
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">{currentWeather.location}</CardTitle>
                <CardDescription className="text-blue-100">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Last updated: {new Date().toLocaleTimeString()}
                </CardDescription>
              </div>
              {getWeatherIcon(currentWeather.condition)}
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center md:text-left">
                <div className="text-6xl font-bold mb-2">{currentWeather.temperature}°C</div>
                <div className="text-xl">{currentWeather.condition}</div>
                <div className="text-blue-100">Feels like {currentWeather.feelsLike}°C</div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">{currentWeather.humidity}%</div>
                    <div className="text-sm text-blue-100">Humidity</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">{currentWeather.windSpeed} km/h</div>
                    <div className="text-sm text-blue-100">Wind Speed</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">{currentWeather.visibility} km</div>
                    <div className="text-sm text-blue-100">Visibility</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  <div>
                    <div className="font-semibold">{currentWeather.pressure} hPa</div>
                    <div className="text-sm text-blue-100">Pressure</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sunrise className="h-5 w-5" />
                    <span>Sunrise</span>
                  </div>
                  <span className="font-semibold">{currentWeather.sunrise}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sunset className="h-5 w-5" />
                    <span>Sunset</span>
                  </div>
                  <span className="font-semibold">{currentWeather.sunset}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>UV Index</span>
                  <Badge className={`${getUVIndexColor(currentWeather.uvIndex)} text-white`}>
                    {currentWeather.uvIndex} - {getUVIndexLabel(currentWeather.uvIndex)}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weather Details Tabs */}
      <Tabs defaultValue="forecast" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
          <TabsTrigger value="hourly">Hourly</TabsTrigger>
          <TabsTrigger value="map">Weather Map</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="forecast" className="space-y-4">
          <div className="grid gap-4">
            {forecast.map((day, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[80px]">
                        <div className="font-semibold">{day.day}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </div>
                      </div>
                      {getWeatherIcon(day.condition)}
                      <div>
                        <div className="font-medium">{day.condition}</div>
                        <div className="text-sm text-muted-foreground">Precipitation: {day.precipitation}%</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">{day.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{day.windSpeed} km/h</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{day.high}°</div>
                        <div className="text-muted-foreground">{day.low}°</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="hourly" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hourlyForecast.map((hour, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-4">
                  <div className="font-semibold mb-2">{hour.time}</div>
                  <div className="flex justify-center mb-2">{getWeatherIcon(hour.condition)}</div>
                  <div className="text-2xl font-bold mb-1">{hour.temp}°C</div>
                  <div className="text-sm text-muted-foreground mb-2">{hour.condition}</div>
                  <div className="flex items-center justify-center gap-1 text-sm text-blue-500">
                    <Droplets className="h-3 w-3" />
                    {hour.precipitation}%
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Weather Map</CardTitle>
              <CardDescription>View weather patterns, radar, and satellite imagery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Weather Map</h3>
                  <p className="text-muted-foreground mb-4">Interactive weather map showing current conditions</p>
                  <div className="flex gap-2 justify-center">
                    <Badge variant="secondary">Radar</Badge>
                    <Badge variant="secondary">Satellite</Badge>
                    <Badge variant="secondary">Temperature</Badge>
                    <Badge variant="secondary">Precipitation</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="space-y-4">
            <Alert>
              <AlertDescription>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-yellow-500">Weather Advisory</Badge>
                  <span className="text-sm text-muted-foreground">Valid until 6:00 PM today</span>
                </div>
                <p>Scattered thunderstorms expected this afternoon. Stay indoors during heavy rainfall.</p>
              </AlertDescription>
            </Alert>

            <Alert>
              <AlertDescription>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-orange-500">Heat Index Warning</Badge>
                  <span className="text-sm text-muted-foreground">Valid for next 3 days</span>
                </div>
                <p>High heat index values expected. Drink plenty of water and avoid prolonged sun exposure.</p>
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weather Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Stay hydrated during hot weather</li>
                  <li>• Avoid outdoor activities during thunderstorms</li>
                  <li>• Keep emergency supplies ready during typhoon season</li>
                  <li>• Monitor weather updates regularly</li>
                  <li>• Follow local evacuation orders when issued</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
