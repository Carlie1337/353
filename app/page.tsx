"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Users,
  FileText,
  Calendar,
  Shield,
  Heart,
  MapPin,
  Phone,
  Mail,
  AlertTriangle,
  Wifi,
  WifiOff,
} from "lucide-react"
import { LiveStatsDashboard } from "@/components/live-stats-dashboard"
import { NewsFeed } from "@/components/news-feed"
import { EmergencyAlertBanner } from "@/components/emergency-alert-banner"
import { WeatherWidget } from "@/components/weather-widget"
import { EnhancedFooter } from "@/components/enhanced-footer"
import { officialsService, type BarangayOfficial } from "@/lib/officials-service"
import databaseService, { type SystemStats } from "@/lib/database-service"
import { getSupabaseHealth } from "@/lib/supabase-client"

interface SystemHealth {
  database: boolean
  supabase: boolean
  responseTime?: number
}

export default function LandingPage() {
  const [officials, setOfficials] = useState<BarangayOfficial[]>([])
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    database: false,
    supabase: false,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Check system health first
      const healthCheck = await getSupabaseHealth()
      setSystemHealth({
        database: healthCheck.isConnected,
        supabase: healthCheck.isConnected,
        responseTime: healthCheck.responseTime,
      })

      // Load data in parallel with error handling
      const [officialsResult, statsResult] = await Promise.allSettled([
        officialsService.getAllOfficials(),
        databaseService.getSystemStats(),
      ])

      // Handle officials data
      if (officialsResult.status === "fulfilled") {
        setOfficials(officialsResult.value)
      } else {
        console.error("Error loading officials:", officialsResult.reason)
        // Use fallback officials
        setOfficials(officialsService.getFallbackOfficials())
      }

      // Handle stats data
      if (statsResult.status === "fulfilled") {
        setStats(statsResult.value)
      } else {
        console.error("Error loading stats:", statsResult.reason)
        // Use fallback stats
        setStats({
          totalResidents: 1247,
          activeIncidents: 3,
          pendingDocuments: 12,
          upcomingEvents: 5,
          healthAppointments: 8,
          onlineUsers: 23,
        })
      }
    } catch (err: any) {
      console.error("Error loading data:", err)
      setError(err.message || "Failed to load system data")

      // Set fallback data
      setOfficials(officialsService.getFallbackOfficials())
      setStats({
        totalResidents: 1247,
        activeIncidents: 3,
        pendingDocuments: 12,
        upcomingEvents: 5,
        healthAppointments: 8,
        onlineUsers: 23,
      })
    } finally {
      setLoading(false)
    }
  }

  const SystemStatusIndicator = () => (
    <div className="flex items-center gap-2 text-sm">
      {systemHealth.supabase ? (
        <div className="flex items-center gap-1 text-green-600">
          <Wifi className="h-4 w-4" />
          <span>System Online</span>
          {systemHealth.responseTime && <span className="text-gray-500">({systemHealth.responseTime}ms)</span>}
        </div>
      ) : (
        <div className="flex items-center gap-1 text-amber-600">
          <WifiOff className="h-4 w-4" />
          <span>Offline Mode</span>
        </div>
      )}
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-64 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Emergency Alert Banner */}
      <EmergencyAlertBanner />

      {/* System Status Bar */}
      <div className="bg-white border-b px-4 py-2">
        <div className="container mx-auto flex justify-between items-center">
          <SystemStatusIndicator />
          <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="container mx-auto px-4 pt-4">
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error} - System is running in offline mode with cached data.</AlertDescription>
          </Alert>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-blue-600">Barangay</span>{" "}
            <span className="text-green-600">Management System</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your comprehensive digital platform for barangay services, emergency response, health management, and
            community engagement.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/portal">
                <Users className="mr-2 h-5 w-5" />
                Resident Portal
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/emergency">
                <Shield className="mr-2 h-5 w-5" />
                Emergency Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Live Stats Dashboard */}
      {stats && <LiveStatsDashboard stats={stats} />}

      {/* Quick Access Services */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Quick Access Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Document Requests
              </CardTitle>
              <CardDescription>Request barangay clearance, certificates, and permits online</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/documents">Access Service</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-600" />
                Health Services
              </CardTitle>
              <CardDescription>Book appointments, access medical records, and health programs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/health-portal">Access Service</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Emergency Response
              </CardTitle>
              <CardDescription>Report incidents, access ResQNet, and emergency contacts</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/ResQNet">Access Service</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-purple-600" />
                Events & Programs
              </CardTitle>
              <CardDescription>Stay updated with community events and programs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/portal/bulletin">View Events</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-orange-600" />
                Interactive Map
              </CardTitle>
              <CardDescription>Explore barangay facilities, services, and locations</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/portal/map">View Map</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-indigo-600" />
                Resident Services
              </CardTitle>
              <CardDescription>Access your profile, household info, and personal services</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/portal/profile">Access Portal</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Barangay Officials */}
      <section className="container mx-auto px-4 py-12 bg-white/50 rounded-lg mx-4">
        <h2 className="text-3xl font-bold text-center mb-8">Barangay Officials</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {officials.map((official) => (
            <Card key={official.id} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {official.photo_url ? (
                    <img
                      src={official.photo_url || "/placeholder.svg"}
                      alt={official.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <CardTitle className="text-lg">{official.name}</CardTitle>
                <CardDescription>{official.position}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {official.contact_number && (
                    <div className="flex items-center justify-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{official.contact_number}</span>
                    </div>
                  )}
                  {official.email && (
                    <div className="flex items-center justify-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="text-xs">{official.email}</span>
                    </div>
                  )}
                  <Badge variant="secondary" className="mt-2">
                    {official.status === "active" ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* News and Weather */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <NewsFeed />
          </div>
          <div>
            <WeatherWidget />
          </div>
        </div>
      </section>

      {/* System Access Portals */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">System Access</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">Admin Portal</CardTitle>
              <CardDescription className="text-center">Administrative access for barangay management</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href="/admin">Admin Login</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">Health Portal</CardTitle>
              <CardDescription className="text-center">Health worker and medical staff access</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href="/health-portal">Health Login</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">Tanod Portal</CardTitle>
              <CardDescription className="text-center">Barangay tanod and security personnel</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href="/tanod">Tanod Login</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-center">Official Portal</CardTitle>
              <CardDescription className="text-center">Barangay officials and council members</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-transparent" variant="outline">
                <Link href="/Bofficial">Official Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Footer */}
      <EnhancedFooter />
    </div>
  )
}
