import { AppShell } from "@/components/AppShell";
import { sampleTasks } from "@/lib/tasks-data";

const totalTasks = sampleTasks.length;
const todo = sampleTasks.filter((task) => task.status === "todo").length;
const inProgress = sampleTasks.filter((task) => task.status === "in-progress").length;
const done = sampleTasks.filter((task) => task.status === "done").length;

const stats = [
  { label: "Общо задачи", value: totalTasks, tone: "bg-slate-900 text-white" },
  { label: "To do", value: todo, tone: "bg-slate-100 text-slate-700" },
  { label: "In progress", value: inProgress, tone: "bg-amber-100 text-amber-800" },
  { label: "Done", value: done, tone: "bg-emerald-100 text-emerald-800" },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Табло</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Преглед на проекта</h1>
        <p className="mt-3 text-slate-600">
          Тук виждам колко задачи имам и какво е готово.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className={`rounded-2xl border border-slate-200 p-5 ${stat.tone}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-80">{stat.label}</p>
              <p className="mt-3 text-3xl font-black">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <h2 className="text-xl font-bold text-slate-900">Текущо състояние</h2>
          <p className="mt-3 leading-7 text-slate-600">
            Задачите са организирани по статус и приоритет. Промените в този екран важат за примерните данни.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
