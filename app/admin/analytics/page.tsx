"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  AlertTriangle,
  Download,
  RefreshCw,
  DollarSign,
  Activity,
} from "lucide-react"

export default function AnalyticsPage() {
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" })

  const analyticsData = {
    overview: {
      totalResidents: { current: 2853, previous: 2798, change: 1.97 },
      activeDocuments: { current: 184, previous: 156, change: 17.95 },
      emergencyAlerts: { current: 15, previous: 23, change: -34.78 },
      revenue: { current: 125000, previous: 118000, change: 5.93 },
    },
    demographics: {
      ageGroups: [
        { group: "0-17", count: 856, percentage: 30 },
        { group: "18-35", count: 999, percentage: 35 },
        { group: "36-55", count: 713, percentage: 25 },
        { group: "56+", count: 285, percentage: 10 },
      ],
      gender: [
        { type: "Male", count: 1426, percentage: 50 },
        { type: "Female", count: 1427, percentage: 50 },
      ],
    },
    services: {
      mostRequested: [
        { service: "Barangay Certificate", count: 89, trend: "up" },
        { service: "Business Permit", count: 67, trend: "up" },
        { service: "Clearance Certificate", count: 45, trend: "down" },
        { service: "Indigency Certificate", count: 34, trend: "up" },
        { service: "Residency Certificate", count: 28, trend: "stable" },
      ],
      processingTimes: [
        { service: "Barangay Certificate", avgTime: "2.3 days", target: "3 days", status: "good" },
        { service: "Business Permit", avgTime: "5.1 days", target: "5 days", status: "warning" },
        { service: "Clearance Certificate", avgTime: "1.8 days", target: "2 days", status: "good" },
      ],
    },
    revenue: {
      monthly: [
        { month: "Jan", amount: 98000 },
        { month: "Feb", amount: 105000 },
        { month: "Mar", amount: 112000 },
        { month: "Apr", amount: 118000 },
        { month: "May", amount: 125000 },
      ],
      sources: [
        { source: "Document Fees", amount: 45000, percentage: 36 },
        { source: "Business Permits", amount: 38000, percentage: 30.4 },
        { source: "Clearance Fees", amount: 25000, percentage: 20 },
        { source: "Other Services", amount: 17000, percentage: 13.6 },
      ],
    },
    incidents: {
      types: [
        { type: "Medical Emergency", count: 12, severity: "high" },
        { type: "Fire Incident", count: 3, severity: "high" },
        { type: "Flood", count: 8, severity: "medium" },
        { type: "Power Outage", count: 15, severity: "low" },
        { type: "Road Accident", count: 7, severity: "medium" },
      ],
      responseTime: {
        average: "8.5 minutes",
        target: "10 minutes",
        improvement: "+15%",
      },
    },
  }

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Activity className="h-4 w-4 text-gray-600" />
  }

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-green-600"
    if (change < 0) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
          <p className="text-muted-foreground">Comprehensive data insights for {currentMonth}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue="month">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Residents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalResidents.current.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {getTrendIcon(analyticsData.overview.totalResidents.change)}
              <span className={`ml-1 ${getTrendColor(analyticsData.overview.totalResidents.change)}`}>
                {analyticsData.overview.totalResidents.change > 0 ? "+" : ""}
                {analyticsData.overview.totalResidents.change}%
              </span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Document Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.activeDocuments.current}</div>
            <div className="flex items-center text-xs">
              {getTrendIcon(analyticsData.overview.activeDocuments.change)}
              <span className={`ml-1 ${getTrendColor(analyticsData.overview.activeDocuments.change)}`}>
                {analyticsData.overview.activeDocuments.change > 0 ? "+" : ""}
                {analyticsData.overview.activeDocuments.change}%
              </span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emergency Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.emergencyAlerts.current}</div>
            <div className="flex items-center text-xs">
              {getTrendIcon(analyticsData.overview.emergencyAlerts.change)}
              <span className={`ml-1 ${getTrendColor(analyticsData.overview.emergencyAlerts.change)}`}>
                {analyticsData.overview.emergencyAlerts.change}%
              </span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₱{analyticsData.overview.revenue.current.toLocaleString()}</div>
            <div className="flex items-center text-xs">
              {getTrendIcon(analyticsData.overview.revenue.change)}
              <span className={`ml-1 ${getTrendColor(analyticsData.overview.revenue.change)}`}>
                {analyticsData.overview.revenue.change > 0 ? "+" : ""}
                {analyticsData.overview.revenue.change}%
              </span>
              <span className="ml-1 text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="demographics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Age Distribution</CardTitle>
                <CardDescription>Population breakdown by age groups</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.demographics.ageGroups.map((group) => (
                    <div key={group.group} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{group.group} years</span>
                        <span>
                          {group.count} ({group.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${group.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gender Distribution</CardTitle>
                <CardDescription>Population breakdown by gender</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.demographics.gender.map((item) => (
                    <div key={item.type} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.type}</span>
                        <span>
                          {item.count} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            item.type === "Male" ? "bg-blue-600" : "bg-pink-600"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Most Requested Services</CardTitle>
                <CardDescription>Top services by request volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.services.mostRequested.map((service, index) => (
                    <div key={service.service} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                          {index + 1}
                        </div>
                        <span className="text-sm font-medium">{service.service}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">{service.count}</span>
                        {service.trend === "up" && <TrendingUp className="h-3 w-3 text-green-600" />}
                        {service.trend === "down" && <TrendingDown className="h-3 w-3 text-red-600" />}
                        {service.trend === "stable" && <Activity className="h-3 w-3 text-gray-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Processing Times</CardTitle>
                <CardDescription>Average processing time vs targets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.services.processingTimes.map((item) => (
                    <div key={item.service} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.service}</span>
                        <Badge variant={item.status === "good" ? "default" : "destructive"}>{item.avgTime}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">Target: {item.target}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue Trend</CardTitle>
                <CardDescription>Revenue growth over the past 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.revenue.monthly.map((month) => (
                    <div key={month.month} className="flex justify-between items-center">
                      <span className="text-sm">{month.month}</span>
                      <span className="font-medium">₱{month.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Sources</CardTitle>
                <CardDescription>Breakdown by service category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.revenue.sources.map((source) => (
                    <div key={source.source} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{source.source}</span>
                        <span>
                          ₱{source.amount.toLocaleString()} ({source.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Incident Types</CardTitle>
                <CardDescription>Emergency incidents by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.incidents.types.map((incident) => (
                    <div key={incident.type} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle
                          className={`h-4 w-4 ${
                            incident.severity === "high"
                              ? "text-red-600"
                              : incident.severity === "medium"
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        />
                        <span className="text-sm">{incident.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{incident.count}</span>
                        <Badge
                          variant={
                            incident.severity === "high"
                              ? "destructive"
                              : incident.severity === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {incident.severity}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Performance</CardTitle>
                <CardDescription>Emergency response metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Response Time</span>
                    <span className="font-medium text-green-600">{analyticsData.incidents.responseTime.average}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Target Response Time</span>
                    <span className="font-medium">{analyticsData.incidents.responseTime.target}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Improvement</span>
                    <Badge variant="default">{analyticsData.incidents.responseTime.improvement}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
