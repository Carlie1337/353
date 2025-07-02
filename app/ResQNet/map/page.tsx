"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LiveIncidentMap } from "@/components/live-incident-map"
import { UnifiedMap } from "@/components/unified-map"
import { RealGoogleMaps } from "@/components/real-google-maps"
import { ErrorBoundary } from "@/components/enhanced-error-boundary"
import { MapPin, AlertTriangle, Users, Truck, Radio, Clock, Activity, Zap } from 'lucide-react'

export default function ResQNetMapPage() {
  const [activeIncidents, setActiveIncidents] = useState(3)
  const [deployedUnits, setDeployedUnits] = useState(8)
  const [responseTime, setResponseTime] = useState("4.2 min")

  const emergencyAssets = [
    {
      id: "rescue-1",
      name: "Rescue Unit Alpha",
      type: "rescue",
      status: "deployed",
      location: "Purok 3, responding to flood",
      coordinates: { lat: 7.0715, lng: 125.615 },
      personnel: 4,
      equipment: ["Rescue Boat", "Life Jackets", "Medical Kit"],
    },
    {
      id: "medical-1",
      name: "Medical Response Team",
      type: "medical",
      status: "standby",
      location: "Health Center Base",
      coordinates: { lat: 7.0735, lng: 125.6125 },
      personnel: 3,
      equipment: ["Ambulance", "Defibrillator", "Oxygen Tank"],
    },
    {
      id: "fire-1",
      name: "Fire Response Unit",
      type: "fire",
      status: "available",
      location: "Fire Station",
      coordinates: { lat: 7.074, lng: 125.613 },
      personnel: 6,
      equipment: ["Fire Truck", "Hoses", "Breathing Apparatus"],
    },
  ]

  const evacuationCenters = [
    {
      id: "evac-1",
      name: "Primary Evacuation Center",
      capacity: 500,
      currentOccupancy: 0,
      status: "ready",
      facilities: ["Sleeping Area", "Kitchen", "Medical Station"],
      coordinates: { lat: 7.075, lng: 125.611 },
    },
    {
      id: "evac-2",
      name: "Secondary Evacuation Center",
      capacity: 300,
      currentOccupancy: 0,
      status: "ready",
      facilities: ["Sleeping Area", "Restrooms"],
      coordinates: { lat: 7.072, lng: 125.6145 },
    },
  ]

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveIncidents((prev) => Math.max(0, prev + (Math.random() > 0.7 ? 1 : -1)))
      setDeployedUnits((prev) => Math.max(0, Math.min(12, prev + (Math.random() > 0.8 ? 1 : 0))))
      setResponseTime(`${(3 + Math.random() * 3).toFixed(1)} min`)
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 lg:ml-72">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">ResQNet Command Map</h2>
          <p className="text-gray-300">Real-time emergency response coordination and resource deployment</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className="animate-pulse">
            <Activity className="mr-1 h-3 w-3" />
            LIVE
          </Badge>
          <Button className="bg-red-600 hover:bg-red-700">
            <Zap className="mr-2 h-4 w-4" />
            Emergency Broadcast
          </Button>
        </div>
      </div>

      {/* Real-time Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeIncidents}</div>
            <p className="text-xs text-muted-foreground">Requiring immediate response</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deployed Units</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{deployedUnits}</div>
            <p className="text-xs text-muted-foreground">Emergency response teams</p>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{responseTime}</div>
            <p className="text-xs text-muted-foreground">Target: &lt; 5 minutes</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50/50 dark:bg-purple-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Communication Links</CardTitle>
            <Radio className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">7</div>
            <p className="text-xs text-muted-foreground">Active agency connections</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="incidents" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="incidents">Live Incidents</TabsTrigger>
          <TabsTrigger value="assets">Emergency Assets</TabsTrigger>
          <TabsTrigger value="evacuation">Evacuation Centers</TabsTrigger>
          <TabsTrigger value="coordination">Agency Coordination</TabsTrigger>
        </TabsList>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Live Incident Command Center
              </CardTitle>
              <CardDescription>
                Real-time incident monitoring, response coordination, and resource deployment
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <LiveIncidentMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="assets" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Asset Deployment</CardTitle>
                  <CardDescription>Track and coordinate emergency response units and equipment</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <UnifiedMap height="500px" />
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Units</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {emergencyAssets.map((asset) => (
                      <div key={asset.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{asset.name}</h4>
                            <Badge
                              variant={
                                asset.status === "deployed"
                                  ? "destructive"
                                  : asset.status === "standby"
                                    ? "default"
                                    : "secondary"
                              }
                              className="text-xs mt-1"
                            >
                              {asset.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span className="text-xs">{asset.personnel}</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{asset.location}</span>
                          </div>
                        </div>

                        <div className="text-xs">
                          <div className="font-medium mb-1">Equipment:</div>
                          <div className="flex flex-wrap gap-1">
                            {asset.equipment.map((item, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-1 mt-3">
                          <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                            <Radio className="h-3 w-3 mr-1" />
                            Contact
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                            <MapPin className="h-3 w-3 mr-1" />
                            Track
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="evacuation" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {evacuationCenters.map((center) => (
              <Card key={center.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{center.name}</CardTitle>
                      <Badge variant={center.status === "ready" ? "default" : "secondary"} className="mt-1">
                        {center.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {center.currentOccupancy}/{center.capacity}
                      </div>
                      <div className="text-xs text-gray-600">Capacity</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Available Facilities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {center.facilities.map((facility, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="h-48">
                    <UnifiedMap height="192px" />
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Users className="mr-2 h-4 w-4" />
                      Activate
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <MapPin className="mr-2 h-4 w-4" />
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="coordination" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inter-Agency Coordination Map</CardTitle>
              <CardDescription>Coordinate with external agencies and emergency services</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <UnifiedMap height="600px" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ErrorBoundary>
        <RealGoogleMaps 
          userRole="resqnet" 
          userId="resqnet-001" 
          userName="ResQNet Operator" 
        />
      </ErrorBoundary>
    </div>
  )
}
