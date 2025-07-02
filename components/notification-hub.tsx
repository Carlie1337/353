"use client"

import { useEffect, useState } from "react"
import { toast } from "@/hooks/use-toast"
import { getSupabaseClient } from "@/lib/supabase-client"
import { useAuth } from "./unified-auth-provider"

interface Notification {
  id: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  user_id?: string
  created_at: string
  read: boolean
}

export function NotificationHub() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { user } = useAuth()
  const supabase = getSupabaseClient()

  useEffect(() => {
    if (!supabase || !user) return

    // Subscribe to real-time notifications
    const channel = supabase
      .channel("notifications")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const notification = payload.new as Notification
          setNotifications((prev) => [notification, ...prev])

          // Show toast notification
          toast({
            title: notification.title,
            description: notification.message,
            variant: notification.type === "error" ? "destructive" : "default",
          })
        },
      )
      .subscribe()

    // Load existing unread notifications
    const loadNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", user.id)
          .eq("read", false)
          .order("created_at", { ascending: false })
          .limit(10)

        if (error) throw error
        setNotifications(data || [])
      } catch (error) {
        console.error("Error loading notifications:", error)
      }
    }

    loadNotifications()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, user])

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    if (!supabase) return

    try {
      await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

      setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  return null // This component only handles background notifications
}
