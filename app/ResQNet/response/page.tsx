"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Truck,
  Users,
  MapPin,
  Clock,
  Phone,
  Radio,
  Activity,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Fuel,
  Wrench,
  Plus,
  Search,
  Filter,
} from "lucide-react"

export default function EmergencyResponse() {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)

  const responseTeams = [
    {
      id: "TEAM-001",
      name: "Alpha Response Unit",
      type: "Search & Rescue",
      status: "Deployed",
      location: "Barangay San Miguel",
      incident: "INC-2024-001",
      members: 8,
      leader: "Captain Rodriguez",
      equipment: ["Rescue Boats", "Life Jackets", "Medical Kit", "Communication Radio"],
      eta: "On Site",
      lastUpdate: "2 minutes ago",
      coordinates: "14.6760° N, 121.0437° E",
      mission: "Water rescue operations in flooded residential area",
      progress: 75,
      contact: "+63-917-123-4567",
    },
    {
      id: "TEAM-002",
      name: "Bravo Medical Team",
      type: "Medical Response",
      status: "Standby",
      location: "Emergency HQ",
      incident: "Standby",
      members: 6,
      leader: "Dr. Santos",
      equipment: ["Ambulance", "Medical Supplies", "Defibrillator", "Oxygen Tank"],
      eta: "Ready",
      lastUpdate: "5 minutes ago",
      coordinates: "14.6042° N, 121.0193° E",
      mission: "Medical support and emergency care",
      progress: 100,
      contact: "+63-917-234-5678",
    },
    {
      id: "TEAM-003",
      name: "Charlie Fire Unit",
      type: "Fire Suppression",
      status: "En Route",
      location: "Barangay Centro",
      incident: "INC-2024-003",
      members: 10,
      leader: "Chief Martinez",
      equipment: ["Fire Truck", "Hoses", "Ladder", "Breathing Apparatus"],
      eta: "8 minutes",
      lastUpdate: "1 minute ago",
      coordinates: "14.5995° N, 120.9842° E",
      mission: "Fire suppression and building evacuation",
      progress: 45,
      contact: "+63-917-345-6789",
    },
    {
      id: "TEAM-004",
      name: "Delta Evacuation Team",
      type: "Evacuation Support",
      status: "Active",
      location: "Multiple Locations",
      incident: "INC-2024-001",
      members: 12,
      leader: "Sergeant Cruz",
      equipment: ["Transport Vehicles", "Megaphones", "First Aid", "Emergency Supplies"],
      eta: "Ongoing",
      lastUpdate: "3 minutes ago",
      coordinates: "14.6500° N, 121.0300° E",
      mission: "Coordinated evacuation of affected residents",
      progress: 60,
      contact: "+63-917-456-7890",
    },
  ]

  const availablePersonnel = [
    { name: "Officer Johnson", role: "Rescue Specialist", status: "Available", experience: "5 years" },
    { name: "Medic Thompson", role: "Paramedic", status: "Available", experience: "8 years" },
    { name: "Engineer Lee", role: "Technical Specialist", status: "Available", experience: "6 years" },
    { name: "Coordinator Kim", role: "Operations", status: "On Break", experience: "4 years" },
    { name: "Driver Garcia", role: "Transport", status: "Available", experience: "7 years" },
    { name: "Comm. Specialist Wong", role: "Communications", status: "Deployed", experience: "3 years" },
  ]

  const equipment = [
    { name: "Rescue Boats", available: 8, total: 12, status: "Good", location: "Warehouse A" },
    { name: "Ambulances", available: 5, total: 8, status: "Good", location: "Medical Station" },
    { name: "Fire Trucks", available: 3, total: 6, status: "Maintenance", location: "Fire Station" },
    { name: "Communication Radios", available: 25, total: 30, status: "Good", location: "Comm Center" },
    { name: "Medical Kits", available: 15, total: 20, status: "Good", location: "Medical Station" },
    { name: "Life Jackets", available: 45, total: 60, status: "Good", location: "Warehouse A" },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Response</h1>
          <p className="text-muted-foreground">Response team deployment and coordination</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter Teams
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Deploy Team
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Teams</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <div className="text-xs text-muted-foreground">Currently deployed</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available Personnel</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-xs text-muted-foreground">Ready for deployment</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Equipment Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <div className="text-xs text-muted-foreground">Operational status</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.2m</div>
            <div className="text-xs text-muted-foreground">Average deployment</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="teams" className="space-y-6">
        <TabsList>
          <TabsTrigger value="teams">Response Teams</TabsTrigger>
          <TabsTrigger value="personnel">Personnel</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
          <TabsTrigger value="deployment">Deployment Map</TabsTrigger>
        </TabsList>

        <TabsContent value="teams" className="space-y-6">
          {/* Response Teams */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    Active Response Teams
                  </CardTitle>
                  <CardDescription>Real-time team deployment and status monitoring</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search teams..." className="pl-8 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {responseTeams.map((team) => (
                  <div
                    key={team.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTeam === team.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedTeam(selectedTeam === team.id ? null : team.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Truck className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{team.name}</h4>
                          <p className="text-sm text-muted-foreground">{team.mission}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            team.status === "Deployed"
                              ? "destructive"
                              : team.status === "En Route"
                                ? "default"
                                : team.status === "Active"
                                  ? "default"
                                  : "secondary"
                          }
                        >
                          {team.status}
                        </Badge>
                        <Badge variant="outline">{team.type}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {team.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {team.members} members
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        ETA: {team.eta}
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="h-3 w-3" />
                        {team.lastUpdate}
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>Mission Progress</span>
                        <span>{team.progress}%</span>
                      </div>
                      <Progress value={team.progress} className="h-2" />
                    </div>

                    {selectedTeam === team.id && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="font-medium mb-2">Team Details</h5>
                            <div className="space-y-1 text-sm">
                              <div>ID: {team.id}</div>
                              <div>Leader: {team.leader}</div>
                              <div>Contact: {team.contact}</div>
                              <div>Incident: {team.incident}</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Location</h5>
                            <div className="space-y-1 text-sm">
                              <div>Current: {team.location}</div>
                              <div>Coordinates: {team.coordinates}</div>
                              <div>Last Update: {team.lastUpdate}</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Equipment</h5>
                            <div className="flex flex-wrap gap-1">
                              {team.equipment.map((item) => (
                                <Badge key={item} variant="outline" className="text-xs">
                                  {item}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">
                            <Radio className="mr-1 h-3 w-3" />
                            Contact Team
                          </Button>
                          <Button size="sm" variant="outline">
                            <Navigation className="mr-1 h-3 w-3" />
                            Track Location
                          </Button>
                          <Button size="sm" variant="outline">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Update Mission
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Mark Complete
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

        <TabsContent value="personnel" className="space-y-6">
          {/* Personnel Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Available Personnel
              </CardTitle>
              <CardDescription>Emergency response personnel and their current status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availablePersonnel.map((person, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>
                          {person.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{person.name}</h4>
                          <Badge
                            variant={
                              person.status === "Available"
                                ? "default"
                                : person.status === "Deployed"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {person.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{person.role}</p>
                        <p className="text-xs text-muted-foreground">Experience: {person.experience}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="outline" disabled={person.status !== "Available"}>
                            <Phone className="mr-1 h-3 w-3" />
                            Contact
                          </Button>
                          <Button size="sm" variant="outline" disabled={person.status !== "Available"}>
                            Deploy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-6">
          {/* Equipment Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-purple-600" />
                Equipment Inventory
              </CardTitle>
              <CardDescription>Emergency response equipment and availability status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {equipment.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Wrench className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Location: {item.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-medium">
                          {item.available}/{item.total}
                        </div>
                        <div className="text-sm text-muted-foreground">Available</div>
                      </div>
                      <Badge
                        variant={
                          item.status === "Good"
                            ? "default"
                            : item.status === "Maintenance"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {item.status}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Fuel className="mr-1 h-3 w-3" />
                          Check
                        </Button>
                        <Button size="sm" variant="outline">
                          Deploy
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          {/* Deployment Map */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-red-600" />
                Team Deployment Map
              </CardTitle>
              <CardDescription>Real-time visualization of response team locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Interactive deployment map would be displayed here</p>
                  <p className="text-sm text-gray-400">Real-time team tracking and coordination</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
