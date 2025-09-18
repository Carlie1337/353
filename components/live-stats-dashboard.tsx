"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Users, FileText, Calendar, AlertTriangle, Heart, Activity, TrendingUp, Clock } from "lucide-react"

export interface SystemStats {
  totalResidents: number
  activeIncidents: number
  pendingDocuments: number
  upcomingEvents: number
  healthAppointments: number
  onlineUsers: number
}

interface LiveStatsDashboardProps {
  stats: SystemStats
}

export function LiveStatsDashboard({ stats }: LiveStatsDashboardProps) {
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    // Update timestamp every minute
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 60000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const statCards = [
    {
      title: "Total Residents",
      value: stats.totalResidents,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      description: "Registered residents",
      trend: "+2.5%",
    },
    {
      title: "Active Incidents",
      value: stats.activeIncidents,
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      description: "Ongoing incidents",
      trend: "-12%",
    },
    {
      title: "Pending Documents",
      value: stats.pendingDocuments,
      icon: FileText,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      description: "Awaiting processing",
      trend: "+5.2%",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents,
      icon: Calendar,
      color: "text-green-600",
      bgColor: "bg-green-50",
      description: "Scheduled events",
      trend: "+8.1%",
    },
    {
      title: "Health Appointments",
      value: stats.healthAppointments,
      icon: Heart,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      description: "Today's appointments",
      trend: "+15.3%",
    },
    {
      title: "Online Users",
      value: stats.onlineUsers,
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      description: "Currently active",
      trend: "+22.7%",
    },
  ]

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Live System Dashboard</h2>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          <Badge variant="outline" className="ml-2">
            <Activity className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          const progressValue = Math.min((stat.value / 100) * 100, 100)

          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline justify-between mb-2">
                  <div className="text-2xl font-bold text-gray-900">{stat.value.toLocaleString()}</div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                  </div>
                </div>
                <CardDescription className="text-xs text-gray-500 mb-3">{stat.description}</CardDescription>
                <Progress value={progressValue} className="h-2" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* System Health Indicators */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-green-600" />
            System Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45ms</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2.1GB</div>
              <div className="text-sm text-gray-600">Memory Usage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">12%</div>
              <div className="text-sm text-gray-600">CPU Usage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
