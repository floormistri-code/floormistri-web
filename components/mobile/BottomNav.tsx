'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="grid grid-cols-4 h-16">
        <Link
          href="/mobile/dashboard"
          className={`flex flex-col items-center justify-center ${
            isActive('/mobile/dashboard')
              ? 'text-green-600'
              : 'text-gray-600'
          }`}
        >
          <span className="text-2xl mb-1">🏠</span>
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link
          href="/mobile/attendance"
          className={`flex flex-col items-center justify-center ${
            isActive('/mobile/attendance')
              ? 'text-green-600'
              : 'text-gray-600'
          }`}
        >
          <span className="text-2xl mb-1">📍</span>
          <span className="text-xs font-medium">Attendance</span>
        </Link>

        <Link
          href="/mobile/tasks"
          className={`flex flex-col items-center justify-center ${
            isActive('/mobile/tasks')
              ? 'text-green-600'
              : 'text-gray-600'
          }`}
        >
          <span className="text-2xl mb-1">✅</span>
          <span className="text-xs font-medium">Tasks</span>
        </Link>

        <Link
          href="/mobile/payments"
          className={`flex flex-col items-center justify-center ${
            isActive('/mobile/payments')
              ? 'text-green-600'
              : 'text-gray-600'
          }`}
        >
          <span className="text-2xl mb-1">💰</span>
          <span className="text-xs font-medium">Payments</span>
        </Link>
      </div>
    </nav>
  )
}