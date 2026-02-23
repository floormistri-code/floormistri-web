'use client'

export default function PhotosPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-black italic uppercase mb-6">Site Photos</h1>
      <div className="aspect-square w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl shadow-lg">📸</div>
        <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Tap to capture work</p>
      </div>
      <button className="w-full bg-slate-900 text-white py-6 rounded-[2rem] mt-8 font-black uppercase tracking-widest">Upload from Gallery</button>
    </div>
  )
}