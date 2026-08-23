"use client";

import Link from "next/link";
import { useState } from "react";

const progressItems = [
  {
    key: "design",
    label: "Дизайн",
    status: "Готово",
    progress: "w-full",
    accent: "bg-emerald-500",
    detail:
      "Подредих екрана така, че да виждам задачите си веднага, без излишни панели.",
  },
  {
    key: "navigation",
    label: "Навигация",
    status: "Готово",
    progress: "w-full",
    accent: "bg-emerald-500",
    detail:
      "Преминавам между началото, задачите и проектите от едно ясно меню.",
  },
  {
    key: "tasks",
    label: "Задачи",
    status: "Готово",
    progress: "w-full",
    accent: "bg-indigo-500",
    detail: "Тук добавям задачи, сменям приоритети и отбелязвам какво е готово.",
  },
] as const;

export function Hero() {
  const [activeKey, setActiveKey] = useState<(typeof progressItems)[number]["key"]>("design");

  const activeItem = progressItems.find((item) => item.key === activeKey) ?? progressItems[0];

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-24">
      <div>
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Моят списък за работа
        </span>
        <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-900 sm:text-6xl">
          Знам какво следва.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
          TaskFlow събира задачите ми на едно място. Отварям го, избирам следващото и продължавам.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/tasks"
            className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-200 transition hover:bg-slate-700"
          >
            Към задачите
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            За проекта
          </Link>
        </div>
      </div>

      <div className="border-2 border-slate-900 bg-white p-6 shadow-[10px_10px_0_#d7d2c6]">
        <div className="border border-slate-200 bg-[#f7f5ef] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-500">Тази седмица</p>
            <span className="text-xs font-bold text-teal-700">3 от 3</span>
          </div>

          <div className="mt-6 space-y-3">
            {progressItems.map((item) => {
              const isActive = item.key === activeKey;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setActiveKey(item.key)}
                  className={`w-full rounded-2xl border p-3 text-left transition ${
                    isActive
                      ? "border-slate-900 bg-white shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium text-slate-700">{item.label}</span>
                    <span className="text-xs font-semibold text-slate-500">{item.status}</span>
                  </div>
                  <div className="mt-3 h-2 rounded-full bg-slate-100">
                    <div className={`h-2 rounded-full ${item.accent} ${item.progress}`} />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 border-l-4 border-amber-500 bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Бележка</p>
            <h2 className="mt-2 text-lg font-bold text-slate-900">{activeItem.label}</h2>
            {activeItem.detail ? <p className="mt-2 text-sm leading-6 text-slate-600">{activeItem.detail}</p> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
