import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: string
          department: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          role: string
          department?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: string
          department?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      residents: {
        Row: {
          id: string
          first_name: string
          last_name: string
          middle_name: string | null
          email: string | null
          phone: string | null
          address: string
          birth_date: string
          gender: string
          civil_status: string
          occupation: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          middle_name?: string | null
          email?: string | null
          phone?: string | null
          address: string
          birth_date: string
          gender: string
          civil_status: string
          occupation?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          middle_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string
          birth_date?: string
          gender?: string
          civil_status?: string
          occupation?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      incidents: {
        Row: {
          id: string
          title: string
          description: string
          type: string
          status: string
          priority: string
          location: string
          reporter_id: string | null
          assigned_to: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          type: string
          status?: string
          priority?: string
          location: string
          reporter_id?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          type?: string
          status?: string
          priority?: string
          location?: string
          reporter_id?: string | null
          assigned_to?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      documents: {
        Row: {
          id: string
          type: string
          status: string
          requester_id: string
          purpose: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          type: string
          status?: string
          requester_id: string
          purpose: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          type?: string
          status?: string
          requester_id?: string
          purpose?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          user_id: string
          type: string
          date: string
          time: string
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          date: string
          time: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          date?: string
          time?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
