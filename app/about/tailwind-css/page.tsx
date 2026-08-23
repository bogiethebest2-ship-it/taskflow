import Link from "next/link";

export default function TailwindCssPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/about" className="text-sm font-medium text-indigo-600">← Назад към технологията</Link>
        <h1 className="mt-6 text-4xl font-black text-slate-900">Tailwind CSS</h1>
        <p className="mt-6 text-base leading-8 text-slate-700">
          Tailwind CSS е CSS framework, който позволява бързо и удобно стилизиране на интерфейса чрез
          готови класове. Вместо да пишем много различни стилове в отделен CSS файл, можем директно да
          добавяме класове към HTML или React компоненти и да оформяме интерфейса по-ефективно.
        </p>
        <p className="mt-4 text-base leading-8 text-slate-700">
          В този проект Tailwind държи стиловете близо до компонентите. Така променям даден екран,
          без да търся правилата му в много различни CSS файлове.
        </p>
      </div>
    </main>
  );
}
