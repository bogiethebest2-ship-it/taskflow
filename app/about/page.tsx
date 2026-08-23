import Link from "next/link";

const technologies = [
  {
    slug: "react",
    title: "React",
    shortDescription: "Създава интерактивни UI части и прави интерфейса динамичен и лесен за използване.",
  },
  {
    slug: "nextjs",
    title: "Next.js",
    shortDescription: "Добавя структура, маршрутизация и по-добра организация за създаване на страници.",
  },
  {
    slug: "app-router",
    title: "App Router",
    shortDescription: "Организира страниците и навигацията в приложението чрез app/ структурата.",
  },
  {
    slug: "typescript",
    title: "TypeScript",
    shortDescription: "Проверява типове и спомага за по-сигурен и по-четим код.",
  },
  {
    slug: "tailwind-css",
    title: "Tailwind CSS",
    shortDescription: "Ускорява стилизирането чрез готови CSS класове и по-ясна визуална структура.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          ← Начало
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">За проекта</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            TaskFlow
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            Това е моят личен task manager проект. Пиша го, за да не загубя нишката в ежедневните
            задачи, да виждам кое има приоритет и да имам по-ясен поглед върху работата, която трябва
            да свърша.
          </p>
        </div>
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Технологии в проекта</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {technologies.map((item) => (
            <Link
              key={item.slug}
              href={`/about/${item.slug}`}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-slate-300 hover:bg-white hover:shadow-md"
            >
              <p className="text-lg font-bold text-slate-900">{item.title}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.shortDescription}</p>
              <span className="mt-4 inline-flex text-sm font-medium text-indigo-600">Прочети повече →</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
