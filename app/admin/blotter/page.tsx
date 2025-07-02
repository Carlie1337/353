"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Search, Plus, Eye, Edit, AlertTriangle, Clock, CheckCircle } from "lucide-react"

export default function BlotterPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const blotterRecords = [
    {
      id: "BLT-2024-001",
      complainant: "Maria Santos",
      respondent: "Juan Dela Cruz",
      incident: "Noise Disturbance",
      description: "Loud music during late hours disturbing neighbors",
      dateReported: "2024-01-15",
      dateIncident: "2024-01-14",
      status: "Under Investigation",
      priority: "Medium",
      barangayOfficial: "Kagawad Rodriguez",
      location: "Zone 2, Block 5",
    },
    {
      id: "BLT-2024-002",
      complainant: "Pedro Lopez",
      respondent: "Ana Garcia",
      incident: "Property Dispute",
      description: "Boundary dispute between neighboring properties",
      dateReported: "2024-01-12",
      dateIncident: "2024-01-10",
      status: "Resolved",
      priority: "High",
      barangayOfficial: "Kagawad Martinez",
      location: "Zone 1, Block 3",
    },
    {
      id: "BLT-2024-003",
      complainant: "Rosa Fernandez",
      respondent: "Carlos Mendoza",
      incident: "Verbal Altercation",
      description: "Heated argument that escalated to threats",
      dateReported: "2024-01-10",
      dateIncident: "2024-01-09",
      status: "Mediation Scheduled",
      priority: "Medium",
      barangayOfficial: "Kagawad Silva",
      location: "Zone 3, Block 2",
    },
    {
      id: "BLT-2024-004",
      complainant: "Miguel Torres",
      respondent: "Elena Reyes",
      incident: "Damage to Property",
      description: "Accidental damage to fence during construction",
      dateReported: "2024-01-08",
      dateIncident: "2024-01-07",
      status: "Closed",
      priority: "Low",
      barangayOfficial: "Kagawad Gonzales",
      location: "Zone 2, Block 1",
    },
  ]

  const stats = [
    { title: "Total Cases", value: "156", icon: FileText, color: "text-blue-600" },
    { title: "Active Cases", value: "23", icon: Clock, color: "text-yellow-600" },
    { title: "Resolved", value: "98", icon: CheckCircle, color: "text-green-600" },
    { title: "Pending", value: "35", icon: AlertTriangle, color: "text-red-600" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
      case "Closed":
        return "default"
      case "Under Investigation":
        return "destructive"
      case "Mediation Scheduled":
        return "secondary"
      case "Pending":
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

  const filteredRecords = blotterRecords.filter(
    (record) =>
      record.complainant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.respondent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.incident.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Barangay Blotter</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage incident reports and dispute resolution</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Blotter Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Blotter Entry</DialogTitle>
              <DialogDescription>Record a new incident or complaint</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="complainant">Complainant</Label>
                  <Input id="complainant" placeholder="Full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="respondent">Respondent</Label>
                  <Input id="respondent" placeholder="Full name" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="incident-type">Incident Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="noise">Noise Disturbance</SelectItem>
                      <SelectItem value="property">Property Dispute</SelectItem>
                      <SelectItem value="verbal">Verbal Altercation</SelectItem>
                      <SelectItem value="damage">Damage to Property</SelectItem>
                      <SelectItem value="theft">Theft</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="incident-date">Date of Incident</Label>
                  <Input id="incident-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Zone, Block, Street" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of the incident" rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="official">Assigned Official</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select barangay official" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rodriguez">Kagawad Rodriguez</SelectItem>
                    <SelectItem value="martinez">Kagawad Martinez</SelectItem>
                    <SelectItem value="silva">Kagawad Silva</SelectItem>
                    <SelectItem value="gonzales">Kagawad Gonzales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Entry</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="active">Active Cases</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search blotter records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Blotter Records</CardTitle>
              <CardDescription>Complete list of incident reports and complaints</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blotter ID</TableHead>
                    <TableHead>Complainant</TableHead>
                    <TableHead>Respondent</TableHead>
                    <TableHead>Incident</TableHead>
                    <TableHead>Date Reported</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.id}</TableCell>
                      <TableCell>{record.complainant}</TableCell>
                      <TableCell>{record.respondent}</TableCell>
                      <TableCell>{record.incident}</TableCell>
                      <TableCell>{new Date(record.dateReported).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)}>{record.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(record.priority)}>{record.priority}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
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

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Cases</CardTitle>
              <CardDescription>Cases currently under investigation or mediation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords
                  .filter(
                    (record) => record.status === "Under Investigation" || record.status === "Mediation Scheduled",
                  )
                  .map((record) => (
                    <div key={record.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{record.id}</h3>
                            <Badge variant={getStatusColor(record.status)}>{record.status}</Badge>
                            <Badge variant={getPriorityColor(record.priority)}>{record.priority}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{record.incident}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Complainant:</span>
                              <p className="font-medium">{record.complainant}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Respondent:</span>
                              <p className="font-medium">{record.respondent}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Location:</span>
                              <p className="font-medium">{record.location}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Assigned to:</span>
                              <p className="font-medium">{record.barangayOfficial}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{record.description}</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Cases</CardTitle>
              <CardDescription>Successfully resolved incidents and disputes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords
                  .filter((record) => record.status === "Resolved" || record.status === "Closed")
                  .map((record) => (
                    <div
                      key={record.id}
                      className="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <h3 className="font-medium text-green-900 dark:text-green-100">{record.id}</h3>
                        <Badge variant="default">{record.status}</Badge>
                      </div>
                      <p className="text-green-800 dark:text-green-200 mb-2">{record.incident}</p>
                      <div className="text-sm text-green-600 dark:text-green-300">
                        {record.complainant} vs {record.respondent} • Resolved by {record.barangayOfficial}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Cases</CardTitle>
              <CardDescription>Cases awaiting action or response</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No pending cases</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  All cases have been assigned and are being processed.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
