import type { ReactNode } from "react"
import { TanodSidebar } from "@/components/tanod-sidebar"

export default function TanodLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <TanodSidebar />
      <div className="flex-1 lg:ml-72">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  )
}
