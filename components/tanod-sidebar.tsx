"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Shield,
  Home,
  QrCode,
  CheckCircle,
  AlertTriangle,
  Phone,
  Car,
  Radio,
  Camera,
  FileText,
  Calendar,
  MapPin,
  BarChart3,
  Settings,
  Menu,
  X,
  Activity,
  Bell,
  LogOut,
  User,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/tanod",
    icon: Home,
    badge: null,
    description: "Overview and statistics",
  },
  {
    name: "QR Scanner",
    href: "/tanod/scanner",
    icon: QrCode,
    badge: null,
    description: "Verify resident identity",
  },
  {
    name: "Verification History",
    href: "/tanod/verification",
    icon: CheckCircle,
    badge: "3",
    description: "View verification records",
  },
  {
    name: "Incident Management",
    href: "/tanod/incidents",
    icon: AlertTriangle,
    badge: "2",
    description: "Report and track incidents",
  },
  {
    name: "Emergency Response",
    href: "/tanod/emergency",
    icon: Phone,
    badge: null,
    description: "Emergency coordination",
  },
  {
    name: "Patrol Management",
    href: "/tanod/patrol",
    icon: Car,
    badge: null,
    description: "Manage patrol routes",
  },
  {
    name: "Communication Hub",
    href: "/tanod/communication",
    icon: Radio,
    badge: "1",
    description: "Radio and messaging",
  },
  {
    name: "CCTV Monitoring",
    href: "/tanod/cctv",
    icon: Camera,
    badge: null,
    description: "Live camera feeds",
  },
  {
    name: "Blotter Records",
    href: "/tanod/blotter",
    icon: FileText,
    badge: null,
    description: "Incident documentation",
  },
  {
    name: "Duty Schedule",
    href: "/tanod/duty",
    icon: Calendar,
    badge: null,
    description: "Schedule management",
  },
  {
    name: "Tactical Map",
    href: "/tanod/map",
    icon: MapPin,
    badge: null,
    description: "Real-time location map",
  },
  {
    name: "Reports & Analytics",
    href: "/tanod/reports",
    icon: BarChart3,
    badge: null,
    description: "Generate reports",
  },
  {
    name: "Settings",
    href: "/tanod/settings",
    icon: Settings,
    badge: null,
    description: "System configuration",
  },
]

export function TanodSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-lg border-2"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-lg">
              <Shield className="w-7 h-7 text-blue-600" />
            </div>
            <div className="text-white">
              <h1 className="text-xl font-bold">Tanod Portal</h1>
              <p className="text-blue-100 text-sm">Security & Safety Command</p>
            </div>
          </div>

          {/* User Info */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">Tanod Garcia</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-200">
                    <Activity className="w-3 h-3 mr-1" />
                    On Duty
                  </Badge>
                  <span className="text-xs text-gray-500">Day Shift</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Status */}
          <div className="px-6 py-3 bg-blue-50 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-lg font-bold text-blue-600">5</div>
                <div className="text-xs text-gray-600">Active</div>
              </div>
              <div>
                <div className="text-lg font-bold text-green-600">23</div>
                <div className="text-xs text-gray-600">Verified</div>
              </div>
              <div>
                <div className="text-lg font-bold text-orange-600">2</div>
                <div className="text-xs text-gray-600">Alerts</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-gray-100",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:text-gray-900",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                        isActive
                          ? "bg-blue-100 text-blue-600"
                          : "bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700",
                      )}
                    >
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="truncate">{item.name}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-2 bg-red-100 text-red-800 text-xs px-1.5 py-0.5 min-w-0"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</p>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <Badge variant="secondary" className="ml-auto bg-red-100 text-red-800 text-xs">
                  3
                </Badge>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">Tanod Portal v2.1.0</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
