"use client";

import { use, useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { useDemoShop, useDemoStore } from "@/lib/demo-store";
import { useToast } from "@/lib/toast";
import { Button, Field, Input } from "@/components/ui/Form";

export default function DemoSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const shop = useDemoShop(id);
  const store = useDemoStore();
  const { push } = useToast();

  const [name, setName] = useState("");
  const [nameJa, setNameJa] = useState("");
  const [tagline, setTagline] = useState("");
  const [errors, setErrors] = useState<{ name?: string; nameJa?: string }>({});

  useEffect(() => {
    if (!shop) return;
    setName(shop.info.name);
    setNameJa(shop.info.nameJa);
    setTagline(shop.info.tagline);
  }, [shop]);

  if (!shop) notFound();

  const isDirty = name !== shop.info.name || nameJa !== shop.info.nameJa || tagline !== shop.info.tagline;

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!name.trim()) errs.name = "店名（英語表記）は必須です。";
    if (!nameJa.trim()) errs.nameJa = "店名（日本語）は必須です。";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    store.updateInfo(id, { name: name.trim(), nameJa: nameJa.trim(), tagline: tagline.trim() });
    push("店舗情報を更新しました");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">Settings</p>
        <h1 className="mt-1 font-serif text-2xl text-neutral-900 sm:text-3xl">店舗情報</h1>
        <p className="mt-1 text-xs text-neutral-600 sm:text-sm">お客様画面のヘッダーに表示される情報です。</p>
      </header>

      <form onSubmit={onSave} className="space-y-4 rounded-lg border border-neutral-200 bg-white p-5 sm:p-6">
        <Field label="店名（英語・サブ表記）" required error={errors.name}>
          <Input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
        </Field>
        <Field label="店名（日本語・メイン表記）" required error={errors.nameJa}>
          <Input type="text" value={nameJa} onChange={(e) => setNameJa(e.target.value)} maxLength={40} />
        </Field>
        <Field label="キャッチコピー" hint="任意。1行程度の短い紹介文">
          <Input type="text" value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={80} />
        </Field>

        <div className="flex flex-col-reverse gap-2 border-t border-neutral-200 pt-4 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={() => { setName(shop.info.name); setNameJa(shop.info.nameJa); setTagline(shop.info.tagline); setErrors({}); }} disabled={!isDirty}>
            変更を破棄
          </Button>
          <Button type="submit" disabled={!isDirty}>保存する</Button>
        </div>
      </form>
    </div>
  );
}
