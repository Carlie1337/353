import { supabase } from "./supabase-client"
import type { User } from "@supabase/supabase-js"

export interface UserProfile {
  id: string
  email: string
  name: string
  role: "resident" | "health_worker" | "tanod" | "barangay_official" | "admin" | "superadmin"
  department?: string
  avatar_url?: string
  phone?: string
  address?: string
  created_at: string
  updated_at: string
}

export interface AuthResponse {
  user: User | null
  profile: UserProfile | null
  error: string | null
}

export async function signIn(email: string, password: string): Promise<{ data: any; error: any }> {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { data: null, error }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: { message: "An unexpected error occurred" } }
  }
}

export async function signUp(
  email: string,
  password: string,
  userData: Partial<UserProfile>,
): Promise<{ data: any; error: any }> {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: userData.name,
          role: userData.role || "resident",
        },
      },
    })

    if (error) {
      return { data: null, error }
    }

    // Create user profile
    if (data.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email: data.user.email!,
        name: userData.name!,
        role: userData.role || "resident",
        department: userData.department,
        phone: userData.phone,
        address: userData.address,
      })

      if (profileError) {
        console.error("Error creating profile:", profileError)
      }
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error: { message: "An unexpected error occurred" } }
  }
}

export async function signOut(): Promise<{ error: any }> {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser(): Promise<AuthResponse> {
  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return { user: null, profile: null, error: authError?.message || "No user found" }
    }

    const { data: profile, error: profileError } = await supabase.from("users").select("*").eq("id", user.id).single()

    if (profileError) {
      return { user, profile: null, error: profileError.message }
    }

    return { user, profile, error: null }
  } catch (error) {
    return { user: null, profile: null, error: "Failed to get current user" }
  }
}

export async function updateProfile(userId: string, updates: Partial<UserProfile>): Promise<{ data: any; error: any }> {
  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId)
      .select()
      .single()

    return { data, error }
  } catch (error) {
    return { data: null, error: { message: "Failed to update profile" } }
  }
}

export async function resetPassword(email: string): Promise<{ error: any }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  })
  return { error }
}

export function getRedirectPath(role: string): string {
  switch (role) {
    case "resident":
      return "/portal"
    case "health_worker":
      return "/health-portal"
    case "tanod":
      return "/tanod"
    case "barangay_official":
      return "/bms"
    case "admin":
      return "/admin"
    case "superadmin":
      return "/heartclif"
    default:
      return "/portal"
  }
}
