"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileText,
  AlertTriangle,
  Users,
  Radio,
  MapPin,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Shield,
  Car,
  Megaphone,
  Archive,
  Search,
  Siren,
  Calendar,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/net",
    icon: LayoutDashboard,
  },
  {
    name: "Blotter Records",
    href: "/net/blotter",
    icon: FileText,
  },
  {
    name: "Incident Reports",
    href: "/net/incidents",
    icon: AlertTriangle,
  },
  {
    name: "Patrol Management",
    href: "/net/patrol",
    icon: Car,
  },
  {
    name: "Emergency Response",
    href: "/net/emergency",
    icon: Siren,
  },
  {
    name: "Agency Coordination",
    href: "/net/coordination",
    icon: Radio,
  },
  {
    name: "Personnel",
    href: "/net/personnel",
    icon: Users,
  },
  {
    name: "Investigations",
    href: "/net/investigation",
    icon: Search,
  },
  {
    name: "Evidence Management",
    href: "/net/evidence",
    icon: Archive,
  },
  {
    name: "Public Announcements",
    href: "/net/announcements",
    icon: Megaphone,
  },
  {
    name: "Duty Schedule",
    href: "/net/duty",
    icon: Calendar,
  },
  {
    name: "Map & Locations",
    href: "/net/maps",
    icon: MapPin,
  },
  {
    name: "Reports & Analytics",
    href: "/net/reports",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/net/settings",
    icon: Settings,
  },
]

function SidebarContent() {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/net" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-red-600 flex items-center justify-center">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div>
            <span className="text-lg font-semibold">Bucana NET</span>
            <p className="text-xs text-muted-foreground">Security Portal</p>
          </div>
        </Link>
      </div>

      {/* Demo Badge */}
      <div className="px-6 py-2">
        <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-2 text-center">
          <span className="text-xs font-medium text-yellow-800">DEMO VERSION</span>
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
                className={cn(
                  "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* User Menu */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-red-600 flex items-center justify-center">
            <span className="text-sm font-medium text-white">NET</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Officer Demo User</p>
            <p className="text-xs text-muted-foreground truncate">Barangay Bucana NET</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="w-full justify-start">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export function NETSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-40">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 bg-background border-r">
        <SidebarContent />
      </div>
    </>
  )
}
