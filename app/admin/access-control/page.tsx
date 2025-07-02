"use client"

import { AdminAccessControl } from "@/components/admin-access-control"

export default function AccessControlPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:ml-64">
      <AdminAccessControl />
    </div>
  )
}
