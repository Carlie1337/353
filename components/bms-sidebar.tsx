"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Building2,
  Users,
  FileText,
  Home,
  UserCheck,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Shield,
  Heart,
  Radio,
  Siren,
  Printer,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/bms",
    icon: Home,
    description: "Overview and statistics",
  },
  {
    name: "Document Requests",
    href: "/bms/documents",
    icon: FileText,
    description: "Process certificate requests",
  },
  {
    name: "Blotter Records",
    href: "/bms/blotter",
    icon: AlertTriangle,
    description: "Manage incident reports",
  },
  {
    name: "User Management",
    href: "/bms/users",
    icon: Users,
    description: "Manage user accounts and access",
  },
  {
    name: "Permissions & Roles",
    href: "/bms/permissions",
    icon: Shield,
    description: "Configure system permissions",
  },
  {
    name: "Residents",
    href: "/bms/residents",
    icon: Users,
    description: "Manage resident records",
  },
  {
    name: "Households",
    href: "/bms/households",
    icon: Building2,
    description: "Household management",
  },
  {
    name: "Verification",
    href: "/bms/verification",
    icon: UserCheck,
    description: "Verify resident information",
  },
  {
    name: "Reports",
    href: "/bms/reports",
    icon: BarChart3,
    description: "Generate official reports",
  },
  {
    name: "Print Center",
    href: "/bms/print",
    icon: Printer,
    description: "Print documents and certificates",
  },
]

const systemAccess = [
  {
    name: "Health Portal",
    href: "/health-portal",
    icon: Heart,
    description: "Access health center system",
  },
  {
    name: "NET System",
    href: "/net",
    icon: Radio,
    description: "Neighborhood Emergency Team",
  },
  {
    name: "Tanod Portal",
    href: "/tanod",
    icon: Shield,
    description: "Security personnel system",
  },
  {
    name: "ResQNet",
    href: "/ResQNet",
    icon: Siren,
    description: "Emergency response system",
  },
  {
    name: "Resident Portal",
    href: "/portal",
    icon: Users,
    description: "View resident portal",
  },
]

interface BMSSidebarProps {
  className?: string
}

export function BMSSidebar({ className }: BMSSidebarProps) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Building2 className="mr-2 h-6 w-6 text-blue-600" />
        <span className="font-semibold text-lg">BMS Portal</span>
      </div>

      <ScrollArea className="flex-1 px-3">
        <div className="space-y-6 py-4">
          {/* Main Navigation */}
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Main Functions</h3>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors",
                      isActive ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    <item.icon
                      className={cn(
                        "mr-3 h-4 w-4 flex-shrink-0",
                        isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500",
                      )}
                    />
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-500">{item.description}</div>
                    </div>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* System Access */}
          <div>
            <h3 className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">System Access</h3>
            <nav className="space-y-1">
              {systemAccess.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <item.icon className="mr-3 h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                  <div>
                    <div>{item.name}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>

      {/* Bottom Actions */}
      <div className="border-t p-4 space-y-2">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/bms/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn("hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:bg-white", className)}
      >
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  )
}
