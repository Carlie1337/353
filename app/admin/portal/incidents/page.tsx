"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Shield,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Clock,
  AlertTriangle,
  CheckCircle,
  Calendar,
  FileText,
} from "lucide-react"

export default function IncidentReports() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isCreateIncidentOpen, setIsCreateIncidentOpen] = useState(false)

  // Demo data
  const incidents = [
    {
      id: "INC-001",
      title: "Noise Complaint",
      reporter: "Juan Dela Cruz",
      type: "Disturbance",
      status: "Investigating",
      priority: "Medium",
      dateReported: "2024-05-20",
      location: "123 Main St, Zone 1",
      description: "Loud music from neighbor's house during late hours",
      assignedOfficer: "Officer Santos",
      avatar: "JD",
    },
    {
      id: "INC-002",
      title: "Theft Report",
      reporter: "Maria Santos",
      type: "Crime",
      status: "Open",
      priority: "High",
      dateReported: "2024-05-19",
      location: "456 Oak Ave, Zone 2",
      description: "Bicycle stolen from front yard",
      assignedOfficer: "Officer Garcia",
      avatar: "MS",
    },
    {
      id: "INC-003",
      title: "Stray Dogs",
      reporter: "Pedro Garcia",
      type: "Animal Control",
      status: "Resolved",
      priority: "Low",
      dateReported: "2024-05-15",
      location: "789 Pine Rd, Zone 3",
      description: "Pack of stray dogs causing disturbance",
      assignedOfficer: "Animal Control Unit",
      avatar: "PG",
    },
    {
      id: "INC-004",
      title: "Domestic Dispute",
      reporter: "Ana Reyes",
      type: "Domestic",
      status: "Under Review",
      priority: "High",
      dateReported: "2024-05-18",
      location: "321 Peace St, Zone 1",
      description: "Verbal altercation between neighbors",
      assignedOfficer: "Officer Cruz",
      avatar: "AR",
    },
  ]

  const stats = {
    totalIncidents: 89,
    openCases: 23,
    investigating: 15,
    resolved: 51,
    highPriority: 8,
  }

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.reporter.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || incident.status.toLowerCase().replace(" ", "") === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "destructive"
      case "Investigating":
        return "default"
      case "Under Review":
        return "secondary"
      case "Resolved":
        return "outline"
      default:
        return "secondary"
    }
  }

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

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto p-6 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white">Incident Reports</h2>
            <p className="text-slate-400">Manage blotter records and incident investigations</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-200">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Dialog open={isCreateIncidentOpen} onOpenChange={setIsCreateIncidentOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-red-600 to-orange-600">
                  <Plus className="mr-2 h-4 w-4" />
                  File Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] bg-slate-900 border-slate-800">
                <DialogHeader>
                  <DialogTitle className="text-white">File New Incident Report</DialogTitle>
                  <DialogDescription className="text-slate-400">Record a new incident or complaint</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="incidentTitle" className="text-right text-slate-300">
                      Title
                    </Label>
                    <Input id="incidentTitle" className="col-span-3 bg-slate-800 border-slate-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="reporter" className="text-right text-slate-300">
                      Reporter
                    </Label>
                    <Input id="reporter" className="col-span-3 bg-slate-800 border-slate-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="incidentType" className="text-right text-slate-300">
                      Type
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-slate-800 border-slate-700">
                        <SelectValue placeholder="Select incident type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="crime">Crime</SelectItem>
                        <SelectItem value="disturbance">Disturbance</SelectItem>
                        <SelectItem value="domestic">Domestic</SelectItem>
                        <SelectItem value="animal">Animal Control</SelectItem>
                        <SelectItem value="property">Property Damage</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="priority" className="text-right text-slate-300">
                      Priority
                    </Label>
                    <Select>
                      <SelectTrigger className="col-span-3 bg-slate-800 border-slate-700">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="incidentLocation" className="text-right text-slate-300">
                      Location
                    </Label>
                    <Input id="incidentLocation" className="col-span-3 bg-slate-800 border-slate-700" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="incidentDescription" className="text-right text-slate-300">
                      Description
                    </Label>
                    <Textarea id="incidentDescription" className="col-span-3 bg-slate-800 border-slate-700" />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateIncidentOpen(false)}
                    className="bg-slate-800 border-slate-700"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsCreateIncidentOpen(false)}
                    className="bg-gradient-to-r from-red-600 to-orange-600"
                  >
                    File Report
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Total Incidents</CardTitle>
              <FileText className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalIncidents}</div>
              <p className="text-xs text-slate-400">All time</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Open Cases</CardTitle>
              <AlertTriangle className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.openCases}</div>
              <p className="text-xs text-slate-400">Needs attention</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Investigating</CardTitle>
              <Clock className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.investigating}</div>
              <p className="text-xs text-slate-400">In progress</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">Resolved</CardTitle>
              <CheckCircle className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.resolved}</div>
              <p className="text-xs text-slate-400">Completed</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">High Priority</CardTitle>
              <Shield className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.highPriority}</div>
              <p className="text-xs text-slate-400">Urgent cases</p>
            </CardContent>
          </Card>
        </div>

        {/* Incident Reports Table */}
        <Card className="bg-slate-900/50 backdrop-blur-lg border border-slate-800">
          <CardHeader>
            <CardTitle className="text-white">Incident Reports</CardTitle>
            <CardDescription className="text-slate-400">
              Track and manage all incident reports and investigations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-slate-800 border-slate-700 text-white"
                />
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px] bg-slate-800 border-slate-700">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="underreview">Under Review</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-slate-800 border-slate-700 text-slate-200">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>

            <div className="rounded-lg border border-slate-800">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-800 hover:bg-slate-800/50">
                    <TableHead className="text-slate-300">Incident</TableHead>
                    <TableHead className="text-slate-300">Reporter</TableHead>
                    <TableHead className="text-slate-300">Type</TableHead>
                    <TableHead className="text-slate-300">Priority</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Assigned Officer</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIncidents.map((incident) => (
                    <TableRow key={incident.id} className="border-slate-800 hover:bg-slate-800/30">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{incident.title}</div>
                          <div className="text-sm text-slate-400">{incident.id}</div>
                          <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                            <Calendar className="h-3 w-3" />
                            {incident.dateReported}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-slate-700 text-slate-200">{incident.avatar}</AvatarFallback>
                          </Avatar>
                          <div className="font-medium text-white">{incident.reporter}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {incident.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(incident.priority)}>{incident.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(incident.status)}>{incident.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-slate-300">{incident.assignedOfficer}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="bg-slate-800 border-slate-700">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
