"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import {
  AlertTriangle,
  Users,
  Radio,
  MapPin,
  Activity,
  Clock,
  CheckCircle,
  Phone,
  Truck,
  Heart,
  Shield,
  TrendingUp,
  TrendingDown,
  Eye,
  Calendar,
  Database,
  Siren,
  Building,
} from "lucide-react"

export default function ResQNetDashboard() {
  const emergencyStats = {
    activeIncidents: 12,
    responseTeams: 8,
    evacuationCenters: 15,
    affectedPopulation: 2847,
    resourcesDeployed: 89,
    agenciesConnected: 7,
  }

  const activeIncidents = [
    {
      id: "INC-2024-001",
      type: "Flood",
      location: "Barangay San Miguel",
      severity: "High",
      status: "Active",
      responders: 12,
      time: "2 hours ago",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      id: "INC-2024-002",
      type: "Landslide",
      location: "Barangay Hillside",
      severity: "Critical",
      status: "Responding",
      responders: 8,
      time: "45 minutes ago",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      id: "INC-2024-003",
      type: "Fire",
      location: "Barangay Centro",
      severity: "Medium",
      status: "Contained",
      responders: 6,
      time: "1 hour ago",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
  ]

  const responseTeams = [
    {
      id: "TEAM-001",
      name: "Alpha Response Unit",
      type: "Search & Rescue",
      status: "Deployed",
      location: "Barangay San Miguel",
      members: 8,
      equipment: "Boats, Medical Kit",
      eta: "15 mins",
    },
    {
      id: "TEAM-002",
      name: "Bravo Medical Team",
      type: "Medical Response",
      status: "Standby",
      location: "Emergency HQ",
      members: 6,
      equipment: "Ambulance, Medical Supplies",
      eta: "Ready",
    },
    {
      id: "TEAM-003",
      name: "Charlie Fire Unit",
      type: "Fire Suppression",
      status: "En Route",
      location: "Barangay Centro",
      members: 10,
      equipment: "Fire Truck, Hoses",
      eta: "8 mins",
    },
  ]

  const agencyStatus = [
    { name: "NDRRMC", status: "Connected", personnel: 45, resources: "High", response: "Ready" },
    { name: "Barangay LGU", status: "Connected", personnel: 32, resources: "Medium", response: "Active" },
    { name: "PNP", status: "Connected", personnel: 28, resources: "High", response: "Deployed" },
    { name: "BFP", status: "Connected", personnel: 24, resources: "Medium", response: "Active" },
    { name: "DOH", status: "Limited", personnel: 18, resources: "Low", response: "Standby" },
    { name: "DSWD", status: "Connected", personnel: 22, resources: "High", response: "Ready" },
    { name: "Red Cross", status: "Offline", personnel: 0, resources: "Unknown", response: "N/A" },
  ]

  const recentAlerts = [
    {
      id: 1,
      type: "Weather Alert",
      message: "Heavy rainfall warning issued for Metro Manila",
      time: "5 minutes ago",
      severity: "High",
      icon: Siren,
    },
    {
      id: 2,
      type: "Evacuation Order",
      message: "Mandatory evacuation for flood-prone areas in Zone 3",
      time: "15 minutes ago",
      severity: "Critical",
      icon: Building,
    },
    {
      id: 3,
      type: "Resource Request",
      message: "Additional medical supplies needed at Evacuation Center A",
      time: "30 minutes ago",
      severity: "Medium",
      icon: Heart,
    },
    {
      id: 4,
      type: "Communication",
      message: "Radio frequency 146.52 MHz established for field operations",
      time: "1 hour ago",
      severity: "Low",
      icon: Radio,
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-red-900">ResQNet Command Center</h1>
          <p className="text-muted-foreground">Unified Disaster Response & Emergency Management System</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className="animate-pulse">
            <Activity className="mr-1 h-3 w-3" />
            EMERGENCY MODE
          </Badge>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Today's Operations
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            <Radio className="mr-2 h-4 w-4" />
            Emergency Broadcast
          </Button>
        </div>
      </div>

      {/* Emergency Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{emergencyStats.activeIncidents}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-red-600 mr-1" />
              <span className="text-red-600">+3</span>
              <span className="ml-1">in last hour</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Teams</CardTitle>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emergencyStats.responseTeams}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Activity className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">5 deployed</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Evacuation Centers</CardTitle>
            <Building className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emergencyStats.evacuationCenters}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Users className="h-3 w-3 text-purple-600 mr-1" />
              <span className="text-purple-600">12 active</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Affected Population</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emergencyStats.affectedPopulation.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">-150</span>
              <span className="ml-1">evacuated safely</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources Deployed</CardTitle>
            <Database className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emergencyStats.resourcesDeployed}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">Optimal</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Agencies</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{emergencyStats.agenciesConnected}/8</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Activity className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">87.5%</span>
              <span className="ml-1">online</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Incidents and Response Teams */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              Active Incidents
            </CardTitle>
            <CardDescription>Real-time incident monitoring and response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeIncidents.map((incident) => (
                <div key={incident.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className={`h-3 w-3 rounded-full mt-2 ${incident.bgColor.replace("bg-", "bg-")}`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{incident.type}</h4>
                      <Badge
                        variant={
                          incident.severity === "Critical"
                            ? "destructive"
                            : incident.severity === "High"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {incident.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{incident.location}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {incident.responders} responders
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {incident.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/ResQNet/incidents">View All Incidents</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-blue-600" />
              Response Teams
            </CardTitle>
            <CardDescription>Active response team deployment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {responseTeams.map((team) => (
                <div key={team.id} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Truck className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{team.name}</h4>
                      <Badge
                        variant={
                          team.status === "Deployed"
                            ? "destructive"
                            : team.status === "En Route"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {team.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{team.type}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{team.members} members</span>
                      <span>ETA: {team.eta}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/ResQNet/response">Manage Response Teams</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Agency Coordination Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            Agency Coordination Status
          </CardTitle>
          <CardDescription>Real-time connectivity and coordination with partner agencies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {agencyStatus.map((agency) => (
              <div key={agency.name} className="p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{agency.name}</h4>
                  <Badge
                    variant={
                      agency.status === "Connected"
                        ? "default"
                        : agency.status === "Limited"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {agency.status}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Personnel:</span>
                    <span>{agency.personnel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resources:</span>
                    <span>{agency.resources}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response:</span>
                    <span
                      className={
                        agency.response === "Ready"
                          ? "text-green-600"
                          : agency.response === "Active"
                            ? "text-blue-600"
                            : agency.response === "Deployed"
                              ? "text-orange-600"
                              : "text-gray-600"
                      }
                    >
                      {agency.response}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" asChild>
            <Link href="/ResQNet/coordination">View Agency Coordination</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Alerts and Quick Actions */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-yellow-600" />
              Recent Alerts & Communications
            </CardTitle>
            <CardDescription>Latest emergency alerts and system communications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      alert.severity === "Critical"
                        ? "bg-red-100"
                        : alert.severity === "High"
                          ? "bg-orange-100"
                          : alert.severity === "Medium"
                            ? "bg-yellow-100"
                            : "bg-blue-100"
                    }`}
                  >
                    <alert.icon
                      className={`h-4 w-4 ${
                        alert.severity === "Critical"
                          ? "text-red-600"
                          : alert.severity === "High"
                            ? "text-orange-600"
                            : alert.severity === "Medium"
                              ? "text-yellow-600"
                              : "text-blue-600"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{alert.type}</h4>
                      <Badge
                        variant={
                          alert.severity === "Critical"
                            ? "destructive"
                            : alert.severity === "High"
                              ? "default"
                              : "secondary"
                        }
                        className="text-xs"
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{alert.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Emergency response shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start bg-red-600 hover:bg-red-700" asChild>
                <Link href="/ResQNet/broadcasting">
                  <Radio className="mr-2 h-4 w-4" />
                  Emergency Broadcast
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/ResQNet/911">
                  <Phone className="mr-2 h-4 w-4" />
                  911 Integration
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/ResQNet/map">
                  <MapPin className="mr-2 h-4 w-4" />
                  Real-time Map
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/ResQNet/evacuation">
                  <Building className="mr-2 h-4 w-4" />
                  Evacuation Centers
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/ResQNet/resources">
                  <Database className="mr-2 h-4 w-4" />
                  Resource Management
                </Link>
              </Button>
            </div>

            <div className="mt-6 pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">System Health</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Communication</span>
                  <span className="text-green-600 font-medium">Operational</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GPS Tracking</span>
                  <span className="text-green-600 font-medium">Active</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Data Sync</span>
                  <span className="text-yellow-600 font-medium">Limited</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Backup Systems</span>
                  <span className="text-green-600 font-medium">Ready</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Response Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Emergency Response Modules</CardTitle>
          <CardDescription>Access specialized disaster response and coordination tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/ResQNet/incidents">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span className="text-sm">Incident Management</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/ResQNet/broadcasting">
                <Radio className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Emergency Broadcasting</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/ResQNet/coordination">
                <Users className="h-5 w-5 text-green-600" />
                <span className="text-sm">Agency Coordination</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/ResQNet/response">
                <Truck className="h-5 w-5 text-purple-600" />
                <span className="text-sm">Emergency Response</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/ResQNet/medical">
                <Heart className="h-5 w-5 text-pink-600" />
                <span className="text-sm">Medical Response</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/ResQNet/evacuation">
                <Building className="h-5 w-5 text-indigo-600" />
                <span className="text-sm">Evacuation Centers</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/ResQNet/resources">
                <Database className="h-5 w-5 text-orange-600" />
                <span className="text-sm">Resource Management</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2" asChild>
              <Link href="/ResQNet/analytics">
                <Eye className="h-5 w-5 text-gray-600" />
                <span className="text-sm">Analytics & Reports</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
