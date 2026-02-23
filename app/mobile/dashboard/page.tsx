'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import BottomNav from '@/components/mobile/BottomNav'

export default function MobileDashboard() {
  const [craftsmanName, setCraftsmanName] = useState('')
  const [todayAttendance, setTodayAttendance] = useState<any>(null)
  const [todayTasks, setTodayTasks] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const craftsmanId = localStorage.getItem('craftsman_id')
    const name = localStorage.getItem('craftsman_name')
    
    if (!craftsmanId) {
      router.push('/mobile/login')
      return
    }

    setCraftsmanName(name || 'Craftsman')
    fetchTodayData(parseInt(craftsmanId))
  }, [router])

  const fetchTodayData = async (craftsmanId: number) => {
    const today = new Date().toISOString().split('T')[0]

    // Fetch today's attendance
    const { data: attendance } = await supabase
      .from('attendance')
      .select('*')
      .eq('craftsman_id', craftsmanId)
      .eq('date', today)
      .single()

    setTodayAttendance(attendance)

    // Fetch today's tasks
    const { data: tasks } = await supabase
      .from('daily_tasks')
      .select('*')
      .eq('craftsman_id', craftsmanId)
      .eq('task_date', today)

    setTodayTasks(tasks || [])
  }

  const handleLogout = () => {
    localStorage.clear()
    router.push('/mobile/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Welcome Back!</h1>
            <p className="text-green-100 mt-1">{craftsmanName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white/20 px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4 space-y-4">
        {/* Attendance Status */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Today's Attendance
          </h3>
          {todayAttendance ? (
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Clock In:</span>
                <span className="font-medium">
                  {new Date(todayAttendance.clock_in).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
              {todayAttendance.clock_out && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Clock Out:</span>
                  <span className="font-medium">
                    {new Date(todayAttendance.clock_out).toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600">
                  {todayAttendance.clock_out ? 'Completed' : 'Working'}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Not clocked in yet</p>
          )}
        </div>

        {/* Tasks */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Today's Tasks ({todayTasks.length})
          </h3>
          {todayTasks.length > 0 ? (
            <div className="space-y-3">
              {todayTasks.map((task) => (
                <div
                  key={task.id}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <p className="text-gray-900">{task.task_description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      task.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No tasks assigned today</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/mobile/attendance')}
            className="bg-green-600 text-white p-6 rounded-xl text-center font-semibold hover:bg-green-700"
          >
            📍 Attendance
          </button>
          <button
            onClick={() => router.push('/mobile/photos')}
            className="bg-blue-600 text-white p-6 rounded-xl text-center font-semibold hover:bg-blue-700"
          >
            📸 Upload Photo
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}