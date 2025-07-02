"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Search, Filter, Plus, User, Calendar, Download, Eye, Edit, Heart, Activity } from "lucide-react"

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const medicalRecords = [
    {
      id: 1,
      recordId: "MR-2024-001",
      patientName: "Maria Santos",
      patientId: "P-2024-001",
      date: "2024-01-20",
      type: "Consultation",
      diagnosis: "Hypertension",
      provider: "Dr. Cruz",
      status: "completed",
      notes: "Blood pressure elevated, prescribed medication",
    },
    {
      id: 2,
      recordId: "MR-2024-002",
      patientName: "Juan Dela Cruz",
      patientId: "P-2024-002",
      date: "2024-01-18",
      type: "Laboratory",
      diagnosis: "Diabetes Monitoring",
      provider: "Lab Tech",
      status: "completed",
      notes: "HbA1c test results within target range",
    },
    {
      id: 3,
      recordId: "MR-2024-003",
      patientName: "Ana Garcia",
      patientId: "P-2024-003",
      date: "2024-01-22",
      type: "Prenatal",
      diagnosis: "Normal Pregnancy",
      provider: "Dr. Santos",
      status: "completed",
      notes: "24 weeks pregnant, normal development",
    },
    {
      id: 4,
      recordId: "MR-2024-004",
      patientName: "Pedro Lopez",
      patientId: "P-2024-004",
      date: "2024-01-15",
      type: "Vaccination",
      diagnosis: "COVID-19 Booster",
      provider: "Nurse Johnson",
      status: "completed",
      notes: "No adverse reactions observed",
    },
  ]

  const filteredRecords = medicalRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.recordId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || record.type.toLowerCase() === filterType.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "consultation":
        return "default"
      case "laboratory":
        return "secondary"
      case "prenatal":
        return "outline"
      case "vaccination":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const stats = [
    { title: "Total Records", value: medicalRecords.length.toString(), subtitle: "All medical records" },
    {
      title: "This Month",
      value: medicalRecords.filter((r) => new Date(r.date).getMonth() === new Date().getMonth()).length.toString(),
      subtitle: "Records this month",
    },
    {
      title: "Consultations",
      value: medicalRecords.filter((r) => r.type === "Consultation").length.toString(),
      subtitle: "Consultation records",
    },
    {
      title: "Lab Results",
      value: medicalRecords.filter((r) => r.type === "Laboratory").length.toString(),
      subtitle: "Laboratory records",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Medical Records</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage patient medical records and history</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Record
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
          <TabsTrigger value="all">All Records</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="by-patient">By Patient</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>All Medical Records</CardTitle>
                  <CardDescription>Complete patient medical history</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                      <SelectItem value="laboratory">Laboratory</SelectItem>
                      <SelectItem value="prenatal">Prenatal</SelectItem>
                      <SelectItem value="vaccination">Vaccination</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Record ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.recordId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{record.patientName}</p>
                            <p className="text-sm text-gray-500">{record.patientId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          {new Date(record.date).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getTypeColor(record.type)}>{record.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{record.diagnosis}</p>
                          <p className="text-sm text-gray-500 truncate max-w-48">{record.notes}</p>
                        </div>
                      </TableCell>
                      <TableCell>{record.provider}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Medical Records</CardTitle>
              <CardDescription>Latest patient records from the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredRecords.slice(0, 5).map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full">
                        <FileText className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{record.patientName}</p>
                        <p className="text-sm text-gray-600">{record.diagnosis}</p>
                        <p className="text-sm text-gray-500">
                          {record.type} • {new Date(record.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getTypeColor(record.type)}>{record.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="by-patient" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Records by Patient</CardTitle>
              <CardDescription>Grouped medical records by patient</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <User className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Patient grouping view</p>
                <p className="text-sm text-gray-400">Select a patient to view their complete medical history</p>
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
            <h3 className="font-medium">Vital Signs</h3>
            <p className="text-sm text-gray-600">Record patient vital signs</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Activity className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">Lab Results</h3>
            <p className="text-sm text-gray-600">Add laboratory results</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">Prescription</h3>
            <p className="text-sm text-gray-600">Create prescription</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
