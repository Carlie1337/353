"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  AlertTriangle,
  Megaphone,
  Info,
  AlertCircle,
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Eye,
  Edit,
  Trash2,
  Send,
  Save,
} from "lucide-react"

interface UnifiedAnnouncement {
  id: string
  type: "announcement" | "warning" | "emergency" | "info"
  severity: "critical" | "high" | "medium" | "low" | "info"
  title: string
  content: string
  date: string
  time: string
  location: string
  author: string
  urgent: boolean
  pinned: boolean
  status: "draft" | "scheduled" | "published" | "archived"
  recipients: string[]
  readCount: number
  totalRecipients: number
  channels: string[]
  expiryDate?: string
  attachments?: string[]
  tags: string[]
}

export function UnifiedAnnouncementSystem() {
  const [announcements, setAnnouncements] = useState<UnifiedAnnouncement[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<UnifiedAnnouncement | null>(null)

  useEffect(() => {
    // Initialize with demo data
    const demoAnnouncements: UnifiedAnnouncement[] = [
      {
        id: "1",
        type: "emergency",
        severity: "critical",
        title: "Flash Flood Warning",
        content: "Heavy rainfall has caused flash flooding in low-lying areas. Residents should evacuate immediately.",
        date: "2024-01-15",
        time: "10:30 AM",
        location: "East Zone, Purok 3-5",
        author: "Emergency Response Team",
        urgent: true,
        pinned: true,
        status: "published",
        recipients: ["All Residents"],
        readCount: 1247,
        totalRecipients: 2853,
        channels: ["SMS", "Facebook", "Loudspeaker", "Mobile App"],
        tags: ["emergency", "flood", "evacuation"],
      },
      {
        id: "2",
        type: "warning",
        severity: "high",
        title: "Water Service Interruption",
        content:
          "Water service will be temporarily interrupted on May 25 from 9:00 AM to 3:00 PM for maintenance work.",
        date: "2024-01-14",
        time: "9:00 AM - 3:00 PM",
        location: "All Zones",
        author: "Public Works Department",
        urgent: true,
        pinned: true,
        status: "published",
        recipients: ["All Residents"],
        readCount: 892,
        totalRecipients: 2853,
        channels: ["SMS", "Facebook", "Website"],
        tags: ["water", "maintenance", "interruption"],
      },
      {
        id: "3",
        type: "announcement",
        severity: "info",
        title: "Community Clean-up Drive",
        content:
          "Join us for our monthly community clean-up drive this Saturday at 7:00 AM. Meeting point at the Barangay Hall.",
        date: "2024-01-13",
        time: "7:00 AM",
        location: "Barangay Hall",
        author: "Barangay Captain",
        urgent: false,
        pinned: false,
        status: "published",
        recipients: ["All Residents"],
        readCount: 654,
        totalRecipients: 2853,
        channels: ["Facebook", "Website", "Bulletin Board"],
        tags: ["community", "cleanup", "environment"],
      },
      {
        id: "4",
        type: "info",
        severity: "medium",
        title: "New Health Program Launch",
        content:
          "We're launching a new health program for senior citizens. Registration starts next week at the Health Center.",
        date: "2024-01-12",
        time: "8:00 AM onwards",
        location: "Health Center",
        author: "Health Officer",
        urgent: false,
        pinned: false,
        status: "scheduled",
        recipients: ["Senior Citizens"],
        readCount: 0,
        totalRecipients: 285,
        channels: ["SMS", "Facebook"],
        expiryDate: "2024-02-15",
        tags: ["health", "seniors", "program"],
      },
    ]
    setAnnouncements(demoAnnouncements)
  }, [])

  const getAnnouncementIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return AlertTriangle
      case "warning":
        return AlertCircle
      case "announcement":
        return Megaphone
      default:
        return Info
    }
  }

  const getAnnouncementColor = (type: string, severity: string) => {
    switch (severity) {
      case "critical":
        return {
          bg: "bg-red-50 dark:bg-red-950/20",
          border: "border-red-200 dark:border-red-800",
          text: "text-red-800 dark:text-red-200",
          icon: "text-red-600 dark:text-red-400",
          badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        }
      case "high":
        return {
          bg: "bg-orange-50 dark:bg-orange-950/20",
          border: "border-orange-200 dark:border-orange-800",
          text: "text-orange-800 dark:text-orange-200",
          icon: "text-orange-600 dark:text-orange-400",
          badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
        }
      case "medium":
        return {
          bg: "bg-yellow-50 dark:bg-yellow-950/20",
          border: "border-yellow-200 dark:border-yellow-800",
          text: "text-yellow-800 dark:text-yellow-200",
          icon: "text-yellow-600 dark:text-yellow-400",
          badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        }
      default:
        return {
          bg: "bg-blue-50 dark:bg-blue-950/20",
          border: "border-blue-200 dark:border-blue-800",
          text: "text-blue-800 dark:text-blue-200",
          icon: "text-blue-600 dark:text-blue-400",
          badge: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
        }
    }
  }

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || announcement.type === filterType
    const matchesSeverity = filterSeverity === "all" || announcement.severity === filterSeverity
    return matchesSearch && matchesType && matchesSeverity
  })

  const stats = [
    { title: "Total Published", value: announcements.filter((a) => a.status === "published").length, icon: Send },
    {
      title: "Active Alerts",
      value: announcements.filter((a) => a.urgent && a.status === "published").length,
      icon: AlertTriangle,
    },
    { title: "Avg. Read Rate", value: "78%", icon: Eye },
    { title: "Scheduled", value: announcements.filter((a) => a.status === "scheduled").length, icon: Calendar },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Unified Announcement System</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage all community communications from one place</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Announcement</DialogTitle>
              <DialogDescription>Create and publish a new community announcement</DialogDescription>
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
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="info">Information</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="severity">Severity</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Announcement title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="Announcement content" rows={4} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Location" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" placeholder="Time" />
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                <Save className="h-4 w-4 mr-2" />
                Save as Draft
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>
                <Send className="h-4 w-4 mr-2" />
                Publish Now
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="announcement">Announcement</SelectItem>
              <SelectItem value="info">Information</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterSeverity} onValueChange={setFilterSeverity}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="info">Info</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Announcements List */}
      <Card>
        <CardHeader>
          <CardTitle>All Announcements</CardTitle>
          <CardDescription>Manage and track all community communications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAnnouncements.map((announcement, index) => {
              const Icon = getAnnouncementIcon(announcement.type)
              const colors = getAnnouncementColor(announcement.type, announcement.severity)
              const readPercentage = Math.round((announcement.readCount / announcement.totalRecipients) * 100)

              return (
                <div
                  key={announcement.id}
                  className={`border rounded-lg p-4 space-y-3 ${colors.bg} ${colors.border} animate-fade-in-up`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="p-2 rounded-full bg-white/50 dark:bg-gray-800/50">
                        <Icon className={`h-4 w-4 ${colors.icon}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-medium ${colors.text}`}>{announcement.title}</h3>
                          <Badge className={`${colors.badge} text-xs`}>{announcement.type.toUpperCase()}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {announcement.severity.toUpperCase()}
                          </Badge>
                          {announcement.urgent && (
                            <Badge variant="destructive" className="text-xs animate-pulse">
                              URGENT
                            </Badge>
                          )}
                          {announcement.pinned && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                        </div>
                        <p className={`text-sm ${colors.text} mb-2 opacity-90`}>{announcement.content}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className={`h-3 w-3 ${colors.icon}`} />
                            <span className={colors.text}>{announcement.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className={`h-3 w-3 ${colors.icon}`} />
                            <span className={colors.text}>{announcement.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className={`h-3 w-3 ${colors.icon}`} />
                            <span className={colors.text}>{announcement.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className={`h-3 w-3 ${colors.icon}`} />
                            <span className={colors.text}>By: {announcement.author}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={`${colors.badge} text-xs`}>
                        {announcement.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {announcement.status === "published" && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={colors.text}>
                          Read: {announcement.readCount}/{announcement.totalRecipients} ({readPercentage}%)
                        </span>
                        <span className={colors.text}>Channels: {announcement.channels.join(", ")}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${readPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {announcement.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {announcement.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  )
}
