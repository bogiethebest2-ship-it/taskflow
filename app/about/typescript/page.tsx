import Link from "next/link";

export default function TypeScriptPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/about" className="text-sm font-medium text-indigo-600">← Назад към технологията</Link>
        <h1 className="mt-6 text-4xl font-black text-slate-900">TypeScript</h1>
        <p className="mt-6 text-base leading-8 text-slate-700">
          TypeScript е JavaScript с типове. Това означава, че разработчикът може да дефинира какви данни
          очаква една функция, променлива или компонент, и тогава средата предупреждава за възможни
          грешки още преди приложението да се стартира. Това прави кода по-сигурен и по-лесен за
          поддръжка.
        </p>
        <p className="mt-4 text-base leading-8 text-slate-700">
          В този проект TypeScript помага да се избегнат чести проблеми при работа с данни, статути,
          приоритети и компоненти, като същевременно прави кода по-четим и по-лесен за разрастване.
        </p>
      </div>
    </main>
  );
}
