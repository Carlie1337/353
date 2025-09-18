import { supabase } from "./supabase-client"

export interface User {
  id: string
  email: string
  full_name: string
  role: string
  status: string
}

export interface AuthResponse {
  user: User | null
  error: string | null
}

// Demo accounts for testing
const DEMO_ACCOUNTS = {
  admin: {
    email: "admin@barangay.gov.ph",
    password: "admin123",
    user: {
      id: "demo-admin-1",
      email: "admin@barangay.gov.ph",
      full_name: "System Administrator",
      role: "admin",
      status: "active",
    },
  },
  resident: {
    email: "resident@example.com",
    password: "resident123",
    user: {
      id: "demo-resident-1",
      email: "resident@example.com",
      full_name: "Juan Dela Cruz",
      role: "resident",
      status: "active",
    },
  },
  health: {
    email: "health@barangay.gov.ph",
    password: "health123",
    user: {
      id: "demo-health-1",
      email: "health@barangay.gov.ph",
      full_name: "Dr. Maria Santos",
      role: "health_worker",
      status: "active",
    },
  },
  tanod: {
    email: "tanod@barangay.gov.ph",
    password: "tanod123",
    user: {
      id: "demo-tanod-1",
      email: "tanod@barangay.gov.ph",
      full_name: "Pedro Reyes",
      role: "tanod",
      status: "active",
    },
  },
}

export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    // Check demo accounts first
    const demoAccount = Object.values(DEMO_ACCOUNTS).find(
      (account) => account.email === email && account.password === password,
    )

    if (demoAccount) {
      return {
        user: demoAccount.user,
        error: null,
      }
    }

    // Try Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return {
        user: null,
        error: error.message,
      }
    }

    if (!data.user) {
      return {
        user: null,
        error: "Authentication failed",
      }
    }

    // Get user profile from database
    const { data: profile, error: profileError } = await supabase.from("users").select("*").eq("email", email).single()

    if (profileError || !profile) {
      return {
        user: null,
        error: "User profile not found",
      }
    }

    return {
      user: {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role,
        status: profile.status,
      },
      error: null,
    }
  } catch (error: any) {
    return {
      user: null,
      error: error.message || "Sign in failed",
    }
  }
}

export async function adminSignIn(email: string, password: string): Promise<AuthResponse> {
  const result = await signIn(email, password)

  if (result.user && !["admin", "super_admin"].includes(result.user.role)) {
    return {
      user: null,
      error: "Insufficient permissions for admin access",
    }
  }

  return result
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    const { data: profile } = await supabase.from("users").select("*").eq("email", user.email).single()

    if (!profile) return null

    return {
      id: profile.id,
      email: profile.email,
      full_name: profile.full_name,
      role: profile.role,
      status: profile.status,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

export async function resetPassword(email: string): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })

    return { error: error?.message || null }
  } catch (error: any) {
    return { error: error.message || "Password reset failed" }
  }
}

export async function signOut(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    return { error: error?.message || null }
  } catch (error: any) {
    return { error: error.message || "Sign out failed" }
  }
}

// Auth service object for backward compatibility
export const authService = {
  signIn,
  adminSignIn,
  getCurrentUser,
  resetPassword,
  signOut,
}
