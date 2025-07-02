"use client"
import { MapPin } from "lucide-react"

interface Location {
  lat: number
  lng: number
  name: string
  description?: string
}

interface SimpleLocationMapProps {
  location: Location
  height?: string
  className?: string
}

export function SimpleLocationMap({ location, height = "200px", className = "" }: SimpleLocationMapProps) {
  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 rounded-lg border relative overflow-hidden">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="simple-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#10b981" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#simple-grid)" />
          </svg>
        </div>

        {/* Center Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <MapPin className="h-8 w-8 text-red-500 drop-shadow-lg" />
            <div className="absolute -top-1 -left-1 w-10 h-10 rounded-full bg-red-500 opacity-25 animate-ping"></div>
          </div>
        </div>

        {/* Location Info */}
        <div className="absolute bottom-2 left-2 right-2 bg-white/90 backdrop-blur-sm rounded p-2">
          <div className="font-medium text-sm">{location.name}</div>
          {location.description && <div className="text-xs text-gray-600">{location.description}</div>}
          <div className="text-xs text-gray-500 mt-1">
            {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </div>
        </div>
      </div>
    </div>
  )
}
