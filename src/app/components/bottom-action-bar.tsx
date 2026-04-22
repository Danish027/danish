"use client";

import { Menu, Moon, Search, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ViewTransitionDocument = Document & {
  startViewTransition?: (
    updateCallback: () => void | Promise<void>,
  ) => {
    finished: Promise<void>;
  };
};

export function BottomActionBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);
  const [isTransitionActive, setIsTransitionActive] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const isDarkTheme = isMounted && resolvedTheme === "dark";

  async function toggleTheme() {
    if (!isMounted || isTransitionActive) return;
    const nextTheme = isDarkTheme ? "light" : "dark";
    const viewTransitionDocument = document as ViewTransitionDocument;

    if (!viewTransitionDocument.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    setIsTransitionActive(true);
    const transition = viewTransitionDocument.startViewTransition(() => {
      setTheme(nextTheme);
    });

    try {
      await transition.finished;
    } finally {
      setIsTransitionActive(false);
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-6 z-20 flex justify-center px-4">
      <div className="relative z-10 flex h-10 items-center gap-0.5 rounded-full border border-[var(--card-border)] bg-[var(--background)] px-1.5 text-[var(--card-foreground)] shadow-[var(--card-shadow)]">
        <button
          type="button"
          aria-label="Search with AI"
          className="flex h-7 w-[140px] items-center gap-1.5 rounded-full bg-[var(--card-muted)] px-2.5 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--card-muted-hover)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--card-ring)] sm:w-[190px]"
        >
          <Search className="size-[12px] shrink-0" aria-hidden="true" />
          <span className="flex-1 truncate text-left text-[11.5px]">
            Search with AI...
          </span>
          <kbd className="hidden items-center gap-0.5 rounded-[4px] border border-[var(--card-kbd-border)] bg-[var(--card-kbd)] px-1 py-px font-mono text-[8.5px] font-medium tracking-[0.04em] text-[var(--muted-foreground)] sm:inline-flex">
            ⌘K
          </kbd>
        </button>

        <div className="mx-1 h-3 w-px shrink-0 bg-[var(--card-divider)]" />

        <button
          type="button"
          aria-label={isDarkTheme ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={isDarkTheme}
          onClick={toggleTheme}
          disabled={isTransitionActive}
          className="flex size-7 items-center justify-center rounded-full text-[var(--card-foreground)] transition-colors hover:bg-[var(--card-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--card-ring)]"
        >
          {isDarkTheme ? (
            <Sun className="size-[13px] sm:size-[14px]" aria-hidden="true" />
          ) : (
            <Moon className="size-[13px] sm:size-[14px]" aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          aria-label="Open menu"
          className="flex size-7 items-center justify-center rounded-full text-[var(--card-foreground)] transition-colors hover:bg-[var(--card-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--card-ring)]"
        >
          <Menu className="size-[14px]" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Scroll progress"
          className="hidden size-7 items-center justify-center rounded-full text-[var(--card-foreground)] transition-colors sm:flex"
        >
          <span className="relative flex items-center justify-center text-[var(--muted-foreground)]">
            <svg width="16" height="16" className="absolute">
              <circle
                cx="8"
                cy="8"
                r="6.8"
                strokeWidth="2.2"
                fill="none"
                className="stroke-[var(--card-kbd-border)]"
              />
            </svg>
            <svg width="16" height="16" className="absolute -rotate-90">
              <circle
                cx="8"
                cy="8"
                r="6.8"
                strokeWidth="2.2"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeDasharray="42.72566"
                strokeDashoffset="23.26448"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
