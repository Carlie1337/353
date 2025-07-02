"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Pill,
  Search,
  Filter,
  Plus,
  User,
  Calendar,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  Syringe,
  Heart,
  Baby,
} from "lucide-react"

export default function VaccinationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterVaccine, setFilterVaccine] = useState("all")

  const vaccinations = [
    {
      id: 1,
      vaccinationId: "VAC-2024-001",
      patientName: "Pedro Lopez",
      patientId: "P-2024-004",
      date: "2024-01-20",
      vaccine: "COVID-19 Booster",
      batchNumber: "CV-2024-001",
      provider: "Nurse Johnson",
      status: "completed",
      nextDue: null,
      age: 55,
      site: "Left arm",
      reactions: "None observed",
    },
    {
      id: 2,
      vaccinationId: "VAC-2024-002",
      patientName: "Baby Santos",
      patientId: "P-2024-005",
      date: "2024-01-22",
      vaccine: "BCG",
      batchNumber: "BCG-2024-002",
      provider: "Nurse Garcia",
      status: "completed",
      nextDue: "2024-03-22",
      age: 0.5,
      site: "Right arm",
      reactions: "Mild redness",
    },
    {
      id: 3,
      vaccinationId: "VAC-2024-003",
      patientName: "Maria Santos",
      patientId: "P-2024-001",
      date: "2024-01-25",
      vaccine: "Influenza",
      batchNumber: "FLU-2024-003",
      provider: "Dr. Cruz",
      status: "scheduled",
      nextDue: "2025-01-25",
      age: 45,
      site: "Left arm",
      reactions: "Pending",
    },
    {
      id: 4,
      vaccinationId: "VAC-2024-004",
      patientName: "Ana Garcia",
      patientId: "P-2024-003",
      date: "2024-01-18",
      vaccine: "Tetanus",
      batchNumber: "TET-2024-004",
      provider: "Nurse Johnson",
      status: "completed",
      nextDue: "2034-01-18",
      age: 28,
      site: "Right arm",
      reactions: "None observed",
    },
  ]

  const vaccineSchedule = [
    { vaccine: "COVID-19 Booster", dueDate: "2024-02-01", patients: 15, priority: "high" },
    { vaccine: "Influenza", dueDate: "2024-02-05", patients: 23, priority: "medium" },
    { vaccine: "Hepatitis B", dueDate: "2024-02-10", patients: 8, priority: "low" },
    { vaccine: "MMR", dueDate: "2024-02-15", patients: 12, priority: "medium" },
  ]

  const filteredVaccinations = vaccinations.filter((vaccination) => {
    const matchesSearch =
      vaccination.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccination.vaccinationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vaccination.vaccine.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter =
      filterVaccine === "all" || vaccination.vaccine.toLowerCase().includes(filterVaccine.toLowerCase())

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "scheduled":
        return "secondary"
      case "overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "overdue":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const stats = [
    { title: "Total Vaccinations", value: vaccinations.length.toString(), subtitle: "All vaccinations" },
    {
      title: "This Month",
      value: vaccinations.filter((v) => new Date(v.date).getMonth() === new Date().getMonth()).length.toString(),
      subtitle: "Vaccinations this month",
    },
    {
      title: "Completed",
      value: vaccinations.filter((v) => v.status === "completed").length.toString(),
      subtitle: "Completed vaccinations",
    },
    {
      title: "Scheduled",
      value: vaccinations.filter((v) => v.status === "scheduled").length.toString(),
      subtitle: "Upcoming vaccinations",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Vaccination Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Track and manage patient vaccinations</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Record Vaccination
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

      <Tabs defaultValue="records" className="space-y-6">
        <TabsList>
          <TabsTrigger value="records">Vaccination Records</TabsTrigger>
          <TabsTrigger value="schedule">Vaccine Schedule</TabsTrigger>
          <TabsTrigger value="inventory">Vaccine Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>Vaccination Records</CardTitle>
                  <CardDescription>Complete vaccination history</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search vaccinations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterVaccine} onValueChange={setFilterVaccine}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vaccines</SelectItem>
                      <SelectItem value="covid">COVID-19</SelectItem>
                      <SelectItem value="influenza">Influenza</SelectItem>
                      <SelectItem value="bcg">BCG</SelectItem>
                      <SelectItem value="tetanus">Tetanus</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vaccination ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Vaccine</TableHead>
                    <TableHead>Date Given</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVaccinations.map((vaccination) => (
                    <TableRow key={vaccination.id}>
                      <TableCell className="font-medium">{vaccination.vaccinationId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{vaccination.patientName}</p>
                            <p className="text-sm text-gray-500">{vaccination.patientId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Syringe className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{vaccination.vaccine}</p>
                            <p className="text-sm text-gray-500">{vaccination.batchNumber}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {new Date(vaccination.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{vaccination.provider}</TableCell>
                      <TableCell>
                        {vaccination.nextDue ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-orange-500" />
                            {new Date(vaccination.nextDue).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(vaccination.status)}
                          <Badge variant={getStatusColor(vaccination.status)}>{vaccination.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Certificate
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

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Vaccination Schedule</CardTitle>
              <CardDescription>Patients due for vaccinations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vaccineSchedule.map((schedule, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <Shield className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{schedule.vaccine}</p>
                        <p className="text-sm text-gray-600">Due: {new Date(schedule.dueDate).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">{schedule.patients} patients scheduled</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(schedule.priority)}>{schedule.priority} priority</Badge>
                      <Button size="sm">Schedule</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vaccine Inventory</CardTitle>
              <CardDescription>Current vaccine stock and expiry dates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Pill className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Vaccine inventory management</p>
                <p className="text-sm text-gray-400">Track vaccine stock, expiry dates, and reorder levels</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Syringe className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">Adult Vaccines</h3>
            <p className="text-sm text-gray-600">Schedule adult vaccinations</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Baby className="h-8 w-8 mx-auto mb-2 text-pink-600" />
            <h3 className="font-medium">Child Immunization</h3>
            <p className="text-sm text-gray-600">Pediatric vaccination schedule</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">Mass Vaccination</h3>
            <p className="text-sm text-gray-600">Community vaccination drives</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <h3 className="font-medium">Adverse Events</h3>
            <p className="text-sm text-gray-600">Report vaccination reactions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
