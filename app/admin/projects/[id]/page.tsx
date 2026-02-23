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
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      
      if (error) {
        console.error("Error fetching project:", error)
        return
      }
      if (data) setProject(data)
    }
    fetchProject()
  }, [id])

  // Function to update progress percent in the database
  async function updateProgress() {
    const currentProgress = project?.progress_percent || 0
    const newProgress = prompt("Enter new progress percentage (0-100):", currentProgress.toString())
    
    // If user clicks cancel or enters nothing
    if (newProgress === null || newProgress === "") return 
    
    const progressNum = parseInt(newProgress)
    
    // Validation
    if (isNaN(progressNum) || progressNum < 0 || progressNum > 100) {
      alert("Please enter a valid number between 0 and 100")
      return
    }

    setIsUpdating(true)
    const { error } = await supabase
      .from('projects')
      .update({ progress_percent: progressNum })
      .eq('id', id)

    if (error) {
      alert("Error updating progress: " + error.message)
    } else {
      // Update local state so the UI changes immediately
      setProject(prev => prev ? { ...prev, progress_percent: progressNum } : null)
      alert("Progress updated successfully!")
    }
    setIsUpdating(false)
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto bg-white min-h-screen text-black">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-100 pb-6 mb-6 gap-4">
        <div>
          <button 
            onClick={() => router.push('/admin/projects')}
            className="text-indigo-600 text-sm font-semibold mb-3 hover:text-indigo-800 transition-colors flex items-center"
          >
            ← Back to Projects
          </button>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{project.project_name}</h1>
          <p className="text-gray-500 mt-2 flex items-center text-sm">
            <span className="mr-2">📍</span> {project.site_address}
          </p>
        </div>
        <div className="flex items-center">
           <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
             project.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
           }`}>
             {project.status.replace('_', ' ')}
           </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-5 bg-indigo-50 rounded-2xl border border-indigo-100 shadow-sm">
          <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mb-1">Progress</p>
          <p className="text-2xl font-black text-indigo-900">{project.progress_percent}%</p>
        </div>
        <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
          <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mb-1">Budget</p>
          <p className="text-2xl font-black text-emerald-900">₹{project.estimated_budget?.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100 shadow-sm">
          <p className="text-[10px] text-rose-600 font-bold uppercase tracking-widest mb-1">Spent</p>
          <p className="text-2xl font-black text-rose-900">₹{project.actual_cost.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mb-1">Area</p>
          <p className="text-2xl font-black text-slate-900">{project.area_sqft} <span className="text-xs font-normal">sqft</span></p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Site Notes Section */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center">
            <span className="mr-2">📝</span> Site Notes
          </h3>
          <div className="p-5 bg-gray-50 rounded-2xl min-h-[160px] border border-gray-100">
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm italic">
              {project.notes || "No internal notes added for this project yet."}
            </p>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center">
            <span className="mr-2">⚡</span> Quick Actions
          </h3>
          <div className="space-y-4">
            <button className="w-full py-3.5 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700 shadow-sm active:scale-[0.98]">
              📸 Add Site Photo
            </button>
            <button className="w-full py-3.5 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700 shadow-sm active:scale-[0.98]">
              💰 Record Expense
            </button>
            <button 
              onClick={updateProgress}
              disabled={isUpdating}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all font-black text-sm shadow-md hover:shadow-indigo-200 active:scale-[0.98] disabled:opacity-50"
            >
              {isUpdating ? "UPDATING..." : "UPDATE PROGRESS %"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}