import { CanvasMesh } from "./CanvasMesh";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden border-b">
      <CanvasMesh />
      
      <div className="z-10 grid w-full max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-2">
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl text-foreground">
            Systems & <br />
            Interfaces
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            Specializing in high-performance web architecture, distributed systems, and tactile user experiences.
          </p>
        </div>
        
        <div className="flex items-center justify-center md:justify-end">
          <div className="w-full max-w-sm rounded-lg border bg-muted/50 p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center space-x-2 border-b pb-4">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">command-center</span>
            </div>
            <div className="space-y-2 font-mono text-sm text-muted-foreground">
              <p><span className="text-accent-foreground">~</span> $ init_sequence</p>
              <p>Loading dependencies...</p>
              <p className="animate-pulse">_</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
