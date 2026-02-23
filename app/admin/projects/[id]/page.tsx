'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Project } from '@/lib/types'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [photos, setPhotos] = useState<any[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    fetchProjectData()
  }, [id])

  async function fetchProjectData() {
    // 1. Fetch Project Details
    const { data: proj } = await supabase.from('projects').select('*').eq('id', id).single()
    if (proj) setProject(proj)

    // 2. Fetch Photos for this project
    const { data: pics } = await supabase
      .from('site_photos')
      .select('*')
      .eq('project_id', id)
      .order('created_at', { ascending: false })
    if (pics) setPhotos(pics)
  }

  // --- 📸 PHOTO UPLOAD ---
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUpdating(true)
    const fileName = `${id}/${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage.from('site-photos').upload(fileName, file)

    if (!uploadError) {
      const { data: { publicUrl } } = supabase.storage.from('site-photos').getPublicUrl(fileName)
      await supabase.from('site_photos').insert([{ project_id: id, photo_url: publicUrl, photo_type: 'during' }])
      fetchProjectData() // Refresh gallery
    } else {
      alert("Upload failed: " + uploadError.message)
    }
    setIsUpdating(false)
  }

  // --- 💰 RECORD EXPENSE ---
  async function recordExpense() {
    const desc = prompt("What was the expense for? (e.g., White Marble, Adhesive, Labor)")
    const amountStr = prompt("Enter amount (₹):")
    
    if (!desc || !amountStr) return
    const amount = parseFloat(amountStr)

    setIsUpdating(true)
    const { error } = await supabase.from('expenses').insert([{
      project_id: id,
      description: desc,
      amount: amount,
      category: 'material',
      expense_date: new Date().toISOString()
    }])

    if (!error) {
      const newTotal = (project?.actual_cost || 0) + amount
      await supabase.from('projects').update({ actual_cost: newTotal }).eq('id', id)
      fetchProjectData() // Refresh stats
      alert("Expense recorded and budget updated!")
    }
    setIsUpdating(false)
  }

  // --- 📈 UPDATE PROGRESS ---
  async function updateProgress() {
    const newProgress = prompt("Enter progress (0-100):", project?.progress_percent.toString())
    if (!newProgress) return
    setIsUpdating(true)
    await supabase.from('projects').update({ progress_percent: parseInt(newProgress) }).eq('id', id)
    fetchProjectData()
    setIsUpdating(false)
  }

  if (!project) return <div className="p-8 text-center text-black">Loading project details...</div>

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto bg-white min-h-screen text-black">
      <div className="border-b pb-6 mb-6 flex justify-between items-center">
        <div>
           <button onClick={() => router.push('/admin/projects')} className="text-indigo-600 font-bold mb-2 flex items-center">
             <span className="mr-1">←</span> Back to Projects
           </button>
           <h1 className="text-3xl font-bold text-slate-900">{project.project_name}</h1>
           <p className="text-slate-500 text-sm mt-1">📍 {project.site_address}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm">
          <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mb-1">Progress</p>
          <p className="text-2xl font-black text-indigo-900">{project.progress_percent}%</p>
        </div>
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
          <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-1">Budget</p>
          <p className="text-2xl font-black text-emerald-900">₹{project.estimated_budget?.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100 shadow-sm">
          <p className="text-[10px] text-rose-600 font-black uppercase tracking-widest mb-1">Spent</p>
          <p className="text-2xl font-black text-rose-900">₹{project.actual_cost.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mb-1">Area</p>
          <p className="text-2xl font-black text-slate-900">{project.area_sqft} <span className="text-xs font-normal">sqft</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Actions Box */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-slate-900">Quick Actions</h3>
          <div className="space-y-3">
            <label className="w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-center items-center cursor-pointer font-bold text-sm text-slate-700 hover:bg-slate-100 transition-all">
              📸 {isUpdating ? "UPLOADING..." : "ADD SITE PHOTO"}
              <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={isUpdating} />
            </label>
            <button onClick={recordExpense} className="w-full py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-700 hover:bg-slate-100 transition-all">
              💰 RECORD EXPENSE
            </button>
            <button onClick={updateProgress} disabled={isUpdating} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-md active:scale-95 transition-all">
              {isUpdating ? "SAVING..." : "UPDATE PROGRESS %"}
            </button>
          </div>
        </div>

        {/* Notes Box */}
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
          <h3 className="font-bold text-lg mb-4 text-slate-900">Site Notes</h3>
          <div className="bg-white p-4 rounded-xl border border-slate-100 min-h-[120px]">
            <p className="text-slate-600 text-sm leading-relaxed italic">
              {project.notes || "No specific site notes added yet. Use the database to add internal instructions."}
            </p>
          </div>
        </div>
      </div>

      {/* --- 🖼️ PHOTO GALLERY SECTION --- */}
      <div className="border-t pt-8">
        <h3 className="font-black text-xl mb-6 text-slate-900 flex items-center">
          <span className="mr-2 text-2xl">🖼️</span> Project Gallery
        </h3>
        {photos.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No photos uploaded for this site yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {photos.map((pic) => (
              <div key={pic.id} className="group relative aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all">
                <img src={pic.photo_url} alt="Site Progress" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}