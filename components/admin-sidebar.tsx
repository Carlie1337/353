"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Crown,
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Shield,
  Building,
  ClipboardList,
  UserCheck,
  Bell,
  AlertTriangle,
  Server,
  Database,
  Activity,
  Lock,
  UserCog,
  Zap,
  Monitor,
  HardDrive,
  Wifi,
  Globe,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Overview",
        href: "/heartclif",
        icon: LayoutDashboard,
      },
      {
        title: "System Monitor",
        href: "/heartclif/monitor",
        icon: Monitor,
      },
      {
        title: "Analytics",
        href: "/heartclif/analytics",
        icon: BarChart3,
      },
    ],
  },
  {
    title: "System Management",
    items: [
      {
        title: "Server Management",
        href: "/heartclif/servers",
        icon: Server,
      },
      {
        title: "Database Admin",
        href: "/heartclif/database",
        icon: Database,
      },
      {
        title: "Network Config",
        href: "/heartclif/network",
        icon: Wifi,
      },
      {
        title: "Storage Management",
        href: "/heartclif/storage",
        icon: HardDrive,
      },
    ],
  },
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/heartclif/users",
        icon: Users,
      },
      {
        title: "Admin Users",
        href: "/heartclif/admins",
        icon: UserCog,
      },
      {
        title: "Role Management",
        href: "/heartclif/roles",
        icon: UserCheck,
      },
      {
        title: "Access Control",
        href: "/heartclif/access",
        icon: Lock,
      },
    ],
  },
  {
    title: "Security",
    items: [
      {
        title: "Security Dashboard",
        href: "/heartclif/security",
        icon: Shield,
      },
      {
        title: "Audit Logs",
        href: "/heartclif/audit",
        icon: ClipboardList,
      },
      {
        title: "Firewall",
        href: "/heartclif/firewall",
        icon: Globe,
      },
      {
        title: "Backup & Recovery",
        href: "/heartclif/backup",
        icon: Activity,
      },
    ],
  },
  {
    title: "Application Management",
    items: [
      {
        title: "Portal Management",
        href: "/heartclif/portals",
        icon: Building,
      },
      {
        title: "Module Control",
        href: "/heartclif/modules",
        icon: Zap,
      },
      {
        title: "API Management",
        href: "/heartclif/api",
        icon: Globe,
      },
      {
        title: "Performance",
        href: "/heartclif/performance",
        icon: Activity,
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        title: "System Settings",
        href: "/heartclif/settings",
        icon: Settings,
      },
      {
        title: "Notifications",
        href: "/heartclif/notifications",
        icon: Bell,
      },
      {
        title: "Maintenance",
        href: "/heartclif/maintenance",
        icon: AlertTriangle,
      },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white dark:bg-gray-900 shadow-lg">
      {/* Header */}
      <div className="flex h-16 items-center border-b px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-600 text-white">
            <Crown className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">Heartclif</span>
            <Badge variant="outline" className="text-xs w-fit bg-purple-50 text-purple-700 border-purple-300">
              Supreme Admin
            </Badge>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-auto py-4">
        <nav className="space-y-6 px-3">
          {sidebarItems.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800",
                      pathname === item.href
                        ? "bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-100"
                        : "text-gray-700 dark:text-gray-300",
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-gray-500 dark:text-gray-400">System Status</div>
          <Badge className="bg-green-100 text-green-800 text-xs">Online</Badge>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/heartclif/settings">
              <Settings className="h-4 w-4" />
            </Link>
          </Button>
          <ModeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">
              <LogOut className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
