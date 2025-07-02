"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Eye,
  RefreshCw,
  Plus,
  Building,
  Hospital,
  School,
  Shield,
  Home,
  AlertTriangle,
  Navigation,
  Layers,
} from "lucide-react"

interface MockMapProps {
  userRole: string
  userId: string
  userName: string
}

interface MapLocation {
  id: string
  name: string
  type: string
  x: number
  y: number
  description: string
  status: string
}

export function MockMap({ userRole, userId, userName }: MockMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [mapView, setMapView] = useState("roadmap")

  // Mock locations positioned on the map
  const locations: MapLocation[] = [
    {
      id: "LOC-001",
      name: "Barangay Hall",
      type: "government",
      x: 45,
      y: 55,
      description: "Main administrative building",
      status: "active",
    },
    {
      id: "LOC-002",
      name: "Health Center",
      type: "health",
      x: 65,
      y: 35,
      description: "Primary health care facility",
      status: "active",
    },
    {
      id: "LOC-003",
      name: "Elementary School",
      type: "education",
      x: 25,
      y: 75,
      description: "Public elementary school",
      status: "active",
    },
    {
      id: "LOC-004",
      name: "Evacuation Center",
      type: "emergency",
      x: 75,
      y: 65,
      description: "Emergency evacuation facility",
      status: "active",
    },
    {
      id: "LOC-005",
      name: "Community Center",
      type: "community",
      x: 35,
      y: 25,
      description: "Multi-purpose community hall",
      status: "active",
    },
  ]

  const getLocationIcon = (type: string) => {
    const icons = {
      government: Building,
      health: Hospital,
      education: School,
      emergency: Shield,
      community: Home,
    }
    return icons[type as keyof typeof icons] || MapPin
  }

  const getLocationColor = (type: string) => {
    const colors = {
      government: "bg-blue-500 border-blue-600",
      health: "bg-red-500 border-red-600",
      education: "bg-yellow-500 border-yellow-600",
      emergency: "bg-green-500 border-green-600",
      community: "bg-purple-500 border-purple-600",
    }
    return colors[type as keyof typeof colors] || "bg-gray-500 border-gray-600"
  }

  const getRoleCapabilities = () => {
    switch (userRole) {
      case "admin":
        return {
          canAdd: true,
          canEdit: true,
          canDelete: true,
          canViewAll: true,
          title: "Administrative Map Control",
        }
      case "resqnet":
        return {
          canAdd: true,
          canEdit: true,
          canDelete: false,
          canViewAll: true,
          title: "Emergency Response Map",
        }
      case "net":
        return {
          canAdd: true,
          canEdit: false,
          canDelete: false,
          canViewAll: true,
          title: "Law Enforcement Map",
        }
      default:
        return {
          canAdd: false,
          canEdit: false,
          canDelete: false,
          canViewAll: false,
          title: "Community Map View",
        }
    }
  }

  const capabilities = getRoleCapabilities()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{capabilities.title}</h2>
          <p className="text-muted-foreground">Barangay Bucana Geographic Information System</p>
        </div>
        <div className="flex items-center space-x-2">
          {capabilities.canAdd && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          )}
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <div className="grid gap-4 lg:grid-cols-4">
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      Barangay Bucana Map
                    </CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-700">
                      <Eye className="h-3 w-3 mr-1" />
                      {userRole.toUpperCase()} View
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative h-[500px] bg-gradient-to-br from-green-100 via-blue-50 to-green-200 rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                    {/* Mock map background with grid */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
                        {Array.from({ length: 100 }).map((_, i) => (
                          <div key={i} className="border border-gray-400"></div>
                        ))}
                      </div>
                    </div>

                    {/* Mock roads */}
                    <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-400 transform -translate-y-1/2"></div>
                    <div className="absolute top-0 bottom-0 left-1/3 w-2 bg-gray-400"></div>
                    <div className="absolute top-0 bottom-0 right-1/4 w-2 bg-gray-400"></div>

                    {/* Location markers */}
                    {locations.map((location) => {
                      const Icon = getLocationIcon(location.type)
                      return (
                        <div
                          key={location.id}
                          className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
                            selectedLocation?.id === location.id ? "scale-125 z-10" : ""
                          }`}
                          style={{
                            left: `${location.x}%`,
                            top: `${location.y}%`,
                          }}
                          onClick={() => setSelectedLocation(location)}
                        >
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-white shadow-lg ${getLocationColor(location.type)}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          {selectedLocation?.id === location.id && (
                            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-lg border min-w-48 z-20">
                              <h3 className="font-semibold text-sm">{location.name}</h3>
                              <p className="text-xs text-gray-600 capitalize">{location.type}</p>
                              <p className="text-xs text-gray-500 mt-1">{location.description}</p>
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {location.status}
                                </Badge>
                                {capabilities.canEdit && (
                                  <Button size="sm" variant="outline" className="h-6 text-xs">
                                    Edit
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}

                    {/* Map controls */}
                    <div className="absolute top-4 right-4 space-y-2">
                      <Button
                        variant={mapView === "roadmap" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMapView("roadmap")}
                      >
                        Road
                      </Button>
                      <Button
                        variant={mapView === "satellite" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setMapView("satellite")}
                      >
                        Satellite
                      </Button>
                    </div>

                    {/* Zoom controls */}
                    <div className="absolute bottom-4 right-4 flex flex-col space-y-1">
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                        +
                      </Button>
                      <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                        -
                      </Button>
                    </div>

                    {/* Compass */}
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center shadow-lg">
                        <Navigation className="h-6 w-6 text-gray-600" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Layers className="mr-2 h-5 w-5" />
                    Map Layers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Facilities</span>
                    <Badge variant="secondary">5</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emergency Zones</span>
                    <Badge variant="destructive">2</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Safe Areas</span>
                    <Badge variant="default">3</Badge>
                  </div>
                  {userRole === "net" && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Units</span>
                      <Badge variant="outline">4</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Legend</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["government", "health", "education", "emergency", "community"].map((type) => {
                    const Icon = getLocationIcon(type)
                    return (
                      <div key={type} className="flex items-center space-x-2">
                        <div
                          className={`w-4 h-4 rounded-full ${getLocationColor(type).split(" ")[0]} flex items-center justify-center`}
                        >
                          <Icon className="h-2 w-2 text-white" />
                        </div>
                        <span className="text-sm capitalize">{type}</span>
                      </div>
                    )
                  })}
                  {userRole !== "resident" && (
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Risk Zone</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total Locations:</span>
                    <span className="font-medium">{locations.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Coverage Area:</span>
                    <span className="font-medium">2.5 km²</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Population:</span>
                    <span className="font-medium">5,432</span>
                  </div>
                  {userRole === "net" && (
                    <div className="flex justify-between text-sm">
                      <span>Active Patrols:</span>
                      <span className="font-medium text-green-600">4</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Location Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {locations.map((location) => {
                  const Icon = getLocationIcon(location.type)
                  return (
                    <div key={location.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${getLocationColor(location.type).split(" ")[0]} text-white`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">{location.name}</h3>
                          <p className="text-sm text-muted-foreground capitalize">{location.type}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{location.status}</Badge>
                        {capabilities.canEdit && (
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Area</CardTitle>
                <Navigation className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5 km²</div>
                <p className="text-xs text-muted-foreground">Barangay coverage</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Facilities</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{locations.length}</div>
                <p className="text-xs text-muted-foreground">Mapped locations</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Population</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,432</div>
                <p className="text-xs text-muted-foreground">Total residents</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Density</CardTitle>
                <Layers className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,173</div>
                <p className="text-xs text-muted-foreground">per km²</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
