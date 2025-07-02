"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Database,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Eye,
  Download,
  RefreshCw,
} from "lucide-react"

export default function HeartclifAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30")
  const [refreshing, setRefreshing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const systemMetrics = {
    performance: {
      cpu: { usage: 45, trend: "stable" },
      memory: { usage: 68, trend: "up" },
      disk: { usage: 34, trend: "down" },
      network: { usage: 23, trend: "stable" },
    },
    modules: [
      { name: "BMS", status: "online", users: 45, uptime: "99.9%", responseTime: "120ms" },
      { name: "Health Portal", status: "online", users: 23, uptime: "99.8%", responseTime: "95ms" },
      { name: "NET System", status: "online", users: 12, uptime: "99.7%", responseTime: "110ms" },
      { name: "Tanod Portal", status: "online", users: 18, uptime: "99.9%", responseTime: "85ms" },
      { name: "ResQNet", status: "online", users: 8, uptime: "99.6%", responseTime: "130ms" },
    ],
    traffic: {
      totalUsers: 2847,
      activeUsers: 156,
      pageViews: 12450,
      avgSessionTime: "8m 32s",
      bounceRate: "23.4%",
    },
    business: {
      revenue: 125000,
      documents: 184,
      incidents: 15,
      residents: 2847,
      growth: "+5.9%",
    },
    security: {
      loginAttempts: 1245,
      failedLogins: 23,
      securityAlerts: 3,
      complianceScore: 98.5,
    },
  }

  const handleRefresh = async () => {
    setRefreshing(true)
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">System Analytics</h1>
            <p className="text-gray-600 text-sm sm:text-base">Comprehensive system performance and usage analytics</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-full sm:w-32">
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
            <Button className="w-full sm:w-auto">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {systemMetrics.traffic.totalUsers.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-600">+12.5%</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                  <p className="text-2xl font-bold text-green-600">{systemMetrics.traffic.activeUsers}</p>
                  <div className="flex items-center mt-1 text-xs">
                    <Activity className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-600">Online now</span>
                  </div>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">System Health</p>
                  <p className="text-2xl font-bold text-green-600">99.8%</p>
                  <div className="flex items-center mt-1 text-xs">
                    <CheckCircle className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-600">All systems operational</span>
                  </div>
                </div>
                <Shield className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Score</p>
                  <p className="text-2xl font-bold text-purple-600">{systemMetrics.security.complianceScore}%</p>
                  <div className="flex items-center mt-1 text-xs">
                    <Shield className="h-3 w-3 mr-1 text-purple-500" />
                    <span className="text-purple-600">Excellent</span>
                  </div>
                </div>
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="performance" className="text-xs sm:text-sm">
              Performance
            </TabsTrigger>
            <TabsTrigger value="modules" className="text-xs sm:text-sm">
              Modules
            </TabsTrigger>
            <TabsTrigger value="traffic" className="text-xs sm:text-sm">
              Traffic
            </TabsTrigger>
            <TabsTrigger value="business" className="text-xs sm:text-sm">
              Business
            </TabsTrigger>
            <TabsTrigger value="security" className="text-xs sm:text-sm">
              Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    System Performance
                  </CardTitle>
                  <CardDescription>Real-time system resource utilization</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">CPU Usage</span>
                      </div>
                      <span className="text-sm font-bold">{systemMetrics.performance.cpu.usage}%</span>
                    </div>
                    <Progress value={systemMetrics.performance.cpu.usage} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-medium">Memory Usage</span>
                      </div>
                      <span className="text-sm font-bold">{systemMetrics.performance.memory.usage}%</span>
                    </div>
                    <Progress value={systemMetrics.performance.memory.usage} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-orange-600" />
                        <span className="text-sm font-medium">Disk Usage</span>
                      </div>
                      <span className="text-sm font-bold">{systemMetrics.performance.disk.usage}%</span>
                    </div>
                    <Progress value={systemMetrics.performance.disk.usage} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Wifi className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium">Network Usage</span>
                      </div>
                      <span className="text-sm font-bold">{systemMetrics.performance.network.usage}%</span>
                    </div>
                    <Progress value={systemMetrics.performance.network.usage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>24-hour performance overview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Performance chart visualization</p>
                      <p className="text-xs text-gray-500">Real-time data visualization would be displayed here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Module Status & Performance</CardTitle>
                <CardDescription>Individual system module health and metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemMetrics.modules.map((module, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                        <div>
                          <h3 className="font-medium">{module.name}</h3>
                          <p className="text-sm text-gray-600">{module.users} active users</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="font-medium text-green-600">{module.uptime}</p>
                          <p className="text-xs text-gray-500">Uptime</p>
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-blue-600">{module.responseTime}</p>
                          <p className="text-xs text-gray-500">Response</p>
                        </div>
                        <div className="text-center">
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {module.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="traffic" className="space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>User engagement and activity metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">
                        {systemMetrics.traffic.pageViews.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Page Views</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{systemMetrics.traffic.avgSessionTime}</div>
                      <div className="text-xs text-gray-500">Avg Session</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Bounce Rate</span>
                      <span className="font-medium">{systemMetrics.traffic.bounceRate}</span>
                    </div>
                    <Progress value={23.4} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>Real-time user engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Activity timeline visualization</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="business" className="space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ₱{systemMetrics.business.revenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                  <div className="flex items-center justify-center mt-2 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-600">{systemMetrics.business.growth}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-blue-600">{systemMetrics.business.documents}</div>
                  <div className="text-sm text-gray-500">Documents Processed</div>
                  <div className="flex items-center justify-center mt-2 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1 text-blue-500" />
                    <span className="text-blue-600">+8.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-orange-600">{systemMetrics.business.incidents}</div>
                  <div className="text-sm text-gray-500">Incidents Resolved</div>
                  <div className="flex items-center justify-center mt-2 text-xs">
                    <TrendingDown className="h-3 w-3 mr-1 text-green-500" />
                    <span className="text-green-600">-12%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {systemMetrics.business.residents.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Registered Residents</div>
                  <div className="flex items-center justify-center mt-2 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1 text-purple-500" />
                    <span className="text-purple-600">+2.1%</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Metrics
                  </CardTitle>
                  <CardDescription>System security and compliance status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {systemMetrics.security.loginAttempts.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">Login Attempts</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-600">{systemMetrics.security.failedLogins}</div>
                      <div className="text-xs text-gray-500">Failed Logins</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Security Compliance</span>
                      <span className="font-medium">{systemMetrics.security.complianceScore}%</span>
                    </div>
                    <Progress value={systemMetrics.security.complianceScore} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Alerts</CardTitle>
                  <CardDescription>Recent security events and alerts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Multiple failed login attempts</p>
                        <p className="text-xs text-gray-600">IP: 192.168.1.100 - 5 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Security scan completed</p>
                        <p className="text-xs text-gray-600">No vulnerabilities found - 1 hour ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <Eye className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Admin access logged</p>
                        <p className="text-xs text-gray-600">User: admin@heartclif.com - 2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
