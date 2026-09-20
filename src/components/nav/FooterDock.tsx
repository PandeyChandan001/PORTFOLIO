"use client";

import { useEffect } from "react";

export function FooterDock() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      const key = e.key.toLowerCase();
      if (key === "c") {
        window.location.href = "mailto:chandanpandey000001@gmail.com";
      }
      if (key === "g") {
        window.open("https://github.com/PandeyChandan001", "_blank", "noopener,noreferrer");
      }
      if (key === "l") {
        window.open("https://leetcode.com/PandeyChandan001", "_blank", "noopener,noreferrer");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const shortcuts = [
    { 
      key: "C", 
      label: "Email Me", 
      href: "mailto:chandanpandey000001@gmail.com" 
    },
    { 
      key: "G", 
      label: "GitHub", 
      href: "https://github.com/PandeyChandan001", 
      target: "_blank", 
      rel: "noopener noreferrer" 
    },
    { 
      key: "L", 
      label: "LeetCode", 
      href: "https://leetcode.com/PandeyChandan001", 
      target: "_blank", 
      rel: "noopener noreferrer" 
    },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#05070B]/80 p-2 backdrop-blur-md shadow-2xl">
        {shortcuts.map((s) => (
          <a 
            key={s.key} 
            href={s.href}
            target={s.target}
            rel={s.rel}
            className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 cursor-pointer"
          >
            <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded bg-white/10 font-mono text-[10px] font-medium text-white">
              {s.key}
            </kbd>
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block whitespace-nowrap">
              {s.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
