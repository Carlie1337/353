"use client"

import { AuditTrail } from "@/components/audit-trail"

export default function AuditPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 md:ml-64">
      <AuditTrail />
    </div>
  )
}
