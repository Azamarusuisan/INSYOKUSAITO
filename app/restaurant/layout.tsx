"use client";

import Link from "next/link";
import { useShop } from "@/lib/store";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shop = useShop("restaurant");
  const { info } = shop;

  return (
    <div className="flex flex-1 flex-col bg-[#fbf6ee] text-stone-900">
      <header className="border-b border-amber-900/15 bg-[#fbf6ee]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
          <Link
            href="/"
            className="text-[11px] tracking-[0.3em] text-stone-500 uppercase hover:text-stone-800"
          >
            ← ホームへ
          </Link>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.3em] text-amber-900/70 uppercase sm:text-[11px]">
              {info.name}
            </p>
            <p className="font-serif text-base text-stone-900 sm:text-lg">
              {info.nameJa}
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-6 pb-8 pt-2 text-center sm:pb-10">
          <p className="text-[11px] tracking-[0.4em] text-amber-900/70 uppercase">
            Menù
          </p>
          <h1 className="mt-2 font-serif text-3xl text-stone-900 sm:text-4xl">
            本日のお品書き
          </h1>
          <p className="mt-3 text-xs text-stone-600 sm:text-sm">{info.tagline}</p>
          <div className="mx-auto mt-5 h-px w-16 bg-amber-900/40" />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-amber-900/15 px-4 py-5 text-center text-[10px] tracking-[0.2em] text-stone-500 uppercase sm:text-[11px]">
        {info.name} — Grazie per la Vostra visita
      </footer>
    </div>
  );
}
