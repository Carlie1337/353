import { supabase } from "./supabase-client"

export interface BarangayOfficial {
  id: string
  name: string
  position: string
  contact_number?: string
  email?: string
  photo_url?: string
  status: "active" | "inactive"
  term_start?: string
  term_end?: string
  created_at: string
  updated_at: string
}

class OfficialsService {
  private fallbackOfficials: BarangayOfficial[] = [
    {
      id: "1",
      name: "Hon. Maria Santos",
      position: "Barangay Captain",
      contact_number: "+63 912 345 6789",
      email: "captain@barangay.gov.ph",
      photo_url: "/placeholder.svg?height=120&width=120",
      status: "active",
      term_start: "2023-01-01",
      term_end: "2025-12-31",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Hon. Juan Dela Cruz",
      position: "Barangay Kagawad",
      contact_number: "+63 912 345 6790",
      email: "kagawad1@barangay.gov.ph",
      photo_url: "/placeholder.svg?height=120&width=120",
      status: "active",
      term_start: "2023-01-01",
      term_end: "2025-12-31",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Hon. Ana Reyes",
      position: "Barangay Kagawad",
      contact_number: "+63 912 345 6791",
      email: "kagawad2@barangay.gov.ph",
      photo_url: "/placeholder.svg?height=120&width=120",
      status: "active",
      term_start: "2023-01-01",
      term_end: "2025-12-31",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Pedro Martinez",
      position: "Barangay Secretary",
      contact_number: "+63 912 345 6792",
      email: "secretary@barangay.gov.ph",
      photo_url: "/placeholder.svg?height=120&width=120",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Rosa Garcia",
      position: "Barangay Treasurer",
      contact_number: "+63 912 345 6793",
      email: "treasurer@barangay.gov.ph",
      photo_url: "/placeholder.svg?height=120&width=120",
      status: "active",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  async getAllOfficials(): Promise<BarangayOfficial[]> {
    try {
      const { data, error } = await supabase
        .from("barangay_officials")
        .select("*")
        .eq("status", "active")
        .order("position", { ascending: true })

      if (error) {
        console.warn("Database error, using fallback officials:", error.message)
        return this.fallbackOfficials
      }

      return data && data.length > 0 ? data : this.fallbackOfficials
    } catch (error: any) {
      console.warn("Error fetching officials, using fallback data:", error.message)
      return this.fallbackOfficials
    }
  }

  async getOfficialById(id: string): Promise<BarangayOfficial | null> {
    try {
      const { data, error } = await supabase.from("barangay_officials").select("*").eq("id", id).single()

      if (error) {
        const fallback = this.fallbackOfficials.find((o) => o.id === id)
        return fallback || null
      }

      return data
    } catch (error) {
      const fallback = this.fallbackOfficials.find((o) => o.id === id)
      return fallback || null
    }
  }

  async createOfficial(
    official: Omit<BarangayOfficial, "id" | "created_at" | "updated_at">,
  ): Promise<BarangayOfficial | null> {
    try {
      const { data, error } = await supabase
        .from("barangay_officials")
        .insert([
          {
            ...official,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) throw error

      return data
    } catch (error: any) {
      console.error("Error creating official:", error.message)
      return null
    }
  }

  async updateOfficial(id: string, updates: Partial<BarangayOfficial>): Promise<BarangayOfficial | null> {
    try {
      const { data, error } = await supabase
        .from("barangay_officials")
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      return data
    } catch (error: any) {
      console.error("Error updating official:", error.message)
      return null
    }
  }

  async deleteOfficial(id: string): Promise<boolean> {
    try {
      const { error } = await supabase.from("barangay_officials").delete().eq("id", id)

      return !error
    } catch (error: any) {
      console.error("Error deleting official:", error.message)
      return false
    }
  }

  getFallbackOfficials(): BarangayOfficial[] {
    return this.fallbackOfficials
  }
}

export const officialsService = new OfficialsService()
export default officialsService
