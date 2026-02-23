'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AddClientPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const clientData = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      address: formData.get('address'),
      city: formData.get('city') || 'Gwalior',
    }

    // Insert into Supabase 'clients' table
    const { error } = await supabase.from('clients').insert([clientData])

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Client added successfully!")
      router.push('/admin/clients') // Go back to the list
    }
    setLoading(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto bg-white min-h-screen text-black">
      <button 
        onClick={() => router.back()}
        className="text-indigo-600 font-bold mb-6 flex items-center text-sm"
      >
        ← Back to Directory
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <h1 className="text-2xl font-black text-slate-900 mb-6">Create Client Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Full Name</label>
            <input 
              name="name" 
              required 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
              placeholder="e.g. Rajesh Kumar" 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Phone Number</label>
              <input 
                name="phone" 
                required 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                placeholder="10-digit mobile" 
              />
            </div>
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Email Address</label>
              <input 
                name="email" 
                type="email" 
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                placeholder="email@example.com" 
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Site/Home Address</label>
            <textarea 
              name="address" 
              rows={3}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
              placeholder="Enter full address" 
            />
          </div>

          <button 
            type="submit"
            disabled={loading} 
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? 'SYNCING WITH DATABASE...' : 'SAVE CLIENT RECORD'}
          </button>
        </form>
      </div>
    </div>
  )
}