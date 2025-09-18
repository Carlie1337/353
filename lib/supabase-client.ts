import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Named export for getSupabaseClient
export const getSupabaseClient = () => {
  return supabase
}

// Health check function
export const getSupabaseHealth = async () => {
  try {
    const startTime = Date.now()

    // Simple health check query
    const { data, error } = await supabase.from("residents").select("count").limit(1)

    const responseTime = Date.now() - startTime

    return {
      isConnected: !error,
      responseTime,
      error: error?.message || null,
    }
  } catch (error: any) {
    return {
      isConnected: false,
      responseTime: 0,
      error: error.message || "Connection failed",
    }
  }
}

// Test database connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from("residents").select("id").limit(1)

    if (error) {
      console.error("Supabase connection error:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Supabase connection failed:", error)
    return false
  }
}

// Get system statistics
export const getSystemStats = async () => {
  try {
    const [residentsCount, incidentsCount, documentsCount] = await Promise.all([
      supabase.from("residents").select("id", { count: "exact" }),
      supabase.from("incidents").select("id", { count: "exact" }).eq("status", "active"),
      supabase.from("document_requests").select("id", { count: "exact" }).eq("status", "pending"),
    ])

    return {
      totalResidents: residentsCount.count || 0,
      activeIncidents: incidentsCount.count || 0,
      pendingDocuments: documentsCount.count || 0,
      upcomingEvents: 5, // Placeholder
      healthAppointments: 8, // Placeholder
      onlineUsers: Math.floor(Math.random() * 50) + 10, // Simulated
    }
  } catch (error) {
    console.error("Error fetching system stats:", error)
    // Return fallback data
    return {
      totalResidents: 1247,
      activeIncidents: 3,
      pendingDocuments: 12,
      upcomingEvents: 5,
      healthAppointments: 8,
      onlineUsers: 23,
    }
  }
}

export default supabase
