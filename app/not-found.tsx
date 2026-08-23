import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">404</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Страницата не е намерена</h1>
        <p className="mt-3 text-slate-600">Може да е преместена или вече да не съществува.</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Върни се в началото
        </Link>
      </div>
    </main>
  );
}
