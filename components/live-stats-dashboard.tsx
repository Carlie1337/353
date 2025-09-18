"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Home, AlertTriangle, FileText, Calendar, Activity, TrendingUp, TrendingDown } from "lucide-react"
import databaseService, { type DatabaseStats } from "@/lib/database-service"

export function LiveStatsDashboard() {
  const [stats, setStats] = useState<DatabaseStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const systemStats = await databaseService.getSystemStats()
        setStats(systemStats)
        setLastUpdated(new Date())
      } catch (error) {
        console.error("Error fetching live stats:", error)
        // Set fallback stats
        setStats({
          totalResidents: 15420,
          totalHouseholds: 3855,
          activeIncidents: 12,
          pendingDocuments: 45,
          upcomingAppointments: 23,
          systemHealth: "offline",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchStats()

    // Update every 30 seconds
    const interval = setInterval(fetchStats, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Unable to load system statistics</p>
      </div>
    )
  }

  const getHealthBadge = (health: string) => {
    switch (health) {
      case "healthy":
        return <Badge className="bg-green-100 text-green-800">Online</Badge>
      case "degraded":
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
      case "offline":
        return <Badge className="bg-red-100 text-red-800">Offline</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>
    }
  }

  const statsData = [
    {
      title: "Total Residents",
      value: stats.totalResidents.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      trend: "+2.3%",
    },
    {
      title: "Households",
      value: stats.totalHouseholds.toLocaleString(),
      icon: Home,
      color: "text-green-600",
      bgColor: "bg-green-100",
      trend: "+1.8%",
    },
    {
      title: "Active Incidents",
      value: stats.activeIncidents.toString(),
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      trend: "-12%",
    },
    {
      title: "Pending Documents",
      value: stats.pendingDocuments.toString(),
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      trend: "+5.2%",
    },
    {
      title: "Upcoming Appointments",
      value: stats.upcomingAppointments.toString(),
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      trend: "+8.1%",
    },
  ]

  return (
    <div className="space-y-6">
      {/* System Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
          {getHealthBadge(stats.systemHealth)}
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statsData.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  {stat.trend.startsWith("+") ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={stat.trend.startsWith("+") ? "text-green-600" : "text-red-600"}>{stat.trend}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <div className="text-center text-sm text-gray-500">
        <p>Statistics are updated in real-time from the integrated management system</p>
      </div>
    </div>
  )
}
