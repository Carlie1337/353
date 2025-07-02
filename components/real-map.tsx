"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  MapPin,
  AlertTriangle,
  Building,
  Plus,
  Eye,
  Layers,
  RefreshCw,
  Shield,
  Car,
  Radio,
  Zap,
  Target,
  Navigation,
  Satellite,
} from "lucide-react"

interface RealMapProps {
  userRole: "admin" | "resqnet" | "net" | "resident" | "health"
  userId: string
  userName: string
}

declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export function RealMap({ userRole, userId, userName }: RealMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapType, setMapType] = useState("roadmap")
  const [selectedLayers, setSelectedLayers] = useState({
    locations: true,
    alerts: true,
    units: userRole === "net" || userRole === "admin" || userRole === "resqnet",
    incidents: true,
    safeZones: true,
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [addType, setAddType] = useState<"location" | "alert" | "incident">("location")

  // Sample data
  const locations = [
    {
      id: "LOC-001",
      name: "Barangay Bucana Hall",
      type: "government",
      lat: 14.5995,
      lng: 120.9842,
      address: "123 Main Street, Barangay Bucana",
      description: "Main administrative building",
      status: "active",
    },
    {
      id: "LOC-002",
      name: "Bucana Health Center",
      type: "health",
      lat: 14.5985,
      lng: 120.9832,
      address: "456 Health Ave, Barangay Bucana",
      description: "Primary health care facility",
      status: "active",
    },
    {
      id: "LOC-003",
      name: "Bucana Elementary School",
      type: "education",
      lat: 14.6015,
      lng: 120.9822,
      address: "789 Education St, Barangay Bucana",
      description: "Public elementary school",
      status: "active",
    },
    {
      id: "LOC-004",
      name: "Community Center",
      type: "community",
      lat: 14.6005,
      lng: 120.9852,
      address: "321 Community Dr, Barangay Bucana",
      description: "Multi-purpose community hall",
      status: "active",
    },
  ]

  const alertZones = [
    {
      id: "ALERT-001",
      name: "East Zone Flood Area",
      type: "flood",
      severity: "high",
      lat: 14.5975,
      lng: 120.9862,
      radius: 150,
      description: "Flood-prone area in East Zone",
      status: "active",
      affectedHouseholds: 45,
    },
  ]

  const patrolUnits = [
    {
      id: "UNIT-001",
      callSign: "Alpha-1",
      unitType: "patrol",
      officers: ["Officer Martinez", "Officer Santos"],
      lat: 14.5995,
      lng: 120.9842,
      location: "Barangay Hall Area",
      status: "patrol",
      lastUpdate: new Date(),
    },
    {
      id: "UNIT-002",
      callSign: "Bravo-2",
      unitType: "emergency",
      officers: ["Officer Cruz", "Officer Reyes"],
      lat: 14.6005,
      lng: 120.9852,
      location: "East Zone Patrol",
      status: "available",
      lastUpdate: new Date(),
    },
  ]

  const incidents = [
    {
      id: "INC-001",
      type: "fire",
      severity: "high",
      lat: 14.5985,
      lng: 120.9845,
      location: "Residential Block A",
      description: "House fire reported",
      status: "responding",
      reportedAt: new Date(),
    },
  ]

  // Initialize Google Maps
  useEffect(() => {
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initializeMap()
        return
      }

      // Check if script is already being loaded
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        // Wait for it to load
        const checkGoogle = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogle)
            initializeMap()
          }
        }, 100)
        return
      }

      // Load Google Maps script
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCd_GSBUM9g752FvnMEZ3ffZkZmcaSRWIM&libraries=places&callback=initMap`
      script.async = true
      script.defer = true

      // Set up global callback
      window.initMap = initializeMap

      document.head.appendChild(script)
    }

    const initializeMap = () => {
      if (!mapRef.current || !window.google) return

      try {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 14.5995, lng: 120.9842 },
          zoom: 16,
          mapTypeId: mapType === "satellite" ? "satellite" : "roadmap",
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          zoomControl: true,
        })

        mapInstanceRef.current = map
        addMarkersToMap(map)
        setMapLoaded(true)
      } catch (error) {
        console.error("Error initializing map:", error)
      }
    }

    loadGoogleMaps()
  }, [])

  // Update map when layers or type change
  useEffect(() => {
    if (mapInstanceRef.current && mapLoaded) {
      // Change map type
      mapInstanceRef.current.setMapTypeId(mapType === "satellite" ? "satellite" : "roadmap")

      // Clear existing markers and re-add based on selected layers
      addMarkersToMap(mapInstanceRef.current)
    }
  }, [mapType, selectedLayers, mapLoaded])

  const addMarkersToMap = (map: google.maps.Map) => {
    // Add location markers
    if (selectedLayers.locations) {
      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map: map,
          title: location.name,
          icon: {
            url: `https://maps.google.com/mapfiles/ms/icons/${getLocationMarkerColor(location.type)}-dot.png`,
          },
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 300px; padding: 10px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #1f2937;">${location.name}</h3>
              <p style="margin: 4px 0; color: #6b7280;"><strong>Type:</strong> ${location.type}</p>
              <p style="margin: 4px 0; color: #6b7280;"><strong>Address:</strong> ${location.address}</p>
              <p style="margin: 4px 0; color: #374151;">${location.description}</p>
              <p style="margin: 4px 0;"><span style="background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px;">${location.status}</span></p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      })
    }

    // Add alert zones
    if (selectedLayers.alerts) {
      alertZones.forEach((zone) => {
        const circle = new window.google.maps.Circle({
          strokeColor: getAlertZoneColor(zone.severity),
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: getAlertZoneColor(zone.severity),
          fillOpacity: 0.2,
          map: map,
          center: { lat: zone.lat, lng: zone.lng },
          radius: zone.radius,
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 300px; padding: 10px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: ${getAlertZoneColor(zone.severity)};">${zone.name}</h3>
              <p style="margin: 4px 0;"><strong>Type:</strong> ${zone.type}</p>
              <p style="margin: 4px 0;"><strong>Severity:</strong> ${zone.severity}</p>
              <p style="margin: 4px 0;"><strong>Status:</strong> ${zone.status}</p>
              <p style="margin: 4px 0;">${zone.description}</p>
              <p style="margin: 4px 0;"><strong>Affected:</strong> ${zone.affectedHouseholds} households</p>
            </div>
          `,
        })

        circle.addListener("click", (event) => {
          infoWindow.setPosition(event.latLng)
          infoWindow.open(map)
        })
      })
    }

    // Add patrol units (for authorized roles)
    if (selectedLayers.units && (userRole === "net" || userRole === "admin" || userRole === "resqnet")) {
      patrolUnits.forEach((unit) => {
        const marker = new window.google.maps.Marker({
          position: { lat: unit.lat, lng: unit.lng },
          map: map,
          title: `${unit.callSign} - ${unit.officers.join(", ")}`,
          icon: {
            url: `https://maps.google.com/mapfiles/ms/icons/${getUnitMarkerColor(unit.status)}-dot.png`,
          },
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 300px; padding: 10px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold;">${unit.callSign}</h3>
              <p style="margin: 4px 0;"><strong>Type:</strong> ${unit.unitType}</p>
              <p style="margin: 4px 0;"><strong>Officers:</strong> ${unit.officers.join(", ")}</p>
              <p style="margin: 4px 0;"><strong>Status:</strong> ${unit.status}</p>
              <p style="margin: 4px 0;"><strong>Location:</strong> ${unit.location}</p>
              <p style="margin: 4px 0;"><strong>Last Update:</strong> ${unit.lastUpdate.toLocaleString()}</p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      })
    }

    // Add incidents
    if (selectedLayers.incidents) {
      incidents.forEach((incident) => {
        const marker = new window.google.maps.Marker({
          position: { lat: incident.lat, lng: incident.lng },
          map: map,
          title: `${incident.id} - ${incident.type}`,
          icon: {
            url: `https://maps.google.com/mapfiles/ms/icons/${getIncidentMarkerColor(incident.severity)}-dot.png`,
          },
        })

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="max-width: 300px; padding: 10px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: ${getAlertZoneColor(incident.severity)};">${incident.id}</h3>
              <p style="margin: 4px 0;"><strong>Type:</strong> ${incident.type}</p>
              <p style="margin: 4px 0;"><strong>Severity:</strong> ${incident.severity}</p>
              <p style="margin: 4px 0;"><strong>Status:</strong> ${incident.status}</p>
              <p style="margin: 4px 0;"><strong>Location:</strong> ${incident.location}</p>
              <p style="margin: 4px 0;">${incident.description}</p>
              <p style="margin: 4px 0;"><strong>Reported:</strong> ${incident.reportedAt.toLocaleString()}</p>
            </div>
          `,
        })

        marker.addListener("click", () => {
          infoWindow.open(map, marker)
        })
      })
    }
  }

  // Helper functions for marker colors
  const getLocationMarkerColor = (type: string) => {
    const colors = {
      government: "blue",
      health: "red",
      education: "yellow",
      emergency: "green",
      community: "purple",
      business: "orange",
      residential: "gray",
    }
    return colors[type as keyof typeof colors] || "gray"
  }

  const getAlertZoneColor = (severity: string) => {
    const colors = {
      low: "#3B82F6",
      medium: "#F59E0B",
      high: "#EF4444",
      critical: "#DC2626",
    }
    return colors[severity as keyof typeof colors] || "#6B7280"
  }

  const getUnitMarkerColor = (status: string) => {
    const colors = {
      available: "green",
      patrol: "blue",
      responding: "orange",
      busy: "red",
      offline: "gray",
    }
    return colors[status as keyof typeof colors] || "gray"
  }

  const getIncidentMarkerColor = (severity: string) => {
    const colors = {
      low: "blue",
      medium: "yellow",
      high: "orange",
      critical: "red",
    }
    return colors[severity as keyof typeof colors] || "gray"
  }

  const handleLayerToggle = (layer: string, checked: boolean) => {
    setSelectedLayers((prev) => ({ ...prev, [layer]: checked }))
  }

  const renderRoleSpecificActions = () => {
    switch (userRole) {
      case "resqnet":
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setAddType("alert")
                setIsAddDialogOpen(true)
              }}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Add Alert Zone
            </Button>
            <Button
              onClick={() => {
                setAddType("incident")
                setIsAddDialogOpen(true)
              }}
            >
              <Zap className="h-4 w-4 mr-2" />
              Report Emergency
            </Button>
          </div>
        )
      case "net":
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setAddType("incident")
                setIsAddDialogOpen(true)
              }}
            >
              <Radio className="h-4 w-4 mr-2" />
              Report Incident
            </Button>
            <Button variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Track Units
            </Button>
          </div>
        )
      case "admin":
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setAddType("location")
                setIsAddDialogOpen(true)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
            <Button
              onClick={() => {
                setAddType("alert")
                setIsAddDialogOpen(true)
              }}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Add Alert
            </Button>
          </div>
        )
      default:
        return null
    }
  }

  const renderLayerControls = () => {
    const availableLayers = [
      { id: "locations", name: "Facilities & Buildings", icon: Building },
      { id: "alerts", name: "Alert Zones", icon: AlertTriangle },
      { id: "incidents", name: "Active Incidents", icon: Zap },
      { id: "safeZones", name: "Safe Zones", icon: Shield },
    ]

    // Add units layer for authorized roles
    if (userRole === "net" || userRole === "admin" || userRole === "resqnet") {
      availableLayers.push({ id: "units", name: "Patrol Units", icon: Car })
    }

    return availableLayers.map((layer) => (
      <div key={layer.id} className="flex items-center space-x-2">
        <Checkbox
          id={`layer-${layer.id}`}
          checked={selectedLayers[layer.id as keyof typeof selectedLayers]}
          onCheckedChange={(checked) => handleLayerToggle(layer.id, checked as boolean)}
        />
        <Label htmlFor={`layer-${layer.id}`} className="flex items-center">
          <layer.icon className="mr-2 h-4 w-4" />
          {layer.name}
        </Label>
      </div>
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {userRole === "resqnet" && "Emergency Response Map"}
            {userRole === "net" && "Law Enforcement Map"}
            {userRole === "admin" && "Administrative Map"}
            {userRole === "resident" && "Community Map"}
            {userRole === "health" && "Health Services Map"}
          </h2>
          <p className="text-muted-foreground">Interactive Google Maps for Barangay Bucana</p>
        </div>
        <div className="flex items-center space-x-2">
          {renderRoleSpecificActions()}
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Controls */}
        <div className="space-y-4">
          {/* Layer Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Map Layers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">{renderLayerControls()}</CardContent>
          </Card>

          {/* Map Type */}
          <Card>
            <CardHeader>
              <CardTitle>Map View</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={mapType} onValueChange={setMapType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roadmap">
                    <div className="flex items-center">
                      <Navigation className="mr-2 h-4 w-4" />
                      Road Map
                    </div>
                  </SelectItem>
                  <SelectItem value="satellite">
                    <div className="flex items-center">
                      <Satellite className="mr-2 h-4 w-4" />
                      Satellite
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Locations:</span>
                <Badge variant="outline">{locations.length}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Alerts:</span>
                <Badge variant="destructive">{alertZones.filter((z) => z.status === "active").length}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span>Active Incidents:</span>
                <Badge variant="default">{incidents.filter((i) => i.status !== "resolved").length}</Badge>
              </div>
              {(userRole === "net" || userRole === "admin" || userRole === "resqnet") && (
                <div className="flex justify-between text-sm">
                  <span>Units Available:</span>
                  <Badge variant="secondary">{patrolUnits.filter((u) => u.status === "available").length}</Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Main Map Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Barangay Bucana - Interactive Map
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <Eye className="h-3 w-3 mr-1" />
                    {userRole.toUpperCase()} View
                  </Badge>
                  {mapLoaded && (
                    <Badge variant="default" className="bg-blue-50 text-blue-700">
                      Google Maps
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full p-0">
              <div ref={mapRef} className="h-full rounded-lg relative overflow-hidden" style={{ minHeight: "500px" }}>
                {!mapLoaded && (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
                    <div className="text-center space-y-4">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                      <div>
                        <h3 className="text-lg font-medium">Loading Google Maps</h3>
                        <p className="text-sm text-muted-foreground">Initializing interactive map...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Add New {addType === "location" ? "Location" : addType === "alert" ? "Alert Zone" : "Incident"}
            </DialogTitle>
            <DialogDescription>
              Click on the map to select a location, then fill in the details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              This feature will be fully implemented with form fields and map interaction.
            </p>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsAddDialogOpen(false)}>
              Add {addType === "location" ? "Location" : addType === "alert" ? "Alert" : "Incident"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
