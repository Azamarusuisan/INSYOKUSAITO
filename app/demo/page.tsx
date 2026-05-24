import Link from "next/link";
import { DEMOS } from "@/data/demos";

export const metadata = { title: "営業デモ集 — メニューツール" };

export default function DemoGalleryPage() {
  return (
    <div className="flex flex-1 flex-col bg-neutral-50">
      <header className="px-6 pt-10 pb-6 text-center sm:pt-14">
        <p className="text-[11px] tracking-[0.4em] text-neutral-500 uppercase">
          Sales Demo Gallery
        </p>
        <h1 className="mt-3 font-serif text-2xl text-neutral-900 sm:text-3xl">
          業種別デザインサンプル
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          ボタン一つで各業種のサンプル画面に切り替えられます。営業提案にお使いください。
        </p>
      </header>

      <main className="flex-1 px-4 pb-12 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {DEMOS.map((d) => (
            <Link
              key={d.id}
              href={`/demo/${d.id}`}
              className="group flex flex-col rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-900"
            >
              <div className="flex items-center gap-2">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-neutral-900" />
                <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
                  {d.industryLabel}
                </p>
              </div>
              <h2 className="mt-3 font-serif text-lg text-neutral-900">
                {d.initial.info.nameJa}
              </h2>
              <p className="mt-1 text-[11px] tracking-wider text-neutral-500">
                {d.initial.info.name}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-neutral-600">
                {d.shortDescription}
              </p>
              <p className="mt-4 text-sm font-medium text-neutral-900 transition-transform group-hover:translate-x-0.5">
                このデザインを見る →
              </p>
            </Link>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-6xl border-t border-neutral-200 pt-6 text-center text-xs text-neutral-500">
          各デモには管理画面も用意してあります。一覧から開いたあと、上部バーの「管理画面 →」ボタンをご利用ください。
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-4 text-center text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
        Menu Tool — Sales Demo
      </footer>
    </div>
  );
}
