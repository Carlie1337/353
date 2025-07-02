"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Search, Filter, Plus, Calendar, TrendingUp, Heart, Baby, Eye, UserCheck, Apple } from "lucide-react"

export default function HealthProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const healthPrograms = [
    {
      id: 1,
      programId: "HP-2024-001",
      name: "Maternal and Child Health Program",
      description: "Comprehensive care for pregnant women and children under 5",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      participants: 125,
      target: 200,
      coordinator: "Dr. Santos",
      category: "maternal-child",
      budget: "₱150,000",
    },
    {
      id: 2,
      programId: "HP-2024-002",
      name: "Hypertension Management Program",
      description: "Blood pressure monitoring and lifestyle counseling",
      startDate: "2024-02-01",
      endDate: "2024-11-30",
      status: "active",
      participants: 89,
      target: 150,
      coordinator: "Dr. Cruz",
      category: "chronic-disease",
      budget: "₱80,000",
    },
    {
      id: 3,
      programId: "HP-2024-003",
      name: "Dengue Prevention Campaign",
      description: "Community education and vector control activities",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      status: "completed",
      participants: 450,
      target: 400,
      coordinator: "Nurse Garcia",
      category: "prevention",
      budget: "₱60,000",
    },
    {
      id: 4,
      programId: "HP-2024-004",
      name: "Nutrition Education Program",
      description: "Healthy eating and nutrition counseling for families",
      startDate: "2024-04-01",
      endDate: "2024-09-30",
      status: "planning",
      participants: 0,
      target: 180,
      coordinator: "Nutritionist Lopez",
      category: "nutrition",
      budget: "₱45,000",
    },
  ]

  const filteredPrograms = healthPrograms.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.programId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || program.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "completed":
        return "outline"
      case "planning":
        return "secondary"
      case "suspended":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "maternal-child":
        return <Baby className="h-4 w-4 text-pink-600" />
      case "chronic-disease":
        return <Heart className="h-4 w-4 text-red-600" />
      case "prevention":
        return <Eye className="h-4 w-4 text-blue-600" />
      case "nutrition":
        return <Apple className="h-4 w-4 text-green-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getProgressPercentage = (participants: number, target: number) => {
    return Math.min((participants / target) * 100, 100)
  }

  const stats = [
    {
      title: "Active Programs",
      value: healthPrograms.filter((p) => p.status === "active").length.toString(),
      subtitle: "Currently running",
    },
    {
      title: "Total Participants",
      value: healthPrograms.reduce((sum, p) => sum + p.participants, 0).toString(),
      subtitle: "All programs",
    },
    {
      title: "Completed Programs",
      value: healthPrograms.filter((p) => p.status === "completed").length.toString(),
      subtitle: "Successfully finished",
    },
    {
      title: "In Planning",
      value: healthPrograms.filter((p) => p.status === "planning").length.toString(),
      subtitle: "Being planned",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health Programs</h1>
          <p className="text-gray-600 dark:text-gray-400">Community health programs and initiatives</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Program
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
          <TabsTrigger value="all">All Programs</TabsTrigger>
          <TabsTrigger value="active">Active Programs</TabsTrigger>
          <TabsTrigger value="analytics">Program Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>Health Programs</CardTitle>
                  <CardDescription>Manage community health programs and initiatives</CardDescription>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search programs..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Program</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Coordinator</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrograms.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{program.name}</p>
                          <p className="text-sm text-gray-500 max-w-64 truncate">{program.description}</p>
                          <p className="text-xs text-gray-400">{program.programId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(program.category)}
                          <span className="capitalize">{program.category.replace("-", " ")}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <div className="text-sm">
                            <p>{new Date(program.startDate).toLocaleDateString()}</p>
                            <p className="text-gray-500">to {new Date(program.endDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>
                              {program.participants}/{program.target}
                            </span>
                            <span>{Math.round(getProgressPercentage(program.participants, program.target))}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${getProgressPercentage(program.participants, program.target)}%` }}
                            ></div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserCheck className="h-4 w-4 text-gray-500" />
                          {program.coordinator}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(program.status)}>{program.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                          <Button variant="ghost" size="sm">
                            Edit
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

        <TabsContent value="active" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPrograms
              .filter((p) => p.status === "active")
              .map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(program.category)}
                        <div>
                          <CardTitle className="text-lg">{program.name}</CardTitle>
                          <CardDescription>{program.programId}</CardDescription>
                        </div>
                      </div>
                      <Badge variant={getStatusColor(program.status)}>{program.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">{program.description}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Coordinator:</p>
                        <p>{program.coordinator}</p>
                      </div>
                      <div>
                        <p className="font-medium">Budget:</p>
                        <p>{program.budget}</p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="font-medium">Participants</span>
                        <span>
                          {program.participants}/{program.target} (
                          {Math.round(getProgressPercentage(program.participants, program.target))}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${getProgressPercentage(program.participants, program.target)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        View Details
                      </Button>
                      <Button size="sm" className="flex-1">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Program Performance Analytics
              </CardTitle>
              <CardDescription>Track program effectiveness and outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Activity className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Program analytics and performance metrics</p>
                <p className="text-sm text-gray-400">
                  Detailed insights into program effectiveness and community impact
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Program Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Baby className="h-8 w-8 mx-auto mb-2 text-pink-600" />
            <h3 className="font-medium">Maternal & Child Health</h3>
            <p className="text-sm text-gray-600">Programs for mothers and children</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 mx-auto mb-2 text-red-600" />
            <h3 className="font-medium">Chronic Disease</h3>
            <p className="text-sm text-gray-600">Management of chronic conditions</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Eye className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <h3 className="font-medium">Prevention Programs</h3>
            <p className="text-sm text-gray-600">Disease prevention and health promotion</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Apple className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-medium">Nutrition Programs</h3>
            <p className="text-sm text-gray-600">Nutrition education and counseling</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
