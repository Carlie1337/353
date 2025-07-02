"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, UserPlus, Eye, Edit, Calendar, Phone, MapPin, User } from "lucide-react"

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const patients = [
    {
      id: 1,
      patientId: "P-2024-001",
      name: "Maria Santos",
      age: 45,
      gender: "Female",
      phone: "09123456789",
      address: "123 Main St, Sitio 1",
      lastVisit: "2024-01-15",
      status: "Active",
      condition: "Hypertension",
      isResident: true,
    },
    {
      id: 2,
      patientId: "P-2024-002",
      name: "Juan Dela Cruz",
      age: 32,
      gender: "Male",
      phone: "09234567890",
      address: "456 Oak Ave, Sitio 2",
      lastVisit: "2024-01-12",
      status: "Active",
      condition: "Diabetes",
      isResident: true,
    },
    {
      id: 3,
      patientId: "P-2024-003",
      name: "Ana Garcia",
      age: 28,
      gender: "Female",
      phone: "09345678901",
      address: "789 Pine St, Sitio 3",
      lastVisit: "2024-01-14",
      status: "Active",
      condition: "Pregnancy",
      isResident: true,
    },
    {
      id: 4,
      patientId: "P-2024-004",
      name: "Pedro Lopez",
      age: 55,
      gender: "Male",
      phone: "09456789012",
      address: "321 Elm St, Outside Barangay",
      lastVisit: "2024-01-10",
      status: "Inactive",
      condition: "Regular Check-up",
      isResident: false,
    },
  ]

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "active" && patient.status === "Active") ||
      (filterStatus === "inactive" && patient.status === "Inactive") ||
      (filterStatus === "residents" && patient.isResident) ||
      (filterStatus === "non-residents" && !patient.isResident)

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  const stats = [
    { title: "Total Patients", value: patients.length.toString(), subtitle: "Registered patients" },
    {
      title: "Active Patients",
      value: patients.filter((p) => p.status === "Active").length.toString(),
      subtitle: "Currently active",
    },
    {
      title: "Residents",
      value: patients.filter((p) => p.isResident).length.toString(),
      subtitle: "Barangay residents",
    },
    {
      title: "Non-Residents",
      value: patients.filter((p) => !p.isResident).length.toString(),
      subtitle: "External patients",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Patient Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage patient records and information</p>
        </div>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Register New Patient
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>Patient Records</CardTitle>
              <CardDescription>Search and manage patient information</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="residents">Residents</SelectItem>
                  <SelectItem value="non-residents">Non-Residents</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">{patient.patientId}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-gray-500">{patient.condition}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{patient.age} years</p>
                      <p className="text-gray-500">{patient.gender}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {patient.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-start gap-1 text-sm max-w-40">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span className="truncate">{patient.address}</span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(patient.lastVisit).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(patient.status)}>{patient.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={patient.isResident ? "default" : "outline"}>
                      {patient.isResident ? "Resident" : "Non-Resident"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Calendar className="h-4 w-4" />
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
