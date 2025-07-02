"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  CalendarIcon,
  Clock,
  Users,
  Plus,
  Edit,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Activity,
  MapPin,
} from "lucide-react"

export default function DutyPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const todaySchedule = [
    {
      id: "DUTY-001",
      time: "06:00 - 14:00",
      shift: "Morning",
      officer: "Tanod Garcia",
      status: "On Duty",
      location: "Patrol Unit 1",
      area: "Purok 1-2",
      checkIn: "05:58",
      checkOut: null,
      overtime: false,
    },
    {
      id: "DUTY-002",
      time: "06:00 - 14:00",
      shift: "Morning",
      officer: "Tanod Santos",
      status: "On Duty",
      location: "Barangay Hall",
      area: "Main Office",
      checkIn: "06:02",
      checkOut: null,
      overtime: false,
    },
    {
      id: "DUTY-003",
      time: "14:00 - 22:00",
      shift: "Afternoon",
      officer: "Tanod Cruz",
      status: "Scheduled",
      location: "Patrol Unit 2",
      area: "Purok 3-4",
      checkIn: null,
      checkOut: null,
      overtime: false,
    },
    {
      id: "DUTY-004",
      time: "14:00 - 22:00",
      shift: "Afternoon",
      officer: "Tanod Reyes",
      status: "Scheduled",
      location: "School Zone",
      area: "Educational District",
      checkIn: null,
      checkOut: null,
      overtime: false,
    },
    {
      id: "DUTY-005",
      time: "22:00 - 06:00",
      shift: "Night",
      officer: "Tanod Lopez",
      status: "Scheduled",
      location: "Night Patrol",
      area: "All Puroks",
      checkIn: null,
      checkOut: null,
      overtime: false,
    },
    {
      id: "DUTY-006",
      time: "22:00 - 06:00",
      shift: "Night",
      officer: "Tanod Mendoza",
      status: "Scheduled",
      location: "Emergency Response",
      area: "On-Call",
      checkIn: null,
      checkOut: null,
      overtime: false,
    },
  ]

  const weeklySchedule = [
    {
      day: "Monday",
      date: "2025-01-20",
      morning: ["Garcia", "Santos"],
      afternoon: ["Cruz", "Reyes"],
      night: ["Lopez", "Mendoza"],
      coverage: "100%",
    },
    {
      day: "Tuesday",
      date: "2025-01-21",
      morning: ["Cruz", "Lopez"],
      afternoon: ["Garcia", "Mendoza"],
      night: ["Santos", "Reyes"],
      coverage: "100%",
    },
    {
      day: "Wednesday",
      date: "2025-01-22",
      morning: ["Reyes", "Mendoza"],
      afternoon: ["Santos", "Lopez"],
      night: ["Garcia", "Cruz"],
      coverage: "100%",
    },
    {
      day: "Thursday",
      date: "2025-01-23",
      morning: ["Santos", "Garcia"],
      afternoon: ["Lopez", "Cruz"],
      night: ["Reyes", "Mendoza"],
      coverage: "100%",
    },
    {
      day: "Friday",
      date: "2025-01-24",
      morning: ["Lopez", "Reyes"],
      afternoon: ["Mendoza", "Garcia"],
      night: ["Santos", "Cruz"],
      coverage: "100%",
    },
    {
      day: "Saturday",
      date: "2025-01-25",
      morning: ["Mendoza", "Cruz"],
      afternoon: ["Reyes", "Santos"],
      night: ["Garcia", "Lopez"],
      coverage: "100%",
    },
    {
      day: "Sunday",
      date: "2025-01-26",
      morning: ["Garcia", "Santos"],
      afternoon: ["Cruz", "Reyes"],
      night: ["Lopez", "Mendoza"],
      coverage: "100%",
    },
  ]

  const attendanceRecords = [
    {
      id: "ATT-001",
      officer: "Tanod Garcia",
      date: "2025-01-20",
      shift: "Morning",
      checkIn: "05:58",
      checkOut: "14:05",
      totalHours: "8h 7m",
      overtime: "7m",
      status: "Present",
    },
    {
      id: "ATT-002",
      officer: "Tanod Santos",
      date: "2025-01-19",
      shift: "Morning",
      checkIn: "06:00",
      checkOut: "14:00",
      totalHours: "8h 0m",
      overtime: "0m",
      status: "Present",
    },
    {
      id: "ATT-003",
      officer: "Tanod Cruz",
      date: "2025-01-19",
      shift: "Afternoon",
      checkIn: "14:02",
      checkOut: "22:15",
      totalHours: "8h 13m",
      overtime: "15m",
      status: "Present",
    },
    {
      id: "ATT-004",
      officer: "Tanod Reyes",
      date: "2025-01-19",
      shift: "Afternoon",
      checkIn: "14:00",
      checkOut: "22:00",
      totalHours: "8h 0m",
      overtime: "0m",
      status: "Present",
    },
    {
      id: "ATT-005",
      officer: "Tanod Lopez",
      date: "2025-01-18",
      shift: "Night",
      checkIn: "22:00",
      checkOut: "06:05",
      totalHours: "8h 5m",
      overtime: "5m",
      status: "Present",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Duty":
        return "default"
      case "Scheduled":
        return "secondary"
      case "Off Duty":
        return "outline"
      case "Late":
        return "destructive"
      case "Absent":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "On Duty":
        return <Activity className="h-4 w-4" />
      case "Scheduled":
        return <Clock className="h-4 w-4" />
      case "Off Duty":
        return <CheckCircle className="h-4 w-4" />
      case "Late":
        return <AlertCircle className="h-4 w-4" />
      case "Absent":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Duty & Schedule</h1>
          <p className="text-muted-foreground">Manage officer schedules and duty assignments</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <CalendarIcon className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Schedule
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">On Duty Now</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">2</p>
              </div>
              <UserCheck className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Officers</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">6</p>
              </div>
              <Users className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overtime Hours</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">2.5</p>
              </div>
              <Clock className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Attendance Rate</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">98%</p>
              </div>
              <CheckCircle className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          <Tabs defaultValue="today" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="today">Today's Schedule</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
            </TabsList>

            <TabsContent value="today" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Schedule</CardTitle>
                  <CardDescription>Current duty assignments for {new Date().toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Shift</TableHead>
                          <TableHead>Officer</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Assignment</TableHead>
                          <TableHead className="hidden lg:table-cell">Area</TableHead>
                          <TableHead className="hidden sm:table-cell">Check In/Out</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {todaySchedule.map((schedule) => (
                          <TableRow key={schedule.id}>
                            <TableCell className="font-medium">{schedule.time}</TableCell>
                            <TableCell>{schedule.shift}</TableCell>
                            <TableCell>{schedule.officer}</TableCell>
                            <TableCell>
                              <Badge
                                variant={getStatusColor(schedule.status)}
                                className="flex items-center gap-1 w-fit"
                              >
                                {getStatusIcon(schedule.status)}
                                {schedule.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{schedule.location}</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3" />
                                {schedule.area}
                              </div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">
                              <div className="text-xs">
                                {schedule.checkIn && <div>In: {schedule.checkIn}</div>}
                                {schedule.checkOut && <div>Out: {schedule.checkOut}</div>}
                                {!schedule.checkIn && !schedule.checkOut && (
                                  <div className="text-muted-foreground">Pending</div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Schedule Overview</CardTitle>
                  <CardDescription>Officer assignments for the current week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Day</TableHead>
                          <TableHead className="hidden sm:table-cell">Date</TableHead>
                          <TableHead>Morning (06:00-14:00)</TableHead>
                          <TableHead>Afternoon (14:00-22:00)</TableHead>
                          <TableHead>Night (22:00-06:00)</TableHead>
                          <TableHead className="hidden md:table-cell">Coverage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {weeklySchedule.map((day, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{day.day}</TableCell>
                            <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                              {day.date}
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {day.morning.map((officer, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {officer}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {day.afternoon.map((officer, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {officer}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {day.night.map((officer, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">
                                    {officer}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                {day.coverage}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                  <CardDescription>Recent attendance and time tracking records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Officer</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Shift</TableHead>
                          <TableHead className="hidden sm:table-cell">Check In</TableHead>
                          <TableHead className="hidden sm:table-cell">Check Out</TableHead>
                          <TableHead className="hidden md:table-cell">Total Hours</TableHead>
                          <TableHead className="hidden lg:table-cell">Overtime</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {attendanceRecords.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell className="font-medium">{record.officer}</TableCell>
                            <TableCell>{record.date}</TableCell>
                            <TableCell>{record.shift}</TableCell>
                            <TableCell className="hidden sm:table-cell">{record.checkIn}</TableCell>
                            <TableCell className="hidden sm:table-cell">{record.checkOut}</TableCell>
                            <TableCell className="hidden md:table-cell">{record.totalHours}</TableCell>
                            <TableCell className="hidden lg:table-cell">
                              {record.overtime !== "0m" ? (
                                <Badge variant="outline" className="text-orange-600">
                                  {record.overtime}
                                </Badge>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="default" className="bg-green-100 text-green-800">
                                {record.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendar
              </CardTitle>
              <CardDescription>Select date to view schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common scheduling tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add New Schedule
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Edit className="h-4 w-4 mr-2" />
                Modify Existing
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <UserCheck className="h-4 w-4 mr-2" />
                Mark Attendance
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Clock className="h-4 w-4 mr-2" />
                Overtime Request
              </Button>
            </CardContent>
          </Card>

          {/* Current Status */}
          <Card>
            <CardHeader>
              <CardTitle>Current Status</CardTitle>
              <CardDescription>Real-time duty status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Officers on duty</span>
                  <Badge variant="default">2/6</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Coverage areas</span>
                  <Badge variant="default">3/5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Emergency ready</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Yes
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Next shift change</span>
                  <span className="text-sm text-muted-foreground">2:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
