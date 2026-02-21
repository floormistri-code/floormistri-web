'use client'

import { useState, useEffect } from 'react'
import { supabase, Inquiry } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuthAndFetchData()
  }, [])

  const checkAuthAndFetchData = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setInquiries(data || [])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  if (loading) return <div className="p-10 text-black">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Floormistri Admin</h1>
        <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
      </header>
      <main className="p-8">
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Requirements</th>
                <th className="px-6 py-3 text-left text-xs font-bold uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td className="px-6 py-4 text-sm">{formatDate(inquiry.created_at)}</td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-sm">{inquiry.client_name}</div>
                    <div className="text-xs text-gray-500">{inquiry.phone_number}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div>{inquiry.material_type}</div>
                    <div className="text-xs text-gray-500">{inquiry.area_sqft} sqft</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">
                      {inquiry.status || 'New'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}