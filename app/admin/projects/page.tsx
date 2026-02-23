'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Project } from '@/lib/types'
import Link from 'next/link'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Active Projects</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
          + New Project
        </button>
      </div>

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold">{project.project_name}</h2>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full uppercase">
                  {project.status}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">{project.site_address}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{project.progress_percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full" 
                    style={{ width: `${project.progress_percent}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm font-medium text-indigo-600">
                  ₹{project.actual_cost.toLocaleString('en-IN')}
                </div>
                <Link href={`/admin/projects/${project.id}`} className="text-gray-400 hover:text-indigo-600">
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}