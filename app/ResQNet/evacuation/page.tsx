"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building,
  Users,
  CheckCircle,
  MapPin,
  Phone,
  Bed,
  Utensils,
  Droplets,
  Zap,
  Shield,
  Activity,
  RefreshCw,
  Plus,
} from "lucide-react"

interface EvacuationCenter {
  id: string
  name: string
  address: string
  coordinates: [number, number]
  capacity: number
  currentOccupancy: number
  status: "operational" | "full" | "maintenance" | "emergency-only"
  facilities: string[]
  contactPerson: string
  contactNumber: string
  lastUpdated: Date
  supplies: {
    food: number
    water: number
    medicine: number
    blankets: number
  }
  utilities: {
    power: boolean
    water: boolean
    internet: boolean
    generator: boolean
  }
  accessibility: {
    wheelchairAccessible: boolean
    medicalFacilities: boolean
    childFriendly: boolean
  }
}

interface Evacuee {
  id: string
  name: string
  age: number
  gender: string
  specialNeeds: string[]
  centerId: string
  checkInDate: Date
  familyMembers: number
}

export default function EvacuationManagement() {
  const [centers, setCenters] = useState<EvacuationCenter[]>([])
  const [evacuees, setEvacuees] = useState<Evacuee[]>([])
  const [selectedCenter, setSelectedCenter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    // Mock evacuation centers data
    const mockCenters: EvacuationCenter[] = [
      {
        id: "EC-001",
        name: "Barangay Bucana Elementary School",
        address: "Main Street, Purok 1, Barangay Bucana",
        coordinates: [14.676, 121.0437],
        capacity: 500,
        currentOccupancy: 245,
        status: "operational",
        facilities: ["Classrooms", "Gymnasium", "Kitchen", "Restrooms", "Medical Station"],
        contactPerson: "Principal Maria Cruz",
        contactNumber: "09123456789",
        lastUpdated: new Date(Date.now() - 15 * 60 * 1000),
        supplies: {
          food: 85,
          water: 92,
          medicine: 78,
          blankets: 88,
        },
        utilities: {
          power: true,
          water: true,
          internet: true,
          generator: true,
        },
        accessibility: {
          wheelchairAccessible: true,
          medicalFacilities: true,
          childFriendly: true,
        },
      },
      {
        id: "EC-002",
        name: "Bucana Community Center",
        address: "Rizal Avenue, Purok 3, Barangay Bucana",
        coordinates: [14.5995, 121.1794],
        capacity: 300,
        currentOccupancy: 298,
        status: "full",
        facilities: ["Main Hall", "Kitchen", "Storage", "Restrooms"],
        contactPerson: "Coordinator Juan Santos",
        contactNumber: "09234567890",
        lastUpdated: new Date(Date.now() - 5 * 60 * 1000),
        supplies: {
          food: 45,
          water: 38,
          medicine: 62,
          blankets: 25,
        },
        utilities: {
          power: true,
          water: false,
          internet: true,
          generator: true,
        },
        accessibility: {
          wheelchairAccessible: false,
          medicalFacilities: false,
          childFriendly: true,
        },
      },
      {
        id: "EC-003",
        name: "Bucana Sports Complex",
        address: "Highway Junction, Barangay Bucana",
        coordinates: [14.5995, 120.9842],
        capacity: 800,
        currentOccupancy: 0,
        status: "maintenance",
        facilities: ["Sports Hall", "Locker Rooms", "Cafeteria", "Parking"],
        contactPerson: "Manager Pedro Lopez",
        contactNumber: "09345678901",
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
        supplies: {
          food: 0,
          water: 0,
          medicine: 0,
          blankets: 0,
        },
        utilities: {
          power: false,
          water: false,
          internet: false,
          generator: false,
        },
        accessibility: {
          wheelchairAccessible: true,
          medicalFacilities: false,
          childFriendly: true,
        },
      },
    ]

    const mockEvacuees: Evacuee[] = [
      {
        id: "EV-001",
        name: "Ana Garcia",
        age: 34,
        gender: "Female",
        specialNeeds: ["Pregnant"],
        centerId: "EC-001",
        checkInDate: new Date(Date.now() - 6 * 60 * 60 * 1000),
        familyMembers: 3,
      },
      {
        id: "EV-002",
        name: "Roberto Mendez",
        age: 67,
        gender: "Male",
        specialNeeds: ["Wheelchair", "Medication"],
        centerId: "EC-001",
        checkInDate: new Date(Date.now() - 4 * 60 * 60 * 1000),
        familyMembers: 1,
      },
      {
        id: "EV-003",
        name: "Sofia Reyes",
        age: 28,
        gender: "Female",
        specialNeeds: [],
        centerId: "EC-002",
        checkInDate: new Date(Date.now() - 8 * 60 * 60 * 1000),
        familyMembers: 4,
      },
    ]

    setCenters(mockCenters)
    setEvacuees(mockEvacuees)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "default"
      case "full":
        return "destructive"
      case "maintenance":
        return "secondary"
      case "emergency-only":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500"
    if (percentage >= 75) return "bg-yellow-500"
    if (percentage >= 50) return "bg-blue-500"
    return "bg-green-500"
  }

  const getSupplyColor = (percentage: number) => {
    if (percentage <= 25) return "bg-red-500"
    if (percentage <= 50) return "bg-yellow-500"
    return "bg-green-500"
  }

  const filteredCenters = centers.filter((center) => {
    const matchesCenter = selectedCenter === "all" || center.id === selectedCenter
    const matchesStatus = statusFilter === "all" || center.status === statusFilter
    return matchesCenter && matchesStatus
  })

  const totalCapacity = centers.reduce((sum, center) => sum + center.capacity, 0)
  const totalOccupancy = centers.reduce((sum, center) => sum + center.currentOccupancy, 0)
  const operationalCenters = centers.filter((center) => center.status === "operational").length
  const totalEvacuees = evacuees.length

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Evacuation Center Management</h1>
          <p className="text-muted-foreground">Monitor and manage evacuation centers and evacuees</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh Status
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Center
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across {centers.length} centers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Occupancy</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOccupancy.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalOccupancy / totalCapacity) * 100).toFixed(1)}% capacity used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operational Centers</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{operationalCenters}</div>
            <p className="text-xs text-muted-foreground">Out of {centers.length} total centers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Evacuees</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvacuees}</div>
            <p className="text-xs text-muted-foreground">Registered individuals</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Centers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={selectedCenter} onValueChange={setSelectedCenter}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select center" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Centers</SelectItem>
                {centers.map((center) => (
                  <SelectItem key={center.id} value={center.id}>
                    {center.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="full">Full</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
                <SelectItem value="emergency-only">Emergency Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Evacuation Centers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCenters.map((center) => {
          const occupancyPercentage = (center.currentOccupancy / center.capacity) * 100

          return (
            <Card key={center.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{center.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {center.address}
                    </CardDescription>
                  </div>
                  <Badge variant={getStatusColor(center.status)}>{center.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Occupancy */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Occupancy</span>
                    <span>
                      {center.currentOccupancy} / {center.capacity}
                    </span>
                  </div>
                  <Progress value={occupancyPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">{occupancyPercentage.toFixed(1)}% occupied</p>
                </div>

                {/* Supplies Status */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Supply Levels</h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Utensils className="h-3 w-3" />
                        <span>Food</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-white ${getSupplyColor(center.supplies.food)}`}>
                        {center.supplies.food}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Droplets className="h-3 w-3" />
                        <span>Water</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-white ${getSupplyColor(center.supplies.water)}`}>
                        {center.supplies.water}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        <span>Medicine</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-white ${getSupplyColor(center.supplies.medicine)}`}>
                        {center.supplies.medicine}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Bed className="h-3 w-3" />
                        <span>Blankets</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-white ${getSupplyColor(center.supplies.blankets)}`}>
                        {center.supplies.blankets}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Utilities */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Utilities</h4>
                  <div className="flex gap-2">
                    <Badge variant={center.utilities.power ? "default" : "destructive"}>
                      <Zap className="h-3 w-3 mr-1" />
                      Power
                    </Badge>
                    <Badge variant={center.utilities.water ? "default" : "destructive"}>
                      <Droplets className="h-3 w-3 mr-1" />
                      Water
                    </Badge>
                  </div>
                </div>

                {/* Contact */}
                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3" />
                    <span>{center.contactPerson}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{center.contactNumber}</p>
                  <p className="text-xs text-muted-foreground">Updated: {center.lastUpdated.toLocaleTimeString()}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Evacuees Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Evacuees</CardTitle>
          <CardDescription>List of registered evacuees across all centers</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Age/Gender</TableHead>
                <TableHead>Center</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Family Size</TableHead>
                <TableHead>Special Needs</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evacuees.map((evacuee) => {
                const center = centers.find((c) => c.id === evacuee.centerId)
                return (
                  <TableRow key={evacuee.id}>
                    <TableCell className="font-medium">{evacuee.name}</TableCell>
                    <TableCell>
                      {evacuee.age} / {evacuee.gender}
                    </TableCell>
                    <TableCell>{center?.name}</TableCell>
                    <TableCell>{evacuee.checkInDate.toLocaleDateString()}</TableCell>
                    <TableCell>{evacuee.familyMembers}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {evacuee.specialNeeds.map((need) => (
                          <Badge key={need} variant="outline" className="text-xs">
                            {need}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
