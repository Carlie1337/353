import { createClient } from "@supabase/supabase-js"

// Environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Validate environment variables
if (!supabaseUrl) {
  console.warn("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
}

if (!supabaseAnonKey) {
  console.warn("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable")
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Health check function
export async function getSupabaseHealth() {
  const startTime = Date.now()

  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        isConnected: false,
        error: "Missing Supabase configuration",
        responseTime: 0,
      }
    }

    // Simple query to test connection
    const { error } = await supabase.from("users").select("count").limit(1).single()

    const responseTime = Date.now() - startTime

    return {
      isConnected: !error,
      error: error?.message || null,
      responseTime,
    }
  } catch (error: any) {
    return {
      isConnected: false,
      error: error.message || "Connection failed",
      responseTime: Date.now() - startTime,
    }
  }
}

// Test connection on module load
getSupabaseHealth().then((health) => {
  if (!health.isConnected) {
    console.warn("Supabase connection test failed:", health.error)
  } else {
    console.log(`Supabase connected successfully (${health.responseTime}ms)`)
  }
})

export default supabase
