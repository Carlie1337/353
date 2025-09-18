import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks for development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create client with error handling
let supabase: ReturnType<typeof createClient> | null = null

try {
  if (supabaseUrl && supabaseAnonKey) {
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      db: {
        schema: "public",
      },
      global: {
        headers: {
          "X-Client-Info": "barangay-system",
        },
      },
    })
  } else {
    console.warn("Supabase environment variables not found. Some features may not work.")
  }
} catch (error) {
  console.error("Failed to initialize Supabase client:", error)
}

// Export with null check
export { supabase }

export function getSupabaseClient() {
  if (!supabase) {
    throw new Error("Supabase client not initialized. Check your environment variables.")
  }
  return supabase
}

export default supabase
