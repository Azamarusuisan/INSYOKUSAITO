import Link from "next/link";
import { DEMOS } from "@/data/demos";
import type { DemoDefinition } from "@/lib/demo-types";

export const metadata = { title: "営業デモ集 — メニューツール" };

// カテゴリ別グルーピング（順序を制御）
const GROUPS: Array<{ label: string; sub: string; ids: string[] }> = [
  {
    label: "和食",
    sub: "Japanese",
    ids: ["italian", "sushi", "kaiseki", "izakaya", "ramen", "teishoku", "soba", "udon", "okonomiyaki", "taishu"],
  },
  {
    label: "焼物・洋食・中華",
    sub: "Grill / Western / Chinese",
    ids: ["yakiniku", "teppanyaki", "french", "chinese", "burger", "family"],
  },
  {
    label: "バー",
    sub: "Bar",
    ids: ["wine-bar", "craft-beer", "cocktail-bar"],
  },
  {
    label: "カフェ・スイーツ",
    sub: "Cafe / Sweets",
    ids: ["cafe", "modern-cafe", "teahouse", "bakery", "wagashi", "patisserie", "gelato"],
  },
  {
    label: "美容",
    sub: "Beauty",
    ids: ["salon", "nail", "eyelash", "barber"],
  },
];

const byId = (id: string): DemoDefinition | undefined =>
  DEMOS.find((d) => d.id === id);

export default function DemoGalleryPage() {
  return (
    <div className="flex flex-1 flex-col bg-neutral-50">
      <header className="px-6 pt-10 pb-6 text-center sm:pt-14 safe-x">
        <p className="text-[11px] tracking-[0.4em] text-neutral-500 uppercase">
          Sales Demo Gallery
        </p>
        <h1 className="mt-3 font-serif text-2xl text-neutral-900 sm:text-3xl">
          業種別デザインサンプル
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          全{DEMOS.length}種類のデザイン。営業提案にお使いください。
        </p>
        <p className="mt-1 text-[11px] text-neutral-500">
          各デモ画面の上部バー「デザイン切替」からワンクリックで他デザインに飛べます。
        </p>
      </header>

      <main className="flex-1 px-4 pb-12 sm:px-6 safe-x">
        <div className="mx-auto w-full max-w-6xl space-y-10 sm:space-y-14">
          {GROUPS.map((g) => {
            const demos = g.ids.map(byId).filter((d): d is DemoDefinition => !!d);
            if (demos.length === 0) return null;
            return (
              <section key={g.label}>
                <div className="mb-4 flex items-baseline gap-3 sm:mb-5">
                  <h2 className="font-serif text-xl text-neutral-900 sm:text-2xl">
                    {g.label}
                  </h2>
                  <span className="text-[10px] tracking-[0.4em] text-neutral-400 uppercase">
                    {g.sub} — {demos.length}
                  </span>
                  <div className="ml-1 hidden flex-1 border-t border-dashed border-neutral-300 sm:block" />
                </div>
                <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                  {demos.map((d) => (
                    <Link
                      key={d.id}
                      href={`/demo/${d.id}`}
                      className="group flex min-h-[160px] flex-col rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-900 active:scale-[0.99]"
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-900" />
                        <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
                          {d.industryLabel}
                        </p>
                      </div>
                      <h3 className="mt-3 font-serif text-lg text-neutral-900">
                        {d.initial.info.nameJa}
                      </h3>
                      <p className="mt-1 text-[11px] tracking-wider text-neutral-500">
                        {d.initial.info.name}
                      </p>
                      <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                        {d.shortDescription}
                      </p>
                      <p className="mt-auto pt-4 text-sm font-medium text-neutral-900 transition-transform group-hover:translate-x-0.5">
                        このデザインを見る →
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-neutral-200 pt-6 text-center text-xs text-neutral-500">
          各デモには管理画面も用意。上部バーの「管理画面 →」ボタンから開けます。
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-4 text-center text-[11px] tracking-[0.2em] text-neutral-400 uppercase safe-x safe-bottom">
        Menu Tool — Sales Demo
      </footer>
    </div>
  );
}
