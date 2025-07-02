"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Shield, Heart, Radio, Siren, Building2, Users, Edit, Lock } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  system: string
  category: string
  level: "read" | "write" | "admin"
}

interface Role {
  id: string
  name: string
  description: string
  system: string
  permissions: string[]
  userCount: number
}

const systemPermissions: Record<string, Permission[]> = {
  bms: [
    {
      id: "bms.residents.view",
      name: "View Residents",
      description: "View resident information",
      system: "bms",
      category: "residents",
      level: "read",
    },
    {
      id: "bms.residents.create",
      name: "Create Residents",
      description: "Add new residents",
      system: "bms",
      category: "residents",
      level: "write",
    },
    {
      id: "bms.residents.edit",
      name: "Edit Residents",
      description: "Modify resident information",
      system: "bms",
      category: "residents",
      level: "write",
    },
    {
      id: "bms.residents.delete",
      name: "Delete Residents",
      description: "Remove residents",
      system: "bms",
      category: "residents",
      level: "admin",
    },
    {
      id: "bms.documents.view",
      name: "View Documents",
      description: "View document requests",
      system: "bms",
      category: "documents",
      level: "read",
    },
    {
      id: "bms.documents.approve",
      name: "Approve Documents",
      description: "Approve document requests",
      system: "bms",
      category: "documents",
      level: "write",
    },
    {
      id: "bms.blotter.view",
      name: "View Blotter",
      description: "View blotter records",
      system: "bms",
      category: "blotter",
      level: "read",
    },
    {
      id: "bms.blotter.create",
      name: "Create Blotter",
      description: "Create blotter entries",
      system: "bms",
      category: "blotter",
      level: "write",
    },
    {
      id: "bms.users.manage",
      name: "Manage Users",
      description: "Manage user accounts",
      system: "bms",
      category: "users",
      level: "admin",
    },
  ],
  net: [
    {
      id: "net.incidents.view",
      name: "View Incidents",
      description: "View security incidents",
      system: "net",
      category: "incidents",
      level: "read",
    },
    {
      id: "net.incidents.create",
      name: "Create Incidents",
      description: "Report new incidents",
      system: "net",
      category: "incidents",
      level: "write",
    },
    {
      id: "net.patrols.schedule",
      name: "Schedule Patrols",
      description: "Schedule patrol duties",
      system: "net",
      category: "patrols",
      level: "write",
    },
    {
      id: "net.personnel.manage",
      name: "Manage Personnel",
      description: "Manage NET personnel",
      system: "net",
      category: "personnel",
      level: "admin",
    },
  ],
  resqnet: [
    {
      id: "resqnet.emergency.declare",
      name: "Declare Emergency",
      description: "Declare emergency situations",
      system: "resqnet",
      category: "emergency",
      level: "admin",
    },
    {
      id: "resqnet.resources.deploy",
      name: "Deploy Resources",
      description: "Deploy emergency resources",
      system: "resqnet",
      category: "resources",
      level: "write",
    },
    {
      id: "resqnet.evacuation.manage",
      name: "Manage Evacuation",
      description: "Coordinate evacuations",
      system: "resqnet",
      category: "evacuation",
      level: "write",
    },
  ],
  health: [
    {
      id: "health.patients.view",
      name: "View Patients",
      description: "View patient records",
      system: "health",
      category: "patients",
      level: "read",
    },
    {
      id: "health.patients.create",
      name: "Register Patients",
      description: "Register new patients",
      system: "health",
      category: "patients",
      level: "write",
    },
    {
      id: "health.records.edit",
      name: "Edit Medical Records",
      description: "Modify medical records",
      system: "health",
      category: "records",
      level: "write",
    },
    {
      id: "health.appointments.manage",
      name: "Manage Appointments",
      description: "Schedule and manage appointments",
      system: "health",
      category: "appointments",
      level: "write",
    },
  ],
  tanod: [
    {
      id: "tanod.patrol.view",
      name: "View Patrols",
      description: "View patrol schedules",
      system: "tanod",
      category: "patrol",
      level: "read",
    },
    {
      id: "tanod.incidents.report",
      name: "Report Incidents",
      description: "Report security incidents",
      system: "tanod",
      category: "incidents",
      level: "write",
    },
    {
      id: "tanod.verification.perform",
      name: "Perform Verification",
      description: "Verify resident identity",
      system: "tanod",
      category: "verification",
      level: "write",
    },
  ],
}

const systemRoles: Record<string, Role[]> = {
  bms: [
    {
      id: "bms.admin",
      name: "BMS Administrator",
      description: "Full BMS access",
      system: "bms",
      permissions: [
        "bms.residents.view",
        "bms.residents.create",
        "bms.residents.edit",
        "bms.residents.delete",
        "bms.documents.view",
        "bms.documents.approve",
        "bms.blotter.view",
        "bms.blotter.create",
        "bms.users.manage",
      ],
      userCount: 2,
    },
    {
      id: "bms.clerk",
      name: "Document Clerk",
      description: "Document processing",
      system: "bms",
      permissions: ["bms.residents.view", "bms.documents.view", "bms.documents.approve"],
      userCount: 5,
    },
    {
      id: "bms.staff",
      name: "BMS Staff",
      description: "Basic BMS access",
      system: "bms",
      permissions: ["bms.residents.view", "bms.documents.view"],
      userCount: 8,
    },
  ],
  net: [
    {
      id: "net.commander",
      name: "NET Commander",
      description: "NET leadership",
      system: "net",
      permissions: ["net.incidents.view", "net.incidents.create", "net.patrols.schedule", "net.personnel.manage"],
      userCount: 1,
    },
    {
      id: "net.officer",
      name: "NET Officer",
      description: "Field operations",
      system: "net",
      permissions: ["net.incidents.view", "net.incidents.create"],
      userCount: 12,
    },
  ],
  resqnet: [
    {
      id: "resqnet.coordinator",
      name: "Emergency Coordinator",
      description: "Emergency response coordination",
      system: "resqnet",
      permissions: ["resqnet.emergency.declare", "resqnet.resources.deploy", "resqnet.evacuation.manage"],
      userCount: 2,
    },
    {
      id: "resqnet.responder",
      name: "First Responder",
      description: "Emergency response",
      system: "resqnet",
      permissions: ["resqnet.resources.deploy"],
      userCount: 15,
    },
  ],
  health: [
    {
      id: "health.admin",
      name: "Health Administrator",
      description: "Health system management",
      system: "health",
      permissions: [
        "health.patients.view",
        "health.patients.create",
        "health.records.edit",
        "health.appointments.manage",
      ],
      userCount: 1,
    },
    {
      id: "health.worker",
      name: "Health Worker",
      description: "Patient care",
      system: "health",
      permissions: ["health.patients.view", "health.patients.create", "health.appointments.manage"],
      userCount: 8,
    },
  ],
  tanod: [
    {
      id: "tanod.captain",
      name: "Tanod Captain",
      description: "Tanod leadership",
      system: "tanod",
      permissions: ["tanod.patrol.view", "tanod.incidents.report", "tanod.verification.perform"],
      userCount: 1,
    },
    {
      id: "tanod.officer",
      name: "Tanod Officer",
      description: "Security patrol",
      system: "tanod",
      permissions: ["tanod.patrol.view", "tanod.incidents.report"],
      userCount: 20,
    },
  ],
}

export default function PermissionsPage() {
  const [selectedSystem, setSelectedSystem] = useState("bms")

  const systemIcons = {
    bms: Building2,
    net: Radio,
    resqnet: Siren,
    health: Heart,
    tanod: Shield,
  }

  const systemColors = {
    bms: "text-blue-600",
    net: "text-green-600",
    resqnet: "text-red-600",
    health: "text-pink-600",
    tanod: "text-yellow-600",
  }

  const getLevelBadge = (level: string) => {
    const variants = {
      read: "secondary",
      write: "default",
      admin: "destructive",
    }
    return <Badge variant={variants[level as keyof typeof variants]}>{level}</Badge>
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Permissions & Roles</h1>
        <p className="text-gray-600">Manage system permissions and user roles</p>
      </div>

      <Tabs value={selectedSystem} onValueChange={setSelectedSystem}>
        <TabsList className="grid w-full grid-cols-5">
          {Object.entries(systemIcons).map(([key, Icon]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              {key.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.keys(systemIcons).map((system) => (
          <TabsContent key={system} value={system} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Permissions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    System Permissions
                  </CardTitle>
                  <CardDescription>Available permissions for {system.toUpperCase()} system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemPermissions[system]?.map((permission) => (
                      <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{permission.name}</p>
                            {getLevelBadge(permission.level)}
                          </div>
                          <p className="text-sm text-gray-600">{permission.description}</p>
                          <p className="text-xs text-gray-500">Category: {permission.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Roles */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    System Roles
                  </CardTitle>
                  <CardDescription>Predefined roles for {system.toUpperCase()} system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemRoles[system]?.map((role) => (
                      <div key={role.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{role.name}</h4>
                          <Badge variant="outline">{role.userCount} users</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                        <div className="space-y-2">
                          <Label className="text-xs font-medium text-gray-500">PERMISSIONS:</Label>
                          <div className="flex flex-wrap gap-1">
                            {role.permissions.map((permId) => {
                              const permission = systemPermissions[system]?.find((p) => p.id === permId)
                              return permission ? (
                                <Badge key={permId} variant="outline" className="text-xs">
                                  {permission.name}
                                </Badge>
                              ) : null
                            })}
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Users className="w-3 h-3 mr-1" />
                            Assign Users
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
