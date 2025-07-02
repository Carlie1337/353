"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
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
import { Switch } from "@/components/ui/switch"
import {
  Users,
  UserPlus,
  Shield,
  Heart,
  Radio,
  Siren,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  UserCheck,
  UserX,
  Building2,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface User {
  id: string
  name: string
  email: string
  badgeNumber?: string
  position: string
  department: string
  systems: string[]
  status: "active" | "inactive" | "suspended"
  lastLogin: string
  createdAt: string
  permissions: string[]
  systemRoles?: Record<string, string>
  accessLevels?: Record<string, string>
  specificAccess?: {
    canViewReports?: boolean
    canApproveDocuments?: boolean
    canManageUsers?: boolean
    canAccessFinancials?: boolean
    canDeclareEmergency?: boolean
    canSchedulePatrols?: boolean
  }
}

const systemRoles = {
  bms: {
    name: "BMS",
    icon: Building2,
    color: "bg-blue-500",
    roles: ["Administrator", "Document Clerk", "Verification Officer", "Staff"],
  },
  net: {
    name: "NET",
    icon: Radio,
    color: "bg-green-500",
    roles: ["NET Commander", "NET Officer", "Patrol Leader", "Team Member"],
  },
  resqnet: {
    name: "ResQNet",
    icon: Siren,
    color: "bg-red-500",
    roles: ["Emergency Coordinator", "Response Team Leader", "First Responder", "Dispatcher"],
  },
  health: {
    name: "Health Portal",
    icon: Heart,
    color: "bg-pink-500",
    roles: ["Health Administrator", "Doctor", "Nurse", "Health Worker", "Midwife"],
  },
  tanod: {
    name: "Tanod",
    icon: Shield,
    color: "bg-yellow-500",
    roles: ["Tanod Captain", "Senior Tanod", "Tanod Officer", "Patrol Officer"],
  },
}

const systemPermissions = {
  bms: [
    { id: "bms.documents.view", name: "View Documents", description: "Allows viewing of documents", level: "read" },
    {
      id: "bms.documents.create",
      name: "Create Documents",
      description: "Allows creation of documents",
      level: "write",
    },
    {
      id: "bms.residents.view",
      name: "View Residents",
      description: "Allows viewing of resident information",
      level: "read",
    },
    { id: "bms.admin", name: "Admin Access", description: "Full administrative control over BMS", level: "admin" },
  ],
  net: [
    { id: "net.all", name: "Full NET Access", description: "Full access to all NET features", level: "admin" },
    {
      id: "net.patrol",
      name: "Patrol Management",
      description: "Manage patrol routes and assignments",
      level: "write",
    },
  ],
  resqnet: [
    {
      id: "resqnet.all",
      name: "Full ResQNet Access",
      description: "Full access to all ResQNet features",
      level: "admin",
    },
    {
      id: "resqnet.coordinate",
      name: "Coordinate Response Teams",
      description: "Coordinate emergency response teams",
      level: "write",
    },
  ],
  health: [
    {
      id: "health.all",
      name: "Full Health Portal Access",
      description: "Full access to all Health Portal features",
      level: "admin",
    },
    {
      id: "health.records.view",
      name: "View Health Records",
      description: "Allows viewing of patient health records",
      level: "read",
    },
  ],
  tanod: [
    {
      id: "tanod.all",
      name: "Full Tanod System Access",
      description: "Full access to all Tanod system features",
      level: "admin",
    },
    { id: "tanod.patrol", name: "Manage Patrols", description: "Allows management of Tanod patrols", level: "write" },
  ],
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Juan Dela Cruz",
      email: "juan.delacruz@barangay.gov.ph",
      badgeNumber: "BMS-001",
      position: "Barangay Captain",
      department: "Administration",
      systems: ["bms", "net", "resqnet", "health", "tanod"],
      status: "active",
      lastLogin: "2024-01-15 09:30 AM",
      createdAt: "2024-01-01",
      permissions: ["all"],
      systemRoles: {
        bms: "Administrator",
        net: "NET Commander",
        resqnet: "Emergency Coordinator",
        health: "Health Administrator",
        tanod: "Tanod Captain",
      },
      accessLevels: {
        bms: "admin",
        net: "admin",
        resqnet: "admin",
        health: "admin",
        tanod: "admin",
      },
      specificAccess: {
        canViewReports: true,
        canApproveDocuments: true,
        canManageUsers: true,
        canAccessFinancials: true,
        canDeclareEmergency: true,
        canSchedulePatrols: true,
      },
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria.santos@barangay.gov.ph",
      badgeNumber: "DOC-001",
      position: "Document Clerk",
      department: "Administration",
      systems: ["bms"],
      status: "active",
      lastLogin: "2024-01-15 08:45 AM",
      createdAt: "2024-01-02",
      permissions: ["bms.documents.view", "bms.documents.approve", "bms.residents.view"],
      systemRoles: {
        bms: "Document Clerk",
      },
      accessLevels: {
        bms: "standard",
      },
      specificAccess: {
        canViewReports: false,
        canApproveDocuments: true,
        canManageUsers: false,
        canAccessFinancials: false,
      },
    },
    {
      id: "3",
      name: "Pedro Rodriguez",
      email: "pedro.rodriguez@barangay.gov.ph",
      badgeNumber: "NET-001",
      position: "NET Commander",
      department: "Security",
      systems: ["net", "resqnet"],
      status: "active",
      lastLogin: "2024-01-15 07:00 AM",
      createdAt: "2024-01-03",
      permissions: ["net.all", "resqnet.coordinate"],
      systemRoles: {
        net: "NET Commander",
        resqnet: "Emergency Coordinator",
      },
      accessLevels: {
        net: "admin",
        resqnet: "advanced",
      },
    },
    {
      id: "4",
      name: "Dr. Ana Garcia",
      email: "ana.garcia@barangay.gov.ph",
      badgeNumber: "HEALTH-001",
      position: "Barangay Health Officer",
      department: "Health",
      systems: ["health"],
      status: "active",
      lastLogin: "2024-01-14 06:30 PM",
      createdAt: "2024-01-04",
      permissions: ["health.all"],
      systemRoles: {
        health: "Health Administrator",
      },
      accessLevels: {
        health: "admin",
      },
    },
    {
      id: "5",
      name: "Roberto Tanod",
      email: "roberto.tanod@barangay.gov.ph",
      badgeNumber: "TANOD-001",
      position: "Tanod Captain",
      department: "Security",
      systems: ["tanod", "net"],
      status: "active",
      lastLogin: "2024-01-15 06:00 AM",
      createdAt: "2024-01-05",
      permissions: ["tanod.all", "net.patrol"],
      systemRoles: {
        tanod: "Tanod Captain",
        net: "NET Officer",
      },
      accessLevels: {
        tanod: "admin",
        net: "standard",
      },
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterSystem, setFilterSystem] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    badgeNumber: "",
    position: "",
    department: "",
    systems: [] as string[],
    permissions: [] as string[],
    systemRoles: {} as Record<string, string>,
    accessLevels: {} as Record<string, string>,
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.badgeNumber?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSystem = filterSystem === "all" || user.systems.includes(filterSystem)
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesSystem && matchesStatus
  })

  const handleCreateUser = () => {
    const user: User = {
      id: Date.now().toString(),
      ...newUser,
      status: "active",
      lastLogin: "Never",
      createdAt: new Date().toISOString().split("T")[0],
    }
    setUsers([...users, user])
    setNewUser({
      name: "",
      email: "",
      badgeNumber: "",
      position: "",
      department: "",
      systems: [],
      permissions: [],
      systemRoles: {},
      accessLevels: {},
    })
    setIsCreateDialogOpen(false)
  }

  const toggleUserStatus = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  const deleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const getSystemBadge = (systemKey: string) => {
    const system = systemRoles[systemKey as keyof typeof systemRoles]
    if (!system) return null

    return (
      <Badge key={systemKey} variant="outline" className="text-xs">
        <system.icon className="w-3 h-3 mr-1" />
        {system.name}
      </Badge>
    )
  }

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      change: "+3 this month",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.status === "active").length.toString(),
      change: "98% uptime",
      icon: UserCheck,
      color: "text-green-600",
    },
    {
      title: "System Access",
      value: Object.keys(systemRoles).length.toString(),
      change: "5 systems",
      icon: Shield,
      color: "text-purple-600",
    },
    {
      title: "Pending Approvals",
      value: "2",
      change: "2 new requests",
      icon: UserX,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Access Control</h1>
          <p className="text-gray-600">Manage user accounts across all barangay systems</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New User Account</DialogTitle>
              <DialogDescription>Create a new user account with access to selected systems</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="user@barangay.gov.ph"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="badgeNumber">Badge/ID Number</Label>
                  <Input
                    id="badgeNumber"
                    value={newUser.badgeNumber}
                    onChange={(e) => setNewUser({ ...newUser, badgeNumber: e.target.value })}
                    placeholder="e.g., BMS-001"
                  />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={newUser.position}
                    onChange={(e) => setNewUser({ ...newUser, position: e.target.value })}
                    placeholder="Job title/position"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="department">Department</Label>
                <Select onValueChange={(value) => setNewUser({ ...newUser, department: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="administration">Administration</SelectItem>
                    <SelectItem value="health">Health Services</SelectItem>
                    <SelectItem value="security">Security & Safety</SelectItem>
                    <SelectItem value="social">Social Services</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>System Access & Permissions</Label>
                <div className="space-y-4 mt-2">
                  {Object.entries(systemRoles).map(([key, system]) => {
                    const isSystemEnabled = newUser.systems.includes(key)
                    return (
                      <div key={key} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-md ${system.color} text-white`}>
                              <system.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="font-medium">{system.name}</p>
                              <p className="text-sm text-gray-500">Enable access to this system</p>
                            </div>
                          </div>
                          <Switch
                            checked={isSystemEnabled}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setNewUser({
                                  ...newUser,
                                  systems: [...newUser.systems, key],
                                })
                              } else {
                                setNewUser({
                                  ...newUser,
                                  systems: newUser.systems.filter((s) => s !== key),
                                  permissions: newUser.permissions.filter((p) => !p.startsWith(key)),
                                })
                              }
                            }}
                          />
                        </div>

                        {isSystemEnabled && (
                          <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                            <div>
                              <Label className="text-sm font-medium">Select Role</Label>
                              <Select
                                value={newUser.systemRoles?.[key] || ""}
                                onValueChange={(value) => {
                                  const role = systemRoles[key].roles.find((r) => r === value)
                                  if (role) {
                                    setNewUser({
                                      ...newUser,
                                      systemRoles: { ...newUser.systemRoles, [key]: value },
                                      permissions: [
                                        ...newUser.permissions.filter((p) => !p.startsWith(key)),
                                        //...role.permissions // Assuming roles have permissions
                                      ],
                                    })
                                  }
                                }}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {system.roles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                      {role}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Custom Permissions</Label>
                              <div className="grid grid-cols-1 gap-2 mt-2">
                                {systemPermissions[key]?.map((permission) => (
                                  <div
                                    key={permission.id}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium">{permission.name}</p>
                                        <Badge
                                          variant={
                                            permission.level === "admin"
                                              ? "destructive"
                                              : permission.level === "write"
                                                ? "default"
                                                : "secondary"
                                          }
                                          className="text-xs"
                                        >
                                          {permission.level}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-gray-600">{permission.description}</p>
                                    </div>
                                    <Switch
                                      checked={newUser.permissions.includes(permission.id)}
                                      onCheckedChange={(checked) => {
                                        if (checked) {
                                          setNewUser({
                                            ...newUser,
                                            permissions: [...newUser.permissions, permission.id],
                                          })
                                        } else {
                                          setNewUser({
                                            ...newUser,
                                            permissions: newUser.permissions.filter((p) => p !== permission.id),
                                          })
                                        }
                                      }}
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Access Level</Label>
                              <Select
                                value={newUser.accessLevels?.[key] || "basic"}
                                onValueChange={(value) => {
                                  setNewUser({
                                    ...newUser,
                                    accessLevels: { ...newUser.accessLevels, [key]: value },
                                  })
                                }}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="basic">Basic Access - View only</SelectItem>
                                  <SelectItem value="standard">Standard Access - View and create</SelectItem>
                                  <SelectItem value="advanced">Advanced Access - Full operations</SelectItem>
                                  <SelectItem value="admin">Administrator - Full control</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateUser}>Create User</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.change}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage user accounts and system access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterSystem} onValueChange={setFilterSystem}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by system" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Systems</SelectItem>
                {Object.entries(systemRoles).map(([key, system]) => (
                  <SelectItem key={key} value={key}>
                    {system.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Systems</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        {user.badgeNumber && <p className="text-xs text-gray-400">{user.badgeNumber}</p>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{user.position}</p>
                        <p className="text-sm text-gray-500">{user.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {user.systems.map((system) => {
                          const systemInfo = systemRoles[system as keyof typeof systemRoles]
                          const userRole = user.systemRoles?.[system]
                          const accessLevel = user.accessLevels?.[system]

                          return (
                            <div key={system} className="flex items-center gap-2">
                              {getSystemBadge(system)}
                              {userRole && (
                                <Badge variant="outline" className="text-xs">
                                  {userRole}
                                </Badge>
                              )}
                              {accessLevel && (
                                <Badge variant="secondary" className="text-xs">
                                  {accessLevel}
                                </Badge>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          user.status === "active"
                            ? "default"
                            : user.status === "inactive"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">{user.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                            {user.status === "active" ? (
                              <>
                                <UserX className="w-4 h-4 mr-2" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Activate
                              </>
                            )}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600" onClick={() => deleteUser(user.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
