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
import {
  Shield,
  Heart,
  Radio,
  Siren,
  Building2,
  Eye,
  UserCheck,
  FileText,
  Users,
  AlertTriangle,
  Calendar,
  Settings,
} from "lucide-react"

interface AccessControlProps {
  userId: string
  userName: string
  currentAccess: {
    systems: string[]
    permissions: string[]
    systemRoles: Record<string, string>
    accessLevels: Record<string, string>
    specificAccess: Record<string, boolean>
  }
  onSave: (access: any) => void
}

const systemDetails = {
  bms: {
    name: "BMS Portal",
    icon: Building2,
    color: "bg-blue-500",
    modules: [
      { id: "documents", name: "Document Processing", icon: FileText },
      { id: "residents", name: "Resident Management", icon: Users },
      { id: "blotter", name: "Blotter Records", icon: AlertTriangle },
      { id: "reports", name: "Reports & Analytics", icon: FileText },
      { id: "users", name: "User Management", icon: Users },
      { id: "verification", name: "Verification", icon: UserCheck },
    ],
  },
  net: {
    name: "NET System",
    icon: Radio,
    color: "bg-green-500",
    modules: [
      { id: "incidents", name: "Incident Reporting", icon: AlertTriangle },
      { id: "patrols", name: "Patrol Management", icon: Calendar },
      { id: "personnel", name: "Personnel Management", icon: Users },
      { id: "coordination", name: "Coordination", icon: Radio },
    ],
  },
  resqnet: {
    name: "ResQNet",
    icon: Siren,
    color: "bg-red-500",
    modules: [
      { id: "emergency", name: "Emergency Declaration", icon: Siren },
      { id: "resources", name: "Resource Management", icon: Settings },
      { id: "evacuation", name: "Evacuation Management", icon: Users },
      { id: "communication", name: "Communication", icon: Radio },
    ],
  },
  health: {
    name: "Health Portal",
    icon: Heart,
    color: "bg-pink-500",
    modules: [
      { id: "patients", name: "Patient Records", icon: Users },
      { id: "appointments", name: "Appointments", icon: Calendar },
      { id: "medical", name: "Medical Records", icon: FileText },
      { id: "programs", name: "Health Programs", icon: Heart },
    ],
  },
  tanod: {
    name: "Tanod Portal",
    icon: Shield,
    color: "bg-yellow-500",
    modules: [
      { id: "patrol", name: "Patrol Duties", icon: Calendar },
      { id: "verification", name: "ID Verification", icon: UserCheck },
      { id: "incidents", name: "Incident Reports", icon: AlertTriangle },
      { id: "scanner", name: "QR Scanner", icon: Eye },
    ],
  },
}

const accessLevels = [
  {
    id: "view",
    name: "View Only",
    description: "Can only view information, no editing",
    permissions: ["view"],
  },
  {
    id: "basic",
    name: "Basic Access",
    description: "View and basic operations",
    permissions: ["view", "create"],
  },
  {
    id: "standard",
    name: "Standard Access",
    description: "Full operational access",
    permissions: ["view", "create", "edit"],
  },
  {
    id: "advanced",
    name: "Advanced Access",
    description: "Advanced operations and approvals",
    permissions: ["view", "create", "edit", "approve"],
  },
  {
    id: "admin",
    name: "Administrator",
    description: "Full system control",
    permissions: ["view", "create", "edit", "approve", "delete", "manage"],
  },
]

export function AccessControlDialog({ userId, userName, currentAccess, onSave }: AccessControlProps) {
  const [access, setAccess] = useState(currentAccess)
  const [isOpen, setIsOpen] = useState(false)

  const handleSystemToggle = (systemKey: string, enabled: boolean) => {
    if (enabled) {
      setAccess({
        ...access,
        systems: [...access.systems, systemKey],
        accessLevels: { ...access.accessLevels, [systemKey]: "basic" },
      })
    } else {
      setAccess({
        ...access,
        systems: access.systems.filter((s) => s !== systemKey),
        accessLevels: { ...access.accessLevels, [systemKey]: undefined },
        systemRoles: { ...access.systemRoles, [systemKey]: undefined },
      })
    }
  }

  const handleModuleToggle = (systemKey: string, moduleId: string, enabled: boolean) => {
    const key = `${systemKey}.${moduleId}`
    setAccess({
      ...access,
      specificAccess: {
        ...access.specificAccess,
        [key]: enabled,
      },
    })
  }

  const handleSave = () => {
    onSave(access)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Shield className="w-4 h-4 mr-2" />
          Configure Access
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Access Control - {userName}</DialogTitle>
          <DialogDescription>Configure detailed system access and permissions for this user</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {Object.entries(systemDetails).map(([systemKey, system]) => {
            const isSystemEnabled = access.systems.includes(systemKey)
            const currentLevel = access.accessLevels[systemKey] || "basic"

            return (
              <Card key={systemKey}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md ${system.color} text-white`}>
                        <system.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{system.name}</CardTitle>
                        <CardDescription>Configure access to {system.name} system</CardDescription>
                      </div>
                    </div>
                    <Switch
                      checked={isSystemEnabled}
                      onCheckedChange={(checked) => handleSystemToggle(systemKey, checked)}
                    />
                  </div>
                </CardHeader>

                {isSystemEnabled && (
                  <CardContent className="space-y-4">
                    {/* Access Level */}
                    <div>
                      <Label className="text-sm font-medium">Access Level</Label>
                      <Select
                        value={currentLevel}
                        onValueChange={(value) =>
                          setAccess({
                            ...access,
                            accessLevels: { ...access.accessLevels, [systemKey]: value },
                          })
                        }
                      >
                        <SelectTrigger className="w-full mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {accessLevels.map((level) => (
                            <SelectItem key={level.id} value={level.id}>
                              <div>
                                <p className="font-medium">{level.name}</p>
                                <p className="text-xs text-gray-500">{level.description}</p>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-2">
                        <p className="text-xs text-gray-600">
                          Permissions:{" "}
                          {accessLevels
                            .find((l) => l.id === currentLevel)
                            ?.permissions.map((p) => (
                              <Badge key={p} variant="outline" className="text-xs mr-1">
                                {p}
                              </Badge>
                            ))}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {/* Module-specific Access */}
                    <div>
                      <Label className="text-sm font-medium">Module Access</Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {system.modules.map((module) => {
                          const moduleKey = `${systemKey}.${module.id}`
                          const isModuleEnabled = access.specificAccess[moduleKey] !== false

                          return (
                            <div key={module.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div className="flex items-center gap-2">
                                <module.icon className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium">{module.name}</span>
                              </div>
                              <Switch
                                checked={isModuleEnabled}
                                onCheckedChange={(checked) => handleModuleToggle(systemKey, module.id, checked)}
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>

                    {/* Special Permissions */}
                    <div>
                      <Label className="text-sm font-medium">Special Permissions</Label>
                      <div className="grid grid-cols-1 gap-2 mt-2">
                        {systemKey === "bms" && (
                          <>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">Can approve documents</span>
                              <Switch
                                checked={access.specificAccess.canApproveDocuments}
                                onCheckedChange={(checked) =>
                                  setAccess({
                                    ...access,
                                    specificAccess: { ...access.specificAccess, canApproveDocuments: checked },
                                  })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">Can manage users</span>
                              <Switch
                                checked={access.specificAccess.canManageUsers}
                                onCheckedChange={(checked) =>
                                  setAccess({
                                    ...access,
                                    specificAccess: { ...access.specificAccess, canManageUsers: checked },
                                  })
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">Can access financial reports</span>
                              <Switch
                                checked={access.specificAccess.canAccessFinancials}
                                onCheckedChange={(checked) =>
                                  setAccess({
                                    ...access,
                                    specificAccess: { ...access.specificAccess, canAccessFinancials: checked },
                                  })
                                }
                              />
                            </div>
                          </>
                        )}
                        {systemKey === "resqnet" && (
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">Can declare emergency</span>
                            <Switch
                              checked={access.specificAccess.canDeclareEmergency}
                              onCheckedChange={(checked) =>
                                setAccess({
                                  ...access,
                                  specificAccess: { ...access.specificAccess, canDeclareEmergency: checked },
                                })
                              }
                            />
                          </div>
                        )}
                        {systemKey === "net" && (
                          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <span className="text-sm">Can schedule patrols</span>
                            <Switch
                              checked={access.specificAccess.canSchedulePatrols}
                              onCheckedChange={(checked) =>
                                setAccess({
                                  ...access,
                                  specificAccess: { ...access.specificAccess, canSchedulePatrols: checked },
                                })
                              }
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Access Configuration</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
