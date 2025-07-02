"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UnifiedMap } from "@/components/unified-map"
import { LiveIncidentMap } from "@/components/live-incident-map"
import { RealGoogleMaps } from "@/components/real-google-maps"
import { ErrorBoundary } from "@/components/enhanced-error-boundary"
import { MapPin, Plus, Edit, Trash2, Save, AlertTriangle, Building, Activity } from 'lucide-react'

export default function AdminMapPage() {
  const [isAddingLocation, setIsAddingLocation] = useState(false)
  const [newLocation, setNewLocation] = useState({
    name: "",
    type: "facility",
    description: "",
    lat: 7.0731,
    lng: 125.6128,
  })

  const managedLocations = [
    {
      id: "1",
      name: "Barangay Bucana Hall",
      type: "facility",
      status: "active",
      address: "Main Street, Bucana",
      coordinates: "7.0731, 125.6128",
      lastUpdated: "2024-01-15",
    },
    {
      id: "2",
      name: "Bucana Health Center",
      type: "facility",
      status: "active",
      address: "Health Street, Bucana",
      coordinates: "7.0735, 125.6125",
      lastUpdated: "2024-01-14",
    },
    {
      id: "3",
      name: "Emergency Evacuation Center",
      type: "evacuation",
      status: "standby",
      address: "Community Center, Bucana",
      coordinates: "7.0750, 125.6110",
      lastUpdated: "2024-01-13",
    },
  ]

  const handleLocationAdd = (location: { lat: number; lng: number }) => {
    setNewLocation((prev) => ({
      ...prev,
      lat: location.lat,
      lng: location.lng,
    }))
    setIsAddingLocation(true)
  }

  const handleSaveLocation = () => {
    console.log("Saving new location:", newLocation)
    setIsAddingLocation(false)
    setNewLocation({
      name: "",
      type: "facility",
      description: "",
      lat: 7.0731,
      lng: 125.6128,
    })
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 md:ml-64">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Map Management</h2>
          <p className="text-muted-foreground">Manage barangay locations, facilities, and emergency zones</p>
        </div>
        <Button onClick={() => setIsAddingLocation(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Map Overview</TabsTrigger>
          <TabsTrigger value="incidents">Live Incidents</TabsTrigger>
          <TabsTrigger value="locations">Manage Locations</TabsTrigger>
          <TabsTrigger value="analytics">Map Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Facilities</CardTitle>
                <Building className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">All operational</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Emergency Zones</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">6</div>
                <p className="text-xs text-muted-foreground">Ready for deployment</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Map Views</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Administrative Map View</CardTitle>
              <CardDescription>
                Complete view of all barangay facilities, services, and administrative zones
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ErrorBoundary>
                <RealGoogleMaps 
                  userRole="admin" 
                  userId="admin-001" 
                  userName="Administrator" 
                />
              </ErrorBoundary>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Live Incident Monitoring
              </CardTitle>
              <CardDescription>Real-time incident tracking and emergency response coordination</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <LiveIncidentMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Location Management</CardTitle>
                  <CardDescription>Click on the map to add new locations or manage existing ones</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ErrorBoundary>
                    <RealGoogleMaps 
                      userRole="admin" 
                      userId="admin-001" 
                      userName="Administrator" 
                    />
                  </ErrorBoundary>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              {isAddingLocation && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Add New Location</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="location-name">Location Name</Label>
                      <Input
                        id="location-name"
                        value={newLocation.name}
                        onChange={(e) => setNewLocation((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter location name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location-type">Type</Label>
                      <Select
                        value={newLocation.type}
                        onValueChange={(value) => setNewLocation((prev) => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="facility">Facility</SelectItem>
                          <SelectItem value="emergency">Emergency</SelectItem>
                          <SelectItem value="evacuation">Evacuation Center</SelectItem>
                          <SelectItem value="patrol">Patrol Point</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location-description">Description</Label>
                      <Input
                        id="location-description"
                        value={newLocation.description}
                        onChange={(e) => setNewLocation((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter description"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label>Latitude</Label>
                        <Input
                          type="number"
                          step="0.000001"
                          value={newLocation.lat}
                          onChange={(e) =>
                            setNewLocation((prev) => ({ ...prev, lat: Number.parseFloat(e.target.value) }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Longitude</Label>
                        <Input
                          type="number"
                          step="0.000001"
                          value={newLocation.lng}
                          onChange={(e) =>
                            setNewLocation((prev) => ({ ...prev, lng: Number.parseFloat(e.target.value) }))
                          }
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveLocation} className="flex-1">
                        <Save className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                      <Button variant="outline" onClick={() => setIsAddingLocation(false)} className="flex-1">
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Existing Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {managedLocations.map((location) => (
                      <div key={location.id} className="p-3 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-sm">{location.name}</h4>
                            <Badge variant="outline" className="text-xs mt-1">
                              {location.type}
                            </Badge>
                          </div>
                          <Badge variant={location.status === "active" ? "default" : "secondary"} className="text-xs">
                            {location.status}
                          </Badge>
                        </div>

                        <div className="text-xs text-gray-600 space-y-1">
                          <div>{location.address}</div>
                          <div>{location.coordinates}</div>
                          <div>Updated: {location.lastUpdated}</div>
                        </div>

                        <div className="flex gap-1 mt-3">
                          <Button size="sm" variant="outline" className="text-xs bg-transparent">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs text-red-600 bg-transparent">
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
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

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Map Usage Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Map Views</span>
                    <span className="font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Unique Visitors</span>
                    <span className="font-bold">892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Mobile Users</span>
                    <span className="font-bold">68%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Session</span>
                    <span className="font-bold">3m 24s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Locations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: "Barangay Hall", views: 324 },
                    { name: "Health Center", views: 298 },
                    { name: "Elementary School", views: 187 },
                    { name: "Basketball Court", views: 156 },
                    { name: "Market Area", views: 134 },
                  ].map((location, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{location.name}</span>
                      <Badge variant="secondary">{location.views} views</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
