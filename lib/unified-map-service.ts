"use client"

import { googleMapsLoader, defaultGoogleMapsConfig } from "./google-maps-loader"
import type { google } from "googlemaps"

// Types for the unified map system
export type UserRole = "admin" | "resqnet" | "net" | "resident" | "health"

export interface MapLocation {
  id?: string
  name?: string
  lat: number
  lng: number
  title?: string
  description?: string
  type?: "incident" | "facility" | "landmark" | "emergency"
}

export interface AlertZone {
  id: string
  name: string
  type: "flood" | "landslide" | "fire" | "earthquake" | "storm" | "evacuation"
  severity: "low" | "medium" | "high" | "critical"
  lat: number
  lng: number
  radius: number
  description: string
  instructions?: string
  status: "active" | "monitoring" | "resolved"
  affectedHouseholds: number
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

export interface PatrolUnit {
  id: string
  callSign: string
  unitType: "patrol" | "emergency" | "traffic" | "investigation"
  officers: string[]
  lat: number
  lng: number
  location: string
  status: "available" | "patrol" | "responding" | "busy" | "offline"
  lastUpdate: Date
  assignedArea?: string
  contactFrequency?: string
}

export interface EmergencyIncident {
  id: string
  type: "fire" | "medical" | "crime" | "accident" | "natural_disaster" | "other"
  severity: "low" | "medium" | "high" | "critical"
  lat: number
  lng: number
  location: string
  description: string
  status: "reported" | "responding" | "on_scene" | "resolved"
  reportedAt: Date
  reportedBy: string
  assignedUnits: string[]
  estimatedResolution?: Date
}

export interface SafeZone {
  id: string
  name: string
  type: "evacuation_center" | "hospital" | "police_station" | "fire_station" | "school"
  lat: number
  lng: number
  capacity: number
  currentOccupancy: number
  status: "available" | "full" | "maintenance"
  contactPerson: string
  contactNumber: string
  facilities: string[]
  accessibleForDisabled: boolean
}

export interface MapConfig {
  center: MapLocation
  zoom: number
  markers?: MapLocation[]
  enableSearch?: boolean
  enableDrawing?: boolean
  mapTypeId?: "roadmap" | "satellite" | "hybrid" | "terrain"
}

export interface MapPermissions {
  canView: boolean
  canAdd: boolean
  canEdit: boolean
  canDelete: boolean
  canManageAlerts: boolean
  canTrackUnits: boolean
  canReportIncidents: boolean
}

export function getMapPermissions(role: UserRole): MapPermissions {
  switch (role) {
    case "admin":
      return {
        canView: true,
        canAdd: true,
        canEdit: true,
        canDelete: true,
        canManageAlerts: true,
        canTrackUnits: true,
        canReportIncidents: true,
      }
    case "resqnet":
      return {
        canView: true,
        canAdd: true,
        canEdit: true,
        canDelete: false,
        canManageAlerts: true,
        canTrackUnits: true,
        canReportIncidents: true,
      }
    case "net":
      return {
        canView: true,
        canAdd: false,
        canEdit: false,
        canDelete: false,
        canManageAlerts: false,
        canTrackUnits: true,
        canReportIncidents: true,
      }
    case "health":
      return {
        canView: true,
        canAdd: false,
        canEdit: false,
        canDelete: false,
        canManageAlerts: false,
        canTrackUnits: false,
        canReportIncidents: true,
      }
    case "resident":
    default:
      return {
        canView: true,
        canAdd: false,
        canEdit: false,
        canDelete: false,
        canManageAlerts: false,
        canTrackUnits: false,
        canReportIncidents: false,
      }
  }
}

// Unified Map Service Class
class UnifiedMapService {
  private static instance: UnifiedMapService
  private googleMaps: typeof google | null = null
  private isInitialized = false
  private mapInstances: Map<string, any> = new Map()
  private locations: MapLocation[] = []
  private alertZones: AlertZone[] = []
  private patrolUnits: PatrolUnit[] = []
  private incidents: EmergencyIncident[] = []
  private safeZones: SafeZone[] = []

  private constructor() {}

  static getInstance(): UnifiedMapService {
    if (!UnifiedMapService.instance) {
      UnifiedMapService.instance = new UnifiedMapService()
    }
    return UnifiedMapService.instance
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    try {
      this.googleMaps = await googleMapsLoader.load(defaultGoogleMapsConfig)
      this.isInitialized = true
    } catch (error) {
      console.error("Failed to initialize Google Maps:", error)
      throw error
    }
  }

  async createMap(container: HTMLElement, config: MapConfig): Promise<google.maps.Map | null> {
    if (!this.isInitialized) {
      await this.initialize()
    }

    if (!this.googleMaps) {
      console.error("Google Maps not available")
      return null
    }

    try {
      const map = new this.googleMaps.maps.Map(container, {
        center: { lat: config.center.lat, lng: config.center.lng },
        zoom: config.zoom,
        mapTypeId: config.mapTypeId || "roadmap",
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
      })

      // Add markers if provided
      if (config.markers) {
        config.markers.forEach((location) => {
          this.addMarker(map, location)
        })
      }

      // Enable search if requested
      if (config.enableSearch) {
        this.enableSearch(map)
      }

      return map
    } catch (error) {
      console.error("Failed to create map:", error)
      return null
    }
  }

  addMarker(map: google.maps.Map, location: MapLocation): google.maps.Marker | null {
    if (!this.googleMaps) return null

    try {
      const marker = new this.googleMaps.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.title,
        icon: this.getMarkerIcon(location.type),
      })

      if (location.description) {
        const infoWindow = new this.googleMaps.maps.InfoWindow({
          content: `
            <div style="padding: 8px;">
              <h3 style="margin: 0 0 8px 0; font-size: 14px;">${location.title || "Location"}</h3>
              <p style="margin: 0; font-size: 12px;">${location.description}</p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      }

      return marker
    } catch (error) {
      console.error("Failed to add marker:", error)
      return null
    }
  }

  private getMarkerIcon(type?: string): string | undefined {
    const iconMap: Record<string, string> = {
      incident: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
      facility: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      landmark: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
      emergency: "https://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    }

    return type ? iconMap[type] : undefined
  }

  private enableSearch(map: google.maps.Map): void {
    if (!this.googleMaps) return

    try {
      const searchBox = new this.googleMaps.maps.places.SearchBox(document.createElement("input") as HTMLInputElement)

      map.controls[this.googleMaps.maps.ControlPosition.TOP_LEFT].push(searchBox as any)

      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces()
        if (!places || places.length === 0) return

        const place = places[0]
        if (!place.geometry || !place.geometry.location) return

        map.setCenter(place.geometry.location)
        map.setZoom(15)
      })
    } catch (error) {
      console.error("Failed to enable search:", error)
    }
  }

  // Getter methods
  getLocations(): MapLocation[] {
    return [...this.locations]
  }

  getAlertZones(): AlertZone[] {
    return this.alertZones
  }

  getPatrolUnits(): PatrolUnit[] {
    return this.patrolUnits
  }

  getIncidents(): EmergencyIncident[] {
    return this.incidents
  }

  getSafeZones(): SafeZone[] {
    return this.safeZones
  }

  // CRUD operations would go here
  addLocation(location: MapLocation): void {
    this.locations.push(location)
    this.updateAllMaps()
  }

  removeLocation(id: string): void {
    this.locations = this.locations.filter((loc) => loc.id !== id)
    this.updateAllMaps()
  }

  registerMap(id: string, mapInstance: any): void {
    this.mapInstances.set(id, mapInstance)
  }

  unregisterMap(id: string): void {
    this.mapInstances.delete(id)
  }

  private updateAllMaps(): void {
    this.mapInstances.forEach((mapInstance) => {
      // Update map with new locations
      console.log("Updating map with locations:", this.locations)
    })
  }

  getDefaultLocations(): MapLocation[] {
    return [
      {
        id: "LOC001",
        name: "Barangay Hall",
        lat: 7.0731,
        lng: 125.6128,
        type: "facility",
        description: "Main administrative building",
        status: "active",
      },
      {
        id: "LOC002",
        name: "Health Center",
        lat: 7.0741,
        lng: 125.6138,
        type: "facility",
        description: "Primary healthcare facility",
        status: "active",
      },
      {
        id: "LOC003",
        name: "Elementary School",
        lat: 7.0721,
        lng: 125.6118,
        type: "facility",
        description: "Public elementary school",
        status: "active",
      },
    ]
  }

  // Utility methods
  calculateDistance(point1: MapLocation, point2: MapLocation): number {
    if (!this.googleMaps) return 0

    const lat1 = (point1.lat * Math.PI) / 180
    const lat2 = (point2.lat * Math.PI) / 180
    const deltaLat = ((point2.lat - point1.lat) * Math.PI) / 180
    const deltaLng = ((point2.lng - point1.lng) * Math.PI) / 180

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = 6371 * c // Earth's radius in kilometers

    return distance
  }

  getCurrentLocation(): Promise<MapLocation> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          reject(error)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000,
        },
      )
    })
  }
}

export const mapService = UnifiedMapService.getInstance()
export default mapService
