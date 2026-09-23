import Link from "next/link";
import { Zap, Search, Pencil, Database, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative bg-slate-50 overflow-hidden">
      <div className="fixed top-[-10%] left-[-5%] w-96 h-96 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none z-0" />
      <div className="fixed bottom-[-10%] right-[-5%] w-96 h-96 bg-yellow-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-60 pointer-events-none z-0" />

      <header className="relative z-10 shrink-0">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm">
              <Zap className="w-4 h-4 text-yellow-300" />
            </div>
            <span className="font-bold text-slate-900 tracking-tight">Volt Admin</span>
          </div>

          <Link href="/login">
            <Button className="w-auto px-4 py-2 h-9 text-sm bg-white/50 hover:bg-white text-slate-700 border border-slate-200">
              Sign in
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 py-12 md:py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
            A real admin feel for a fake API.
          </h1>
          <p className="text-slate-600 text-base leading-relaxed mb-8 max-w-md">
            Volt is a product admin built on DummyJSON. Search, filter, and sort the
            catalog with state that lives in the URL. Add, edit, and delete products —
            and since DummyJSON never actually saves a thing, Volt quietly keeps your
            changes in your browser so the catalog stays yours between visits.
          </p>

          <div className="flex items-center gap-4 mb-10">
            <Link href="/login">
              <Button className="w-auto px-6">Enter dashboard</Button>
            </Link>
            <p className="text-xs text-slate-500">
              Demo login: <span className="font-mono font-semibold text-slate-700">emilys</span> / <span className="font-mono font-semibold text-slate-700">emilyspass</span>
            </p>
          </div>

          <div className="space-y-4 border-t border-slate-200 pt-8">
            <div className="flex items-start gap-3">
              <Search className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Search & filter</span> — query, category, and sort all sync straight to the URL, so any view is a shareable link.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Pencil className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Full CRUD</span> — add, edit, and delete products against the live DummyJSON API.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Database className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Local-first writes</span> — DummyJSON&apos;s writes don&apos;t persist, so Volt saves yours to your browser instead.
              </p>
            </div>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
          <div className="glass-panel rounded-3xl overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/60 bg-white/40">
              <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-300" />
              <span className="ml-3 text-xs text-slate-400 font-medium">volt-admin/products</span>
            </div>

            <div className="divide-y divide-slate-100/80">
              {[
                { title: "Wireless Mechanical Keyboard", category: "electronics", price: "₹4,299", stock: 82, rating: 4.6 },
                { title: "Ceramic Pour-Over Set", category: "home-decoration", price: "₹1,150", stock: 6, rating: 4.8 },
                { title: "Trail Running Jacket", category: "mens-shoes", price: "₹3,499", stock: 41, rating: 4.3 },
              ].map((p) => (
                <div key={p.title} className="flex items-center gap-4 px-4 py-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{p.title}</p>
                    <p className="text-xs text-slate-500 capitalize">{p.category.replace("-", " ")}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="text-sm font-medium text-slate-900">{p.price}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-0.5">
                      {p.rating} <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                    </span>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-1 rounded-full text-[11px] font-semibold border ${p.stock < 10
                        ? "bg-red-50 text-red-700 border-red-100"
                        : "bg-green-50 text-green-700 border-green-100"
                      }`}
                  >
                    {p.stock} in stock
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}