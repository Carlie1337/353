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
import { Building2, Eye, Edit, Users, Search, Plus, MapPin, Map, Home } from "lucide-react"
import { WorkingGoogleMap } from "@/components/working-google-map"

export default function BMSHouseholdsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const households = [
    {
      id: "HH-001",
      number: "2024-001",
      headOfFamily: "Maria Santos",
      address: "123 Main St, Purok 1",
      type: "Nuclear Family",
      members: 4,
      income: 25000,
      classification: "Middle Income",
      status: "active",
      location: {
        lat: 14.5995,
        lng: 120.9842,
        verified: true,
        registrationDate: "2024-01-15",
        verificationDate: "2024-01-20",
        houseType: "Concrete",
        lotSize: "120 sqm",
        houseSize: "80 sqm",
      },
      members_list: [
        { name: "Maria Santos", age: 34, relation: "Head", occupation: "Teacher" },
        { name: "Pedro Santos", age: 36, relation: "Spouse", occupation: "Engineer" },
        { name: "Ana Santos", age: 12, relation: "Child", occupation: "Student" },
        { name: "Jose Santos", age: 8, relation: "Child", occupation: "Student" },
      ],
      utilities: ["Electricity", "Water", "Internet"],
      programs: ["4Ps", "Senior Citizen Benefits"],
    },
    {
      id: "HH-002",
      number: "2024-002",
      headOfFamily: "Juan Dela Cruz",
      address: "456 Oak Ave, Purok 2",
      type: "Single Parent",
      members: 2,
      income: 15000,
      classification: "Low Income",
      status: "active",
      location: {
        lat: 14.6005,
        lng: 120.9852,
        verified: false,
        registrationDate: "2024-01-25",
        verificationDate: null,
        houseType: "Semi-concrete",
        lotSize: "100 sqm",
        houseSize: "60 sqm",
      },
      members_list: [
        { name: "Juan Dela Cruz", age: 42, relation: "Head", occupation: "Driver" },
        { name: "Lisa Dela Cruz", age: 16, relation: "Child", occupation: "Student" },
      ],
      utilities: ["Electricity", "Water"],
      programs: ["4Ps", "Scholarship Program"],
    },
    {
      id: "HH-003",
      number: "2024-003",
      headOfFamily: "Ana Rodriguez",
      address: "789 Pine St, Purok 3",
      type: "Extended Family",
      members: 6,
      income: 35000,
      classification: "Middle Income",
      status: "active",
      location: {
        lat: 14.5985,
        lng: 120.9832,
        verified: true,
        registrationDate: "2024-01-10",
        verificationDate: "2024-01-12",
        houseType: "Concrete",
        lotSize: "150 sqm",
        houseSize: "100 sqm",
      },
      members_list: [
        { name: "Ana Rodriguez", age: 28, relation: "Head", occupation: "Store Owner" },
        { name: "Carlos Rodriguez", age: 30, relation: "Spouse", occupation: "Mechanic" },
        { name: "Elena Rodriguez", age: 55, relation: "Mother-in-law", occupation: "Retired" },
        { name: "Miguel Rodriguez", age: 10, relation: "Child", occupation: "Student" },
        { name: "Sofia Rodriguez", age: 6, relation: "Child", occupation: "Student" },
        { name: "Baby Rodriguez", age: 1, relation: "Child", occupation: "N/A" },
      ],
      utilities: ["Electricity", "Water", "Internet", "Cable TV"],
      programs: ["Senior Citizen Benefits"],
    },
  ]

  const getClassificationBadge = (classification: string) => {
    switch (classification) {
      case "High Income":
        return <Badge className="bg-green-100 text-green-800">High Income</Badge>
      case "Middle Income":
        return <Badge className="bg-blue-100 text-blue-800">Middle Income</Badge>
      case "Low Income":
        return <Badge className="bg-orange-100 text-orange-800">Low Income</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Household Management</h1>
          <p className="text-gray-600">Manage household records and information</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Household
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Households</p>
                <p className="text-2xl font-bold text-gray-900">1,156</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Members</p>
                <p className="text-2xl font-bold text-green-600">4.2</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Income</p>
                <p className="text-2xl font-bold text-orange-600">342</p>
              </div>
              <Building2 className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-blue-600">8</p>
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
              <Label htmlFor="search">Search Households</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by household number, head of family, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Label htmlFor="type">Type Filter</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="nuclear">Nuclear Family</SelectItem>
                  <SelectItem value="extended">Extended Family</SelectItem>
                  <SelectItem value="single">Single Parent</SelectItem>
                  <SelectItem value="elderly">Elderly Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Households Table */}
      <Card>
        <CardHeader>
          <CardTitle>Household Records</CardTitle>
          <CardDescription>{households.length} households found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Household #</TableHead>
                <TableHead>Head of Family</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Income</TableHead>
                <TableHead>Classification</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {households.map((household) => (
                <TableRow key={household.id}>
                  <TableCell className="font-mono">{household.number}</TableCell>
                  <TableCell className="font-medium">{household.headOfFamily}</TableCell>
                  <TableCell className="max-w-xs truncate">{household.address}</TableCell>
                  <TableCell>{household.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin
                        className={`h-4 w-4 ${household.location.verified ? "text-green-600" : "text-orange-600"}`}
                      />
                      <span className="text-xs">{household.location.verified ? "Verified" : "Pending"}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {household.members}
                    </div>
                  </TableCell>
                  <TableCell>₱{household.income.toLocaleString()}</TableCell>
                  <TableCell>{getClassificationBadge(household.classification)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Household Details - {household.number}</DialogTitle>
                            <DialogDescription>Complete household and property information</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Basic Information */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Household Number</Label>
                                <p className="text-sm font-mono">{household.number}</p>
                              </div>
                              <div>
                                <Label>Head of Family</Label>
                                <p className="text-sm font-medium">{household.headOfFamily}</p>
                              </div>
                              <div>
                                <Label>Household Type</Label>
                                <p className="text-sm">{household.type}</p>
                              </div>
                              <div>
                                <Label>Total Members</Label>
                                <p className="text-sm">{household.members} members</p>
                              </div>
                              <div>
                                <Label>Monthly Income</Label>
                                <p className="text-sm">₱{household.income.toLocaleString()}</p>
                              </div>
                              <div>
                                <Label>Classification</Label>
                                <p className="text-sm">{household.classification}</p>
                              </div>
                              <div className="col-span-2">
                                <Label>Address</Label>
                                <p className="text-sm flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {household.address}
                                </p>
                              </div>
                            </div>

                            {/* Location & Property Information */}
                            <div className="border-t pt-4">
                              <h3 className="text-lg font-semibold mb-4">Property & Location Information</h3>
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Coordinates</Label>
                                      <p className="text-sm font-mono">
                                        {household.location.lat.toFixed(6)}, {household.location.lng.toFixed(6)}
                                      </p>
                                    </div>
                                    <div>
                                      <Label>Location Status</Label>
                                      <div className="flex items-center gap-2">
                                        <MapPin
                                          className={`h-4 w-4 ${household.location.verified ? "text-green-600" : "text-orange-600"}`}
                                        />
                                        <span
                                          className={`text-sm font-medium ${household.location.verified ? "text-green-600" : "text-orange-600"}`}
                                        >
                                          {household.location.verified ? "Verified" : "Pending Verification"}
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <Label>House Type</Label>
                                      <p className="text-sm">{household.location.houseType}</p>
                                    </div>
                                    <div>
                                      <Label>Lot Size</Label>
                                      <p className="text-sm">{household.location.lotSize}</p>
                                    </div>
                                    <div>
                                      <Label>House Size</Label>
                                      <p className="text-sm">{household.location.houseSize}</p>
                                    </div>
                                    <div>
                                      <Label>Registration Date</Label>
                                      <p className="text-sm">{household.location.registrationDate}</p>
                                    </div>
                                  </div>

                                  {/* Utilities */}
                                  <div>
                                    <Label>Available Utilities</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {household.utilities.map((utility, index) => (
                                        <Badge key={index} variant="outline">
                                          {utility}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Programs */}
                                  <div>
                                    <Label>Enrolled Programs</Label>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      {household.programs.map((program, index) => (
                                        <Badge key={index} className="bg-blue-100 text-blue-800">
                                          {program}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Action Buttons */}
                                  <div className="flex gap-2 pt-4">
                                    <Button size="sm" variant="outline">
                                      <Map className="h-4 w-4 mr-2" />
                                      View on Map
                                    </Button>
                                    {!household.location.verified && (
                                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                        <Home className="h-4 w-4 mr-2" />
                                        Verify Property
                                      </Button>
                                    )}
                                  </div>
                                </div>

                                {/* Interactive Map */}
                                <div className="bg-gray-50 rounded-lg p-4">
                                  <WorkingGoogleMap
                                    userRole="bms"
                                    userId={household.id}
                                    userName={household.headOfFamily}
                                    initialLat={household.location.lat}
                                    initialLng={household.location.lng}
                                    editable={true}
                                    height="300px"
                                    onLocationChange={(lat, lng) => {
                                      console.log(
                                        `Household location updated for ${household.headOfFamily}: ${lat}, ${lng}`,
                                      )
                                      // Here you would update the database
                                    }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Household Members */}
                            <div className="border-t pt-4">
                              <h3 className="text-lg font-semibold mb-4">Household Members</h3>
                              <div className="space-y-2">
                                {household.members_list.map((member, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-sm font-medium text-blue-600">
                                          {member.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                        </span>
                                      </div>
                                      <div>
                                        <p className="font-medium">{member.name}</p>
                                        <p className="text-sm text-gray-600">
                                          {member.relation} • {member.age} years old
                                        </p>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm font-medium">{member.occupation}</p>
                                    </div>
                                  </div>
                                ))}
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
