'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Project } from '@/lib/types'

export default function ProjectDetailsPage() {
  const { id } = useParams()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    async function fetchProject() {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()
      
      if (data) setProject(data)
    }
    fetchProject()
  }, [id])

  if (!project) return <div className="p-8 text-center">Loading site details...</div>

  return (
    <div className="p-8 max-w-5xl mx-auto bg-white min-h-screen shadow-sm">
      <div className="border-b pb-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{project.project_name}</h1>
        <p className="text-gray-500 mt-2">📍 {project.site_address}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
          <p className="text-xs text-indigo-600 font-semibold uppercase">Progress</p>
          <p className="text-2xl font-bold text-indigo-900">{project.progress_percent}%</p>
        </div>
        <div className="p-4 bg-green-50 rounded-xl border border-green-100">
          <p className="text-xs text-green-600 font-semibold uppercase">Budget</p>
          <p className="text-2xl font-bold text-green-900">₹{project.estimated_budget?.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-xl border border-red-100">
          <p className="text-xs text-red-600 font-semibold uppercase">Spent</p>
          <p className="text-2xl font-bold text-red-900">₹{project.actual_cost.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
          <p className="text-xs text-gray-600 font-semibold uppercase">Area</p>
          <p className="text-2xl font-bold text-gray-900">{project.area_sqft} sq ft</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-6 rounded-2xl border">
          <h3 className="font-bold text-lg mb-4">Site Notes</h3>
          <p className="text-gray-600 leading-relaxed">
            {project.notes || "No internal notes added for this project yet."}
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-2xl border">
          <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">Add Site Photo</button>
            <button className="w-full py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100">Record Expense</button>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Update Progress</button>
          </div>
        </div>
      </div>
    </div>
  )
}