"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Switch } from "@/components/ui/switch"
import {
  AlertTriangle,
  Megaphone,
  Radio,
  Smartphone,
  Bell,
  Volume2,
  Zap,
  CloudRain,
  Thermometer,
  Activity,
  Siren,
  Satellite,
  TowerControlIcon as Tower,
} from "lucide-react"

export default function EarlyWarningPage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [alertsEnabled, setAlertsEnabled] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const activeWarnings = [
    {
      id: 1,
      type: "Weather",
      severity: "High",
      title: "Typhoon Warning Signal #2",
      description: "Strong winds expected in the next 6-12 hours. Secure loose objects and stay indoors.",
      issuedAt: "2024-01-15T14:30:00Z",
      validUntil: "2024-01-16T06:00:00Z",
      affectedAreas: ["Zone 1", "Zone 2", "Zone 3"],
      source: "PAGASA",
    },
    {
      id: 2,
      type: "Flood",
      severity: "Medium",
      title: "Flood Advisory",
      description: "Rising water levels in low-lying areas. Residents near rivers should monitor conditions.",
      issuedAt: "2024-01-15T13:15:00Z",
      validUntil: "2024-01-15T20:00:00Z",
      affectedAreas: ["Zone 4", "Zone 5"],
      source: "Local Weather Station",
    },
  ]

  const warningHistory = [
    {
      id: 1,
      type: "Fire",
      severity: "High",
      title: "Grass Fire Alert",
      issuedAt: "2024-01-14T09:20:00Z",
      status: "Resolved",
      duration: "4 hours",
    },
    {
      id: 2,
      type: "Health",
      severity: "Medium",
      title: "Heat Index Warning",
      issuedAt: "2024-01-13T11:00:00Z",
      status: "Expired",
      duration: "8 hours",
    },
    {
      id: 3,
      type: "Weather",
      severity: "Low",
      title: "Heavy Rainfall Advisory",
      issuedAt: "2024-01-12T16:45:00Z",
      status: "Resolved",
      duration: "6 hours",
    },
  ]

  const communicationChannels = [
    {
      name: "Emergency Sirens",
      type: "Audio",
      status: "Active",
      coverage: "95%",
      lastTest: "2024-01-10",
    },
    {
      name: "SMS Broadcast",
      type: "Mobile",
      status: "Active",
      coverage: "88%",
      lastTest: "2024-01-12",
    },
    {
      name: "Radio Emergency",
      type: "Radio",
      status: "Active",
      coverage: "92%",
      lastTest: "2024-01-08",
    },
    {
      name: "Public Address",
      type: "Audio",
      status: "Maintenance",
      coverage: "70%",
      lastTest: "2024-01-05",
    },
    {
      name: "Social Media",
      type: "Digital",
      status: "Active",
      coverage: "85%",
      lastTest: "2024-01-14",
    },
  ]

  const monitoringSystems = [
    {
      name: "Weather Station #1",
      type: "Weather",
      status: "Online",
      location: "Central Plaza",
      lastReading: "2 min ago",
      parameters: ["Temperature", "Humidity", "Wind Speed", "Rainfall"],
    },
    {
      name: "River Level Sensor",
      type: "Flood",
      status: "Online",
      location: "Riverside Bridge",
      lastReading: "1 min ago",
      parameters: ["Water Level", "Flow Rate"],
    },
    {
      name: "Seismic Monitor",
      type: "Earthquake",
      status: "Online",
      location: "Municipal Building",
      lastReading: "30 sec ago",
      parameters: ["Magnitude", "Intensity", "Frequency"],
    },
    {
      name: "Air Quality Station",
      type: "Health",
      status: "Offline",
      location: "School Complex",
      lastReading: "2 hours ago",
      parameters: ["PM2.5", "PM10", "CO2", "Ozone"],
    },
  ]

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "destructive"
      case "Medium":
        return "default"
      case "Low":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Weather":
        return <CloudRain className="h-4 w-4" />
      case "Flood":
        return <Activity className="h-4 w-4" />
      case "Fire":
        return <Zap className="h-4 w-4" />
      case "Health":
        return <Thermometer className="h-4 w-4" />
      case "Earthquake":
        return <Activity className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Early Warning System</h1>
          <p className="text-muted-foreground">
            Real-time monitoring and alert distribution • {currentTime.toLocaleString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} id="alerts-toggle" />
            <label htmlFor="alerts-toggle" className="text-sm font-medium">
              Alerts Enabled
            </label>
          </div>
          <Button>
            <Megaphone className="h-4 w-4 mr-2" />
            Issue Alert
          </Button>
        </div>
      </div>

      {activeWarnings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-red-600">Active Warnings</h2>
          {activeWarnings.map((warning) => (
            <Alert key={warning.id} className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800 flex items-center gap-2">
                {getTypeIcon(warning.type)}
                {warning.title}
                <Badge variant={getSeverityColor(warning.severity) as any}>{warning.severity}</Badge>
              </AlertTitle>
              <AlertDescription className="text-red-700 mt-2">
                <p>{warning.description}</p>
                <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Issued:</strong> {formatTime(warning.issuedAt)}
                  </div>
                  <div>
                    <strong>Valid Until:</strong> {formatTime(warning.validUntil)}
                  </div>
                  <div>
                    <strong>Source:</strong> {warning.source}
                  </div>
                  <div>
                    <strong>Affected Areas:</strong> {warning.affectedAreas.join(", ")}
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{activeWarnings.length}</div>
                <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monitoring Systems</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {monitoringSystems.filter((s) => s.status === "Online").length}
                  <span className="text-sm font-normal text-muted-foreground">/{monitoringSystems.length}</span>
                </div>
                <p className="text-xs text-muted-foreground">Systems operational</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Communication Coverage</CardTitle>
                <Radio className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89%</div>
                <p className="text-xs text-muted-foreground">Population reachable</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.3</div>
                <p className="text-xs text-muted-foreground">Minutes average</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Current operational status of warning systems</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Siren className="h-4 w-4" />
                    <span className="text-sm">Emergency Sirens</span>
                  </div>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    <span className="text-sm">SMS System</span>
                  </div>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="h-4 w-4" />
                    <span className="text-sm">Radio Network</span>
                  </div>
                  <Badge variant="default">Operational</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Volume2 className="h-4 w-4" />
                    <span className="text-sm">PA System</span>
                  </div>
                  <Badge variant="secondary">Maintenance</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Satellite className="h-4 w-4" />
                    <span className="text-sm">Weather Satellite</span>
                  </div>
                  <Badge variant="default">Online</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest system activities and tests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">System health check completed</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Weather data update received</p>
                    <p className="text-xs text-muted-foreground">5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">SMS test broadcast sent</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Siren system tested</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid gap-4">
            {monitoringSystems.map((system, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{system.name}</CardTitle>
                      <CardDescription>
                        {system.location} • Last reading: {system.lastReading}
                      </CardDescription>
                    </div>
                    <Badge variant={system.status === "Online" ? "default" : "destructive"}>{system.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium mb-2">Monitoring Parameters</p>
                      <div className="flex flex-wrap gap-1">
                        {system.parameters.map((param, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {param}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6">
          <div className="grid gap-4">
            {communicationChannels.map((channel, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {channel.type === "Audio" && <Volume2 className="h-5 w-5" />}
                        {channel.type === "Mobile" && <Smartphone className="h-5 w-5" />}
                        {channel.type === "Radio" && <Radio className="h-5 w-5" />}
                        {channel.type === "Digital" && <Tower className="h-5 w-5" />}
                        {channel.name}
                      </CardTitle>
                      <CardDescription>
                        Coverage: {channel.coverage} • Last tested: {channel.lastTest}
                      </CardDescription>
                    </div>
                    <Badge variant={channel.status === "Active" ? "default" : "secondary"}>{channel.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Type: {channel.type}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Test
                      </Button>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Warning History</CardTitle>
              <CardDescription>Recent warnings and their resolution status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {warningHistory.map((warning) => (
                  <div key={warning.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTypeIcon(warning.type)}
                      <div>
                        <p className="font-medium">{warning.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatTime(warning.issuedAt)} • Duration: {warning.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getSeverityColor(warning.severity) as any}>{warning.severity}</Badge>
                      <Badge variant="outline">{warning.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
