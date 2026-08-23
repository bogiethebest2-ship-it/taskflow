import Link from "next/link";

export default function NextJsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/about" className="text-sm font-medium text-indigo-600">← Назад към технологията</Link>
        <h1 className="mt-6 text-4xl font-black text-slate-900">Next.js</h1>
        <p className="mt-6 text-base leading-8 text-slate-700">
          Next.js е framework, който надгражда React и добавя допълнителна структура за разработка на
          уеб приложения. Той помага с маршрутизацията, създаването на страници, организацията на проекта
          и по-доброто разпределение на логиката. Благодарение на него приложението може да бъде по-лесно
          за развитие, а архитектурата му става по-ясна.
        </p>
        <p className="mt-4 text-base leading-8 text-slate-700">
          В този проект Next.js е използван, за да се организират отделните страници и да се добави по-
          стабилна структура около React компоненти, така че проектът да може да расте без хаос.
        </p>
      </div>
    </main>
  );
}
