'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function ExpenseEntryPage() {
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

    const { error } = await supabase.from('expenses').insert([{
      project_id: formData.get('project_id'),
      category: formData.get('category'),
      description: formData.get('description'),
      amount: parseFloat(formData.get('amount') as string),
      expense_date: formData.get('expense_date'),
      vendor_name: formData.get('vendor_name')
    }])

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Expense Recorded Successfully!")
      router.push('/admin') // Redirect to updated dashboard
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white min-h-screen text-black">
      <Link href="/admin" className="text-indigo-600 font-bold mb-4 inline-block">← Back to Dashboard</Link>
      <h1 className="text-3xl font-black italic uppercase mb-8 tracking-tighter">Record Expense</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Project Site</label>
            <select name="project_id" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500">
              <option value="">Select site...</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Category</label>
            <select name="category" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none">
              <option value="Material">Material</option>
              <option value="Labor">Labor</option>
              <option value="Transport">Transport</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Description</label>
          <input name="description" placeholder="e.g. 100 bags of cement" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Amount (₹)</label>
            <input name="amount" type="number" step="0.01" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Date</label>
            <input name="expense_date" type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none" />
          </div>
        </div>

        <button disabled={loading} className="w-full py-5 bg-red-600 text-white rounded-3xl font-black hover:bg-red-700 transition-all uppercase tracking-widest shadow-lg">
          {loading ? 'RECORDING...' : 'SAVE EXPENSE'}
        </button>
      </form>
    </div>
  )
}