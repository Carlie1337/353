"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UnifiedMap } from "@/components/unified-map"
import { RealGoogleMaps } from "@/components/real-google-maps"
import { ErrorBoundary } from "@/components/enhanced-error-boundary"
import { MapPin, Shield, Car, Users, Radio, Clock, Activity, AlertTriangle } from 'lucide-react'

export default function NetMapPage() {
  const [activePatrols, setActivePatrols] = useState(6)
  const [incidentReports, setIncidentReports] = useState(3)

  const patrolUnits = [
    {
      id: "patrol-1",
      callSign: "NET Alpha",
      officers: ["PO1 Santos", "PO2 Garcia"],
      status: "on-patrol",
      area: "Purok 1-3",
      lastUpdate: "2 min ago",
      coordinates: { lat: 7.073, lng: 125.616 },
    },
    {
      id: "patrol-2",
      callSign: "NET Bravo",
      officers: ["PO1 Cruz", "PO3 Reyes"],
      status: "responding",
      area: "Purok 4-6",
      lastUpdate: "1 min ago",
      coordinates: { lat: 7.0745, lng: 125.6115 },
    },
    {
      id: "patrol-3",
      callSign: "NET Charlie",
      officers: ["SPO1 Lopez", "PO2 Mendoza"],
      status: "available",
      area: "Highway Patrol",
      lastUpdate: "5 min ago",
      coordinates: { lat: 7.072, lng: 125.6145 },
    },
  ]

  const securityPoints = [
    {
      id: "checkpoint-1",
      name: "Main Entrance Checkpoint",
      type: "checkpoint",
      status: "active",
      personnel: 2,
      coordinates: { lat: 7.0725, lng: 125.6155 },
    },
    {
      id: "watchtower-1",
      name: "Central Watchtower",
      type: "watchtower",
      status: "active",
      personnel: 1,
      coordinates: { lat: 7.074, lng: 125.6125 },
    },
    {
      id: "base-1",
      name: "NET Command Base",
      type: "base",
      status: "operational",
      personnel: 8,
      coordinates: { lat: 7.0735, lng: 125.613 },
    },
  ]

  return (
    <ErrorBoundary>
      <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 md:ml-64">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">NET Tactical Map</h2>
            <p className="text-muted-foreground">Real-time patrol tracking and security coordination</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Activity className="mr-1 h-3 w-3" />
              System Online
            </Badge>
            <Button>
              <Radio className="mr-2 h-4 w-4" />
              Dispatch
            </Button>
          </div>
        </div>

        {/* Operational Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patrols</CardTitle>
              <Car className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{activePatrols}</div>
              <p className="text-xs text-muted-foreground">Units deployed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Officers on Duty</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">18</div>
              <p className="text-xs text-muted-foreground">Personnel active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incident Reports</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{incidentReports}</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">3.8 min</div>
              <p className="text-xs text-muted-foreground">Average</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="patrols" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="patrols">Patrol Units</TabsTrigger>
            <TabsTrigger value="security">Security Points</TabsTrigger>
            <TabsTrigger value="incidents">Incident Map</TabsTrigger>
          </TabsList>

          <TabsContent value="patrols" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Live Patrol Tracking</CardTitle>
                    <CardDescription>Real-time location and status of all NET patrol units</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <RealGoogleMaps 
                      userRole="net" 
                      userId="net-001" 
                      userName="NET Officer" 
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Active Patrol Units</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {patrolUnits.map((unit) => (
                        <div key={unit.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-sm">{unit.callSign}</h4>
                              <Badge
                                variant={
                                  unit.status === "responding"
                                    ? "destructive"
                                    : unit.status === "on-patrol"
                                      ? "default"
                                      : "secondary"
                                }
                                className="text-xs mt-1"
                              >
                                {unit.status}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-500">{unit.lastUpdate}</div>
                          </div>

                          <div className="text-xs text-gray-600 space-y-1">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{unit.area}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{unit.officers.join(", ")}</span>
                            </div>
                          </div>

                          <div className="flex gap-1 mt-3">
                            <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                              <Radio className="h-3 w-3 mr-1" />
                              Radio
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

          <TabsContent value="security" className="space-y-4">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Infrastructure</CardTitle>
                    <CardDescription>Fixed security points, checkpoints, and surveillance positions</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <RealGoogleMaps 
                      userRole="net" 
                      userId="net-001" 
                      userName="NET Officer" 
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Security Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {securityPoints.map((point) => (
                        <div key={point.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-sm">{point.name}</h4>
                              <Badge variant="outline" className="text-xs mt-1 capitalize">
                                {point.type}
                              </Badge>
                            </div>
                            <Badge
                              variant={
                                point.status === "active" || point.status === "operational" ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {point.status}
                            </Badge>
                          </div>

                          <div className="text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{point.personnel} personnel</span>
                            </div>
                          </div>

                          <div className="flex gap-1 mt-3">
                            <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                              <Shield className="h-3 w-3 mr-1" />
                              Status
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs flex-1 bg-transparent">
                              <Radio className="h-3 w-3 mr-1" />
                              Contact
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

          <TabsContent value="incidents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Incident Response Map</CardTitle>
                <CardDescription>Track incidents, response units, and coordination with other agencies</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <RealGoogleMaps 
                  userRole="net" 
                  userId="net-001" 
                  userName="NET Officer" 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  )
}
