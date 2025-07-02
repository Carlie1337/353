"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCheck, Clock, AlertCircle, Search, Eye, CheckCircle, XCircle, MapPin, Edit, Bell } from "lucide-react"

export default function BMSVerificationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data for verification queue
  const verificationQueue = [
    {
      id: "VER-001",
      residentId: "RES-001",
      name: "Maria Santos",
      type: "profile_edit",
      status: "pending",
      priority: "high",
      submittedDate: "2025-01-20",
      changes: ["Phone Number", "Address"],
      previousStatus: "fully-verified",
      newStatus: "semi-verified",
      reason: "Profile information updated",
    },
    {
      id: "VER-002",
      residentId: "RES-002",
      name: "Juan Dela Cruz",
      type: "new_registration",
      status: "pending",
      priority: "medium",
      submittedDate: "2025-01-19",
      changes: ["Email Verification", "Phone Verification"],
      previousStatus: "non-verified",
      newStatus: "semi-verified",
      reason: "Email and phone verified, awaiting location visit",
    },
    {
      id: "VER-003",
      residentId: "RES-003",
      name: "Ana Rodriguez",
      type: "location_verification",
      status: "scheduled",
      priority: "high",
      submittedDate: "2025-01-18",
      changes: ["House Location"],
      previousStatus: "semi-verified",
      newStatus: "pending_full_verification",
      reason: "Location visit scheduled for tomorrow",
      visitDate: "2025-01-21",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <MapPin className="w-3 h-3 mr-1" />
            Scheduled
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "profile_edit":
        return <Edit className="h-4 w-4 text-orange-600" />
      case "new_registration":
        return <UserCheck className="h-4 w-4 text-blue-600" />
      case "location_verification":
        return <MapPin className="h-4 w-4 text-green-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Verification Management</h1>
          <p className="text-gray-600">Review and process resident verification requests</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-red-600">
            <Bell className="w-3 h-3 mr-1" />3 Pending
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Verification</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Profile Edits</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <Edit className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Location Visits</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed Today</p>
                <p className="text-2xl font-bold text-green-600">5</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alert for Profile Edits */}
      <Alert className="border-orange-200 bg-orange-50">
        <Edit className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800">
          <strong>3 residents</strong> have edited their profiles and require re-verification. Their status has been
          changed to "Semi-Verified".
        </AlertDescription>
      </Alert>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Verification Requests</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, ID, or type..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Queue */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Queue</CardTitle>
          <CardDescription>{verificationQueue.length} verification requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="profile_edits">Profile Edits</TabsTrigger>
              <TabsTrigger value="new_registrations">New Registrations</TabsTrigger>
              <TabsTrigger value="location_visits">Location Visits</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Resident</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Changes</TableHead>
                    <TableHead>Status Change</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verificationQueue.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {request.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{request.name}</p>
                            <p className="text-sm text-gray-600 font-mono">{request.residentId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(request.type)}
                          <span className="text-sm capitalize">{request.type.replace("_", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {request.changes.map((change, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {change}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="text-gray-500">{request.previousStatus}</div>
                          <div className="text-gray-400">↓</div>
                          <div className="font-medium">{request.newStatus}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                      <TableCell className="text-sm">{request.submittedDate}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {request.status === "pending" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="destructive" size="sm">
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {request.type === "location_verification" && (
                            <Button variant="outline" size="sm">
                              <MapPin className="h-4 w-4 mr-1" />
                              Schedule Visit
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
