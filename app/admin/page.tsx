'use client'

import { useState, useEffect } from 'react'
import { supabase, type Inquiry } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminDashboard() {
  // --- STATE FOR ORIGINAL INQUIRY SYSTEM ---
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState<any>(null)
  
  // --- STATE FOR NEW OPERATIONAL STATS ---
  const [stats, setStats] = useState({
    projects: 0,
    updates: 0,
    photos: 0,
    revenue: 0
  })

  const router = useRouter()

  useEffect(() => {
    checkAuthAndFetchData()
  }, [])

  const checkAuthAndFetchData = async () => {
    try {
      // 1. Check Authentication
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      setUser(session.user)

      // 2. Fetch Inquiries (Original Feature)
      const { data: inquiryData, error: fetchError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      setInquiries(inquiryData || [])

      // 3. Fetch Operational Stats (New Feature)
      const { count: pCount } = await supabase.from('projects').select('*', { count: 'exact', head: true })
      const { count: uCount } = await supabase.from('site_updates').select('*', { count: 'exact', head: true })
      const { count: phCount } = await supabase.from('site_photos').select('*', { count: 'exact', head: true })
      
      const { data: revData } = await supabase.from('payments').select('amount')
      const totalRev = revData?.reduce((sum, p) => sum + p.amount, 0) || 0

      setStats({
        projects: pCount || 0,
        updates: uCount || 0,
        photos: phCount || 0,
        revenue: totalRev
      })

    } catch (error: any) {
      setError(error.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  // --- FORMATTERS ---
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    })
  }

  const formatPrice = (price: number | null | undefined) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0,
    }).format(price || 0)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 font-black uppercase text-xs tracking-widest text-slate-400">Syncing Floormistri...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* HEADER SECTION */}
      <header className="p-8 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h1 className="text-5xl font-black italic uppercase tracking-tighter">Command Center</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
            Welcome back, {user?.email?.split('@')[0]}
          </p>
        </div>
        <button onClick={handleLogout} className="px-6 py-2 bg-slate-100 text-slate-600 rounded-full font-bold text-xs hover:bg-red-50 hover:text-red-600 transition-all">
          LOGOUT
        </button>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        
        {/* NEW: BUSINESS SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100">
            <p className="text-[10px] font-black uppercase opacity-60 mb-1">Total Revenue</p>
            <p className="text-4xl font-black italic">{formatPrice(stats.revenue)}</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
            <p className="text-[10px] font-black uppercase opacity-60 mb-1">Active Sites</p>
            <p className="text-4xl font-black italic">{stats.projects}</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Daily Logs</p>
            <p className="text-4xl font-black italic text-slate-900">{stats.updates}</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Photos Uploaded</p>
            <p className="text-4xl font-black italic text-slate-900">{stats.photos}</p>
          </div>
        </div>

        {/* NEW: QUICK OPERATIONS BUTTONS */}
        <div className="mb-12">
          <h2 className="text-xs font-black uppercase tracking-widest mb-6 text-slate-400">Quick Operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/monitoring/update" className="p-6 bg-white border-2 border-slate-900 rounded-3xl font-black text-center hover:bg-slate-900 hover:text-white transition-all">
              📝 POST DAILY LOG
            </Link>
            <Link href="/admin/monitoring/photos" className="p-6 bg-white border-2 border-slate-900 rounded-3xl font-black text-center hover:bg-slate-900 hover:text-white transition-all">
              📸 UPLOAD GALLERY
            </Link>
            <Link href="/admin/billing/expenses" className="p-6 bg-white border-2 border-red-600 text-red-600 rounded-3xl font-black text-center hover:bg-red-600 hover:text-white transition-all">
              💸 RECORD COST
            </Link>
          </div>
        </div>

        {/* ORIGINAL: CUSTOMER INQUIRIES SECTION */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-10 py-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter">New Inquiries</h2>
            <span className="bg-indigo-600 text-white text-[10px] font-black px-4 py-1 rounded-full">{inquiries.length} PENDING</span>
          </div>

          {error && (
            <div className="m-8 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold uppercase tracking-tight border border-red-100">
              ⚠️ {error}
            </div>
          )}

          <div className="divide-y divide-slate-50">
            {inquiries.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-slate-300 font-bold uppercase text-xs tracking-widest">No new inquiries found</p>
              </div>
            ) : (
              inquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-10 hover:bg-slate-50 transition-all group">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-4">
                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter italic">
                          {inquiry.client_name || 'Anonymous Client'}
                        </h3>
                        <span className="px-4 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-full uppercase italic">
                          {inquiry.material_type}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase mb-1">Phone</span>
                          <a href={`tel:${inquiry.phone_number}`} className="text-sm font-bold text-slate-600 hover:text-indigo-600 underline">
                            {inquiry.phone_number}
                          </a>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase mb-1">Location</span>
                          <span className="text-sm font-bold text-slate-600 uppercase">{inquiry.site_location}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase mb-1">Project Size</span>
                          <span className="text-sm font-bold text-slate-600 uppercase">{inquiry.area_sqft} SQ FT</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-slate-400 uppercase mb-1">Received On</span>
                          <span className="text-sm font-bold text-slate-600 uppercase">{formatDate(inquiry.created_at)}</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <span className="text-[10px] font-black text-slate-400 uppercase block mb-1">Estimated Budget</span>
                        <p className="text-3xl font-black text-emerald-600 italic">{formatPrice(inquiry.total_estimate)}</p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 w-full md:w-auto">
                      <Link 
                        href={`/admin/projects/new?name=${encodeURIComponent(inquiry.client_name || '')}&phone=${inquiry.phone_number || ''}&area=${inquiry.area_sqft || ''}&material=${encodeURIComponent(inquiry.material_type || '')}`}
                      >
                        <button className="w-full md:w-auto bg-slate-900 text-white px-8 py-5 rounded-3xl font-black uppercase text-xs tracking-widest shadow-lg hover:bg-indigo-600 transition-all active:scale-95 flex items-center justify-center gap-3 group-hover:translate-x-1">
                          CONVERT TO PROJECT <span>→</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}