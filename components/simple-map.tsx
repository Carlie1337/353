"use client"

import { WorkingGoogleMap } from "./working-google-map"

interface SimpleMapProps {
  height?: string
  center?: { lat: number; lng: number }
  zoom?: number
  showFacilities?: boolean
  className?: string
}

export function SimpleMap({
  height = "400px",
  center = { lat: 7.0731, lng: 125.6128 },
  zoom = 15,
  showFacilities = true,
  className = "",
}: SimpleMapProps) {
  const facilities = showFacilities
    ? [
        {
          id: "barangay-hall",
          name: "Barangay Bucana Hall",
          lat: 7.0731,
          lng: 125.6128,
          type: "facility" as const,
          description: "Main administrative building",
        },
        {
          id: "health-center",
          name: "Bucana Health Center",
          lat: 7.0735,
          lng: 125.6125,
          type: "facility" as const,
          description: "Primary healthcare facility",
        },
        {
          id: "school",
          name: "Bucana Elementary School",
          lat: 7.0728,
          lng: 125.6135,
          type: "facility" as const,
          description: "Public elementary school",
        },
        {
          id: "basketball-court",
          name: "Community Basketball Court",
          lat: 7.074,
          lng: 125.612,
          type: "facility" as const,
          description: "Sports and recreation facility",
        },
      ]
    : []

  return (
    <WorkingGoogleMap
      height={height}
      center={center}
      zoom={zoom}
      locations={facilities}
      showUserLocation={true}
      className={className}
    />
  )
}
