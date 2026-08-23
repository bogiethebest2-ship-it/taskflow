"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { sampleTasks } from "@/lib/tasks-data";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const statusLabels = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
  const [task, setTask] = useState<Task | null | undefined>(undefined);

  useEffect(() => {
    const taskId = Array.isArray(params.id) ? params.id[0] : params.id;
    const savedTasks = window.localStorage.getItem("taskflow-tasks");

    if (savedTasks) {
      try {
        const savedTask = (JSON.parse(savedTasks) as Task[]).find((item) => item.id === taskId);
        if (savedTask) {
          setTask(savedTask);
          return;
        }
      } catch {
        window.localStorage.removeItem("taskflow-tasks");
      }
    }

    setTask(sampleTasks.find((item) => item.id === taskId) ?? null);
  }, [params.id]);

  if (task === undefined) {
    return <main className="mx-auto max-w-4xl px-6 py-12 text-slate-600">Зареждане...</main>;
  }

  if (task === null) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-3xl font-black text-slate-900">Задачата не е намерена</h1>
        <Link href="/tasks" className="mt-4 inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-800">
          ← Назад към задачите
        </Link>
      </main>
    );
  }
  high: "High",
} as const;

const statusStyles = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-amber-100 text-amber-800",
  done: "bg-emerald-100 text-emerald-800",
} as const;

const priorityStyles = {
  low: "bg-blue-100 text-blue-700",
  medium: "bg-violet-100 text-violet-700",
  high: "bg-rose-100 text-rose-700",
} as const;

export default function TaskDetailPage() {
  const params = useParams();
  const task = sampleTasks.find((item) => item.id === params.id);

  if (!task) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <Link href="/tasks" className="mb-6 inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800">
        ← Назад към задачите
      </Link>

      <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[task.status]}`}>
            {statusLabels[task.status]}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>
            {priorityLabels[task.priority]}
          </span>
        </div>

        <h1 className="mt-6 text-3xl font-black text-slate-900">{task.title}</h1>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Обяснение</p>
          <p className="mt-3 text-base leading-8 text-slate-700">{task.description}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Статус</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{statusLabels[task.status]}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Приоритет</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{priorityLabels[task.priority]}</p>
          </div>
        </div>
      </article>
    </main>
  );
}
