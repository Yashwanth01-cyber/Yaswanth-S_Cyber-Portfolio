export function AmbientBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Fine technical grid */}
      <div className="absolute inset-0 bg-grid-fine opacity-60" />

      {/* Large atmospheric grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Animated aurora fields */}
      <div className="aurora-cyan animate-ambient-cyan absolute -left-[12%] top-[8%] h-[520px] w-[520px] rounded-full" />

      <div className="aurora-violet animate-ambient-violet absolute -right-[10%] top-[18%] h-[600px] w-[600px] rounded-full" />

      <div className="aurora-pink animate-ambient-pink absolute left-[25%] top-[48%] h-[500px] w-[500px] rounded-full" />

      <div className="aurora-orange animate-ambient-orange absolute right-[18%] bottom-[5%] h-[420px] w-[420px] rounded-full" />

      {/* Soft cinematic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,9,20,0.32)_100%)]" />

      {/* Top atmospheric fade */}
      <div className="bg-radial-fade absolute inset-x-0 top-0 h-[520px] opacity-70" />
    </div>
  );
}
