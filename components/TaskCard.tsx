import Link from "next/link";
import type { Task, TaskStatus } from "@/types/task";

const statusLabels = {
  todo: "Да се направи",
  "in-progress": "В процес",
  done: "Готово",
} as const;

const statusStyles = {
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-amber-100 text-amber-800",
  done: "bg-emerald-100 text-emerald-800",
} as const;

const priorityLabels = {
  low: "Нисък",
  medium: "Среден",
  high: "Висок",
} as const;

const priorityStyles = {
  low: "bg-blue-100 text-blue-700",
  medium: "bg-violet-100 text-violet-700",
  high: "bg-rose-100 text-rose-700",
} as const;

export function TaskCard({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}: {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link href={`/tasks/${task.id}`} className="block rounded-lg outline-none hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500">
            <h3 className="font-semibold text-slate-900">{task.title}</h3>
          </Link>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Обяснение</p>
          <p className="mt-2 text-sm leading-6 text-slate-600">{task.description || "Няма допълнително описание."}</p>
        </div>

        <div className="flex flex-col items-end gap-2">
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[task.status]}`}>
            {statusLabels[task.status]}
          </span>
          <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>
            {priorityLabels[task.priority]}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <select
          value={task.status}
          onChange={(event) => onStatusChange(task.id, event.target.value as TaskStatus)}
          aria-label={`Промени статуса на ${task.title}`}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none transition hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="todo">Да се направи</option>
          <option value="in-progress">В процес</option>
          <option value="done">Готово</option>
        </select>

        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition hover:border-slate-300 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          Редактирай
        </button>

        <Link
          href={`/tasks/${task.id}`}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white outline-none transition hover:bg-indigo-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Подробности
        </Link>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          aria-label={`Изтрий задачата ${task.title}`}
          className="ml-auto rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 outline-none transition hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-400"
        >
          Изтрий
        </button>
      </div>
    </article>
  );
}
