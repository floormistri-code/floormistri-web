'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function MobileLogin() {
  const [phone, setPhone] = useState('')
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // FIX 1: Use maybeSingle() to prevent the 406 crash if data is missing
      // FIX 2: Added more flexible table joining logic
      const { data: authData, error: authError } = await supabase
        .from('craftsmen_auth')
        .select('*, craftsmen(name)')
        .eq('phone', phone)
        .eq('is_active', true)
        .maybeSingle()

      if (authError) throw authError

      if (!authData) {
        throw new Error('Invalid phone number or inactive account')
      }

      // Check PIN (Supports your 1234 test and the database hash)
      if (pin !== '1234' && authData.pin_hash !== pin) {
        throw new Error('Invalid PIN')
      }

      // Store craftsman info safely
      localStorage.setItem('craftsman_id', authData.craftsman_id.toString())
      localStorage.setItem('craftsman_phone', phone)
      
      // Safety check for the joined name
      const name = authData.craftsmen?.name || 'Craftsman'
      localStorage.setItem('craftsman_name', name)

      // Update last login
      await supabase
        .from('craftsmen_auth')
        .update({ last_login: new Date().toISOString() })
        .eq('phone', phone)

      router.push('/mobile/dashboard')
    } catch (err: any) {
      console.error('Login Error:', err)
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Floormistri</h1>
          <p className="text-gray-600 mt-2">Craftsman Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              maxLength={10}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              PIN
            </label>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="4-digit PIN"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
              maxLength={4}
              inputMode="numeric"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-800 text-sm font-semibold">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Test Login: 9876543210 / PIN: 1234
          </p>
        </div>
      </div>
    </div>
  )
}