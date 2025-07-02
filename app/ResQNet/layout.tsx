"use client"

import type React from "react"

import { ResQNetSidebar } from "@/components/resqnet-sidebar"

export default function ResQNetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <ResQNetSidebar />
      <main className="lg:pl-72">{children}</main>
    </div>
  )
}
