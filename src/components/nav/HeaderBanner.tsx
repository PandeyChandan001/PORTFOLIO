export function HeaderBanner() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-4 bg-transparent z-40">
      <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/80 border border-emerald-500/60 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.3)] mb-4 mt-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
        </span>
        <span className="font-mono text-xs md:text-sm font-black tracking-[0.22em] text-white uppercase drop-shadow-[0_0_8px_rgba(16,185,129,0.7)]">
          PORTFOLIO: CRICKET EDITION
        </span>
      </div>
      <h2 className="text-white font-mono text-base md:text-lg font-bold tracking-tight text-center">
        "A Software Engineer's Portfolio, Played on 22 Yards."
      </h2>
    </div>
  );
}
