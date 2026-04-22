"use client";

import { Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function BottomActionBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const isDarkTheme = isMounted && resolvedTheme === "dark";

  function toggleTheme() {
    if (!isMounted) return;
    setTheme(isDarkTheme ? "light" : "dark");
  }

  return (
    <div className="fixed inset-x-0 bottom-6 z-20 flex justify-center px-4">
      <div className="relative z-10 flex h-12 items-center gap-1 rounded-full border border-black/10 bg-white px-2 text-neutral-700 shadow-[0_10px_25px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-black/10 dark:border-white/10 dark:bg-[#14181B] dark:text-neutral-300 dark:shadow-[0_12px_30px_rgba(0,0,0,0.5)] dark:ring-white/10">
        <button
          type="button"
          aria-label="Search with AI"
          className="flex h-8 w-[160px] items-center gap-2 rounded-full bg-black/5 px-3 text-neutral-600 transition-colors hover:bg-black/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 sm:w-[210px] dark:bg-white/10 dark:text-neutral-300 dark:hover:bg-white/15 dark:focus-visible:ring-neutral-700"
        >
          <Search className="size-[14px] shrink-0" aria-hidden="true" />
          <span className="flex-1 truncate text-left text-[12.5px]">
            Search with AI...
          </span>
          <kbd className="hidden items-center gap-0.5 rounded-[4px] border border-neutral-200 bg-white/70 px-1 py-px font-mono text-[9.5px] font-medium tracking-[0.04em] text-neutral-600 sm:inline-flex dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-400">
            ⌘K
          </kbd>
        </button>

        <div className="mx-1 h-4 w-px shrink-0 bg-black/10 dark:bg-white/10" />

        <button
          type="button"
          aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={isDarkTheme}
          onClick={toggleTheme}
          className="flex size-8 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 dark:text-neutral-300 dark:hover:bg-white/10 dark:focus-visible:ring-neutral-700"
        >
          {isDarkTheme ? (
            <Sun className="size-[15px] sm:size-[17px]" aria-hidden="true" />
          ) : (
            <Moon className="size-[15px] sm:size-[17px]" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          aria-label="Open menu"
          className="flex size-8 items-center justify-center rounded-full text-neutral-700 transition-colors hover:bg-black/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 dark:text-neutral-300 dark:hover:bg-white/10 dark:focus-visible:ring-neutral-700"
        >
          <Menu className="size-[16px]" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Scroll progress"
          className="hidden size-8 items-center justify-center rounded-full text-neutral-700 transition-colors sm:flex dark:text-neutral-300"
        >
          <span className="relative flex items-center justify-center text-neutral-600 dark:text-neutral-300">
            <svg width="18" height="18" className="absolute">
              <circle
                cx="9"
                cy="9"
                r="7.75"
                strokeWidth="2.5"
                fill="none"
                className="stroke-[rgb(229,231,235)] dark:stroke-neutral-700"
              />
            </svg>
            <svg width="18" height="18" className="absolute -rotate-90">
              <circle
                cx="9"
                cy="9"
                r="7.75"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeDasharray="48.69468613064179"
                strokeDashoffset="26.517751002198406"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
