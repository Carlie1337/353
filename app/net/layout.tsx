"use client"

import type React from "react"
import { NETSidebar } from "@/components/net-sidebar"

export default function NETLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <NETSidebar />
      <main className="flex-1 ml-64 overflow-auto">{children}</main>
    </div>
  )
}
