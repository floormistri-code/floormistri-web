'use client'

import { useState, useEffect, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

// We wrap the form in a component to handle SearchParams safely in Next.js
function NewProjectForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [fetchingClients, setFetchingClients] = useState(true)

  // Auto-fill values from the "Convert" button
  const prefilledName = searchParams.get('name') || ''
  const prefilledArea = searchParams.get('area') || ''
  const prefilledMaterial = searchParams.get('material') || ''

  useEffect(() => {
    async function getClients() {
      const { data } = await supabase
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
      area_sqft: parseFloat(formData.get('area_sqft') as string) || 0,
      material_type: formData.get('material_type'),
      status: 'planning',
      progress_percent: 0,
      budget: parseFloat(formData.get('budget') as string) || 0
    }

    const { error } = await supabase.from('projects').insert([projectData])

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Project created successfully!")
      router.push('/admin/projects')
    }
    setLoading(false)
  }

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-10 shadow-sm">
      <h1 className="text-3xl font-black text-slate-900 mb-2 italic tracking-tight uppercase">Initialize Site</h1>
      <p className="text-slate-500 mb-8 font-medium">
        {prefilledName ? `Converting inquiry for ${prefilledName}` : 'Fill in the details to start a new project.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Assign Client</label>
          <select 
            name="client_id" 
            required 
            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">{fetchingClients ? 'Loading clients...' : 'Select a customer'}</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>{client.name}</option>
            ))}
          </select>
          <p className="mt-2 text-[10px] text-indigo-600 font-bold italic">Note: Ensure the client is added to the "Clients" section first.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Project Name</label>
            <input 
              name="project_name" 
              required 
              defaultValue={prefilledName ? `${prefilledName} Site` : ''}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Estimated Budget (₹)</label>
            <input name="budget" type="number" required className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="50000" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Total Area (Sq Ft)</label>
            <input 
              name="area_sqft" 
              type="number" 
              required 
              defaultValue={prefilledArea}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Primary Material</label>
            <input 
              name="material_type" 
              defaultValue={prefilledMaterial}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" 
            />
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Site Address</label>
          <textarea name="site_address" rows={3} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Location details..."></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? 'SAVING...' : 'INITIALIZE PROJECT FILE'}
        </button>
      </form>
    </div>
  )
}

// Main page component with Suspense boundary
export default function NewProjectPage() {
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto bg-white min-h-screen text-black">
      <Link href="/admin" className="text-slate-400 font-bold mb-6 inline-block hover:text-indigo-600 transition-colors">
        ← Back to Dashboard
      </Link>
      
      <Suspense fallback={<div className="p-10 text-center font-bold">Loading Form...</div>}>
        <NewProjectForm />
      </Suspense>
    </div>
  )
}