import { createClient } from "@supabase/supabase-js"

// Environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

// Validate environment variables
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn("Supabase environment variables are not properly configured. Using fallback values.")
}

// Create Supabase client with error handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      "X-Client-Info": "barangay-system@1.0.0",
    },
  },
})

// Test connection function
export async function testSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from("residents").select("count").limit(1).single()

    return !error
  } catch (error) {
    console.error("Supabase connection test failed:", error)
    return false
  }
}

// Health check function
export async function getSupabaseHealth(): Promise<{
  isConnected: boolean
  responseTime?: number
  error?: string
}> {
  const startTime = Date.now()

  try {
    const { error } = await supabase.from("residents").select("count").limit(1).single()

    const responseTime = Date.now() - startTime

    return {
      isConnected: !error,
      responseTime,
      error: error?.message,
    }
  } catch (error: any) {
    return {
      isConnected: false,
      error: error.message || "Connection failed",
    }
  }
}
