"use client";

import Link from "next/link";
import { use, useMemo } from "react";
import { notFound } from "next/navigation";
import { useShop } from "@/lib/store";
import type { ShopType } from "@/lib/types";

const isValidType = (t: string): t is ShopType =>
  t === "restaurant" || t === "salon";

export default function AdminDashboardPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  if (!isValidType(type)) notFound();

  const shop = useShop(type);

  const stats = useMemo(() => {
    const allItems = shop.categories.flatMap((c) => c.items);
    const publishedItems = allItems.filter((i) => i.isPublished);
    const publishedCategories = shop.categories.filter((c) => c.isPublished);
    return {
      categoryTotal: shop.categories.length,
      categoryPublished: publishedCategories.length,
      itemTotal: allItems.length,
      itemPublished: publishedItems.length,
      itemHidden: allItems.length - publishedItems.length,
    };
  }, [shop]);

  const base = `/admin/${type}`;

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
            Dashboard
          </p>
          <h1 className="mt-1 font-serif text-2xl text-neutral-900 sm:text-3xl">
            {shop.info.nameJa}
          </h1>
          <p className="mt-1 text-sm text-neutral-600">{shop.info.tagline}</p>
        </div>
        <Link
          href={`/${type}`}
          target="_blank"
          className="inline-flex h-9 items-center justify-center rounded border border-neutral-900 px-4 text-sm font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white"
        >
          お客様画面を別タブで開く →
        </Link>
      </header>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <StatCard label="カテゴリ" value={stats.categoryTotal} sub={`公開 ${stats.categoryPublished}`} />
        <StatCard label="商品総数" value={stats.itemTotal} sub={`公開 ${stats.itemPublished}`} />
        <StatCard label="非公開の商品" value={stats.itemHidden} sub="お客様には非表示" />
        <StatCard
          label="平均価格"
          value={averagePrice(shop)}
          sub="公開中の商品"
          isCurrency
        />
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickCard
          href={`${base}/menu`}
          title="メニューを編集"
          description="カテゴリと商品の追加・編集・削除・並び替え・公開設定を行います。"
        />
        <QuickCard
          href={`${base}/settings`}
          title="店舗情報を編集"
          description="店名、サブタイトル、キャッチコピーを変更します。"
        />
        <QuickCard
          href={`${base}/data`}
          title="データを管理"
          description="現在のメニューをJSONで書き出し、必要に応じて初期データに戻します。"
        />
      </section>
    </div>
  );
}

function averagePrice(shop: ReturnType<typeof useShop>): number {
  const items = shop.categories.flatMap((c) => c.items).filter((i) => i.isPublished);
  if (items.length === 0) return 0;
  return Math.round(items.reduce((sum, i) => sum + i.price, 0) / items.length);
}

function StatCard({
  label,
  value,
  sub,
  isCurrency,
}: {
  label: string;
  value: number;
  sub: string;
  isCurrency?: boolean;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-5">
      <p className="text-[11px] tracking-wider text-neutral-500 uppercase">{label}</p>
      <p className="mt-2 font-serif text-2xl text-neutral-900 sm:text-3xl">
        {isCurrency ? `¥${value.toLocaleString("ja-JP")}` : value}
      </p>
      <p className="mt-1 text-[11px] text-neutral-500">{sub}</p>
    </div>
  );
}

function QuickCard({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-lg border border-neutral-200 bg-white p-5 transition-colors hover:border-neutral-900"
    >
      <h3 className="font-serif text-lg text-neutral-900">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-neutral-600">{description}</p>
      <p className="mt-3 text-xs font-medium text-neutral-900">開く →</p>
    </Link>
  );
}
