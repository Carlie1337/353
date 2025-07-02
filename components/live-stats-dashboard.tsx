"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  Calendar,
  AlertTriangle,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Heart,
  Shield,
} from "lucide-react"
import { useResidents } from "@/hooks/useResidents"
import { useIncidents } from "@/hooks/useIncidents"
import { useAppointments } from "@/hooks/useAppointments"

interface StatCard {
  title: string
  value: number
  change?: number
  changeType?: "increase" | "decrease"
  icon: React.ElementType
  color: string
  description: string
}

export function LiveStatsDashboard() {
  const { getResidentStats } = useResidents()
  const { getIncidentStats } = useIncidents()
  const { getAppointmentStats } = useAppointments()

  const [stats, setStats] = useState({
    residents: { total: 0, male: 0, female: 0, married: 0, single: 0 },
    incidents: { total: 0, pending: 0, investigating: 0, resolved: 0, critical: 0 },
    appointments: { total: 0, today: 0, pending: 0, confirmed: 0, completed: 0 },
  })

  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    loadAllStats()

    // Update stats every 30 seconds
    const interval = setInterval(loadAllStats, 30000)

    return () => clearInterval(interval)
  }, [])

  const loadAllStats = async () => {
    try {
      const [residentStats, incidentStats, appointmentStats] = await Promise.all([
        getResidentStats(),
        getIncidentStats(),
        getAppointmentStats(),
      ])

      setStats({
        residents: residentStats,
        incidents: incidentStats,
        appointments: appointmentStats,
      })

      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error loading stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards: StatCard[] = [
    {
      title: "Total Residents",
      value: stats.residents.total,
      change: 12,
      changeType: "increase",
      icon: Users,
      color: "bg-blue-500",
      description: "Registered residents",
    },
    {
      title: "Active Incidents",
      value: stats.incidents.pending + stats.incidents.investigating,
      change: -3,
      changeType: "decrease",
      icon: AlertTriangle,
      color: "bg-red-500",
      description: "Pending & investigating",
    },
    {
      title: "Today's Appointments",
      value: stats.appointments.today,
      change: 5,
      changeType: "increase",
      icon: Calendar,
      color: "bg-green-500",
      description: "Scheduled for today",
    },
    {
      title: "Documents Processed",
      value: 156,
      change: 8,
      changeType: "increase",
      icon: FileText,
      color: "bg-purple-500",
      description: "This month",
    },
    {
      title: "Health Services",
      value: 89,
      change: 15,
      changeType: "increase",
      icon: Heart,
      color: "bg-pink-500",
      description: "Consultations this week",
    },
    {
      title: "Security Patrols",
      value: 24,
      change: 2,
      changeType: "increase",
      icon: Shield,
      color: "bg-orange-500",
      description: "Active patrols",
    },
  ]

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value.toLocaleString()}</div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center text-sm">
                  {stat.change && stat.changeType === "increase" ? (
                    <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                  ) : stat.change && stat.changeType === "decrease" ? (
                    <TrendingDown className="h-3 w-3 text-red-500 mr-1" />
                  ) : null}
                  {stat.change && (
                    <span className={stat.changeType === "increase" ? "text-green-500" : "text-red-500"}>
                      {Math.abs(stat.change)}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Resident Demographics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Resident Demographics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Male</span>
                <span>{stats.residents.male}</span>
              </div>
              <Progress value={(stats.residents.male / stats.residents.total) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Female</span>
                <span>{stats.residents.female}</span>
              </div>
              <Progress value={(stats.residents.female / stats.residents.total) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Married</span>
                <span>{stats.residents.married}</span>
              </div>
              <Progress value={(stats.residents.married / stats.residents.total) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Incident Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Security Incidents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending</span>
              <Badge variant="destructive">{stats.incidents.pending}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Investigating</span>
              <Badge variant="secondary">{stats.incidents.investigating}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Resolved</span>
              <Badge variant="default" className="bg-green-500">
                {stats.incidents.resolved}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Critical</span>
              <Badge variant="destructive">{stats.incidents.critical}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Appointments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Pending</span>
              <Badge variant="secondary">{stats.appointments.pending}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Confirmed</span>
              <Badge variant="default" className="bg-blue-500">
                {stats.appointments.confirmed}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Completed</span>
              <Badge variant="default" className="bg-green-500">
                {stats.appointments.completed}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Today</span>
              <Badge variant="outline">{stats.appointments.today}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              System Status
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Authentication</p>
                <p className="text-xs text-gray-500">Active</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Real-time</p>
                <p className="text-xs text-gray-500">Connected</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Services</p>
                <p className="text-xs text-gray-500">Operational</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
