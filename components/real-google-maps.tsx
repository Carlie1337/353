"use client"

import { useEffect, useRef } from "react"
import { loadGoogleMaps, createMap, createMarker } from "@/lib/google-maps-loader"
import { Card } from "@/components/ui/card"
import type { google } from "google-maps"

export interface RealGoogleMapsProps {
  center?: google.maps.LatLngLiteral
  markers?: google.maps.LatLngLiteral[]
  height?: string
}

export function RealGoogleMaps({
  center = { lat: 7.0731, lng: 125.6128 },
  markers = [],
  height = "400px",
}: RealGoogleMapsProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    async function init() {
      if (!ref.current) return
      await loadGoogleMaps()
      const map = await createMap(ref.current, { center })

      markers.forEach((m) => createMarker(map, { position: m }))
    }

    void init()
  }, [center, markers])

  return (
    <Card className="overflow-hidden">
      <div ref={ref} style={{ height }} />
    </Card>
  )
}
