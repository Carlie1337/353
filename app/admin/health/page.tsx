"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Heart, Users, Calendar, Search, Plus, Activity, Stethoscope, AlertTriangle, Info } from "lucide-react"

export default function HealthPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const healthRecords = [
    {
      id: 1,
      patient: "Maria Santos",
      age: 45,
      condition: "Hypertension",
      lastVisit: "2024-01-10",
      status: "Under Treatment",
      doctor: "Dr. Cruz",
    },
    {
      id: 2,
      patient: "Juan Dela Cruz",
      age: 32,
      condition: "Diabetes",
      lastVisit: "2024-01-12",
      status: "Stable",
      doctor: "Dr. Reyes",
    },
    {
      id: 3,
      patient: "Ana Garcia",
      age: 28,
      condition: "Pregnancy Check-up",
      lastVisit: "2024-01-14",
      status: "Normal",
      doctor: "Dr. Santos",
    },
    {
      id: 4,
      patient: "Pedro Lopez",
      age: 55,
      condition: "Regular Check-up",
      lastVisit: "2024-01-15",
      status: "Healthy",
      doctor: "Dr. Cruz",
    },
  ]

  const upcomingPrograms = [
    { name: "Vaccination Drive", date: "2024-01-20", participants: 150, type: "Immunization" },
    { name: "Health Screening", date: "2024-01-25", participants: 80, type: "Check-up" },
    { name: "Nutrition Program", date: "2024-02-01", participants: 200, type: "Education" },
    { name: "Senior Citizen Health", date: "2024-02-05", participants: 60, type: "Specialized" },
  ]

  const stats = [
    { title: "Total Patients", value: "1,247", icon: Users, color: "text-blue-600" },
    { title: "Active Cases", value: "89", icon: Activity, color: "text-red-600" },
    { title: "Health Programs", value: "12", icon: Heart, color: "text-green-600" },
    { title: "Medical Staff", value: "8", icon: Stethoscope, color: "text-purple-600" },
  ]

  const filteredRecords = healthRecords.filter(
    (record) =>
      record.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.condition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "default"
      case "Normal":
        return "default"
      case "Stable":
        return "default"
      case "Under Treatment":
        return "destructive"
      case "Critical":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health & Medical</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage community health programs and medical records</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Health Record
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health Summary Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Disease Cases</CardTitle>
            <CardDescription>Current active cases by condition</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Hypertension</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">45</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Diabetes</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">32</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "53%" }} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Respiratory</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">18</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "30%" }} />
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Heart Disease</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">12</span>
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Age Group Health</CardTitle>
            <CardDescription>Health status by age demographics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">0-17 years</span>
                <Badge variant="default">Healthy</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">18-35 years</span>
                <Badge variant="default">Good</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">36-55 years</span>
                <Badge variant="destructive">At Risk</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">56+ years</span>
                <Badge variant="destructive">High Risk</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vaccination Status</CardTitle>
            <CardDescription>Community immunization coverage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>COVID-19</span>
                  <span>89%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "89%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Flu Vaccine</span>
                  <span>67%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "67%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Pneumonia</span>
                  <span>45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Health Alerts</CardTitle>
            <CardDescription>Current health concerns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">Dengue outbreak risk</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">Flu season active</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                <Info className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-blue-800">Vaccination drive ongoing</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Health Records */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Patient Records</CardTitle>
                  <CardDescription>Recent patient visits and health status</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Doctor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.patient}</TableCell>
                      <TableCell>{record.age}</TableCell>
                      <TableCell>{record.condition}</TableCell>
                      <TableCell>{new Date(record.lastVisit).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(record.status)}>{record.status}</Badge>
                      </TableCell>
                      <TableCell>{record.doctor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Programs */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Health Programs</CardTitle>
              <CardDescription>Upcoming community health initiatives</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingPrograms.map((program, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{program.name}</h4>
                      <p className="text-sm text-gray-500 mt-1">{program.type}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(program.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {program.participants} participants
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
