import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          <Sidebar />
          <main className="flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}
