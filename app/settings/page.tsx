"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/AppShell";
import type { TaskPriority } from "@/types/task";

const settingsStorageKey = "taskflow-settings";
const tasksStorageKey = "taskflow-tasks";

type Settings = {
  compactView: boolean;
  notifications: boolean;
  defaultPriority: TaskPriority;
};

const defaultSettings: Settings = {
  compactView: false,
  notifications: true,
  defaultPriority: "medium",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [message, setMessage] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedSettings = window.localStorage.getItem(settingsStorageKey);
    if (!savedSettings) return;

    try {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    } catch {
      window.localStorage.removeItem(settingsStorageKey);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("taskflow-theme");
    const nextTheme = savedTheme === "dark" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  function updateSetting<Key extends keyof Settings>(key: Key, value: Settings[Key]) {
    setSettings((current) => ({ ...current, [key]: value }));
    setMessage("Настройката е запазена.");
  }

  function archiveCompletedTasks() {
    const savedTasks = window.localStorage.getItem(tasksStorageKey);
    if (!savedTasks) {
      setMessage("Няма задачи за архивиране.");
      return;
    }

    try {
      const tasks = JSON.parse(savedTasks) as Array<{ status: string }>;
      const activeTasks = tasks.filter((task) => task.status !== "done");
      window.localStorage.setItem(tasksStorageKey, JSON.stringify(activeTasks));
      setMessage(`${tasks.length - activeTasks.length} готови задачи са архивирани.`);
    } catch {
      setMessage("Архивирането не можа да завърши.");
    }
  }

  function resetSettings() {
    setSettings(defaultSettings);
    setMessage("Настройките са върнати по подразбиране.");
  }

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("taskflow-theme", nextTheme);
    setMessage("Режимът е запазен.");
  }

  return (
    <AppShell>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Настройки</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Как да изглежда TaskFlow</h1>
        <p className="mt-3 text-slate-600">Промените се запазват автоматично в този браузър.</p>

        <div className="mt-8 space-y-4">
          <section className="border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Визуален стил</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Избери по-компактен списък за екрани с много задачи.</p>
              </div>
              <label className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={settings.compactView} onChange={(event) => updateSetting("compactView", event.target.checked)} className="h-4 w-4 accent-slate-900" />
                Компактен вид
              </label>
            </div>
            <button type="button" onClick={toggleTheme} className="mt-5 border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:border-slate-900 hover:text-slate-900">
              {theme === "dark" ? "Превключи към светъл режим" : "Превключи към тъмен режим"}
            </button>
          </section>

          <section className="border border-slate-200 bg-white p-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Известия</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">Разреши напомнянията за задачи, които чакат внимание.</p>
              </div>
              <label className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-700">
                <input type="checkbox" checked={settings.notifications} onChange={(event) => updateSetting("notifications", event.target.checked)} className="h-4 w-4 accent-slate-900" />
                Включени
              </label>
            </div>
          </section>

          <section className="border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-900">Лични предпочитания</h2>
            <label className="mt-4 flex max-w-xs flex-col gap-2 text-sm font-medium text-slate-700">
              Начален приоритет на нова задача
              <select value={settings.defaultPriority} onChange={(event) => updateSetting("defaultPriority", event.target.value as TaskPriority)} className="border border-slate-300 bg-white px-3 py-2.5 outline-none focus:border-slate-900">
                <option value="low">Нисък</option>
                <option value="medium">Среден</option>
                <option value="high">Висок</option>
              </select>
            </label>
          </section>

          <section className="border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-bold text-slate-900">Архивиране</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Премести готовите задачи извън активния списък.</p>
            <button type="button" onClick={archiveCompletedTasks} className="mt-4 border border-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-900 hover:text-white">Архивирай готовите</button>
          </section>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="button" onClick={resetSettings} className="text-sm font-medium text-slate-500 underline underline-offset-4 hover:text-slate-900">Върни настройките</button>
          {message && <p className="text-sm font-medium text-teal-700">{message}</p>}
        </div>
      </div>
    </AppShell>
  );
}
