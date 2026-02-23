'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const id = localStorage.getItem('craftsman_id')
      const { data } = await supabase
        .from('daily_tasks')
        .select('*')
        .eq('craftsman_id', id)
      if (data) setTasks(data)
    }
    fetchTasks()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black italic uppercase mb-6">Your Tasks</h1>
      {tasks.length === 0 ? (
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-10 text-center">
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">No tasks assigned yet</p>
        </div>
      ) : (
        tasks.map(task => (
          <div key={task.id} className="bg-white border border-slate-100 p-4 rounded-2xl mb-4 shadow-sm">
            <p className="font-bold text-slate-900">{task.task_description}</p>
            <p className="text-[10px] text-slate-400 uppercase mt-1">Status: {task.status}</p>
          </div>
        ))
      )}
    </div>
  )
}