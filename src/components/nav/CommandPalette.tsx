"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/80 pt-[20vh] backdrop-blur-sm px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-xl border bg-background shadow-2xl">
        <div className="flex items-center border-b px-4">
          <Search className="h-5 w-5 text-muted-foreground mr-2" />
          <input
            autoFocus
            className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground text-foreground"
            placeholder="Search projects, read case studies, or type a command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>
        
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.length > 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : (
            <div className="space-y-1">
              <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">Quick Actions</div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center rounded-md px-2 py-2 text-sm text-foreground hover:bg-muted/50 text-left"
              >
                Copy Email Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
