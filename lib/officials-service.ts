import { supabase } from "./supabase-client"

export interface BarangayOfficial {
  id: string
  name: string
  position: string
  contact_number?: string
  email?: string
  photo_url?: string
  term_start: string
  term_end: string
  status: "active" | "inactive"
  created_at: string
}

// Fallback data for when database is unavailable
const FALLBACK_OFFICIALS: BarangayOfficial[] = [
  {
    id: "1",
    name: "Hon. Maria Elena Santos",
    position: "Barangay Captain",
    contact_number: "+63 917 123 4567",
    email: "captain@barangay.gov.ph",
    photo_url: "/placeholder-user.jpg",
    term_start: "2023-01-01",
    term_end: "2025-12-31",
    status: "active",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Hon. Roberto Cruz",
    position: "Barangay Kagawad",
    contact_number: "+63 917 234 5678",
    email: "kagawad1@barangay.gov.ph",
    photo_url: "/placeholder-user.jpg",
    term_start: "2023-01-01",
    term_end: "2025-12-31",
    status: "active",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "Hon. Ana Reyes",
    position: "Barangay Kagawad",
    contact_number: "+63 917 345 6789",
    email: "kagawad2@barangay.gov.ph",
    photo_url: "/placeholder-user.jpg",
    term_start: "2023-01-01",
    term_end: "2025-12-31",
    status: "active",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "Hon. Jose Martinez",
    position: "Barangay Secretary",
    contact_number: "+63 917 456 7890",
    email: "secretary@barangay.gov.ph",
    photo_url: "/placeholder-user.jpg",
    term_start: "2023-01-01",
    term_end: "2025-12-31",
    status: "active",
    created_at: "2023-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "Hon. Carmen Lopez",
    position: "Barangay Treasurer",
    contact_number: "+63 917 567 8901",
    email: "treasurer@barangay.gov.ph",
    photo_url: "/placeholder-user.jpg",
    term_start: "2023-01-01",
    term_end: "2025-12-31",
    status: "active",
    created_at: "2023-01-01T00:00:00Z",
  },
]

class OfficialsService {
  async getAllOfficials(): Promise<BarangayOfficial[]> {
    try {
      // Test database connection first
      const { error: connectionError } = await supabase.from("barangay_officials").select("count").limit(1).single()

      if (connectionError) {
        console.warn("Database connection failed, using fallback data:", connectionError.message)
        return FALLBACK_OFFICIALS
      }

      // Fetch real data from database
      const { data, error } = await supabase
        .from("barangay_officials")
        .select("*")
        .eq("status", "active")
        .order("position", { ascending: true })

      if (error) {
        console.warn("Error fetching officials from database, using fallback data:", error.message)
        return FALLBACK_OFFICIALS
      }

      // Return database data if available, otherwise fallback
      return data && data.length > 0 ? data : FALLBACK_OFFICIALS
    } catch (error) {
      console.error("Error in getAllOfficials:", error)
      // Always return fallback data on any error
      return FALLBACK_OFFICIALS
    }
  }

  async getOfficialById(id: string): Promise<BarangayOfficial | null> {
    try {
      const { data, error } = await supabase.from("barangay_officials").select("*").eq("id", id).single()

      if (error) {
        // Try to find in fallback data
        return FALLBACK_OFFICIALS.find((official) => official.id === id) || null
      }

      return data
    } catch (error) {
      console.error("Error fetching official by ID:", error)
      return FALLBACK_OFFICIALS.find((official) => official.id === id) || null
    }
  }

  async createOfficial(official: Omit<BarangayOfficial, "id" | "created_at">): Promise<BarangayOfficial | null> {
    try {
      const { data, error } = await supabase.from("barangay_officials").insert(official).select().single()

      if (error) throw error

      return data
    } catch (error) {
      console.error("Error creating official:", error)
      return null
    }
  }

  async updateOfficial(id: string, updates: Partial<BarangayOfficial>): Promise<BarangayOfficial | null> {
    try {
      const { data, error } = await supabase.from("barangay_officials").update(updates).eq("id", id).select().single()

      if (error) throw error

      return data
    } catch (error) {
      console.error("Error updating official:", error)
      return null
    }
  }

  async deleteOfficial(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("barangay_officials").delete().eq("id", id)

      return !error
    } catch (error) {
      console.error("Error deleting official:", error)
      return false
    }
  }
}

export const officialsService = new OfficialsService()
