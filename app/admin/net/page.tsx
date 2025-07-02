"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, FileText, AlertTriangle, TrendingUp, TrendingDown, Activity, Radio, Clock, MapPin } from "lucide-react"

export default function AdminNET() {
  const stats = [
    {
      title: "Active NET Personnel",
      value: "127",
      change: "+5",
      trend: "up",
      icon: Users,
    },
    {
      title: "Blotter Entries This Month",
      value: "45",
      change: "+12",
      trend: "up",
      icon: FileText,
    },
    {
      title: "Active Incidents",
      value: "8",
      change: "-3",
      trend: "down",
      icon: AlertTriangle,
    },
    {
      title: "Response Time (Avg)",
      value: "4.2 min",
      change: "-0.8",
      trend: "down",
      icon: Clock,
    },
  ]

  const recentBlotterEntries = [
    {
      id: "BLT-2024-001",
      date: "2024-01-15",
      incident: "Theft",
      location: "Purok 1",
      status: "Under Investigation",
      agency: "PNP",
    },
    {
      id: "BLT-2024-002",
      date: "2024-01-15",
      incident: "Domestic Dispute",
      location: "Purok 3",
      status: "Resolved",
      agency: "Barangay Tanod",
    },
    {
      id: "BLT-2024-003",
      date: "2024-01-14",
      incident: "Traffic Violation",
      location: "Highway",
      status: "Resolved",
      agency: "PNP",
    },
  ]

  const agencyStatus = [
    {
      name: "Philippine National Police",
      code: "PNP",
      status: "Online",
      personnel: 45,
      activeUnits: 8,
    },
    {
      name: "Bureau of Fire Protection",
      code: "BFP",
      status: "Online",
      personnel: 12,
      activeUnits: 3,
    },
    {
      name: "Barangay Tanod",
      code: "TANOD",
      status: "Online",
      personnel: 15,
      activeUnits: 5,
    },
    {
      name: "Armed Forces of the Philippines",
      code: "AFP",
      status: "Standby",
      personnel: 20,
      activeUnits: 2,
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">NET Coordination</h1>
          <p className="text-muted-foreground">Monitor and coordinate with Network Enforcement Team</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            All Agencies Connected
          </Badge>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Radio className="h-4 w-4 mr-2" />
            NET Emergency Coordination
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" && <TrendingUp className="h-3 w-3 mr-1 text-green-600" />}
                {stat.trend === "down" && <TrendingDown className="h-3 w-3 mr-1 text-red-600" />}
                <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                  {stat.change} from last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="blotter">Shared Blotter</TabsTrigger>
          <TabsTrigger value="agencies">Agency Status</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Blotter Entries</CardTitle>
                <CardDescription>Latest entries from all NET agencies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentBlotterEntries.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{entry.id}</span>
                          <Badge variant="outline">{entry.agency}</Badge>
                        </div>
                        <p className="text-sm font-medium">{entry.incident}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {entry.location}
                          <Clock className="h-3 w-3 ml-2 mr-1" />
                          {entry.date}
                        </div>
                      </div>
                      <Badge variant={entry.status === "Resolved" ? "default" : "secondary"}>{entry.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agency Performance</CardTitle>
                <CardDescription>Response times and case resolution rates (Demo)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Response Time</span>
                    <span className="text-sm text-muted-foreground">4.2 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Case Resolution Rate</span>
                    <span className="text-sm text-muted-foreground">87%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Active Patrol Coverage</span>
                    <span className="text-sm text-muted-foreground">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Emergency Response Rate</span>
                    <span className="text-sm text-muted-foreground">98%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="blotter">
          <Card>
            <CardHeader>
              <CardTitle>Shared Blotter System</CardTitle>
              <CardDescription>Unified blotter records from all NET agencies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Blotter ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Incident Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Agency</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBlotterEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.id}</TableCell>
                      <TableCell>{entry.date}</TableCell>
                      <TableCell>{entry.incident}</TableCell>
                      <TableCell>{entry.location}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{entry.agency}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.status === "Resolved" ? "default" : "secondary"}>{entry.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agencies">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agencyStatus.map((agency) => (
              <Card key={agency.code}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{agency.name} (Demo)</CardTitle>
                      <CardDescription>{agency.code}</CardDescription>
                    </div>
                    <Badge variant={agency.status === "Online" ? "default" : "secondary"}>{agency.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Personnel on Duty</span>
                      <span className="font-medium">{agency.personnel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Active Units</span>
                      <span className="font-medium">{agency.activeUnits}</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Radio className="h-4 w-4 mr-2" />
                      Contact Agency
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>NET Reports</CardTitle>
              <CardDescription>Monthly and quarterly reports from all agencies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Reports will be available here</p>
                <p className="text-sm">Monthly reports are generated automatically</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
