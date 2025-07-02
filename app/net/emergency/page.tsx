"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Siren, Phone, Clock, MapPin, AlertTriangle, Users, Radio } from "lucide-react"

export default function EmergencyPage() {
  const emergencyCalls = [
    {
      id: "EMG-2024-001",
      type: "Medical Emergency",
      location: "Main Street & 5th Ave",
      caller: "Anonymous",
      priority: "High",
      status: "Responding",
      timeReceived: "14:30",
      responseTime: "3 min",
      assignedUnit: "UNIT-01",
    },
    {
      id: "EMG-2024-002",
      type: "Fire Emergency",
      location: "Residential Block 3",
      caller: "Maria Santos",
      priority: "Critical",
      status: "En Route",
      timeReceived: "13:45",
      responseTime: "2 min",
      assignedUnit: "UNIT-02, FIRE-01",
    },
    {
      id: "EMG-2024-003",
      type: "Robbery in Progress",
      location: "Market Area",
      caller: "Store Owner",
      priority: "High",
      status: "Resolved",
      timeReceived: "12:15",
      responseTime: "4 min",
      assignedUnit: "UNIT-03",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Responding":
        return "bg-yellow-100 text-yellow-800"
      case "En Route":
        return "bg-blue-100 text-blue-800"
      case "On Scene":
        return "bg-orange-100 text-orange-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800"
      case "High":
        return "bg-orange-100 text-orange-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Emergency Response</h1>
          <p className="text-muted-foreground">Manage emergency calls and response coordination</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Radio className="h-4 w-4 mr-2" />
            Dispatch
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Siren className="h-4 w-4 mr-2" />
            Emergency Alert
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Emergencies</CardTitle>
            <Siren className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently responding</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-0.8 min</span> improvement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Units Available</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Ready for dispatch</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls Today</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+6 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Hotlines */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">Emergency Hotlines</CardTitle>
          <CardDescription className="text-red-600">Quick access to emergency contacts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <Phone className="h-8 w-8 text-red-600" />
              <div>
                <div className="font-medium">Police Emergency</div>
                <div className="text-lg font-bold text-red-600">117</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <Siren className="h-8 w-8 text-orange-600" />
              <div>
                <div className="font-medium">Fire Department</div>
                <div className="text-lg font-bold text-orange-600">116</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
              <AlertTriangle className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-medium">Medical Emergency</div>
                <div className="text-lg font-bold text-blue-600">911</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Emergencies */}
      <Card>
        <CardHeader>
          <CardTitle>Active Emergency Calls</CardTitle>
          <CardDescription>Current emergency situations requiring response</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Call ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Caller</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Assigned Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emergencyCalls.map((call) => (
                <TableRow key={call.id}>
                  <TableCell className="font-medium">{call.id}</TableCell>
                  <TableCell>{call.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                      {call.location}
                    </div>
                  </TableCell>
                  <TableCell>{call.caller}</TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(call.priority)}>{call.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(call.status)}>{call.status}</Badge>
                  </TableCell>
                  <TableCell>{call.timeReceived}</TableCell>
                  <TableCell>{call.responseTime}</TableCell>
                  <TableCell>{call.assignedUnit}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Dispatch</CardTitle>
            <CardDescription>Rapidly deploy emergency response units</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Emergency Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select emergency type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="fire">Fire Emergency</SelectItem>
                  <SelectItem value="crime">Crime in Progress</SelectItem>
                  <SelectItem value="accident">Traffic Accident</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input placeholder="Enter emergency location..." />
            </div>
            <div>
              <label className="text-sm font-medium">Available Unit</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select unit to dispatch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unit-01">UNIT-01 (Patrol)</SelectItem>
                  <SelectItem value="unit-02">UNIT-02 (Emergency)</SelectItem>
                  <SelectItem value="unit-03">UNIT-03 (Traffic)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              <Siren className="h-4 w-4 mr-2" />
              Dispatch Unit
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Response Statistics</CardTitle>
            <CardDescription>Emergency response performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Medical Emergencies</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Fire Emergencies</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-6 h-2 bg-red-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Crime Reports</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-8 h-2 bg-yellow-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Traffic Accidents</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div className="w-4 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
