"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Camera, Users, AlertTriangle, Search, Plus, Eye, MapPin } from "lucide-react"

export default function SecurityPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const securityIncidents = [
    {
      id: 1,
      type: "Theft",
      location: "Purok 1, Main Street",
      reporter: "Juan Santos",
      status: "Under Investigation",
      priority: "Medium",
      date: "2024-01-15",
      assignedTo: "Tanod Garcia",
    },
    {
      id: 2,
      type: "Noise Complaint",
      location: "Purok 2, Rizal Ave",
      reporter: "Maria Cruz",
      status: "Resolved",
      priority: "Low",
      date: "2024-01-14",
      assignedTo: "Tanod Reyes",
    },
    {
      id: 3,
      type: "Vandalism",
      location: "Purok 3, School Area",
      reporter: "Pedro Lopez",
      status: "In Progress",
      priority: "High",
      date: "2024-01-13",
      assignedTo: "Tanod Santos",
    },
    {
      id: 4,
      type: "Suspicious Activity",
      location: "Purok 4, Market Area",
      reporter: "Ana Garcia",
      status: "Monitoring",
      priority: "Medium",
      date: "2024-01-12",
      assignedTo: "Tanod Cruz",
    },
  ]

  const securityPersonnel = [
    { name: "Tanod Garcia", shift: "Day Shift", area: "Purok 1-2", status: "On Duty" },
    { name: "Tanod Reyes", shift: "Night Shift", area: "Purok 3-4", status: "On Duty" },
    { name: "Tanod Santos", shift: "Day Shift", area: "Market Area", status: "On Patrol" },
    { name: "Tanod Cruz", shift: "Night Shift", area: "School Zone", status: "Off Duty" },
  ]

  const cameraLocations = [
    { location: "Main Entrance", status: "Online", lastCheck: "2024-01-15 18:00" },
    { location: "Market Area", status: "Online", lastCheck: "2024-01-15 18:00" },
    { location: "School Zone", status: "Offline", lastCheck: "2024-01-15 12:00" },
    { location: "Basketball Court", status: "Online", lastCheck: "2024-01-15 18:00" },
  ]

  const stats = [
    { title: "Active Incidents", value: "3", icon: AlertTriangle, color: "text-red-600" },
    { title: "Security Personnel", value: "8", icon: Users, color: "text-blue-600" },
    { title: "CCTV Cameras", value: "12", icon: Camera, color: "text-green-600" },
    { title: "Patrol Areas", value: "6", icon: Shield, color: "text-purple-600" },
  ]

  const filteredIncidents = securityIncidents.filter(
    (incident) =>
      incident.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.reporter.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "default"
      case "Under Investigation":
        return "destructive"
      case "In Progress":
        return "destructive"
      case "Monitoring":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getCameraStatusColor = (status: string) => {
    switch (status) {
      case "Online":
        return "default"
      case "Offline":
        return "destructive"
      case "Maintenance":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Security Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor security incidents and manage surveillance systems</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Report Incident
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Incidents */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Security Incidents</CardTitle>
                  <CardDescription>Recent security reports and investigations</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Reporter</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.map((incident) => (
                    <TableRow key={incident.id}>
                      <TableCell className="font-medium">{incident.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {incident.location}
                        </div>
                      </TableCell>
                      <TableCell>{incident.reporter}</TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(incident.priority)}>{incident.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(incident.status)}>{incident.status}</Badge>
                      </TableCell>
                      <TableCell>{incident.assignedTo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Security Personnel */}
          <Card>
            <CardHeader>
              <CardTitle>Security Personnel</CardTitle>
              <CardDescription>Current staff and patrol status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {securityPersonnel.map((person, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{person.name}</h4>
                    <Badge
                      variant={person.status === "On Duty" || person.status === "On Patrol" ? "default" : "secondary"}
                    >
                      {person.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{person.shift}</p>
                    <p>Area: {person.area}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* CCTV Status */}
          <Card>
            <CardHeader>
              <CardTitle>CCTV Surveillance</CardTitle>
              <CardDescription>Camera status and monitoring</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cameraLocations.map((camera, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{camera.location}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant={getCameraStatusColor(camera.status)}>{camera.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Last check: {new Date(camera.lastCheck).toLocaleString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
