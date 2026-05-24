"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useDemoShop } from "@/lib/demo-store";
import { getDemo } from "@/data/demos";
import { THEMES } from "@/lib/themes";
import { MenuView } from "@/components/customer/MenuView";
import { DemoSwitcher } from "@/components/customer/DemoSwitcher";

export default function DemoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
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

  return (
    <div className={`flex flex-1 flex-col ${theme.pageBg} ${theme.pageText} ${theme.fontFamily}`}>
      <DemoSwitcher currentId={id} />

      <header className={`border-b border-neutral-200/40 safe-x ${theme.headerBg}`}>
        <div className="mx-auto max-w-5xl px-4 py-6 text-center sm:px-6 sm:py-10">
          <p className={`text-[11px] tracking-[0.4em] uppercase ${theme.headerAccent}`}>
            {shop.info.name}
          </p>
          <h1 className={`mt-2 text-3xl sm:text-4xl ${theme.fontFamily} ${theme.headerText}`}>
            {shop.info.nameJa}
          </h1>
          {shop.info.tagline && (
            <p className={`mt-3 text-xs sm:text-sm ${theme.headerText} opacity-80`}>
              {shop.info.tagline}
            </p>
          )}
          <div className={`mx-auto mt-5 h-px w-16 ${theme.catRule.replace("border-", "bg-")}`} />
        </div>
      </header>

      <main className="flex-1">
        <MenuView shop={shop} theme={theme} demoId={id} />
      </main>

      <footer className={`border-t border-neutral-200/30 px-4 py-5 text-center text-[10px] tracking-[0.2em] uppercase safe-x safe-bottom sm:text-[11px] ${theme.footerNote}`}>
        {shop.info.name}
      </footer>
    </div>
  );
}
