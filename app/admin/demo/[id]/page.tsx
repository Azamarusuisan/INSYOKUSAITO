"use client";

import Link from "next/link";
import { use, useMemo } from "react";
import { notFound } from "next/navigation";
import { useDemoShop } from "@/lib/demo-store";
import { getDemo } from "@/data/demos";

export default function DemoDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const def = getDemo(id);
  if (!def) notFound();

  const shop = useDemoShop(id);
  const stats = useMemo(() => {
    if (!shop) return null;
    const allItems = shop.categories.flatMap((c) => c.items);
    const publishedItems = allItems.filter((i) => i.isPublished);
    const publishedCategories = shop.categories.filter((c) => c.isPublished);
    return {
      categoryTotal: shop.categories.length,
      categoryPublished: publishedCategories.length,
      itemTotal: allItems.length,
      itemPublished: publishedItems.length,
      itemHidden: allItems.length - publishedItems.length,
      avg: publishedItems.length === 0 ? 0 : Math.round(publishedItems.reduce((s, i) => s + i.price, 0) / publishedItems.length),
    };
  }, [shop]);

  if (!shop || !stats) return null;
  const base = `/admin/demo/${id}`;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
            Dashboard / {def.industryLabel}
          </p>
          <h1 className="mt-1 font-serif text-2xl text-neutral-900 sm:text-3xl">
            {shop.info.nameJa}
          </h1>
          <p className="mt-1 text-sm text-neutral-600">{shop.info.tagline}</p>
        </div>
        <Link
          href={`/demo/${id}`}
          target="_blank"
          className="inline-flex h-9 items-center justify-center rounded border border-neutral-900 px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white"
        >
          お客様画面を別タブで開く →
        </Link>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <Card label="カテゴリ" value={stats.categoryTotal} sub={`公開 ${stats.categoryPublished}`} />
        <Card label="商品総数" value={stats.itemTotal} sub={`公開 ${stats.itemPublished}`} />
        <Card label="非公開の商品" value={stats.itemHidden} sub="お客様には非表示" />
        <Card label="平均価格" value={stats.avg} sub="公開中" currency />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Quick href={`${base}/menu`} title="メニューを編集" desc="カテゴリ・商品の追加・編集・削除・並び替え・公開設定。" />
        <Quick href={`${base}/settings`} title="店舗情報を編集" desc="店名・サブタイトル・キャッチコピーを変更します。" />
        <Quick href={`${base}/data`} title="データを管理" desc="JSON書き出し / 初期データへリセット。" />
      </section>
    </div>
  );
}

function Card({ label, value, sub, currency }: { label: string; value: number; sub: string; currency?: boolean }) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-5">
      <p className="text-[11px] tracking-wider text-neutral-500 uppercase">{label}</p>
      <p className="mt-2 font-serif text-2xl text-neutral-900 sm:text-3xl">
        {currency ? `¥${value.toLocaleString("ja-JP")}` : value}
      </p>
      <p className="mt-1 text-[11px] text-neutral-500">{sub}</p>
    </div>
  );
}

function Quick({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="block rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-900">
      <h3 className="font-serif text-lg text-neutral-900">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-neutral-600">{desc}</p>
      <p className="mt-3 text-xs font-medium text-neutral-900">開く →</p>
    </Link>
  );
}
