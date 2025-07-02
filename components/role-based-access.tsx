"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: Permission[]
  department?: string
}

interface UserRole {
  id: string
  name: string
  level: number
  description: string
}

interface Permission {
  id: string
  name: string
  resource: string
  action: string
}

const roles: UserRole[] = [
  { id: "superadmin", name: "Super Administrator", level: 100, description: "Full system access" },
  { id: "admin", name: "Administrator", level: 90, description: "Administrative access" },
  { id: "health_admin", name: "Health Administrator", level: 80, description: "Health system management" },
  { id: "net_commander", name: "NET Commander", level: 80, description: "Security operations management" },
  { id: "resq_coordinator", name: "ResQ Coordinator", level: 80, description: "Emergency response coordination" },
  { id: "health_worker", name: "Health Worker", level: 60, description: "Health services and records" },
  { id: "net_officer", name: "NET Officer", level: 60, description: "Security patrol and incidents" },
  { id: "document_clerk", name: "Document Clerk", level: 50, description: "Document processing" },
  { id: "social_worker", name: "Social Worker", level: 50, description: "Community services" },
  { id: "staff", name: "Staff", level: 30, description: "Basic system access" },
  { id: "resident", name: "Resident", level: 10, description: "Resident portal access" },
]

const permissions: Permission[] = [
  // Admin permissions
  { id: "admin.residents.view", name: "View Residents", resource: "residents", action: "view" },
  { id: "admin.residents.create", name: "Create Residents", resource: "residents", action: "create" },
  { id: "admin.residents.edit", name: "Edit Residents", resource: "residents", action: "edit" },
  { id: "admin.residents.delete", name: "Delete Residents", resource: "residents", action: "delete" },

  // Document permissions
  { id: "admin.documents.view", name: "View Documents", resource: "documents", action: "view" },
  { id: "admin.documents.approve", name: "Approve Documents", resource: "documents", action: "approve" },
  { id: "admin.documents.reject", name: "Reject Documents", resource: "documents", action: "reject" },

  // Health permissions
  { id: "health.records.view", name: "View Medical Records", resource: "medical_records", action: "view" },
  { id: "health.records.create", name: "Create Medical Records", resource: "medical_records", action: "create" },
  { id: "health.records.edit", name: "Edit Medical Records", resource: "medical_records", action: "edit" },
  { id: "health.appointments.manage", name: "Manage Appointments", resource: "appointments", action: "manage" },

  // NET permissions
  { id: "net.incidents.view", name: "View Incidents", resource: "incidents", action: "view" },
  { id: "net.incidents.create", name: "Create Incidents", resource: "incidents", action: "create" },
  { id: "net.blotter.manage", name: "Manage Blotter", resource: "blotter", action: "manage" },
  { id: "net.patrols.schedule", name: "Schedule Patrols", resource: "patrols", action: "schedule" },

  // ResQ permissions
  { id: "resq.emergency.declare", name: "Declare Emergency", resource: "emergency", action: "declare" },
  { id: "resq.resources.deploy", name: "Deploy Resources", resource: "resources", action: "deploy" },
  { id: "resq.evacuation.manage", name: "Manage Evacuation", resource: "evacuation", action: "manage" },
]

const rolePermissions: Record<string, string[]> = {
  superadmin: permissions.map((p) => p.id),
  admin: [
    "admin.residents.view",
    "admin.residents.create",
    "admin.residents.edit",
    "admin.documents.view",
    "admin.documents.approve",
    "admin.documents.reject",
  ],
  health_admin: [
    "health.records.view",
    "health.records.create",
    "health.records.edit",
    "health.appointments.manage",
    "admin.residents.view",
  ],
  net_commander: [
    "net.incidents.view",
    "net.incidents.create",
    "net.blotter.manage",
    "net.patrols.schedule",
    "admin.residents.view",
  ],
  resq_coordinator: [
    "resq.emergency.declare",
    "resq.resources.deploy",
    "resq.evacuation.manage",
    "net.incidents.view",
    "admin.residents.view",
  ],
  health_worker: ["health.records.view", "health.records.create", "health.appointments.manage"],
  net_officer: ["net.incidents.view", "net.incidents.create", "net.blotter.manage"],
  document_clerk: ["admin.documents.view", "admin.documents.approve", "admin.residents.view"],
  social_worker: ["admin.residents.view", "admin.documents.view"],
  staff: ["admin.residents.view"],
  resident: [],
}

interface RoleContextType {
  user: User | null
  hasPermission: (permission: string) => boolean
  hasRole: (role: string) => boolean
  canAccess: (resource: string, action: string) => boolean
}

const RoleContext = createContext<RoleContextType | undefined>(undefined)

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Simulate getting user from auth context
    const mockUser: User = {
      id: "1",
      name: "Administrator",
      email: "admin@barangay.gov.ph",
      role: roles.find((r) => r.id === "admin")!,
      permissions: permissions.filter((p) => rolePermissions.admin.includes(p.id)),
      department: "Administration",
    }
    setUser(mockUser)
  }, [])

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.some((p) => p.id === permission)
  }

  const hasRole = (role: string): boolean => {
    if (!user) return false
    return user.role.id === role
  }

  const canAccess = (resource: string, action: string): boolean => {
    if (!user) return false
    return user.permissions.some((p) => p.resource === resource && p.action === action)
  }

  return <RoleContext.Provider value={{ user, hasPermission, hasRole, canAccess }}>{children}</RoleContext.Provider>
}

export function useRole() {
  const context = useContext(RoleContext)
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider")
  }
  return context
}

interface ProtectedComponentProps {
  permission?: string
  role?: string
  resource?: string
  action?: string
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function ProtectedComponent({
  permission,
  role,
  resource,
  action,
  fallback,
  children,
}: ProtectedComponentProps) {
  const { hasPermission, hasRole, canAccess } = useRole()

  let hasAccess = true

  if (permission) {
    hasAccess = hasPermission(permission)
  } else if (role) {
    hasAccess = hasRole(role)
  } else if (resource && action) {
    hasAccess = canAccess(resource, action)
  }

  if (!hasAccess) {
    return (
      fallback || (
        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription>You don't have permission to access this feature.</AlertDescription>
        </Alert>
      )
    )
  }

  return <>{children}</>
}

export function UserRoleBadge() {
  const { user } = useRole()

  if (!user) return null

  return (
    <Badge variant="outline" className="flex items-center gap-1">
      <Shield className="h-3 w-3" />
      {user.role.name}
    </Badge>
  )
}
