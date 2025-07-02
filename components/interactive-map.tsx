"use client"

import { useState } from "react"
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
  Home,
  School,
  Hospital,
  Users,
} from "lucide-react"

interface InteractiveMapProps {
  userRole: "admin" | "resqnet" | "net" | "resident" | "health"
  userId: string
  userName: string
}

export function InteractiveMap({ userRole, userId, userName }: InteractiveMapProps) {
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
  const [selectedMarker, setSelectedMarker] = useState<any>(null)

  // Sample data
  const locations = [
    {
      id: "LOC-001",
      name: "Barangay Bucana Hall",
      type: "government",
      x: 45,
      y: 35,
      address: "123 Main Street, Barangay Bucana",
      description: "Main administrative building",
      status: "active",
      icon: Building,
      color: "bg-blue-500",
    },
    {
      id: "LOC-002",
      name: "Bucana Health Center",
      type: "health",
      x: 65,
      y: 55,
      address: "456 Health Ave, Barangay Bucana",
      description: "Primary health care facility",
      status: "active",
      icon: Hospital,
      color: "bg-red-500",
    },
    {
      id: "LOC-003",
      name: "Bucana Elementary School",
      type: "education",
      x: 25,
      y: 25,
      address: "789 Education St, Barangay Bucana",
      description: "Public elementary school",
      status: "active",
      icon: School,
      color: "bg-yellow-500",
    },
    {
      id: "LOC-004",
      name: "Community Center",
      type: "community",
      x: 75,
      y: 45,
      address: "321 Community Dr, Barangay Bucana",
      description: "Multi-purpose community hall",
      status: "active",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      id: "LOC-005",
      name: "Residential Area A",
      type: "residential",
      x: 35,
      y: 65,
      address: "Residential Block A",
      description: "Main residential area",
      status: "active",
      icon: Home,
      color: "bg-green-500",
    },
  ]

  const alertZones = [
    {
      id: "ALERT-001",
      name: "East Zone Flood Area",
      type: "flood",
      severity: "high",
      x: 80,
      y: 30,
      radius: 15,
      description: "Flood-prone area in East Zone",
      status: "active",
      affectedHouseholds: 45,
      color: "border-red-500 bg-red-100",
    },
  ]

  const patrolUnits = [
    {
      id: "UNIT-001",
      callSign: "Alpha-1",
      unitType: "patrol",
      officers: ["Officer Martinez", "Officer Santos"],
      x: 45,
      y: 35,
      location: "Barangay Hall Area",
      status: "patrol",
      lastUpdate: new Date(),
      color: "bg-blue-600",
    },
    {
      id: "UNIT-002",
      callSign: "Bravo-2",
      unitType: "emergency",
      officers: ["Officer Cruz", "Officer Reyes"],
      x: 75,
      y: 45,
      location: "East Zone Patrol",
      status: "available",
      lastUpdate: new Date(),
      color: "bg-green-600",
    },
  ]

  const incidents = [
    {
      id: "INC-001",
      type: "fire",
      severity: "high",
      x: 35,
      y: 65,
      location: "Residential Block A",
      description: "House fire reported",
      status: "responding",
      reportedAt: new Date(),
      color: "bg-orange-500",
    },
  ]

  const handleLayerToggle = (layer: string, checked: boolean) => {
    setSelectedLayers((prev) => ({ ...prev, [layer]: checked }))
  }

  const handleMarkerClick = (marker: any) => {
    setSelectedMarker(marker)
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
          <p className="text-muted-foreground">Interactive Map for Barangay Bucana</p>
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

          {/* Selected Marker Info */}
          {selectedMarker && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Selected Item
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <h4 className="font-medium">{selectedMarker.name || selectedMarker.callSign || selectedMarker.id}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedMarker.description || selectedMarker.location || "No description available"}
                </p>
                {selectedMarker.status && (
                  <Badge variant="outline" className="text-xs">
                    {selectedMarker.status}
                  </Badge>
                )}
              </CardContent>
            </Card>
          )}
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
                  <Badge variant="default" className="bg-blue-50 text-blue-700">
                    Interactive Map
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-full p-0">
              <div className="h-full rounded-lg relative overflow-hidden bg-gradient-to-br from-green-100 to-blue-100">
                {/* Map Background */}
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    mapType === "satellite"
                      ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900"
                      : "bg-gradient-to-br from-green-100 via-blue-50 to-green-200"
                  }`}
                >
                  {/* Grid overlay for road map */}
                  {mapType === "roadmap" && (
                    <div className="absolute inset-0 opacity-20">
                      <svg width="100%" height="100%" className="absolute inset-0">
                        <defs>
                          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="1" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                      </svg>
                    </div>
                  )}

                  {/* Roads/Streets */}
                  {mapType === "roadmap" && (
                    <>
                      <div className="absolute top-1/3 left-0 right-0 h-1 bg-gray-400 opacity-60"></div>
                      <div className="absolute top-2/3 left-0 right-0 h-1 bg-gray-400 opacity-60"></div>
                      <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400 opacity-60"></div>
                      <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400 opacity-60"></div>
                    </>
                  )}

                  {/* Location Markers */}
                  {selectedLayers.locations &&
                    locations.map((location) => {
                      const IconComponent = location.icon
                      return (
                        <div
                          key={location.id}
                          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
                            selectedMarker?.id === location.id ? "scale-125 z-20" : "z-10"
                          }`}
                          style={{ left: `${location.x}%`, top: `${location.y}%` }}
                          onClick={() => handleMarkerClick(location)}
                        >
                          <div
                            className={`w-8 h-8 rounded-full ${location.color} flex items-center justify-center shadow-lg border-2 border-white`}
                          >
                            <IconComponent className="h-4 w-4 text-white" />
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                            {location.name}
                          </div>
                        </div>
                      )
                    })}

                  {/* Alert Zones */}
                  {selectedLayers.alerts &&
                    alertZones.map((zone) => (
                      <div
                        key={zone.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full border-2 ${zone.color} opacity-60 cursor-pointer hover:opacity-80 transition-opacity`}
                        style={{
                          left: `${zone.x}%`,
                          top: `${zone.y}%`,
                          width: `${zone.radius}%`,
                          height: `${zone.radius}%`,
                        }}
                        onClick={() => handleMarkerClick(zone)}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        </div>
                      </div>
                    ))}

                  {/* Patrol Units */}
                  {selectedLayers.units &&
                    (userRole === "net" || userRole === "admin" || userRole === "resqnet") &&
                    patrolUnits.map((unit) => (
                      <div
                        key={unit.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 z-15 ${
                          selectedMarker?.id === unit.id ? "scale-125" : ""
                        }`}
                        style={{ left: `${unit.x}%`, top: `${unit.y}%` }}
                        onClick={() => handleMarkerClick(unit)}
                      >
                        <div className={`w-6 h-6 rounded ${unit.color} flex items-center justify-center shadow-lg`}>
                          <Car className="h-3 w-3 text-white" />
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                          {unit.callSign}
                        </div>
                      </div>
                    ))}

                  {/* Incidents */}
                  {selectedLayers.incidents &&
                    incidents.map((incident) => (
                      <div
                        key={incident.id}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 z-15 ${
                          selectedMarker?.id === incident.id ? "scale-125" : ""
                        }`}
                        style={{ left: `${incident.x}%`, top: `${incident.y}%` }}
                        onClick={() => handleMarkerClick(incident)}
                      >
                        <div
                          className={`w-8 h-8 rounded-full ${incident.color} flex items-center justify-center shadow-lg border-2 border-white animate-pulse`}
                        >
                          <Zap className="h-4 w-4 text-white" />
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                          {incident.type.toUpperCase()} - {incident.severity}
                        </div>
                      </div>
                    ))}

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white/90 backdrop-blur">
                      <Target className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Scale indicator */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-sm">
                    Scale: 1:5000
                  </div>

                  {/* Compass */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur rounded-full flex items-center justify-center">
                    <Navigation className="h-6 w-6 text-gray-700" />
                  </div>
                </div>
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
