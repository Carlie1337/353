"use client"

import { useState, useEffect } from "react"
import { supabase } from "./supabase-client"

export interface AuditLog {
  id: string
  user_id: string
  user_name: string
  action: string
  resource: string
  resource_id?: string
  details?: any
  ip_address?: string
  user_agent?: string
  created_at: string
}

export interface AuditFilters {
  user_id?: string
  action?: string
  resource?: string
  date_from?: string
  date_to?: string
  limit?: number
}

class AuditService {
  async log(entry: Omit<AuditLog, "id" | "created_at">) {
    try {
      const { data, error } = await supabase
        .from("audit_logs")
        .insert([
          {
            ...entry,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        console.error("Failed to log audit entry:", error)
        return { data: null, error }
      }

      return { data, error: null }
    } catch (error) {
      console.error("Audit logging error:", error)
      return { data: null, error }
    }
  }

  async getLogs(filters: AuditFilters = {}) {
    try {
      let query = supabase.from("audit_logs").select("*").order("created_at", { ascending: false })

      if (filters.user_id) {
        query = query.eq("user_id", filters.user_id)
      }

      if (filters.action) {
        query = query.eq("action", filters.action)
      }

      if (filters.resource) {
        query = query.eq("resource", filters.resource)
      }

      if (filters.date_from) {
        query = query.gte("created_at", filters.date_from)
      }

      if (filters.date_to) {
        query = query.lte("created_at", filters.date_to)
      }

      if (filters.limit) {
        query = query.limit(filters.limit)
      }

      const { data, error } = await query

      return { data: data || [], error }
    } catch (error) {
      console.error("Failed to fetch audit logs:", error)
      return { data: [], error }
    }
  }

  async getLogsByUser(userId: string, limit = 50) {
    return this.getLogs({ user_id: userId, limit })
  }

  async getLogsByResource(resource: string, resourceId?: string, limit = 50) {
    const filters: AuditFilters = { resource, limit }
    if (resourceId) {
      // We'll need to filter by resource_id in the query
    }
    return this.getLogs(filters)
  }

  async getRecentActivity(limit = 20) {
    return this.getLogs({ limit })
  }

  async logUserAction(userId: string, userName: string, action: string, resource: string, details?: any) {
    return this.log({
      user_id: userId,
      user_name: userName,
      action,
      resource,
      details,
      ip_address: typeof window !== "undefined" ? "client" : "server",
      user_agent: typeof window !== "undefined" ? navigator.userAgent : "server",
    })
  }
}

export const auditService = new AuditService()

export function useAuditLog(filters: AuditFilters = {}) {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(null)

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true)
      try {
        const { data, error } = await auditService.getLogs(filters)
        if (error) {
          setError(error)
        } else {
          setLogs(data)
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [JSON.stringify(filters)])

  const refetch = async () => {
    const { data, error } = await auditService.getLogs(filters)
    if (error) {
      setError(error)
    } else {
      setLogs(data)
      setError(null)
    }
  }

  return {
    logs,
    loading,
    error,
    refetch,
  }
}

export default auditService
