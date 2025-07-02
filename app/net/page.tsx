"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  FileText,
  Users,
  Car,
  Phone,
  Clock,
  MapPin,
  Radio,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react"

export default function NETDashboard() {
  const stats = [
    {
      title: "Active Incidents",
      value: "12",
      change: "+3",
      trend: "up",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      title: "Blotter Records Today",
      value: "8",
      change: "+2",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Officers on Duty",
      value: "24",
      change: "0",
      trend: "stable",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Patrol Units",
      value: "6",
      change: "-1",
      trend: "down",
      icon: Car,
      color: "text-orange-600",
    },
  ]

  const recentIncidents = [
    {
      id: "INC-2024-001",
      type: "Theft",
      location: "Purok 1, Main Street",
      time: "2 hours ago",
      status: "Investigating",
      priority: "Medium",
    },
    {
      id: "INC-2024-002",
      type: "Domestic Dispute",
      location: "Purok 3, Rizal Avenue",
      time: "4 hours ago",
      status: "Resolved",
      priority: "High",
    },
    {
      id: "INC-2024-003",
      type: "Traffic Accident",
      location: "Highway Junction",
      time: "6 hours ago",
      status: "Under Investigation",
      priority: "Low",
    },
  ]

  const activePatrols = [
    {
      unit: "Patrol Unit 1",
      officers: ["PO1 Santos", "PO2 Garcia"],
      area: "Purok 1-3",
      status: "On Patrol",
      lastUpdate: "5 min ago",
    },
    {
      unit: "Patrol Unit 2",
      officers: ["PO1 Cruz", "PO3 Reyes"],
      area: "Purok 4-6",
      status: "Responding",
      lastUpdate: "2 min ago",
    },
    {
      unit: "Mobile Unit 1",
      officers: ["SPO1 Lopez", "PO2 Mendoza"],
      area: "Highway Patrol",
      status: "Available",
      lastUpdate: "1 min ago",
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NET Dashboard</h1>
          <p className="text-muted-foreground">Network Enforcement Team - Demo Operations Center</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            System Online
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Radio className="h-4 w-4 mr-2" />
            NET Dispatch
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" && <TrendingUp className="h-3 w-3 mr-1 text-green-600" />}
                {stat.trend === "down" && <TrendingDown className="h-3 w-3 mr-1 text-red-600" />}
                <span className={stat.trend === "up" ? "text-green-600" : stat.trend === "down" ? "text-red-600" : ""}>
                  {stat.change} from yesterday
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              New Blotter Entry
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <AlertTriangle className="h-6 w-6 mb-2" />
              Report Incident
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Car className="h-6 w-6 mb-2" />
              Dispatch Unit
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Phone className="h-6 w-6 mb-2" />
              Emergency Response
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Incidents */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Incidents</CardTitle>
            <CardDescription>Latest reported incidents requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentIncidents.map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{incident.id}</span>
                      <Badge
                        variant={
                          incident.priority === "High"
                            ? "destructive"
                            : incident.priority === "Medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {incident.priority}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium">{incident.type}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {incident.location}
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {incident.time}
                    </div>
                  </div>
                  <Badge variant="outline">{incident.status}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Patrols */}
        <Card>
          <CardHeader>
            <CardTitle>Active Patrols</CardTitle>
            <CardDescription>Current patrol units and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activePatrols.map((patrol) => (
                <div key={patrol.unit} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{patrol.unit}</span>
                    <Badge
                      variant={
                        patrol.status === "On Patrol"
                          ? "default"
                          : patrol.status === "Responding"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {patrol.status}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Users className="h-3 w-3 mr-1" />
                      {patrol.officers.join(", ")}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {patrol.area}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last update: {patrol.lastUpdate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Response Time Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Response Time Performance</CardTitle>
          <CardDescription>Average response times for different incident types</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Emergency Calls</span>
              <span className="text-sm text-muted-foreground">Avg: 4.2 min</span>
            </div>
            <Progress value={85} className="h-2" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Non-Emergency Incidents</span>
              <span className="text-sm text-muted-foreground">Avg: 12.8 min</span>
            </div>
            <Progress value={72} className="h-2" />

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Routine Patrols</span>
              <span className="text-sm text-muted-foreground">Coverage: 94%</span>
            </div>
            <Progress value={94} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
