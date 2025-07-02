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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Eye, Edit, UserCheck, Search, Plus, Download } from "lucide-react"
import { Users } from "lucide-react"
import { SimpleLocationMap } from "@/components/simple-location-map"

export default function BMSResidentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const residents = [
    {
      id: "RES-001",
      name: "Maria Santos",
      age: 34,
      gender: "Female",
      address: "123 Main St, Purok 1",
      contact: "09123456789",
      status: "verified",
      household: "HH-001",
      occupation: "Teacher",
      civilStatus: "Married",
      location: {
        lat: 14.5995,
        lng: 120.9842,
        verified: true,
        registrationDate: "2024-01-15",
        verificationDate: "2024-01-20",
      },
      documents: ["Valid ID", "Birth Certificate", "Proof of Residence"],
    },
    {
      id: "RES-002",
      name: "Juan Dela Cruz",
      age: 42,
      gender: "Male",
      address: "456 Oak Ave, Purok 2",
      contact: "09987654321",
      status: "pending",
      household: "HH-002",
      occupation: "Driver",
      civilStatus: "Single",
      location: {
        lat: 14.6005,
        lng: 120.9852,
        verified: false,
        registrationDate: "2024-01-25",
        verificationDate: null,
      },
      documents: ["Valid ID", "Proof of Residence"],
    },
    {
      id: "RES-003",
      name: "Ana Rodriguez",
      age: 28,
      gender: "Female",
      address: "789 Pine St, Purok 3",
      contact: "09555123456",
      status: "verified",
      household: "HH-003",
      occupation: "Store Owner",
      civilStatus: "Married",
      location: {
        lat: 14.5985,
        lng: 120.9832,
        verified: true,
        registrationDate: "2024-01-10",
        verificationDate: "2024-01-12",
      },
      documents: ["Valid ID", "Birth Certificate", "Business Permit", "Proof of Residence"],
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Residents Management</h1>
          <p className="text-gray-600">Manage and verify resident information</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Resident
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Residents</p>
                <p className="text-2xl font-bold text-gray-900">2,847</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">2,654</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-orange-600">193</p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-blue-600">12</p>
              </div>
              <Plus className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Residents</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name, ID, or address..."
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
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Residents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Resident Records</CardTitle>
          <CardDescription>{residents.length} residents found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Resident</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Location Status</TableHead>
                <TableHead>Occupation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {resident.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{resident.name}</p>
                        <p className="text-sm text-gray-600">
                          {resident.age} years old, {resident.gender}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{resident.id}</TableCell>
                  <TableCell>{resident.contact}</TableCell>
                  <TableCell className="max-w-xs truncate">{resident.address}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin
                        className={`h-4 w-4 ${resident.location.verified ? "text-green-600" : "text-orange-600"}`}
                      />
                      <span className="text-sm">{resident.location.verified ? "Verified" : "Pending"}</span>
                    </div>
                  </TableCell>
                  <TableCell>{resident.occupation}</TableCell>
                  <TableCell>{getStatusBadge(resident.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Resident Details - {resident.name}</DialogTitle>
                            <DialogDescription>
                              Complete resident information and location verification
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Personal Information */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Full Name</Label>
                                <p className="text-sm font-medium">{resident.name}</p>
                              </div>
                              <div>
                                <Label>Resident ID</Label>
                                <p className="text-sm font-mono">{resident.id}</p>
                              </div>
                              <div>
                                <Label>Age</Label>
                                <p className="text-sm">{resident.age} years old</p>
                              </div>
                              <div>
                                <Label>Gender</Label>
                                <p className="text-sm">{resident.gender}</p>
                              </div>
                              <div>
                                <Label>Civil Status</Label>
                                <p className="text-sm">{resident.civilStatus}</p>
                              </div>
                              <div>
                                <Label>Occupation</Label>
                                <p className="text-sm">{resident.occupation}</p>
                              </div>
                              <div className="col-span-2">
                                <Label>Address</Label>
                                <p className="text-sm">{resident.address}</p>
                              </div>
                              <div>
                                <Label>Contact Number</Label>
                                <p className="text-sm">{resident.contact}</p>
                              </div>
                              <div>
                                <Label>Household ID</Label>
                                <p className="text-sm font-mono">{resident.household}</p>
                              </div>
                            </div>

                            {/* Location Information */}
                            <div className="border-t pt-4">
                              <h3 className="text-lg font-semibold mb-4">Location Information</h3>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Registration Date</Label>
                                      <p className="text-sm">{resident.location.registrationDate}</p>
                                    </div>
                                    <div>
                                      <Label>Verification Date</Label>
                                      <p className="text-sm">
                                        {resident.location.verificationDate || "Not yet verified"}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Documents */}
                                  <div>
                                    <Label>Submitted Documents</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {resident.documents.map((doc, index) => (
                                        <Badge key={index} variant="outline">
                                          {doc}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>

                                {/* Location Map */}
                                <div>
                                  <SimpleLocationMap
                                    userRole="bms"
                                    userId={resident.id}
                                    userName={resident.name}
                                    initialLat={resident.location.lat}
                                    initialLng={resident.location.lng}
                                    editable={true}
                                    height="350px"
                                    onLocationChange={(lat, lng) => {
                                      console.log(`Location updated for ${resident.name}: ${lat}, ${lng}`)
                                      // Here you would update the database
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
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
    </div>
  )
}
