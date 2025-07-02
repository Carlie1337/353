"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

export interface Incident {
  id: string
  title: string
  description: string
  type: "theft" | "assault" | "vandalism" | "noise" | "traffic" | "fire" | "medical" | "other"
  status: "pending" | "investigating" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "critical"
  location: string
  latitude?: number
  longitude?: number
  reporter_id?: string
  reporter_name?: string
  reporter_phone?: string
  assigned_to?: string
  assigned_officer?: string
  evidence_urls?: string[]
  witness_statements?: string[]
  resolution_notes?: string
  occurred_at: string
  reported_at: string
  resolved_at?: string
  created_at: string
  updated_at: string
}

export function useIncidents() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadIncidents()

    // Subscribe to real-time updates
    const channel = supabase
      .channel("incidents_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "security_incidents",
        },
        (payload) => {
          console.log("Incident change:", payload)
          if (payload.eventType === "INSERT") {
            toast({
              title: "New Incident Reported",
              description: `${payload.new.title} - ${payload.new.location}`,
            })
          }
          loadIncidents()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadIncidents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("security_incidents")
        .select(`
          *,
          reporter:users(name, phone),
          assigned_officer:users(name)
        `)
        .order("created_at", { ascending: false })

      if (error) throw error

      const formattedIncidents =
        data?.map((incident) => ({
          ...incident,
          reporter_name: incident.reporter?.name,
          reporter_phone: incident.reporter?.phone,
          assigned_officer: incident.assigned_officer?.name,
        })) || []

      setIncidents(formattedIncidents)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error loading incidents",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const reportIncident = async (incidentData: Omit<Incident, "id" | "created_at" | "updated_at" | "reported_at">) => {
    try {
      const { data, error } = await supabase
        .from("security_incidents")
        .insert([
          {
            ...incidentData,
            reported_at: new Date().toISOString(),
            status: "pending",
          },
        ])
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Incident reported successfully",
        description: "Your incident report has been submitted and will be reviewed.",
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error reporting incident",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const updateIncident = async (id: string, updates: Partial<Incident>) => {
    try {
      const { data, error } = await supabase
        .from("security_incidents")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Incident updated successfully",
        description: "Incident information has been updated.",
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error updating incident",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const assignIncident = async (id: string, officerId: string) => {
    try {
      const { data, error } = await supabase
        .from("security_incidents")
        .update({
          assigned_to: officerId,
          status: "investigating",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Incident assigned successfully",
        description: "Incident has been assigned to an officer.",
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error assigning incident",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const resolveIncident = async (id: string, resolutionNotes: string) => {
    try {
      const { data, error } = await supabase
        .from("security_incidents")
        .update({
          status: "resolved",
          resolution_notes: resolutionNotes,
          resolved_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Incident resolved successfully",
        description: "Incident has been marked as resolved.",
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error resolving incident",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const getIncidentStats = async () => {
    try {
      const { count: totalCount } = await supabase
        .from("security_incidents")
        .select("*", { count: "exact", head: true })

      const { count: pendingCount } = await supabase
        .from("security_incidents")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending")

      const { count: investigatingCount } = await supabase
        .from("security_incidents")
        .select("*", { count: "exact", head: true })
        .eq("status", "investigating")

      const { count: resolvedCount } = await supabase
        .from("security_incidents")
        .select("*", { count: "exact", head: true })
        .eq("status", "resolved")

      const { count: criticalCount } = await supabase
        .from("security_incidents")
        .select("*", { count: "exact", head: true })
        .eq("priority", "critical")

      return {
        total: totalCount || 0,
        pending: pendingCount || 0,
        investigating: investigatingCount || 0,
        resolved: resolvedCount || 0,
        critical: criticalCount || 0,
      }
    } catch (err: any) {
      console.error("Error getting incident stats:", err)
      return {
        total: 0,
        pending: 0,
        investigating: 0,
        resolved: 0,
        critical: 0,
      }
    }
  }

  return {
    incidents,
    loading,
    error,
    reportIncident,
    updateIncident,
    assignIncident,
    resolveIncident,
    getIncidentStats,
    refresh: loadIncidents,
  }
}
