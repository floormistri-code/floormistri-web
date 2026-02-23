import Sidebar from '@/components/Sidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* The Sidebar stays fixed on the left */}
      <Sidebar />

      {/* The main content scrolls on the right */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none p-4 md:p-0">
          {children}
        </main>
      </div>
    </div>
  )
}