"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase-client"
import { getCurrentUser, type UserProfile } from "@/lib/supabase-auth"
import type { User } from "@supabase/supabase-js"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Get initial session
    getCurrentUser().then(({ user, profile, error }) => {
      setUser(user)
      setProfile(profile)
      setError(error)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { user, profile, error } = await getCurrentUser()
        setUser(user)
        setProfile(profile)
        setError(error)
      } else {
        setUser(null)
        setProfile(null)
        setError(null)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    profile,
    loading,
    error,
    isAuthenticated: !!user,
    isAdmin: profile?.role === "admin" || profile?.role === "superadmin",
    isHealthWorker: profile?.role === "health_worker",
    isTanod: profile?.role === "tanod",
    isOfficial: profile?.role === "barangay_official",
    isResident: profile?.role === "resident",
  }
}
