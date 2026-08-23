"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Табло" },
  { href: "/tasks", label: "Задачи" },
  { href: "/learning", label: "Learning" },
  { href: "/projects", label: "Проекти" },
  { href: "/settings", label: "Настройки" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:w-64">
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Навигация</p>
      <nav className="mt-4 space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "flex items-center rounded-xl px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
              ].join(" ")}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
