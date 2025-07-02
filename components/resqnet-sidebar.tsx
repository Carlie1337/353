"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Radio,
  Users,
  MapPin,
  AlertTriangle,
  Calendar,
  Settings,
  LogOut,
  Menu,
  Zap,
  Phone,
  Truck,
  Database,
  BarChart3,
  MessageSquare,
  Siren,
  Building,
  Heart,
} from "lucide-react"

const navigation = [
  {
    name: "Command Center",
    href: "/ResQNet",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: "Emergency Broadcasting",
    href: "/ResQNet/broadcasting",
    icon: Radio,
    badge: "LIVE",
  },
  {
    name: "Incident Management",
    href: "/ResQNet/incidents",
    icon: AlertTriangle,
    badge: "12",
  },
  {
    name: "Agency Coordination",
    href: "/ResQNet/coordination",
    icon: Users,
    badge: null,
  },
  {
    name: "Emergency Response",
    href: "/ResQNet/response",
    icon: Truck,
    badge: "5",
  },
  {
    name: "911 Integration",
    href: "/ResQNet/911",
    icon: Phone,
    badge: "ACTIVE",
  },
  {
    name: "Real-time Map",
    href: "/ResQNet/map",
    icon: MapPin,
    badge: null,
  },
  {
    name: "Resource Management",
    href: "/ResQNet/resources",
    icon: Database,
    badge: null,
  },
  {
    name: "Disaster Planning",
    href: "/ResQNet/planning",
    icon: Calendar,
    badge: null,
  },
  {
    name: "Early Warning",
    href: "/ResQNet/warning",
    icon: Siren,
    badge: null,
  },
  {
    name: "Communication Hub",
    href: "/ResQNet/communication",
    icon: MessageSquare,
    badge: "24",
  },
  {
    name: "Evacuation Centers",
    href: "/ResQNet/evacuation",
    icon: Building,
    badge: null,
  },
  {
    name: "Medical Response",
    href: "/ResQNet/medical",
    icon: Heart,
    badge: null,
  },
  {
    name: "Analytics & Reports",
    href: "/ResQNet/analytics",
    icon: BarChart3,
    badge: null,
  },
  {
    name: "System Settings",
    href: "/ResQNet/settings",
    icon: Settings,
    badge: null,
  },
]

const agencies = [
  { name: "NDRRMC", status: "online", color: "bg-green-500" },
  { name: "Barangay", status: "online", color: "bg-green-500" },
  { name: "PNP", status: "online", color: "bg-green-500" },
  { name: "BFP", status: "online", color: "bg-green-500" },
  { name: "DOH", status: "limited", color: "bg-yellow-500" },
  { name: "DSWD", status: "online", color: "bg-green-500" },
  { name: "LGU", status: "online", color: "bg-green-500" },
  { name: "Red Cross", status: "offline", color: "bg-red-500" },
]

function SidebarContent() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-red-900 to-red-800 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-red-700 px-6">
        <Link href="/ResQNet" className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
            <Zap className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <span className="text-xl font-bold">Bucana ResQNet</span>
            <p className="text-xs text-red-200">Disaster Response System</p>
          </div>
        </Link>
      </div>

      {/* Emergency Status */}
      <div className="px-4 py-3 border-b border-red-700">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">System Status</span>
          <div className="flex items-center space-x-1">
            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-300">OPERATIONAL</span>
          </div>
        </div>
        <div className="mt-2 text-xs text-red-200">Last updated: {new Date().toLocaleTimeString()}</div>
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
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive ? "bg-white text-red-900" : "text-red-100 hover:bg-red-700 hover:text-white",
                )}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <Badge
                    variant={isActive ? "default" : "secondary"}
                    className={cn("text-xs", isActive ? "bg-red-100 text-red-900" : "bg-red-600 text-white")}
                  >
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Agency Status */}
      <div className="border-t border-red-700 p-4">
        <h4 className="text-sm font-medium mb-3">Connected Agencies</h4>
        <div className="space-y-2">
          {agencies.slice(0, 4).map((agency) => (
            <div key={agency.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={cn("h-2 w-2 rounded-full", agency.color)}></div>
                <span className="text-xs">{agency.name}</span>
              </div>
              <span className="text-xs text-red-200 capitalize">{agency.status}</span>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-3 text-red-100 hover:bg-red-700">
          View All Agencies
        </Button>
      </div>

      {/* User Menu */}
      <div className="border-t border-red-700 p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-sm font-medium text-red-900">DC</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Disaster Coordinator</p>
            <p className="text-xs text-red-200 truncate">Barangay Bucana</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start text-red-100 hover:bg-red-700">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export function ResQNetSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-40 bg-red-600 text-white hover:bg-red-700"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0">
        <SidebarContent />
      </div>
    </>
  )
}
