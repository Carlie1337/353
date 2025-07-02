"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Calendar, Search, Plus, Heart, Award } from "lucide-react"

export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const communityPrograms = [
    {
      id: 1,
      name: "Livelihood Training",
      type: "Skills Development",
      participants: 45,
      status: "Ongoing",
      startDate: "2024-01-10",
      coordinator: "Mrs. Santos",
    },
    {
      id: 2,
      name: "Youth Sports League",
      type: "Sports",
      participants: 80,
      status: "Active",
      startDate: "2024-01-05",
      coordinator: "Coach Garcia",
    },
    {
      id: 3,
      name: "Senior Citizens Club",
      type: "Social",
      participants: 35,
      status: "Active",
      startDate: "2024-01-01",
      coordinator: "Ms. Reyes",
    },
    {
      id: 4,
      name: "Environmental Clean-up",
      type: "Environment",
      participants: 120,
      status: "Completed",
      startDate: "2024-01-08",
      coordinator: "Mr. Cruz",
    },
  ]

  const upcomingEvents = [
    { name: "Barangay Fiesta", date: "2024-02-15", type: "Cultural", expected: 500 },
    { name: "Community Garden Project", date: "2024-01-25", type: "Environment", expected: 50 },
    { name: "Skills Workshop", date: "2024-02-01", type: "Education", expected: 30 },
    { name: "Basketball Tournament", date: "2024-02-10", type: "Sports", expected: 200 },
  ]

  const organizations = [
    { name: "Barangay Youth Council", members: 25, leader: "John Santos", focus: "Youth Development" },
    { name: "Women's Association", members: 40, leader: "Maria Cruz", focus: "Women Empowerment" },
    { name: "Senior Citizens Group", members: 35, leader: "Pedro Garcia", focus: "Elder Care" },
    { name: "Environmental Group", members: 20, leader: "Ana Reyes", focus: "Environment" },
  ]

  const stats = [
    { title: "Active Programs", value: "8", icon: Calendar, color: "text-blue-600" },
    { title: "Total Participants", value: "280", icon: Users, color: "text-green-600" },
    { title: "Organizations", value: "12", icon: Award, color: "text-purple-600" },
    { title: "Upcoming Events", value: "6", icon: Heart, color: "text-red-600" },
  ]

  const filteredPrograms = communityPrograms.filter(
    (program) =>
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.coordinator.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Ongoing":
        return "default"
      case "Completed":
        return "secondary"
      case "Cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Community Programs</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage community initiatives and social programs</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Program
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Community Programs */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Community Programs</CardTitle>
                  <CardDescription>Active and ongoing community initiatives</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search programs..."
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
                    <TableHead>Program Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Coordinator</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrograms.map((program) => (
                    <TableRow key={program.id}>
                      <TableCell className="font-medium">{program.name}</TableCell>
                      <TableCell>{program.type}</TableCell>
                      <TableCell>{program.participants}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(program.status)}>{program.status}</Badge>
                      </TableCell>
                      <TableCell>{program.coordinator}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Scheduled community events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium">{event.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{event.type}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {event.expected} expected
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Organizations */}
          <Card>
            <CardHeader>
              <CardTitle>Community Organizations</CardTitle>
              <CardDescription>Active community groups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {organizations.map((org, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <h4 className="font-medium">{org.name}</h4>
                  <p className="text-sm text-gray-500">{org.focus}</p>
                  <div className="flex items-center justify-between mt-2 text-sm">
                    <span className="text-gray-600">{org.members} members</span>
                    <span className="text-gray-600">Led by {org.leader}</span>
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
