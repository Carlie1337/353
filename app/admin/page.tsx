"use client"

import { useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import {
  Users,
  FileText,
  AlertTriangle,
  Calendar,
  Bell,
  Activity,
  Clock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  MapPin,
  Heart,
  MessageSquare,
  BarChart3,
  Clipboard,
  Building,
  Shield,
  Crown,
  DollarSign,
  Zap,
  Database,
  Cpu,
  Wifi,
  Server,
  Eye,
  Lock,
  Sparkles,
  Globe,
} from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [mounted, setMounted] = useState(false)
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 45,
    memory: 67,
    disk: 23,
    network: 89,
  })
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setSystemMetrics({
        cpu: Math.floor(Math.random() * 100),
        memory: Math.floor(Math.random() * 100),
        disk: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 100),
      })
    }, 5000)

    // Redirect /admin to /heartclif
    router.replace("/heartclif")

    return () => clearInterval(interval)
  }, [router])

  const stats = {
    residents: { total: 2853, active: 2720, new: 45 },
    documents: { pending: 28, approved: 156, total: 184 },
    emergency: { active: 3, resolved: 12, total: 15 },
    services: { pending: 15, completed: 89, total: 104 },
  }

  const recentActivities = [
    {
      id: 1,
      type: "resident",
      message: "New resident registration: Maria Santos",
      time: "2 minutes ago",
      icon: Users,
      color: "text-blue-400",
      avatar: "MS",
      severity: "low",
    },
    {
      id: 2,
      type: "document",
      message: "Barangay Certificate approved for Juan Dela Cruz",
      time: "15 minutes ago",
      icon: FileText,
      color: "text-green-400",
      avatar: "JD",
      severity: "medium",
    },
    {
      id: 3,
      type: "emergency",
      message: "Emergency alert resolved: Power outage in Zone 2",
      time: "1 hour ago",
      icon: AlertTriangle,
      color: "text-yellow-400",
      avatar: "SY",
      severity: "high",
    },
    {
      id: 4,
      type: "service",
      message: "Infrastructure repair request completed",
      time: "2 hours ago",
      icon: CheckCircle,
      color: "text-purple-400",
      avatar: "IR",
      severity: "medium",
    },
    {
      id: 5,
      type: "security",
      message: "Failed login attempt detected from unknown IP",
      time: "3 hours ago",
      icon: Shield,
      color: "text-red-400",
      avatar: "SEC",
      severity: "critical",
    },
  ]

  const quickActions = [
    {
      title: "Manage Residents",
      description: "View and manage community members",
      icon: Users,
      href: "/admin/residents",
      gradient: "from-blue-500 to-cyan-500",
      count: "2,853",
    },
    {
      title: "Process Documents",
      description: "Review pending document requests",
      icon: FileText,
      href: "/admin/documents",
      gradient: "from-green-500 to-emerald-500",
      count: "28 pending",
    },
    {
      title: "Emergency Alerts",
      description: "Monitor emergency situations",
      icon: AlertTriangle,
      href: "/admin/emergency",
      gradient: "from-red-500 to-pink-500",
      count: "3 active",
    },
    {
      title: "System Control",
      description: "Manage system settings",
      icon: Server,
      href: "/admin/system",
      gradient: "from-purple-500 to-violet-500",
      count: "All systems",
    },
  ]

  const systemStatus = [
    { name: "Database", status: "Operational", color: "text-green-400", uptime: "99.9%" },
    { name: "Authentication", status: "Operational", color: "text-green-400", uptime: "99.8%" },
    { name: "File Storage", status: "Operational", color: "text-green-400", uptime: "99.7%" },
    { name: "Notifications", status: "Limited", color: "text-yellow-400", uptime: "95.2%" },
    { name: "API Gateway", status: "Operational", color: "text-green-400", uptime: "99.9%" },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 md:ml-64 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 min-h-screen text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -inset-10 opacity-30">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between space-y-2 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Supreme Admin Dashboard
              </h2>
              <p className="text-gray-300">Welcome back, Supreme Administrator</p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-white/20 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Today
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
            <Badge className="ml-2 bg-red-500 text-white">3</Badge>
          </Button>
        </div>
      </div>

      {/* System Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemMetrics.cpu}%</div>
            <Progress value={systemMetrics.cpu} className="mt-2" />
            <div className="flex items-center text-xs text-gray-300 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">Normal</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Memory Usage</CardTitle>
            <Database className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemMetrics.memory}%</div>
            <Progress value={systemMetrics.memory} className="mt-2" />
            <div className="flex items-center text-xs text-gray-300 mt-2">
              <TrendingUp className="h-3 w-3 text-yellow-400 mr-1" />
              <span className="text-yellow-400">Moderate</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Disk Usage</CardTitle>
            <Server className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemMetrics.disk}%</div>
            <Progress value={systemMetrics.disk} className="mt-2" />
            <div className="flex items-center text-xs text-gray-300 mt-2">
              <TrendingDown className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">Low</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Network</CardTitle>
            <Wifi className="h-4 w-4 text-cyan-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{systemMetrics.network}%</div>
            <Progress value={systemMetrics.network} className="mt-2" />
            <div className="flex items-center text-xs text-gray-300 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">Excellent</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Residents</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.residents.total.toLocaleString()}</div>
            <div className="flex items-center text-xs text-gray-300">
              <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">+{stats.residents.new}</span>
              <span className="ml-1">new this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Document Requests</CardTitle>
            <FileText className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.documents.total}</div>
            <div className="flex items-center text-xs text-gray-300">
              <Clock className="h-3 w-3 text-yellow-400 mr-1" />
              <span className="text-yellow-400">{stats.documents.pending}</span>
              <span className="ml-1">pending approval</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 backdrop-blur-sm border border-red-500/30 hover:from-red-500/30 hover:to-pink-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Emergency Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.emergency.active}</div>
            <div className="flex items-center text-xs text-gray-300">
              <CheckCircle className="h-3 w-3 text-green-400 mr-1" />
              <span className="text-green-400">{stats.emergency.resolved}</span>
              <span className="ml-1">resolved this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-sm border border-purple-500/30 hover:from-purple-500/30 hover:to-violet-500/30 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Service Requests</CardTitle>
            <Activity className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.services.total}</div>
            <div className="flex items-center text-xs text-gray-300">
              <TrendingDown className="h-3 w-3 text-red-400 mr-1" />
              <span className="text-yellow-400">{stats.services.pending}</span>
              <span className="ml-1">pending completion</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-sm border border-white/20 relative z-10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Supreme Admin Actions
          </CardTitle>
          <CardDescription className="text-gray-300">Critical administrative tasks and system controls</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Link key={index} href={action.href}>
                <div className="group relative overflow-hidden rounded-lg border border-white/20 p-4 hover:shadow-xl transition-all cursor-pointer bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`h-12 w-12 rounded-lg bg-gradient-to-r ${action.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium group-hover:text-blue-400 transition-colors text-white">
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-300">{action.description}</p>
                      <Badge className="mt-2 bg-white/20 text-white border-white/30">{action.count}</Badge>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity and System Status */}
      <div className="grid gap-4 md:grid-cols-7 relative z-10">
        <Card className="md:col-span-4 border-0 shadow-xl bg-white/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-blue-400" />
              Real-time Activity Monitor
            </CardTitle>
            <CardDescription className="text-gray-300">Latest system activities and security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                      {activity.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3 text-gray-400" />
                      <span className="text-xs text-gray-400">{activity.time}</span>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          activity.severity === "critical"
                            ? "border-red-500/50 text-red-400"
                            : activity.severity === "high"
                              ? "border-yellow-500/50 text-yellow-400"
                              : activity.severity === "medium"
                                ? "border-blue-500/50 text-blue-400"
                                : "border-green-500/50 text-green-400"
                        }`}
                      >
                        {activity.severity}
                      </Badge>
                    </div>
                  </div>
                  <div
                    className={`h-6 w-6 rounded-full bg-white/10 flex items-center justify-center ${activity.color}`}
                  >
                    <activity.icon className="h-3 w-3" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 border-0 shadow-xl bg-white/10 backdrop-blur-sm border border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Server className="h-5 w-5 text-green-400" />
              System Health
            </CardTitle>
            <CardDescription className="text-gray-300">Current system status and uptime</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemStatus.map((system, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${system.color === "text-green-400" ? "bg-green-400" : "bg-yellow-400"} animate-pulse`}
                    ></div>
                    <span className="text-sm text-white">{system.name}</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className={`${system.color} border-current/50 text-xs`}>
                      {system.status}
                    </Badge>
                    <div className="text-xs text-gray-400 mt-1">{system.uptime}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/20">
              <h4 className="text-sm font-medium mb-3 text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                Today's Summary
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">New Registrations</span>
                  <span className="font-medium text-white">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Documents Processed</span>
                  <span className="font-medium text-white">45</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Permits Issued</span>
                  <span className="font-medium text-white">8</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Revenue Collected</span>
                  <span className="font-medium text-white">₱23,500</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Administrative Modules */}
      <Card className="border-0 shadow-xl bg-white/10 backdrop-blur-sm border border-white/20 relative z-10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Globe className="h-5 w-5 text-purple-400" />
            Supreme Administrative Control Center
          </CardTitle>
          <CardDescription className="text-gray-300">
            Access all system management functions with supreme privileges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[
              { name: "Residents", icon: Users, href: "/admin/residents", color: "from-blue-500 to-cyan-500" },
              { name: "Documents", icon: FileText, href: "/admin/documents", color: "from-green-500 to-emerald-500" },
              { name: "Services", icon: Clipboard, href: "/admin/services", color: "from-purple-500 to-violet-500" },
              { name: "Emergency", icon: AlertTriangle, href: "/admin/emergency", color: "from-red-500 to-pink-500" },
              { name: "Health & Aid", icon: Heart, href: "/admin/health", color: "from-pink-500 to-rose-500" },
              {
                name: "Community",
                icon: MessageSquare,
                href: "/admin/community",
                color: "from-yellow-500 to-orange-500",
              },
              { name: "Business", icon: Building, href: "/admin/business", color: "from-indigo-500 to-purple-500" },
              { name: "Security", icon: Shield, href: "/admin/security", color: "from-gray-500 to-slate-500" },
              { name: "Map & GIS", icon: MapPin, href: "/admin/map", color: "from-emerald-500 to-teal-500" },
              { name: "Analytics", icon: BarChart3, href: "/admin/analytics", color: "from-orange-500 to-red-500" },
              {
                name: "Access Control",
                icon: Lock,
                href: "/admin/access-control",
                color: "from-violet-500 to-purple-500",
              },
              { name: "Audit Trail", icon: Eye, href: "/admin/audit", color: "from-cyan-500 to-blue-500" },
              { name: "System Control", icon: Server, href: "/admin/system", color: "from-slate-500 to-gray-500" },
              { name: "Finance", icon: DollarSign, href: "/admin/finance", color: "from-green-500 to-lime-500" },
              { name: "Officials", icon: Crown, href: "/admin/officials", color: "from-yellow-500 to-amber-500" },
            ].map((module, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex-col gap-2 border-white/20 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white hover:text-white transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href={module.href}>
                  <div
                    className={`h-8 w-8 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center shadow-lg`}
                  >
                    <module.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs font-medium">{module.name}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
