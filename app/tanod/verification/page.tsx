"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, Search, Filter, Download, Calendar, Users, TrendingUp } from "lucide-react"

export default function VerificationPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterPurpose, setFilterPurpose] = useState("all")
  const [filterTanod, setFilterTanod] = useState("all")

  const verifications = [
    {
      id: "VER-2024-089",
      residentId: "RES-2025-0089",
      residentName: "Juan Dela Cruz",
      purpose: "Document Pickup",
      tanod: "Tanod Garcia",
      location: "Barangay Hall",
      timestamp: "2025-01-20 14:30",
      duration: "2 minutes",
      notes: "Picked up barangay clearance",
      status: "Completed",
    },
    {
      id: "VER-2024-088",
      residentId: "RES-2025-0067",
      residentName: "Maria Santos",
      purpose: "Health Center Visit",
      tanod: "Tanod Santos",
      location: "Health Center",
      timestamp: "2025-01-20 13:45",
      duration: "1 minute",
      notes: "Regular checkup appointment",
      status: "Completed",
    },
    {
      id: "VER-2024-087",
      residentId: "RES-2025-0123",
      residentName: "Pedro Garcia",
      purpose: "Community Event",
      tanod: "Tanod Cruz",
      location: "Community Center",
      timestamp: "2025-01-20 12:15",
      duration: "1 minute",
      notes: "Attending barangay assembly",
      status: "Completed",
    },
    {
      id: "VER-2024-086",
      residentId: "RES-2025-0045",
      residentName: "Ana Reyes",
      purpose: "Emergency",
      tanod: "Tanod Garcia",
      location: "Barangay Hall",
      timestamp: "2025-01-20 11:30",
      duration: "3 minutes",
      notes: "Reporting water leak in area",
      status: "Completed",
    },
    {
      id: "VER-2024-085",
      residentId: "RES-2025-0156",
      residentName: "Carlos Lopez",
      purpose: "Barangay Business",
      tanod: "Tanod Reyes",
      location: "Barangay Hall",
      timestamp: "2025-01-20 10:45",
      duration: "4 minutes",
      notes: "Business permit inquiry",
      status: "Completed",
    },
  ]

  const stats = [
    { title: "Total Verifications Today", value: "23", icon: UserCheck, color: "text-blue-600" },
    { title: "Average Verification Time", value: "2.1 min", icon: Calendar, color: "text-green-600" },
    { title: "Active Tanods", value: "6", icon: Users, color: "text-purple-600" },
    { title: "Success Rate", value: "98.5%", icon: TrendingUp, color: "text-orange-600" },
  ]

  const filteredVerifications = verifications.filter((verification) => {
    const matchesSearch =
      verification.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.residentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      verification.purpose.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPurpose = filterPurpose === "all" || verification.purpose === filterPurpose
    const matchesTanod = filterTanod === "all" || verification.tanod === filterTanod

    return matchesSearch && matchesPurpose && matchesTanod
  })

  const getPurposeColor = (purpose: string) => {
    switch (purpose) {
      case "Emergency":
        return "destructive"
      case "Health Center Visit":
        return "default"
      case "Document Pickup":
        return "secondary"
      case "Community Event":
        return "outline"
      default:
        return "secondary"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Resident Verification History</h1>
          <p className="text-muted-foreground">Track and manage all resident identity verifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            <UserCheck className="h-4 w-4 mr-2" />
            New Verification
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Verifications</CardTitle>
          <CardDescription>Find specific verification records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by resident name, ID, or purpose..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterPurpose} onValueChange={setFilterPurpose}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Purposes</SelectItem>
                <SelectItem value="Document Pickup">Document Pickup</SelectItem>
                <SelectItem value="Health Center Visit">Health Center Visit</SelectItem>
                <SelectItem value="Community Event">Community Event</SelectItem>
                <SelectItem value="Emergency">Emergency</SelectItem>
                <SelectItem value="Barangay Business">Barangay Business</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterTanod} onValueChange={setFilterTanod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by tanod" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tanods</SelectItem>
                <SelectItem value="Tanod Garcia">Tanod Garcia</SelectItem>
                <SelectItem value="Tanod Santos">Tanod Santos</SelectItem>
                <SelectItem value="Tanod Cruz">Tanod Cruz</SelectItem>
                <SelectItem value="Tanod Reyes">Tanod Reyes</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Verification Table */}
      <Card>
        <CardHeader>
          <CardTitle>Verification Records</CardTitle>
          <CardDescription>
            Showing {filteredVerifications.length} of {verifications.length} verification records
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Verification ID</TableHead>
                <TableHead>Resident</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Tanod</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVerifications.map((verification) => (
                <TableRow key={verification.id}>
                  <TableCell className="font-medium">{verification.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{verification.residentName}</p>
                      <p className="text-sm text-muted-foreground">{verification.residentId}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPurposeColor(verification.purpose)}>{verification.purpose}</Badge>
                  </TableCell>
                  <TableCell>{verification.tanod}</TableCell>
                  <TableCell>{verification.location}</TableCell>
                  <TableCell className="text-sm">{verification.timestamp}</TableCell>
                  <TableCell>{verification.duration}</TableCell>
                  <TableCell>
                    <Badge variant="default" className="bg-green-100 text-green-800">
                      {verification.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
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
