"use client";

import { useEffect, useState } from "react";

export function FooterDock() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      
      const key = e.key.toLowerCase();
      if (key === "c") {
        navigator.clipboard.writeText("chandan.pandey@example.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      if (key === "r") {
        window.open("/resume.pdf", "_blank");
      }
      if (key === "g") {
        window.open("https://github.com", "_blank");
      }
      if (key === "l") {
        window.open("https://leetcode.com", "_blank");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const shortcuts = [
    { key: "C", label: copied ? "Copied!" : "Copy Email" },
    { key: "R", label: "View Resume" },
    { key: "G", label: "GitHub" },
    { key: "L", label: "LeetCode" },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#08090C]/80 p-2 backdrop-blur-md shadow-2xl">
        {shortcuts.map((s) => (
          <div key={s.key} className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors hover:bg-white/5 cursor-pointer">
            <kbd className="flex h-5 min-w-[20px] items-center justify-center rounded bg-white/10 font-mono text-[10px] font-medium text-white">
              {s.key}
            </kbd>
            <span className="text-xs text-muted-foreground font-medium hidden sm:inline-block">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
