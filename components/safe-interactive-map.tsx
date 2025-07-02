"use client"

import type React from "react"

import { useState, useCallback } from "react"
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
  ZoomIn,
  ZoomOut,
  Compass,
  Home,
  Heart,
  GraduationCap,
  Users,
  ShoppingCart,
} from "lucide-react"

interface SafeInteractiveMapProps {
  userRole: "admin" | "resqnet" | "net" | "resident" | "health"
  userId: string
  userName: string
}

export function SafeInteractiveMap({ userRole, userId, userName }: SafeInteractiveMapProps) {
  const [mapType, setMapType] = useState("roadmap")
  const [zoom, setZoom] = useState(16)
  const [center, setCenter] = useState({ x: 50, y: 50 })
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [selectedLayers, setSelectedLayers] = useState({
    locations: true,
    alerts: true,
    units: userRole === "net" || userRole === "admin" || userRole === "resqnet",
    incidents: true,
    safeZones: true,
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [addType, setAddType] = useState<"location" | "alert" | "incident">("location")
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Sample data for Barangay Bucana
  const locations = [
    {
      id: "LOC-001",
      name: "Barangay Bucana Hall",
      type: "government",
      x: 45,
      y: 40,
      address: "123 Main Street, Barangay Bucana",
      description: "Main administrative building",
      status: "active",
      icon: Home,
      color: "bg-blue-500",
    },
    {
      id: "LOC-002",
      name: "Bucana Health Center",
      type: "health",
      x: 35,
      y: 55,
      address: "456 Health Ave, Barangay Bucana",
      description: "Primary health care facility",
      status: "active",
      icon: Heart,
      color: "bg-red-500",
    },
    {
      id: "LOC-003",
      name: "Bucana Elementary School",
      type: "education",
      x: 65,
      y: 30,
      address: "789 Education St, Barangay Bucana",
      description: "Public elementary school",
      status: "active",
      icon: GraduationCap,
      color: "bg-yellow-500",
    },
    {
      id: "LOC-004",
      name: "Community Center",
      type: "community",
      x: 55,
      y: 70,
      address: "321 Community Dr, Barangay Bucana",
      description: "Multi-purpose community hall",
      status: "active",
      icon: Users,
      color: "bg-purple-500",
    },
    {
      id: "LOC-005",
      name: "Bucana Market",
      type: "business",
      x: 25,
      y: 60,
      address: "555 Market St, Barangay Bucana",
      description: "Local public market",
      status: "active",
      icon: ShoppingCart,
      color: "bg-orange-500",
    },
  ]

  const alertZones = [
    {
      id: "ALERT-001",
      name: "East Zone Flood Area",
      type: "flood",
      severity: "high",
      x: 75,
      y: 45,
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
      y: 40,
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
      x: 55,
      y: 70,
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
      x: 40,
      y: 65,
      location: "Residential Block A",
      description: "House fire reported",
      status: "responding",
      reportedAt: new Date(),
      color: "bg-red-600",
    },
  ]

  // Handle map dragging
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      setDragStart({ x: e.clientX - center.x, y: e.clientY - center.y })
    },
    [center],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return

      const newX = Math.max(0, Math.min(100, e.clientX - dragStart.x))
      const newY = Math.max(0, Math.min(100, e.clientY - dragStart.y))
      setCenter({ x: newX, y: newY })
    },
    [isDragging, dragStart],
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  // Zoom functions
  const zoomIn = () => setZoom((prev) => Math.min(20, prev + 1))
  const zoomOut = () => setZoom((prev) => Math.max(10, prev - 1))

  // Handle layer toggle
  const handleLayerToggle = (layer: string, checked: boolean) => {
    setSelectedLayers((prev) => ({ ...prev, [layer]: checked }))
  }

  // Handle item click
  const handleItemClick = (item: any) => {
    setSelectedItem(item)
  }

  // Render role-specific actions
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
              size="sm"
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Add Alert Zone
            </Button>
            <Button
              onClick={() => {
                setAddType("incident")
                setIsAddDialogOpen(true)
              }}
              size="sm"
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
              size="sm"
            >
              <Radio className="h-4 w-4 mr-2" />
              Report Incident
            </Button>
            <Button variant="outline" size="sm">
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
              size="sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
            <Button
              onClick={() => {
                setAddType("alert")
                setIsAddDialogOpen(true)
              }}
              size="sm"
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

  // Render layer controls
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
        <Label htmlFor={`layer-${layer.id}`} className="flex items-center text-sm">
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
                  <SelectItem value="hybrid">
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      Hybrid
                    </div>
                  </SelectItem>
                  <SelectItem value="terrain">
                    <div className="flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Terrain
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

          {/* Selected Item Details */}
          {selectedItem && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Item</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <h4 className="font-semibold">{selectedItem.name || selectedItem.id}</h4>
                <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                {selectedItem.address && (
                  <p className="text-sm">
                    <strong>Address:</strong> {selectedItem.address}
                  </p>
                )}
                {selectedItem.status && (
                  <Badge variant={selectedItem.status === "active" ? "default" : "secondary"}>
                    {selectedItem.status}
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
            <CardContent className="h-full p-0 relative">
              {/* Map Container */}
              <div
                className={`h-full rounded-lg relative overflow-hidden cursor-${isDragging ? "grabbing" : "grab"}`}
                style={{
                  minHeight: "500px",
                  background:
                    mapType === "satellite"
                      ? "linear-gradient(45deg, #2d5016 0%, #3d6b1f 25%, #4a7c23 50%, #2d5016 75%, #1a3d0a 100%)"
                      : mapType === "terrain"
                        ? "linear-gradient(45deg, #8b7355 0%, #a0845c 25%, #b8956b 50%, #8b7355 75%, #6b5940 100%)"
                        : "linear-gradient(45deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #7dd3fc 75%, #38bdf8 100%)",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                {/* Grid overlay for road map */}
                {mapType === "roadmap" && (
                  <div className="absolute inset-0 opacity-20">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="1" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                  </div>
                )}

                {/* Street lines for road map */}
                {mapType === "roadmap" && (
                  <div className="absolute inset-0">
                    <div
                      className="absolute bg-gray-400 opacity-60"
                      style={{
                        left: "20%",
                        top: "0%",
                        width: "3px",
                        height: "100%",
                      }}
                    ></div>
                    <div
                      className="absolute bg-gray-400 opacity-60"
                      style={{
                        left: "50%",
                        top: "0%",
                        width: "3px",
                        height: "100%",
                      }}
                    ></div>
                    <div
                      className="absolute bg-gray-400 opacity-60"
                      style={{
                        left: "80%",
                        top: "0%",
                        width: "3px",
                        height: "100%",
                      }}
                    ></div>
                    <div
                      className="absolute bg-gray-400 opacity-60"
                      style={{
                        left: "0%",
                        top: "30%",
                        width: "100%",
                        height: "3px",
                      }}
                    ></div>
                    <div
                      className="absolute bg-gray-400 opacity-60"
                      style={{
                        left: "0%",
                        top: "60%",
                        width: "100%",
                        height: "3px",
                      }}
                    ></div>
                  </div>
                )}

                {/* Alert Zones */}
                {selectedLayers.alerts &&
                  alertZones.map((zone) => (
                    <div
                      key={zone.id}
                      className={`absolute border-2 rounded-full ${zone.color} opacity-60 cursor-pointer hover:opacity-80 transition-opacity`}
                      style={{
                        left: `${zone.x - zone.radius}%`,
                        top: `${zone.y - zone.radius}%`,
                        width: `${zone.radius * 2}%`,
                        height: `${zone.radius * 2}%`,
                        transform: `scale(${zoom / 16})`,
                      }}
                      onClick={() => handleItemClick(zone)}
                      title={`${zone.name} - ${zone.severity} severity`}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <AlertTriangle className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  ))}

                {/* Location Markers */}
                {selectedLayers.locations &&
                  locations.map((location) => {
                    const IconComponent = location.icon
                    return (
                      <div
                        key={location.id}
                        className={`absolute w-8 h-8 ${location.color} rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-white`}
                        style={{
                          left: `${location.x}%`,
                          top: `${location.y}%`,
                          transform: `translate(-50%, -50%) scale(${zoom / 16})`,
                        }}
                        onClick={() => handleItemClick(location)}
                        title={`${location.name} - ${location.type}`}
                      >
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                    )
                  })}

                {/* Patrol Units */}
                {selectedLayers.units &&
                  (userRole === "net" || userRole === "admin" || userRole === "resqnet") &&
                  patrolUnits.map((unit) => (
                    <div
                      key={unit.id}
                      className={`absolute w-6 h-6 ${unit.color} rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-white`}
                      style={{
                        left: `${unit.x}%`,
                        top: `${unit.y}%`,
                        transform: `translate(-50%, -50%) scale(${zoom / 16})`,
                      }}
                      onClick={() => handleItemClick(unit)}
                      title={`${unit.callSign} - ${unit.status}`}
                    >
                      <Car className="h-3 w-3 text-white" />
                    </div>
                  ))}

                {/* Incidents */}
                {selectedLayers.incidents &&
                  incidents.map((incident) => (
                    <div
                      key={incident.id}
                      className={`absolute w-8 h-8 ${incident.color} rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-lg border-2 border-white animate-pulse`}
                      style={{
                        left: `${incident.x}%`,
                        top: `${incident.y}%`,
                        transform: `translate(-50%, -50%) scale(${zoom / 16})`,
                      }}
                      onClick={() => handleItemClick(incident)}
                      title={`${incident.id} - ${incident.type} (${incident.severity})`}
                    >
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                  ))}

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button size="sm" variant="outline" onClick={zoomIn} className="bg-white">
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={zoomOut} className="bg-white">
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white">
                    <Compass className="h-4 w-4" />
                  </Button>
                </div>

                {/* Scale indicator */}
                <div className="absolute bottom-4 left-4 bg-white px-2 py-1 rounded text-xs font-mono">
                  Scale: 1:{5000 - (zoom - 10) * 200}
                </div>

                {/* Zoom level indicator */}
                <div className="absolute bottom-4 right-4 bg-white px-2 py-1 rounded text-xs">Zoom: {zoom}</div>
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
