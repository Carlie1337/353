"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Users,
  FileText,
  DollarSign,
  Calendar,
  Bell,
  CheckCircle,
  Building,
  MapPin,
  BarChart3,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

export default function BofficialDashboard() {
  const stats = [
    {
      title: "Total Residents",
      value: "2,853",
      change: "+12 this month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Pending Documents",
      value: "47",
      change: "-8 from last week",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Budget Utilization",
      value: "₱2.4M",
      change: "68% utilized",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Projects",
      value: "12",
      change: "3 completed this quarter",
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentDocuments = [
    {
      id: "DOC-2024-001",
      type: "Barangay Clearance",
      applicant: "Maria Santos",
      status: "pending",
      date: "2024-01-15",
      priority: "normal",
    },
    {
      id: "DOC-2024-002",
      type: "Business Permit",
      applicant: "Juan Dela Cruz",
      status: "approved",
      date: "2024-01-14",
      priority: "high",
    },
    {
      id: "DOC-2024-003",
      type: "Certificate of Residency",
      applicant: "Ana Rodriguez",
      status: "pending",
      date: "2024-01-14",
      priority: "normal",
    },
    {
      id: "DOC-2024-004",
      type: "Building Permit",
      applicant: "Carlos Mendoza",
      status: "review",
      date: "2024-01-13",
      priority: "high",
    },
  ]

  const upcomingMeetings = [
    {
      title: "Monthly Barangay Assembly",
      date: "2024-01-20",
      time: "9:00 AM",
      location: "Barangay Hall",
      attendees: 15,
    },
    {
      title: "Budget Planning Session",
      date: "2024-01-22",
      time: "2:00 PM",
      location: "Conference Room",
      attendees: 8,
    },
    {
      title: "Community Health Program Review",
      date: "2024-01-25",
      time: "10:00 AM",
      location: "Health Center",
      attendees: 12,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "review":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Crown className="h-8 w-8 text-yellow-600" />
            Barangay Official Dashboard
          </h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening in Barangay Bucana today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
            Official Access
          </Badge>
          <Button asChild>
            <Link href="/Bofficial/announcements">
              <Bell className="h-4 w-4 mr-2" />
              New Announcement
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`h-8 w-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="documents" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="documents">Document Requests</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Document Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Document Requests
                </CardTitle>
                <CardDescription>Documents requiring your approval or review</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{doc.type}</span>
                        <Badge className={`text-xs ${getPriorityColor(doc.priority)}`}>{doc.priority}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{doc.applicant}</p>
                      <p className="text-xs text-muted-foreground">{doc.date}</p>
                    </div>
                    <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                  </div>
                ))}
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/Bofficial/documents">View All Documents</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Document Processing Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Document Processing</CardTitle>
                <CardDescription>Current month processing statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Approved Documents</span>
                    <span>156/200</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average Processing Time</span>
                    <span>2.3 days</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Resident Satisfaction</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-xs text-muted-foreground">Approved</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">47</div>
                    <div className="text-xs text-muted-foreground">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="meetings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Meetings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Meetings
                </CardTitle>
                <CardDescription>Scheduled meetings and assemblies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMeetings.map((meeting, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{meeting.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{meeting.date}</span>
                          <span>{meeting.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          <span>{meeting.location}</span>
                        </div>
                      </div>
                      <Badge variant="outline">{meeting.attendees} attendees</Badge>
                    </div>
                  </div>
                ))}
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/Bofficial/meetings">View All Meetings</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Meeting Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Meeting Management</CardTitle>
                <CardDescription>Quick actions for meeting management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/Bofficial/meetings/schedule">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule New Meeting
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/Bofficial/meetings/minutes">
                    <FileText className="h-4 w-4 mr-2" />
                    Meeting Minutes
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/Bofficial/meetings/attendance">
                    <Users className="h-4 w-4 mr-2" />
                    Attendance Records
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/Bofficial/meetings/resolutions">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Resolutions
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Active Projects */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Active Projects
                </CardTitle>
                <CardDescription>Current infrastructure and community projects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Road Improvement Project",
                    progress: 75,
                    budget: "₱500,000",
                    deadline: "March 2024",
                    status: "On Track",
                  },
                  {
                    name: "Community Center Renovation",
                    progress: 45,
                    budget: "₱800,000",
                    deadline: "April 2024",
                    status: "In Progress",
                  },
                  {
                    name: "Drainage System Upgrade",
                    progress: 90,
                    budget: "₱300,000",
                    deadline: "February 2024",
                    status: "Near Completion",
                  },
                ].map((project, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{project.name}</h4>
                      <Badge variant="outline">{project.status}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Budget: {project.budget}</span>
                      <span>Due: {project.deadline}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Project Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
                <CardDescription>Overall project statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">12</div>
                  <div className="text-sm text-muted-foreground">Active Projects</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-green-600">8</div>
                  <div className="text-sm text-muted-foreground">Completed This Year</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-orange-600">₱2.4M</div>
                  <div className="text-sm text-muted-foreground">Total Budget</div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/Bofficial/projects">View All Projects</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Service Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Service Analytics
                </CardTitle>
                <CardDescription>Monthly service delivery metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Document Requests</span>
                    <span className="font-medium">203</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Business Permits</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Health Services</span>
                    <span className="font-medium">128</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Emergency Response</span>
                    <span className="font-medium">12</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/Bofficial/analytics">View Detailed Analytics</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Community Feedback */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Community Feedback
                </CardTitle>
                <CardDescription>Recent feedback and suggestions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    {
                      feedback: "Great improvement in document processing time!",
                      rating: 5,
                      date: "2024-01-15",
                    },
                    {
                      feedback: "Need better street lighting in Purok 3",
                      rating: 3,
                      date: "2024-01-14",
                    },
                    {
                      feedback: "Health center services are excellent",
                      rating: 5,
                      date: "2024-01-13",
                    },
                  ].map((item, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2">
                      <p className="text-sm">{item.feedback}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Rating: {item.rating}/5</span>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/Bofficial/feedback">View All Feedback</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
