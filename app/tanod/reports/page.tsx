"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import {
  FileText,
  Download,
  PrinterIcon as Print,
  BarChart3,
  PieChart,
  TrendingUp,
  CalendarIcon,
  Filter,
  Search,
  Eye,
  Plus,
} from "lucide-react"

export default function ReportsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [reportType, setReportType] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const reports = [
    {
      id: "RPT-2024-001",
      title: "Monthly Patrol Summary",
      type: "Patrol",
      period: "January 2025",
      generatedBy: "Tanod Garcia",
      dateGenerated: "2025-01-20",
      status: "Completed",
      format: "PDF",
      size: "2.3 MB",
    },
    {
      id: "RPT-2024-002",
      title: "Incident Analysis Report",
      type: "Incident",
      period: "Q4 2024",
      generatedBy: "Tanod Santos",
      dateGenerated: "2025-01-19",
      status: "Completed",
      format: "Excel",
      size: "1.8 MB",
    },
    {
      id: "RPT-2024-003",
      title: "Duty Attendance Summary",
      type: "Attendance",
      period: "December 2024",
      generatedBy: "System",
      dateGenerated: "2025-01-18",
      status: "Completed",
      format: "PDF",
      size: "1.2 MB",
    },
    {
      id: "RPT-2024-004",
      title: "CCTV Monitoring Report",
      type: "CCTV",
      period: "January 2025",
      generatedBy: "Tanod Cruz",
      dateGenerated: "2025-01-17",
      status: "In Progress",
      format: "PDF",
      size: "0 MB",
    },
  ]

  const statistics = {
    totalReports: 156,
    thisMonth: 23,
    pending: 4,
    completed: 152,
  }

  const patrolStats = {
    totalPatrols: 89,
    hoursPatrolled: 712,
    incidentsHandled: 34,
    checkpointsVisited: 267,
  }

  const incidentStats = {
    totalIncidents: 45,
    resolved: 41,
    pending: 4,
    highPriority: 8,
    mediumPriority: 22,
    lowPriority: 15,
  }

  const attendanceStats = {
    totalOfficers: 6,
    averageAttendance: 98.5,
    totalHours: 1440,
    overtimeHours: 24,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "default"
      case "In Progress":
        return "destructive"
      case "Pending":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Patrol":
        return "default"
      case "Incident":
        return "destructive"
      case "Attendance":
        return "secondary"
      case "CCTV":
        return "outline"
      default:
        return "secondary"
    }
  }

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = reportType === "all" || report.type.toLowerCase() === reportType.toLowerCase()
    return matchesSearch && matchesType
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and view operational reports and statistics</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                <p className="text-xl md:text-2xl font-bold text-blue-600">{statistics.totalReports}</p>
              </div>
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <p className="text-xl md:text-2xl font-bold text-green-600">{statistics.thisMonth}</p>
              </div>
              <CalendarIcon className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <p className="text-xl md:text-2xl font-bold text-orange-600">{statistics.pending}</p>
              </div>
              <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-xl md:text-2xl font-bold text-purple-600">{statistics.completed}</p>
              </div>
              <BarChart3 className="h-6 w-6 md:h-8 md:w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          <Tabs defaultValue="reports" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="generate">Generate</TabsTrigger>
            </TabsList>

            <TabsContent value="reports" className="space-y-4">
              {/* Search and Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Select value={reportType} onValueChange={setReportType}>
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="patrol">Patrol</SelectItem>
                          <SelectItem value="incident">Incident</SelectItem>
                          <SelectItem value="attendance">Attendance</SelectItem>
                          <SelectItem value="cctv">CCTV</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reports Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Generated Reports</CardTitle>
                  <CardDescription>
                    Showing {filteredReports.length} of {reports.length} reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Report ID</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="hidden md:table-cell">Period</TableHead>
                          <TableHead className="hidden lg:table-cell">Generated By</TableHead>
                          <TableHead className="hidden sm:table-cell">Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="hidden md:table-cell">Size</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredReports.map((report) => (
                          <TableRow key={report.id}>
                            <TableCell className="font-medium">{report.id}</TableCell>
                            <TableCell>{report.title}</TableCell>
                            <TableCell>
                              <Badge variant={getTypeColor(report.type)}>{report.type}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{report.period}</TableCell>
                            <TableCell className="hidden lg:table-cell">{report.generatedBy}</TableCell>
                            <TableCell className="hidden sm:table-cell">{report.dateGenerated}</TableCell>
                            <TableCell>
                              <Badge variant={getStatusColor(report.status)}>{report.status}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{report.size}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-3 w-3" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Print className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              {/* Analytics Cards */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Patrol Statistics
                    </CardTitle>
                    <CardDescription>Overview of patrol activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{patrolStats.totalPatrols}</p>
                        <p className="text-sm text-muted-foreground">Total Patrols</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{patrolStats.hoursPatrolled}</p>
                        <p className="text-sm text-muted-foreground">Hours Patrolled</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{patrolStats.incidentsHandled}</p>
                        <p className="text-sm text-muted-foreground">Incidents Handled</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{patrolStats.checkpointsVisited}</p>
                        <p className="text-sm text-muted-foreground">Checkpoints Visited</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5" />
                      Incident Analysis
                    </CardTitle>
                    <CardDescription>Breakdown of incident types and status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Incidents</span>
                        <span className="font-bold">{incidentStats.totalIncidents}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Resolved</span>
                        <Badge variant="default">{incidentStats.resolved}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pending</span>
                        <Badge variant="destructive">{incidentStats.pending}</Badge>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span>High Priority</span>
                          <span className="text-red-600">{incidentStats.highPriority}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Medium Priority</span>
                          <span className="text-yellow-600">{incidentStats.mediumPriority}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Low Priority</span>
                          <span className="text-green-600">{incidentStats.lowPriority}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Attendance Overview
                    </CardTitle>
                    <CardDescription>Officer attendance and duty hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{attendanceStats.totalOfficers}</p>
                        <p className="text-sm text-muted-foreground">Total Officers</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{attendanceStats.averageAttendance}%</p>
                        <p className="text-sm text-muted-foreground">Avg Attendance</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{attendanceStats.totalHours}</p>
                        <p className="text-sm text-muted-foreground">Total Hours</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-orange-600">{attendanceStats.overtimeHours}</p>
                        <p className="text-sm text-muted-foreground">Overtime Hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Response Time (Avg)</span>
                        <span className="font-bold text-green-600">4.2 min</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Resolution Rate</span>
                        <span className="font-bold text-blue-600">91%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Area Coverage</span>
                        <span className="font-bold text-purple-600">94%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Citizen Satisfaction</span>
                        <span className="font-bold text-orange-600">4.7/5</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="generate" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Generate New Report</CardTitle>
                  <CardDescription>Create custom reports based on your requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Report Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="patrol">Patrol Summary</SelectItem>
                          <SelectItem value="incident">Incident Analysis</SelectItem>
                          <SelectItem value="attendance">Attendance Report</SelectItem>
                          <SelectItem value="cctv">CCTV Monitoring</SelectItem>
                          <SelectItem value="performance">Performance Metrics</SelectItem>
                          <SelectItem value="custom">Custom Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Report Period</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                          <SelectItem value="quarter">This Quarter</SelectItem>
                          <SelectItem value="year">This Year</SelectItem>
                          <SelectItem value="custom">Custom Range</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Output Format</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                          <SelectItem value="csv">CSV File</SelectItem>
                          <SelectItem value="word">Word Document</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Include Charts</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Chart options" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, include charts</SelectItem>
                          <SelectItem value="no">No charts</SelectItem>
                          <SelectItem value="summary">Summary charts only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Report Title</label>
                    <Input placeholder="Enter custom report title (optional)" />
                  </div>

                  <div className="flex gap-2">
                    <Button>Generate Report</Button>
                    <Button variant="outline">Preview</Button>
                    <Button variant="outline">Schedule</Button>
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
              <CardDescription>Select date range for reports</CardDescription>
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

          {/* Quick Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Reports</CardTitle>
              <CardDescription>Generate common reports instantly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <FileText className="h-4 w-4 mr-2" />
                Daily Summary
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BarChart3 className="h-4 w-4 mr-2" />
                Weekly Stats
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <PieChart className="h-4 w-4 mr-2" />
                Monthly Analysis
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <TrendingUp className="h-4 w-4 mr-2" />
                Performance Report
              </Button>
            </CardContent>
          </Card>

          {/* Recent Downloads */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Downloads</CardTitle>
              <CardDescription>Recently generated reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Daily Summary</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Patrol Report</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Incident Analysis</span>
                  <Button variant="ghost" size="sm">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
