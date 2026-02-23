'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewPaymentPage() {
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

    const { error } = await supabase.from('payments').insert([{
      project_id: formData.get('project_id'),
      amount: formData.get('amount'),
      payment_method: formData.get('method'),
      payment_date: new Date().toISOString().split('T')[0],
      notes: formData.get('notes')
    }])

    if (error) {
      alert("Error: " + error.message)
    } else {
      router.push('/admin/billing/payments')
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white min-h-screen text-black">
      <Link href="/admin/billing/payments" className="text-indigo-600 font-bold mb-6 inline-block">← Back to Logs</Link>
      <h1 className="text-3xl font-black italic uppercase mb-8">Record Received Payment</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Project Site</label>
          <select name="project_id" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none">
            <option value="">Choose Project...</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Amount Paid (₹)</label>
          <input type="number" name="amount" required placeholder="5000" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none" />
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Payment Method</label>
          <select name="method" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none">
            <option value="UPI">UPI / PhonePe / GPay</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer (NEFT)</option>
            <option value="Cheque">Cheque</option>
          </select>
        </div>

        <button disabled={loading} className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-black hover:bg-emerald-700 transition-all shadow-lg">
          {loading ? 'SAVING...' : 'CONFIRM PAYMENT'}
        </button>
      </form>
    </div>
  )
}