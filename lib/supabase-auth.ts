import { supabase } from "./supabase-client"

export interface User {
  id: string
  email: string
  name: string
  role: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  contactNumber: string
}

// Demo accounts for testing
const DEMO_ACCOUNTS = {
  "demo@resident.com": {
    id: "demo-resident-001",
    email: "demo@resident.com",
    name: "Demo Resident",
    role: "resident",
    password: "demo123",
  },
  "demo@admin.com": {
    id: "demo-admin-001",
    email: "demo@admin.com",
    name: "Demo Admin",
    role: "admin",
    password: "admin123",
  },
  "demo@health.com": {
    id: "demo-health-001",
    email: "demo@health.com",
    name: "Demo Health Worker",
    role: "health_worker",
    password: "health123",
  },
  "demo@tanod.com": {
    id: "demo-tanod-001",
    email: "demo@tanod.com",
    name: "Demo Tanod",
    role: "tanod",
    password: "tanod123",
  },
  "demo@official.com": {
    id: "demo-official-001",
    email: "demo@official.com",
    name: "Demo Official",
    role: "barangay_official",
    password: "official123",
  },
  "demo@superadmin.com": {
    id: "demo-superadmin-001",
    email: "demo@superadmin.com",
    name: "Demo Super Admin",
    role: "superadmin",
    password: "superadmin123",
  },
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User | null; error: string | null }> {
    try {
      // Check for demo accounts first
      const demoAccount = DEMO_ACCOUNTS[credentials.email as keyof typeof DEMO_ACCOUNTS]
      if (demoAccount && demoAccount.password === credentials.password) {
        // Store demo session in localStorage
        localStorage.setItem(
          "demo_user",
          JSON.stringify({
            id: demoAccount.id,
            email: demoAccount.email,
            name: demoAccount.name,
            role: demoAccount.role,
          }),
        )

        return {
          user: {
            id: demoAccount.id,
            email: demoAccount.email,
            name: demoAccount.name,
            role: demoAccount.role,
          },
          error: null,
        }
      }

      // Try real authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (error) {
        return { user: null, error: error.message }
      }

      if (!data.user) {
        return { user: null, error: "Login failed" }
      }

      // Get user role and resident info
      const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", data.user.id).single()

      const { data: residentData } = await supabase
        .from("residents")
        .select("first_name, last_name")
        .eq("user_id", data.user.id)
        .single()

      const userName = residentData
        ? `${residentData.first_name} ${residentData.last_name}`
        : data.user.email?.split("@")[0] || "User"

      return {
        user: {
          id: data.user.id,
          email: data.user.email!,
          name: userName,
          role: roleData?.role || "resident",
        },
        error: null,
      }
    } catch (error: any) {
      return { user: null, error: error.message || "An unexpected error occurred" }
    }
  },

  async logout(): Promise<{ error: string | null }> {
    try {
      // Clear demo session
      localStorage.removeItem("demo_user")

      // Sign out from Supabase
      const { error } = await supabase.auth.signOut()
      return { error: error?.message || null }
    } catch (error: any) {
      return { error: error.message || "Logout failed" }
    }
  },

  async register(data: RegisterData): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      })

      if (authError) {
        return { user: null, error: authError.message }
      }

      if (!authData.user) {
        return { user: null, error: "Registration failed" }
      }

      // Create resident record
      const { error: residentError } = await supabase.from("residents").insert({
        user_id: authData.user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        contact_number: data.contactNumber,
      })

      if (residentError) {
        return { user: null, error: "Failed to create resident profile" }
      }

      // Assign resident role
      const { error: roleError } = await supabase.from("user_roles").insert({
        user_id: authData.user.id,
        role: "resident",
      })

      if (roleError) {
        return { user: null, error: "Failed to assign user role" }
      }

      return {
        user: {
          id: authData.user.id,
          email: authData.user.email!,
          name: `${data.firstName} ${data.lastName}`,
          role: "resident",
        },
        error: null,
      }
    } catch (error: any) {
      return { user: null, error: error.message || "Registration failed" }
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      // Check for demo user first
      const demoUser = localStorage.getItem("demo_user")
      if (demoUser) {
        return JSON.parse(demoUser)
      }

      // Check Supabase session
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return null

      // Get user role and resident info
      const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", user.id).single()

      const { data: residentData } = await supabase
        .from("residents")
        .select("first_name, last_name")
        .eq("user_id", user.id)
        .single()

      const userName = residentData
        ? `${residentData.first_name} ${residentData.last_name}`
        : user.email?.split("@")[0] || "User"

      return {
        id: user.id,
        email: user.email!,
        name: userName,
        role: roleData?.role || "resident",
      }
    } catch (error) {
      console.error("Error getting current user:", error)
      return null
    }
  },
}

// Named exports for compatibility
export async function getCurrentUser(): Promise<User | null> {
  return authService.getCurrentUser()
}

export async function signIn(credentials: LoginCredentials): Promise<{ user: User | null; error: string | null }> {
  return authService.login(credentials)
}

export async function adminSignIn(credentials: LoginCredentials): Promise<{ user: User | null; error: string | null }> {
  // Admin sign in with role validation
  const result = await authService.login(credentials)

  if (result.user && !["admin", "superadmin", "barangay_official"].includes(result.user.role)) {
    return { user: null, error: "Insufficient permissions for admin access" }
  }

  return result
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
