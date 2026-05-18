"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth, DEMO_ACCOUNTS } from "@/lib/auth";
import { useToast } from "@/lib/toast";
import type { ShopType } from "@/lib/types";
import { Button, Field, Input } from "@/components/ui/Form";
import { cx } from "@/lib/utils";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-1 items-center justify-center text-sm text-neutral-500">
          読み込み中…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, ready, signIn } = useAuth();
  const { push } = useToast();

  const initialType: ShopType =
    searchParams.get("type") === "salon" ? "salon" : "restaurant";

  const [shopType, setShopType] = useState<ShopType>(initialType);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ready && user) {
      router.replace(`/admin/${user.shopType}`);
    }
  }, [ready, user, router]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = signIn({ id, password, shopType });
    if (!result.ok) {
      setError(result.reason);
      setSubmitting(false);
      return;
    }
    push(`${result.user.displayName} としてログインしました`);
    router.replace(`/admin/${result.user.shopType}`);
  };

  const fillDemo = () => {
    const demo = DEMO_ACCOUNTS.find((a) => a.shopType === shopType);
    if (!demo) return;
    setId(demo.id);
    setPassword(demo.password);
  };

  return (
    <div className="flex flex-1 flex-col bg-neutral-50">
      <header className="px-6 pt-8 pb-4 text-center sm:pt-12">
        <Link
          href="/"
          className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase hover:text-neutral-800"
        >
          ← お客様向けトップへ
        </Link>
        <p className="mt-4 text-[11px] tracking-[0.4em] text-neutral-500 uppercase">
          Admin
        </p>
        <h1 className="mt-2 font-serif text-2xl text-neutral-900 sm:text-3xl">
          管理画面ログイン
        </h1>
        <p className="mt-2 text-sm text-neutral-600">
          店舗オーナー様向けの管理ページです
        </p>
      </header>

      <main className="flex flex-1 items-start justify-center px-4 pb-12 pt-4 sm:px-6">
        <div className="w-full max-w-md rounded-lg border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
          <div
            className="mb-6 grid grid-cols-2 gap-1 rounded-md bg-neutral-100 p-1"
            role="tablist"
          >
            <TabButton
              active={shopType === "restaurant"}
              onClick={() => {
                setShopType("restaurant");
                setError(null);
              }}
            >
              飲食店
            </TabButton>
            <TabButton
              active={shopType === "salon"}
              onClick={() => {
                setShopType("salon");
                setError(null);
              }}
            >
              美容室
            </TabButton>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Field label="店舗ID" required>
              <Input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder={shopType === "restaurant" ? "restaurant" : "salon"}
                autoComplete="username"
              />
            </Field>
            <Field label="パスワード" required>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="demo"
                autoComplete="current-password"
              />
            </Field>

            {error && (
              <div
                role="alert"
                className="rounded border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700"
              >
                {error}
              </div>
            )}

            <Button type="submit" fullWidth loading={submitting}>
              ログイン
            </Button>
          </form>

          <div className="mt-6 rounded border border-dashed border-neutral-300 bg-neutral-50 p-3 text-[11px] text-neutral-600">
            <p className="font-medium text-neutral-800">デモアカウント</p>
            <p className="mt-1">
              ID:{" "}
              <code className="rounded bg-white px-1 py-0.5 font-mono text-neutral-900">
                {shopType}
              </code>{" "}
              / Pass:{" "}
              <code className="rounded bg-white px-1 py-0.5 font-mono text-neutral-900">
                demo
              </code>
            </p>
            <button
              type="button"
              onClick={fillDemo}
              className="mt-2 text-xs font-medium text-neutral-900 underline-offset-2 hover:underline"
            >
              デモ情報を入力する
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cx(
        "rounded py-2 text-sm font-medium transition-colors",
        active
          ? "bg-white text-neutral-900 shadow-sm"
          : "text-neutral-500 hover:text-neutral-800",
      )}
    >
      {children}
    </button>
  );
}
