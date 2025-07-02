"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Phone, MapPin, Clock, Users, Search } from "lucide-react"

export default function EmergencyPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const emergencyReports = [
    {
      id: 1,
      type: "Fire",
      location: "Purok 1, Main Street",
      reporter: "Juan Dela Cruz",
      status: "Resolved",
      priority: "High",
      time: "2024-01-15 14:30",
      responders: "BFP, Barangay Tanod",
    },
    {
      id: 2,
      type: "Medical Emergency",
      location: "Purok 3, Rizal Ave",
      reporter: "Maria Santos",
      status: "In Progress",
      priority: "Critical",
      time: "2024-01-15 16:45",
      responders: "Ambulance, Health Worker",
    },
    {
      id: 3,
      type: "Accident",
      location: "Purok 2, Highway",
      reporter: "Pedro Garcia",
      status: "Pending",
      priority: "Medium",
      time: "2024-01-15 18:20",
      responders: "Traffic Enforcer",
    },
    {
      id: 4,
      type: "Flood",
      location: "Purok 4, Riverside",
      reporter: "Ana Reyes",
      status: "Monitoring",
      priority: "High",
      time: "2024-01-15 20:15",
      responders: "MDRRMO, Barangay Team",
    },
  ]

  const stats = [
    { title: "Active Emergencies", value: "3", icon: AlertTriangle, color: "text-red-600" },
    { title: "Total Reports Today", value: "8", icon: Phone, color: "text-blue-600" },
    { title: "Response Teams", value: "12", icon: Users, color: "text-green-600" },
    { title: "Avg Response Time", value: "8 min", icon: Clock, color: "text-yellow-600" },
  ]

  const emergencyContacts = [
    { name: "Fire Department", number: "116", type: "Fire" },
    { name: "Police", number: "117", type: "Crime" },
    { name: "Medical Emergency", number: "911", type: "Medical" },
    { name: "MDRRMO", number: "(02) 123-4567", type: "Disaster" },
  ]

  const filteredReports = emergencyReports.filter(
    (report) =>
      report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive"
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
      case "In Progress":
        return "destructive"
      case "Pending":
        return "secondary"
      case "Monitoring":
        return "default"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Emergency Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor and respond to emergency situations</p>
        </div>
        <Button className="flex items-center gap-2 bg-red-600 hover:bg-red-700">
          <AlertTriangle className="h-4 w-4" />
          Report Emergency
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
        {/* Emergency Reports */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Emergency Reports</CardTitle>
                  <CardDescription>Recent emergency incidents and responses</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search reports..."
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
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {report.location}
                        </div>
                      </TableCell>
                      <TableCell>{report.reporter}</TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(report.priority)}>{report.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">{new Date(report.time).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Contacts */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Emergency Contacts</CardTitle>
              <CardDescription>Quick access to emergency services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-500">{contact.type}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-lg">{contact.number}</span>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
