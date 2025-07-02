"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  FileText,
  Calendar,
  AlertTriangle,
  Shield,
  Heart,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Megaphone,
  Star,
  ArrowRight,
  Menu,
  X,
} from "lucide-react"
import { useAuth } from "@/components/unified-auth-provider"
import databaseService from "@/lib/database-service"
import type { DatabaseStats, Announcement } from "@/lib/database-service"

export default function HomePage() {
  const { user } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState<DatabaseStats>({
    totalUsers: 1247,
    totalDocuments: 3456,
    totalAppointments: 234,
    totalIncidents: 89,
    activeUsers: 156,
  })
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [systemStatus, setSystemStatus] = useState<"online" | "offline" | "maintenance">("online")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load stats
        const { data: statsData } = await databaseService.getStats()
        if (statsData) setStats(statsData)

        // Load announcements
        const { data: announcementsData } = await databaseService.getAnnouncements(4)
        if (announcementsData) setAnnouncements(announcementsData)

        // Check system health
        const { healthy } = await databaseService.healthCheck()
        setSystemStatus(healthy ? "online" : "offline")
      } catch (error) {
        console.error("Error loading data:", error)
        setSystemStatus("offline")
      }
    }

    loadData()
  }, [])

  const services = [
    {
      title: "Document Services",
      description: "Apply for certificates, clearances, and permits online",
      icon: FileText,
      href: "/documents",
      color: "bg-blue-500",
    },
    {
      title: "Health Portal",
      description: "Book appointments, access medical records, and health programs",
      icon: Heart,
      href: "/health-portal",
      color: "bg-green-500",
    },
    {
      title: "Emergency Services",
      description: "Report incidents, access emergency contacts, and safety information",
      icon: Shield,
      href: "/emergency",
      color: "bg-red-500",
    },
    {
      title: "Resident Portal",
      description: "Manage your profile, household information, and community services",
      icon: Users,
      href: "/portal",
      color: "bg-purple-500",
    },
    {
      title: "Business Services",
      description: "Business registration, permits, and compliance management",
      icon: Building,
      href: "/admin/business",
      color: "bg-orange-500",
    },
    {
      title: "Community Events",
      description: "Stay updated with local events, meetings, and announcements",
      icon: Calendar,
      href: "/portal/bulletin",
      color: "bg-indigo-500",
    },
  ]

  const features = [
    "24/7 Online Services",
    "Real-time Notifications",
    "Mobile-Friendly Design",
    "Secure Data Protection",
    "Multi-language Support",
    "Emergency Response System",
  ]

  const testimonials = [
    {
      name: "Maria Santos",
      role: "Local Resident",
      content: "The online document processing has made my life so much easier. No more long queues!",
      rating: 5,
    },
    {
      name: "Juan Dela Cruz",
      role: "Business Owner",
      content: "Getting business permits is now hassle-free. The system is very user-friendly.",
      rating: 5,
    },
    {
      name: "Ana Reyes",
      role: "Senior Citizen",
      content: "I can now book my medical appointments online. The staff is very helpful too.",
      rating: 5,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "text-green-600"
      case "offline":
        return "text-red-600"
      case "maintenance":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4" />
      case "offline":
        return <XCircle className="h-4 w-4" />
      case "maintenance":
        return <Activity className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "low":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-blue-600">IBMS 3.5.2</h1>
                <p className="text-xs text-gray-500">Integrated Barangay Management System</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/portal" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Services
              </Link>
              <Link href="/emergency" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Emergency
              </Link>
              <Link href="/portal/bulletin" className="text-gray-500 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                News
              </Link>
            </nav>

            {/* System Status & User */}
            <div className="hidden md:flex items-center space-x-4">
              <div className={`flex items-center space-x-1 ${getStatusColor(systemStatus)}`}>
                {getStatusIcon(systemStatus)}
                <span className="text-sm font-medium capitalize">{systemStatus}</span>
              </div>
              <div className="text-sm text-gray-500">{currentTime.toLocaleTimeString()}</div>
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Welcome, {user.name}</span>
                  <Link href="/portal">
                    <Button size="sm">Dashboard</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button variant="outline" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button size="sm">Register</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
                <Link href="/" className="text-gray-900 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                  Home
                </Link>
                <Link
                  href="/portal"
                  className="text-gray-500 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                >
                  Services
                </Link>
                <Link
                  href="/emergency"
                  className="text-gray-500 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                >
                  Emergency
                </Link>
                <Link
                  href="/portal/bulletin"
                  className="text-gray-500 hover:text-blue-600 block px-3 py-2 text-base font-medium"
                >
                  News
                </Link>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-2">
                      <p className="px-3 text-sm text-gray-700">Welcome, {user.name}</p>
                      <Link href="/portal" className="block px-3">
                        <Button size="sm" className="w-full">
                          Dashboard
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2 px-3">
                      <Link href="/login" className="block">
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/register" className="block">
                        <Button size="sm" className="w-full">
                          Register
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Welcome to <span className="text-blue-600">Barangay Bucana</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your digital gateway to efficient, transparent, and accessible barangay services. Experience the future of
              local governance today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portal">
                <Button size="lg" className="text-lg px-8 py-3">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/emergency">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                  <Shield className="mr-2 h-5 w-5" />
                  Emergency Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live System Statistics</h2>
            <p className="text-lg text-gray-600">Real-time data from our integrated management system</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Registered residents</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Documents</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDocuments.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Processed this year</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Appointments</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalAppointments.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Scheduled this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Incidents</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalIncidents}</div>
                <p className="text-xs text-muted-foreground">Reported this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeUsers}</div>
                <p className="text-xs text-muted-foreground">Online now</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Comprehensive digital services for all your barangay needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link key={index} href={service.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-gray-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-800">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
            <p className="text-lg text-gray-600">
              Built with modern technology for maximum efficiency and user experience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-lg text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Announcements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Announcements</h2>
            <p className="text-lg text-gray-600">Stay updated with the latest news and updates from your barangay</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {announcements.length > 0 ? (
              announcements.map((announcement) => (
                <Alert key={announcement.id} className="p-6">
                  <Megaphone className="h-5 w-5" />
                  <div className="ml-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{announcement.title}</h3>
                      <Badge className={getPriorityColor(announcement.priority)}>{announcement.priority}</Badge>
                    </div>
                    <AlertDescription className="text-gray-600 mb-3">{announcement.content}</AlertDescription>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>By {announcement.author_name || "System"}</span>
                      <span>{new Date(announcement.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Alert>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No announcements at this time</p>
              </div>
            )}
          </div>
          <div className="text-center mt-8">
            <Link href="/portal/bulletin">
              <Button variant="outline">
                View All Announcements
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Residents Say</h2>
            <p className="text-lg text-gray-600">Real feedback from our community members</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-50 border-t-4 border-red-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-red-900 mb-4">Emergency Services</h2>
            <p className="text-lg text-red-700">Available 24/7 for all emergency situations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-red-200">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-red-900">Emergency Hotline</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-red-600 mb-2">911</p>
                <p className="text-red-700">24/7 Emergency Response</p>
              </CardContent>
            </Card>
            <Card className="border-red-200">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-red-900">Medical Emergency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-red-600 mb-2">117</p>
                <p className="text-red-700">Medical Response Team</p>
              </CardContent>
            </Card>
            <Card className="border-red-200">
              <CardHeader className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-red-900">Fire Emergency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-3xl font-bold text-red-600 mb-2">116</p>
                <p className="text-red-700">Fire Department</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link href="/emergency">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Shield className="mr-2 h-5 w-5" />
                Access Emergency Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About Barangay Bucana</h2>
              <p className="text-lg text-gray-600 mb-6">
                Barangay Bucana is committed to providing efficient, transparent, and accessible services to all
                residents. Our Integrated Barangay Management System (IBMS) represents our dedication to modernizing
                local governance and improving the quality of life for our community.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Serving over 1,200 families</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">24/7 emergency response</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Digital-first approach to governance</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  <span className="text-gray-700">Transparent and accountable leadership</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 mb-6">
                To provide excellent public service through innovative technology, fostering a safe, progressive, and
                sustainable community for all residents of Barangay Bucana.
              </p>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-blue-100">
                A model barangay that exemplifies good governance, community participation, and technological
                advancement in local public service delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-lg text-gray-600">Get in touch with us for any inquiries or assistance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Barangay Hall, Bucana
                  <br />
                  Davao City, Philippines
                  <br />
                  8000
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  Main Office: (082) 123-4567
                  <br />
                  Emergency: 911
                  <br />
                  Health Center: (082) 123-4568
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-center">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600">
                  info@barangaybucana.gov.ph
                  <br />
                  health@barangaybucana.gov.ph
                  <br />
                  emergency@barangaybucana.gov.ph
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">IBMS 3.5.2</h3>
              <p className="text-gray-400 mb-4">
                Integrated Barangay Management System - Modernizing local governance for better community service.
              </p>
              <div className={`flex items-center space-x-2 ${getStatusColor(systemStatus)}`}>
                {getStatusIcon(systemStatus)}
                <span className="text-sm">System Status: {systemStatus}</span>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/portal" className="text-gray-400 hover:text-white">
                    Resident Portal
                  </Link>
                </li>
                <li>
                  <Link href="/documents" className="text-gray-400 hover:text-white">
                    Document Services
                  </Link>
                </li>
                <li>
                  <Link href="/health-portal" className="text-gray-400 hover:text-white">
                    Health Portal
                  </Link>
                </li>
                <li>
                  <Link href="/emergency" className="text-gray-400 hover:text-white">
                    Emergency Services
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/admin/business" className="text-gray-400 hover:text-white">
                    Business Permits
                  </Link>
                </li>
                <li>
                  <Link href="/portal/bulletin" className="text-gray-400 hover:text-white">
                    Community Events
                  </Link>
                </li>
                <li>
                  <Link href="/portal/incidents" className="text-gray-400 hover:text-white">
                    Report Incidents
                  </Link>
                </li>
                <li>
                  <Link href="/portal/chat" className="text-gray-400 hover:text-white">
                    Live Support
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>(082) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>info@barangaybucana.gov.ph</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Barangay Hall, Bucana</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{currentTime.toLocaleString()}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 Barangay Bucana. All rights reserved. | IBMS v3.5.2 | Powered by modern web technologies
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
