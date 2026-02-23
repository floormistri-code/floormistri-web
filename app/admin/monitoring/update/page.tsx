'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DailyUpdatePage() {
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

    const { error } = await supabase.from('site_updates').insert([{
      project_id: formData.get('project_id'),
      work_done: formData.get('work_done'),
      issues_faced: formData.get('issues'),
      next_steps: formData.get('next_steps'),
      updated_by: 'Supervisor' 
    }])

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Update Saved Successfully!")
      // FIX: Changed from /admin/dashboard to /admin to avoid the 404 error
      router.push('/admin') 
    }
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white min-h-screen text-black">
      <Link href="/admin" className="text-indigo-600 font-bold mb-6 inline-block">← Back to Dashboard</Link>
      <h1 className="text-3xl font-black italic uppercase mb-8 tracking-tighter">Daily Site Log</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Select Site</label>
          <select name="project_id" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-indigo-500">
            <option value="">Which site are you at?</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Work Completed Today</label>
          <textarea name="work_done" required placeholder="e.g. Completed living room tiling..." className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none h-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Issues (If any)</label>
            <input name="issues" placeholder="e.g. Shortage of cement" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none" />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2">Target for Tomorrow</label>
            <input name="next_steps" placeholder="e.g. Start kitchen floor" className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none" />
          </div>
        </div>

        <button disabled={loading} className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-black transition-all">
          {loading ? 'SAVING LOG...' : 'SUBMIT DAILY REPORT'}
        </button>
      </form>
    </div>
  )
}