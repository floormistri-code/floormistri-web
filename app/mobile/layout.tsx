import BottomNav from '@/components/mobile/BottomNav'

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-slate-50 min-h-screen pb-24 font-sans selection:bg-indigo-100">
      {/* This container centers the app and gives it a max-width for larger screens */}
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative border-x border-slate-100">
        {children}
        
        {/* The persistent navigation bar */}
        <BottomNav />
      </div>
    </div>
  )
}