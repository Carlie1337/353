"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Search, Filter, Eye, Edit, Calendar, MapPin, User, Clock } from "lucide-react"

export default function BlotterRecords() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isNewEntryOpen, setIsNewEntryOpen] = useState(false)

  const blotterEntries = [
    {
      id: "BLT-2024-001",
      date: "2024-01-15",
      time: "14:30",
      incident: "Theft",
      complainant: "Maria Santos",
      respondent: "Unknown",
      location: "Purok 1, Main Street",
      status: "Under Investigation",
      officer: "NET-PO1 Cruz",
      priority: "Medium",
      description: "Reported theft of motorcycle parked outside residence",
    },
    {
      id: "BLT-2024-002",
      date: "2024-01-15",
      time: "09:15",
      incident: "Domestic Dispute",
      complainant: "Ana Garcia",
      respondent: "Roberto Garcia",
      location: "Purok 3, Rizal Avenue",
      status: "Resolved",
      officer: "NET-PO2 Reyes",
      priority: "High",
      description: "Domestic violence complaint, mediation conducted",
    },
    {
      id: "BLT-2024-003",
      date: "2024-01-14",
      time: "22:45",
      incident: "Noise Complaint",
      complainant: "Pedro Dela Cruz",
      respondent: "Karaoke Bar Owner",
      location: "Purok 2, Commercial Area",
      status: "Resolved",
      officer: "NET-PO3 Lopez",
      priority: "Low",
      description: "Excessive noise from karaoke establishment past curfew hours",
    },
  ]

  const filteredEntries = blotterEntries.filter(
    (entry) =>
      entry.incident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NET Blotter Records</h1>
          <p className="text-muted-foreground">Manage and track all incident reports and complaints - DEMO SYSTEM</p>
        </div>
        <Dialog open={isNewEntryOpen} onOpenChange={setIsNewEntryOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              New Blotter Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>New Blotter Entry</DialogTitle>
              <DialogDescription>Record a new incident or complaint in the blotter</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="incident-type">Incident Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select incident type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="theft">Theft</SelectItem>
                    <SelectItem value="assault">Assault</SelectItem>
                    <SelectItem value="domestic">Domestic Dispute</SelectItem>
                    <SelectItem value="noise">Noise Complaint</SelectItem>
                    <SelectItem value="vandalism">Vandalism</SelectItem>
                    <SelectItem value="traffic">Traffic Violation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="complainant">Complainant Name</Label>
                <Input id="complainant" placeholder="Enter complainant name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="respondent">Respondent Name</Label>
                <Input id="respondent" placeholder="Enter respondent name" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter incident location" />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of the incident" rows={4} />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsNewEntryOpen(false)}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Save Entry</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by incident type, complainant, or blotter ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Blotter Entries */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Entries</TabsTrigger>
          <TabsTrigger value="pending">Under Investigation</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Blotter Records</CardTitle>
              <CardDescription>Complete list of all recorded incidents and complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blotter ID</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Incident Type</TableHead>
                    <TableHead>Complainant</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Officer</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {entry.date}
                          <Clock className="h-3 w-3 ml-2 mr-1" />
                          {entry.time}
                        </div>
                      </TableCell>
                      <TableCell>{entry.incident}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {entry.complainant}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {entry.location}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.status === "Resolved" ? "default" : "secondary"}>{entry.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            entry.priority === "High"
                              ? "destructive"
                              : entry.priority === "Medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {entry.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{entry.officer}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Under Investigation</CardTitle>
              <CardDescription>Cases currently being investigated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No pending investigations at the moment</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Cases</CardTitle>
              <CardDescription>Successfully resolved incidents and complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Loading resolved cases...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Entries</CardTitle>
              <CardDescription>Blotter entries recorded today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No entries recorded today</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="opacity-20 text-gray-500 text-5xl font-bold rotate-[-20deg]">DEMO</div>
      </div>
    </div>
  )
}
