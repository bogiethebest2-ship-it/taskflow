import Link from "next/link";

const weeklyLessons = [
  {
    week: "Седмица 1",
    title: "Основи и подготовка",
    items: [
      "Подготвих средата за разработка: VS Code, Node.js и Git.",
      "Разбрах какво е Git, repository, commit и branch.",
      "Запознах се с React, Next.js, TypeScript и Tailwind CSS.",
      "Създадох нов Next.js проект с TypeScript и Tailwind.",
      "Разгледах структурата на app/, page.tsx, layout.tsx, globals.css и public/.",
      "Разбрах какво прави npm install и npm run dev.",
      "Промених началната страница и добавих About page.",
      "Добавих навигация между Home и About.",
      "Научих основите на Tailwind и responsive дизайн.",
    ],
  },
  {
    week: "Седмица 2",
    title: "Компоненти и layout",
    items: [
      "Разбрах какво е React component и какво представляват props.",
      "Поделих интерфейса на отделни компоненти: Header, Hero, FeatureCard, Footer.",
      "Научих какво е layout в Next.js и как се различава от page.",
      "Създадох основен layout с Header, Sidebar и основна зона за съдържание.",
      "Направих TaskCard компонент с title, description, status и priority.",
      "Научих как работят масиви и .map() за показване на списъци.",
      "Разбрах ролята на key при рендериране на списъци.",
      "Създадох форма за добавяне на задача и разбрах useState.",
    ],
  },
  {
    week: "Седмица 3",
    title: "Управление на задачи",
    items: [
      "Научих как да добавям нови задачи към state масив.",
      "Разбрах как да използвам spread operator и preventDefault().",
      "Добавих изтриване на задача чрез .filter().",
      "Направих промяна на статус на задачата.",
      "Добавих редактиране на задача и edit mode.",
      "Разбрах как се обновяват конкретни обекти в масив чрез .map().",
      "Добавих филтриране по статус.",
      "Добавих търсене по заглавие и описание.",
      "Показах статистика за задачи.",
      "Създадох детайлна страница за всяка задача.",
    ],
  },
  {
    week: "Седмица 4",
    title: "CRUD и проверки",
    items: [
      "Разбрах какво означава CRUD: Create, Read, Update и Delete.",
      "Добавих потвърждение преди изтриване на задача.",
      "Обработих празно заглавие и невалиден id.",
      "Проверих как се показват съобщения при липсващи данни.",
      "Тествах добавяне, четене, редактиране и изтриване на задачи.",
      "Проверих филтрите, търсенето и статистиката след всяка промяна.",
    ],
  },
  {
    week: "Седмица 5",
    title: "Supabase и база данни",
    items: [
      "Разгледах какво е Supabase и как работят Database и API.",
      "Написах schema за таблица tasks и правилата за достъп до нея.",
      "Определих колони за title, description, status и priority.",
      "Добавих Supabase client и променливи в .env.local.",
      "Добавих зареждане на задачите от базата при активна сесия.",
      "Свързах добавяне, редактиране, статус и изтриване със Supabase.",
    ],
  },
  {
    week: "Седмица 6",
    title: "Authentication и защита",
    items: [
      "Разбрах какво е authentication и разликата между sign up и sign in.",
      "Добавих страница за вход с email и password.",
      "Добавих валидация и съобщение при неуспешен вход.",
      "Свързах регистрацията със Supabase Auth.",
      "Показвам различно меню според това дали потребителят е влязъл.",
      "Ограничих достъпа до задачите за неавтентикирани потребители.",
      "Добавих съобщение при липсваща Supabase конфигурация.",
    ],
  },
];

export default function LearningPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link
          href="/tasks"
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
        >
          ← Назад към задачите
        </Link>

        <div className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Learning</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
            Какво научих през internship-а
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-slate-600">
            Този проект беше първата ми по-сериозна практика в разработката на web приложение. В него
            свързах теорията с реална работа: Next.js, TypeScript, Tailwind CSS, React компоненти,
            маршрутизация и CRUD логика.
          </p>
        </div>
      </div>

      <section className="mt-10 space-y-8">
        {weeklyLessons.map((week) => (
          <article key={week.week} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">{week.week}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-900">{week.title}</h2>
            <ul className="mt-5 space-y-3">
              {week.items.map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </main>
  );
}
