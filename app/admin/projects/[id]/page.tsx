'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Project } from '@/lib/types'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    async function fetchProject() {
      const { data } = await supabase.from('projects').select('*').eq('id', id).single()
      if (data) setProject(data)
    }
    fetchProject()
  }, [id])

  // 📸 PHOTO UPLOAD LOGIC
  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUpdating(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${id}/${Math.random()}.${fileExt}`

    // 1. Upload to Storage
    const { error: uploadError } = await supabase.storage
      .from('site-photos')
      .upload(fileName, file)

    if (uploadError) {
      alert("Upload failed: " + uploadError.message)
    } else {
      // 2. Get URL and Save to Database
      const { data: { publicUrl } } = supabase.storage.from('site-photos').getPublicUrl(fileName)
      await supabase.from('site_photos').insert([{ project_id: id, photo_url: publicUrl, photo_type: 'during' }])
      alert("Photo added successfully!")
    }
    setIsUpdating(false)
  }

  // 📝 UPDATE NOTES LOGIC
  async function updateNotes() {
    const newNote = prompt("Enter site notes:", project?.notes || "")
    if (newNote === null) return
    
    setIsUpdating(true)
    const { error } = await supabase.from('projects').update({ notes: newNote }).eq('id', id)
    if (!error) setProject(prev => prev ? { ...prev, notes: newNote } : null)
    setIsUpdating(false)
  }

  // 📈 UPDATE PROGRESS LOGIC
  async function updateProgress() {
    const newProgress = prompt("Enter progress (0-100):", project?.progress_percent.toString())
    if (!newProgress) return
    setIsUpdating(true)
    await supabase.from('projects').update({ progress_percent: parseInt(newProgress) }).eq('id', id)
    setProject(prev => prev ? { ...prev, progress_percent: parseInt(newProgress) } : null)
    setIsUpdating(false)
  }

  if (!project) return <div className="p-8 text-black">Loading...</div>

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto bg-white min-h-screen text-black">
      <div className="border-b pb-6 mb-6">
        <button onClick={() => router.push('/admin/projects')} className="text-indigo-600 font-bold mb-2">← Back</button>
        <h1 className="text-3xl font-bold">{project.project_name}</h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="text-xs text-indigo-600 font-bold">PROGRESS</p>
          <p className="text-2xl font-black">{project.progress_percent}%</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
          <p className="text-xs text-emerald-600 font-bold">BUDGET</p>
          <p className="text-2xl font-black">₹{project.estimated_budget?.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg text-black">Site Notes</h3>
            <button onClick={updateNotes} className="text-xs bg-gray-200 px-2 py-1 rounded text-black font-bold">EDIT</button>
          </div>
          <p className="text-gray-600 italic">{project.notes || "No notes yet."}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-black">Quick Actions</h3>
          <div className="space-y-4">
            <label className="w-full py-3.5 bg-white border border-gray-200 rounded-2xl flex justify-center items-center cursor-pointer hover:bg-gray-50 font-bold text-sm text-black shadow-sm">
              📸 {isUpdating ? "UPLOADING..." : "ADD SITE PHOTO"}
              <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" disabled={isUpdating} />
            </label>

            <button onClick={() => alert("Expense feature coming soon!")} className="w-full py-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-sm text-black">
              💰 RECORD EXPENSE
            </button>

            <button onClick={updateProgress} disabled={isUpdating} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-md">
              {isUpdating ? "SAVING..." : "UPDATE PROGRESS %"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}