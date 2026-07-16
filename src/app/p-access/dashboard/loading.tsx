export default function DashboardLoading() {
  return (
    <div className="flex h-screen bg-[#0a0f1e] text-slate-200">
      <div className="w-64 border-r border-white/5 p-6 space-y-6">
        <div className="h-10 w-full skeleton rounded-xl opacity-20" />
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-full skeleton rounded-xl opacity-10"
              style={{ animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 skeleton rounded-3xl opacity-10"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <div className="h-[400px] skeleton rounded-[3rem] opacity-5" />
      </div>
    </div>
  );
}
