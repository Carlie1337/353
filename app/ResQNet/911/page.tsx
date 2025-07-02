"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Phone,
  PhoneCall,
  Clock,
  MapPin,
  User,
  CheckCircle,
  Activity,
  Headphones,
  Radio,
  Navigation,
  FileText,
} from "lucide-react"

export default function Emergency911Integration() {
  const [selectedCall, setSelectedCall] = useState<string | null>(null)

  const activeCalls = [
    {
      id: "CALL-001",
      number: "+63-917-123-4567",
      caller: "Maria Santos",
      type: "Medical Emergency",
      priority: "Critical",
      status: "Active",
      location: "123 Main St, Quezon City",
      coordinates: "14.6760° N, 121.0437° E",
      description: "Elderly person having chest pains, difficulty breathing",
      operator: "Operator Johnson",
      startTime: "14:32:15",
      duration: "00:03:45",
      dispatchedUnits: ["AMB-001", "MED-TEAM-02"],
      callbackAttempts: 0,
    },
    {
      id: "CALL-002",
      number: "+63-917-234-5678",
      caller: "Juan Dela Cruz",
      type: "Fire Emergency",
      priority: "High",
      status: "Dispatched",
      location: "456 Oak Ave, Manila",
      coordinates: "14.5995° N, 120.9842° E",
      description: "House fire reported, smoke visible from neighboring buildings",
      operator: "Operator Smith",
      startTime: "14:28:30",
      duration: "00:07:30",
      dispatchedUnits: ["FIRE-001", "FIRE-002", "AMB-002"],
      callbackAttempts: 1,
    },
    {
      id: "CALL-003",
      number: "+63-917-345-6789",
      caller: "Anonymous",
      type: "Security Incident",
      priority: "Medium",
      status: "Pending",
      location: "789 Pine St, Makati",
      coordinates: "14.5547° N, 121.0244° E",
      description: "Suspicious activity reported, possible break-in attempt",
      operator: "Operator Davis",
      startTime: "14:35:20",
      duration: "00:00:40",
      dispatchedUnits: [],
      callbackAttempts: 0,
    },
  ]

  const callStats = {
    totalToday: 127,
    activeNow: 8,
    averageResponse: "2.3 minutes",
    completionRate: "98.5%",
    criticalCalls: 12,
    dispatchedUnits: 24,
  }

  const operators = [
    {
      id: "OP-001",
      name: "Sarah Johnson",
      status: "Active",
      currentCall: "CALL-001",
      callsToday: 23,
      avgResponseTime: "1.8 min",
      shift: "Day Shift",
    },
    {
      id: "OP-002",
      name: "Mike Smith",
      status: "Active",
      currentCall: "CALL-002",
      callsToday: 19,
      avgResponseTime: "2.1 min",
      shift: "Day Shift",
    },
    {
      id: "OP-003",
      name: "Lisa Davis",
      status: "Available",
      currentCall: null,
      callsToday: 15,
      avgResponseTime: "1.9 min",
      shift: "Day Shift",
    },
    {
      id: "OP-004",
      name: "Robert Wilson",
      status: "Break",
      currentCall: null,
      callsToday: 21,
      avgResponseTime: "2.0 min",
      shift: "Day Shift",
    },
  ]

  const recentCalls = [
    {
      id: "CALL-004",
      type: "Medical",
      status: "Completed",
      duration: "00:05:23",
      outcome: "Ambulance dispatched, patient transported",
      time: "14:20:15",
    },
    {
      id: "CALL-005",
      type: "Traffic Accident",
      status: "Completed",
      duration: "00:03:12",
      outcome: "Police and medical units dispatched",
      time: "14:15:45",
    },
    {
      id: "CALL-006",
      type: "False Alarm",
      status: "Closed",
      duration: "00:01:30",
      outcome: "No emergency services required",
      time: "14:10:20",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">911 Emergency Integration</h1>
          <p className="text-muted-foreground">Emergency call management and dispatch coordination</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className="animate-pulse">
            <Activity className="mr-1 h-3 w-3" />
            {callStats.activeNow} ACTIVE CALLS
          </Badge>
          <Button variant="outline">
            <Headphones className="mr-2 h-4 w-4" />
            Operator Console
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Phone className="mr-2 h-4 w-4" />
            Emergency Line
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.totalToday}</div>
            <div className="text-xs text-muted-foreground">+12 from yesterday</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{callStats.activeNow}</div>
            <div className="text-xs text-muted-foreground">Being handled</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.averageResponse}</div>
            <div className="text-xs text-muted-foreground">Average today</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{callStats.completionRate}</div>
            <div className="text-xs text-muted-foreground">Successfully handled</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{callStats.criticalCalls}</div>
            <div className="text-xs text-muted-foreground">High priority today</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Units Dispatched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{callStats.dispatchedUnits}</div>
            <div className="text-xs text-muted-foreground">Currently active</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Calls</TabsTrigger>
          <TabsTrigger value="operators">Operators</TabsTrigger>
          <TabsTrigger value="history">Call History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-6">
          {/* Active Emergency Calls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PhoneCall className="h-5 w-5 text-red-600" />
                Active Emergency Calls
              </CardTitle>
              <CardDescription>Real-time emergency call monitoring and dispatch</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeCalls.map((call) => (
                  <div
                    key={call.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedCall === call.id ? "border-red-500 bg-red-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedCall(selectedCall === call.id ? null : call.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            call.priority === "Critical"
                              ? "bg-red-100"
                              : call.priority === "High"
                                ? "bg-orange-100"
                                : "bg-yellow-100"
                          }`}
                        >
                          <Phone
                            className={`h-5 w-5 ${
                              call.priority === "Critical"
                                ? "text-red-600"
                                : call.priority === "High"
                                  ? "text-orange-600"
                                  : "text-yellow-600"
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">{call.type}</h4>
                          <p className="text-sm text-muted-foreground">{call.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            call.priority === "Critical"
                              ? "destructive"
                              : call.priority === "High"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {call.priority}
                        </Badge>
                        <Badge
                          variant={
                            call.status === "Active"
                              ? "destructive"
                              : call.status === "Dispatched"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {call.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {call.caller}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {call.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {call.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Headphones className="h-3 w-3" />
                        {call.operator}
                      </div>
                    </div>

                    {selectedCall === call.id && (
                      <div className="mt-4 pt-4 border-t space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          <div>
                            <h5 className="font-medium mb-2">Call Details</h5>
                            <div className="space-y-1 text-sm">
                              <div>Call ID: {call.id}</div>
                              <div>Number: {call.number}</div>
                              <div>Start Time: {call.startTime}</div>
                              <div>Callbacks: {call.callbackAttempts}</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Location</h5>
                            <div className="space-y-1 text-sm">
                              <div>Address: {call.location}</div>
                              <div>Coordinates: {call.coordinates}</div>
                            </div>
                          </div>
                          <div>
                            <h5 className="font-medium mb-2">Dispatch Status</h5>
                            <div className="space-y-1 text-sm">
                              {call.dispatchedUnits.length > 0 ? (
                                call.dispatchedUnits.map((unit) => (
                                  <Badge key={unit} variant="outline" className="text-xs mr-1">
                                    {unit}
                                  </Badge>
                                ))
                              ) : (
                                <span className="text-muted-foreground">No units dispatched</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <Phone className="mr-1 h-3 w-3" />
                            Call Back
                          </Button>
                          <Button size="sm" variant="outline">
                            <Radio className="mr-1 h-3 w-3" />
                            Dispatch Unit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Navigation className="mr-1 h-3 w-3" />
                            View Location
                          </Button>
                          <Button size="sm" variant="outline">
                            <FileText className="mr-1 h-3 w-3" />
                            Add Notes
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Close Call
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

        <TabsContent value="operators" className="space-y-6">
          {/* Operator Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5 text-blue-600" />
                911 Operators
              </CardTitle>
              <CardDescription>Current operator status and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {operators.map((operator) => (
                  <div key={operator.id} className="p-4 border rounded-lg">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                        <AvatarFallback>
                          {operator.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{operator.name}</h4>
                          <Badge
                            variant={
                              operator.status === "Active"
                                ? "destructive"
                                : operator.status === "Available"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {operator.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{operator.shift}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Calls Today:</span>
                            <div className="font-medium">{operator.callsToday}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Avg Response:</span>
                            <div className="font-medium">{operator.avgResponseTime}</div>
                          </div>
                        </div>
                        {operator.currentCall && (
                          <div className="mt-2">
                            <span className="text-sm text-muted-foreground">Current Call:</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              {operator.currentCall}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Call History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                Recent Call History
              </CardTitle>
              <CardDescription>Recently completed emergency calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          call.status === "Completed" ? "bg-green-500" : "bg-gray-500"
                        }`}
                      ></div>
                      <div>
                        <h4 className="font-medium">{call.type}</h4>
                        <p className="text-sm text-muted-foreground">{call.outcome}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{call.duration}</div>
                      <div className="text-xs text-muted-foreground">{call.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Call Volume Analysis</CardTitle>
                <CardDescription>Emergency call patterns and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Medical Emergencies</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Fire Emergencies</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-orange-600 h-2 rounded-full" style={{ width: "25%" }}></div>
                      </div>
                      <span className="text-sm">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Security Incidents</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "20%" }}></div>
                      </div>
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Other</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-gray-600 h-2 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                      <span className="text-sm">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>911 system performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Answer Time</span>
                    <span className="font-medium text-green-600">12.3 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Call Abandonment Rate</span>
                    <span className="font-medium text-green-600">1.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dispatch Accuracy</span>
                    <span className="font-medium text-green-600">97.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>System Uptime</span>
                    <span className="font-medium text-green-600">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Operator Utilization</span>
                    <span className="font-medium">78.5%</span>
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
