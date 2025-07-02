"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bell, Send, AlertTriangle, Info, CheckCircle, Clock, Search, Plus, Filter, MessageSquare } from "lucide-react"

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const notifications = [
    {
      id: 1,
      title: "Emergency Alert: Flood Warning",
      message: "Heavy rainfall expected. Residents in low-lying areas should prepare for possible evacuation.",
      type: "emergency",
      priority: "high",
      recipients: "All Residents",
      status: "sent",
      sentAt: "2024-01-15T10:30:00",
      readCount: 1247,
      totalRecipients: 2853,
    },
    {
      id: 2,
      title: "Community Meeting Reminder",
      message: "Monthly barangay assembly scheduled for January 20, 2024 at 2:00 PM at the Community Center.",
      type: "announcement",
      priority: "medium",
      recipients: "All Residents",
      status: "sent",
      sentAt: "2024-01-14T09:00:00",
      readCount: 892,
      totalRecipients: 2853,
    },
    {
      id: 3,
      title: "Health Program: Free Check-up",
      message: "Free health screening available at the Health Center from January 25-27, 2024.",
      type: "health",
      priority: "medium",
      recipients: "Senior Citizens",
      status: "scheduled",
      sentAt: "2024-01-20T08:00:00",
      readCount: 0,
      totalRecipients: 285,
    },
    {
      id: 4,
      title: "Document Processing Update",
      message: "Your barangay certificate request has been approved and is ready for pickup.",
      type: "document",
      priority: "low",
      recipients: "Individual",
      status: "sent",
      sentAt: "2024-01-13T14:20:00",
      readCount: 1,
      totalRecipients: 1,
    },
  ]

  const stats = [
    { title: "Total Sent", value: "1,247", icon: Send, color: "text-blue-600" },
    { title: "Read Rate", value: "78%", icon: CheckCircle, color: "text-green-600" },
    { title: "Pending", value: "23", icon: Clock, color: "text-yellow-600" },
    { title: "Emergency Alerts", value: "5", icon: AlertTriangle, color: "text-red-600" },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return AlertTriangle
      case "announcement":
        return Bell
      case "health":
        return Info
      case "document":
        return MessageSquare
      default:
        return Bell
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "destructive"
      case "announcement":
        return "default"
      case "health":
        return "secondary"
      case "document":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "default"
      case "scheduled":
        return "secondary"
      case "draft":
        return "outline"
      default:
        return "secondary"
    }
  }

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage community notifications and alerts</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Notification
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Notification</DialogTitle>
              <DialogDescription>Send a notification to residents</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipients">Recipients</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Residents</SelectItem>
                    <SelectItem value="seniors">Senior Citizens</SelectItem>
                    <SelectItem value="pwd">PWD</SelectItem>
                    <SelectItem value="4ps">4Ps Beneficiaries</SelectItem>
                    <SelectItem value="zone1">Zone 1</SelectItem>
                    <SelectItem value="zone2">Zone 2</SelectItem>
                    <SelectItem value="zone3">Zone 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Notification title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Notification message" rows={4} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Save as Draft
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Send Now</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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

      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="emergency">Emergency</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
              <CardDescription>Complete list of sent and scheduled notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications.map((notification) => {
                  const TypeIcon = getTypeIcon(notification.type)
                  const readPercentage = Math.round((notification.readCount / notification.totalRecipients) * 100)

                  return (
                    <div key={notification.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
                            <TypeIcon className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">{notification.title}</h3>
                              <Badge variant={getTypeColor(notification.type)}>{notification.type}</Badge>
                              <Badge variant={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>To: {notification.recipients}</span>
                              <span>Sent: {new Date(notification.sentAt).toLocaleString()}</span>
                              <span>
                                Read: {notification.readCount}/{notification.totalRecipients} ({readPercentage}%)
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={getStatusColor(notification.status)}>{notification.status}</Badge>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                      {notification.status === "sent" && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>Read Rate</span>
                            <span>{readPercentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${readPercentage}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="emergency">
          <Card>
            <CardHeader>
              <CardTitle>Emergency Notifications</CardTitle>
              <CardDescription>Critical alerts and emergency communications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications
                  .filter((n) => n.type === "emergency")
                  .map((notification) => (
                    <div
                      key={notification.id}
                      className="border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <h3 className="font-medium text-red-900 dark:text-red-100">{notification.title}</h3>
                        <Badge variant="destructive">{notification.priority}</Badge>
                      </div>
                      <p className="text-red-800 dark:text-red-200 mb-2">{notification.message}</p>
                      <div className="text-xs text-red-600 dark:text-red-300">
                        Sent to {notification.recipients} • {new Date(notification.sentAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements">
          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>General community announcements and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredNotifications
                  .filter((n) => n.type === "announcement")
                  .map((notification) => (
                    <div key={notification.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-4 w-4 text-blue-600" />
                        <h3 className="font-medium">{notification.title}</h3>
                        <Badge variant="default">{notification.priority}</Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-2">{notification.message}</p>
                      <div className="text-xs text-gray-500">
                        Sent to {notification.recipients} • {new Date(notification.sentAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle>Draft Notifications</CardTitle>
              <CardDescription>Saved drafts and scheduled notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No drafts found</h3>
                <p className="text-gray-600 dark:text-gray-400">Create a new notification to get started.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
