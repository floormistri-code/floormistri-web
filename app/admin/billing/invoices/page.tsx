'use client'
import Link from 'next/link'

export default function PlaceholderPage() {
  return (
    <div className="p-8 text-black">
      <Link href="/admin/billing" className="text-indigo-600 font-bold underline">← Back to Finance</Link>
      <h1 className="text-2xl font-black uppercase italic mt-6">Work in Progress</h1>
      <p className="text-slate-500">This list view is being built in the next step.</p>
    </div>
  )
}