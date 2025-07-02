"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Calendar,
  Activity,
  Heart,
  Clock,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  Stethoscope,
  Pill,
} from "lucide-react"

export default function HealthPortalDashboard() {
  const [selectedDate] = useState(new Date().toISOString().split("T")[0])

  const stats = [
    { title: "Total Patients", value: "1,247", icon: Users, color: "text-blue-600", change: "+12%" },
    { title: "Today's Appointments", value: "24", icon: Calendar, color: "text-green-600", change: "+5%" },
    { title: "Active Cases", value: "89", icon: Activity, color: "text-orange-600", change: "-3%" },
    { title: "Health Programs", value: "12", icon: Heart, color: "text-red-600", change: "+2%" },
  ]

  const todayAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      patient: "Maria Santos",
      type: "General Consultation",
      status: "confirmed",
      doctor: "Dr. Cruz",
    },
    {
      id: 2,
      time: "10:30 AM",
      patient: "Juan Dela Cruz",
      type: "Follow-up",
      status: "in-progress",
      doctor: "Dr. Reyes",
    },
    {
      id: 3,
      time: "11:00 AM",
      patient: "Ana Garcia",
      type: "Prenatal Check-up",
      status: "waiting",
      doctor: "Dr. Santos",
    },
    {
      id: 4,
      time: "02:00 PM",
      patient: "Pedro Lopez",
      type: "Vaccination",
      status: "confirmed",
      doctor: "Nurse Johnson",
    },
  ]

  const recentActivities = [
    { action: "New patient registered", patient: "Lisa Wong", time: "10 minutes ago" },
    { action: "Appointment completed", patient: "Carlos Rivera", time: "25 minutes ago" },
    { action: "Medical record updated", patient: "Sofia Mendez", time: "1 hour ago" },
    { action: "Vaccination administered", patient: "Miguel Torres", time: "2 hours ago" },
  ]

  const healthAlerts = [
    { type: "warning", message: "Dengue cases increasing in Sitio 3", priority: "high" },
    { type: "info", message: "Flu vaccination drive next week", priority: "medium" },
    { type: "success", message: "COVID-19 cases decreasing", priority: "low" },
  ]

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
      default:
        return "secondary"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-600" />
      case "info":
        return <Activity className="h-4 w-4 text-blue-600" />
      case "success":
        return <UserCheck className="h-4 w-4 text-green-600" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health Portal Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome to the Barangay Health Management System</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Appointment
          </Button>
          <Button>
            <Users className="h-4 w-4 mr-2" />
            Register Patient
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <span className="text-sm text-green-600 flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {stat.change}
                    </span>
                  </div>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Today's Appointments</CardTitle>
                  <CardDescription>Scheduled appointments for {new Date().toLocaleDateString()}</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          {appointment.time}
                        </div>
                      </TableCell>
                      <TableCell>{appointment.patient}</TableCell>
                      <TableCell>{appointment.type}</TableCell>
                      <TableCell>{appointment.doctor}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Health Alerts & Recent Activity */}
        <div className="space-y-6">
          {/* Health Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Health Alerts</CardTitle>
              <CardDescription>Important health notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {healthAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <Badge variant="outline" className="mt-1">
                      {alert.priority} priority
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest health portal activities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.patient}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => (window.location.href = "/health-portal/consultations")}
        >
          <CardContent className="p-6 text-center">
            <Stethoscope className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">Start Consultation</h3>
            <p className="text-sm text-gray-600">Begin patient consultation</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => (window.location.href = "/health-portal/vaccinations")}
        >
          <CardContent className="p-6 text-center">
            <Pill className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">Record Vaccination</h3>
            <p className="text-sm text-gray-600">Log vaccination data</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => (window.location.href = "/health-portal/patients")}
        >
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <h3 className="font-medium">Patient Search</h3>
            <p className="text-sm text-gray-600">Find patient records</p>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => (window.location.href = "/health-portal/appointments")}
        >
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <h3 className="font-medium">View Schedule</h3>
            <p className="text-sm text-gray-600">Check daily schedule</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
