"use client";

import Link from "next/link";
import { use } from "react";
import { notFound } from "next/navigation";
import { useDemoShop } from "@/lib/demo-store";
import { getDemo } from "@/data/demos";
import { THEMES } from "@/lib/themes";
import { DemoSwitcher } from "@/components/customer/DemoSwitcher";
import { formatPrice } from "@/lib/utils";
import type { MenuItem } from "@/lib/types";
import { SNS_LABELS } from "@/lib/types";

export default function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string; itemId: string }>;
}) {
  const { id, itemId } = use(params);
  const def = getDemo(id);
  if (!def) notFound();

  const shop = useDemoShop(id);
  const theme = THEMES[def.themeId];

  if (!shop) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
        読み込み中…
      </div>
    );
  }

  let foundItem: MenuItem | undefined;
  let foundCatName = "";
  for (const c of shop.categories) {
    const it = c.items.find((i) => i.id === itemId);
    if (it) {
      foundItem = it;
      foundCatName = c.name;
      break;
    }
  }
  if (!foundItem) notFound();
  const item = foundItem;

  const hero = item.heroImageUrl ?? item.imageUrl;
  const gallery = item.gallery ?? [];
  const paragraphs = (item.story ?? "").split(/\n\s*\n/).filter(Boolean);

  return (
    <div className={`flex flex-1 flex-col ${theme.pageBg} ${theme.pageText} ${theme.fontFamily}`}>
      <DemoSwitcher currentId={id} />

      {/* パンくず + 戻る */}
      <div className={`${theme.headerBg} border-b border-neutral-200/30 safe-x`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-2 sm:px-6 sm:py-3">
          <Link
            href={`/demo/${id}`}
            className={`inline-flex h-11 items-center text-[12px] tracking-[0.2em] uppercase sm:h-9 sm:text-[11px] ${theme.headerAccent} hover:opacity-70 active:opacity-50`}
          >
            ← メニューに戻る
          </Link>
          <p className={`text-[11px] tracking-wider ${theme.headerAccent}`}>
            {foundCatName}
          </p>
        </div>
      </div>

      <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-12 safe-x">
        {/* ヒーロー画像 — モバイルは横幅いっぱい */}
        <div className="-mx-4 mb-6 overflow-hidden sm:mx-0 sm:mb-10 sm:rounded-lg">
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hero}
              alt={item.name}
              className="aspect-[4/3] w-full object-cover sm:aspect-[16/9]"
            />
          ) : (
            <div className={`flex aspect-[4/3] w-full items-center justify-center sm:aspect-[16/9] ${theme.cardImagePh}`}>
              IMAGE
            </div>
          )}
        </div>

        {/* タイトル + 価格 */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-2">
            {item.badge && <span className={theme.cardBadge}>{item.badge}</span>}
            {item.subName && (
              <p className={theme.catSub}>{item.subName}</p>
            )}
          </div>
          <h1 className={`mt-2 text-3xl sm:text-4xl ${theme.fontFamily} ${theme.headerText}`}>
            {item.name}
          </h1>
          {item.description && (
            <p className={`mt-3 text-sm leading-relaxed sm:text-base ${theme.cardDesc}`}>
              {item.description}
            </p>
          )}
          <p className={`mt-5 text-2xl tabular-nums ${theme.cardPrice}`}>
            {formatPrice(item.price)}
          </p>
        </header>

        {/* こだわり3点 */}
        {item.storyPoints && item.storyPoints.length > 0 && (
          <section className="mb-10 sm:mb-14">
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className={theme.catHeading}>こだわり</h2>
              <span className={theme.catSub}>Our Commitment</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {item.storyPoints.map((p, i) => (
                <div
                  key={i}
                  className={`rounded-md border border-neutral-200/30 bg-white/40 p-4 ${theme.pageText}`}
                >
                  <p className={`text-[11px] tracking-[0.2em] uppercase ${theme.headerAccent}`}>
                    No. {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className={`mt-2 ${theme.cardName}`}>{p.title}</h3>
                  <p className={`mt-2 ${theme.cardDesc}`}>{p.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 本文 */}
        {paragraphs.length > 0 && (
          <section className="mb-10 sm:mb-14">
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className={theme.catHeading}>このひと皿について</h2>
              <span className={theme.catSub}>Story</span>
            </div>
            <div className="space-y-4 text-sm leading-7 sm:text-base sm:leading-8">
              {paragraphs.map((p, i) => (
                <p key={i} className={theme.pageText}>
                  {p}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* ギャラリー */}
        {gallery.length > 0 && (
          <section className="mb-10 sm:mb-14">
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className={theme.catHeading}>ギャラリー</h2>
              <span className={theme.catSub}>Gallery</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              {gallery.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="aspect-square w-full rounded object-cover"
                />
              ))}
            </div>
          </section>
        )}

        {/* SNS / 外部リンク */}
        {item.links && item.links.length > 0 && (
          <section className="mb-10 sm:mb-14">
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className={theme.catHeading}>関連リンク</h2>
              <span className={theme.catSub}>Links</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.links.map((l, i) => (
                <a
                  key={i}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-current px-4 text-sm font-medium hover:opacity-70"
                >
                  <span className={`text-[10px] tracking-[0.2em] uppercase ${theme.headerAccent}`}>
                    {SNS_LABELS[l.type]}
                  </span>
                  <span>{l.label ?? "開く"}</span>
                  <span aria-hidden>→</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 動画（任意・将来用） */}
        {item.videoUrl && (
          <section className="mb-10 sm:mb-14">
            <div className="mb-4 flex items-baseline gap-3">
              <h2 className={theme.catHeading}>動画</h2>
              <span className={theme.catSub}>Video</span>
            </div>
            <div className="overflow-hidden rounded-lg bg-black">
              {item.videoUrl.match(/\.(mp4|webm|mov)$/i) ? (
                <video
                  src={item.videoUrl}
                  controls
                  playsInline
                  className="aspect-video w-full"
                />
              ) : (
                <iframe
                  src={item.videoUrl}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </section>
        )}

        {/* なにも詳細情報が無いときの案内 */}
        {!item.story && !item.storyPoints?.length && gallery.length === 0 && !item.videoUrl && !item.links?.length && (
          <div className="rounded-md border border-dashed border-neutral-300/60 bg-white/40 p-6 text-center text-sm text-neutral-500">
            この商品の詳細（こだわり・写真）はまだ登録されていません。
            <br />
            管理画面 → メニュー編集 → この商品の「編集」から登録できます。
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href={`/demo/${id}`}
            className="inline-flex h-11 items-center justify-center rounded border border-current px-5 text-sm font-medium hover:opacity-70"
          >
            ← メニュー一覧に戻る
          </Link>
        </div>
      </main>

      <footer className={`border-t border-neutral-200/30 px-4 py-5 text-center text-[10px] tracking-[0.2em] uppercase safe-x safe-bottom sm:text-[11px] ${theme.footerNote}`}>
        {shop.info.name}
      </footer>
    </div>
  );
}
