"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Layers, Search } from "lucide-react"
import { loadGoogleMaps, isGoogleMapsLoaded } from "@/lib/google-maps-loader"
import { google } from "googlemaps"

interface MapLocation {
  id: string
  name: string
  lat: number
  lng: number
  type: "facility" | "emergency" | "patrol" | "incident" | "evacuation"
  description?: string
  status?: "active" | "inactive" | "emergency"
}

interface WorkingGoogleMapProps {
  height?: string
  center?: { lat: number; lng: number }
  zoom?: number
  locations?: MapLocation[]
  showUserLocation?: boolean
  editable?: boolean
  onLocationAdd?: (location: { lat: number; lng: number }) => void
  className?: string
}

export function WorkingGoogleMap({
  height = "400px",
  center = { lat: 7.0731, lng: 125.6128 }, // Davao City coordinates
  zoom = 15,
  locations = [],
  showUserLocation = true,
  editable = false,
  onLocationAdd,
  className = "",
}: WorkingGoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const getMarkerIcon = (type: string, status?: string) => {
    const baseUrl = "https://maps.google.com/mapfiles/ms/icons/"
    switch (type) {
      case "facility":
        return baseUrl + "blue-dot.png"
      case "emergency":
        return baseUrl + "red-dot.png"
      case "patrol":
        return baseUrl + "green-dot.png"
      case "incident":
        return status === "emergency" ? baseUrl + "red-dot.png" : baseUrl + "orange-dot.png"
      case "evacuation":
        return baseUrl + "purple-dot.png"
      default:
        return baseUrl + "blue-dot.png"
    }
  }

  const clearMarkers = () => {
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []
  }

  const addMarkers = (map: google.maps.Map) => {
    clearMarkers()

    locations.forEach((location) => {
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
        icon: getMarkerIcon(location.type, location.status),
      })

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold;">${location.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Type: ${location.type}</p>
            ${location.status ? `<p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Status: ${location.status}</p>` : ""}
            ${location.description ? `<p style="margin: 0; font-size: 12px;">${location.description}</p>` : ""}
          </div>
        `,
      })

      marker.addListener("click", () => {
        infoWindow.open(map, marker)
      })

      markersRef.current.push(marker)
    })
  }

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setUserLocation(pos)

          if (mapInstanceRef.current) {
            new google.maps.Marker({
              position: pos,
              map: mapInstanceRef.current,
              title: "Your Location",
              icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
                scaledSize: new google.maps.Size(32, 32),
              },
            })
          }
        },
        () => {
          console.log("Error: The Geolocation service failed.")
        },
      )
    }
  }

  const initializeMap = async () => {
    if (!mapRef.current) return

    try {
      if (!isGoogleMapsLoaded()) {
        await loadGoogleMaps()
      }

      const map = new google.maps.Map(mapRef.current, {
        center: center,
        zoom: zoom,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
        ],
      })

      mapInstanceRef.current = map

      // Add markers
      addMarkers(map)

      // Add user location if enabled
      if (showUserLocation) {
        getUserLocation()
      }

      // Add click listener for editable maps
      if (editable && onLocationAdd) {
        map.addListener("click", (event: google.maps.MapMouseEvent) => {
          if (event.latLng) {
            const lat = event.latLng.lat()
            const lng = event.latLng.lng()
            onLocationAdd({ lat, lng })
          }
        })
      }

      setIsLoading(false)
    } catch (err) {
      setError("Failed to load map")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    initializeMap()
  }, [])

  useEffect(() => {
    if (mapInstanceRef.current && locations.length > 0) {
      addMarkers(mapInstanceRef.current)
    }
  }, [locations])

  if (error) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center" style={{ height }}>
          <div className="text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Failed to load map</p>
            <Button onClick={initializeMap} className="mt-2">
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Interactive Map
          </CardTitle>
          <div className="flex items-center gap-2">
            {showUserLocation && (
              <Button size="sm" variant="outline" onClick={getUserLocation}>
                <Navigation className="h-4 w-4 mr-1" />
                My Location
              </Button>
            )}
            <Badge variant="outline" className="flex items-center gap-1">
              <Layers className="h-3 w-3" />
              {locations.length} Locations
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading && (
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-500">Loading map...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} style={{ height, width: "100%" }} className={`rounded-b-lg ${isLoading ? "hidden" : ""}`} />

        {/* Map Legend */}
        {!isLoading && locations.length > 0 && (
          <div className="p-4 border-t bg-gray-50 dark:bg-gray-800">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Map Legend
            </h4>
            <div className="flex flex-wrap gap-3 text-xs">
              {Array.from(new Set(locations.map((l) => l.type))).map((type) => (
                <div key={type} className="flex items-center gap-1">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor:
                        type === "facility"
                          ? "#4285f4"
                          : type === "emergency"
                            ? "#ea4335"
                            : type === "patrol"
                              ? "#34a853"
                              : type === "incident"
                                ? "#fbbc04"
                                : type === "evacuation"
                                  ? "#9c27b0"
                                  : "#4285f4",
                    }}
                  />
                  <span className="capitalize">{type}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
