'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function MobileDashboard() {
  const [greeting, setGreeting] = useState('Namaste')

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-900">{greeting}!</h1>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Site Status: Active</p>
      </header>

      {/* Action Cards for Mobile */}
      <div className="grid grid-cols-1 gap-4">
        <div className="bg-indigo-600 p-6 rounded-[2rem] text-white shadow-lg shadow-indigo-100">
          <p className="text-[10px] font-black uppercase opacity-60 mb-1">Today's Target</p>
          <p className="text-xl font-bold italic">Complete living room tile leveling</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900 p-6 rounded-[2rem] text-white">
            <p className="text-[10px] font-black uppercase opacity-50 mb-1">Hours Today</p>
            <p className="text-2xl font-black italic">0.0</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Status</p>
            <p className="text-2xl font-black italic text-red-600">OUT</p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 border-dashed">
        <p className="text-center text-[10px] font-black text-slate-400 uppercase">No new messages from Supervisor</p>
      </div>
    </div>
  )
}