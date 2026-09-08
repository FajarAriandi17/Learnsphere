"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { Sun, Moon } from "lucide-react";

export function AnimatedThemeToggler() {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("dark", saved === "dark");
    } else if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface-card text-on-surface shadow-sm"
      >
        <Moon className="h-5 w-5" />
      </button>
    );
  }

  const toggle = () => {
    if (animating) return;
    setAnimating(true);

    const next = theme === "light" ? "dark" : "light";

    // View Transitions API
    if ("startViewTransition" in document && (document as any).startViewTransition) {
      (document as any).startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
          document.documentElement.classList.toggle("dark", next === "dark");
          localStorage.setItem("theme", next);
        });
      });
    } else {
      flushSync(() => {
        setTheme(next);
        document.documentElement.classList.toggle("dark", next === "dark");
        localStorage.setItem("theme", next);
      });
    }

    setTimeout(() => setAnimating(false), 600);
  };

  return (
    <button
      onClick={toggle}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      title={theme === "light" ? "Dark Theme" : "Light Theme"}
      data-magicui-theme-vt={animating ? "active" : undefined}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-surface-card text-on-surface shadow-sm transition-all hover:scale-105 hover:border-kurikulum-k13 dark:bg-surface-card dark:text-on-surface"
    >
      {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
