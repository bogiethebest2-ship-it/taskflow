import { AppShell } from "@/components/AppShell";

const projects = [
  {
    name: "TaskFlow",
    status: "Готово",
    description: "Личен task manager за организиране на задачи, приоритети и напредък по работата.",
  },
  {
    name: "Learning journal",
    status: "Активно",
    description: "Страница с описания на наученото по време на internship, стъпка по стъпка.",
  },
  {
    name: "Project roadmap",
    status: "Планирано",
    description: "Допълнителни идеи за разширяване на приложението и следващи функционалности.",
  },
];

export default function ProjectsPage() {
  return (
    <AppShell>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Проекти</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Работни идеи и планове</h1>
        <p className="mt-3 text-slate-600">
          Тук се съхраняват основните идеи, които поддържат развитието на приложението и обучението.
        </p>

        <div className="mt-8 grid gap-4">
          {projects.map((project) => (
            <article key={project.name} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-bold text-slate-900">{project.name}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700">
                  {project.status}
                </span>
              </div>
              <p className="mt-3 leading-7 text-slate-600">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
