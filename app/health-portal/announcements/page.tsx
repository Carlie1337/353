"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Eye,
  Edit,
  Send,
} from "lucide-react"

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [announcementData, setAnnouncementData] = useState({
    title: "",
    content: "",
    category: "",
    priority: "medium",
    targetAudience: "public",
  })

  const announcements = [
    {
      id: 1,
      announcementId: "ANN-2024-001",
      title: "Free Flu Vaccination Drive",
      content:
        "The barangay health center will conduct a free flu vaccination drive for all residents aged 60 and above...",
      category: "vaccination",
      priority: "high",
      targetAudience: "seniors",
      status: "approved",
      author: "Dr. Cruz",
      createdDate: "2024-01-20",
      approvedDate: "2024-01-21",
      approvedBy: "Admin Santos",
      views: 245,
    },
    {
      id: 2,
      announcementId: "ANN-2024-002",
      title: "Dengue Prevention Reminder",
      content: "With the recent increase in dengue cases, residents are reminded to eliminate stagnant water...",
      category: "prevention",
      priority: "high",
      targetAudience: "public",
      status: "pending",
      author: "Nurse Garcia",
      createdDate: "2024-01-22",
      approvedDate: null,
      approvedBy: null,
      views: 0,
    },
    {
      id: 3,
      announcementId: "ANN-2024-003",
      title: "Mental Health Awareness Seminar",
      content:
        "Join us for a mental health awareness seminar focusing on stress management and emotional well-being...",
      category: "education",
      priority: "medium",
      targetAudience: "public",
      status: "approved",
      author: "Dr. Reyes",
      createdDate: "2024-01-18",
      approvedDate: "2024-01-19",
      approvedBy: "Admin Lopez",
      views: 156,
    },
    {
      id: 4,
      announcementId: "ANN-2024-004",
      title: "Health Center Schedule Change",
      content: "Please be informed that the health center will have modified hours during the holiday season...",
      category: "schedule",
      priority: "medium",
      targetAudience: "public",
      status: "rejected",
      author: "Nurse Johnson",
      createdDate: "2024-01-15",
      approvedDate: "2024-01-16",
      approvedBy: "Admin Santos",
      views: 0,
    },
  ]

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.category.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || announcement.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "default"
      case "pending":
        return "secondary"
      case "rejected":
        return "destructive"
      case "draft":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "draft":
        return <Edit className="h-4 w-4 text-gray-600" />
      default:
        return <AlertCircle className="h-4 w-4" />
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

  const handleInputChange = (field: string, value: string) => {
    setAnnouncementData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
      setShowCreateForm(false)
      setAnnouncementData({
        title: "",
        content: "",
        category: "",
        priority: "medium",
        targetAudience: "public",
      })
    }, 2000)
  }

  const stats = [
    { title: "Total Announcements", value: announcements.length.toString(), subtitle: "All announcements" },
    {
      title: "Approved",
      value: announcements.filter((a) => a.status === "approved").length.toString(),
      subtitle: "Live announcements",
    },
    {
      title: "Pending Approval",
      value: announcements.filter((a) => a.status === "pending").length.toString(),
      subtitle: "Awaiting review",
    },
    {
      title: "Total Views",
      value: announcements.reduce((sum, a) => sum + a.views, 0).toString(),
      subtitle: "All time views",
    },
  ]

  if (success) {
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Health Announcements</h1>
          <p className="text-gray-600 dark:text-gray-400">Create and manage health-related announcements</p>
        </div>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Announcement
        </Button>
      </div>

      {success && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertDescription>
            Announcement created successfully! It has been submitted for admin approval.
          </AlertDescription>
        </Alert>
      )}

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

      {/* Create Announcement Form */}
      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Announcement</CardTitle>
            <CardDescription>Create a health announcement for community members</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Announcement Title *</Label>
                  <Input
                    id="title"
                    value={announcementData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter announcement title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={announcementData.category}
                    onValueChange={(value) => handleInputChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vaccination">Vaccination</SelectItem>
                      <SelectItem value="prevention">Disease Prevention</SelectItem>
                      <SelectItem value="education">Health Education</SelectItem>
                      <SelectItem value="schedule">Schedule Changes</SelectItem>
                      <SelectItem value="emergency">Emergency Alert</SelectItem>
                      <SelectItem value="program">Health Program</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={announcementData.priority}
                    onValueChange={(value) => handleInputChange("priority", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="high">High Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetAudience">Target Audience</Label>
                  <Select
                    value={announcementData.targetAudience}
                    onValueChange={(value) => handleInputChange("targetAudience", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">General Public</SelectItem>
                      <SelectItem value="seniors">Senior Citizens</SelectItem>
                      <SelectItem value="children">Children/Parents</SelectItem>
                      <SelectItem value="pregnant">Pregnant Women</SelectItem>
                      <SelectItem value="chronic">Chronic Patients</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Announcement Content *</Label>
                <Textarea
                  id="content"
                  value={announcementData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Enter the full announcement content..."
                  rows={6}
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit for Approval"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Announcements List */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <CardTitle>All Announcements</CardTitle>
              <CardDescription>Manage health announcements and their approval status</CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search announcements..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow key={announcement.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{announcement.title}</p>
                      <p className="text-sm text-gray-500 truncate max-w-64">{announcement.content}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{announcement.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      {announcement.author}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      {new Date(announcement.createdDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(announcement.status)}
                      <Badge variant={getStatusColor(announcement.status)}>{announcement.status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-gray-500" />
                      {announcement.views}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {announcement.status === "approved" && (
                        <Button variant="ghost" size="sm">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
