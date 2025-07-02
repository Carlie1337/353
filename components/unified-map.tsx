"use client"

import type React from "react"

import { useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Navigation, Maximize, Minimize } from "lucide-react"

interface MapLocation {
  lat: number
  lng: number
  name?: string
  description?: string
  type?: string
  status?: string
}

interface UnifiedMapProps {
  center?: { lat: number; lng: number }
  zoom?: number
  height?: string
  className?: string
  markers?: any[]
  userRole?: string
  userId?: string
  userName?: string
  onLocationClick?: (location: { lat: number; lng: number }) => void
}

export function UnifiedMap({
  center = { lat: 7.0731, lng: 125.6128 },
  zoom = 15,
  height = "400px",
  className = "",
  markers = [],
  userRole = "guest",
  userId = "",
  userName = "",
  onLocationClick,
}: UnifiedMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<any>(null)

  // Mock locations for demonstration
  const mockLocations = [
    {
      id: "barangay-hall",
      position: { lat: 7.0731, lng: 125.6128 },
      title: "Barangay Hall",
      description: "Main administrative building",
      type: "government",
      status: "active",
    },
    {
      id: "health-center",
      position: { lat: 7.0735, lng: 125.6125 },
      title: "Health Center",
      description: "Primary healthcare facility",
      type: "health",
      status: "active",
    },
    {
      id: "school",
      position: { lat: 7.0728, lng: 125.6135 },
      title: "Elementary School",
      description: "Public elementary school",
      type: "education",
      status: "active",
    },
  ]

  const allMarkers = [...mockLocations, ...markers]

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker)
  }

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onLocationClick) {
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      // Convert pixel coordinates to lat/lng (simplified)
      const lat = center.lat + (y - rect.height / 2) * 0.0001
      const lng = center.lng + (x - rect.width / 2) * 0.0001

      onLocationClick({ lat, lng })
    }
  }

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "government":
        return "bg-blue-500"
      case "health":
        return "bg-red-500"
      case "education":
        return "bg-green-500"
      case "patrol":
        return "bg-purple-500"
      case "incident":
        return "bg-orange-500"
      case "camera":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Map Container */}
      <div
        ref={mapRef}
        className={`w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border relative overflow-hidden cursor-pointer ${
          isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""
        }`}
        onClick={handleMapClick}
      >
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10b981" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation()
              setIsFullscreen(!isFullscreen)
            }}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Navigation className="h-4 w-4" />
          </Button>
        </div>

        {/* User Info (if provided) */}
        {userRole !== "guest" && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
            <div className="font-medium">{userName}</div>
            <div className="text-gray-600 capitalize">{userRole}</div>
          </div>
        )}

        {/* Map Markers */}
        {allMarkers.map((marker, index) => (
          <div
            key={marker.id || index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            style={{
              left: `${50 + (marker.position.lng - center.lng) * 10000}%`,
              top: `${50 - (marker.position.lat - center.lat) * 10000}%`,
            }}
            onClick={(e) => {
              e.stopPropagation()
              handleMarkerClick(marker)
            }}
          >
            <div
              className={`w-4 h-4 rounded-full ${getMarkerColor(marker.type)} border-2 border-white shadow-lg animate-pulse`}
            >
              <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-current opacity-25 animate-ping"></div>
            </div>
          </div>
        ))}

        {/* Zoom Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-1 z-10">
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm w-8 h-8 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            +
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-white/90 backdrop-blur-sm w-8 h-8 p-0"
            onClick={(e) => e.stopPropagation()}
          >
            -
          </Button>
        </div>

        {/* Scale */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs">1 km</div>
      </div>

      {/* Selected Marker Info */}
      {selectedMarker && (
        <Card className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 min-w-64">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">{selectedMarker.title}</h4>
              <Button size="sm" variant="ghost" onClick={() => setSelectedMarker(null)} className="h-6 w-6 p-0">
                ×
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-2">{selectedMarker.description}</p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="capitalize">
                {selectedMarker.type}
              </Badge>
              {selectedMarker.status && (
                <Badge variant={selectedMarker.status === "active" ? "default" : "secondary"}>
                  {selectedMarker.status}
                </Badge>
              )}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
