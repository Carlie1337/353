"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

export interface Resident {
  id: string
  first_name: string
  last_name: string
  middle_name?: string
  email?: string
  phone?: string
  address: string
  birth_date: string
  gender: "male" | "female" | "other"
  civil_status: "single" | "married" | "divorced" | "widowed"
  occupation?: string
  emergency_contact_name?: string
  emergency_contact_phone?: string
  household_id?: string
  voter_id?: string
  philhealth_id?: string
  sss_id?: string
  tin_id?: string
  created_at: string
  updated_at: string
}

export function useResidents() {
  const [residents, setResidents] = useState<Resident[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadResidents()

    // Subscribe to real-time updates
    const channel = supabase
      .channel("residents_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "residents",
        },
        (payload) => {
          console.log("Residents change:", payload)
          loadResidents() // Reload data on changes
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadResidents = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.from("residents").select("*").order("created_at", { ascending: false })

      if (error) throw error

      setResidents(data || [])
      setError(null)
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error loading residents",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addResident = async (residentData: Omit<Resident, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase.from("residents").insert([residentData]).select().single()

      if (error) throw error

      toast({
        title: "Resident added successfully",
        description: `${residentData.first_name} ${residentData.last_name} has been registered.`,
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error adding resident",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const updateResident = async (id: string, updates: Partial<Resident>) => {
    try {
      const { data, error } = await supabase
        .from("residents")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Resident updated successfully",
        description: "Resident information has been updated.",
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error updating resident",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const deleteResident = async (id: string) => {
    try {
      const { error } = await supabase.from("residents").delete().eq("id", id)

      if (error) throw error

      toast({
        title: "Resident deleted successfully",
        description: "Resident has been removed from the system.",
      })

      return { error: null }
    } catch (err: any) {
      toast({
        title: "Error deleting resident",
        description: err.message,
        variant: "destructive",
      })
      return { error: err.message }
    }
  }

  const searchResidents = async (query: string) => {
    try {
      const { data, error } = await supabase
        .from("residents")
        .select("*")
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`)
        .order("created_at", { ascending: false })

      if (error) throw error

      return { data: data || [], error: null }
    } catch (err: any) {
      return { data: [], error: err.message }
    }
  }

  const getResidentStats = async () => {
    try {
      const { count: totalCount } = await supabase.from("residents").select("*", { count: "exact", head: true })

      const { count: maleCount } = await supabase
        .from("residents")
        .select("*", { count: "exact", head: true })
        .eq("gender", "male")

      const { count: femaleCount } = await supabase
        .from("residents")
        .select("*", { count: "exact", head: true })
        .eq("gender", "female")

      const { count: marriedCount } = await supabase
        .from("residents")
        .select("*", { count: "exact", head: true })
        .eq("civil_status", "married")

      return {
        total: totalCount || 0,
        male: maleCount || 0,
        female: femaleCount || 0,
        married: marriedCount || 0,
        single: (totalCount || 0) - (marriedCount || 0),
      }
    } catch (err: any) {
      console.error("Error getting resident stats:", err)
      return {
        total: 0,
        male: 0,
        female: 0,
        married: 0,
        single: 0,
      }
    }
  }

  return {
    residents,
    loading,
    error,
    addResident,
    updateResident,
    deleteResident,
    searchResidents,
    getResidentStats,
    refresh: loadResidents,
  }
}
