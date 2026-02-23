'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import BottomNav from '@/components/mobile/BottomNav'

export default function AttendancePage() {
  const [craftsmanId, setCraftsmanId] = useState<number | null>(null)
  const [todayAttendance, setTodayAttendance] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const id = localStorage.getItem('craftsman_id')
    if (!id) {
      router.push('/mobile/login')
      return
    }
    setCraftsmanId(parseInt(id))
    fetchTodayAttendance(parseInt(id))
  }, [router])

  const fetchTodayAttendance = async (id: number) => {
    const today = new Date().toISOString().split('T')[0]
    const { data } = await supabase
      .from('attendance')
      .select('*')
      .eq('craftsman_id', id)
      .eq('date', today)
      .single()
    
    setTodayAttendance(data)
  }

  const handleClockIn = async () => {
    if (!craftsmanId) return
    
    setLoading(true)
    try {
      const today = new Date().toISOString().split('T')[0]
      const { error } = await supabase
        .from('attendance')
        .insert([{
          craftsman_id: craftsmanId,
          project_id: 1, // For demo - in production, select project
          date: today,
          clock_in: new Date().toISOString(),
          status: 'present'
        }])

      if (error) throw error
      
      await fetchTodayAttendance(craftsmanId)
      alert('Clocked in successfully!')
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleClockOut = async () => {
    if (!craftsmanId || !todayAttendance) return
    
    setLoading(true)
    try {
      const clockOutTime = new Date()
      const clockInTime = new Date(todayAttendance.clock_in)
      const hours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60)

      const { error } = await supabase
        .from('attendance')
        .update({
          clock_out: clockOutTime.toISOString(),
          total_hours: hours.toFixed(2)
        })
        .eq('id', todayAttendance.id)

      if (error) throw error
      
      await fetchTodayAttendance(craftsmanId)
      alert('Clocked out successfully!')
    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-green-600 text-white p-6">
        <h1 className="text-2xl font-bold">Attendance</h1>
        <p className="text-green-100 mt-1">{new Date().toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </div>

      <div className="p-4">
        {todayAttendance ? (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-gray-900">
                {todayAttendance.clock_out ? 'Day Completed' : 'Currently Working'}
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="text-gray-600">Clock In</span>
                <span className="font-semibold text-lg">
                  {new Date(todayAttendance.clock_in).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              {todayAttendance.clock_out && (
                <>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">Clock Out</span>
                    <span className="font-semibold text-lg">
                      {new Date(todayAttendance.clock_out).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-600">Total Hours</span>
                    <span className="font-bold text-xl text-green-600">
                      {todayAttendance.total_hours} hrs
                    </span>
                  </div>
                </>
              )}
            </div>

            {!todayAttendance.clock_out && (
              <button
                onClick={handleClockOut}
                disabled={loading}
                className="w-full mt-6 bg-red-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-red-700 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Clock Out'}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">⏰</div>
              <h2 className="text-2xl font-bold text-gray-900">Ready to Start?</h2>
              <p className="text-gray-600 mt-2">Mark your attendance for today</p>
            </div>

            <button
              onClick={handleClockIn}
              disabled={loading}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Clock In'}
            </button>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}