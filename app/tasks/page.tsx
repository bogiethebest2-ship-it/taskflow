"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { TaskCard } from "@/components/TaskCard";
import { sampleTasks } from "@/lib/tasks-data";
import { supabase } from "@/lib/supabase-browser";
import type { Task, TaskPriority, TaskStatus } from "@/types/task";

const initialSampleTasks: Task[] = sampleTasks;
const tasksStorageKey = "taskflow-tasks";

const emptyForm = {
  title: "",
  description: "",
  status: "todo" as TaskStatus,
  priority: "medium" as TaskPriority,
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(initialSampleTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | TaskStatus>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [compactView, setCompactView] = useState(false);
  const [defaultPriority, setDefaultPriority] = useState<TaskPriority>("medium");
  const hasLoadedTasks = useRef(false);

  useEffect(() => {
    let active = true;

    async function loadTasks() {
      if (supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase.from("tasks").select("id, title, description, status, priority").order("created_at", { ascending: false });
          if (!error && data && active) {
            setTasks(data as Task[]);
            hasLoadedTasks.current = true;
            return;
          }
        }
      }

      const savedTasks = window.localStorage.getItem(tasksStorageKey);

      if (savedTasks && active) {
        try {
          setTasks(JSON.parse(savedTasks) as Task[]);
        } catch {
          window.localStorage.removeItem(tasksStorageKey);
        }
      }

      hasLoadedTasks.current = true;
    }

    loadTasks();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const savedSettings = window.localStorage.getItem("taskflow-settings");
    if (!savedSettings) return;

    try {
      const settings = JSON.parse(savedSettings) as { compactView?: boolean; defaultPriority?: TaskPriority };
      setCompactView(Boolean(settings.compactView));
      if (settings.defaultPriority) {
        setDefaultPriority(settings.defaultPriority);
        setForm((current) => ({ ...current, priority: settings.defaultPriority! }));
      }
    } catch {
      window.localStorage.removeItem("taskflow-settings");
    }
  }, []);

  useEffect(() => {
    if (hasLoadedTasks.current) {
      window.localStorage.setItem(tasksStorageKey, JSON.stringify(tasks));
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus = filter === "all" || task.status === filter;
      const normalizedSearch = search.trim().toLowerCase();
      const matchesSearch =
        normalizedSearch.length === 0 ||
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch);

      return matchesStatus && matchesSearch;
    });
  }, [tasks, filter, search]);

  const taskStats = useMemo(
    () => ({
      all: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      "in-progress": tasks.filter((task) => task.status === "in-progress").length,
      done: tasks.filter((task) => task.status === "done").length,
    }),
    [tasks],
  );

  function resetForm() {
    setForm({ ...emptyForm, priority: defaultPriority });
    setEditingId(null);
    setFormError("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = form.title.trim();
    if (!trimmedTitle) {
      setFormError("Добави заглавие, за да създадеш задача.");
      return;
    }

    if (editingId) {
      const updatedTask = {
        title: trimmedTitle,
        description: form.description.trim(),
        status: form.status,
        priority: form.priority,
      };
      setTasks((current) =>
        current.map((task) =>
          task.id === editingId
            ? { ...task, ...updatedTask }
            : task,
        ),
      );
      if (supabase) await supabase.from("tasks").update(updatedTask).eq("id", editingId);
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        title: trimmedTitle,
        description: form.description.trim(),
        status: form.status,
        priority: form.priority,
      } satisfies Task;

      setTasks((current) => [newTask, ...current]);

      if (supabase) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          const { data } = await supabase.from("tasks").insert({
            title: newTask.title,
            description: newTask.description,
            status: newTask.status,
            priority: newTask.priority,
            user_id: user.id,
          }).select("id, title, description, status, priority").single();
          if (data) {
            setTasks((current) => current.map((task) => (task.id === newTask.id ? (data as Task) : task)));
          }
        }
      }
    }

    resetForm();
  }

  async function handleDelete(id: string) {
    const task = tasks.find((item) => item.id === id);
    if (!task || !window.confirm(`Да изтрия ли задачата „${task.title}“?`)) return;

    setTasks((current) => current.filter((task) => task.id !== id));
    if (supabase) await supabase.from("tasks").delete().eq("id", id);
    if (editingId === id) resetForm();
  }

  async function handleStatusChange(id: string, status: TaskStatus) {
    setTasks((current) => current.map((task) => (task.id === id ? { ...task, status } : task)));
    if (supabase) await supabase.from("tasks").update({ status }).eq("id", id);
  }

  function handleEdit(task: Task) {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
  }

  return (
    <AppShell>
      <div>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Tasks</p>
            <h1 className="mt-3 text-3xl font-black text-slate-900">Моят списък със задачи</h1>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Всички", taskStats.all],
              ["Да се направи", taskStats.todo],
              ["В процес", taskStats["in-progress"]],
              ["Готово", taskStats.done],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-center">
                <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
            <span className="text-sm text-slate-500">Търсене</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Търсене по заглавие или описание"
              className="w-full border-0 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(["all", "todo", "in-progress", "done"] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                  filter === status
                    ? "bg-slate-900 text-white"
                    : "border border-slate-200 bg-white text-slate-600 hover:text-slate-900"
                }`}
              >
                {status === "all" ? "Всички" : status === "todo" ? "Да се направи" : status === "in-progress" ? "В процес" : "Готово"}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">{editingId ? "Редактиране на задача" : "Добави нова задача"}</h2>
            {editingId && (
              <button type="button" onClick={resetForm} className="text-sm font-medium text-slate-500 hover:text-slate-900">
                Cancel
              </button>
            )}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Заглавие
              <input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-slate-500"
                placeholder="Например: Направи нова секция"
              />
              {formError && <p className="mt-2 text-sm font-medium text-rose-600">{formError}</p>}
            </label>

            <label className="block text-sm font-medium text-slate-700">
              Приоритет
              <select
                value={form.priority}
                onChange={(event) => setForm((current) => ({ ...current, priority: event.target.value as TaskPriority }))}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-slate-500"
              >
                <option value="low">Нисък</option>
                <option value="medium">Среден</option>
                <option value="high">Висок</option>
              </select>
            </label>
          </div>

          <label className="mt-4 block text-sm font-medium text-slate-700">
            Описание
            <textarea
              value={form.description}
              onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
              rows={3}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-slate-500"
              placeholder="Кратко описание на задачата"
            />
          </label>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="block text-sm font-medium text-slate-700">
              Статус
              <select
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as TaskStatus }))}
                className="mt-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 outline-none transition focus:border-slate-500"
              >
                <option value="todo">Да се направи</option>
                <option value="in-progress">В процес</option>
                <option value="done">Готово</option>
              </select>
            </label>

            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              {editingId ? "Запази промените" : "Добави задача"}
            </button>
          </div>
        </form>

          <div className={`mt-8 grid ${compactView ? "gap-2" : "gap-4"}`}>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              Няма задачи за избрания филтър или за търсенето.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
