"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Plus, Search, Eye, Edit, Calendar, MapPin, User, CheckCircle, Clock, Download } from "lucide-react"

interface BlotterEntry {
  id: string
  caseNumber: string
  title: string
  type: string
  complainant: string
  respondent: string
  location: string
  dateReported: string
  dateIncident: string
  status: "pending" | "investigating" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
  description: string
  reportedBy: string
  assignedOfficer: string
  evidence: string[]
  witnesses: string[]
}

export default function BlotterPage() {
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false)

  const blotterEntries: BlotterEntry[] = [
    {
      id: "BLT001",
      caseNumber: "2024-001",
      title: "Noise Complaint",
      type: "Public Disturbance",
      complainant: "Maria Santos",
      respondent: "Juan Dela Cruz",
      location: "Purok 1, Block 5",
      dateReported: "2024-01-15",
      dateIncident: "2024-01-14",
      status: "investigating",
      priority: "medium",
      description: "Loud music and karaoke session disturbing neighbors late at night",
      reportedBy: "Officer Santos",
      assignedOfficer: "Officer Cruz",
      evidence: ["Audio recording", "Photos of setup"],
      witnesses: ["Pedro Garcia", "Ana Reyes"],
    },
    {
      id: "BLT002",
      caseNumber: "2024-002",
      title: "Theft Report",
      type: "Property Crime",
      complainant: "Roberto Martinez",
      respondent: "Unknown",
      location: "Public Market, Stall 15",
      dateReported: "2024-01-16",
      dateIncident: "2024-01-16",
      status: "pending",
      priority: "high",
      description: "Motorcycle stolen from market parking area during business hours",
      reportedBy: "Officer Garcia",
      assignedOfficer: "Officer Reyes",
      evidence: ["CCTV footage", "Witness statements"],
      witnesses: ["Market vendor", "Security guard"],
    },
    {
      id: "BLT003",
      caseNumber: "2024-003",
      title: "Domestic Dispute",
      type: "Family Dispute",
      complainant: "Elena Rodriguez",
      respondent: "Carlos Rodriguez",
      location: "Purok 2, House 23",
      dateReported: "2024-01-17",
      dateIncident: "2024-01-17",
      status: "resolved",
      priority: "urgent",
      description: "Verbal altercation between spouses, mediation requested",
      reportedBy: "Officer Dela Cruz",
      assignedOfficer: "Officer Santos",
      evidence: ["Mediation agreement"],
      witnesses: ["Neighbor testimony"],
    },
    {
      id: "BLT004",
      caseNumber: "2024-004",
      title: "Vandalism",
      type: "Property Damage",
      complainant: "Barangay Hall",
      respondent: "Minor (Name withheld)",
      location: "Barangay Hall Wall",
      dateReported: "2024-01-18",
      dateIncident: "2024-01-17",
      status: "closed",
      priority: "low",
      description: "Graffiti on barangay hall exterior wall, minor identified and parents notified",
      reportedBy: "Officer Garcia",
      assignedOfficer: "Officer Cruz",
      evidence: ["Photos of damage", "Cleaning receipt"],
      witnesses: ["Janitor", "CCTV footage"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "investigating":
        return "default"
      case "resolved":
        return "outline"
      case "closed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "investigating":
        return <Search className="h-4 w-4" />
      case "resolved":
        return <CheckCircle className="h-4 w-4" />
      case "closed":
        return <FileText className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "destructive"
      case "high":
        return "default"
      case "medium":
        return "outline"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const filteredEntries = blotterEntries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.caseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || entry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const selectedEntryData = blotterEntries.find((entry) => entry.id === selectedEntry)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Blotter Records</h1>
          <p className="text-muted-foreground">Incident reports and case management</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                New Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Blotter Entry</DialogTitle>
                <DialogDescription>Fill in the details for the new incident report</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Case Number</label>
                    <Input placeholder="Auto-generated" disabled />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Incident Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="disturbance">Public Disturbance</SelectItem>
                        <SelectItem value="theft">Property Crime</SelectItem>
                        <SelectItem value="dispute">Family Dispute</SelectItem>
                        <SelectItem value="vandalism">Property Damage</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input placeholder="Brief description of incident" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Complainant</label>
                    <Input placeholder="Name of complainant" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Respondent</label>
                    <Input placeholder="Name of respondent" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Location</label>
                    <Input placeholder="Incident location" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Detailed description of the incident" rows={4} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewEntryOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsNewEntryOpen(false)}>Create Entry</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cases</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">{blotterEntries.length}</p>
              </div>
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">
                  {blotterEntries.filter((e) => e.status === "pending").length}
                </p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Investigating</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">
                  {blotterEntries.filter((e) => e.status === "investigating").length}
                </p>
              </div>
              <Search className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolved</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">
                  {blotterEntries.filter((e) => e.status === "resolved" || e.status === "closed").length}
                </p>
              </div>
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Entries List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Blotter Entries</CardTitle>
                  <CardDescription>All incident reports and cases</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search entries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 w-full sm:w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="investigating">Investigating</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] w-full">
                <div className="space-y-4">
                  {filteredEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedEntry === entry.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedEntry(entry.id)}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {entry.caseNumber}
                            </Badge>
                            <Badge variant={getStatusColor(entry.status)} className="flex items-center gap-1">
                              {getStatusIcon(entry.status)}
                              {entry.status}
                            </Badge>
                            <Badge variant={getPriorityColor(entry.priority)} className="text-xs">
                              {entry.priority}
                            </Badge>
                          </div>
                          <h3 className="font-medium mb-1">{entry.title}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {entry.complainant}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {entry.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {entry.dateReported}
                            </div>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {entry.assignedOfficer}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Entry Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Entry Details</CardTitle>
              <CardDescription>
                {selectedEntry ? `Case ${selectedEntryData?.caseNumber}` : "Select an entry to view details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedEntryData ? (
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <div className="mt-1">
                        <Badge
                          variant={getStatusColor(selectedEntryData.status)}
                          className="flex items-center gap-1 w-fit"
                        >
                          {getStatusIcon(selectedEntryData.status)}
                          {selectedEntryData.status.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Title</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEntryData.title}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEntryData.type}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Complainant</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEntryData.complainant}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Respondent</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEntryData.respondent}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEntryData.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Date Reported</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEntryData.dateReported}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Assigned Officer</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEntryData.assignedOfficer}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <p className="text-sm text-muted-foreground mt-1">{selectedEntryData.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Evidence</label>
                      <div className="mt-1 space-y-1">
                        {selectedEntryData.evidence.map((item, index) => (
                          <Badge key={index} variant="outline" className="text-xs mr-1">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Witnesses</label>
                      <div className="mt-1 space-y-1">
                        {selectedEntryData.witnesses.map((witness, index) => (
                          <Badge key={index} variant="outline" className="text-xs mr-1">
                            {witness}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Entry
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Generate Report
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      View Documents
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a blotter entry to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
