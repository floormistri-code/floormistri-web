'use client'

import { useState, useEffect } from 'react'
import { supabase, type Inquiry } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState<any>(null)
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

      setUser(session.user)

      const { data, error: fetchError } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError
      
      console.log('Fetched inquiries:', data)
      setInquiries(data || [])
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatPrice = (price: number | null | undefined) => {
    if (price === null || price === undefined || isNaN(price)) {
      return '₹0'
    }
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Floormistri Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Welcome, {user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm font-medium text-gray-600 uppercase">Total Inquiries</p>
            <p className="text-4xl font-bold text-indigo-600 mt-2">{inquiries.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm font-medium text-gray-600 uppercase">This Week</p>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {inquiries.filter((i) => {
                const weekAgo = new Date()
                weekAgo.setDate(weekAgo.getDate() - 7)
                return new Date(i.created_at) > weekAgo
              }).length}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <p className="text-sm font-medium text-gray-600 uppercase">Total Value</p>
            <p className="text-4xl font-bold text-purple-600 mt-2">
              {formatPrice(inquiries.reduce((sum, i) => sum + (i.total_estimate || 0), 0))}
            </p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-900">Customer Inquiries</h2>
          </div>

          {inquiries.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500">No inquiries yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {inquiry.client_name || 'No name provided'}
                        </h3>
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-medium rounded-full">
                          {inquiry.material_type || 'Not specified'}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-medium rounded-full">
                          {inquiry.status || 'new'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Phone: </span>
                          {inquiry.phone_number ? (
                            <a href={`tel:${inquiry.phone_number}`} className="hover:text-indigo-600">
                              {inquiry.phone_number}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Location: </span>
                          {inquiry.site_location || 'Not specified'}
                        </div>

                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Area: </span>
                          {inquiry.area_sqft} sq ft
                        </div>

                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Date: </span>
                          {formatDate(inquiry.created_at)}
                        </div>
                      </div>

                      <div className="mt-4 text-2xl font-bold text-green-600">
                        {formatPrice(inquiry.total_estimate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}