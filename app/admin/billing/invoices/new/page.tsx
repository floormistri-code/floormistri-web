'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewInvoicePage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from('projects').select('id, project_name')
      if (data) setProjects(data)
    }
    fetchProjects()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    
    // Generate a clean invoice number based on date
    const invNumber = `INV-${Date.now().toString().slice(-6)}`

    const { error } = await supabase.from('invoices').insert([{
      invoice_number: invNumber,
      project_id: formData.get('project_id'),
      amount: formData.get('amount'),
      due_date: formData.get('due_date'),
      status: 'pending',
      paid_amount: 0
    }])

    if (error) {
      alert("Error: " + error.message)
    } else {
      router.push('/admin/billing/invoices')
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white min-h-screen text-black">
      <Link href="/admin/billing/invoices" className="text-indigo-600 font-bold mb-6 inline-block">← Back</Link>
      <h1 className="text-3xl font-black italic uppercase mb-8">Generate New Invoice</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Select Project</label>
          <select name="project_id" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none">
            <option value="">Choose Site...</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Invoice Amount (₹)</label>
          <input type="number" name="amount" required placeholder="0.00" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none" />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Due Date</label>
          <input type="date" name="due_date" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none" />
        </div>

        <button disabled={loading} className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-black transition-all">
          {loading ? 'CREATING...' : 'GENERATE INVOICE'}
        </button>
      </form>
    </div>
  )
}