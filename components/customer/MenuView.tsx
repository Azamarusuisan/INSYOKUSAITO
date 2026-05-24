"use client";

import Link from "next/link";
import type { MenuCategory, MenuItem, ShopData } from "@/lib/types";
import type { Theme } from "@/lib/themes";
import { formatPrice } from "@/lib/utils";

export function MenuView({
  shop,
  theme,
  demoId,
}: {
  shop: ShopData;
  theme: Theme;
  demoId: string;
}) {
  const categories = shop.categories.filter(
    (c) => c.isPublished && c.items.some((i) => i.isPublished),
  );

  if (categories.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center text-sm text-stone-500">
        ただいまメニューを準備中です。
      </div>
    );
  }

  return (
    <div className={`mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 ${theme.sectionGap}`}>
      {categories.map((cat) => (
        <CategorySection key={cat.id} category={cat} theme={theme} demoId={demoId} />
      ))}
      <p className={`pt-4 text-center text-[11px] ${theme.footerNote}`}>
        表示価格は税込です。商品をタップすると詳細をご覧いただけます。
      </p>
    </div>
  );
}

function CategorySection({
  category,
  theme,
  demoId,
}: {
  category: MenuCategory;
  theme: Theme;
  demoId: string;
}) {
  const items = category.items.filter((i) => i.isPublished);
  if (items.length === 0) return null;
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-baseline gap-3 sm:mb-6 sm:gap-4">
        <h2 className={theme.catHeading}>{category.name}</h2>
        {category.subName && <span className={theme.catSub}>{category.subName}</span>}
        <div className={`ml-1 hidden flex-1 border-t border-dashed sm:block ${theme.catRule}`} />
      </div>

      <div className={theme.grid}>
        {items.map((item) => (
          <Card key={item.id} item={item} theme={theme} demoId={demoId} />
        ))}
      </div>
    </section>
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
      {theme.layout !== "list" && <ImageSlot src={item.imageUrl} ph={theme.cardImagePh} />}
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
