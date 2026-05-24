"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useShop } from "@/lib/store";
import { useToast } from "@/lib/toast";
import type { ShopType } from "@/lib/types";
import { Button } from "@/components/ui/Form";
import { cx } from "@/lib/utils";

const NAV = [
  { href: "", label: "ダッシュボード", match: "exact" as const },
  { href: "/menu", label: "メニュー", match: "prefix" as const },
  { href: "/qr", label: "QR表示", match: "prefix" as const },
  { href: "/settings", label: "店舗情報", match: "prefix" as const },
  { href: "/data", label: "データ管理", match: "prefix" as const },
];

const isValidType = (t: string): t is ShopType =>
  t === "restaurant" || t === "salon";

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  if (!isValidType(type)) notFound();

  const router = useRouter();
  const pathname = usePathname();
  const { user, ready, signOut } = useAuth();
  const shop = useShop(type);
  const { push } = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace(`/admin/login?type=${type}`);
      return;
    }
    if (user.shopType !== type) {
      router.replace(`/admin/${user.shopType}`);
    }
  }, [ready, user, type, router]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  if (!ready || !user || user.shopType !== type) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
        読み込み中…
      </div>
    );
  }

  const onLogout = () => {
    signOut();
    push("ログアウトしました");
    router.replace("/admin/login");
  };

  const base = `/admin/${type}`;
  const publicPath = `/${type}`;
  const accent = type === "restaurant" ? "amber" : "neutral";

  return (
    <div className="flex min-h-full flex-1 bg-neutral-100 text-neutral-900">
      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-neutral-200 bg-white lg:flex">
        <SidebarContent
          shopName={shop.info.nameJa}
          shopType={type}
          accent={accent}
          base={base}
          pathname={pathname}
          publicPath={publicPath}
          userName={user.displayName}
          onLogout={onLogout}
        />
      </aside>

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-neutral-900/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col border-r border-neutral-200 bg-white shadow-xl">
            <SidebarContent
              shopName={shop.info.nameJa}
              shopType={type}
              accent={accent}
              base={base}
              pathname={pathname}
              publicPath={publicPath}
              userName={user.displayName}
              onLogout={onLogout}
            />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar (mobile shows hamburger) */}
        <header className="flex h-14 items-center justify-between border-b border-neutral-200 bg-white px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="rounded p-2 hover:bg-neutral-100"
            aria-label="メニューを開く"
          >
            <span className="block h-0.5 w-5 bg-neutral-700" />
            <span className="mt-1 block h-0.5 w-5 bg-neutral-700" />
            <span className="mt-1 block h-0.5 w-5 bg-neutral-700" />
          </button>
          <p className="font-serif text-sm">{shop.info.nameJa}</p>
          <Link
            href={publicPath}
            target="_blank"
            className="text-[11px] tracking-wider text-neutral-600 underline-offset-2 hover:underline"
          >
            プレビュー
          </Link>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}

type SidebarProps = {
  shopName: string;
  shopType: ShopType;
  accent: "amber" | "neutral";
  base: string;
  pathname: string;
  publicPath: string;
  userName: string;
  onLogout: () => void;
};

function SidebarContent({
  shopName,
  shopType,
  accent,
  base,
  pathname,
  publicPath,
  userName,
  onLogout,
}: SidebarProps) {
  const accentBar = accent === "amber" ? "bg-amber-700" : "bg-neutral-900";
  return (
    <>
      <div className="border-b border-neutral-200 px-5 py-5">
        <div className="flex items-center gap-2">
          <span className={cx("inline-block h-1.5 w-1.5 rounded-full", accentBar)} />
          <p className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
            {shopType === "restaurant" ? "Restaurant Admin" : "Salon Admin"}
          </p>
        </div>
        <p className="mt-2 font-serif text-base">{shopName}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV.map((item) => {
          const href = `${base}${item.href}`;
          const active =
            item.match === "exact" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cx(
                "block rounded px-3 py-2 text-sm transition-colors",
                active
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100",
              )}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href={publicPath}
          target="_blank"
          className="mt-3 block rounded border border-dashed border-neutral-300 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
        >
          お客様画面をプレビュー →
        </Link>
      </nav>

      <div className="border-t border-neutral-200 px-3 py-4">
        <p className="px-2 text-[10px] tracking-wider text-neutral-500 uppercase">
          Signed in as
        </p>
        <p className="mt-1 px-2 text-xs text-neutral-800">{userName}</p>
        <div className="mt-3 px-2">
          <Button variant="secondary" size="sm" fullWidth onClick={onLogout}>
            ログアウト
          </Button>
        </div>
      </div>
    </>
  );
}
