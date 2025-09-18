import { supabase } from "./supabase-client"

export interface AuthUser {
  id: string
  email: string
  role: string
  name: string
  department?: string
  permissions: string[]
}

// Demo accounts for testing
const demoAccounts = {
  admin: {
    email: "admin@barangay.gov.ph",
    password: "admin123",
    role: "admin",
    name: "System Administrator",
    department: "IT",
    permissions: ["all"],
  },
  captain: {
    email: "captain@barangay.gov.ph",
    password: "captain123",
    role: "captain",
    name: "Barangay Captain",
    department: "Executive",
    permissions: ["residents", "documents", "events", "reports"],
  },
  health: {
    email: "health@barangay.gov.ph",
    password: "health123",
    role: "health_worker",
    name: "Health Worker",
    department: "Health",
    permissions: ["health", "appointments", "medical_records"],
  },
  tanod: {
    email: "tanod@barangay.gov.ph",
    password: "tanod123",
    role: "tanod",
    name: "Barangay Tanod",
    department: "Security",
    permissions: ["incidents", "patrol", "blotter"],
  },
}

export const signIn = async (email: string, password: string): Promise<AuthUser | null> => {
  try {
    // Check demo accounts first
    const demoAccount = Object.values(demoAccounts).find(
      (account) => account.email === email && account.password === password,
    )

    if (demoAccount) {
      return {
        id: `demo-${demoAccount.role}`,
        email: demoAccount.email,
        role: demoAccount.role,
        name: demoAccount.name,
        department: demoAccount.department,
        permissions: demoAccount.permissions,
      }
    }

    // Try Supabase authentication
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Authentication error:", error)
      return null
    }

    if (data.user) {
      // Get user profile from database
      const { data: profile } = await supabase.from("user_profiles").select("*").eq("user_id", data.user.id).single()

      return {
        id: data.user.id,
        email: data.user.email!,
        role: profile?.role || "resident",
        name: profile?.full_name || "User",
        department: profile?.department,
        permissions: profile?.permissions || [],
      }
    }

    return null
  } catch (error) {
    console.error("Sign in error:", error)
    return null
  }
}

export const adminSignIn = async (email: string, password: string): Promise<AuthUser | null> => {
  // For admin login, check demo accounts and admin roles
  const user = await signIn(email, password)

  if (user && ["admin", "captain", "secretary"].includes(user.role)) {
    return user
  }

  return null
}

export const getCurrentUser = async (): Promise<AuthUser | null> => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return null

    // Get user profile
    const { data: profile } = await supabase.from("user_profiles").select("*").eq("user_id", user.id).single()

    return {
      id: user.id,
      email: user.email!,
      role: profile?.role || "resident",
      name: profile?.full_name || "User",
      department: profile?.department,
      permissions: profile?.permissions || [],
    }
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

export const signOut = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signOut()
    return !error
  } catch (error) {
    console.error("Sign out error:", error)
    return false
  }
}

export const resetPassword = async (email: string): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    return !error
  } catch (error) {
    console.error("Reset password error:", error)
    return false
  }
}

export const updateProfile = async (userId: string, updates: Partial<AuthUser>): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("user_profiles")
      .update({
        full_name: updates.name,
        role: updates.role,
        department: updates.department,
        permissions: updates.permissions,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userId)

    return !error
  } catch (error) {
    console.error("Update profile error:", error)
    return false
  }
}

// Check if user has specific permission
export const hasPermission = (user: AuthUser | null, permission: string): boolean => {
  if (!user) return false
  if (user.permissions.includes("all")) return true
  return user.permissions.includes(permission)
}

// Get demo account credentials for testing
export const getDemoCredentials = () => {
  return Object.entries(demoAccounts).map(([key, account]) => ({
    type: key,
    email: account.email,
    password: account.password,
    role: account.role,
    name: account.name,
  }))
}
