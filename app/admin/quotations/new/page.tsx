'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function NewQuotationPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])
  const [items, setItems] = useState([{ item_name: '', quantity: 0, unit: 'sqft', rate: 0 }])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from('projects').select('id, project_name, client_id')
      if (data) setProjects(data)
    }
    fetchProjects()
  }, [])

  const addItem = () => setItems([...items, { item_name: '', quantity: 0, unit: 'sqft', rate: 0 }])
  
  const updateItem = (index: number, field: string, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }
    setItems(newItems)
  }

  const calculateTotal = () => items.reduce((sum, item) => sum + (item.quantity * item.rate), 0)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const total = calculateTotal()

    // GENERATE QUOTATION NUMBER (Fix for the error in image_c55f62.png)
    const qNumber = `QT-${Date.now().toString().slice(-6)}`

    // 1. Create the main Quotation record
    const { data: quote, error: qError } = await supabase.from('quotations').insert([{
      quotation_number: qNumber, // Added this to fix the error
      project_id: formData.get('project_id'),
      client_id: projects.find(p => p.id == formData.get('project_id'))?.client_id,
      total_amount: total,
      final_amount: total,
      status: 'draft'
    }]).select().single()

    if (qError) {
      alert("Error: " + qError.message)
      setLoading(false)
      return
    }

    if (quote) {
      // 2. Add the individual line items
      const boqItems = items.map(item => ({
        quotation_id: quote.id,
        item_name: item.item_name,
        quantity: item.quantity,
        unit: item.unit,
        rate: item.rate,
        amount: item.quantity * item.rate
      }))
      
      const { error: itemsError } = await supabase.from('boq_items').insert(boqItems)
      
      if (itemsError) alert("Error adding items: " + itemsError.message)
      else router.push('/admin/quotations')
    }
    setLoading(false)
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-white min-h-screen text-black">
      <Link href="/admin/quotations" className="text-indigo-600 font-bold mb-6 inline-block hover:underline">
        ← Back to List
      </Link>
      
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Create BOQ</h1>
          <p className="text-slate-500 font-medium">Build a cost estimate for Rajesh Villa.</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-slate-400">Total Estimate</p>
          <p className="text-3xl font-black text-indigo-600">₹{calculateTotal().toLocaleString()}</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 shadow-inner">
          <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Select Project Site</label>
          <select name="project_id" required className="w-full p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Choose a site...</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.project_name}</option>)}
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-black uppercase text-sm tracking-widest text-slate-900">Line Items</h3>
            <button type="button" onClick={addItem} className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-black transition-all">
              + Add Row
            </button>
          </div>

          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="md:col-span-5">
                <input placeholder="Item Description (e.g. Tile)" className="w-full p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-indigo-500" 
                  onChange={e => updateItem(index, 'item_name', e.target.value)} required />
              </div>
              <div className="md:col-span-2">
                <input type="number" placeholder="Qty" className="w-full p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-indigo-500" 
                  onChange={e => updateItem(index, 'quantity', parseFloat(e.target.value))} required />
              </div>
              <div className="md:col-span-2">
                <input type="number" placeholder="Rate" className="w-full p-3 bg-slate-50 rounded-xl outline-none border border-transparent focus:border-indigo-500" 
                  onChange={e => updateItem(index, 'rate', parseFloat(e.target.value))} required />
              </div>
              <div className="md:col-span-3 flex items-center justify-end font-black text-slate-900">
                ₹{(item.quantity * item.rate).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <button disabled={loading} className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-xl hover:bg-indigo-700 transition-all">
          {loading ? 'FIXING DATABASE SYNC...' : 'SAVE & GENERATE BOQ'}
        </button>
      </form>
    </div>
  )
}