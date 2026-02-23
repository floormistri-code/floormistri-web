'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function CraftsmenPage() {
  const [workers, setWorkers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWorkers() {
      const { data } = await supabase
        .from('craftsmen')
        .select('*')
        .order('name', { ascending: true })
      if (data) setWorkers(data)
      setLoading(false)
    }
    fetchWorkers()
  }, [])

  if (loading) return <div className="p-8 text-center text-black font-bold">Loading Team Directory...</div>

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto bg-white min-h-screen text-black">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Craftsmen Team</h1>
          <p className="text-slate-500 text-sm">Manage your specialized flooring experts and availability.</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg">
          + Add New Mistri
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workers.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No craftsmen found in the database.</p>
          </div>
        ) : (
          workers.map((worker) => (
            <div key={worker.id} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-2xl">👷</div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                  worker.status === 'available' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {worker.status || 'AVAILABLE'}
                </span>
              </div>
              
              <h3 className="font-bold text-xl text-slate-900 mb-1">{worker.name}</h3>
              <p className="text-indigo-600 text-xs font-black uppercase tracking-widest mb-4">{worker.specialty || 'General Masonry'}</p>
              
              <div className="space-y-2 border-t pt-4 border-slate-50">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Daily Rate:</span>
                  <span className="font-bold text-slate-900">₹{worker.daily_rate || 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Phone:</span>
                  <span className="font-bold text-slate-900">{worker.phone}</span>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-bold text-xs hover:bg-slate-100 transition-all">
                Assign to Project
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}