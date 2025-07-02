"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import {
  AlertTriangle,
  Car,
  Clock,
  MapPin,
  Radio,
  Activity,
  QrCode,
  Siren,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Camera,
  Navigation,
  Zap,
  BarChart3,
  Eye,
  MessageSquare,
  Phone,
  FileText,
} from "lucide-react"

export default function TanodDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null)
  const [selectedPatrol, setSelectedPatrol] = useState<string | null>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    {
      title: "Active Incidents",
      value: "5",
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
      color: "text-red-600",
      href: "/tanod/incidents",
      description: "Ongoing security incidents",
    },
    {
      title: "QR Verifications Today",
      value: "23",
      change: "+8",
      trend: "up",
      icon: QrCode,
      color: "text-blue-600",
      href: "/tanod/scanner",
      description: "Identity verifications completed",
    },
    {
      title: "Patrol Units Active",
      value: "4",
      change: "0",
      trend: "stable",
      icon: Car,
      color: "text-green-600",
      href: "/tanod/patrol",
      description: "Units currently on patrol",
    },
    {
      title: "Emergency Alerts",
      value: "1",
      change: "+1",
      trend: "up",
      icon: Siren,
      color: "text-orange-600",
      href: "/tanod/emergency",
      description: "Active emergency situations",
    },
  ]

  const recentIncidents = [
    {
      id: "INC001",
      type: "Noise Complaint",
      location: "Purok 3, Sitio Maligaya",
      time: "10 minutes ago",
      priority: "Medium",
      status: "In Progress",
      assignedTo: "Unit Alpha",
      description: "Loud music complaint from residential area",
      coordinates: { lat: 7.0731, lng: 125.6128 },
    },
    {
      id: "INC002",
      type: "Suspicious Activity",
      location: "Market Area",
      time: "25 minutes ago",
      priority: "High",
      status: "Investigating",
      assignedTo: "Unit Bravo",
      description: "Unidentified individuals loitering near market stalls",
      coordinates: { lat: 7.0725, lng: 125.6135 },
    },
    {
      id: "INC003",
      type: "Traffic Violation",
      location: "Main Highway Junction",
      time: "1 hour ago",
      priority: "Low",
      status: "Resolved",
      assignedTo: "Unit Charlie",
      description: "Illegal parking blocking traffic flow",
      coordinates: { lat: 7.0722, lng: 125.6118 },
    },
    {
      id: "INC004",
      type: "Domestic Dispute",
      location: "Purok 1, Barangay Hall Area",
      time: "2 hours ago",
      priority: "High",
      status: "Resolved",
      assignedTo: "Unit Delta",
      description: "Family dispute requiring mediation",
      coordinates: { lat: 7.0735, lng: 125.6125 },
    },
  ]

  const patrolUnits = [
    {
      id: "UNIT-ALPHA",
      name: "Unit Alpha",
      officers: ["Juan Dela Cruz", "Pedro Santos"],
      status: "On Patrol",
      location: "Purok 2 - Market Area",
      lastUpdate: "2 minutes ago",
      route: "Route A",
      vehicle: "Motorcycle 001",
      contact: "+63 912 345 6789",
    },
    {
      id: "UNIT-BRAVO",
      name: "Unit Bravo",
      officers: ["Maria Garcia", "Carlos Rodriguez"],
      status: "Responding",
      location: "Purok 3 - Residential",
      lastUpdate: "5 minutes ago",
      route: "Route B",
      vehicle: "Patrol Car 001",
      contact: "+63 923 456 7890",
    },
    {
      id: "UNIT-CHARLIE",
      name: "Unit Charlie",
      officers: ["Ana Martinez", "Jose Fernandez"],
      status: "Available",
      location: "Barangay Hall",
      lastUpdate: "1 minute ago",
      route: "Standby",
      vehicle: "Motorcycle 002",
      contact: "+63 934 567 8901",
    },
    {
      id: "UNIT-DELTA",
      name: "Unit Delta",
      officers: ["Roberto Silva", "Elena Morales"],
      status: "Off Duty",
      location: "Station",
      lastUpdate: "30 minutes ago",
      route: "None",
      vehicle: "Patrol Car 002",
      contact: "+63 945 678 9012",
    },
  ]

  const quickActions = [
    {
      title: "QR Scanner",
      description: "Verify resident identity",
      icon: QrCode,
      href: "/tanod/scanner",
      color: "bg-blue-500",
    },
    {
      title: "Report Incident",
      description: "Create new incident report",
      icon: AlertTriangle,
      href: "/tanod/incidents",
      color: "bg-red-500",
    },
    {
      title: "Emergency Alert",
      description: "Broadcast emergency alert",
      icon: Siren,
      href: "/tanod/emergency",
      color: "bg-orange-500",
    },
    {
      title: "Communication",
      description: "Radio communication hub",
      icon: Radio,
      href: "/tanod/communication",
      color: "bg-green-500",
    },
    {
      title: "CCTV Monitor",
      description: "View surveillance cameras",
      icon: Camera,
      href: "/tanod/cctv",
      color: "bg-purple-500",
    },
    {
      title: "Patrol Routes",
      description: "Manage patrol assignments",
      icon: Navigation,
      href: "/tanod/patrol",
      color: "bg-indigo-500",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved":
        return "bg-green-100 text-green-800 border-green-200"
      case "in progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "investigating":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "on patrol":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "responding":
        return "bg-red-100 text-red-800 border-red-200"
      case "available":
        return "bg-green-100 text-green-800 border-green-200"
      case "off duty":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const handleViewDetails = (incidentId: string) => {
    setSelectedIncident(incidentId)
  }

  const handleCoordinateResponse = (incidentId: string) => {
    console.log(`Coordinating response for incident: ${incidentId}`)
    // This would typically open a coordination dialog or navigate to a detailed response page
    alert(`Coordinating response for incident ${incidentId}`)
  }

  const handleViewPatrolDetails = (unitId: string) => {
    setSelectedPatrol(unitId)
  }

  const handleDispatchUnit = (unitId: string, incidentId: string) => {
    console.log(`Dispatching ${unitId} to incident ${incidentId}`)
    alert(`Dispatching ${unitId} to incident ${incidentId}`)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 lg:p-8 pt-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Tanod Command Center</h1>
          <p className="text-gray-600 mt-1">
            Real-time security monitoring and incident management • {currentTime.toLocaleString()}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-full lg:w-auto">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 justify-center">
            <Activity className="h-3 w-3 mr-1" />
            System Active
          </Badge>
          <Button className="w-full sm:w-auto">
            <Siren className="h-4 w-4 mr-2" />
            Emergency Alert
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link key={index} href={stat.href}>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-center space-x-2">
                        <p className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        {stat.change !== "0" && (
                          <div
                            className={`flex items-center text-xs ${
                              stat.trend === "up"
                                ? "text-green-600"
                                : stat.trend === "down"
                                  ? "text-red-600"
                                  : "text-gray-600"
                            }`}
                          >
                            {stat.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : stat.trend === "down" ? (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            ) : null}
                            <span>{stat.change}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{stat.description}</p>
                    </div>
                    <Icon
                      className={`h-8 w-8 md:h-10 md:w-10 ${stat.color} group-hover:scale-110 transition-transform`}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Frequently used tools and functions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Link key={index} href={action.href}>
                  <div className="group cursor-pointer">
                    <div className="flex flex-col items-center p-4 rounded-lg border hover:shadow-md transition-all duration-200 hover:border-blue-300">
                      <div
                        className={`p-3 rounded-full ${action.color} mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-medium text-sm text-center mb-1">{action.title}</h3>
                      <p className="text-xs text-gray-500 text-center">{action.description}</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="incidents">Active Incidents</TabsTrigger>
          <TabsTrigger value="patrol">Patrol Units</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Incidents */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Recent Incidents
                  </CardTitle>
                  <Link href="/tanod/incidents">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
                <CardDescription>Latest security incidents and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentIncidents.slice(0, 3).map((incident) => (
                    <div key={incident.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{incident.type}</h4>
                            <Badge className={`text-xs ${getPriorityColor(incident.priority)}`}>
                              {incident.priority}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {incident.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {incident.time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">{incident.description}</p>
                          <p className="text-xs text-blue-600">Assigned to: {incident.assignedTo}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(incident.id)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleCoordinateResponse(incident.id)}>
                          <Radio className="h-3 w-3 mr-1" />
                          Coordinate Response
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Patrol Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Car className="h-5 w-5 text-blue-600" />
                    Patrol Units
                  </CardTitle>
                  <Link href="/tanod/patrol">
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </Link>
                </div>
                <CardDescription>Current patrol unit status and locations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {patrolUnits.map((unit) => (
                    <div key={unit.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-sm">{unit.name}</h4>
                            <Badge className={`text-xs ${getStatusColor(unit.status)}`}>{unit.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {unit.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {unit.lastUpdate}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mb-1">Officers: {unit.officers.join(", ")}</p>
                          <p className="text-xs text-gray-600">Vehicle: {unit.vehicle}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewPatrolDetails(unit.id)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => alert(`Contacting ${unit.name} at ${unit.contact}`)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Active Incidents Management
              </CardTitle>
              <CardDescription>Monitor and manage all active security incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentIncidents.map((incident) => (
                  <div key={incident.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{incident.type}</h4>
                          <Badge className={`text-xs ${getPriorityColor(incident.priority)}`}>
                            {incident.priority}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(incident.status)}`}>{incident.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Location</p>
                            <p className="font-medium flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {incident.location}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Time Reported</p>
                            <p className="font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {incident.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Assigned Unit</p>
                            <p className="font-medium flex items-center gap-1">
                              <UserCheck className="h-3 w-3" />
                              {incident.assignedTo}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">{incident.description}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewDetails(incident.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleCoordinateResponse(incident.id)}>
                          <Radio className="h-4 w-4 mr-2" />
                          Coordinate Response
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => alert(`Opening map for ${incident.location}`)}
                        >
                          <MapPin className="h-4 w-4 mr-2" />
                          Show on Map
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patrol" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-blue-600" />
                Patrol Unit Management
              </CardTitle>
              <CardDescription>Monitor and coordinate patrol units in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patrolUnits.map((unit) => (
                  <div key={unit.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium text-lg">{unit.name}</h4>
                          <Badge className={`${getStatusColor(unit.status)}`}>{unit.status}</Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Current Location</p>
                            <p className="font-medium flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {unit.location}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Last Update</p>
                            <p className="font-medium flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {unit.lastUpdate}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Vehicle</p>
                            <p className="font-medium flex items-center gap-1">
                              <Car className="h-3 w-3" />
                              {unit.vehicle}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600">Officers</p>
                            <p className="font-medium">{unit.officers.join(", ")}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Route Assignment</p>
                            <p className="font-medium">{unit.route}</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Contact</p>
                            <p className="font-medium flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {unit.contact}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewPatrolDetails(unit.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => alert(`Contacting ${unit.name} at ${unit.contact}`)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Unit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => alert(`Tracking ${unit.name} location`)}>
                          <Navigation className="h-4 w-4 mr-2" />
                          Track Location
                        </Button>
                        <Button size="sm" onClick={() => handleDispatchUnit(unit.id, "INC001")}>
                          <Radio className="h-4 w-4 mr-2" />
                          Dispatch
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                  Incident Statistics
                </CardTitle>
                <CardDescription>Weekly incident trends and patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Noise Complaints</span>
                    <div className="flex items-center gap-2">
                      <Progress value={65} className="w-24 h-2" />
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Traffic Violations</span>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-24 h-2" />
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Suspicious Activity</span>
                    <div className="flex items-center gap-2">
                      <Progress value={30} className="w-24 h-2" />
                      <span className="text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Domestic Disputes</span>
                    <div className="flex items-center gap-2">
                      <Progress value={20} className="w-24 h-2" />
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Response Performance
                </CardTitle>
                <CardDescription>Unit response times and efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Average Response Time</span>
                    <span className="text-lg font-bold text-green-600">8.5 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Incidents Resolved Today</span>
                    <span className="text-lg font-bold text-blue-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Success Rate</span>
                    <span className="text-lg font-bold text-purple-600">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Units Available</span>
                    <span className="text-lg font-bold text-orange-600">3/4</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Incident Details Dialog */}
      <Dialog open={!!selectedIncident} onOpenChange={() => setSelectedIncident(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Incident Details</DialogTitle>
            <DialogDescription>Detailed information about the selected incident</DialogDescription>
          </DialogHeader>
          {selectedIncident && (
            <div className="space-y-4">
              {(() => {
                const incident = recentIncidents.find((inc) => inc.id === selectedIncident)
                if (!incident) return null

                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Incident ID</label>
                        <p className="font-medium">{incident.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Type</label>
                        <p className="font-medium">{incident.type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Priority</label>
                        <Badge className={getPriorityColor(incident.priority)}>{incident.priority}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <Badge className={getStatusColor(incident.status)}>{incident.status}</Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Location</label>
                      <p className="font-medium">{incident.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Description</label>
                      <p className="text-gray-700">{incident.description}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Assigned Unit</label>
                      <p className="font-medium">{incident.assignedTo}</p>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={() => handleCoordinateResponse(incident.id)}>
                        <Radio className="h-4 w-4 mr-2" />
                        Coordinate Response
                      </Button>
                      <Button variant="outline">
                        <MapPin className="h-4 w-4 mr-2" />
                        Show on Map
                      </Button>
                      <Button variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Generate Report
                      </Button>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Patrol Details Dialog */}
      <Dialog open={!!selectedPatrol} onOpenChange={() => setSelectedPatrol(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Patrol Unit Details</DialogTitle>
            <DialogDescription>Detailed information about the selected patrol unit</DialogDescription>
          </DialogHeader>
          {selectedPatrol && (
            <div className="space-y-4">
              {(() => {
                const unit = patrolUnits.find((u) => u.id === selectedPatrol)
                if (!unit) return null

                return (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Unit ID</label>
                        <p className="font-medium">{unit.id}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Unit Name</label>
                        <p className="font-medium">{unit.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <Badge className={getStatusColor(unit.status)}>{unit.status}</Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Vehicle</label>
                        <p className="font-medium">{unit.vehicle}</p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Current Location</label>
                      <p className="font-medium">{unit.location}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Officers</label>
                      <p className="font-medium">{unit.officers.join(", ")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Route Assignment</label>
                      <p className="font-medium">{unit.route}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Contact Number</label>
                      <p className="font-medium">{unit.contact}</p>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={() => alert(`Contacting ${unit.name}`)}>
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Unit
                      </Button>
                      <Button variant="outline">
                        <Navigation className="h-4 w-4 mr-2" />
                        Track Location
                      </Button>
                      <Button variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                )
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
