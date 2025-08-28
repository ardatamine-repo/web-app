export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl px-12 py-8 flex flex-col items-center space-y-6 min-w-[260px]">
        <div className="w-14 h-14 rounded-full animate-spin bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-800 relative">
          <div className="absolute inset-2 bg-white rounded-full"></div>
        </div>
        <span className="text-gray-800 font-semibold text-xl animate-pulse select-none">
          Cargando...
        </span>
      </div>
    </div>
  );
}