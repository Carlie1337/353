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
      contact_number: "(082) 123-4567",
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
      position: "Barangay Kagawad - Committee on Peace and Order",
      contact_number: "(082) 123-4568",
      email: "kagawad1@barangay.gov.ph",
      photo_url: "/placeholder.svg?height=80&width=80",
      status: "active",
      term_start: "2023-01-01",
      term_end: "2025-12-31",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Hon. Ana Reyes",
      position: "Barangay Kagawad - Committee on Health",
      contact_number: "(082) 123-4569",
      email: "kagawad2@barangay.gov.ph",
      photo_url: "/placeholder.svg?height=80&width=80",
      status: "active",
      term_start: "2023-01-01",
      term_end: "2025-12-31",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      name: "Hon. Pedro Garcia",
      position: "Barangay Kagawad - Committee on Infrastructure",
      contact_number: "(082) 123-4570",
      email: "kagawad3@barangay.gov.ph",
      photo_url: "/placeholder.svg?height=80&width=80",
      status: "active",
      term_start: "2023-01-01",
      term_end: "2025-12-31",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "5",
      name: "Hon. Rosa Martinez",
      position: "Barangay Secretary",
      contact_number: "(082) 123-4571",
      email: "secretary@barangay.gov.ph",
      photo_url: "/placeholder.svg?height=80&width=80",
      status: "active",
      term_start: "2023-01-01",
      term_end: "2025-12-31",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]

  async getAllOfficials(): Promise<BarangayOfficial[]> {
    try {
      // Test connection first
      const { data: testData, error: testError } = await supabase
        .from("barangay_officials")
        .select("count")
        .limit(1)
        .single()

      if (testError) {
        console.warn("Database connection failed, using fallback data:", testError.message)
        return this.fallbackOfficials
      }

      // Fetch real data
      const { data, error } = await supabase
        .from("barangay_officials")
        .select("*")
        .eq("status", "active")
        .order("position", { ascending: true })

      if (error) {
        console.warn("Error fetching officials from database:", error.message)
        return this.fallbackOfficials
      }

      // Return real data if available, otherwise fallback
      return data && data.length > 0 ? data : this.fallbackOfficials
    } catch (error: any) {
      console.warn("Officials service error:", error.message)
      return this.fallbackOfficials
    }
  }

  async getOfficialById(id: string): Promise<BarangayOfficial | null> {
    try {
      const { data, error } = await supabase.from("barangay_officials").select("*").eq("id", id).single()

      if (error) {
        // Try fallback data
        const fallbackOfficial = this.fallbackOfficials.find((official) => official.id === id)
        return fallbackOfficial || null
      }

      return data
    } catch (error: any) {
      console.warn("Error fetching official by ID:", error.message)
      const fallbackOfficial = this.fallbackOfficials.find((official) => official.id === id)
      return fallbackOfficial || null
    }
  }

  async createOfficial(officialData: Omit<BarangayOfficial, "id" | "created_at" | "updated_at">): Promise<{
    data: BarangayOfficial | null
    error: string | null
  }> {
    try {
      const { data, error } = await supabase
        .from("barangay_officials")
        .insert([
          {
            ...officialData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ])
        .select()
        .single()

      if (error) {
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  async updateOfficial(
    id: string,
    updates: Partial<Omit<BarangayOfficial, "id" | "created_at">>,
  ): Promise<{
    data: BarangayOfficial | null
    error: string | null
  }> {
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

      if (error) {
        return { data: null, error: error.message }
      }

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  async deleteOfficial(id: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.from("barangay_officials").delete().eq("id", id)

      if (error) {
        return { error: error.message }
      }

      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  getFallbackOfficials(): BarangayOfficial[] {
    return this.fallbackOfficials
  }
}

export const officialsService = new OfficialsService()
export default officialsService
