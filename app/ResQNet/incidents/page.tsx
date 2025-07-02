"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, MapPin, Clock, Users, Phone, Eye, Edit, Plus, Filter, Search, Activity } from "lucide-react"

export default function IncidentManagement() {
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)

  const incidents = [
    {
      id: "INC-2024-001",
      title: "Severe Flooding in Barangay San Miguel",
      type: "Flood",
      severity: "Critical",
      status: "Active",
      location: "Barangay San Miguel, Quezon City",
      coordinates: "14.6760° N, 121.0437° E",
      reportedBy: "Barangay Captain",
      reportedAt: "2024-01-15 14:30:00",
      lastUpdate: "2 minutes ago",
      affectedPopulation: 1250,
      evacuees: 450,
      casualties: { injured: 3, missing: 0, fatalities: 0 },
      responseTeams: 8,
      resources: ["Rescue Boats", "Medical Team", "Relief Goods"],
      description:
        "Heavy rainfall caused severe flooding affecting residential areas. Water level reached 4-5 feet in low-lying areas.",
      priority: "High",
      estimatedDuration: "6-8 hours",
    },
    {
      id: "INC-2024-002",
      title: "Landslide Risk in Hillside Community",
      type: "Landslide",
      severity: "High",
      status: "Monitoring",
      location: "Barangay Hillside, Antipolo",
      coordinates: "14.5995° N, 121.1794° E",
      reportedBy: "Geological Survey Team",
      reportedAt: "2024-01-15 12:15:00",
      lastUpdate: "15 minutes ago",
      affectedPopulation: 800,
      evacuees: 200,
      casualties: { injured: 0, missing: 0, fatalities: 0 },
      responseTeams: 4,
      resources: ["Geological Equipment", "Evacuation Vehicles"],
      description: "Continuous rainfall has saturated soil conditions. Monitoring equipment shows ground movement.",
      priority: "High",
      estimatedDuration: "12-24 hours",
    },
    {
      id: "INC-2024-003",
      title: "Residential Fire Incident",
      type: "Fire",
      severity: "Medium",
      status: "Contained",
      location: "Barangay Centro, Manila",
      coordinates: "14.5995° N, 120.9842° E",
      reportedBy: "911 Emergency Call",
      reportedAt: "2024-01-15 11:45:00",
      lastUpdate: "45 minutes ago",
      affectedPopulation: 150,
      evacuees: 50,
      casualties: { injured: 2, missing: 0, fatalities: 0 },
      responseTeams: 6,
      resources: ["Fire Trucks", "Ambulance", "Medical Team"],
      description: "Fire started in residential building. Successfully contained by BFP. Investigation ongoing.",
      priority: "Medium",
      estimatedDuration: "2-3 hours",
    },
  ]

  const incidentStats = {
    total: 12,
    active: 5,
    resolved: 7,
    critical: 2,
    high: 3,
    medium: 4,
    low: 3,
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Management</h1>
          <p className="text-muted-foreground">Real-time incident tracking and response coordination</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="mr-2 h-4 w-4" />
            Report Incident
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidentStats.total}</div>
            <div className="text-xs text-muted-foreground">Last 24 hours</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{incidentStats.active}</div>
            <div className="text-xs text-muted-foreground">Requiring response</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{incidentStats.resolved}</div>
            <div className="text-xs text-muted-foreground">Successfully handled</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{incidentStats.critical}</div>
            <div className="text-xs text-muted-foreground">Immediate attention</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Incidents</TabsTrigger>
          <TabsTrigger value="all">All Incidents</TabsTrigger>
          <TabsTrigger value="map">Incident Map</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Active Emergency Incidents</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search incidents..." className="pl-8 w-64" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedIncident === incident.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedIncident(selectedIncident === incident.id ? null : incident.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            incident.severity === "Critical"
                              ? "bg-red-100"
                              : incident.severity === "High"
                                ? "bg-orange-100"
                                : "bg-yellow-100"
                          }`}
                        >
                          <AlertTriangle
                            className={`h-5 w-5 ${
                              incident.severity === "Critical"
                                ? "text-red-600"
                                : incident.severity === "High"
                                  ? "text-orange-600"
                                  : "text-yellow-600"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{incident.title}</h4>
                          <p className="text-sm text-muted-foreground">{incident.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            incident.severity === "Critical"
                              ? "destructive"
                              : incident.severity === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {incident.severity}
                        </Badge>
                        <Badge variant="outline">{incident.status}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {incident.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {incident.lastUpdate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {incident.affectedPopulation} affected
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {incident.responseTeams} teams
                      </div>
                    </div>

                    {selectedIncident === incident.id && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="font-medium mb-2">Incident Details</h5>
                            <div className="space-y-1 text-sm">
                              <div>ID: {incident.id}</div>
                              <div>Type: {incident.type}</div>
                              <div>Priority: {incident.priority}</div>
                              <div>Duration: {incident.estimatedDuration}</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Population Impact</h5>
                            <div className="space-y-1 text-sm">
                              <div>Affected: {incident.affectedPopulation}</div>
                              <div>Evacuees: {incident.evacuees}</div>
                              <div>Injured: {incident.casualties.injured}</div>
                              <div>Missing: {incident.casualties.missing}</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Response Status</h5>
                            <div className="space-y-1 text-sm">
                              <div>Teams: {incident.responseTeams}</div>
                              <div>Reported by: {incident.reportedBy}</div>
                              <div>Coordinates: {incident.coordinates}</div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Deployed Resources</h5>
                          <div className="flex gap-2">
                            {incident.resources.map((resource) => (
                              <Badge key={resource} variant="outline">
                                {resource}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <Eye className="mr-1 h-3 w-3" />
                            View Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="mr-1 h-3 w-3" />
                            Update Status
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="mr-1 h-3 w-3" />
                            Contact Team
                          </Button>
                          <Button size="sm" variant="outline">
                            <MapPin className="mr-1 h-3 w-3" />
                            View on Map
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Incidents (Last 30 Days)</CardTitle>
              <CardDescription>Complete incident history and status tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  ...incidents,
                  {
                    id: "INC-2024-004",
                    title: "Power Outage - Commercial District",
                    type: "Infrastructure",
                    severity: "Medium",
                    status: "Resolved",
                    location: "Makati CBD",
                    lastUpdate: "2 hours ago",
                    affectedPopulation: 5000,
                  },
                  {
                    id: "INC-2024-005",
                    title: "Traffic Accident - Major Highway",
                    type: "Accident",
                    severity: "Low",
                    status: "Resolved",
                    location: "EDSA-Ortigas",
                    lastUpdate: "4 hours ago",
                    affectedPopulation: 200,
                  },
                ].map((incident) => (
                  <div key={incident.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          incident.status === "Active"
                            ? "bg-red-500"
                            : incident.status === "Monitoring"
                              ? "bg-yellow-500"
                              : incident.status === "Contained"
                                ? "bg-blue-500"
                                : "bg-green-500"
                        }`}
                      ></div>
                      <div>
                        <h4 className="font-medium">{incident.title}</h4>
                        <p className="text-sm text-muted-foreground">{incident.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={incident.status === "Resolved" ? "outline" : "default"}>{incident.status}</Badge>
                      <span className="text-sm text-muted-foreground">{incident.lastUpdate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Location Map</CardTitle>
              <CardDescription>Geographic visualization of all incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive incident map would be displayed here</p>
                  <p className="text-sm text-gray-400">
                    Integration with mapping services like Google Maps or OpenStreetMap
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Incident Reports & Analytics</CardTitle>
              <CardDescription>Statistical analysis and reporting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Incident Types (Last 30 Days)</h4>
                  {[
                    { type: "Flood", count: 8, percentage: 40 },
                    { type: "Fire", count: 5, percentage: 25 },
                    { type: "Landslide", count: 3, percentage: 15 },
                    { type: "Accident", count: 4, percentage: 20 },
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <span>{item.type}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Response Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Response Time</span>
                      <span className="font-medium">8.5 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Resolution Rate</span>
                      <span className="font-medium text-green-600">94.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Incidents</span>
                      <span className="font-medium">{incidentStats.active}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Teams Deployed</span>
                      <span className="font-medium">18</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
