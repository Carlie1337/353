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
  Users,
  Phone,
  MessageSquare,
  Activity,
  Clock,
  MapPin,
  AlertTriangle,
  Video,
  FileText,
  Database,
  Truck,
  Radio,
  Search,
} from "lucide-react"

export default function AgencyCoordination() {
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null)

  const agencies = [
    {
      id: "ndrrmc",
      name: "NDRRMC",
      fullName: "National Disaster Risk Reduction and Management Council",
      status: "online",
      personnel: 45,
      resources: "High",
      response: "Ready",
      contact: "+63-2-911-1406",
      email: "operations@ndrrmc.gov.ph",
      location: "Camp Aguinaldo, Quezon City",
      capabilities: ["Coordination", "Resource Allocation", "Policy Direction"],
      currentDeployment: "Metro Manila Flood Response",
      lastUpdate: "2 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "barangay",
      name: "Barangay LGU",
      fullName: "Local Government Unit - Barangay Level",
      status: "online",
      personnel: 32,
      resources: "Medium",
      response: "Active",
      contact: "+63-2-555-0123",
      email: "emergency@barangay.gov.ph",
      location: "Barangay Hall, Local Area",
      capabilities: ["Local Response", "Evacuation", "Community Coordination"],
      currentDeployment: "Local Evacuation Operations",
      lastUpdate: "1 minute ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "pnp",
      name: "PNP",
      fullName: "Philippine National Police",
      status: "online",
      personnel: 28,
      resources: "High",
      response: "Deployed",
      contact: "+63-2-722-0650",
      email: "operations@pnp.gov.ph",
      location: "Camp Crame, Quezon City",
      capabilities: ["Security", "Traffic Management", "Crowd Control"],
      currentDeployment: "Security & Traffic Control",
      lastUpdate: "3 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "bfp",
      name: "BFP",
      fullName: "Bureau of Fire Protection",
      status: "online",
      personnel: 24,
      resources: "Medium",
      response: "Active",
      contact: "+63-2-426-0219",
      email: "emergency@bfp.gov.ph",
      location: "BFP National Headquarters",
      capabilities: ["Fire Suppression", "Rescue Operations", "Emergency Medical"],
      currentDeployment: "Fire & Rescue Operations",
      lastUpdate: "5 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "doh",
      name: "DOH",
      fullName: "Department of Health",
      status: "limited",
      personnel: 18,
      resources: "Low",
      response: "Standby",
      contact: "+63-2-651-7800",
      email: "emergency@doh.gov.ph",
      location: "DOH Central Office",
      capabilities: ["Medical Response", "Health Monitoring", "Disease Control"],
      currentDeployment: "Medical Support Standby",
      lastUpdate: "15 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "dswd",
      name: "DSWD",
      fullName: "Department of Social Welfare and Development",
      status: "online",
      personnel: 22,
      resources: "High",
      response: "Ready",
      contact: "+63-2-931-8101",
      email: "emergency@dswd.gov.ph",
      location: "DSWD Central Office",
      capabilities: ["Relief Operations", "Evacuation Centers", "Social Services"],
      currentDeployment: "Relief Distribution",
      lastUpdate: "4 minutes ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "redcross",
      name: "Red Cross",
      fullName: "Philippine Red Cross",
      status: "offline",
      personnel: 0,
      resources: "Unknown",
      response: "N/A",
      contact: "+63-2-527-0864",
      email: "emergency@redcross.org.ph",
      location: "PRC National Headquarters",
      capabilities: ["Humanitarian Aid", "Blood Services", "Disaster Relief"],
      currentDeployment: "Communication Lost",
      lastUpdate: "2 hours ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "911",
      name: "911 Emergency",
      fullName: "Emergency Response System",
      status: "online",
      personnel: 35,
      resources: "High",
      response: "Active",
      contact: "911",
      email: "operations@911.gov.ph",
      location: "Emergency Operations Center",
      capabilities: ["Emergency Dispatch", "Call Routing", "Coordination"],
      currentDeployment: "24/7 Emergency Operations",
      lastUpdate: "30 seconds ago",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const activeOperations = [
    {
      id: "OP-001",
      name: "Metro Manila Flood Response",
      type: "Flood Emergency",
      status: "Active",
      priority: "High",
      agencies: ["NDRRMC", "Barangay LGU", "PNP", "BFP"],
      startTime: "2 hours ago",
      location: "Multiple Barangays",
      progress: 65,
    },
    {
      id: "OP-002",
      name: "Evacuation Center Management",
      type: "Evacuation",
      status: "Ongoing",
      priority: "Medium",
      agencies: ["DSWD", "Barangay LGU", "DOH"],
      startTime: "4 hours ago",
      location: "15 Centers",
      progress: 80,
    },
    {
      id: "OP-003",
      name: "Medical Emergency Response",
      type: "Medical",
      status: "Standby",
      priority: "Medium",
      agencies: ["DOH", "911 Emergency"],
      startTime: "1 hour ago",
      location: "Regional Hospitals",
      progress: 45,
    },
  ]

  const communicationLogs = [
    {
      id: 1,
      from: "NDRRMC",
      to: "All Agencies",
      message: "Flood levels rising in Zone 3. Requesting immediate evacuation support.",
      time: "2 minutes ago",
      type: "urgent",
    },
    {
      id: 2,
      from: "Barangay LGU",
      to: "DSWD",
      message: "Evacuation Center A at 85% capacity. Need additional shelter options.",
      time: "5 minutes ago",
      type: "request",
    },
    {
      id: 3,
      from: "PNP",
      to: "BFP",
      message: "Traffic cleared on Main Street. Fire trucks can proceed to incident location.",
      time: "8 minutes ago",
      type: "update",
    },
    {
      id: 4,
      from: "911 Emergency",
      to: "DOH",
      message: "Medical emergency reported at Evacuation Center B. Dispatching ambulance.",
      time: "12 minutes ago",
      type: "alert",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agency Coordination</h1>
          <p className="text-muted-foreground">Multi-agency coordination and communication hub</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="default" className="animate-pulse">
            <Activity className="mr-1 h-3 w-3" />8 AGENCIES CONNECTED
          </Badge>
          <Button variant="outline">
            <Video className="mr-2 h-4 w-4" />
            Video Conference
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <MessageSquare className="mr-2 h-4 w-4" />
            Emergency Chat
          </Button>
        </div>
      </div>

      <Tabs defaultValue="agencies" className="space-y-6">
        <TabsList>
          <TabsTrigger value="agencies">Connected Agencies</TabsTrigger>
          <TabsTrigger value="operations">Joint Operations</TabsTrigger>
          <TabsTrigger value="communication">Communication Hub</TabsTrigger>
          <TabsTrigger value="resources">Resource Sharing</TabsTrigger>
        </TabsList>

        <TabsContent value="agencies" className="space-y-6">
          {/* Agency Status Overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Agencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground">Connected to ResQNet</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Online Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">7</div>
                <div className="text-xs text-muted-foreground">87.5% operational</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Personnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">204</div>
                <div className="text-xs text-muted-foreground">Ready for deployment</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2m</div>
                <div className="text-xs text-muted-foreground">Average coordination time</div>
              </CardContent>
            </Card>
          </div>

          {/* Agency Directory */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Agency Directory</CardTitle>
                  <CardDescription>Real-time status and contact information for all connected agencies</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search agencies..." className="pl-8 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {agencies.map((agency) => (
                  <div
                    key={agency.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedAgency === agency.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedAgency(selectedAgency === agency.id ? null : agency.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={agency.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{agency.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium">{agency.name}</h4>
                          <Badge
                            variant={
                              agency.status === "online"
                                ? "default"
                                : agency.status === "limited"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {agency.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{agency.fullName}</p>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {agency.personnel} personnel
                          </div>
                          <div className="flex items-center gap-1">
                            <Database className="h-3 w-3" />
                            {agency.resources} resources
                          </div>
                          <div className="flex items-center gap-1">
                            <Activity className="h-3 w-3" />
                            {agency.response}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {agency.lastUpdate}
                          </div>
                        </div>

                        {selectedAgency === agency.id && (
                          <div className="mt-3 pt-3 border-t space-y-2">
                            <div className="text-sm">
                              <strong>Contact:</strong> {agency.contact}
                            </div>
                            <div className="text-sm">
                              <strong>Email:</strong> {agency.email}
                            </div>
                            <div className="text-sm">
                              <strong>Location:</strong> {agency.location}
                            </div>
                            <div className="text-sm">
                              <strong>Current Deployment:</strong> {agency.currentDeployment}
                            </div>
                            <div className="text-sm">
                              <strong>Capabilities:</strong> {agency.capabilities.join(", ")}
                            </div>
                            <div className="flex gap-2 mt-3">
                              <Button size="sm" variant="outline">
                                <Phone className="mr-1 h-3 w-3" />
                                Call
                              </Button>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="mr-1 h-3 w-3" />
                                Message
                              </Button>
                              <Button size="sm" variant="outline">
                                <Video className="mr-1 h-3 w-3" />
                                Video Call
                              </Button>
                            </div>
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

        <TabsContent value="operations" className="space-y-6">
          {/* Joint Operations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-blue-600" />
                Active Joint Operations
              </CardTitle>
              <CardDescription>Coordinated multi-agency emergency operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeOperations.map((operation) => (
                  <div key={operation.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{operation.name}</h4>
                        <p className="text-sm text-muted-foreground">{operation.type}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={operation.priority === "High" ? "destructive" : "default"}>
                          {operation.priority}
                        </Badge>
                        <Badge variant="outline">{operation.status}</Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Started:</span>
                        <div>{operation.startTime}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Location:</span>
                        <div>{operation.location}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Agencies:</span>
                        <div>{operation.agencies.length} involved</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Progress:</span>
                        <div>{operation.progress}%</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Operation Progress</span>
                        <span>{operation.progress}%</span>
                      </div>
                      <Progress value={operation.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Participating Agencies:</span>
                        {operation.agencies.map((agencyName) => (
                          <Badge key={agencyName} variant="outline" className="text-xs">
                            {agencyName}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">Join Operation</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          {/* Communication Hub */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  Emergency Communication Log
                </CardTitle>
                <CardDescription>Real-time inter-agency communications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {communicationLogs.map((log) => (
                    <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg border">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          log.type === "urgent"
                            ? "bg-red-100"
                            : log.type === "alert"
                              ? "bg-orange-100"
                              : log.type === "request"
                                ? "bg-blue-100"
                                : "bg-gray-100"
                        }`}
                      >
                        <MessageSquare
                          className={`h-4 w-4 ${
                            log.type === "urgent"
                              ? "text-red-600"
                              : log.type === "alert"
                                ? "text-orange-600"
                                : log.type === "request"
                                  ? "text-blue-600"
                                  : "text-gray-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{log.from}</span>
                          <span className="text-muted-foreground text-xs">→</span>
                          <span className="text-sm text-muted-foreground">{log.to}</span>
                          <Badge variant="outline" className="text-xs ml-auto">
                            {log.type}
                          </Badge>
                        </div>
                        <p className="text-sm">{log.message}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{log.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Input placeholder="Type your message..." className="flex-1" />
                  <Button>Send</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Emergency coordination tools</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Radio className="mr-2 h-4 w-4" />
                  Emergency Broadcast
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Video className="mr-2 h-4 w-4" />
                  Start Video Conference
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Escalate Emergency
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <MapPin className="mr-2 h-4 w-4" />
                  Share Location
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Database className="mr-2 h-4 w-4" />
                  Request Resources
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          {/* Resource Sharing */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-purple-600" />
                  Available Resources
                </CardTitle>
                <CardDescription>Shared resources across all agencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: "Rescue Vehicles", available: 12, total: 15, agency: "BFP" },
                    { type: "Medical Teams", available: 8, total: 10, agency: "DOH" },
                    { type: "Relief Goods", available: 500, total: 800, agency: "DSWD" },
                    { type: "Security Personnel", available: 25, total: 30, agency: "PNP" },
                    { type: "Communication Equipment", available: 18, total: 20, agency: "NDRRMC" },
                  ].map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{resource.type}</h4>
                        <p className="text-sm text-muted-foreground">Managed by {resource.agency}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {resource.available}/{resource.total}
                        </div>
                        <div className="text-sm text-muted-foreground">Available</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-orange-600" />
                  Resource Requests
                </CardTitle>
                <CardDescription>Pending resource allocation requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: "REQ-001",
                      type: "Medical Supplies",
                      requestor: "Evacuation Center A",
                      priority: "High",
                      status: "Pending",
                    },
                    {
                      id: "REQ-002",
                      type: "Rescue Boats",
                      requestor: "Barangay San Miguel",
                      priority: "Critical",
                      status: "Approved",
                    },
                    {
                      id: "REQ-003",
                      type: "Food Supplies",
                      requestor: "DSWD Field Office",
                      priority: "Medium",
                      status: "In Transit",
                    },
                  ].map((request) => (
                    <div key={request.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{request.type}</h4>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              request.priority === "Critical"
                                ? "destructive"
                                : request.priority === "High"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {request.priority}
                          </Badge>
                          <Badge variant="outline">{request.status}</Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Requested by: {request.requestor}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        <Button size="sm">Approve</Button>
                      </div>
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
