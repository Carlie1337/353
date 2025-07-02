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
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])

  const appointments = [
    {
      id: 1,
      appointmentId: "APT-2024-001",
      patientName: "Maria Santos",
      patientId: "P-2024-001",
      date: "2024-01-25",
      time: "09:00 AM",
      type: "General Consultation",
      provider: "Dr. Cruz",
      status: "confirmed",
      notes: "Regular check-up",
      phone: "09123456789",
    },
    {
      id: 2,
      appointmentId: "APT-2024-002",
      patientName: "Juan Dela Cruz",
      patientId: "P-2024-002",
      date: "2024-01-25",
      time: "10:30 AM",
      type: "Follow-up",
      provider: "Dr. Reyes",
      status: "in-progress",
      notes: "Diabetes follow-up",
      phone: "09234567890",
    },
    {
      id: 3,
      appointmentId: "APT-2024-003",
      patientName: "Ana Garcia",
      patientId: "P-2024-003",
      date: "2024-01-25",
      time: "11:00 AM",
      type: "Prenatal Check-up",
      provider: "Dr. Santos",
      status: "waiting",
      notes: "Monthly prenatal visit",
      phone: "09345678901",
    },
    {
      id: 4,
      appointmentId: "APT-2024-004",
      patientName: "Pedro Lopez",
      patientId: "P-2024-004",
      date: "2024-01-25",
      time: "02:00 PM",
      type: "Vaccination",
      provider: "Nurse Johnson",
      status: "completed",
      notes: "COVID-19 booster",
      phone: "09456789012",
    },
    {
      id: 5,
      appointmentId: "APT-2024-005",
      patientName: "Lisa Wong",
      patientId: "P-2024-005",
      date: "2024-01-26",
      time: "09:30 AM",
      type: "General Consultation",
      provider: "Dr. Cruz",
      status: "cancelled",
      notes: "Patient cancelled",
      phone: "09567890123",
    },
  ]

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.appointmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || appointment.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "in-progress":
        return "destructive"
      case "waiting":
        return "secondary"
      case "completed":
        return "default"
      case "cancelled":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "waiting":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const todayAppointments = appointments.filter((apt) => apt.date === selectedDate)
  const upcomingAppointments = appointments.filter((apt) => new Date(apt.date) > new Date(selectedDate))

  const stats = [
    { title: "Today's Appointments", value: todayAppointments.length.toString(), subtitle: "Scheduled for today" },
    {
      title: "Confirmed",
      value: appointments.filter((a) => a.status === "confirmed").length.toString(),
      subtitle: "Confirmed appointments",
    },
    {
      title: "In Progress",
      value: appointments.filter((a) => a.status === "in-progress").length.toString(),
      subtitle: "Currently ongoing",
    },
    {
      title: "Completed",
      value: appointments.filter((a) => a.status === "completed").length.toString(),
      subtitle: "Completed today",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Appointment Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage patient appointments and schedules</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Appointment
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
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>All Appointments</CardTitle>
                  <CardDescription>Complete list of patient appointments</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search appointments..."
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
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="waiting">Waiting</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
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
                    <TableHead>Appointment ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">{appointment.appointmentId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{appointment.patientName}</p>
                            <p className="text-sm text-gray-500">{appointment.patientId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{new Date(appointment.date).toLocaleDateString()}</p>
                            <p className="text-sm text-gray-500">{appointment.time}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Stethoscope className="h-4 w-4 text-gray-500" />
                          {appointment.type}
                        </div>
                      </TableCell>
                      <TableCell>{appointment.provider}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(appointment.status)}
                          <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                          {appointment.status === "waiting" && (
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
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>
                Appointments scheduled for {new Date(selectedDate).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-bold text-lg">{appointment.time}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.time.includes("AM") ? "Morning" : "Afternoon"}
                        </p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                        <p className="text-sm text-gray-500">with {appointment.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(appointment.status)}
                      <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    </div>
                  </div>
                ))}
                {todayAppointments.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No appointments scheduled for today</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Future scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-bold">{new Date(appointment.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-500">{appointment.time}</p>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{appointment.patientName}</p>
                        <p className="text-sm text-gray-600">{appointment.type}</p>
                        <p className="text-sm text-gray-500">with {appointment.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    </div>
                  </div>
                ))}
                {upcomingAppointments.length === 0 && (
                  <p className="text-center text-gray-500 py-8">No upcoming appointments scheduled</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar View</CardTitle>
              <CardDescription>Monthly appointment calendar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Calendar view coming soon</p>
                <p className="text-sm text-gray-400">Interactive calendar for appointment scheduling</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
