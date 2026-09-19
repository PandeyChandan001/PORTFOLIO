export function HeaderBanner() {
  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-4 bg-transparent z-40">
      <div className="flex items-center gap-2 bg-slate-900/80 border border-[#10B981]/30 px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs text-white mb-2 shadow-sm backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
        </span>
        ENGINEERING PORTFOLIO • CRICKET EDITION
      </div>
      <h2 className="text-white font-mono text-sm md:text-base font-semibold tracking-tight text-center">
        "A Software Engineer's Portfolio, Played on 22 Yards."
      </h2>
      <p className="text-slate-400 font-mono text-xs md:text-sm mt-1 text-center max-w-lg">
        "Code, systems, and full-stack projects built like a live cricket innings."
      </p>
    </div>
  );
}
