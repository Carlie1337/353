import { supabase } from "./supabase-client"

export interface AuthUser {
  id: string
  email: string
  full_name?: string
  role: string
  status: string
  created_at: string
}

export interface SignInCredentials {
  email: string
  password: string
}

export interface AdminSignInCredentials extends SignInCredentials {
  role?: string
}

// Demo accounts for testing
const DEMO_ACCOUNTS = {
  admin: {
    email: "admin@barangay.gov.ph",
    password: "admin123",
    role: "admin",
    full_name: "System Administrator",
  },
  resident: {
    email: "resident@example.com",
    password: "resident123",
    role: "resident",
    full_name: "Juan Dela Cruz",
  },
  health: {
    email: "health@barangay.gov.ph",
    password: "health123",
    role: "health_worker",
    full_name: "Dr. Maria Santos",
  },
  tanod: {
    email: "tanod@barangay.gov.ph",
    password: "tanod123",
    role: "tanod",
    full_name: "Pedro Reyes",
  },
  official: {
    email: "official@barangay.gov.ph",
    password: "official123",
    role: "official",
    full_name: "Hon. Ana Garcia",
  },
}

class AuthService {
  async signIn(credentials: SignInCredentials): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { email, password } = credentials

      // Check demo accounts first
      const demoAccount = Object.values(DEMO_ACCOUNTS).find((account) => account.email === email)
      if (demoAccount && demoAccount.password === password) {
        const user: AuthUser = {
          id: `demo_${demoAccount.role}`,
          email: demoAccount.email,
          full_name: demoAccount.full_name,
          role: demoAccount.role,
          status: "active",
          created_at: new Date().toISOString(),
        }
        return { user, error: null }
      }

      // Try Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return { user: null, error: error.message }
      }

      if (!data.user) {
        return { user: null, error: "Authentication failed" }
      }

      // Get user profile from database
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single()

      if (profileError) {
        console.warn("Could not fetch user profile:", profileError)
        // Create basic user object from auth data
        const user: AuthUser = {
          id: data.user.id,
          email: data.user.email || email,
          full_name: data.user.user_metadata?.full_name || "User",
          role: "resident",
          status: "active",
          created_at: data.user.created_at || new Date().toISOString(),
        }
        return { user, error: null }
      }

      const user: AuthUser = {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role || "resident",
        status: profile.status || "active",
        created_at: profile.created_at,
      }

      return { user, error: null }
    } catch (error: any) {
      return { user: null, error: error.message || "Sign in failed" }
    }
  }

  async adminSignIn(credentials: AdminSignInCredentials): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { email, password, role } = credentials

      // Check demo admin accounts
      const demoAccount = Object.values(DEMO_ACCOUNTS).find(
        (account) => account.email === email && (role ? account.role === role : true),
      )

      if (demoAccount && demoAccount.password === password) {
        // Validate admin roles
        const adminRoles = ["admin", "health_worker", "tanod", "official"]
        if (!adminRoles.includes(demoAccount.role)) {
          return { user: null, error: "Insufficient privileges" }
        }

        const user: AuthUser = {
          id: `demo_${demoAccount.role}`,
          email: demoAccount.email,
          full_name: demoAccount.full_name,
          role: demoAccount.role,
          status: "active",
          created_at: new Date().toISOString(),
        }
        return { user, error: null }
      }

      // Try regular sign in first
      const signInResult = await this.signIn({ email, password })

      if (signInResult.error || !signInResult.user) {
        return signInResult
      }

      // Validate admin privileges
      const adminRoles = ["admin", "health_worker", "tanod", "official", "super_admin"]
      if (!adminRoles.includes(signInResult.user.role)) {
        return { user: null, error: "Insufficient privileges for admin access" }
      }

      // If role is specified, validate it matches
      if (role && signInResult.user.role !== role) {
        return { user: null, error: `Access denied for role: ${role}` }
      }

      return signInResult
    } catch (error: any) {
      return { user: null, error: error.message || "Admin sign in failed" }
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser()

      if (error || !user) {
        return null
      }

      // Get user profile from database
      const { data: profile, error: profileError } = await supabase.from("users").select("*").eq("id", user.id).single()

      if (profileError) {
        console.warn("Could not fetch user profile:", profileError)
        // Return basic user info from auth
        return {
          id: user.id,
          email: user.email || "",
          full_name: user.user_metadata?.full_name || "User",
          role: "resident",
          status: "active",
          created_at: user.created_at || new Date().toISOString(),
        }
      }

      return {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: profile.role || "resident",
        status: profile.status || "active",
        created_at: profile.created_at,
      }
    } catch (error: any) {
      console.error("Error getting current user:", error)
      return null
    }
  }

  async resetPassword(email: string): Promise<{ success: boolean; error: string | null }> {
    try {
      // Check if it's a demo account
      const demoAccount = Object.values(DEMO_ACCOUNTS).find((account) => account.email === email)
      if (demoAccount) {
        return {
          success: true,
          error: null,
        }
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        return { success: false, error: error.message }
      }

      return { success: true, error: null }
    } catch (error: any) {
      return { success: false, error: error.message || "Password reset failed" }
    }
  }

  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      return { error: error?.message || null }
    } catch (error: any) {
      return { error: error.message || "Sign out failed" }
    }
  }

  async signUp(userData: {
    email: string
    password: string
    full_name: string
    phone?: string
    address?: string
  }): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { email, password, full_name, phone, address } = userData

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
            phone,
            address,
          },
        },
      })

      if (error) {
        return { user: null, error: error.message }
      }

      if (!data.user) {
        return { user: null, error: "Registration failed" }
      }

      // Create user profile in database
      const { error: profileError } = await supabase.from("users").insert([
        {
          id: data.user.id,
          email,
          full_name,
          phone,
          address,
          role: "resident",
          status: "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])

      if (profileError) {
        console.warn("Could not create user profile:", profileError)
      }

      const user: AuthUser = {
        id: data.user.id,
        email,
        full_name,
        role: "resident",
        status: "active",
        created_at: data.user.created_at || new Date().toISOString(),
      }

      return { user, error: null }
    } catch (error: any) {
      return { user: null, error: error.message || "Registration failed" }
    }
  }

  getDemoAccounts() {
    return DEMO_ACCOUNTS
  }
}

// Create service instance
const authService = new AuthService()

// Export named functions
export const signIn = (credentials: SignInCredentials) => authService.signIn(credentials)
export const adminSignIn = (credentials: AdminSignInCredentials) => authService.adminSignIn(credentials)
export const getCurrentUser = () => authService.getCurrentUser()
export const resetPassword = (email: string) => authService.resetPassword(email)
export const signOut = () => authService.signOut()
export const signUp = (userData: any) => authService.signUp(userData)

// Export service instance as default
export default authService
