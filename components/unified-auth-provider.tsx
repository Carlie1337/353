"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { supabase } from "@/lib/supabase-client"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  department?: string
  avatar?: string
  permissions?: string[]
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signUp: (email: string, password: string, userData: Partial<AuthUser>) => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    // Return default values for SSR compatibility
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      signIn: async () => ({ data: null, error: { message: "Auth not available" } }),
      signUp: async () => ({ data: null, error: { message: "Auth not available" } }),
      signOut: async () => ({ error: { message: "Auth not available" } }),
      refreshUser: async () => {},
    }
  }
  return context
}

interface UnifiedAuthProviderProps {
  children: ReactNode
}

export function UnifiedAuthProvider({ children }: UnifiedAuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = async () => {
    if (!supabase) {
      setIsLoading(false)
      return
    }

    try {
      const {
        data: { user: authUser },
        error,
      } = await supabase.auth.getUser()

      if (error || !authUser) {
        setUser(null)
        setIsLoading(false)
        return
      }

      // Get user profile from database
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authUser.id)
        .single()

      if (profileError) {
        // If profile doesn't exist, create a basic user object
        const basicUser: AuthUser = {
          id: authUser.id,
          email: authUser.email || "",
          name: authUser.user_metadata?.name || "User",
          role: "user",
          permissions: ["read"],
        }
        setUser(basicUser)
      } else {
        const fullUser: AuthUser = {
          id: authUser.id,
          email: authUser.email || "",
          name: profile.name || "User",
          role: profile.role || "user",
          department: profile.department || undefined,
          avatar: profile.avatar_url || undefined,
          permissions: profile.permissions || ["read"],
        }
        setUser(fullUser)
      }
    } catch (error) {
      console.error("Error refreshing user:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!supabase) {
      setIsLoading(false)
      return
    }

    // Initial user load
    refreshUser()

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        try {
          const { data: profile } = await supabase.from("users").select("*").eq("id", session.user.id).single()

          const authUser: AuthUser = {
            id: session.user.id,
            email: session.user.email || "",
            name: profile?.name || session.user.user_metadata?.name || "User",
            role: profile?.role || "user",
            department: profile?.department || undefined,
            avatar: profile?.avatar_url || undefined,
            permissions: profile?.permissions || ["read"],
          }
          setUser(authUser)
        } catch (error) {
          // Create basic user if profile fetch fails
          const basicUser: AuthUser = {
            id: session.user.id,
            email: session.user.email || "",
            name: session.user.user_metadata?.name || "User",
            role: "user",
            permissions: ["read"],
          }
          setUser(basicUser)
        }
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { data: null, error: { message: "Supabase not available" } }
    }

    setIsLoading(true)
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
      return { data: null, error: { message: "Sign in failed" } }
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData: Partial<AuthUser>) => {
    if (!supabase) {
      return { data: null, error: { message: "Supabase not available" } }
    }

    setIsLoading(true)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name || "User",
          },
        },
      })

      if (error) {
        return { data: null, error }
      }

      // Create user profile if signup successful
      if (data.user) {
        await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email || "",
          name: userData.name || "User",
          role: userData.role || "user",
          department: userData.department || null,
          avatar_url: userData.avatar || null,
          permissions: ["read"],
        })
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error: { message: "Sign up failed" } }
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    if (!supabase) {
      return { error: { message: "Supabase not available" } }
    }

    setIsLoading(true)
    try {
      const { error } = await supabase.auth.signOut()
      setUser(null)
      return { error }
    } catch (error) {
      return { error: { message: "Sign out failed" } }
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
