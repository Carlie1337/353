"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Users, FileText, Shield, BarChart3, Server, Database, Activity, Zap } from "lucide-react"
import Link from "next/link"

export default function HeartclifDashboard() {
  const systemStats = [
    {
      title: "Total Users",
      value: "3,247",
      change: "+156 this month",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Sessions",
      value: "892",
      change: "Real-time",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "System Uptime",
      value: "99.9%",
      change: "Last 30 days",
      icon: Server,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Data Storage",
      value: "2.4TB",
      change: "78% capacity",
      icon: Database,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  const recentActivities = [
    {
      id: "ACT-001",
      action: "New user registration",
      user: "Maria Santos",
      timestamp: "2 minutes ago",
      type: "user",
      status: "success",
    },
    {
      id: "ACT-002",
      action: "Document approved",
      user: "Admin User",
      timestamp: "5 minutes ago",
      type: "document",
      status: "success",
    },
    {
      id: "ACT-003",
      action: "System backup completed",
      user: "System",
      timestamp: "1 hour ago",
      type: "system",
      status: "success",
    },
    {
      id: "ACT-004",
      action: "Failed login attempt",
      user: "Unknown",
      timestamp: "2 hours ago",
      type: "security",
      status: "warning",
    },
  ]

  const systemModules = [
    {
      name: "Resident Portal",
      status: "online",
      users: 1247,
      uptime: "99.8%",
      lastUpdate: "2024-01-15",
    },
    {
      name: "Admin Portal",
      status: "online",
      users: 45,
      uptime: "100%",
      lastUpdate: "2024-01-14",
    },
    {
      name: "Health Portal",
      status: "online",
      users: 324,
      uptime: "99.5%",
      lastUpdate: "2024-01-15",
    },
    {
      name: "NET System",
      status: "maintenance",
      users: 12,
      uptime: "98.2%",
      lastUpdate: "2024-01-13",
    },
    {
      name: "ResQNet",
      status: "online",
      users: 28,
      uptime: "99.9%",
      lastUpdate: "2024-01-15",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800"
      case "offline":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return Users
      case "document":
        return FileText
      case "system":
        return Server
      case "security":
        return Shield
      default:
        return Activity
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Crown className="h-8 w-8 text-purple-600" />
            Heartclif Supreme Admin
          </h1>
          <p className="text-muted-foreground">Complete system administration and monitoring dashboard</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">
            Supreme Access
          </Badge>
          <Button asChild>
            <Link href="/heartclif/system">
              <Server className="h-4 w-4 mr-2" />
              System Management
            </Link>
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`h-8 w-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Recent System Activities
                </CardTitle>
                <CardDescription>Latest system events and user activities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = getActivityIcon(activity.type)
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className={`h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center`}>
                        <Icon className={`h-4 w-4 ${getActivityColor(activity.status)}`} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{activity.user}</span>
                          <span>•</span>
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                    </div>
                  )
                })}
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/heartclif/audit">View Full Audit Log</Link>
                </Button>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  System Health
                </CardTitle>
                <CardDescription>Real-time system performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Disk Usage</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Network Load</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} className="h-2" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">99.9%</div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">892</div>
                    <div className="text-xs text-muted-foreground">Active Users</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                System Modules Status
              </CardTitle>
              <CardDescription>Monitor and manage all system modules</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemModules.map((module, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="space-y-1">
                        <h4 className="font-medium">{module.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{module.users} active users</span>
                          <span>Uptime: {module.uptime}</span>
                          <span>Updated: {module.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                      <Button size="sm" variant="outline">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* User Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Statistics
                </CardTitle>
                <CardDescription>User registration and activity metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-blue-600">3,247</div>
                    <div className="text-sm text-muted-foreground">Total Users</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-green-600">892</div>
                    <div className="text-sm text-muted-foreground">Active Today</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-orange-600">156</div>
                    <div className="text-sm text-muted-foreground">New This Month</div>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold text-purple-600">45</div>
                    <div className="text-sm text-muted-foreground">Admin Users</div>
                  </div>
                </div>
                <Button className="w-full" asChild>
                  <Link href="/heartclif/users">Manage Users</Link>
                </Button>
              </CardContent>
            </Card>

            {/* User Roles */}
            <Card>
              <CardHeader>
                <CardTitle>User Roles Distribution</CardTitle>
                <CardDescription>Breakdown of user roles across the system</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    { role: "Residents", count: 2853, percentage: 88 },
                    { role: "Barangay Officials", count: 15, percentage: 0.5 },
                    { role: "Health Workers", count: 24, percentage: 0.7 },
                    { role: "Security Personnel", count: 18, percentage: 0.6 },
                    { role: "Admin Staff", count: 45, percentage: 1.4 },
                    { role: "System Admins", count: 8, percentage: 0.2 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.role}</span>
                        <span>{item.count} users</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Security Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Alerts
                </CardTitle>
                <CardDescription>Recent security events and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    type: "Failed Login",
                    description: "Multiple failed login attempts detected",
                    severity: "medium",
                    time: "2 hours ago",
                  },
                  {
                    type: "Suspicious Activity",
                    description: "Unusual access pattern from IP 192.168.1.100",
                    severity: "high",
                    time: "4 hours ago",
                  },
                  {
                    type: "Password Reset",
                    description: "Bulk password reset requests",
                    severity: "low",
                    time: "1 day ago",
                  },
                ].map((alert, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{alert.type}</h4>
                      <Badge
                        className={
                          alert.severity === "high"
                            ? "bg-red-100 text-red-800"
                            : alert.severity === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                ))}
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/heartclif/security">View Security Dashboard</Link>
                </Button>
              </CardContent>
            </Card>

            {/* System Security */}
            <Card>
              <CardHeader>
                <CardTitle>System Security Status</CardTitle>
                <CardDescription>Overall security health and compliance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Firewall Status</span>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">SSL Certificate</span>
                    <Badge className="bg-green-100 text-green-800">Valid</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Backup Status</span>
                    <Badge className="bg-green-100 text-green-800">Up to Date</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Antivirus</span>
                    <Badge className="bg-green-100 text-green-800">Protected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Encryption</span>
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-muted-foreground">Security Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* System Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  System Performance
                </CardTitle>
                <CardDescription>Performance metrics and trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Average Response Time</span>
                    <span className="font-medium">245ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database Queries/sec</span>
                    <span className="font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Requests/min</span>
                    <span className="font-medium">3,456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Error Rate</span>
                    <span className="font-medium">0.02%</span>
                  </div>
                </div>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <Link href="/heartclif/performance">View Performance Dashboard</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Usage Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Usage Analytics</CardTitle>
                <CardDescription>System usage patterns and statistics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Daily Active Users</span>
                    <span className="font-medium">892</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Peak Concurrent Users</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Documents Processed</span>
                    <span className="font-medium">2,456</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Service Requests</span>
                    <span className="font-medium">1,789</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center space-y-2">
                    <div className="text-2xl font-bold text-blue-600">94%</div>
                    <div className="text-sm text-muted-foreground">User Satisfaction</div>
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
