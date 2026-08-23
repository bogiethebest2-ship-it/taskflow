"use client";

import { useMemo, useState } from "react";
import { initialTasks } from "@/lib/initial-tasks";
import type { Task, TaskPriority, TaskStatus } from "@/types/task";
import { TaskCard } from "./TaskCard";

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [filter, setFilter] = useState<"all" | Task["status"]>("all");

  const visibleTasks = useMemo(
    () => (filter === "all" ? tasks : tasks.filter((task) => task.status === filter)),
    [tasks, filter],
  );

  const counts = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      progress: tasks.filter((task) => task.status === "in-progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    }),
    [tasks],
  );

  function addTask() {
    const cleanTitle = title.trim();
    if (!cleanTitle) return;

    setTasks((current) => [
      {
        id: crypto.randomUUID(),
        title: cleanTitle,
        description: description.trim(),
        status: "todo" as TaskStatus,
        priority,
      },
      ...current,
    ]);

    setTitle("");
    setDescription("");
    setPriority("medium");
  }

  function handleDelete(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  function handleEdit(task: Task) {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
  }

  function handleStatusChange(id: string, status: TaskStatus) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status } : task)));
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-8">
      <section className="grid gap-4 md:grid-cols-4">
        {[
          ["Всички", counts.all, "all"],
          ["За изпълнение", counts.todo, "todo"],
          ["В процес", counts.progress, "in-progress"],
          ["Готови", counts.done, "done"],
        ].map(([label, count, value]) => (
          <button
            key={String(value)}
            onClick={() => setFilter(value as typeof filter)}
            className={`rounded-2xl border bg-white p-5 text-left shadow-sm ${
              filter === value ? "border-slate-500" : "border-slate-200"
            }`}
          >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-1 text-3xl font-bold">{count}</p>
          </button>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">Нова задача</h2>
          <div className="mt-5 space-y-4">
            <label className="block text-sm font-medium">
              Заглавие
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                onKeyDown={(event) => event.key === "Enter" && addTask()}
                placeholder="Напр. Направи началната страница"
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-slate-500"
              />
            </label>

            <label className="block text-sm font-medium">
              Описание
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                placeholder="Кратко описание..."
                className="mt-2 w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-slate-500"
              />
            </label>

            <label className="block text-sm font-medium">
              Приоритет
              <select
                value={priority}
                onChange={(event) => setPriority(event.target.value as TaskPriority)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2.5 outline-none focus:border-slate-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>

            <button
              onClick={addTask}
              disabled={!title.trim()}
              className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Добави задача
            </button>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Моите задачи</h2>
              <p className="text-sm text-slate-500">{visibleTasks.length} резултата</p>
            </div>
          </div>

          <div className="grid gap-4">
            {visibleTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onStatusChange={handleStatusChange}
              />
            ))}

            {visibleTasks.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                Няма задачи за този филтър.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
