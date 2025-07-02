"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Download, Eye, User, FileText, Shield, AlertTriangle, Clock } from "lucide-react"

interface AuditLog {
  id: string
  timestamp: Date
  userId: string
  userName: string
  userRole: string
  action: string
  resource: string
  resourceId?: string
  details: string
  ipAddress: string
  userAgent: string
  module: "admin" | "health" | "net" | "resqnet" | "portal"
  severity: "low" | "medium" | "high" | "critical"
  success: boolean
}

export function AuditTrail() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterModule, setFilterModule] = useState("all")
  const [filterSeverity, setFilterSeverity] = useState("all")
  const [dateRange, setDateRange] = useState("today")

  useEffect(() => {
    // Simulate audit logs
    const mockLogs: AuditLog[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        userId: "admin1",
        userName: "Maria Santos",
        userRole: "Administrator",
        action: "APPROVE_DOCUMENT",
        resource: "documents",
        resourceId: "DOC-2024-001",
        details: "Approved Barangay Clearance for Juan Dela Cruz",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        module: "admin",
        severity: "medium",
        success: true,
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        userId: "health1",
        userName: "Dr. Ana Garcia",
        userRole: "Health Worker",
        action: "CREATE_MEDICAL_RECORD",
        resource: "medical_records",
        resourceId: "MR-2024-001",
        details: "Created medical record for patient consultation",
        ipAddress: "192.168.1.101",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        module: "health",
        severity: "low",
        success: true,
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        userId: "net1",
        userName: "Officer Pedro Lopez",
        userRole: "NET Officer",
        action: "CREATE_INCIDENT",
        resource: "incidents",
        resourceId: "INC-2024-001",
        details: "Reported theft incident in Purok 1",
        ipAddress: "192.168.1.102",
        userAgent: "Mozilla/5.0 (Android 10; Mobile)",
        module: "net",
        severity: "high",
        success: true,
      },
      {
        id: "4",
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        userId: "admin1",
        userName: "Maria Santos",
        userRole: "Administrator",
        action: "LOGIN_FAILED",
        resource: "auth",
        details: "Failed login attempt - incorrect password",
        ipAddress: "192.168.1.100",
        userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        module: "admin",
        severity: "medium",
        success: false,
      },
      {
        id: "5",
        timestamp: new Date(Date.now() - 60 * 60 * 1000),
        userId: "resq1",
        userName: "Commander Jose Cruz",
        userRole: "ResQ Coordinator",
        action: "DECLARE_EMERGENCY",
        resource: "emergency",
        resourceId: "EMG-2024-001",
        details: "Declared flood emergency in Zone 2",
        ipAddress: "192.168.1.103",
        userAgent: "Mozilla/5.0 (iPad; CPU OS 14_0)",
        module: "resqnet",
        severity: "critical",
        success: true,
      },
    ]
    setLogs(mockLogs)
  }, [])

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesModule = filterModule === "all" || log.module === filterModule
    const matchesSeverity = filterSeverity === "all" || log.severity === filterSeverity

    return matchesSearch && matchesModule && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "destructive"
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getModuleIcon = (module: string) => {
    switch (module) {
      case "admin":
        return <User className="h-4 w-4" />
      case "health":
        return <FileText className="h-4 w-4" />
      case "net":
        return <Shield className="h-4 w-4" />
      case "resqnet":
        return <AlertTriangle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Audit Trail</h2>
          <p className="text-muted-foreground">System activity logs and security monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Live Monitor
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterModule} onValueChange={setFilterModule}>
              <SelectTrigger>
                <SelectValue placeholder="Module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modules</SelectItem>
                <SelectItem value="admin">Admin Portal</SelectItem>
                <SelectItem value="health">Health Portal</SelectItem>
                <SelectItem value="net">NET Portal</SelectItem>
                <SelectItem value="resqnet">ResQNet</SelectItem>
                <SelectItem value="portal">Resident Portal</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSeverity} onValueChange={setFilterSeverity}>
              <SelectTrigger>
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>
            Showing {filteredLogs.length} of {logs.length} log entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{formatTimestamp(log.timestamp)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {log.userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{log.userName}</p>
                        <p className="text-xs text-muted-foreground">{log.userRole}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">{log.action}</code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getModuleIcon(log.module)}
                      <span className="capitalize">{log.module}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs">
                      <p className="text-sm truncate">{log.details}</p>
                      {log.resourceId && <p className="text-xs text-muted-foreground">ID: {log.resourceId}</p>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(log.severity)}>{log.severity}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={log.success ? "default" : "destructive"}>
                      {log.success ? "Success" : "Failed"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

// Hook to log audit events
export function useAuditLog() {
  const logEvent = (
    action: string,
    resource: string,
    details: string,
    severity: "low" | "medium" | "high" | "critical" = "low",
    resourceId?: string,
  ) => {
    // In a real implementation, this would send to your audit service
    console.log("Audit Log:", {
      action,
      resource,
      details,
      severity,
      resourceId,
      timestamp: new Date(),
    })
  }

  return { logEvent }
}
