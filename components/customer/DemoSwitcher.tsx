"use client";

import Link from "next/link";
import { useState } from "react";
import { DEMOS } from "@/data/demos";
import { cx } from "@/lib/utils";

// 営業中に他デザインへワンクリックで飛ぶための固定スイッチャー。
// 全 demo 画面の最上部に挿入する。デザインのトンマナを邪魔しないよう
// ダーク基調の細いバー + 開閉式のチップ一覧。
export function DemoSwitcher({ currentId }: { currentId: string }) {
  const [open, setOpen] = useState(false);
  const current = DEMOS.find((d) => d.id === currentId);

  return (
    <div className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/95 text-neutral-100 backdrop-blur safe-x">
      <div className="mx-auto flex min-h-[52px] max-w-6xl items-center gap-2 px-3 py-1.5 sm:px-4">
        <Link
          href="/demo"
          className="inline-flex h-9 items-center rounded border border-neutral-700 px-2.5 text-[11px] tracking-wider text-neutral-300 hover:border-neutral-500 hover:text-white active:bg-neutral-800"
          aria-label="デモ一覧へ"
        >
          ←<span className="ml-1 hidden xs:inline sm:inline">一覧</span>
        </Link>
        <div className="min-w-0 flex-1">
          <p className="hidden text-[10px] tracking-[0.3em] text-neutral-400 uppercase sm:block">
            Sales Demo / {current?.industryLabel}
          </p>
          <p className="truncate text-[13px] font-medium leading-tight text-neutral-100 sm:text-xs sm:font-normal sm:text-neutral-200">
            <span className="sm:hidden">{current?.industryLabel} — </span>
            {current?.initial.info.nameJa}
          </p>
        </div>

        <Link
          href={`/admin/demo/${currentId}`}
          className="hidden h-9 items-center rounded border border-neutral-700 px-2.5 text-[11px] tracking-wider text-neutral-300 hover:border-neutral-500 hover:text-white sm:inline-flex"
        >
          管理画面 →
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="inline-flex h-10 items-center rounded bg-white px-3 text-[12px] font-medium tracking-wider text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 sm:h-9"
        >
          {open ? "閉じる" : "デザイン切替"}
        </button>
      </div>

      {open && (
        <div className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-1.5 px-3 py-2.5 sm:px-4 sm:py-3">
            {DEMOS.map((d) => {
              const active = d.id === currentId;
              return (
                <Link
                  key={d.id}
                  href={`/demo/${d.id}`}
                  className={cx(
                    "inline-flex min-h-9 items-center rounded-full border px-3 py-1.5 text-[12px] tracking-wider transition-colors active:scale-[0.98] sm:text-[11px]",
                    active
                      ? "border-white bg-white text-neutral-900"
                      : "border-neutral-700 text-neutral-200 hover:border-neutral-400 hover:text-white",
                  )}
                >
                  <span className="font-medium">{d.industryLabel}</span>
                  <span className="ml-1.5 hidden text-[10px] opacity-70 sm:inline">
                    {d.initial.info.nameJa}
                  </span>
                </Link>
              );
            })}
          </div>
          <p className="px-3 pb-3 text-[10px] tracking-wider text-neutral-500 sm:hidden">
            タップでそのデザインに切り替わります
          </p>
        </div>
      )}
    </div>
  );
}
