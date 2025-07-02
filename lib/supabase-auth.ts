import { supabase } from "./supabase-client"

export interface AuthUser {
  id: string
  email: string
  name: string
  role: string
  department?: string
  avatar?: string
  permissions?: string[]
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signUp(email: string, password: string, userData: Partial<AuthUser>) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: userData.name || "User",
      },
    },
  })

  if (data.user && !error) {
    // Create user profile
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

  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    return { user: null, error }
  }

  // Get user profile
  const { data: profile, error: profileError } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (profileError) {
    return {
      user: {
        id: user.id,
        email: user.email || "",
        name: user.user_metadata?.name || "User",
        role: "user",
        permissions: ["read"],
      },
      error: null,
    }
  }

  return {
    user: {
      id: user.id,
      email: user.email || "",
      name: profile.name || "User",
      role: profile.role || "user",
      department: profile.department || undefined,
      avatar: profile.avatar_url || undefined,
      permissions: profile.permissions || ["read"],
    },
    error: null,
  }
}

export async function adminSignIn(email: string, password: string) {
  const { data, error } = await signIn(email, password)

  if (error || !data.user) {
    return { data: null, error }
  }

  // Check if user has admin role
  const { data: profile } = await supabase.from("users").select("role").eq("id", data.user.id).single()

  if (profile?.role !== "admin" && profile?.role !== "superadmin") {
    await signOut()
    return {
      data: null,
      error: { message: "Insufficient permissions" },
    }
  }

  return { data, error }
}

export async function updateUserProfile(userId: string, updates: Partial<AuthUser>) {
  const { data, error } = await supabase.from("users").update(updates).eq("id", userId).select().single()

  return { data, error }
}

export async function resetPassword(email: string) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email)
  return { data, error }
}
