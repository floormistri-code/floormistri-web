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
    const { data: pics } = await supabase.from('site_photos').select('*').eq('project_id', id).order('created_at', { ascending: false })
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
    }
    setIsUpdating(false)
  }

  // --- 💰 RECORD EXPENSE ---
  async function recordExpense() {
    const desc = prompt("What was the expense for? (e.g., Cement, Labor)")
    const amount = prompt("Enter amount (₹):")
    
    if (!desc || !amount) return

    setIsUpdating(true)
    const { error } = await supabase.from('expenses').insert([{
      project_id: id,
      description: desc,
      amount: parseFloat(amount),
      category: 'material',
      expense_date: new Date().toISOString()
    }])

    if (!error) {
      // Update the total cost in the project table too
      const newTotal = (project?.actual_cost || 0) + parseFloat(amount)
      await supabase.from('projects').update({ actual_cost: newTotal }).eq('id', id)
      fetchProjectData() // Refresh stats
      alert("Expense recorded!")
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

  if (!project) return <div className="p-8 text-black">Loading...</div>

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto bg-white min-h-screen text-black">
      <div className="border-b pb-6 mb-6 flex justify-between items-center">
        <div>
           <button onClick={() => router.push('/admin/projects')} className="text-indigo-600 font-bold mb-2">← Back</button>
           <h1 className="text-3xl font-bold">{project.project_name}</h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="text-xs text-indigo-600 font-bold">PROGRESS</p>
          <p className="text-2xl font-black">{project.progress_percent}%</p>
        </div>
        <div className="p-4 bg-rose-50 rounded-xl border border-rose-100">
          <p className="text-xs text-rose-600 font-bold">TOTAL SPENT</p>
          <p className="text-2xl font-black">₹{project.actual_cost.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Actions */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-black">Quick Actions</h3>
          <div className="space-y-4">
            <label className="w-full py-3.5 bg-white border border-gray-200 rounded-2xl flex justify-center items-center cursor-pointer font-bold text-black shadow-sm">
              📸 {isUpdating ? "UPLOADING..." : "ADD SITE PHOTO"}
              <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={isUpdating} />
            </label>
            <button onClick={recordExpense} className="w-full py-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-black">
              💰 RECORD EXPENSE
            </button>
            <button onClick={updateProgress} disabled={isUpdating} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black">
              {isUpdating ? "SAVING..." : "UPDATE PROGRESS %"}
            </button>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
          <h3 className="font-bold text-lg mb-4 text-black">Site Notes</h3>
          <p className="text-gray-600 italic">{project.notes || "No notes yet."}</p>
        </div>
      </div>

      {/* --- 🖼️ PHOTO GALLERY SECTION --- */}
      <div className="mt-8">
        <h3 className="font-bold text-xl mb-4 text-black">Site Gallery</h3>
        {photos.length === 0 ? (
          <p className="text-gray-400">No photos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((pic) => (
              <div key={pic.id} className="aspect-square rounded-xl overflow-hidden border shadow-sm">
                <img src={pic.photo_url} alt="Site" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}