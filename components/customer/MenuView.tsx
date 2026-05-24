"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MenuCategory, MenuItem, ShopData } from "@/lib/types";
import type { Theme } from "@/lib/themes";
import { formatPrice, cx } from "@/lib/utils";

const fallbackPhoto = (demoId: string, itemId: string, size: "thumb" | "hero" = "thumb") =>
  size === "hero"
    ? `https://picsum.photos/seed/${demoId}-${itemId}/1600/900`
    : `https://picsum.photos/seed/${demoId}-${itemId}/400/400`;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export function MenuView({
  shop,
  theme,
  demoId,
}: {
  shop: ShopData;
  theme: Theme;
  demoId: string;
}) {
  const baseCategories = shop.categories.filter(
    (c) => c.isPublished && c.items.some((i) => i.isPublished),
  );

  // フィルター候補（明示指定 > 全アイテムから推測）
  const filterTags = useMemo<string[]>(() => {
    if (shop.filterTags && shop.filterTags.length > 0) return shop.filterTags;
    const tagSet = new Set<string>();
    for (const c of baseCategories) {
      for (const i of c.items) (i.tags ?? []).forEach((t) => tagSet.add(t));
    }
    return Array.from(tagSet);
  }, [shop.filterTags, baseCategories]);

  const [activeTag, setActiveTag] = useState<string | null>(null);

  // タグでアイテムを絞り込み、空カテゴリは除外
  const categories = useMemo(() => {
    if (!activeTag) return baseCategories;
    return baseCategories
      .map((c) => ({
        ...c,
        items: c.items.filter((i) => (i.tags ?? []).includes(activeTag)),
      }))
      .filter((c) => c.items.length > 0);
  }, [activeTag, baseCategories]);

  // スティッキーナビ用：現在の表示カテゴリを追跡
  const [activeCatId, setActiveCatId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    if (typeof window === "undefined") return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveCatId(visible.target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    for (const c of categories) {
      const el = sectionRefs.current[c.id];
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, [categories]);

  if (baseCategories.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center text-sm text-stone-500">
        ただいまメニューを準備中です。
      </div>
    );
  }

  return (
    <div className="relative">
      {/* スティッキーナビ + フィルター */}
      <StickyControls
        categories={categories}
        activeCatId={activeCatId}
        onJump={(id) => {
          const el = sectionRefs.current[id];
          if (!el) return;
          const top = el.getBoundingClientRect().top + window.scrollY - 110;
          window.scrollTo({ top, behavior: "smooth" });
        }}
        filterTags={filterTags}
        activeTag={activeTag}
        onToggleTag={(t) => setActiveTag((cur) => (cur === t ? null : t))}
        theme={theme}
      />

      <div className={`mx-auto max-w-5xl px-4 pb-28 pt-6 sm:px-6 sm:pb-32 sm:pt-8 ${theme.sectionGap}`}>
        {categories.length === 0 ? (
          <div className="rounded-md border border-dashed border-current/30 px-6 py-12 text-center text-sm opacity-70">
            条件に合う商品がありません。
            <br />
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className="mt-3 underline-offset-2 hover:underline"
            >
              フィルターを解除する
            </button>
          </div>
        ) : (
          categories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              ref={(el) => {
                sectionRefs.current[cat.id] = el;
              }}
              className="scroll-mt-28"
            >
              <CategoryHeader category={cat} theme={theme} />
              <div className={theme.grid}>
                {cat.items.map((item) => (
                  <Card key={item.id} item={item} theme={theme} demoId={demoId} />
                ))}
              </div>
            </section>
          ))
        )}
        <p className={`pt-4 text-center text-[11px] ${theme.footerNote}`}>
          表示価格は税込です。商品をタップすると詳細をご覧いただけます。
        </p>
      </div>
    </div>
  );
}

function StickyControls({
  categories,
  activeCatId,
  onJump,
  filterTags,
  activeTag,
  onToggleTag,
  theme,
}: {
  categories: MenuCategory[];
  activeCatId: string | null;
  onJump: (id: string) => void;
  filterTags: string[];
  activeTag: string | null;
  onToggleTag: (t: string) => void;
  theme: Theme;
}) {
  if (categories.length === 0 && filterTags.length === 0) return null;
  const hasFilters = filterTags.length > 0;

  // bgImage 系は半透明バー、明るいテーマは theme.pageBg と同色で繋ぐ
  const barBg = theme.bgImage ? "bg-black/55 backdrop-blur-md" : `${theme.pageBg}/95 backdrop-blur`;

  return (
    <div className={`sticky top-[52px] z-20 border-b border-current/10 safe-x ${barBg}`}>
      <div className="mx-auto max-w-5xl px-3 sm:px-6">
        {/* カテゴリタブ */}
        {categories.length > 0 && (
          <nav
            aria-label="カテゴリ"
            className="-mx-3 flex gap-1 overflow-x-auto px-3 py-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:-mx-6 sm:gap-1.5 sm:px-6 sm:py-2.5"
            style={{ scrollbarWidth: "none" }}
          >
            {categories.map((c) => {
              const active = c.id === activeCatId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => onJump(c.id)}
                  className={cx(
                    "inline-flex h-9 shrink-0 items-center rounded-full border px-3.5 text-[12px] tracking-wider transition-colors",
                    active
                      ? "border-current bg-current text-white"
                      : "border-current/30 opacity-70 hover:opacity-100",
                  )}
                  style={active ? undefined : undefined}
                >
                  <span className={active ? "mix-blend-difference" : ""}>{c.name}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* タグフィルター */}
        {hasFilters && (
          <div
            className="-mx-3 flex gap-1.5 overflow-x-auto px-3 pb-2 sm:-mx-6 sm:px-6"
            style={{ scrollbarWidth: "none" }}
          >
            <button
              type="button"
              onClick={() => activeTag && onToggleTag(activeTag)}
              className={cx(
                "inline-flex h-8 shrink-0 items-center rounded-full border px-3 text-[11px] tracking-wider",
                !activeTag ? "border-current/60 opacity-100" : "border-current/20 opacity-50",
              )}
            >
              すべて
            </button>
            {filterTags.map((t) => {
              const active = activeTag === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => onToggleTag(t)}
                  className={cx(
                    "inline-flex h-8 shrink-0 items-center rounded-full border px-3 text-[11px] tracking-wider transition-colors",
                    active
                      ? "border-current bg-current text-white"
                      : "border-current/20 opacity-70 hover:opacity-100",
                  )}
                >
                  <span className={active ? "mix-blend-difference" : ""}>#{t}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryHeader({ category, theme }: { category: MenuCategory; theme: Theme }) {
  return (
    <div className="mb-5 flex flex-wrap items-baseline gap-3 sm:mb-6 sm:gap-4">
      <h2 className={theme.catHeading}>{category.name}</h2>
      {category.subName && <span className={theme.catSub}>{category.subName}</span>}
      <div className={`ml-1 hidden flex-1 border-t border-dashed sm:block ${theme.catRule}`} />
    </div>
  );
}

function Card({
  item,
  theme,
  demoId,
}: {
  item: MenuItem;
  theme: Theme;
  demoId: string;
}) {
  const hasDetail =
    !!item.story ||
    !!item.heroImageUrl ||
    (item.gallery?.length ?? 0) > 0 ||
    (item.storyPoints?.length ?? 0) > 0 ||
    !!item.videoUrl;

  return (
    <Link
      href={`/demo/${demoId}/item/${item.id}`}
      className={`${theme.cardWrap} group min-h-[88px] cursor-pointer touch-manipulation transition-all hover:opacity-90 active:scale-[0.99] active:opacity-80`}
    >
      {theme.layout !== "list" && (
        <ImageSlot
          src={item.imageUrl ?? item.heroImageUrl ?? fallbackPhoto(demoId, item.id, "thumb")}
          ph={theme.cardImagePh}
        />
      )}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h3 className={theme.cardName}>{item.name}</h3>
            {item.subName && <p className={`mt-0.5 ${theme.cardSub}`}>{item.subName}</p>}
          </div>
          {item.badge && <span className={`shrink-0 ${theme.cardBadge}`}>{item.badge}</span>}
        </div>
        {item.description && (
          <p className={`mt-2 ${theme.cardDesc}`}>{item.description}</p>
        )}
        {item.tags && item.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="inline-flex h-5 items-center rounded-full border border-current/30 px-2 text-[10px] tracking-wider opacity-70"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2 sm:pt-3">
          {hasDetail ? (
            <span className={`text-[10px] tracking-[0.2em] uppercase opacity-70 ${theme.headerAccent}`}>
              詳細 →
            </span>
          ) : (
            <span className="text-[10px] opacity-0">.</span>
          )}
          <p className={`text-right tabular-nums ${theme.cardPrice}`}>
            {formatPrice(item.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}

function ImageSlot({ src, ph }: { src?: string; ph: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt="" className="h-20 w-20 shrink-0 rounded object-cover sm:h-24 sm:w-24" />;
  }
  return (
    <div className={`flex h-20 w-20 shrink-0 items-center justify-center rounded sm:h-24 sm:w-24 ${ph}`}>
      IMAGE
    </div>
  );
}

export { slugify };
