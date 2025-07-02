"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  Download,
  Upload,
  RefreshCw,
  Power,
  AlertCircle,
} from "lucide-react"
import { useAuditLog } from "@/lib/audit-service"

interface SystemStatus {
  id: string
  name: string
  status: "operational" | "warning" | "error" | "maintenance"
  uptime: string
  lastCheck: string
  details: string
}

interface SystemConfig {
  id: string
  category: string
  name: string
  description: string
  value: string | boolean | number
  type: "text" | "boolean" | "number" | "select"
  options?: string[]
  sensitive?: boolean
}

export default function SystemManagementPage() {
  const { logAction } = useAuditLog()

  const [systemStatus, setSystemStatus] = useState<SystemStatus[]>([
    {
      id: "database",
      name: "Database Server",
      status: "operational",
      uptime: "99.9%",
      lastCheck: "2 minutes ago",
      details: "PostgreSQL running normally",
    },
    {
      id: "auth",
      name: "Authentication Service",
      status: "operational",
      uptime: "99.8%",
      lastCheck: "1 minute ago",
      details: "Supabase Auth active",
    },
    {
      id: "storage",
      name: "File Storage",
      status: "operational",
      uptime: "99.9%",
      lastCheck: "3 minutes ago",
      details: "Vercel Blob storage active",
    },
    {
      id: "notifications",
      name: "Notification Service",
      status: "warning",
      uptime: "95.2%",
      lastCheck: "5 minutes ago",
      details: "Email delivery delayed",
    },
    {
      id: "backup",
      name: "Backup System",
      status: "operational",
      uptime: "100%",
      lastCheck: "1 hour ago",
      details: "Last backup: 2 hours ago",
    },
  ])

  const [systemConfigs, setSystemConfigs] = useState<SystemConfig[]>([
    {
      id: "site_name",
      category: "General",
      name: "Site Name",
      description: "The name of the barangay system",
      value: "Barangay Bucana Management System",
      type: "text",
    },
    {
      id: "maintenance_mode",
      category: "General",
      name: "Maintenance Mode",
      description: "Enable maintenance mode to restrict access",
      value: false,
      type: "boolean",
    },
    {
      id: "max_file_size",
      category: "Storage",
      name: "Maximum File Size (MB)",
      description: "Maximum file size for uploads",
      value: 10,
      type: "number",
    },
    {
      id: "session_timeout",
      category: "Security",
      name: "Session Timeout (minutes)",
      description: "User session timeout duration",
      value: 30,
      type: "number",
    },
    {
      id: "email_notifications",
      category: "Notifications",
      name: "Email Notifications",
      description: "Enable email notifications",
      value: true,
      type: "boolean",
    },
    {
      id: "backup_frequency",
      category: "Backup",
      name: "Backup Frequency",
      description: "How often to perform automatic backups",
      value: "daily",
      type: "select",
      options: ["hourly", "daily", "weekly", "monthly"],
    },
    {
      id: "api_key",
      category: "Security",
      name: "API Key",
      description: "System API key for external integrations",
      value: "sk_live_*********************",
      type: "text",
      sensitive: true,
    },
  ])

  const [systemMetrics] = useState({
    cpu: 45,
    memory: 62,
    disk: 78,
    network: 23,
  })

  const handleConfigUpdate = async (configId: string, newValue: any) => {
    const oldConfig = systemConfigs.find((c) => c.id === configId)
    setSystemConfigs((configs) =>
      configs.map((config) => (config.id === configId ? { ...config, value: newValue } : config)),
    )

    await logAction(
      "UPDATE_SYSTEM_CONFIG",
      "system_config",
      `Updated system configuration: ${oldConfig?.name}`,
      "high",
      configId,
      oldConfig?.value,
      newValue,
    )
  }

  const handleSystemRestart = async (systemId: string) => {
    const system = systemStatus.find((s) => s.id === systemId)

    // Simulate restart
    setSystemStatus((status) =>
      status.map((s) => (s.id === systemId ? { ...s, status: "maintenance" as const, details: "Restarting..." } : s)),
    )

    await logAction(
      "RESTART_SYSTEM",
      "system_management",
      `Restarted system component: ${system?.name}`,
      "critical",
      systemId,
    )

    // Simulate restart completion
    setTimeout(() => {
      setSystemStatus((status) =>
        status.map((s) =>
          s.id === systemId
            ? { ...s, status: "operational" as const, details: "Running normally", lastCheck: "Just now" }
            : s,
        ),
      )
    }, 3000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      case "maintenance":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4" />
      case "warning":
        return <AlertTriangle className="h-4 w-4" />
      case "error":
        return <AlertCircle className="h-4 w-4" />
      case "maintenance":
        return <Clock className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const configsByCategory = systemConfigs.reduce(
    (acc, config) => {
      if (!acc[config.category]) {
        acc[config.category] = []
      }
      acc[config.category].push(config)
      return acc
    },
    {} as Record<string, SystemConfig[]>,
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:ml-64">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Management</h2>
          <p className="text-muted-foreground">Monitor and configure system components</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.cpu}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${systemMetrics.cpu}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
            <MemoryStick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.memory}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${systemMetrics.memory}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.disk}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${systemMetrics.disk}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Network I/O</CardTitle>
            <Network className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemMetrics.network}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${systemMetrics.network}%` }} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Current status of all system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemStatus.map((system) => (
              <div key={system.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`${getStatusColor(system.status)}`}>{getStatusIcon(system.status)}</div>
                  <div>
                    <p className="font-medium">{system.name}</p>
                    <p className="text-sm text-muted-foreground">{system.details}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">Uptime: {system.uptime}</p>
                    <p className="text-xs text-muted-foreground">Last check: {system.lastCheck}</p>
                  </div>
                  <Badge variant={system.status === "operational" ? "default" : "destructive"}>{system.status}</Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSystemRestart(system.id)}
                    disabled={system.status === "maintenance"}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
          <CardDescription>Configure system settings and parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(configsByCategory).map(([category, configs]) => (
              <div key={category}>
                <h3 className="text-lg font-medium mb-4">{category}</h3>
                <div className="space-y-4">
                  {configs.map((config) => (
                    <div key={config.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <Label className="text-base font-medium">{config.name}</Label>
                        <p className="text-sm text-muted-foreground">{config.description}</p>
                      </div>
                      <div className="w-64">
                        {config.type === "boolean" ? (
                          <Switch
                            checked={config.value as boolean}
                            onCheckedChange={(checked) => handleConfigUpdate(config.id, checked)}
                          />
                        ) : config.type === "select" ? (
                          <Select
                            value={config.value as string}
                            onValueChange={(value) => handleConfigUpdate(config.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {config.options?.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            type={config.type === "number" ? "number" : "text"}
                            value={config.sensitive ? "••••••••••••••••••••" : (config.value as string)}
                            onChange={(e) => {
                              if (!config.sensitive) {
                                const value = config.type === "number" ? Number(e.target.value) : e.target.value
                                handleConfigUpdate(config.id, value)
                              }
                            }}
                            readOnly={config.sensitive}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {category !== Object.keys(configsByCategory)[Object.keys(configsByCategory).length - 1] && (
                  <Separator className="mt-6" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            Emergency Actions
          </CardTitle>
          <CardDescription>Critical system operations - use with caution</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              These actions can affect system availability. Use only when necessary and ensure proper authorization.
            </AlertDescription>
          </Alert>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Power className="h-4 w-4 mr-2" />
                  Emergency Shutdown
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Emergency System Shutdown</DialogTitle>
                  <DialogDescription>
                    This will immediately shut down all system components. Only use in emergency situations.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Textarea placeholder="Reason for emergency shutdown..." />
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Confirm Shutdown</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Emergency Backup
            </Button>

            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Restore System
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
