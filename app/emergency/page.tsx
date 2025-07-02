"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Bell, MapPin, Clock, Search, ArrowLeft, Phone, MessageSquare, Volume2, X } from "lucide-react"

export default function EmergencyAlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSeverity, setSelectedSeverity] = useState("all")
  const [showNotification, setShowNotification] = useState(true)

  // Demo active alerts
  const activeAlerts = [
    {
      id: "ALERT-001",
      title: "Flash Flood Warning",
      message:
        "Heavy rainfall has caused flash flooding in low-lying areas of East Zone. Residents in Purok 3-5 are advised to evacuate to higher ground immediately. Emergency shelters are available at the Barangay Hall and Elementary School.",
      severity: "Critical",
      location: "East Zone, Purok 3-5",
      issuedTime: "2 hours ago",
      channels: ["SMS", "Facebook", "Loudspeaker"],
      status: "Active",
      affectedResidents: 450,
    },
    {
      id: "ALERT-002",
      title: "Missing Person Alert",
      message:
        "Missing child: Maria Santos, 8 years old, last seen near the public market at around 3:00 PM. Wearing red shirt and blue shorts. If you have any information, please contact the Barangay immediately.",
      severity: "High",
      location: "West Zone, Public Market",
      issuedTime: "5 hours ago",
      channels: ["SMS", "Facebook", "Tanod Alert"],
      status: "Active",
      affectedResidents: 1200,
    },
    {
      id: "ALERT-003",
      title: "Road Closure Notice",
      message:
        "Main Street is temporarily closed due to emergency water pipe repair. Traffic is being diverted to Oak Avenue. Expected completion by 6:00 PM today.",
      severity: "Medium",
      location: "Main Street, Central Zone",
      issuedTime: "3 hours ago",
      channels: ["Facebook", "Website"],
      status: "Active",
      affectedResidents: 800,
    },
  ]

  // Demo alert history
  const alertHistory = [
    {
      id: "ALERT-004",
      title: "Typhoon Warning",
      severity: "Critical",
      location: "All Zones",
      issuedTime: "2 days ago",
      status: "Resolved",
    },
    {
      id: "ALERT-005",
      title: "Power Outage Notice",
      severity: "Medium",
      location: "North Zone",
      issuedTime: "1 week ago",
      status: "Resolved",
    },
    {
      id: "ALERT-006",
      title: "Community Assembly",
      severity: "Low",
      location: "Barangay Hall",
      issuedTime: "2 weeks ago",
      status: "Resolved",
    },
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "destructive"
      case "High":
        return "default"
      case "Medium":
        return "secondary"
      case "Low":
        return "outline"
      default:
        return "secondary"
    }
  }

  const getSeverityBgColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"
      case "High":
        return "bg-orange-50 border-orange-200 dark:bg-orange-950/20 dark:border-orange-900"
      case "Medium":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900"
      case "Low":
        return "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900"
      default:
        return "bg-gray-50 border-gray-200 dark:bg-gray-950/20 dark:border-gray-900"
    }
  }

  const filteredAlerts = activeAlerts.filter((alert) => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSeverity = selectedSeverity === "all" || alert.severity.toLowerCase() === selectedSeverity
    return matchesSearch && matchesSeverity
  })

  // Auto-hide notification after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Floating Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-500">
          <Card className="w-80 bg-red-50 border-red-200 dark:bg-red-950/50 dark:border-red-900 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  <Badge variant="destructive" className="text-xs">
                    CRITICAL ALERT
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotification(false)}
                  className="h-6 w-6 p-0 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle className="text-sm text-red-800 dark:text-red-200">Flash Flood Warning</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-red-700 dark:text-red-300 mb-3">
                Immediate evacuation required for East Zone residents.
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="destructive" className="text-xs">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="text-xs border-red-300 text-red-700">
                  Dismiss
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Emergency Alerts</h1>
              <p className="text-gray-600 dark:text-gray-400">Stay informed about active alerts and warnings</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden sm:flex">
              <Bell className="mr-2 h-4 w-4" />
              Subscribe to Alerts
            </Button>
          </div>
        </div>

        {/* Emergency Contacts */}
        <Card className="bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900">
          <CardHeader>
            <CardTitle className="text-red-800 dark:text-red-200 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-lg font-bold text-red-800 dark:text-red-200">911</div>
                <div className="text-sm text-red-600 dark:text-red-300">Emergency Hotline</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-800 dark:text-red-200">(123) 456-7899</div>
                <div className="text-sm text-red-600 dark:text-red-300">Barangay Emergency</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-800 dark:text-red-200">(123) 456-7890</div>
                <div className="text-sm text-red-600 dark:text-red-300">Barangay Hall</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Active Alerts</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search alerts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredAlerts.length > 0 ? (
            <div className="grid gap-6">
              {filteredAlerts.map((alert) => (
                <Card key={alert.id} className={`${getSeverityBgColor(alert.severity)} shadow-lg`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <AlertTriangle
                          className={`h-6 w-6 ${
                            alert.severity === "Critical"
                              ? "text-red-600"
                              : alert.severity === "High"
                                ? "text-orange-600"
                                : alert.severity === "Medium"
                                  ? "text-yellow-600"
                                  : "text-blue-600"
                          }`}
                        />
                        <div>
                          <CardTitle className="text-xl text-gray-900 dark:text-white">{alert.title}</CardTitle>
                          <div className="flex items-center gap-4 mt-2">
                            <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                              <Clock className="h-4 w-4" />
                              {alert.issuedTime}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-white/50">
                        {alert.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{alert.message}</p>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Location:</strong> {alert.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Affected:</strong> {alert.affectedResidents} residents
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Volume2 className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Distributed via:</strong> {alert.channels.join(", ")}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Active Alerts</h3>
                <p className="text-gray-600 dark:text-gray-400">There are currently no active emergency alerts.</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Alert History */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Alert History</h2>
          <Card>
            <CardHeader>
              <CardTitle>Past Alerts</CardTitle>
              <CardDescription>Previously issued alerts and their resolution status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertHistory.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{alert.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{alert.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {alert.status}
                      </Badge>
                      <span className="text-sm text-gray-500">{alert.issuedTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
