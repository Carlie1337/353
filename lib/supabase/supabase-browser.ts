"use client"

import { createClient } from "@supabase/supabase-js"

// Get environment variables with fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Only validate if we're not in development mode
if (typeof window !== "undefined" && supabaseUrl && supabaseAnonKey) {
  // Browser environment with valid credentials
} else if (typeof window !== "undefined") {
  console.warn("Supabase environment variables not found. Some features may not work.")
}

// Create the Supabase client with fallbacks
export const createBrowserClient = () => {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Singleton pattern for browser client
let browserClient: ReturnType<typeof createBrowserClient> | null = null

export const getBrowserClient = () => {
  if (!browserClient) {
    browserClient = createBrowserClient()
  }
  return browserClient
}

// Create and export the default client
export const supabaseBrowser = createBrowserClient()

// Default export for compatibility
export default supabaseBrowser
