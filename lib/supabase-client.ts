import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Missing Supabase environment variables. Some features may not work.")
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
)

export interface SupabaseHealth {
  isConnected: boolean
  responseTime?: number
  error?: string
}

export async function getSupabaseHealth(): Promise<SupabaseHealth> {
  const startTime = Date.now()

  try {
    const { error } = await supabase.from("users").select("count").limit(1).single()

    return {
      isConnected: !error,
      responseTime: Date.now() - startTime,
      error: error?.message,
    }
  } catch (error: any) {
    return {
      isConnected: false,
      responseTime: Date.now() - startTime,
      error: error.message,
    }
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from("users").select("count").limit(1)
    return !error
  } catch {
    return false
  }
}
