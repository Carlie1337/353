"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Radio, Users, Phone, MessageSquare, Truck, Activity, Clock, MapPin } from "lucide-react"

export default function AgencyCoordination() {
  const connectedAgencies = [
    {
      name: "Philippine National Police",
      code: "PNP",
      status: "Online",
      personnel: 45,
      units: 8,
      contact: "117",
      lastUpdate: "2 min ago",
    },
    {
      name: "Bureau of Fire Protection",
      code: "BFP",
      status: "Online",
      personnel: 12,
      units: 3,
      contact: "116",
      lastUpdate: "1 min ago",
    },
    {
      name: "Armed Forces of the Philippines",
      code: "AFP",
      status: "Online",
      personnel: 20,
      units: 4,
      contact: "911",
      lastUpdate: "5 min ago",
    },
    {
      name: "Philippine Coast Guard",
      code: "PCG",
      status: "Standby",
      personnel: 8,
      units: 2,
      contact: "143",
      lastUpdate: "10 min ago",
    },
    {
      name: "Barangay Tanod",
      code: "TANOD",
      status: "Online",
      personnel: 15,
      units: 5,
      contact: "Local",
      lastUpdate: "1 min ago",
    },
  ]

  const activeOperations = [
    {
      id: "OP-2024-001",
      name: "Joint Patrol Operation",
      agencies: ["PNP", "TANOD"],
      status: "Active",
      location: "Highway Checkpoint",
      startTime: "06:00",
      personnel: 8,
    },
    {
      id: "OP-2024-002",
      name: "Emergency Response Drill",
      agencies: ["BFP", "PNP", "AFP"],
      status: "Scheduled",
      location: "Town Plaza",
      startTime: "14:00",
      personnel: 25,
    },
  ]

  const communications = [
    {
      from: "BFP Station 1",
      message: "Fire truck en route to Purok 3, ETA 5 minutes",
      time: "2 min ago",
      priority: "High",
    },
    {
      from: "PNP Mobile Unit 2",
      message: "Traffic accident cleared, resuming patrol",
      time: "8 min ago",
      priority: "Medium",
    },
    {
      from: "AFP Checkpoint Alpha",
      message: "All clear, no suspicious activity reported",
      time: "15 min ago",
      priority: "Low",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NET Agency Coordination</h1>
          <p className="text-muted-foreground">Network Enforcement Team - Inter-agency Demo</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            All Systems Online
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Radio className="h-4 w-4 mr-2" />
            NET Emergency Broadcast
          </Button>
        </div>
      </div>

      <Tabs defaultValue="agencies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="agencies">Connected Agencies</TabsTrigger>
          <TabsTrigger value="operations">Joint Operations</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="resources">Shared Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="agencies">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connectedAgencies.map((agency) => (
              <Card key={agency.code}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback className="bg-blue-600 text-white">{agency.code}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{agency.name}</CardTitle>
                        <CardDescription>{agency.code}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={agency.status === "Online" ? "default" : "secondary"}>{agency.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Personnel
                      </span>
                      <span className="font-medium">{agency.personnel}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Truck className="h-4 w-4 mr-2" />
                        Units
                      </span>
                      <span className="font-medium">{agency.units}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Contact
                      </span>
                      <span className="font-medium">{agency.contact}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Last Update
                      </span>
                      <span>{agency.lastUpdate}</span>
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="h-3 w-3 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="operations">
          <div className="space-y-4">
            {activeOperations.map((operation) => (
              <Card key={operation.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{operation.name}</CardTitle>
                      <CardDescription>Operation ID: {operation.id}</CardDescription>
                    </div>
                    <Badge variant={operation.status === "Active" ? "default" : "secondary"}>{operation.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Participating Agencies</p>
                      <div className="flex space-x-1">
                        {operation.agencies.map((agency) => (
                          <Badge key={agency} variant="outline" className="text-xs">
                            {agency}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Location</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {operation.location}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Start Time</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {operation.startTime}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Personnel</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" />
                        {operation.personnel} officers
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
              <CardDescription>Latest messages from connected agencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communications.map((comm, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <Radio className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{comm.from}</p>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={
                              comm.priority === "High"
                                ? "destructive"
                                : comm.priority === "Medium"
                                  ? "default"
                                  : "secondary"
                            }
                            className="text-xs"
                          >
                            {comm.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{comm.time}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{comm.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Vehicles</CardTitle>
                <CardDescription>Shared fleet resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Patrol Cars</span>
                    <span className="font-medium">12 available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fire Trucks</span>
                    <span className="font-medium">3 available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Ambulances</span>
                    <span className="font-medium">2 available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Military Vehicles</span>
                    <span className="font-medium">4 available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Equipment Status</CardTitle>
                <CardDescription>Shared equipment inventory</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Communication Radios</span>
                    <span className="font-medium">45 units</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Emergency Kits</span>
                    <span className="font-medium">20 sets</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Traffic Cones</span>
                    <span className="font-medium">100 pieces</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Barriers</span>
                    <span className="font-medium">25 units</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personnel Availability</CardTitle>
                <CardDescription>Cross-agency personnel status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">On Duty</span>
                    <span className="font-medium">78 officers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Available for Deployment</span>
                    <span className="font-medium">32 officers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">In Training</span>
                    <span className="font-medium">12 officers</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Off Duty</span>
                    <span className="font-medium">45 officers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
