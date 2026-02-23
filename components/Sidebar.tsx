'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()

  const links = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Projects', href: '/admin/projects', icon: '🏗️' },
    { name: 'Clients', href: '/admin/clients', icon: '👥' },
    { name: 'Craftsmen', href: '/admin/craftsmen', icon: '👷' },
    { name: 'Quotations', href: '/admin/quotations', icon: '📄' }, // New Quotations Link Added Here
  ]

  return (
    <div className="hidden md:flex flex-col w-64 bg-slate-900 h-screen sticky top-0 text-white p-6">
      <h2 className="text-2xl font-black mb-10 tracking-tighter italic">FLOORMISTRI</h2>
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={`flex items-center gap-3 p-4 rounded-2xl font-bold transition-all ${
                isActive ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              {link.name}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto pt-6 border-t border-slate-800">
         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">System Status</p>
         <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-xs font-bold">Supabase Online</span>
         </div>
      </div>
    </div>
  )
}