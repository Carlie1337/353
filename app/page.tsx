"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, FileText, Calendar, AlertTriangle, Shield, Heart, Building, Phone, Mail, MapPin, CheckCircle, XCircle, Activity, Star, ArrowRight, Menu, X, Crown, Award, UserCheck, Globe, Zap, Lock, Smartphone, Home, ChevronDown, Clock, PhoneCall } from 'lucide-react'
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
  const [dataLoading, setDataLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const loadData = async () => {
      try {
        setDataLoading(true)
        
        // Load officials with error handling
        try {
          const { data: officialsData } = await officialsService.getAllOfficials()
          if (officialsData) setOfficials(officialsData)
        } catch (error) {
          console.warn("Could not load officials data:", error)
          // Load fallback officials data
          setOfficials([
            {
              id: "1",
              name: "Hon. Maria Santos",
              position: "Barangay Captain",
              description: "Leading our community with integrity and dedication to public service for over 10 years.",
              contact_email: "captain@barangaybucana.gov.ph",
              contact_phone: "(082) 123-4567",
              achievements: ["Community Development Award 2023", "Excellence in Governance Award 2022"],
              image_url: "/placeholder.svg?height=120&width=120",
              active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "2",
              name: "Hon. Juan Dela Cruz",
              position: "Barangay Kagawad - Infrastructure",
              description: "Committed to improving infrastructure and community development programs.",
              contact_email: "kagawad1@barangaybucana.gov.ph",
              contact_phone: "(082) 123-4568",
              achievements: ["Infrastructure Development Award 2023"],
              image_url: "/placeholder.svg?height=80&width=80",
              active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "3",
              name: "Hon. Ana Reyes",
              position: "Barangay Kagawad - Health & Wellness",
              description: "Advocating for health and wellness programs for all residents.",
              contact_email: "kagawad2@barangaybucana.gov.ph",
              contact_phone: "(082) 123-4569",
              achievements: ["Health Advocacy Award 2022"],
              image_url: "/placeholder.svg?height=80&width=80",
              active: true,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ])
        }

        // Check system health with error handling
        try {
          const { healthy } = await databaseService.healthCheck()
          setSystemStatus(healthy ? "online" : "offline")
        } catch (error) {
          console.warn("Could not check system health:", error)
          setSystemStatus("maintenance")
        }

      } catch (error) {
        console.error("Error loading page data:", error)
        setSystemStatus("offline")
      } finally {
        setDataLoading(false)
      }
    }

    loadData()
  }, [])

  const barangayStats = [
    {
      icon: Users,
      number: "15,420",
      label: "Total Population",
      color: "text-blue-600",
    },
    {
      icon: Home,
      number: "3,855",
      label: "Households",
      color: "text-green-600",
    },
    {
      icon: MapPin,
      number: "12",
      label: "Puroks",
      color: "text-purple-600",
    },
    {
      icon: Globe,
      number: "2.5 sq km",
      label: "Total Area",
      color: "text-orange-600",
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
    <div className="min-h-screen bg-white">
      {/* Health Advisory Banner */}
      <div className="bg-blue-500 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="font-semibold">Community Health Advisory</span>
              <Badge className="bg-yellow-400 text-blue-900 text-xs px-2 py-1">MEDIUM</Badge>
            </div>
            <span className="text-blue-100 hidden md:inline">
              Free COVID-19 vaccination available at Barangay Health Station. Walk-ins welcome from 8AM-5PM.
            </span>
          </div>
          <div className="text-blue-200 text-sm">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {/* Top Contact Bar */}
      <div className="bg-blue-600 text-white px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">+63 912 345 6789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span className="hidden md:inline">barangay.bucana@davao.gov.ph</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="hidden md:inline">Mon-Fri: 8:00 AM - 5:00 PM</span>
            </div>
            {user ? (
              <Link href="/portal">
                <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50 text-xs px-3 py-1">
                  My Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/portal">
                <Button size="sm" className="bg-white text-blue-600 hover:bg-blue-50 text-xs px-3 py-1">
                  Resident Portal
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src="/placeholder.svg?height=60&width=60"
                  alt="Barangay Logo"
                  className="h-14 w-14 rounded-full border-2 border-blue-600"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Barangay Bucana</h1>
                <p className="text-sm text-gray-600">Davao City, Davao del Sur</p>
                <p className="text-xs text-blue-600 font-medium">Official Website</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="/" className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-semibold border-b-2 border-blue-600">
                <Home className="h-4 w-4 inline mr-1" />
                Home
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center">
                About
                <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              <Link href="#officials" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center">
                Officials
                <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              <Link href="/portal" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center">
                Services
                <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              <Link href="/portal/bulletin" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium flex items-center">
                Programs
                <ChevronDown className="h-4 w-4 ml-1" />
              </Link>
              <Link href="/portal/bulletin" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                News
              </Link>
              <Link href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Contact
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link href="/" className="text-blue-600 hover:text-blue-800 block px-3 py-2 text-base font-semibold">
                  Home
                </Link>
                <Link href="#about" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                  About
                </Link>
                <Link href="#officials" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                  Officials
                </Link>
                <Link href="/portal" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                  Services
                </Link>
                <Link href="/portal/bulletin" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                  News
                </Link>
                <Link href="#contact" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Badge className="bg-white/20 text-white border-white/30 text-sm px-4 py-2 mb-4">
              🏛️ Official Government Website
            </Badge>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to
            <br />
            <span className="text-yellow-300">Barangay Bucana</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed">
            Your trusted local government unit committed to serving the community with 
            transparency, efficiency, and dedication.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portal">
              <Button size="lg" className="text-lg px-8 py-4 bg-white text-blue-700 hover:bg-blue-50 font-semibold">
                <Users className="mr-2 h-5 w-5" />
                Resident Services
              </Button>
            </Link>
            <Link href="/emergency">
              <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-700 font-semibold">
                <PhoneCall className="mr-2 h-5 w-5" />
                Emergency Hotline
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Barangay Information Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Barangay Information</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn more about our barangay's profile, demographics, and key information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {barangayStats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow bg-white border-0 shadow-md">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center`}>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Access comprehensive digital services designed to make your barangay transactions easier and more efficient.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-bold">Document Services</CardTitle>
                <CardDescription>
                  Apply for certificates, clearances, and permits online with our digital processing system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/documents">
                  <Button className="w-full">Access Service</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-green-200 transition-colors">
                  <Heart className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-bold">Health Services</CardTitle>
                <CardDescription>
                  Book medical appointments, access health programs, and manage your health records.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/health-portal">
                  <Button className="w-full">Access Service</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-red-200 transition-colors">
                  <Shield className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl font-bold">Emergency Services</CardTitle>
                <CardDescription>
                  Report incidents, access emergency contacts, and get real-time safety information.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/emergency">
                  <Button className="w-full">Access Service</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-purple-200 transition-colors">
                  <Building className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-bold">Business Services</CardTitle>
                <CardDescription>
                  Register your business, apply for permits, and manage compliance requirements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/admin/business">
                  <Button className="w-full">Access Service</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-orange-200 transition-colors">
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl font-bold">Community Events</CardTitle>
                <CardDescription>
                  Stay updated with local events, meetings, and community announcements.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/portal/bulletin">
                  <Button className="w-full">Access Service</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow group cursor-pointer">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-indigo-200 transition-colors">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl font-bold">Resident Portal</CardTitle>
                <CardDescription>
                  Manage your profile, household information, and access personalized services.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/portal">
                  <Button className="w-full">Access Service</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Statistics - Only show if not loading */}
      {!dataLoading && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Live System Statistics</h2>
              <p className="text-lg text-gray-600">Real-time data from our integrated management system</p>
            </div>
            <LiveStatsDashboard />
          </div>
        </section>
      )}

      {/* Barangay Officials Section */}
      <section id="officials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Your Barangay Officials</h2>
            <p className="text-lg text-gray-600">
              Dedicated leaders serving the community with integrity and excellence
            </p>
          </div>

          {/* Barangay Captain - Featured */}
          {officials
            .filter((o) => o.position.includes("Captain"))
            .map((captain) => (
              <div key={captain.id} className="mb-16">
                <Card className="overflow-hidden">
                  <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="relative">
                        <img
                          src={captain.image_url || "/placeholder.svg?height=120&width=120"}
                          alt={captain.name}
                          className="w-32 h-32 rounded-full border-4 border-blue-600 shadow-lg"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-full">
                          <Crown className="h-6 w-6" />
                        </div>
                      </div>
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{captain.name}</h3>
                        <Badge className="bg-blue-600 text-white mb-4 text-sm">{captain.position}</Badge>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">{captain.description}</p>
                        <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                          {captain.achievements?.map((achievement, index) => (
                            <Badge key={index} variant="outline" className="border-blue-200 text-blue-700">
                              <Award className="h-3 w-3 mr-1" />
                              {achievement}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 justify-center md:justify-start text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{captain.contact_email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{captain.contact_phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}

          {/* Other Officials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {officials
              .filter((o) => !o.position.includes("Captain"))
              .map((official, index) => (
                <Card key={official.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <img
                      src={official.image_url || "/placeholder.svg?height=80&width=80"}
                      alt={official.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-gray-200"
                    />
                    <h4 className="font-bold text-lg mb-2 text-gray-900">{official.name}</h4>
                    <Badge className="bg-gray-100 text-gray-700 mb-3 text-xs">{official.position}</Badge>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{official.description}</p>
                    <div className="space-y-2 mb-4">
                      {official.achievements?.map((achievement, achIndex) => (
                        <Badge key={achIndex} variant="outline" className="border-gray-200 text-gray-600 text-xs block">
                          <Award className="h-3 w-3 mr-1" />
                          {achievement}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <Mail className="h-3 w-3" />
                      <span>{official.contact_email}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>

          {/* Contact All Officials */}
          <div className="text-center mt-12">
            <Link href="/Bofficial">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <UserCheck className="mr-2 h-5 w-5" />
                Official Portal Access
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News & Announcements - Only show if not loading */}
      {!dataLoading && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <NewsFeed limit={6} />
          </div>
        </section>
      )}

      {/* Emergency Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-red-50 border-t-4 border-red-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-red-900 mb-4">Emergency Services</h2>
            <p className="text-lg text-red-700">Available 24/7 for all emergency situations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-red-900">Emergency Hotline</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold text-red-600 mb-2">911</p>
                <p className="text-red-700 font-medium">24/7 Emergency Response</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-red-900">Medical Emergency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold text-red-600 mb-2">117</p>
                <p className="text-red-700 font-medium">Medical Response Team</p>
              </CardContent>
            </Card>
            <Card className="border-red-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-red-900">Fire Emergency</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-4xl font-bold text-red-600 mb-2">116</p>
                <p className="text-red-700 font-medium">Fire Department</p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-8">
            <Link href="/emergency">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8 py-4">
                <Shield className="mr-2 h-5 w-5" />
                Access Emergency Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-lg text-gray-600">Get in touch with us for any inquiries or assistance</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Visit Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  Barangay Hall, 76-A Bucana
                  <br />
                  Davao City, Davao del Sur
                  <br />
                  Philippines 8000
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Call Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  Main Office: (082) 123-4567
                  <br />
                  Emergency: 911
                  <br />
                  Health Center: (082) 123-4568
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Email Us</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 leading-relaxed">
                  barangay.bucana@davao.gov.ph
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
