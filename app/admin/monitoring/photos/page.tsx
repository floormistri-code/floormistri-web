'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function PhotoGalleryPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [photos, setPhotos] = useState<any[]>([])
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function fetchData() {
      const { data: projData } = await supabase.from('projects').select('id, project_name')
      if (projData) setProjects(projData)
      
      const { data: photoData } = await supabase.from('site_photos').select('*, projects(project_name)').order('created_at', { ascending: false })
      if (photoData) setPhotos(photoData)
    }
    fetchData()
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    const projectId = (document.getElementById('project_select') as HTMLSelectElement).value
    
    if (!file || !projectId) return alert("Please select a project and a photo first!")

    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `site-progress/${fileName}`

    // 1. Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage.from('photos').upload(filePath, file)

    if (uploadError) {
      alert("Upload Error: " + uploadError.message)
    } else {
      const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(filePath)
      
      // 2. Save Reference in Database
      await supabase.from('site_photos').insert([{
        project_id: projectId,
        photo_url: publicUrl,
        caption: (document.getElementById('caption') as HTMLInputElement).value || 'Site Update',
        category: 'In-Progress'
      }])
      
      window.location.reload() // Refresh to see new photo
    }
    setUploading(false)
  }

  return (
    <div className="p-8 max-w-6xl mx-auto bg-white min-h-screen text-black">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter">Site Gallery</h1>
        <div className="flex gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
           <select id="project_select" className="bg-white border p-2 rounded-xl text-xs font-bold">
              <option value="">Select Site...</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
           </select>
           <input id="caption" placeholder="Photo Caption..." className="bg-white border p-2 rounded-xl text-xs" />
           <input type="file" accept="image/*" onChange={handleUpload} className="hidden" id="file_up" />
           <label htmlFor="file_up" className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-black cursor-pointer hover:bg-indigo-700">
             {uploading ? 'UPLOADING...' : '📸 UPLOAD PHOTO'}
           </label>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {photos.map((p) => (
          <div key={p.id} className="group relative bg-slate-100 rounded-3xl overflow-hidden aspect-square shadow-sm">
            <img src={p.photo_url} alt="Site" className="object-cover w-full h-full" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <p className="text-[10px] font-black uppercase opacity-70">{p.projects?.project_name}</p>
              <p className="text-xs font-bold leading-tight">{p.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}