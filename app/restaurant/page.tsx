"use client";

import { useShop } from "@/lib/store";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function RestaurantMenuPage() {
  const shop = useShop("restaurant");
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
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-10 sm:space-y-16 sm:px-6 sm:py-12">
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}

      <p className="pt-4 text-center text-[11px] text-stone-500">
        表示価格は税込です。アレルギーがございましたらスタッフへお申し付けください。
      </p>
    </div>
  );
}

function CategorySection({ category }: { category: MenuCategory }) {
  const items = category.items.filter((i) => i.isPublished);
  if (items.length === 0) return null;
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-baseline gap-3 sm:mb-6 sm:gap-4">
        <h2 className="font-serif text-xl text-stone-900 sm:text-2xl">
          {category.name}
        </h2>
        {category.subName && (
          <span className="text-[11px] tracking-[0.3em] text-amber-900/70 uppercase">
            {category.subName}
          </span>
        )}
        <div className="ml-1 hidden flex-1 border-t border-dashed border-amber-900/25 sm:block" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function Card({ item }: { item: MenuItem }) {
  return (
    <article className="flex gap-3 rounded-md border border-amber-900/10 bg-white p-3 shadow-[0_1px_0_rgba(120,80,30,0.04)] sm:gap-4 sm:p-4">
      <ImageSlot src={item.imageUrl} />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-sm text-stone-900 sm:text-base">
              {item.name}
            </h3>
            {item.subName && (
              <p className="mt-0.5 text-[10px] tracking-wider text-amber-900/70 sm:text-[11px]">
                {item.subName}
              </p>
            )}
          </div>
          {item.badge && (
            <span className="shrink-0 rounded-full border border-amber-900/30 px-2 py-0.5 text-[10px] tracking-wider text-amber-900">
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-2 text-[11px] leading-relaxed text-stone-600 sm:text-xs">
            {item.description}
          </p>
        )}
        <p className="mt-auto pt-2 text-right font-serif text-sm text-stone-900 sm:pt-3 sm:text-base">
          {formatPrice(item.price)}
        </p>
      </div>
    </article>
  );
}

function ImageSlot({ src }: { src?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt=""
        className="h-20 w-20 shrink-0 rounded object-cover sm:h-24 sm:w-24"
      />
    );
  }
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-stone-100 text-[10px] tracking-[0.2em] text-stone-400 sm:h-24 sm:w-24">
      IMAGE
    </div>
  );
}
