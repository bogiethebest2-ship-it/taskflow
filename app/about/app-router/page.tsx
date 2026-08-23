import Link from "next/link";

export default function AppRouterPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <Link href="/about" className="text-sm font-medium text-indigo-600">← Назад към технологията</Link>
        <h1 className="mt-6 text-4xl font-black text-slate-900">App Router</h1>
        <p className="mt-6 text-base leading-8 text-slate-700">
          App Router е начинът, по който Next.js управлява страниците и маршрутизира различните части на
          приложението. Той използва структурата на папката app/ и организира съдържанието в логични
          URL адреси, така че навигацията да е по-ясна и по-лесна за поддържане.
        </p>
        <p className="mt-4 text-base leading-8 text-slate-700">
          С негова помощ се създават отделни страници като начална, “за проекта”, “задачи” и др., което
          помага на приложението да бъде структурирано и лесно за разрастване.
        </p>
      </div>
    </main>
  );
}
