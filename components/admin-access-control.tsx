"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Heart, Radio, Siren, Building2, Eye, Crown, Lock, Unlock, Plus, Edit } from "lucide-react"
import { useAuditLog } from "@/lib/audit-service"

interface SystemAccess {
  id: string
  name: string
  description: string
  icon: any
  color: string
  enabled: boolean
  accessLevel: "view" | "basic" | "standard" | "advanced" | "admin" | "supreme"
  modules: {
    id: string
    name: string
    enabled: boolean
    permissions: string[]
  }[]
  specialPermissions: {
    id: string
    name: string
    description: string
    enabled: boolean
    level: "standard" | "advanced" | "critical"
  }[]
}

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  department: string
  systemAccess: SystemAccess[]
  status: "active" | "inactive" | "suspended"
  lastLogin: string
  createdAt: string
  supremeAccess: boolean
  auditAccess: boolean
}

export function AdminAccessControl() {
  const { logAction } = useAuditLog()
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: "1",
      name: "Juan Dela Cruz",
      email: "juan.delacruz@barangay.gov.ph",
      role: "Barangay Captain",
      department: "Administration",
      status: "active",
      lastLogin: "2024-01-15 09:30 AM",
      createdAt: "2024-01-01",
      supremeAccess: true,
      auditAccess: true,
      systemAccess: [
        {
          id: "admin",
          name: "Admin Portal",
          description: "Complete administrative control",
          icon: Crown,
          color: "bg-purple-500",
          enabled: true,
          accessLevel: "supreme",
          modules: [
            { id: "users", name: "User Management", enabled: true, permissions: ["view", "create", "edit", "delete"] },
            { id: "system", name: "System Settings", enabled: true, permissions: ["view", "edit", "configure"] },
            { id: "audit", name: "Audit Trail", enabled: true, permissions: ["view", "export", "analyze"] },
          ],
          specialPermissions: [
            {
              id: "supreme_override",
              name: "Supreme Override",
              description: "Override any system restriction",
              enabled: true,
              level: "critical",
            },
            {
              id: "system_shutdown",
              name: "System Shutdown",
              description: "Emergency system shutdown",
              enabled: true,
              level: "critical",
            },
            {
              id: "data_export",
              name: "Data Export",
              description: "Export all system data",
              enabled: true,
              level: "advanced",
            },
          ],
        },
        {
          id: "bms",
          name: "BMS Portal",
          description: "Barangay Management System",
          icon: Building2,
          color: "bg-blue-500",
          enabled: true,
          accessLevel: "supreme",
          modules: [
            {
              id: "documents",
              name: "Document Processing",
              enabled: true,
              permissions: ["view", "create", "edit", "approve", "delete"],
            },
            {
              id: "residents",
              name: "Resident Management",
              enabled: true,
              permissions: ["view", "create", "edit", "delete"],
            },
            {
              id: "blotter",
              name: "Blotter Records",
              enabled: true,
              permissions: ["view", "create", "edit", "delete"],
            },
          ],
          specialPermissions: [
            {
              id: "bulk_approve",
              name: "Bulk Approve Documents",
              description: "Approve multiple documents at once",
              enabled: true,
              level: "advanced",
            },
            {
              id: "data_migration",
              name: "Data Migration",
              description: "Import/export resident data",
              enabled: true,
              level: "critical",
            },
          ],
        },
      ],
    },
  ])

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const systemTemplates: SystemAccess[] = [
    {
      id: "admin",
      name: "Admin Portal",
      description: "Complete administrative control over all systems",
      icon: Crown,
      color: "bg-purple-500",
      enabled: false,
      accessLevel: "admin",
      modules: [
        { id: "users", name: "User Management", enabled: false, permissions: [] },
        { id: "system", name: "System Settings", enabled: false, permissions: [] },
        { id: "audit", name: "Audit Trail", enabled: false, permissions: [] },
        { id: "reports", name: "System Reports", enabled: false, permissions: [] },
        { id: "backup", name: "Backup & Recovery", enabled: false, permissions: [] },
      ],
      specialPermissions: [
        {
          id: "supreme_override",
          name: "Supreme Override",
          description: "Override any system restriction",
          enabled: false,
          level: "critical",
        },
        {
          id: "system_shutdown",
          name: "System Shutdown",
          description: "Emergency system shutdown",
          enabled: false,
          level: "critical",
        },
        {
          id: "data_export",
          name: "Data Export",
          description: "Export all system data",
          enabled: false,
          level: "advanced",
        },
        {
          id: "user_impersonate",
          name: "User Impersonation",
          description: "Login as any user for support",
          enabled: false,
          level: "critical",
        },
      ],
    },
    {
      id: "bms",
      name: "BMS Portal",
      description: "Barangay Management System",
      icon: Building2,
      color: "bg-blue-500",
      enabled: false,
      accessLevel: "admin",
      modules: [
        { id: "documents", name: "Document Processing", enabled: false, permissions: [] },
        { id: "residents", name: "Resident Management", enabled: false, permissions: [] },
        { id: "blotter", name: "Blotter Records", enabled: false, permissions: [] },
        { id: "reports", name: "Reports & Analytics", enabled: false, permissions: [] },
        { id: "users", name: "User Management", enabled: false, permissions: [] },
      ],
      specialPermissions: [
        {
          id: "bulk_approve",
          name: "Bulk Approve Documents",
          description: "Approve multiple documents at once",
          enabled: false,
          level: "advanced",
        },
        {
          id: "data_migration",
          name: "Data Migration",
          description: "Import/export resident data",
          enabled: false,
          level: "critical",
        },
        {
          id: "system_config",
          name: "System Configuration",
          description: "Configure BMS settings",
          enabled: false,
          level: "advanced",
        },
      ],
    },
    {
      id: "net",
      name: "NET System",
      description: "Neighborhood Emergency Team",
      icon: Radio,
      color: "bg-green-500",
      enabled: false,
      accessLevel: "admin",
      modules: [
        { id: "incidents", name: "Incident Management", enabled: false, permissions: [] },
        { id: "personnel", name: "Personnel Management", enabled: false, permissions: [] },
        { id: "patrols", name: "Patrol Management", enabled: false, permissions: [] },
        { id: "coordination", name: "Emergency Coordination", enabled: false, permissions: [] },
      ],
      specialPermissions: [
        {
          id: "emergency_declare",
          name: "Declare Emergency",
          description: "Declare emergency situations",
          enabled: false,
          level: "critical",
        },
        {
          id: "resource_allocation",
          name: "Resource Allocation",
          description: "Allocate emergency resources",
          enabled: false,
          level: "advanced",
        },
      ],
    },
    {
      id: "resqnet",
      name: "ResQNet",
      description: "Emergency Response Network",
      icon: Siren,
      color: "bg-red-500",
      enabled: false,
      accessLevel: "admin",
      modules: [
        { id: "emergency", name: "Emergency Management", enabled: false, permissions: [] },
        { id: "resources", name: "Resource Management", enabled: false, permissions: [] },
        { id: "evacuation", name: "Evacuation Management", enabled: false, permissions: [] },
        { id: "communication", name: "Communication Hub", enabled: false, permissions: [] },
      ],
      specialPermissions: [
        {
          id: "mass_alert",
          name: "Mass Alert System",
          description: "Send alerts to all residents",
          enabled: false,
          level: "critical",
        },
        {
          id: "evacuation_order",
          name: "Evacuation Order",
          description: "Issue evacuation orders",
          enabled: false,
          level: "critical",
        },
      ],
    },
    {
      id: "health",
      name: "Health Portal",
      description: "Health Management System",
      icon: Heart,
      color: "bg-pink-500",
      enabled: false,
      accessLevel: "admin",
      modules: [
        { id: "patients", name: "Patient Management", enabled: false, permissions: [] },
        { id: "appointments", name: "Appointment System", enabled: false, permissions: [] },
        { id: "medical", name: "Medical Records", enabled: false, permissions: [] },
        { id: "programs", name: "Health Programs", enabled: false, permissions: [] },
      ],
      specialPermissions: [
        {
          id: "medical_override",
          name: "Medical Override",
          description: "Override medical restrictions",
          enabled: false,
          level: "critical",
        },
        {
          id: "health_alert",
          name: "Health Alert",
          description: "Issue health alerts",
          enabled: false,
          level: "advanced",
        },
      ],
    },
    {
      id: "tanod",
      name: "Tanod Portal",
      description: "Barangay Tanod System",
      icon: Shield,
      color: "bg-yellow-500",
      enabled: false,
      accessLevel: "admin",
      modules: [
        { id: "patrol", name: "Patrol Management", enabled: false, permissions: [] },
        { id: "verification", name: "ID Verification", enabled: false, permissions: [] },
        { id: "incidents", name: "Incident Reports", enabled: false, permissions: [] },
        { id: "scanner", name: "QR Scanner", enabled: false, permissions: [] },
      ],
      specialPermissions: [
        {
          id: "patrol_override",
          name: "Patrol Override",
          description: "Override patrol assignments",
          enabled: false,
          level: "advanced",
        },
        {
          id: "emergency_response",
          name: "Emergency Response",
          description: "Coordinate emergency response",
          enabled: false,
          level: "critical",
        },
      ],
    },
  ]

  const handleCreateUser = async () => {
    const newUser: AdminUser = {
      id: Date.now().toString(),
      name: "",
      email: "",
      role: "Administrator",
      department: "Administration",
      status: "active",
      lastLogin: "Never",
      createdAt: new Date().toISOString().split("T")[0],
      supremeAccess: false,
      auditAccess: false,
      systemAccess: [],
    }

    setUsers([...users, newUser])
    setSelectedUser(newUser)
    setIsCreateDialogOpen(false)

    await logAction("CREATE_ADMIN_USER", "admin_users", `Created new admin user: ${newUser.name}`, "medium", newUser.id)
  }

  const handleUpdateUserAccess = async (userId: string, systemAccess: SystemAccess[]) => {
    const oldUser = users.find((u) => u.id === userId)
    setUsers(users.map((user) => (user.id === userId ? { ...user, systemAccess } : user)))

    await logAction(
      "UPDATE_USER_ACCESS",
      "admin_users",
      `Updated system access for user: ${oldUser?.name}`,
      "high",
      userId,
      oldUser?.systemAccess,
      systemAccess,
    )
  }

  const handleToggleSupremeAccess = async (userId: string, enabled: boolean) => {
    const user = users.find((u) => u.id === userId)
    setUsers(users.map((u) => (u.id === userId ? { ...u, supremeAccess: enabled } : u)))

    await logAction(
      enabled ? "GRANT_SUPREME_ACCESS" : "REVOKE_SUPREME_ACCESS",
      "admin_users",
      `${enabled ? "Granted" : "Revoked"} supreme access for user: ${user?.name}`,
      "critical",
      userId,
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Admin Access Control</h2>
          <p className="text-muted-foreground">Manage supreme administrative access across all systems</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Admin User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Admin User</DialogTitle>
              <DialogDescription>Create a new administrative user with system access</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Button onClick={handleCreateUser}>Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Admin Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Administrative Users</CardTitle>
          <CardDescription>Users with administrative access to system functions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Access Level</TableHead>
                <TableHead>Systems</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.role}</p>
                      <p className="text-sm text-muted-foreground">{user.department}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {user.supremeAccess && (
                        <Badge variant="destructive" className="text-xs">
                          <Crown className="w-3 h-3 mr-1" />
                          Supreme
                        </Badge>
                      )}
                      {user.auditAccess && (
                        <Badge variant="default" className="text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Audit
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.systemAccess.slice(0, 3).map((system) => (
                        <Badge key={system.id} variant="outline" className="text-xs">
                          <system.icon className="w-3 h-3 mr-1" />
                          {system.name}
                        </Badge>
                      ))}
                      {user.systemAccess.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{user.systemAccess.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedUser(user)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={user.supremeAccess ? "destructive" : "default"}
                        size="sm"
                        onClick={() => handleToggleSupremeAccess(user.id, !user.supremeAccess)}
                      >
                        {user.supremeAccess ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* User Access Configuration Dialog */}
      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Configure Access - {selectedUser.name}</DialogTitle>
              <DialogDescription>Configure detailed system access and permissions</DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Supreme Access Toggle */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-purple-600" />
                    Supreme Access
                  </CardTitle>
                  <CardDescription>Grant supreme access to override any system restriction</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Enable Supreme Access</Label>
                      <p className="text-sm text-muted-foreground">
                        This grants unrestricted access to all systems and the ability to override any permission
                      </p>
                    </div>
                    <Switch
                      checked={selectedUser.supremeAccess}
                      onCheckedChange={(checked) => setSelectedUser({ ...selectedUser, supremeAccess: checked })}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* System Access Configuration */}
              <div className="space-y-4">
                {systemTemplates.map((systemTemplate) => {
                  const userSystem = selectedUser.systemAccess.find((s) => s.id === systemTemplate.id) || {
                    ...systemTemplate,
                    enabled: false,
                  }

                  return (
                    <Card key={systemTemplate.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-md ${systemTemplate.color} text-white`}>
                              <systemTemplate.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{systemTemplate.name}</CardTitle>
                              <CardDescription>{systemTemplate.description}</CardDescription>
                            </div>
                          </div>
                          <Switch
                            checked={userSystem.enabled}
                            onCheckedChange={(checked) => {
                              const updatedAccess = checked
                                ? [
                                    ...selectedUser.systemAccess.filter((s) => s.id !== systemTemplate.id),
                                    { ...systemTemplate, enabled: true },
                                  ]
                                : selectedUser.systemAccess.filter((s) => s.id !== systemTemplate.id)
                              setSelectedUser({ ...selectedUser, systemAccess: updatedAccess })
                            }}
                          />
                        </div>
                      </CardHeader>

                      {userSystem.enabled && (
                        <CardContent className="space-y-4">
                          {/* Access Level */}
                          <div>
                            <Label className="text-sm font-medium">Access Level</Label>
                            <Select
                              value={userSystem.accessLevel}
                              onValueChange={(value) => {
                                const updatedAccess = selectedUser.systemAccess.map((s) =>
                                  s.id === systemTemplate.id ? { ...s, accessLevel: value as any } : s,
                                )
                                setSelectedUser({ ...selectedUser, systemAccess: updatedAccess })
                              }}
                            >
                              <SelectTrigger className="w-full mt-1">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="view">View Only</SelectItem>
                                <SelectItem value="basic">Basic Access</SelectItem>
                                <SelectItem value="standard">Standard Access</SelectItem>
                                <SelectItem value="advanced">Advanced Access</SelectItem>
                                <SelectItem value="admin">Administrator</SelectItem>
                                <SelectItem value="supreme">Supreme Access</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <Separator />

                          {/* Module Access */}
                          <div>
                            <Label className="text-sm font-medium">Module Access</Label>
                            <div className="grid grid-cols-2 gap-3 mt-2">
                              {systemTemplate.modules.map((module) => (
                                <div
                                  key={module.id}
                                  className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                  <span className="text-sm font-medium">{module.name}</span>
                                  <Switch defaultChecked />
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Special Permissions */}
                          <div>
                            <Label className="text-sm font-medium">Special Permissions</Label>
                            <div className="space-y-2 mt-2">
                              {systemTemplate.specialPermissions.map((permission) => (
                                <div
                                  key={permission.id}
                                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                >
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">{permission.name}</span>
                                      <Badge
                                        variant={
                                          permission.level === "critical"
                                            ? "destructive"
                                            : permission.level === "advanced"
                                              ? "default"
                                              : "secondary"
                                        }
                                        className="text-xs"
                                      >
                                        {permission.level}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                                  </div>
                                  <Switch defaultChecked={permission.enabled} />
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  handleUpdateUserAccess(selectedUser.id, selectedUser.systemAccess)
                  setSelectedUser(null)
                }}
              >
                Save Configuration
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
