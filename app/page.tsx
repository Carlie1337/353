"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  CheckCircle,
  XCircle,
  Activity,
  Star,
  ArrowRight,
  Menu,
  X,
  Crown,
  Award,
  UserCheck,
} from "lucide-react"
import { useAuth } from "@/components/unified-auth-provider"
import { EmergencyAlertBanner } from "@/components/emergency-alert-banner"
import { LiveStatsDashboard } from "@/components/live-stats-dashboard"
import { NewsFeed } from "@/components/news-feed"
import { EnhancedFooter } from "@/components/enhanced-footer"
import databaseService from "@/lib/database-service"
import officialsService, { type Official } from "@/lib/officials-service"

export default function HomePage() {
  const { user } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [officials, setOfficials] = useState<Official[]>([])
  const [systemStatus, setSystemStatus] = useState<"online" | "offline" | "maintenance">("online")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load officials
        const { data: officialsData } = await officialsService.getAllOfficials()
        if (officialsData) setOfficials(officialsData)

        // Check system health
        const { healthy } = await databaseService.healthCheck()
        setSystemStatus(healthy ? "online" : "offline")
      } catch (error) {
        console.error("Error loading data:", error)
        setSystemStatus("offline")
        // Load fallback officials data
        setOfficials([
          {
            id: "1",
            name: "Hon. Maria Santos",
            position: "Barangay Captain",
            description: "Leading our community with integrity and dedication to public service.",
            contact_email: "captain@barangaybucana.gov.ph",
            contact_phone: "(082) 123-4567",
            achievements: ["Community Development Award 2023", "Excellence in Governance"],
            image_url: "/placeholder.svg?height=120&width=120",
            active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Emergency Alert Banner */}
      <EmergencyAlertBanner />

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
                  <Link href="/auth/login">
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
                      <Link href="/auth/login" className="block">
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
          <LiveStatsDashboard />
        </div>
      </section>

      {/* Barangay Officials Section - Now Dynamic */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Crown className="h-8 w-8 text-yellow-400" />
              Meet Your Barangay Officials
            </h2>
            <p className="text-xl text-blue-100">
              Dedicated leaders serving the community with integrity and excellence
            </p>
          </div>

          {/* Barangay Captain - Featured */}
          {officials
            .filter((o) => o.position.includes("Captain"))
            .map((captain) => (
              <div key={captain.id} className="mb-12">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative">
                        <img
                          src={captain.image_url || "/placeholder.svg?height=120&width=120"}
                          alt={captain.name}
                          className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-blue-900 p-2 rounded-full">
                          <Crown className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">{captain.name}</h3>
                        <Badge className="bg-yellow-400 text-blue-900 mb-4 text-sm">{captain.position}</Badge>
                        <p className="text-blue-100 mb-4 text-lg">{captain.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                          {captain.achievements?.map((achievement, index) => (
                            <Badge key={index} variant="outline" className="border-white/30 text-white">
                              <Award className="h-3 w-3 mr-1" />
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                          <Mail className="h-4 w-4" />
                          <span className="text-blue-100">{captain.contact_email}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}

          {/* Other Officials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {officials
              .filter((o) => !o.position.includes("Captain"))
              .map((official, index) => (
                <Card
                  key={official.id}
                  className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <img
                      src={official.image_url || "/placeholder.svg?height=80&width=80"}
                      alt={official.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-white/30"
                    />
                    <h4 className="font-bold text-lg mb-2">{official.name}</h4>
                    <Badge className="bg-blue-500/50 text-white mb-3 text-xs">{official.position}</Badge>
                    <p className="text-blue-100 text-sm mb-4">{official.description}</p>
                    <div className="space-y-2">
                      {official.achievements?.map((achievement, achIndex) => (
                        <Badge key={achIndex} variant="outline" className="border-white/30 text-white text-xs block">
                          <Award className="h-3 w-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm">
                      <Mail className="h-3 w-3" />
                      <span className="text-blue-100">{official.contact_email}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Contact All Officials */}
          <div className="text-center mt-12">
            <Link href="/Bofficial">
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300">
                <UserCheck className="mr-2 h-5 w-5" />
                Official Portal Access
              </Button>
            </Link>
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

      {/* News & Announcements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <NewsFeed limit={6} />
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

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  )
}
