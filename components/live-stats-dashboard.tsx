"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, AlertTriangle, FileText, Calendar, Heart, Activity } from "lucide-react"
import type { SystemStats } from "@/lib/database-service"

interface LiveStatsDashboardProps {
  stats: SystemStats
}

export function LiveStatsDashboard({ stats }: LiveStatsDashboardProps) {
  const statCards = [
    {
      title: "Total Residents",
      value: stats.totalResidents.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Active Incidents",
      value: stats.activeIncidents.toString(),
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Pending Documents",
      value: stats.pendingDocuments.toString(),
      icon: FileText,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents.toString(),
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Health Appointments",
      value: stats.healthAppointments.toString(),
      icon: Heart,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Online Users",
      value: stats.onlineUsers.toString(),
      icon: Activity,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Live System Statistics</h2>
        <p className="text-gray-600">Real-time data from the barangay management system</p>
        <Badge variant="outline" className="mt-2">
          <Activity className="h-3 w-3 mr-1" />
          Updated every 30 seconds
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">Live data</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
