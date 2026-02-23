'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function ClientsPage() {
  const [clients, setClients] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name', { ascending: true })
      
      if (error) {
        console.error("Error fetching clients:", error)
      }
      if (data) setClients(data)
      setLoading(false)
    }
    fetchClients()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
    </div>
  )

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto bg-white min-h-screen text-black">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Client Directory</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your customer relationships and project history.</p>
        </div>
        
        {/* UPDATED BUTTON: Now wrapped in a Link */}
        <Link href="/admin/clients/new">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 transition-all active:scale-95">
            + Add New Client
          </button>
        </Link>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No clients found. Click the button above to add your first customer.</p>
          </div>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-xl mr-4 border border-indigo-100 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  {client.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{client.name}</h3>
                  <div className="flex items-center text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <span className="mr-1">📍</span> {client.city || 'Gwalior'}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-sm text-slate-600 flex items-center">
                  <span className="w-6">📞</span> <span className="font-medium">{client.phone}</span>
                </p>
                <p className="text-sm text-slate-600 flex items-center truncate">
                  <span className="w-6">📧</span> <span className="font-medium">{client.email || 'No email saved'}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Total Projects</p>
                  <p className="font-black text-indigo-600 text-xl">{client.total_projects || 0}</p>
                </div>
                <button className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-800 transition-all">
                  Details →
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}