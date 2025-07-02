"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Eye, MapPin, Clock, CheckCircle, Search, Phone } from "lucide-react"

export default function BMSIncidentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")

  const incidents = [
    {
      id: "INC-2024-001",
      type: "Medical Emergency",
      description: "Elderly resident fell and injured leg",
      location: "123 Main St, Purok 1",
      severity: "high",
      status: "resolved",
      reportedBy: "Maria Santos",
      reportedDate: "2024-01-15 14:30",
      resolvedDate: "2024-01-15 15:45",
      assignedTo: "Emergency Response Team",
    },
    {
      id: "INC-2024-002",
      type: "Fire Incident",
      description: "Small kitchen fire in residential area",
      location: "456 Oak Ave, Purok 2",
      severity: "medium",
      status: "in_progress",
      reportedBy: "Juan Dela Cruz",
      reportedDate: "2024-01-15 16:20",
      resolvedDate: null,
      assignedTo: "Fire Department",
    },
    {
      id: "INC-2024-003",
      type: "Noise Complaint",
      description: "Loud music disturbing neighbors",
      location: "789 Pine St, Purok 3",
      severity: "low",
      status: "reported",
      reportedBy: "Ana Rodriguez",
      reportedDate: "2024-01-15 22:15",
      resolvedDate: null,
      assignedTo: "Barangay Tanod",
    },
  ]

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "reported":
        return <Badge variant="secondary">Reported</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
      case "resolved":
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>
      case "closed":
        return <Badge variant="outline">Closed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Incident Management</h1>
        <p className="text-gray-600">Monitor and manage reported incidents</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Incidents</p>
                <p className="text-2xl font-bold text-gray-900">47</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-blue-600">7</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-red-600">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Incidents</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by incident ID, type, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="status">Status Filter</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="reported">Reported</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="severity">Severity Filter</Label>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severity</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Incident Reports</CardTitle>
          <CardDescription>{incidents.length} incidents found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Incident ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reported</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-mono">{incident.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(incident.status)}
                      {incident.type}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="max-w-xs truncate">{incident.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{getSeverityBadge(incident.severity)}</TableCell>
                  <TableCell>{getStatusBadge(incident.status)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{incident.reportedDate}</p>
                      <p className="text-gray-600">by {incident.reportedBy}</p>
                    </div>
                  </TableCell>
                  <TableCell>{incident.assignedTo}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Incident Details - {incident.id}</DialogTitle>
                            <DialogDescription>Complete incident information and response</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Incident ID</Label>
                                <p className="text-sm font-mono">{incident.id}</p>
                              </div>
                              <div>
                                <Label>Type</Label>
                                <p className="text-sm">{incident.type}</p>
                              </div>
                              <div>
                                <Label>Severity Level</Label>
                                <div>{getSeverityBadge(incident.severity)}</div>
                              </div>
                              <div>
                                <Label>Current Status</Label>
                                <div>{getStatusBadge(incident.status)}</div>
                              </div>
                              <div>
                                <Label>Reported By</Label>
                                <p className="text-sm">{incident.reportedBy}</p>
                              </div>
                              <div>
                                <Label>Assigned To</Label>
                                <p className="text-sm">{incident.assignedTo}</p>
                              </div>
                              <div>
                                <Label>Reported Date</Label>
                                <p className="text-sm">{incident.reportedDate}</p>
                              </div>
                              <div>
                                <Label>Resolved Date</Label>
                                <p className="text-sm">{incident.resolvedDate || "Not resolved"}</p>
                              </div>
                            </div>
                            <div>
                              <Label>Location</Label>
                              <p className="text-sm flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {incident.location}
                              </p>
                            </div>
                            <div>
                              <Label>Description</Label>
                              <p className="text-sm text-gray-600">{incident.description}</p>
                            </div>
                            <div className="flex gap-2 pt-4">
                              <Button variant="outline" className="flex-1">
                                <Phone className="h-4 w-4 mr-2" />
                                Contact Reporter
                              </Button>
                              <Button className="flex-1">Update Status</Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
