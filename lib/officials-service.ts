export interface BarangayOfficial {
  id: string
  name: string
  position: string
  contact_number?: string
  email?: string
  photo_url?: string
  status: "active" | "inactive"
  term_start: string
  term_end?: string
  department?: string
}

class OfficialsService {
  private fallbackOfficials: BarangayOfficial[] = [
    {
      id: "1",
      name: "Maria Santos",
      position: "Barangay Captain",
      contact_number: "+63 917 123 4567",
      email: "captain@barangaybucana.gov.ph",
      photo_url: "/placeholder-user.jpg",
      status: "active",
      term_start: "2023-01-01",
      term_end: "2026-01-01",
      department: "Executive",
    },
    {
      id: "2",
      name: "Juan Cruz",
      position: "Barangay Secretary",
      contact_number: "+63 917 234 5678",
      email: "secretary@barangaybucana.gov.ph",
      photo_url: "/placeholder-user.jpg",
      status: "active",
      term_start: "2023-01-01",
      department: "Administration",
    },
    {
      id: "3",
      name: "Ana Rodriguez",
      position: "Barangay Treasurer",
      contact_number: "+63 917 345 6789",
      email: "treasurer@barangaybucana.gov.ph",
      photo_url: "/placeholder-user.jpg",
      status: "active",
      term_start: "2023-01-01",
      department: "Finance",
    },
    {
      id: "4",
      name: "Pedro Gonzales",
      position: "Kagawad - Health",
      contact_number: "+63 917 456 7890",
      email: "health.kagawad@barangaybucana.gov.ph",
      photo_url: "/placeholder-user.jpg",
      status: "active",
      term_start: "2023-01-01",
      department: "Health",
    },
    {
      id: "5",
      name: "Rosa Martinez",
      position: "Kagawad - Education",
      contact_number: "+63 917 567 8901",
      email: "education.kagawad@barangaybucana.gov.ph",
      photo_url: "/placeholder-user.jpg",
      status: "active",
      term_start: "2023-01-01",
      department: "Education",
    },
  ]

  async getAllOfficials(): Promise<BarangayOfficial[]> {
    try {
      // In a real implementation, this would fetch from Supabase
      // For now, return fallback data
      return this.fallbackOfficials
    } catch (error) {
      console.error("Error fetching officials:", error)
      return this.fallbackOfficials
    }
  }

  async getOfficialById(id: string): Promise<BarangayOfficial | null> {
    try {
      const officials = await this.getAllOfficials()
      return officials.find((official) => official.id === id) || null
    } catch (error) {
      console.error("Error fetching official:", error)
      return null
    }
  }

  async getOfficialsByDepartment(department: string): Promise<BarangayOfficial[]> {
    try {
      const officials = await this.getAllOfficials()
      return officials.filter((official) => official.department === department)
    } catch (error) {
      console.error("Error fetching officials by department:", error)
      return []
    }
  }

  getFallbackOfficials(): BarangayOfficial[] {
    return [...this.fallbackOfficials]
  }
}

export const officialsService = new OfficialsService()
