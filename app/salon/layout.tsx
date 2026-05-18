"use client";

import Link from "next/link";
import { useShop } from "@/lib/store";

export default function SalonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const shop = useShop("salon");
  const { info } = shop;

  return (
    <div className="flex flex-1 flex-col bg-white text-neutral-900">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
          <Link
            href="/"
            className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-800"
          >
            ← ホームへ
          </Link>
          <div className="text-right">
            <p className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase sm:text-[11px]">
              {info.name}
            </p>
            <p className="font-serif text-base sm:text-lg">{info.nameJa}</p>
          </div>
        </div>
        <div className="mx-auto max-w-5xl px-6 pb-10 pt-3 text-center sm:pb-12 sm:pt-4">
          <p className="text-[11px] tracking-[0.5em] text-neutral-500 uppercase">
            Menu
          </p>
          <h1 className="mt-3 font-serif text-3xl font-light tracking-wide sm:text-4xl">
            サービスメニュー
          </h1>
          <p className="mt-3 text-xs text-neutral-500 sm:text-sm">{info.tagline}</p>
          <div className="mx-auto mt-5 h-px w-12 bg-neutral-900" />
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-neutral-200 px-4 py-5 text-center text-[10px] tracking-[0.3em] text-neutral-500 uppercase sm:text-[11px]">
        {info.name} — Thank you for visiting
      </footer>
    </div>
  );
}
