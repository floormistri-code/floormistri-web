'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewProjectPage() {
  const router = useRouter()
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchingClients, setFetchingClients] = useState(true)

  // Fetch clients so we can link the project to a person
  useEffect(() => {
    async function getClients() {
      const { data, error } = await supabase
        .from('clients')
        .select('id, name')
        .order('name', { ascending: true })
      
      if (data) setClients(data)
      setFetchingClients(false)
    }
    getClients()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.currentTarget)
    
    const projectData = {
      client_id: formData.get('client_id'),
      project_name: formData.get('project_name'),
      site_address: formData.get('site_address'),
      area_sqft: parseFloat(formData.get('area_sqft') as string),
      material_type: formData.get('material_type'),
      status: 'planning', // Default status for new projects
      progress_percent: 0,
      budget: parseFloat(formData.get('budget') as string) || 0
    }

    const { error } = await supabase.from('projects').insert([projectData])

    if (error) {
      alert("Error creating project: " + error.message)
    } else {
      alert("Project initialized successfully!")
      router.push('/admin/projects')
    }
    setLoading(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto bg-white min-h-screen text-black">
      <Link href="/admin/projects" className="text-indigo-600 font-bold mb-6 inline-block hover:underline">
        ← Back to Projects
      </Link>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
        <h1 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tight">INITIALIZE NEW SITE</h1>
        <p className="text-slate-500 mb-8 font-medium">Link a client and set the site parameters to begin tracking.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Selection */}
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Assign Client</label>
            <select 
              name="client_id" 
              required 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
            >
              <option value="">{fetchingClients ? 'Loading clients...' : 'Select a customer from directory'}</option>
              {clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>

          {/* Project Name & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Project/Site Name</label>
              <input name="project_name" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Gwalior Penthouse" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Estimated Budget (₹)</label>
              <input name="budget" type="number" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="50000" />
            </div>
          </div>

          {/* Area & Material */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Area (Sq Ft)</label>
              <input name="area_sqft" type="number" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="1200" />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Primary Material</label>
              <input name="material_type" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Italian Marble" />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Site Address</label>
            <textarea name="site_address" rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Enter the exact site location..."></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black shadow-xl hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? 'SYNCING DATABASE...' : 'CREATE PROJECT FILE'}
          </button>
        </form>
      </div>
    </div>
  )
}