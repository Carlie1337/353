"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Clock, Users, Plus, Edit, UserCheck, AlertCircle } from "lucide-react"

export default function DutyPage() {
  const todaySchedule = [
    {
      time: "06:00 - 14:00",
      shift: "Morning",
      officer: "Officer Martinez",
      status: "On Duty",
      location: "Patrol Unit 1",
    },
    {
      time: "06:00 - 14:00",
      shift: "Morning",
      officer: "Officer Santos",
      status: "On Duty",
      location: "Barangay Hall",
    },
    {
      time: "14:00 - 22:00",
      shift: "Afternoon",
      officer: "Officer Cruz",
      status: "Scheduled",
      location: "Patrol Unit 2",
    },
    {
      time: "14:00 - 22:00",
      shift: "Afternoon",
      officer: "Officer Reyes",
      status: "Scheduled",
      location: "School Zone",
    },
    { time: "22:00 - 06:00", shift: "Night", officer: "Officer Garcia", status: "Scheduled", location: "Night Patrol" },
    {
      time: "22:00 - 06:00",
      shift: "Night",
      officer: "Officer Lopez",
      status: "Scheduled",
      location: "Emergency Response",
    },
  ]

  const weeklySchedule = [
    { day: "Monday", morning: "Martinez, Santos", afternoon: "Cruz, Reyes", night: "Garcia, Lopez" },
    { day: "Tuesday", morning: "Cruz, Garcia", afternoon: "Martinez, Lopez", night: "Santos, Reyes" },
    { day: "Wednesday", morning: "Reyes, Lopez", afternoon: "Santos, Garcia", night: "Martinez, Cruz" },
    { day: "Thursday", morning: "Santos, Martinez", afternoon: "Garcia, Cruz", night: "Reyes, Lopez" },
    { day: "Friday", morning: "Garcia, Reyes", afternoon: "Lopez, Martinez", night: "Santos, Cruz" },
    { day: "Saturday", morning: "Lopez, Cruz", afternoon: "Reyes, Santos", night: "Martinez, Garcia" },
    { day: "Sunday", morning: "Martinez, Santos", afternoon: "Cruz, Reyes", night: "Garcia, Lopez" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Duty":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Off Duty":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Duty & Schedule</h1>
          <p className="text-muted-foreground">Manage officer schedules and duty assignments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Schedule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Duty Now</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">Officers active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Officers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Available personnel</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overtime Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Absences</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Current duty assignments for {new Date().toLocaleDateString()}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Shift</TableHead>
                <TableHead>Officer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {todaySchedule.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{schedule.time}</TableCell>
                  <TableCell>{schedule.shift}</TableCell>
                  <TableCell>{schedule.officer}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
                  </TableCell>
                  <TableCell>{schedule.location}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Weekly Schedule Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule Overview</CardTitle>
          <CardDescription>Officer assignments for the current week</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Day</TableHead>
                <TableHead>Morning (06:00-14:00)</TableHead>
                <TableHead>Afternoon (14:00-22:00)</TableHead>
                <TableHead>Night (22:00-06:00)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {weeklySchedule.map((day, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{day.day}</TableCell>
                  <TableCell>{day.morning}</TableCell>
                  <TableCell>{day.afternoon}</TableCell>
                  <TableCell>{day.night}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
