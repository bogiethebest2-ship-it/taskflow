"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!supabase) {
      if (email !== "test@example.com" || password !== "123456") {
        setError("За тест използвай test@example.com и парола 123456.");
        return;
      }

      window.localStorage.setItem("taskflow-demo-user", email);
      router.push("/");
      return;
    }

    setLoading(true);
    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setMessage(mode === "login" ? "Влезе успешно." : "Провери email адреса си за потвърждение.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f7f5ef] px-6 py-12">
      <section className="w-full max-w-md border-2 border-slate-900 bg-white p-7 shadow-[8px_8px_0_#d7d2c6]">
        <Link href="/" className="text-sm font-semibold text-slate-500 hover:text-slate-900">
          ← Към задачите
        </Link>
        <h1 className="mt-8 text-3xl font-black text-slate-900">
          {mode === "login" ? "Вход" : "Създай акаунт"}
        </h1>
        <p className="mt-2 text-slate-600">
          {mode === "login" ? "Влез, за да видиш личните си задачи." : "Създай профил за личен списък със задачи."}
        </p>
        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-900"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Парола
            <input
              required
              minLength={6}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full border border-slate-300 px-3 py-2.5 outline-none focus:border-slate-900"
            />
          </label>

          {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
          {message && <p className="text-sm font-medium text-teal-700">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {loading ? "Изчакай..." : mode === "login" ? "Вход" : "Регистрация"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
            setMessage("");
          }}
          className="mt-5 text-sm font-medium text-slate-600 underline underline-offset-4 hover:text-slate-900"
        >
          {mode === "login" ? "Нямаш акаунт? Регистрация" : "Вече имаш акаунт? Вход"}
        </button>
      </section>
    </main>
  );
}
