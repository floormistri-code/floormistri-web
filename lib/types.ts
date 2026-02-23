// ============================================
// FLOORMISTRI PHASE 2 - TYPESCRIPT DEFINITIONS
// ============================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      clients: {
        Row: Client
        Insert: Omit<Client, 'id' | 'created_at'>
        Update: Partial<Omit<Client, 'id' | 'created_at'>>
      }
      projects: {
        Row: Project
        Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Project, 'id' | 'created_at' | 'updated_at'>>
      }
      craftsmen: {
        Row: Craftsman
        Insert: Omit<Craftsman, 'id' | 'created_at'>
        Update: Partial<Omit<Craftsman, 'id' | 'created_at'>>
      }
      // Add other tables here as needed...
    }
  }
}

// 1. Client Type
export interface Client {
  id: number
  created_at: string
  name: string
  email: string | null
  phone: string
  address: string | null
  city: string
  state: string
  notes: string | null
  total_projects: number
  total_revenue: number
  status: 'active' | 'inactive'
}

// 2. Project Type
export interface Project {
  id: number
  created_at: string
  updated_at: string
  client_id: number
  project_name: string
  site_address: string
  area_sqft: number
  material_type: string
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled'
  start_date: string | null
  end_date: string | null
  estimated_budget: number | null
  actual_cost: number
  profit: number
  progress_percent: number
  supervisor_id: number | null
  notes: string | null
}

// 3. Craftsman Type
export interface Craftsman {
  id: number
  created_at: string
  name: string
  phone: string
  specialty: string
  daily_rate: number
  rating: number
  total_projects: number
  status: 'available' | 'busy' | 'inactive'
  photo_url: string | null
  address: string | null
  notes: string | null
}

// 4. Quotation & BOQ Types
export interface Quotation {
  id: number
  created_at: string
  project_id: number | null
  client_id: number
  quotation_number: string
  total_amount: number
  discount: number
  tax_percent: number
  final_amount: number
  valid_until: string
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired'
  notes: string | null
}

export interface BOQItem {
  id: number
  quotation_id: number
  item_name: string
  description: string | null
  quantity: number
  unit: string
  rate: number
  amount: number
}

// 5. Billing & Expense Types
export interface Invoice {
  id: number
  created_at: string
  project_id: number
  invoice_number: string
  amount: number
  paid_amount: number
  balance: number
  due_date: string
  status: 'pending' | 'partial' | 'paid' | 'overdue' | 'cancelled'
}

export interface Expense {
  id: number
  created_at: string
  project_id: number
  category: 'material' | 'labor' | 'transport' | 'equipment' | 'other'
  description: string
  amount: number
  expense_date: string
  vendor_name: string | null
  receipt_url: string | null
}

// 6. Site Management Types
export interface SitePhoto {
  id: number
  created_at: string
  project_id: number
  photo_url: string
  caption: string | null
  photo_type: 'before' | 'during' | 'after' | 'issue'
}

export interface SiteNote {
  id: number
  created_at: string
  project_id: number
  note: string
  created_by: string
  note_type: 'issue' | 'update' | 'milestone' | 'instruction'
  priority: 'low' | 'normal' | 'high' | 'urgent'
}