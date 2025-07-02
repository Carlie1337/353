"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { NotificationHub } from "@/components/notification-hub"
import { LiveChatWidget } from "@/components/live-chat-widget"
import { FAQSection } from "@/components/faq-section"
import Link from "next/link"
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle2,
  FileText,
  QrCode,
  User,
  MapPin,
  Heart,
  Activity,
  Phone,
  Megaphone,
  Download,
  Eye,
} from "lucide-react"

export default function ResidentDashboard() {
  const documentRequests = [
    {
      id: "DOC-2025-0123",
      type: "Barangay Clearance",
      status: "Processing",
      progress: 75,
      submittedDate: "2025-01-20",
      estimatedCompletion: "2025-01-25",
      fee: "₱50.00",
      paymentStatus: "Paid",
    },
    {
      id: "DOC-2025-0110",
      type: "Certificate of Residency",
      status: "Completed",
      progress: 100,
      submittedDate: "2025-01-15",
      completedDate: "2025-01-18",
      fee: "₱30.00",
      paymentStatus: "Paid",
    },
    {
      id: "DOC-2025-0098",
      type: "Business Permit",
      status: "Under Review",
      progress: 25,
      submittedDate: "2025-01-18",
      estimatedCompletion: "2025-01-30",
      fee: "₱200.00",
      paymentStatus: "Pending",
    },
  ]

  const announcements = [
    {
      id: 1,
      title: "COVID-19 Vaccination Drive",
      content: "Free COVID-19 booster shots available at the Barangay Health Center from May 25-27, 2025.",
      date: "May 20, 2025",
      priority: "High",
      category: "Health",
      urgent: true,
    },
    {
      id: 2,
      title: "Barangay Cleanup Drive",
      content: "Join our community cleanup drive on May 30, 2025, starting at 7:00 AM.",
      date: "May 18, 2025",
      priority: "Normal",
      category: "Community",
      urgent: false,
    },
    {
      id: 3,
      title: "Water Service Interruption",
      content: "Scheduled maintenance on May 25, 2025, from 9:00 AM to 3:00 PM.",
      date: "May 17, 2025",
      priority: "High",
      category: "Utilities",
      urgent: true,
    },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "COVID-19 Vaccination Drive",
      date: "May 25-27, 2025",
      time: "8:00 AM - 5:00 PM",
      location: "Barangay Health Center",
      category: "Health",
    },
    {
      id: 2,
      title: "Barangay Cleanup Drive",
      date: "May 30, 2025",
      time: "7:00 AM",
      location: "Barangay Plaza",
      category: "Community",
    },
    {
      id: 3,
      title: "Free Skills Training Program",
      date: "June 5-10, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Barangay Multi-Purpose Hall",
      category: "Education",
    },
  ]

  const healthStatus = {
    lastCheckup: "March 15, 2025",
    nextAppointment: "May 30, 2025",
    vaccinations: "Up to date",
    healthPrograms: ["Senior Citizen Program", "Hypertension Monitoring"],
    emergencyContact: "Dr. Maria Santos",
  }

  const quickStats = [
    {
      title: "Document Requests",
      value: "3",
      description: "2 pending, 1 completed",
      icon: FileText,
      color: "text-blue-600",
      href: "/portal/documents",
    },
    {
      title: "Health Status",
      value: "Good",
      description: "Last checkup: Mar 15",
      icon: Heart,
      color: "text-green-600",
      href: "/portal/health",
    },
    {
      title: "Notifications",
      value: "5",
      description: "2 unread messages",
      icon: Bell,
      color: "text-orange-600",
      href: "/portal/bulletin",
    },
    {
      title: "Profile Status",
      value: "Verified",
      description: "Profile complete",
      icon: CheckCircle2,
      color: "text-green-600",
      href: "/portal/profile",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header with Notifications */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Welcome back, Juan!</h2>
          <p className="text-muted-foreground">Here's what's happening in your community today</p>
        </div>
        <div className="flex items-center space-x-2">
          <NotificationHub />
          <Button asChild>
            <Link href="/portal/profile">
              <User className="mr-2 h-4 w-4" />
              My Profile
            </Link>
          </Button>
        </div>
      </div>

      {/* Emergency Alerts Section */}
      <Card className="border-red-200 dark:border-red-900">
        <CardHeader className="bg-red-50 dark:bg-red-950/50 py-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
            <CardTitle className="text-base flex items-center text-red-700 dark:text-red-400">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Active Emergency Alerts
            </CardTitle>
            <Button variant="link" size="sm" className="text-red-700 dark:text-red-400" asChild>
              <Link href="/portal/emergency">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="py-3">
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
              <div className="flex items-center">
                <Badge variant="destructive" className="mr-2 animate-pulse">
                  ACTIVE
                </Badge>
                <span className="font-medium">Flash Flood Warning</span>
              </div>
              <span className="text-xs text-muted-foreground">East Zone, Purok 3-5</span>
            </div>
            <p className="text-sm">
              Flash flooding reported in low-lying areas of East Zone. Residents in Purok 3-5 are advised to evacuate to
              higher ground immediately.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                <Phone className="mr-2 h-4 w-4" />
                Call Emergency
              </Button>
              <Button size="sm" variant="outline">
                View Evacuation Centers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow group" asChild>
          <Link href="/portal/profile/qr">
            <CardContent className="flex flex-col items-center justify-center p-4 md:p-6">
              <QrCode className="h-6 w-6 md:h-8 md:w-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-center text-sm md:text-base">My QR Code</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Digital ID & Verification</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow group" asChild>
          <Link href="/portal/documents">
            <CardContent className="flex flex-col items-center justify-center p-4 md:p-6">
              <FileText className="h-6 w-6 md:h-8 md:w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-center text-sm md:text-base">Request Document</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Certificates & Permits</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow group" asChild>
          <Link href="/portal/map">
            <CardContent className="flex flex-col items-center justify-center p-4 md:p-6">
              <MapPin className="h-6 w-6 md:h-8 md:w-8 text-red-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-center text-sm md:text-base">Barangay Map</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">Facilities & Services</p>
            </CardContent>
          </Link>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow group" asChild>
          <Link href="/portal/bulletin">
            <CardContent className="flex flex-col items-center justify-center p-4 md:p-6">
              <Bell className="h-6 w-6 md:h-8 md:w-8 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-center text-sm md:text-base">Announcements</h3>
              <p className="text-xs text-muted-foreground text-center mt-1">News & Updates</p>
            </CardContent>
          </Link>
        </Card>
      </div>

      {/* Status Overview */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
        {quickStats.map((stat, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow" asChild>
            <Link href={stat.href}>
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-sm md:text-base truncate">{stat.title}</h3>
                    <div className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">{stat.description}</p>
                  </div>
                  <stat.icon className={`h-6 w-6 md:h-8 md:w-8 ${stat.color} flex-shrink-0`} />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
          <TabsTrigger value="requests" className="text-xs md:text-sm">
            My Requests
          </TabsTrigger>
          <TabsTrigger value="announcements" className="text-xs md:text-sm">
            Announcements
          </TabsTrigger>
          <TabsTrigger value="calendar" className="text-xs md:text-sm">
            Events
          </TabsTrigger>
          <TabsTrigger value="health" className="text-xs md:text-sm">
            Health
          </TabsTrigger>
          <TabsTrigger value="help" className="text-xs md:text-sm">
            Help & FAQ
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Document Request Status</CardTitle>
              <CardDescription>Track the progress of your document requests with real-time updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {documentRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <h4 className="font-medium">{request.type}</h4>
                      <p className="text-sm text-muted-foreground">Reference: {request.id}</p>
                    </div>
                    <Badge variant={request.status === "Completed" ? "default" : "secondary"}>{request.status}</Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{request.progress}%</span>
                    </div>
                    <Progress value={request.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Submitted</p>
                      <p className="font-medium">{request.submittedDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Fee</p>
                      <p className="font-medium">{request.fee}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Payment</p>
                      <Badge variant={request.paymentStatus === "Paid" ? "default" : "destructive"} className="text-xs">
                        {request.paymentStatus}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">
                        {request.status === "Completed" ? "Completed" : "Est. Completion"}
                      </p>
                      <p className="font-medium">
                        {request.status === "Completed" ? request.completedDate : request.estimatedCompletion}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/portal/documents/${request.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </Button>
                    {request.status === "Completed" && (
                      <Button size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Document
                      </Button>
                    )}
                    {request.paymentStatus === "Pending" && (
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        Pay Now
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-center">
                <Button asChild>
                  <Link href="/portal/documents">
                    <FileText className="mr-2 h-4 w-4" />
                    View All Requests
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="announcements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Latest Announcements</CardTitle>
              <CardDescription>Stay updated with important news and community updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="border rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 space-y-2 sm:space-y-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <Megaphone className="h-5 w-5 text-primary" />
                      <Badge variant={announcement.priority === "High" ? "destructive" : "secondary"}>
                        {announcement.priority}
                      </Badge>
                      {announcement.urgent && (
                        <Badge variant="destructive" className="animate-pulse">
                          URGENT
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {announcement.category}
                      </Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{announcement.date}</span>
                  </div>
                  <h4 className="font-medium mb-2">{announcement.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{announcement.content}</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/portal/bulletin/${announcement.id}`}>Read More</Link>
                  </Button>
                </div>
              ))}
              <div className="text-center">
                <Button asChild>
                  <Link href="/portal/bulletin">
                    <Bell className="mr-2 h-4 w-4" />
                    View All Announcements
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Mark your calendar for these important barangay events</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center border rounded-lg p-4 space-y-3 sm:space-y-0"
                >
                  <div className="mr-0 sm:mr-4 mb-3 sm:mb-0 rounded-full bg-primary/10 p-3">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-1 space-y-1 sm:space-y-0">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                        <span>📅 {event.date}</span>
                        <span>🕐 {event.time}</span>
                      </div>
                      <div>📍 {event.location}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="mt-3 sm:mt-0 bg-transparent">
                    Add to Calendar
                  </Button>
                </div>
              ))}
              <div className="text-center">
                <Button asChild>
                  <Link href="/portal/events">
                    <Calendar className="mr-2 h-4 w-4" />
                    View All Events
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Status Overview</CardTitle>
              <CardDescription>Your health information and upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Recent Health Activity</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Checkup:</span>
                        <span>{healthStatus.lastCheckup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Next Appointment:</span>
                        <span className="font-medium text-blue-600">{healthStatus.nextAppointment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Vaccination Status:</span>
                        <Badge variant="default" className="text-xs">
                          {healthStatus.vaccinations}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Health Programs</h4>
                    <div className="space-y-2">
                      {healthStatus.healthPrograms.map((program, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{program}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Emergency Contact</h4>
                    <div className="border rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-5 w-5 text-red-600" />
                        <span className="font-medium">{healthStatus.emergencyContact}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Barangay Health Officer</p>
                      <Button size="sm" className="mt-2 w-full">
                        <Phone className="mr-2 h-4 w-4" />
                        Contact Now
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button size="sm" variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/portal/book-appointment">
                          <Calendar className="mr-2 h-4 w-4" />
                          Book Appointment
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/portal/health">
                          <FileText className="mr-2 h-4 w-4" />
                          View Medical Records
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="w-full justify-start bg-transparent" asChild>
                        <Link href="/health-portal">
                          <Activity className="mr-2 h-4 w-4" />
                          Health Programs
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="help" className="space-y-4">
          <FAQSection />
        </TabsContent>
      </Tabs>

      {/* Live Chat Widget */}
      <LiveChatWidget />
    </div>
  )
}
