'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()
  
  const navItems = [
    { name: 'Home', href: '/mobile/dashboard', icon: '🏠' },
    { name: 'Tasks', href: '/mobile/tasks', icon: '✅' },
    { name: 'Clock', href: '/mobile/attendance', icon: '⏰' },
    { name: 'Photos', href: '/mobile/photos', icon: '📸' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-4 flex justify-between items-center z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link key={item.name} href={item.href} className="flex flex-col items-center gap-1">
            <div className={`p-2 rounded-2xl transition-all ${isActive ? 'bg-indigo-50 text-indigo-600 scale-110' : 'text-slate-400 opacity-60'}`}>
              <span className="text-xl leading-none">
                {item.icon}
              </span>
            </div>
            <span className={`text-[9px] font-black uppercase tracking-tighter ${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
              {item.name}
            </span>
          </Link>
        )
      })}
    </nav>
  )
}