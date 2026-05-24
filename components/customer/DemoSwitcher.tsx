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
    <div className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950/95 text-neutral-100 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-3 py-2 sm:px-4">
        <Link
          href="/demo"
          className="rounded border border-neutral-700 px-2 py-1 text-[11px] tracking-wider text-neutral-300 hover:border-neutral-500 hover:text-white"
        >
          ← デモ一覧
        </Link>
        <span className="hidden text-[11px] tracking-[0.3em] text-neutral-400 uppercase sm:inline">
          Sales Demo
        </span>
        <span className="text-[11px] text-neutral-500">/</span>
        <span className="truncate text-[12px] font-medium text-neutral-100">
          {current?.industryLabel ?? currentId}
        </span>
        <span className="hidden truncate text-[11px] text-neutral-400 sm:inline">
          {current?.initial.info.nameJa}
        </span>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={`/admin/demo/${currentId}`}
            className="hidden rounded border border-neutral-700 px-2 py-1 text-[11px] tracking-wider text-neutral-300 hover:border-neutral-500 hover:text-white sm:inline"
          >
            管理画面 →
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded bg-white px-3 py-1 text-[11px] font-medium tracking-wider text-neutral-900 hover:bg-neutral-200"
          >
            {open ? "閉じる" : "デザインを切替"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-neutral-800 bg-neutral-950">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-1.5 px-3 py-2 sm:px-4 sm:py-3">
            {DEMOS.map((d) => {
              const active = d.id === currentId;
              return (
                <Link
                  key={d.id}
                  href={`/demo/${d.id}`}
                  className={cx(
                    "rounded-full border px-3 py-1 text-[11px] tracking-wider transition-colors",
                    active
                      ? "border-white bg-white text-neutral-900"
                      : "border-neutral-700 text-neutral-200 hover:border-neutral-400 hover:text-white",
                  )}
                >
                  <span className="font-medium">{d.industryLabel}</span>
                  <span className="ml-1.5 text-[10px] opacity-70">{d.initial.info.nameJa}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
