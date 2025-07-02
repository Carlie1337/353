"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X, Volume2 } from "lucide-react"
import { supabase } from "@/lib/supabase-client"

interface EmergencyAlert {
  id: string
  title: string
  message: string
  severity: "low" | "medium" | "high" | "critical"
  created_at: string
  expires_at?: string
  active: boolean
}

export function EmergencyAlertBanner() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([])
  const [dismissed, setDismissed] = useState<string[]>([])

  useEffect(() => {
    loadActiveAlerts()

    // Subscribe to real-time updates
    const channel = supabase
      .channel("emergency_alerts")
      .on("postgres_changes", { event: "*", schema: "public", table: "emergency_alerts" }, () => loadActiveAlerts())
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const loadActiveAlerts = async () => {
    try {
      const { data, error } = await supabase
        .from("emergency_alerts")
        .select("*")
        .eq("active", true)
        .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
        .order("created_at", { ascending: false })
        .limit(3)

      if (!error && data) {
        setAlerts(data)
      }
    } catch (error) {
      console.error("Error loading alerts:", error)
      // Fallback to demo alert
      setAlerts([
        {
          id: "demo-1",
          title: "Weather Advisory",
          message: "Heavy rainfall expected. Stay indoors and avoid flood-prone areas.",
          severity: "medium",
          created_at: new Date().toISOString(),
          active: true,
        },
      ])
    }
  }

  const dismissAlert = (alertId: string) => {
    setDismissed([...dismissed, alertId])
  }

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600 text-white border-red-700"
      case "high":
        return "bg-orange-500 text-white border-orange-600"
      case "medium":
        return "bg-yellow-500 text-black border-yellow-600"
      case "low":
        return "bg-blue-500 text-white border-blue-600"
      default:
        return "bg-gray-500 text-white border-gray-600"
    }
  }

  const activeAlerts = alerts.filter((alert) => !dismissed.includes(alert.id))

  if (activeAlerts.length === 0) return null

  return (
    <div className="space-y-2">
      {activeAlerts.map((alert) => (
        <Alert key={alert.id} className={`${getSeverityStyles(alert.severity)} animate-pulse`}>
          <AlertTriangle className="h-4 w-4" />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold flex items-center">
                <Volume2 className="h-4 w-4 mr-2" />
                {alert.title}
              </h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert(alert.id)}
                className="text-current hover:bg-black/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <AlertDescription className="mt-1">{alert.message}</AlertDescription>
            <div className="text-xs mt-2 opacity-75">Issued: {new Date(alert.created_at).toLocaleString()}</div>
          </div>
        </Alert>
      ))}
    </div>
  )
}
