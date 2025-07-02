import { supabase } from "./supabase-client"

export interface Official {
  id: string
  name: string
  position: string
  description?: string
  contact_email?: string
  contact_phone?: string
  achievements?: string[]
  image_url?: string
  active: boolean
  created_at: string
  updated_at: string
}

class OfficialsService {
  async getAllOfficials() {
    try {
      const { data, error } = await supabase
        .from("barangay_officials")
        .select("*")
        .eq("active", true)
        .order("position", { ascending: true })

      if (error) throw error

      return { data: data || [], error: null }
    } catch (error: any) {
      console.error("Error fetching officials:", error)
      // Return fallback data
      return {
        data: [
          {
            id: "1",
            name: "Hon. Maria Santos",
            position: "Barangay Captain",
            description: "Leading our community with integrity and dedication to public service.",
            contact_email: "captain@barangaybucana.gov.ph",
            contact_phone: "(082) 123-4567",
            achievements: ["Community Development Award 2023", "Excellence in Governance"],
            image_url: "/placeholder.svg?height=120&width=120",
            active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "2",
            name: "Juan Dela Cruz",
            position: "Barangay Secretary",
            description: "Managing administrative functions and community records.",
            contact_email: "secretary@barangaybucana.gov.ph",
            contact_phone: "(082) 123-4568",
            achievements: ["Administrative Excellence Award"],
            image_url: "/placeholder.svg?height=120&width=120",
            active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          {
            id: "3",
            name: "Ana Reyes",
            position: "Barangay Treasurer",
            description: "Overseeing financial management and budget allocation.",
            contact_email: "treasurer@barangaybucana.gov.ph",
            contact_phone: "(082) 123-4569",
            achievements: ["Financial Management Certification"],
            image_url: "/placeholder.svg?height=120&width=120",
            active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ],
        error: null,
      }
    }
  }

  async getOfficialById(id: string) {
    try {
      const { data, error } = await supabase.from("barangay_officials").select("*").eq("id", id).single()

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  async createOfficial(officialData: Omit<Official, "id" | "created_at" | "updated_at">) {
    try {
      const { data, error } = await supabase.from("barangay_officials").insert([officialData]).select().single()

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  async updateOfficial(id: string, updates: Partial<Official>) {
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

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }

  async deleteOfficial(id: string) {
    try {
      const { error } = await supabase.from("barangay_officials").delete().eq("id", id)

      if (error) throw error

      return { error: null }
    } catch (error: any) {
      return { error: error.message }
    }
  }

  async deactivateOfficial(id: string) {
    try {
      const { data, error } = await supabase
        .from("barangay_officials")
        .update({
          active: false,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      return { data, error: null }
    } catch (error: any) {
      return { data: null, error: error.message }
    }
  }
}

const officialsService = new OfficialsService()
export default officialsService
