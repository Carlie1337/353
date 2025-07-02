"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Navigation,
  Users,
  AlertTriangle,
  Camera,
  Radio,
  Car,
  Activity,
  Search,
  Filter,
  Maximize,
} from "lucide-react"
import { UnifiedMap } from "@/components/unified-map"

export default function TanodMapPage() {
  const [selectedLayer, setSelectedLayer] = useState("all")
  const [searchLocation, setSearchLocation] = useState("")

  const patrolUnits = [
    {
      id: "UNIT-ALPHA",
      name: "Alpha Unit",
      officers: ["Tanod Garcia", "Tanod Santos"],
      status: "On Patrol",
      location: { lat: 14.5995, lng: 120.9842 },
      area: "Purok 1-2",
      lastUpdate: "2 minutes ago",
      speed: "15 km/h",
      direction: "North",
    },
    {
      id: "UNIT-BRAVO",
      name: "Bravo Unit",
      officers: ["Tanod Cruz", "Tanod Reyes"],
      status: "Responding",
      location: { lat: 14.6005, lng: 120.9852 },
      area: "Purok 3-4",
      lastUpdate: "1 minute ago",
      speed: "25 km/h",
      direction: "East",
    },
    {
      id: "UNIT-CHARLIE",
      name: "Charlie Unit",
      officers: ["Tanod Lopez", "Tanod Mendoza"],
      status: "Available",
      location: { lat: 14.5985, lng: 120.9832 },
      area: "Highway Patrol",
      lastUpdate: "30 seconds ago",
      speed: "0 km/h",
      direction: "Stationary",
    },
  ]

  const incidents = [
    {
      id: "INC-001",
      type: "Traffic Accident",
      location: { lat: 14.601, lng: 120.986 },
      address: "Main Road Junction",
      priority: "High",
      status: "Active",
      reportedBy: "Citizen",
      timeReported: "10 minutes ago",
      assignedUnit: "UNIT-BRAVO",
    },
    {
      id: "INC-002",
      type: "Noise Complaint",
      location: { lat: 14.599, lng: 120.9845 },
      address: "Purok 2, Block 1",
      priority: "Low",
      status: "Investigating",
      reportedBy: "Resident",
      timeReported: "25 minutes ago",
      assignedUnit: "UNIT-ALPHA",
    },
  ]

  const cctvCameras = [
    {
      id: "CAM-001",
      name: "Main Entrance",
      location: { lat: 14.5995, lng: 120.984 },
      status: "Online",
      type: "Fixed",
    },
    {
      id: "CAM-002",
      name: "Market Area",
      location: { lat: 14.6, lng: 120.985 },
      status: "Online",
      type: "PTZ",
    },
    {
      id: "CAM-003",
      name: "School Zone",
      location: { lat: 14.6005, lng: 120.9845 },
      status: "Offline",
      type: "Fixed",
    },
  ]

  const checkpoints = [
    {
      id: "CP-001",
      name: "Checkpoint Alpha",
      location: { lat: 14.5988, lng: 120.9838 },
      status: "Active",
      lastVisit: "1 hour ago",
    },
    {
      id: "CP-002",
      name: "Checkpoint Bravo",
      location: { lat: 14.6008, lng: 120.9855 },
      status: "Pending",
      lastVisit: "3 hours ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Patrol":
        return "default"
      case "Responding":
        return "destructive"
      case "Available":
        return "secondary"
      case "Active":
        return "destructive"
      case "Online":
        return "default"
      case "Offline":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  // Combine all map markers based on selected layer
  const getMapMarkers = () => {
    let markers: any[] = []

    if (selectedLayer === "all" || selectedLayer === "units") {
      markers = [
        ...markers,
        ...patrolUnits.map((unit) => ({
          id: unit.id,
          position: unit.location,
          type: "patrol",
          title: unit.name,
          description: `${unit.officers.join(", ")} - ${unit.status}`,
          status: unit.status,
        })),
      ]
    }

    if (selectedLayer === "all" || selectedLayer === "incidents") {
      markers = [
        ...markers,
        ...incidents.map((incident) => ({
          id: incident.id,
          position: incident.location,
          type: "incident",
          title: incident.type,
          description: `${incident.address} - ${incident.priority} Priority`,
          status: incident.status,
        })),
      ]
    }

    if (selectedLayer === "all" || selectedLayer === "cameras") {
      markers = [
        ...markers,
        ...cctvCameras.map((camera) => ({
          id: camera.id,
          position: camera.location,
          type: "camera",
          title: camera.name,
          description: `${camera.type} Camera - ${camera.status}`,
          status: camera.status,
        })),
      ]
    }

    if (selectedLayer === "all" || selectedLayer === "checkpoints") {
      markers = [
        ...markers,
        ...checkpoints.map((checkpoint) => ({
          id: checkpoint.id,
          position: checkpoint.location,
          type: "checkpoint",
          title: checkpoint.name,
          description: `Last visit: ${checkpoint.lastVisit}`,
          status: checkpoint.status,
        })),
      ]
    }

    return markers
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tactical Map</h1>
          <p className="text-muted-foreground">Real-time monitoring and coordination map</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Maximize className="h-4 w-4 mr-2" />
            Fullscreen
          </Button>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Navigation className="h-4 w-4 mr-2" />
            Center Map
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Units</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">3</p>
              </div>
              <Car className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Incidents</p>
                <p className="text-xl md:text-2xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangle className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">CCTV Online</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">2/3</p>
              </div>
              <Camera className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Coverage</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">94%</p>
              </div>
              <MapPin className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Map Display */}
        <div className="lg:col-span-3 space-y-4">
          {/* Map Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search location..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedLayer} onValueChange={setSelectedLayer}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Layers</SelectItem>
                      <SelectItem value="units">Patrol Units</SelectItem>
                      <SelectItem value="incidents">Incidents</SelectItem>
                      <SelectItem value="cameras">CCTV Cameras</SelectItem>
                      <SelectItem value="checkpoints">Checkpoints</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Map */}
          <Card>
            <CardContent className="p-0">
              <div className="relative h-[600px] w-full">
                <UnifiedMap
                  center={{ lat: 14.5995, lng: 120.9842 }}
                  zoom={16}
                  markers={getMapMarkers()}
                  className="w-full h-full rounded-lg"
                />

                {/* Map Legend */}
                <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3 space-y-2">
                  <h4 className="font-medium text-sm">Legend</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>Patrol Units</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Incidents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>CCTV Cameras</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                      <span>Checkpoints</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Tabs defaultValue="units" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="units">Units</TabsTrigger>
              <TabsTrigger value="incidents">Incidents</TabsTrigger>
            </TabsList>

            <TabsContent value="units">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    Patrol Units
                  </CardTitle>
                  <CardDescription>Active patrol unit status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {patrolUnits.map((unit) => (
                      <div key={unit.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{unit.name}</h4>
                          <Badge variant={getStatusColor(unit.status)} className="text-xs">
                            {unit.status}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{unit.officers.join(", ")}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{unit.area}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            <span>
                              {unit.speed} • {unit.direction}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Radio className="h-3 w-3" />
                            <span>Last update: {unit.lastUpdate}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-2">
                          <Button size="sm" variant="outline" className="text-xs h-6 bg-transparent">
                            Track
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs h-6 bg-transparent">
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="incidents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Active Incidents
                  </CardTitle>
                  <CardDescription>Current incidents requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {incidents.map((incident) => (
                      <div key={incident.id} className="border rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-sm">{incident.type}</h4>
                          <Badge variant={getPriorityColor(incident.priority)} className="text-xs">
                            {incident.priority}
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{incident.address}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>Reported by: {incident.reportedBy}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Car className="h-3 w-3" />
                            <span>Assigned: {incident.assignedUnit}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            <span>{incident.timeReported}</span>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-2">
                          <Button size="sm" variant="outline" className="text-xs h-6 bg-transparent">
                            View
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs h-6 bg-transparent">
                            Dispatch
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CCTV Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                CCTV Status
              </CardTitle>
              <CardDescription>Camera network status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {cctvCameras.map((camera) => (
                  <div key={camera.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <p className="font-medium text-sm">{camera.name}</p>
                      <p className="text-xs text-muted-foreground">{camera.type}</p>
                    </div>
                    <Badge variant={getStatusColor(camera.status)} className="text-xs">
                      {camera.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common map operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Car className="h-4 w-4 mr-2" />
                Dispatch Unit
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Camera className="h-4 w-4 mr-2" />
                View CCTV
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Radio className="h-4 w-4 mr-2" />
                Radio Contact
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
