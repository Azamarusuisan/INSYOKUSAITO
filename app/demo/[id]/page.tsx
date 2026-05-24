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

  const hasBg = !!theme.bgImage;

  return (
    <div className={`relative flex flex-1 flex-col ${theme.pageBg} ${theme.pageText} ${theme.fontFamily}`}>
      {hasBg && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${theme.bgImage})` }}
          />
          <div
            aria-hidden
            className="fixed inset-0 -z-10"
            style={{
              background:
                theme.bgOverlay ??
                "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8))",
            }}
          />
        </>
      )}

      <DemoSwitcher currentId={id} />

      <header className={`safe-x ${hasBg ? "" : `border-b border-neutral-200/40 ${theme.headerBg}`}`}>
        <div className={`mx-auto max-w-5xl px-4 text-center sm:px-6 ${hasBg ? "py-14 sm:py-24" : "py-6 sm:py-10"}`}>
          <p className={`text-[11px] tracking-[0.4em] uppercase ${theme.headerAccent}`}>
            {shop.info.name}
          </p>
          <h1 className={`mt-3 tracking-wide ${theme.fontFamily} ${theme.headerText} ${hasBg ? "text-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-6xl" : "text-3xl sm:text-4xl"}`}>
            {shop.info.nameJa}
          </h1>
          {shop.info.tagline && (
            <p className={`mt-4 text-xs sm:text-sm ${theme.headerText} opacity-90`}>
              {shop.info.tagline}
            </p>
          )}
          <div className={`mx-auto mt-6 h-px w-16 ${theme.catRule.replace("border-", "bg-")}`} />
        </div>
      </header>

      <main className="flex-1">
        <MenuView shop={shop} theme={theme} demoId={id} />
      </main>

      <footer className={`border-t border-white/15 px-4 py-5 text-center text-[10px] tracking-[0.2em] uppercase safe-x safe-bottom sm:text-[11px] ${theme.footerNote}`}>
        {shop.info.name}
      </footer>
    </div>
  );
}
