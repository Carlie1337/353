"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, X, Phone, MapPin, Clock, Siren, Volume2 } from "lucide-react"

interface EmergencyAlert {
  id: string
  type: "weather" | "security" | "health" | "fire" | "flood" | "earthquake"
  severity: "low" | "medium" | "high" | "critical"
  title: string
  message: string
  location?: string
  contactNumber?: string
  timestamp: string
  active: boolean
  expiresAt?: string
}

export function EmergencyAlertBanner() {
  const [alerts, setAlerts] = useState<EmergencyAlert[]>([])
  const [dismissed, setDismissed] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadEmergencyAlerts()

    // Check for new alerts every 30 seconds
    const interval = setInterval(loadEmergencyAlerts, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadEmergencyAlerts = async () => {
    try {
      setLoading(true)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Sample emergency alerts - in production, this would come from your API
      const currentAlerts: EmergencyAlert[] = [
        // Uncomment to test different alert types
        // {
        //   id: "weather-001",
        //   type: "weather",
        //   severity: "high",
        //   title: "Heavy Rainfall Warning",
        //   message: "Heavy rainfall expected in the next 2 hours. Residents in low-lying areas are advised to take precautionary measures and avoid flood-prone areas.",
        //   location: "Entire Barangay",
        //   contactNumber: "911",
        //   timestamp: new Date().toISOString(),
        //   active: true,
        //   expiresAt: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()
        // },
        // {
        //   id: "security-001",
        //   type: "security",
        //   severity: "medium",
        //   title: "Security Advisory",
        //   message: "Increased security patrols in the area due to recent incidents. Report any suspicious activities to authorities immediately.",
        //   contactNumber: "117",
        //   timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        //   active: true,
        // },
      ]

      // Filter active and non-expired alerts
      const activeAlerts = currentAlerts.filter((alert) => {
        if (!alert.active) return false
        if (alert.expiresAt && new Date(alert.expiresAt) < new Date()) return false
        return true
      })

      setAlerts(activeAlerts)
    } catch (error) {
      console.error("Error loading emergency alerts:", error)
    } finally {
      setLoading(false)
    }
  }

  const dismissAlert = (alertId: string) => {
    setDismissed((prev) => [...prev, alertId])
  }

  const getSeverityColor = (severity: EmergencyAlert["severity"]) => {
    switch (severity) {
      case "critical":
        return "border-red-600 bg-red-600 text-white"
      case "high":
        return "border-orange-500 bg-orange-500 text-white"
      case "medium":
        return "border-yellow-500 bg-yellow-500 text-white"
      case "low":
        return "border-blue-500 bg-blue-500 text-white"
      default:
        return "border-gray-500 bg-gray-500 text-white"
    }
  }

  const getSeverityBadge = (severity: EmergencyAlert["severity"]) => {
    const colors = {
      critical: "bg-red-700 text-white",
      high: "bg-orange-600 text-white",
      medium: "bg-yellow-600 text-white",
      low: "bg-blue-600 text-white",
    }

    return <Badge className={`${colors[severity]} font-bold`}>{severity.toUpperCase()}</Badge>
  }

  const getTypeIcon = (type: EmergencyAlert["type"]) => {
    switch (type) {
      case "weather":
        return "🌧️"
      case "security":
        return "🚨"
      case "health":
        return "🏥"
      case "fire":
        return "🔥"
      case "flood":
        return "🌊"
      case "earthquake":
        return "🏗️"
      default:
        return "⚠️"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const activeAlerts = alerts.filter((alert) => !dismissed.includes(alert.id))

  if (loading || activeAlerts.length === 0) {
    return null
  }

  return (
    <div className="space-y-2 mb-4">
      {activeAlerts.map((alert) => (
        <Alert key={alert.id} className={`${getSeverityColor(alert.severity)} border-l-4 shadow-lg animate-pulse`}>
          <div className="flex items-start justify-between w-full">
            <div className="flex items-start gap-3 flex-1">
              <div className="flex items-center gap-2 mt-1">
                <Siren className="h-5 w-5 animate-bounce" />
                <Volume2 className="h-4 w-4" />
                <span className="text-lg">{getTypeIcon(alert.type)}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <h3 className="font-bold text-lg">{alert.title}</h3>
                  {getSeverityBadge(alert.severity)}
                  <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                    {alert.type.toUpperCase()}
                  </Badge>
                </div>

                <AlertDescription className="text-white/95 mb-3 text-base leading-relaxed">
                  {alert.message}
                </AlertDescription>

                <div className="flex flex-wrap items-center gap-4 text-sm text-white/80 mb-3">
                  {alert.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{alert.location}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{formatTimeAgo(alert.timestamp)}</span>
                  </div>

                  {alert.contactNumber && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      <span>Emergency: {alert.contactNumber}</span>
                    </div>
                  )}

                  {alert.expiresAt && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Expires: {formatTimeAgo(alert.expiresAt)}</span>
                    </div>
                  )}
                </div>

                {alert.contactNumber && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                      onClick={() => window.open(`tel:${alert.contactNumber}`)}
                    >
                      <Phone className="h-3 w-3 mr-1" />
                      Call {alert.contactNumber}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                      onClick={() => window.open(`sms:${alert.contactNumber}`)}
                    >
                      Send SMS
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissAlert(alert.id)}
              className="text-white/70 hover:text-white hover:bg-white/20 ml-2 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Alert>
      ))}

      {activeAlerts.length > 0 && (
        <div className="text-center text-sm text-gray-600 mt-2">
          <span className="flex items-center justify-center gap-1">
            <AlertTriangle className="h-3 w-3" />
            {activeAlerts.length} active emergency alert{activeAlerts.length > 1 ? "s" : ""}
          </span>
        </div>
      )}
    </div>
  )
}
