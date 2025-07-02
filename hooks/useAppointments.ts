"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { useToast } from "@/hooks/use-toast"

export interface Appointment {
  id: string
  user_id: string
  user_name?: string
  user_email?: string
  user_phone?: string
  type: "consultation" | "document_request" | "complaint" | "inquiry" | "certificate" | "permit"
  service: string
  date: string
  time: string
  status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show"
  notes?: string
  purpose?: string
  requirements_met?: boolean
  assigned_staff?: string
  staff_name?: string
  location?: string
  reminder_sent?: boolean
  created_at: string
  updated_at: string
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadAppointments()

    // Subscribe to real-time updates
    const channel = supabase
      .channel("appointments_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "appointments",
        },
        (payload) => {
          console.log("Appointment change:", payload)
          if (payload.eventType === "INSERT") {
            toast({
              title: "New Appointment Booked",
              description: `${payload.new.service} - ${payload.new.date} at ${payload.new.time}`,
            })
          }
          loadAppointments()
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          *,
          user:users(name, email, phone),
          staff:users!appointments_assigned_staff_fkey(name)
        `)
        .order("date", { ascending: true })
        .order("time", { ascending: true })

      if (error) throw error

      const formattedAppointments =
        data?.map((appointment) => ({
          ...appointment,
          user_name: appointment.user?.name,
          user_email: appointment.user?.email,
          user_phone: appointment.user?.phone,
          staff_name: appointment.staff?.name,
        })) || []

      setAppointments(formattedAppointments)
      setError(null)
    } catch (err: any) {
      setError(err.message)
      toast({
        title: "Error loading appointments",
        description: err.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const bookAppointment = async (appointmentData: Omit<Appointment, "id" | "created_at" | "updated_at">) => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .insert([
          {
            ...appointmentData,
            status: "pending",
          },
        ])
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Appointment booked successfully",
        description: `Your appointment for ${appointmentData.service} has been scheduled.`,
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error booking appointment",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Appointment updated successfully",
        description: "Appointment has been updated.",
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error updating appointment",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const confirmAppointment = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .update({
          status: "confirmed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Appointment confirmed",
        description: "Appointment has been confirmed.",
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error confirming appointment",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const cancelAppointment = async (id: string, reason?: string) => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .update({
          status: "cancelled",
          notes: reason,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      toast({
        title: "Appointment cancelled",
        description: "Appointment has been cancelled.",
      })

      return { data, error: null }
    } catch (err: any) {
      toast({
        title: "Error cancelling appointment",
        description: err.message,
        variant: "destructive",
      })
      return { data: null, error: err.message }
    }
  }

  const getAppointmentStats = async () => {
    try {
      const today = new Date().toISOString().split("T")[0]

      const { count: totalCount } = await supabase.from("appointments").select("*", { count: "exact", head: true })

      const { count: todayCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("date", today)

      const { count: pendingCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending")

      const { count: confirmedCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("status", "confirmed")

      const { count: completedCount } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .eq("status", "completed")

      return {
        total: totalCount || 0,
        today: todayCount || 0,
        pending: pendingCount || 0,
        confirmed: confirmedCount || 0,
        completed: completedCount || 0,
      }
    } catch (err: any) {
      console.error("Error getting appointment stats:", err)
      return {
        total: 0,
        today: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
      }
    }
  }

  const getAvailableSlots = async (date: string, service: string) => {
    try {
      const { data: bookedSlots, error } = await supabase
        .from("appointments")
        .select("time")
        .eq("date", date)
        .in("status", ["pending", "confirmed"])

      if (error) throw error

      // Define available time slots (9 AM to 5 PM, 30-minute intervals)
      const allSlots = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
      ]

      const bookedTimes = bookedSlots?.map((slot) => slot.time) || []
      const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot))

      return { data: availableSlots, error: null }
    } catch (err: any) {
      return { data: [], error: err.message }
    }
  }

  return {
    appointments,
    loading,
    error,
    bookAppointment,
    updateAppointment,
    confirmAppointment,
    cancelAppointment,
    getAppointmentStats,
    getAvailableSlots,
    refresh: loadAppointments,
  }
}
