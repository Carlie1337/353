"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Clock,
  Users,
  Route,
  Play,
  Square,
  Navigation,
  AlertTriangle,
  CheckCircle,
  Timer,
  Activity,
  Shield,
  Radio,
  Camera,
  FileText,
  Send,
} from "lucide-react"

interface PatrolUnit {
  id: string
  name: string
  callSign: string
  officers: string[]
  status: "active" | "inactive" | "on-patrol" | "responding" | "break"
  currentLocation: string
  lastUpdate: string
  route: string
  startTime: string
  endTime?: string
  totalDistance: number
  checkpoints: number
  progress: number
}

interface PatrolRoute {
  id: string
  name: string
  description: string
  checkpoints: string[]
  estimatedTime: string
  priority: "low" | "medium" | "high"
  status: "active" | "inactive"
  distance: number
}

interface PatrolLog {
  id: string
  unitId: string
  timestamp: string
  location: string
  activity: string
  notes: string
  type: "checkpoint" | "incident" | "observation" | "break"
  priority: "low" | "medium" | "high"
}

export default function PatrolPage() {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null)
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("units")
  const [newLogEntry, setNewLogEntry] = useState({
    location: "",
    activity: "",
    notes: "",
    type: "checkpoint" as const,
    priority: "low" as const,
  })

  const patrolUnits: PatrolUnit[] = [
    {
      id: "UNIT001",
      name: "Alpha Team",
      callSign: "Alpha-1",
      officers: ["Officer Santos", "Officer Cruz"],
      status: "on-patrol",
      currentLocation: "Market Area",
      lastUpdate: "2 minutes ago",
      route: "Route A - Commercial District",
      startTime: "08:00 AM",
      totalDistance: 5.2,
      checkpoints: 8,
      progress: 65,
    },
    {
      id: "UNIT002",
      name: "Bravo Team",
      callSign: "Bravo-2",
      officers: ["Officer Reyes", "Officer Garcia"],
      status: "responding",
      currentLocation: "School Zone",
      lastUpdate: "1 minute ago",
      route: "Route B - Residential Area",
      startTime: "08:30 AM",
      totalDistance: 3.8,
      checkpoints: 6,
      progress: 45,
    },
    {
      id: "UNIT003",
      name: "Charlie Team",
      callSign: "Charlie-3",
      officers: ["Officer Lopez", "Officer Mendoza"],
      status: "break",
      currentLocation: "Barangay Hall",
      lastUpdate: "5 minutes ago",
      route: "Route C - Industrial Zone",
      startTime: "09:00 AM",
      totalDistance: 2.1,
      checkpoints: 4,
      progress: 30,
    },
    {
      id: "UNIT004",
      name: "Delta Team",
      callSign: "Delta-4",
      officers: ["Officer Dela Cruz"],
      status: "inactive",
      currentLocation: "Base Station",
      lastUpdate: "30 minutes ago",
      route: "Standby",
      startTime: "N/A",
      totalDistance: 0,
      checkpoints: 0,
      progress: 0,
    },
  ]

  const patrolRoutes: PatrolRoute[] = [
    {
      id: "ROUTE001",
      name: "Route A - Commercial District",
      description: "Covers market area, shops, and business establishments",
      checkpoints: ["Market Entrance", "Main Plaza", "Shopping Center", "Bank Area", "Restaurant Strip"],
      estimatedTime: "2 hours",
      priority: "high",
      status: "active",
      distance: 5.2,
    },
    {
      id: "ROUTE002",
      name: "Route B - Residential Area",
      description: "Patrol through residential neighborhoods and subdivisions",
      checkpoints: ["Subdivision A", "Elementary School", "Community Center", "Playground", "Senior Center"],
      estimatedTime: "1.5 hours",
      priority: "medium",
      status: "active",
      distance: 3.8,
    },
    {
      id: "ROUTE003",
      name: "Route C - Industrial Zone",
      description: "Industrial area and warehouse district patrol",
      checkpoints: ["Factory Gate", "Warehouse District", "Loading Bay", "Security Office"],
      estimatedTime: "1 hour",
      priority: "medium",
      status: "active",
      distance: 2.1,
    },
    {
      id: "ROUTE004",
      name: "Route D - Perimeter Check",
      description: "Barangay boundary and perimeter security check",
      checkpoints: ["North Gate", "East Boundary", "South Gate", "West Boundary", "Main Entrance"],
      estimatedTime: "3 hours",
      priority: "low",
      status: "inactive",
      distance: 8.5,
    },
  ]

  const patrolLogs: PatrolLog[] = [
    {
      id: "LOG001",
      unitId: "UNIT001",
      timestamp: "10:30 AM",
      location: "Market Area",
      activity: "Checkpoint reached",
      notes: "All clear, normal activity observed",
      type: "checkpoint",
      priority: "low",
    },
    {
      id: "LOG002",
      unitId: "UNIT002",
      timestamp: "10:25 AM",
      location: "School Zone",
      activity: "Traffic assistance",
      notes: "Helped with school dismissal traffic flow",
      type: "observation",
      priority: "medium",
    },
    {
      id: "LOG003",
      unitId: "UNIT001",
      timestamp: "10:15 AM",
      location: "Main Plaza",
      activity: "Suspicious activity reported",
      notes: "Investigated report, false alarm - street performer",
      type: "incident",
      priority: "medium",
    },
    {
      id: "LOG004",
      unitId: "UNIT003",
      timestamp: "10:00 AM",
      location: "Barangay Hall",
      activity: "Break time",
      notes: "15-minute break, equipment check completed",
      type: "break",
      priority: "low",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-patrol":
        return "default"
      case "responding":
        return "destructive"
      case "active":
        return "default"
      case "break":
        return "secondary"
      case "inactive":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-patrol":
        return <Route className="h-4 w-4" />
      case "responding":
        return <AlertTriangle className="h-4 w-4" />
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "break":
        return <Timer className="h-4 w-4" />
      case "inactive":
        return <Square className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "checkpoint":
        return <MapPin className="h-4 w-4" />
      case "incident":
        return <AlertTriangle className="h-4 w-4" />
      case "observation":
        return <Camera className="h-4 w-4" />
      case "break":
        return <Timer className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUnit || !newLogEntry.location || !newLogEntry.activity) return

    console.log("New log entry:", {
      unitId: selectedUnit,
      timestamp: currentTime.toLocaleTimeString(),
      ...newLogEntry,
    })

    setNewLogEntry({
      location: "",
      activity: "",
      notes: "",
      type: "checkpoint",
      priority: "low",
    })
  }

  const selectedUnitData = patrolUnits.find((unit) => unit.id === selectedUnit)
  const selectedRouteData = patrolRoutes.find((route) => route.id === selectedRoute)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8 pt-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Patrol Management</h1>
          <p className="text-gray-600 mt-1">Monitor and coordinate patrol units and routes</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 justify-center">
            <Clock className="h-3 w-3 mr-1" />
            {currentTime.toLocaleTimeString()}
          </Badge>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Radio className="h-4 w-4 mr-2" />
            Radio Check
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Units</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">3</p>
              </div>
              <Shield className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">On Patrol</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">2</p>
              </div>
              <Route className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Checkpoints</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">18</p>
              </div>
              <MapPin className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Distance</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">11.1km</p>
              </div>
              <Navigation className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="units">Patrol Units</TabsTrigger>
              <TabsTrigger value="routes">Routes</TabsTrigger>
              <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="units" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Patrol Units Status
                  </CardTitle>
                  <CardDescription>Current status and location of all patrol units</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patrolUnits.map((unit) => (
                      <div
                        key={unit.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedUnit === unit.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedUnit(unit.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{unit.name}</h3>
                              <Badge variant={getStatusColor(unit.status)} className="text-xs">
                                {getStatusIcon(unit.status)}
                                {unit.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{unit.callSign}</p>
                            <p className="text-sm text-gray-600">Officers: {unit.officers.join(", ")}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{unit.lastUpdate}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <p className="text-gray-600">Location</p>
                            <p className="font-medium">{unit.currentLocation}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Route</p>
                            <p className="font-medium">{unit.route}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Start Time</p>
                            <p className="font-medium">{unit.startTime}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Distance</p>
                            <p className="font-medium">{unit.totalDistance}km</p>
                          </div>
                        </div>

                        {unit.progress > 0 && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Route Progress</span>
                              <span>{unit.progress}%</span>
                            </div>
                            <Progress value={unit.progress} className="h-2" />
                          </div>
                        )}

                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <MapPin className="h-3 w-3 mr-1" />
                            Track
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <Radio className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <FileText className="h-3 w-3 mr-1" />
                            Report
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="routes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Route className="h-5 w-5" />
                    Patrol Routes
                  </CardTitle>
                  <CardDescription>Available patrol routes and their configurations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {patrolRoutes.map((route) => (
                      <div
                        key={route.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedRoute === route.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                        }`}
                        onClick={() => setSelectedRoute(route.id)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium">{route.name}</h3>
                              <Badge variant={getStatusColor(route.status)} className="text-xs">
                                {route.status}
                              </Badge>
                              <Badge
                                variant={route.priority === "high" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {route.priority} priority
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{route.description}</p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            <p>{route.estimatedTime}</p>
                            <p>{route.distance}km</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Checkpoints:</p>
                          <div className="flex flex-wrap gap-1">
                            {route.checkpoints.map((checkpoint, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {checkpoint}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <Play className="h-3 w-3 mr-1" />
                            Assign Unit
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <MapPin className="h-3 w-3 mr-1" />
                            View Map
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <FileText className="h-3 w-3 mr-1" />
                            Edit Route
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Activity Logs
                  </CardTitle>
                  <CardDescription>Recent patrol activities and reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px] w-full">
                    <div className="space-y-3">
                      {patrolLogs.map((log) => (
                        <div key={log.id} className={`p-3 border-l-4 rounded-r-lg ${getPriorityColor(log.priority)}`}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                {getTypeIcon(log.type)}
                                <span className="font-medium text-sm">{log.activity}</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {patrolUnits.find((u) => u.id === log.unitId)?.callSign}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="h-3 w-3" />
                              {log.timestamp}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <MapPin className="h-3 w-3 inline mr-1" />
                              {log.location}
                            </p>
                            {log.notes && <p className="text-sm text-gray-600">{log.notes}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Unit Details */}
          {selectedUnitData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Unit Details
                </CardTitle>
                <CardDescription>
                  {selectedUnitData.name} ({selectedUnitData.callSign})
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <Badge variant={getStatusColor(selectedUnitData.status)} className="mt-1">
                      {getStatusIcon(selectedUnitData.status)}
                      {selectedUnitData.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Current Location</p>
                    <p className="text-sm text-gray-600">{selectedUnitData.currentLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Officers</p>
                    <div className="space-y-1">
                      {selectedUnitData.officers.map((officer, index) => (
                        <Badge key={index} variant="outline" className="text-xs mr-1">
                          {officer}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Performance</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-600">Distance</p>
                        <p className="font-medium">{selectedUnitData.totalDistance}km</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Checkpoints</p>
                        <p className="font-medium">{selectedUnitData.checkpoints}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="sm">
                    <Radio className="h-4 w-4 mr-2" />
                    Contact Unit
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    Track Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Log Entry */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Quick Log Entry
              </CardTitle>
              <CardDescription>Add activity log for selected unit</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Unit</label>
                  <Select value={selectedUnit || ""} onValueChange={setSelectedUnit}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      {patrolUnits.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.callSign} - {unit.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Location</label>
                  <Input
                    value={newLogEntry.location}
                    onChange={(e) => setNewLogEntry({ ...newLogEntry, location: e.target.value })}
                    placeholder="Current location"
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Activity</label>
                  <Input
                    value={newLogEntry.activity}
                    onChange={(e) => setNewLogEntry({ ...newLogEntry, activity: e.target.value })}
                    placeholder="Activity description"
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm font-medium">Type</label>
                    <Select
                      value={newLogEntry.type}
                      onValueChange={(value: "checkpoint" | "incident" | "observation" | "break") =>
                        setNewLogEntry({ ...newLogEntry, type: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checkpoint">Checkpoint</SelectItem>
                        <SelectItem value="incident">Incident</SelectItem>
                        <SelectItem value="observation">Observation</SelectItem>
                        <SelectItem value="break">Break</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select
                      value={newLogEntry.priority}
                      onValueChange={(value: "low" | "medium" | "high") =>
                        setNewLogEntry({ ...newLogEntry, priority: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Notes</label>
                  <Textarea
                    value={newLogEntry.notes}
                    onChange={(e) => setNewLogEntry({ ...newLogEntry, notes: e.target.value })}
                    placeholder="Additional notes..."
                    rows={3}
                    className="mt-1"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={!selectedUnit}>
                  <Send className="h-4 w-4 mr-2" />
                  Add Log Entry
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
