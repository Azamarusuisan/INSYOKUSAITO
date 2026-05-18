"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import { useShop, useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";
import type { ShopType } from "@/lib/types";
import { Button } from "@/components/ui/Form";
import { ConfirmDialog } from "@/components/ui/Modal";

const isValidType = (t: string): t is ShopType =>
  t === "restaurant" || t === "salon";

export default function DataPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  if (!isValidType(type)) notFound();

  const shop = useShop(type);
  const store = useStore();
  const { push } = useToast();

  const [confirmReset, setConfirmReset] = useState(false);

  const json = JSON.stringify(shop, null, 2);

  const onDownload = () => {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-menu-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    push("JSONファイルをダウンロードしました");
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      push("クリップボードにコピーしました");
    } catch {
      push("コピーに失敗しました", "error");
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header>
        <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
          Data
        </p>
        <h1 className="mt-1 font-serif text-2xl text-neutral-900 sm:text-3xl">
          データ管理
        </h1>
        <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
          現在のメニューデータの書き出しと初期化を行います。
        </p>
      </header>

      <section className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <h2 className="font-serif text-base text-neutral-900">JSONエクスポート</h2>
        <p className="mt-1 text-xs text-neutral-600">
          現在のメニュー構造をそのままJSONで書き出します。バックアップや他環境への移行にお使いください。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={onDownload}>ファイルとしてダウンロード</Button>
          <Button variant="secondary" onClick={onCopy}>
            クリップボードにコピー
          </Button>
        </div>
        <pre className="mt-4 max-h-72 overflow-auto rounded border border-neutral-200 bg-neutral-50 p-3 text-[11px] leading-relaxed text-neutral-700">
          {json}
        </pre>
      </section>

      <section className="rounded-lg border border-rose-200 bg-rose-50/40 p-5 sm:p-6">
        <h2 className="font-serif text-base text-neutral-900">初期データに戻す</h2>
        <p className="mt-1 text-xs text-neutral-600">
          現在の編集内容はすべて破棄され、初期サンプルメニューに戻ります。この操作は取り消せません。
        </p>
        <div className="mt-4">
          <Button variant="danger" onClick={() => setConfirmReset(true)}>
            このお店のデータを初期化する
          </Button>
        </div>
      </section>

      <ConfirmDialog
        open={confirmReset}
        title="初期データに戻しますか？"
        message="現在編集中のメニュー・カテゴリ・店舗情報がすべて破棄されます。"
        confirmLabel="初期化する"
        variant="danger"
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          store.resetShop(type);
          setConfirmReset(false);
          push("初期データに戻しました", "info");
        }}
      />
    </div>
  );
}
