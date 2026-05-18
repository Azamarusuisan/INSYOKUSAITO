"use client";

import { useShop } from "@/lib/store";
import type { MenuCategory, MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export default function SalonMenuPage() {
  const shop = useShop("salon");
  const categories = shop.categories.filter(
    (c) => c.isPublished && c.items.some((i) => i.isPublished),
  );

  if (categories.length === 0) {
    return (
      <div className="mx-auto max-w-md px-6 py-20 text-center text-sm text-neutral-500">
        ただいまメニューを準備中です。
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-10 sm:space-y-16 sm:px-6 sm:py-12">
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}

      <p className="pt-4 text-center text-[11px] text-neutral-500">
        表示価格はすべて税込です。ロング・エクストラロングは＋¥1,100をいただく場合がございます。
      </p>
    </div>
  );
}

function CategorySection({ category }: { category: MenuCategory }) {
  const items = category.items.filter((i) => i.isPublished);
  if (items.length === 0) return null;
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-baseline gap-3 sm:mb-8 sm:gap-4">
        <h2 className="font-serif text-xl font-light tracking-wider sm:text-2xl">
          {category.name}
        </h2>
        {category.subName && (
          <span className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase sm:text-[11px]">
            {category.subName}
          </span>
        )}
        <div className="ml-1 hidden flex-1 border-t border-neutral-200 sm:block" />
      </div>

      <div className="grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
        {items.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function Card({ item }: { item: MenuItem }) {
  return (
    <article className="flex gap-4 bg-white p-4 sm:gap-5 sm:p-5">
      <ImageSlot src={item.imageUrl} />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2 sm:gap-3">
          <div className="min-w-0">
            <h3 className="font-serif text-sm font-normal tracking-wide sm:text-base">
              {item.name}
            </h3>
            {item.subName && (
              <p className="mt-0.5 text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
                {item.subName}
              </p>
            )}
          </div>
          {item.badge && (
            <span className="shrink-0 border border-neutral-900 px-2 py-0.5 text-[10px] tracking-widest text-neutral-900">
              {item.badge}
            </span>
          )}
        </div>
        {item.description && (
          <p className="mt-2 text-[11px] leading-relaxed text-neutral-600 sm:text-xs">
            {item.description}
          </p>
        )}
        <p className="mt-auto pt-3 text-right text-sm font-light tracking-wider sm:pt-4">
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
        className="h-20 w-20 shrink-0 object-cover sm:h-24 sm:w-24"
      />
    );
  }
  return (
    <div className="flex h-20 w-20 shrink-0 items-center justify-center bg-neutral-100 text-[10px] tracking-[0.25em] text-neutral-400 sm:h-24 sm:w-24">
      IMAGE
    </div>
  );
}
