"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertTriangle,
  Plus,
  Search,
  MapPin,
  Clock,
  User,
  Camera,
  FileText,
  CheckCircle,
  AlertCircle,
  XCircle,
  Eye,
  Edit,
  MessageSquare,
  Users,
  TrendingUp,
} from "lucide-react"

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
    case "Closed":
      return "default"
    case "Investigating":
    case "Under Investigation":
      return "secondary"
    case "Reported":
      return "destructive"
    default:
      return "secondary"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Resolved":
    case "Closed":
      return CheckCircle
    case "Investigating":
    case "Under Investigation":
      return AlertCircle
    case "Reported":
      return XCircle
    default:
      return AlertTriangle
  }
}

export default function IncidentsPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState(false)

  const incidents = [
    {
      id: "INC-2024-015",
      type: "Noise Complaint",
      title: "Loud Music During Rest Hours",
      description:
        "Neighbor playing loud music during afternoon rest hours, disturbing multiple households in the area.",
      location: "Purok 2, Residential Area",
      coordinates: "7.0731, 125.6128",
      reportedBy: "Maria Santos",
      reporterContact: "09123456789",
      assignedTo: "Tanod Garcia",
      priority: "Low",
      status: "Investigating",
      createdAt: "2024-01-25 14:30:00",
      updatedAt: "2024-01-25 15:00:00",
      estimatedResolution: "2024-01-25 17:00:00",
      category: "Public Disturbance",
      witnesses: ["Juan Cruz", "Ana Reyes"],
      evidence: ["Audio recording", "Photos"],
      updates: [
        {
          timestamp: "2024-01-25 15:00:00",
          officer: "Tanod Garcia",
          action: "Responded to scene",
          notes: "Spoke with complainant and gathered initial information",
        },
        {
          timestamp: "2024-01-25 14:45:00",
          officer: "System",
          action: "Incident assigned",
          notes: "Assigned to Tanod Garcia for investigation",
        },
      ],
    },
    {
      id: "INC-2024-014",
      type: "Suspicious Activity",
      title: "Unknown Individuals Loitering",
      description:
        "Multiple unknown individuals observed loitering around closed shops in the market area after business hours.",
      location: "Purok 1, Market Area",
      coordinates: "7.0725, 125.6135",
      reportedBy: "Store Owner Association",
      reporterContact: "09987654321",
      assignedTo: "Tanod Santos",
      priority: "Medium",
      status: "Resolved",
      createdAt: "2024-01-25 13:15:00",
      updatedAt: "2024-01-25 14:30:00",
      estimatedResolution: "2024-01-25 16:00:00",
      category: "Security Concern",
      witnesses: ["Security Guard Lopez"],
      evidence: ["CCTV footage", "Photos"],
      resolution:
        "Individuals were identified as job seekers waiting for employment opportunities. Advised to wait in designated areas.",
      updates: [
        {
          timestamp: "2024-01-25 14:30:00",
          officer: "Tanod Santos",
          action: "Case resolved",
          notes: "Individuals identified and situation resolved peacefully",
        },
        {
          timestamp: "2024-01-25 13:45:00",
          officer: "Tanod Santos",
          action: "Investigation started",
          notes: "Arrived at scene and began questioning individuals",
        },
      ],
    },
    {
      id: "INC-2024-013",
      type: "Traffic Violation",
      title: "Motorcycle Without Safety Gear",
      description: "Motorcycle rider observed without helmet and proper license plate at main road junction.",
      location: "Main Road Junction",
      coordinates: "7.0728, 125.6142",
      reportedBy: "Traffic Volunteer",
      reporterContact: "09555123456",
      assignedTo: "Tanod Cruz",
      priority: "Low",
      status: "Under Investigation",
      createdAt: "2024-01-25 12:00:00",
      updatedAt: "2024-01-25 12:30:00",
      estimatedResolution: "2024-01-25 18:00:00",
      category: "Traffic Safety",
      witnesses: ["Traffic Volunteer Team"],
      evidence: ["Photos", "Violation report"],
      updates: [
        {
          timestamp: "2024-01-25 12:30:00",
          officer: "Tanod Cruz",
          action: "Evidence collected",
          notes: "Photos taken and violation report filed",
        },
      ],
    },
    {
      id: "INC-2024-012",
      type: "Domestic Disturbance",
      title: "Family Dispute Resolution",
      description: "Loud argument between family members requiring mediation and peaceful resolution.",
      location: "Purok 3, House #45",
      coordinates: "7.0722, 125.6118",
      reportedBy: "Neighbor",
      reporterContact: "09777888999",
      assignedTo: "Tanod Reyes",
      priority: "High",
      status: "Resolved",
      createdAt: "2024-01-25 10:30:00",
      updatedAt: "2024-01-25 12:00:00",
      estimatedResolution: "2024-01-25 14:00:00",
      category: "Domestic Issue",
      witnesses: ["Barangay Mediator"],
      evidence: ["Mediation agreement"],
      resolution: "Family dispute resolved through mediation. Agreement signed by all parties.",
      updates: [
        {
          timestamp: "2024-01-25 12:00:00",
          officer: "Tanod Reyes",
          action: "Case resolved",
          notes: "Mediation successful, agreement reached",
        },
        {
          timestamp: "2024-01-25 11:00:00",
          officer: "Tanod Reyes",
          action: "Mediation started",
          notes: "Barangay mediator called in to assist",
        },
      ],
    },
  ]

  const incidentTypes = [
    "Noise Complaint",
    "Suspicious Activity",
    "Traffic Violation",
    "Domestic Disturbance",
    "Theft/Robbery",
    "Vandalism",
    "Public Disturbance",
    "Emergency Response",
    "Other",
  ]

  const priorities = ["Low", "Medium", "High", "Critical"]
  const statuses = ["Reported", "Investigating", "Under Investigation", "Resolved", "Closed"]

  const filteredIncidents = incidents.filter((incident) => {
    const matchesSearch =
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || incident.status === filterStatus
    const matchesPriority = filterPriority === "all" || incident.priority === filterPriority

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && !["Resolved", "Closed"].includes(incident.status)) ||
      (activeTab === "resolved" && ["Resolved", "Closed"].includes(incident.status)) ||
      (activeTab === "high-priority" && ["High", "Critical"].includes(incident.priority))

    return matchesSearch && matchesStatus && matchesPriority && matchesTab
  })

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8 pt-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Incident Management</h1>
          <p className="text-gray-600 mt-1">Track, manage, and resolve security incidents</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <Dialog open={isNewIncidentOpen} onOpenChange={setIsNewIncidentOpen}>
            <DialogTrigger asChild>
              <Button className="bg-red-600 hover:bg-red-700">
                <Plus className="h-4 w-4 mr-2" />
                Report Incident
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Report New Incident</DialogTitle>
                <DialogDescription>Fill out the form below to report a new security incident</DialogDescription>
              </DialogHeader>
              <NewIncidentForm onClose={() => setIsNewIncidentOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Incidents</p>
                <p className="text-2xl md:text-3xl font-bold text-red-600">
                  {incidents.filter((i) => !["Resolved", "Closed"].includes(i.status)).length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Today</p>
                <p className="text-2xl md:text-3xl font-bold text-green-600">
                  {incidents.filter((i) => i.status === "Resolved").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl md:text-3xl font-bold text-orange-600">
                  {incidents.filter((i) => ["High", "Critical"].includes(i.priority)).length}
                </p>
              </div>
              <AlertCircle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl md:text-3xl font-bold text-blue-600">4.2m</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search incidents by ID, title, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  {priorities.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto">
          <TabsTrigger value="active" className="flex items-center gap-2 py-3">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Active</span>
            <Badge variant="secondary" className="ml-1">
              {incidents.filter((i) => !["Resolved", "Closed"].includes(i.status)).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved" className="flex items-center gap-2 py-3">
            <CheckCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Resolved</span>
            <Badge variant="secondary" className="ml-1">
              {incidents.filter((i) => ["Resolved", "Closed"].includes(i.status)).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="high-priority" className="flex items-center gap-2 py-3">
            <AlertCircle className="h-4 w-4" />
            <span className="hidden sm:inline">High Priority</span>
            <Badge variant="destructive" className="ml-1">
              {incidents.filter((i) => ["High", "Critical"].includes(i.priority)).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-2 py-3">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">All</span>
            <Badge variant="secondary" className="ml-1">
              {incidents.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredIncidents.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No incidents found</h3>
                <p className="text-gray-600">No incidents match your current filters.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredIncidents.map((incident) => (
                <IncidentCard key={incident.id} incident={incident} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function IncidentCard({ incident }: { incident: any }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const StatusIcon = getStatusIcon(incident.status)

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex items-center justify-center w-10 h-10 bg-red-100 rounded-full flex-shrink-0">
              <StatusIcon className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="font-medium text-gray-900">{incident.id}</span>
                <Badge variant={getPriorityColor(incident.priority)}>{incident.priority}</Badge>
                <Badge variant={getStatusColor(incident.status)}>{incident.status}</Badge>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{incident.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{incident.description}</p>
              <div className="flex flex-wrap items-center text-xs text-gray-500 gap-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {incident.location}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {new Date(incident.createdAt).toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {incident.assignedTo}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 w-full lg:w-auto">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex-1 lg:flex-none"
            >
              <Eye className="h-4 w-4 mr-2" />
              {isExpanded ? "Hide" : "View"} Details
            </Button>
            <Button size="sm" className="flex-1 lg:flex-none">
              <Edit className="h-4 w-4 mr-2" />
              Update
            </Button>
          </div>
        </div>

        {isExpanded && (
          <div className="border-t pt-4 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Incident Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{incident.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{incident.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Reported By:</span>
                      <span className="font-medium">{incident.reportedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contact:</span>
                      <span className="font-medium">{incident.reporterContact}</span>
                    </div>
                  </div>
                </div>

                {incident.witnesses && incident.witnesses.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Witnesses</h4>
                    <div className="space-y-1">
                      {incident.witnesses.map((witness, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span>{witness}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {incident.evidence && incident.evidence.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Evidence</h4>
                    <div className="space-y-1">
                      {incident.evidence.map((evidence, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Camera className="h-3 w-3 text-gray-400" />
                          <span>{evidence}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {incident.resolution && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Resolution</h4>
                    <p className="text-sm text-gray-600">{incident.resolution}</p>
                  </div>
                )}
              </div>
            </div>

            {incident.updates && incident.updates.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Activity Timeline</h4>
                <div className="space-y-3">
                  {incident.updates.map((update, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full flex-shrink-0">
                        <MessageSquare className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{update.action}</span>
                          <span className="text-xs text-gray-500">by {update.officer}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{update.notes}</p>
                        <span className="text-xs text-gray-500">{new Date(update.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function NewIncidentForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    location: "",
    priority: "Medium",
    reportedBy: "",
    reporterContact: "",
    category: "",
  })

  const incidentTypes = [
    "Noise Complaint",
    "Suspicious Activity",
    "Traffic Violation",
    "Domestic Disturbance",
    "Theft/Robbery",
    "Vandalism",
    "Public Disturbance",
    "Emergency Response",
    "Other",
  ]

  const categories = [
    "Public Disturbance",
    "Security Concern",
    "Traffic Safety",
    "Domestic Issue",
    "Criminal Activity",
    "Property Damage",
    "Emergency Response",
    "Other",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("New incident:", formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Incident Type</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select incident type" />
            </SelectTrigger>
            <SelectContent>
              {incidentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="priority">Priority Level</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Incident Title</Label>
        <Input
          id="title"
          placeholder="Brief description of the incident"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Detailed Description</Label>
        <Textarea
          id="description"
          placeholder="Provide detailed information about the incident..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Specific location of the incident"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reportedBy">Reported By</Label>
          <Input
            id="reportedBy"
            placeholder="Name of person reporting"
            value={formData.reportedBy}
            onChange={(e) => setFormData({ ...formData, reportedBy: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="reporterContact">Contact Number</Label>
          <Input
            id="reporterContact"
            placeholder="Phone number"
            value={formData.reporterContact}
            onChange={(e) => setFormData({ ...formData, reporterContact: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
          <AlertTriangle className="h-4 w-4 mr-2" />
          Report Incident
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
          Cancel
        </Button>
      </div>
    </form>
  )
}
