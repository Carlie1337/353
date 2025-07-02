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
  Stethoscope,
  Search,
  Filter,
  Plus,
  User,
  Calendar,
  Clock,
  FileText,
  Heart,
  Activity,
  AlertCircle,
  CheckCircle,
  Eye,
  Edit,
} from "lucide-react"

export default function ConsultationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const consultations = [
    {
      id: 1,
      consultationId: "CONS-2024-001",
      patientName: "Maria Santos",
      patientId: "P-2024-001",
      date: "2024-01-24",
      time: "09:00 AM",
      provider: "Dr. Cruz",
      status: "completed",
      chiefComplaint: "Headache and dizziness",
      diagnosis: "Hypertension",
      vitals: {
        bp: "150/90",
        temp: "36.5°C",
        pulse: "82",
        weight: "65kg",
      },
      notes: "Patient reports frequent headaches. BP elevated. Prescribed medication and lifestyle changes.",
    },
    {
      id: 2,
      consultationId: "CONS-2024-002",
      patientName: "Juan Dela Cruz",
      patientId: "P-2024-002",
      date: "2024-01-24",
      time: "10:30 AM",
      provider: "Dr. Reyes",
      status: "in-progress",
      chiefComplaint: "Follow-up for diabetes",
      diagnosis: "Type 2 Diabetes",
      vitals: {
        bp: "130/85",
        temp: "36.2°C",
        pulse: "75",
        weight: "70kg",
      },
      notes: "Regular diabetes follow-up. Blood sugar levels stable.",
    },
    {
      id: 3,
      consultationId: "CONS-2024-003",
      patientName: "Ana Garcia",
      patientId: "P-2024-003",
      date: "2024-01-24",
      time: "11:00 AM",
      provider: "Dr. Santos",
      status: "waiting",
      chiefComplaint: "Prenatal check-up",
      diagnosis: "Normal pregnancy",
      vitals: {
        bp: "120/80",
        temp: "36.8°C",
        pulse: "88",
        weight: "68kg",
      },
      notes: "24 weeks pregnant. All parameters normal.",
    },
  ]

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesSearch =
      consultation.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.consultationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || consultation.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "destructive"
      case "waiting":
        return "secondary"
      case "cancelled":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "waiting":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const stats = [
    { title: "Total Consultations", value: consultations.length.toString(), subtitle: "All consultations" },
    {
      title: "Today",
      value: consultations.filter((c) => c.date === "2024-01-24").length.toString(),
      subtitle: "Consultations today",
    },
    {
      title: "Completed",
      value: consultations.filter((c) => c.status === "completed").length.toString(),
      subtitle: "Completed consultations",
    },
    {
      title: "In Progress",
      value: consultations.filter((c) => c.status === "in-progress").length.toString(),
      subtitle: "Currently ongoing",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Consultations</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage patient consultations and medical visits</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Start New Consultation
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

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Consultations</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>All Consultations</CardTitle>
                  <CardDescription>Complete consultation records</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search consultations..."
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
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="waiting">Waiting</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Consultation ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Chief Complaint</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell className="font-medium">{consultation.consultationId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{consultation.patientName}</p>
                            <p className="text-sm text-gray-500">{consultation.patientId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{new Date(consultation.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">{consultation.time}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-gray-500" />
                          {consultation.provider}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-48">
                          <p className="font-medium truncate">{consultation.chiefComplaint}</p>
                          <p className="text-sm text-gray-500 truncate">{consultation.diagnosis}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(consultation.status)}
                          <Badge variant={getStatusColor(consultation.status)}>{consultation.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          {consultation.status === "waiting" && (
                            <Button variant="ghost" size="sm">
                              Start
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredConsultations
              .filter((c) => c.date === "2024-01-24")
              .map((consultation) => (
                <Card key={consultation.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{consultation.patientName}</CardTitle>
                        <CardDescription>{consultation.consultationId}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(consultation.status)}
                        <Badge variant={getStatusColor(consultation.status)}>{consultation.status}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Time:</p>
                        <p>{consultation.time}</p>
                      </div>
                      <div>
                        <p className="font-medium">Provider:</p>
                        <p>{consultation.provider}</p>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium text-sm">Chief Complaint:</p>
                      <p className="text-sm text-gray-600">{consultation.chiefComplaint}</p>
                    </div>

                    <div>
                      <p className="font-medium text-sm">Vital Signs:</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span>BP: {consultation.vitals.bp}</span>
                        <span>Temp: {consultation.vitals.temp}</span>
                        <span>Pulse: {consultation.vitals.pulse}</span>
                        <span>Weight: {consultation.vitals.weight}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {consultation.status === "waiting" && (
                        <Button size="sm" className="flex-1">
                          Start Consultation
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Consultation History</CardTitle>
              <CardDescription>Historical consultation data and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Consultation history and analytics</p>
                <p className="text-sm text-gray-400">Historical trends and patient visit patterns</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <h3 className="font-medium">Record Vitals</h3>
            <p className="text-sm text-gray-600">Record patient vital signs</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">Add Diagnosis</h3>
            <p className="text-sm text-gray-600">Record diagnosis and treatment</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">Generate Report</h3>
            <p className="text-sm text-gray-600">Create consultation report</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
