"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  FileText,
  AlertTriangle,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle,
  Heart,
  Shield,
  Radio,
  Siren,
  Eye,
  Bell,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function BMSDashboard() {
  const [mounted, setMounted] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const stats = [
    {
      title: "Total Residents",
      value: "2,847",
      change: "+12 this month",
      changePercent: "+0.4%",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "up",
    },
    {
      title: "Pending Documents",
      value: "23",
      change: "5 urgent",
      changePercent: "-15%",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "down",
    },
    {
      title: "Active Incidents",
      value: "7",
      change: "2 high priority",
      changePercent: "+12%",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
      trend: "up",
    },
    {
      title: "Households",
      value: "1,156",
      change: "+8 this month",
      changePercent: "+0.7%",
      icon: Building2,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "up",
    },
  ]

  const analyticsData = {
    documentRequests: {
      total: 184,
      approved: 156,
      pending: 23,
      rejected: 5,
      avgProcessingTime: "2.3 days",
      completionRate: "84.8%",
    },
    residents: {
      total: 2847,
      active: 2720,
      newThisMonth: 45,
      verificationRate: "95.2%",
      demographics: {
        children: 28,
        adults: 58,
        seniors: 14,
      },
    },
    revenue: {
      thisMonth: 125000,
      lastMonth: 118000,
      growth: "+5.9%",
      topSources: [
        { name: "Document Fees", amount: 45000, percentage: 36 },
        { name: "Business Permits", amount: 38000, percentage: 30 },
        { name: "Clearances", amount: 25000, percentage: 20 },
        { name: "Other Services", amount: 17000, percentage: 14 },
      ],
    },
    incidents: {
      total: 15,
      resolved: 12,
      active: 3,
      avgResolutionTime: "4.2 hours",
      byType: [
        { type: "Noise Complaint", count: 5 },
        { type: "Property Dispute", count: 3 },
        { type: "Public Safety", count: 4 },
        { type: "Infrastructure", count: 3 },
      ],
    },
  }

  const recentDocuments = [
    {
      id: "DOC-2024-001",
      type: "Barangay Certificate",
      resident: "Maria Santos",
      status: "pending",
      date: "2024-01-15",
      priority: "normal",
      fee: "₱50",
    },
    {
      id: "DOC-2024-002",
      type: "Certificate of Residency",
      resident: "Juan Dela Cruz",
      status: "approved",
      date: "2024-01-15",
      priority: "urgent",
      fee: "₱30",
    },
    {
      id: "DOC-2024-003",
      type: "Business Permit",
      resident: "Ana Rodriguez",
      status: "processing",
      date: "2024-01-14",
      priority: "normal",
      fee: "₱500",
    },
    {
      id: "DOC-2024-004",
      type: "Barangay Clearance",
      resident: "Pedro Martinez",
      status: "approved",
      date: "2024-01-14",
      priority: "normal",
      fee: "₱25",
    },
  ]

  const systemStatus = [
    {
      name: "Health Portal",
      status: "online",
      users: 12,
      icon: Heart,
      href: "/health-portal",
      uptime: "99.9%",
    },
    {
      name: "NET System",
      status: "online",
      users: 8,
      icon: Radio,
      href: "/net",
      uptime: "99.8%",
    },
    {
      name: "Tanod Portal",
      status: "online",
      users: 15,
      icon: Shield,
      href: "/tanod",
      uptime: "99.7%",
    },
    {
      name: "ResQNet",
      status: "online",
      users: 5,
      icon: Siren,
      href: "/ResQNet",
      uptime: "99.9%",
    },
  ]

  const handleRefresh = async () => {
    setRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setRefreshing(false)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">BMS Dashboard</h1>
            <p className="text-gray-600 text-sm sm:text-base">Welcome back, Barangay Captain Juan Dela Cruz</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="flex gap-2">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">Last 7 days</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                  <SelectItem value="90">Last 3 months</SelectItem>
                  <SelectItem value="365">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
            <Button className="w-full sm:w-auto">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge className="ml-2 bg-red-500 text-white">3</Badge>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2 text-xs">
                      <TrendingUp
                        className={`h-3 w-3 mr-1 ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                      />
                      <span className={stat.trend === "up" ? "text-green-600" : "text-red-600"}>
                        {stat.changePercent}
                      </span>
                      <span className="text-gray-500 ml-1">{stat.change}</span>
                    </div>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center flex-shrink-0`}
                  >
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Analytics Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="residents">Residents</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              {/* Recent Document Requests */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Recent Document Requests</CardTitle>
                      <CardDescription>Latest certificate and permit requests</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm truncate">{doc.type}</p>
                            {doc.priority === "urgent" && (
                              <Badge variant="destructive" className="text-xs">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">{doc.resident}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            <span>{doc.date}</span>
                            <span>•</span>
                            <span>{doc.fee}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Badge
                            variant={
                              doc.status === "approved" ? "default" : doc.status === "pending" ? "secondary" : "outline"
                            }
                            className="text-xs"
                          >
                            {doc.status}
                          </Badge>
                          {doc.status === "approved" && <CheckCircle className="h-4 w-4 text-green-600" />}
                          {doc.status === "pending" && <Clock className="h-4 w-4 text-orange-600" />}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button asChild className="w-full">
                      <Link href="/bms/documents">View All Requests</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">System Status</CardTitle>
                  <CardDescription>Connected systems and active users</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemStatus.map((system) => (
                      <div
                        key={system.name}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <system.icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-sm">{system.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <span>{system.users} active users</span>
                              <span>•</span>
                              <span>Uptime: {system.uptime}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-green-600">Online</span>
                          </div>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={system.href}>Access</Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Document Analytics</CardTitle>
                  <CardDescription>Processing performance metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{analyticsData.documentRequests.total}</div>
                      <div className="text-xs text-gray-500">Total Requests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {analyticsData.documentRequests.completionRate}
                      </div>
                      <div className="text-xs text-gray-500">Completion Rate</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Approved</span>
                      <span className="font-medium">{analyticsData.documentRequests.approved}</span>
                    </div>
                    <Progress
                      value={(analyticsData.documentRequests.approved / analyticsData.documentRequests.total) * 100}
                      className="h-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Pending</span>
                      <span className="font-medium">{analyticsData.documentRequests.pending}</span>
                    </div>
                    <Progress
                      value={(analyticsData.documentRequests.pending / analyticsData.documentRequests.total) * 100}
                      className="h-2"
                    />
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Avg Processing Time</span>
                      <span className="font-medium">{analyticsData.documentRequests.avgProcessingTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Document Types Distribution</CardTitle>
                  <CardDescription>Most requested document types</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: "Barangay Certificate", count: 45, percentage: 35 },
                      { type: "Certificate of Residency", count: 38, percentage: 29 },
                      { type: "Business Permit", count: 25, percentage: 19 },
                      { type: "Barangay Clearance", count: 22, percentage: 17 },
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{item.type}</span>
                          <span className="font-medium">{item.count} requests</span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="residents" className="space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Resident Demographics</CardTitle>
                  <CardDescription>Population breakdown by age group</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {analyticsData.residents.demographics.children}%
                        </div>
                        <div className="text-xs text-gray-500">Children (0-17)</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          {analyticsData.residents.demographics.adults}%
                        </div>
                        <div className="text-xs text-gray-500">Adults (18-59)</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-orange-600">
                          {analyticsData.residents.demographics.seniors}%
                        </div>
                        <div className="text-xs text-gray-500">Seniors (60+)</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Children (0-17 years)</span>
                          <span>
                            {Math.round(
                              (analyticsData.residents.total * analyticsData.residents.demographics.children) / 100,
                            )}
                          </span>
                        </div>
                        <Progress value={analyticsData.residents.demographics.children} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Adults (18-59 years)</span>
                          <span>
                            {Math.round(
                              (analyticsData.residents.total * analyticsData.residents.demographics.adults) / 100,
                            )}
                          </span>
                        </div>
                        <Progress value={analyticsData.residents.demographics.adults} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Seniors (60+ years)</span>
                          <span>
                            {Math.round(
                              (analyticsData.residents.total * analyticsData.residents.demographics.seniors) / 100,
                            )}
                          </span>
                        </div>
                        <Progress value={analyticsData.residents.demographics.seniors} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Registration Trends</CardTitle>
                  <CardDescription>New resident registrations over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">{analyticsData.residents.newThisMonth}</div>
                        <div className="text-xs text-gray-500">New This Month</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">
                          {analyticsData.residents.verificationRate}
                        </div>
                        <div className="text-xs text-gray-500">Verification Rate</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Active Residents</span>
                        <span className="font-medium">{analyticsData.residents.active}</span>
                      </div>
                      <Progress
                        value={(analyticsData.residents.active / analyticsData.residents.total) * 100}
                        className="h-2"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Verified Profiles</span>
                        <span className="font-medium">{Math.round(analyticsData.residents.total * 0.952)}</span>
                      </div>
                      <Progress value={95.2} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Overview</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      ₱{analyticsData.revenue.thisMonth.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">This Month</div>
                    <div className="flex items-center justify-center mt-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-green-600">{analyticsData.revenue.growth}</span>
                      <span className="text-gray-500 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Last Month</span>
                      <span className="font-medium">₱{analyticsData.revenue.lastMonth.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Revenue Sources</CardTitle>
                  <CardDescription>Breakdown by service type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.revenue.topSources.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{source.name}</span>
                          <span className="font-medium">₱{source.amount.toLocaleString()}</span>
                        </div>
                        <Progress value={source.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Frequently used functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              <Button asChild className="h-20 flex-col gap-2">
                <Link href="/bms/documents">
                  <FileText className="h-6 w-6" />
                  <span className="text-xs text-center">Process Documents</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Link href="/bms/verification">
                  <CheckCircle className="h-6 w-6" />
                  <span className="text-xs text-center">Verify Residents</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Link href="/bms/print">
                  <FileText className="h-6 w-6" />
                  <span className="text-xs text-center">Print Center</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Link href="/bms/reports">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-xs text-center">Generate Reports</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                <Link href="/bms/blotter">
                  <FileText className="h-6 w-6" />
                  <span className="text-xs text-center">Blotter Records</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
