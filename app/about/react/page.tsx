import Link from "next/link";

export default function ReactPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/about" className="text-sm font-medium text-indigo-600">← Назад към технологията</Link>
        <h1 className="mt-6 text-4xl font-black text-slate-900">React</h1>
        <p className="mt-6 text-base leading-8 text-slate-700">
          React е библиотеката, която помага да се създават интерактивни UI части като бутони, форми,
          карти и списъци. Тя позволява на интерфейса да реагира бързо и ясно на действията на
          потребителя, без да се презарежда цялата страница. В проекта React е използван за създаване на
          по-ясна структура на компонентите и за по-лесно управление на динамичните елементи.
        </p>
        <p className="mt-4 text-base leading-8 text-slate-700">
          С други думи, React помага да разделим страницата на отделни части, които се управляват отделно,
          а това прави кода по-четим, по-лесен за разработка и по-удобен за поддръжка.
        </p>
      </div>
    </main>
  );
}
