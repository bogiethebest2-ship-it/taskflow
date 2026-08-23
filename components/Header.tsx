"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

const navItems = [
  { label: "Начало", href: "/" },
  { label: "Табло", href: "/dashboard" },
  { label: "Задачи", href: "/tasks" },
  { label: "Learning", href: "/learning" },
  { label: "Проекти", href: "/projects" },
  { label: "Настройки", href: "/settings" },
];

export function Header() {
  const pathname = usePathname();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setIsSignedIn(Boolean(window.localStorage.getItem("taskflow-demo-user")));
      return;
    }

    supabase.auth.getUser().then(({ data }) => setIsSignedIn(Boolean(data.user)));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setIsSignedIn(Boolean(session?.user)));

    return () => data.subscription.unsubscribe();
  }, []);

  async function signOut() {
    if (supabase) {
      await supabase.auth.signOut();
    } else {
      window.localStorage.removeItem("taskflow-demo-user");
      setIsSignedIn(false);
    }
  }

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="rounded-lg text-2xl font-black tracking-tight text-slate-900 outline-none transition hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500">
          TaskFlow
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-100 p-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500",
                  isActive
                    ? "border border-slate-200 bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:bg-white hover:text-slate-900",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div>
          {isSignedIn ? (
            <button type="button" onClick={signOut} className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Изход
            </button>
          ) : (
          <Link href="/auth" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Вход
            </Link>
          )}
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 md:hidden sm:px-6" aria-label="Основна навигация">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`shrink-0 rounded-lg px-3 py-2 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
