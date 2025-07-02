"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar, Users, MapPin, Clock, Search, Plus, Star, Gift } from "lucide-react"

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const events = [
    {
      id: 1,
      name: "Barangay Fiesta 2024",
      type: "Cultural",
      date: "2024-02-15",
      time: "08:00 AM",
      venue: "Barangay Hall",
      status: "Upcoming",
      attendees: 500,
      organizer: "Barangay Council",
    },
    {
      id: 2,
      name: "Youth Basketball Tournament",
      type: "Sports",
      date: "2024-02-10",
      time: "02:00 PM",
      venue: "Basketball Court",
      status: "Upcoming",
      attendees: 200,
      organizer: "Youth Council",
    },
    {
      id: 3,
      name: "Senior Citizens Day",
      type: "Social",
      date: "2024-01-20",
      time: "09:00 AM",
      venue: "Community Center",
      status: "Completed",
      attendees: 80,
      organizer: "Senior Citizens Group",
    },
    {
      id: 4,
      name: "Environmental Clean-up Drive",
      type: "Environment",
      date: "2024-01-25",
      time: "06:00 AM",
      venue: "Riverside Area",
      status: "Upcoming",
      attendees: 150,
      organizer: "Environmental Committee",
    },
  ]

  const eventCategories = [
    { name: "Cultural Events", count: 8, color: "bg-purple-100 text-purple-800" },
    { name: "Sports Events", count: 12, color: "bg-blue-100 text-blue-800" },
    { name: "Social Events", count: 6, color: "bg-green-100 text-green-800" },
    { name: "Educational", count: 4, color: "bg-yellow-100 text-yellow-800" },
  ]

  const upcomingHighlights = [
    { name: "Barangay Fiesta", date: "Feb 15", highlight: "Main Event" },
    { name: "Basketball Finals", date: "Feb 10", highlight: "Championship" },
    { name: "Health Fair", date: "Feb 20", highlight: "Free Check-up" },
  ]

  const stats = [
    { title: "Total Events", value: "24", icon: Calendar, color: "text-blue-600" },
    { title: "This Month", value: "8", icon: Star, color: "text-green-600" },
    { title: "Total Attendees", value: "2,340", icon: Users, color: "text-purple-600" },
    { title: "Active Organizers", value: "15", icon: Gift, color: "text-red-600" },
  ]

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "default"
      case "Ongoing":
        return "destructive"
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Events Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Organize and manage community events and activities</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create New Event
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
        {/* Events Table */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>All Events</CardTitle>
                  <CardDescription>Manage community events and activities</CardDescription>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search events..."
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
                    <TableHead>Event Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Attendees</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            {new Date(event.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Clock className="h-4 w-4" />
                            {event.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          {event.venue}
                        </div>
                      </TableCell>
                      <TableCell>{event.attendees}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(event.status)}>{event.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Event Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Event Categories</CardTitle>
              <CardDescription>Events by category</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {eventCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{category.name}</span>
                  <Badge className={category.color}>{category.count}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Highlights */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Highlights</CardTitle>
              <CardDescription>Featured upcoming events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingHighlights.map((event, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{event.name}</h4>
                      <p className="text-sm text-gray-500">{event.highlight}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{event.date}</p>
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
