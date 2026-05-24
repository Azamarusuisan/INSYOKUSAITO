"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button, Field, Input, Textarea, Toggle } from "@/components/ui/Form";
import type { MenuItem } from "@/lib/types";

export type ItemFormValues = {
  name: string;
  subName: string;
  price: string;
  description: string;
  imageUrl: string;
  badge: string;
  isPublished: boolean;
  heroImageUrl: string;
  galleryText: string; // 1行1URL
  videoUrl: string;
  story: string;
  storyPointsText: string; // "タイトル | 本文" を1行1点
  linksText: string; // "種類:URL[ | ラベル]" を1行1リンク
};

const LINK_TYPES = ["instagram", "note", "x", "youtube", "tiktok", "facebook", "web"] as const;

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initial?: MenuItem | null;
  categoryLabel: string;
  onClose: () => void;
  onSubmit: (values: Omit<MenuItem, "id">) => void;
};

const empty: ItemFormValues = {
  name: "",
  subName: "",
  price: "",
  description: "",
  imageUrl: "",
  badge: "",
  isPublished: true,
  heroImageUrl: "",
  galleryText: "",
  videoUrl: "",
  story: "",
  storyPointsText: "",
  linksText: "",
};

export function ItemFormModal({
  open,
  mode,
  initial,
  categoryLabel,
  onClose,
  onSubmit,
}: Props) {
  const [values, setValues] = useState<ItemFormValues>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof ItemFormValues, string>>>({});

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setValues({
        name: initial.name,
        subName: initial.subName ?? "",
        price: String(initial.price ?? ""),
        description: initial.description ?? "",
        imageUrl: initial.imageUrl ?? "",
        badge: initial.badge ?? "",
        isPublished: initial.isPublished,
        heroImageUrl: initial.heroImageUrl ?? "",
        galleryText: (initial.gallery ?? []).join("\n"),
        videoUrl: initial.videoUrl ?? "",
        story: initial.story ?? "",
        storyPointsText: (initial.storyPoints ?? [])
          .map((p) => `${p.title} | ${p.body}`)
          .join("\n"),
        linksText: (initial.links ?? [])
          .map((l) => `${l.type}: ${l.url}${l.label ? ` | ${l.label}` : ""}`)
          .join("\n"),
      });
    } else {
      setValues(empty);
    }
    setErrors({});
  }, [open, initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!values.name.trim()) errs.name = "商品名は必須です。";
    const priceNum = Number(values.price);
    if (values.price === "" || Number.isNaN(priceNum) || priceNum < 0 || !Number.isFinite(priceNum)) {
      errs.price = "価格は0以上の数値で入力してください。";
    } else if (priceNum > 1_000_000) {
      errs.price = "価格は1,000,000円以下で入力してください。";
    }
    if (values.imageUrl && !/^https?:\/\//.test(values.imageUrl.trim())) {
      errs.imageUrl = "画像URLは http(s):// から始めてください。";
    }
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const gallery = values.galleryText
      .split(/\n+/)
      .map((s) => s.trim())
      .filter((s) => /^https?:\/\//.test(s));

    const storyPoints = values.storyPointsText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const [title, ...rest] = line.split("|");
        return { title: (title ?? "").trim(), body: rest.join("|").trim() };
      })
      .filter((p) => p.title);

    const links = values.linksText
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const m = line.match(/^([a-zA-Z]+)\s*:\s*(\S+)(?:\s*\|\s*(.*))?$/);
        if (!m) return null;
        const type = m[1].toLowerCase();
        const url = m[2].trim();
        const label = m[3]?.trim() || undefined;
        if (!(LINK_TYPES as readonly string[]).includes(type)) return null;
        if (!/^https?:\/\//.test(url)) return null;
        return { type: type as (typeof LINK_TYPES)[number], url, label };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null);

    onSubmit({
      name: values.name.trim(),
      subName: values.subName.trim() || undefined,
      price: Math.round(priceNum),
      description: values.description.trim() || undefined,
      imageUrl: values.imageUrl.trim() || undefined,
      badge: values.badge.trim() || undefined,
      isPublished: values.isPublished,
      heroImageUrl: values.heroImageUrl.trim() || undefined,
      gallery: gallery.length > 0 ? gallery : undefined,
      videoUrl: values.videoUrl.trim() || undefined,
      story: values.story.trim() || undefined,
      storyPoints: storyPoints.length > 0 ? storyPoints : undefined,
      links: links.length > 0 ? links : undefined,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "商品を追加" : "商品を編集"}
      description={`カテゴリ：${categoryLabel}`}
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            キャンセル
          </Button>
          <Button type="submit" form="item-form">
            保存
          </Button>
        </>
      }
    >
      <form id="item-form" onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="商品名（日本語）" required error={errors.name}>
            <Input
              type="text"
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              placeholder="マルゲリータ / ヘッドスパ 30分 など"
            />
          </Field>
          <Field label="サブ表記" hint="任意。原語・英語名など">
            <Input
              type="text"
              value={values.subName}
              onChange={(e) => setValues((v) => ({ ...v, subName: e.target.value }))}
              placeholder="Margherita / Head Spa"
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="価格（円・税込）" required error={errors.price}>
            <Input
              type="number"
              inputMode="numeric"
              min={0}
              max={1000000}
              step={10}
              value={values.price}
              onChange={(e) => setValues((v) => ({ ...v, price: e.target.value }))}
              placeholder="1500"
            />
          </Field>
          <Field label="バッジ" hint="任意。「人気」「定番」など、カードに表示">
            <Input
              type="text"
              value={values.badge}
              onChange={(e) => setValues((v) => ({ ...v, badge: e.target.value }))}
              placeholder="人気"
              maxLength={10}
            />
          </Field>
        </div>

        <Field label="説明文" hint="任意。1〜2行程度がおすすめです。">
          <Textarea
            rows={3}
            value={values.description}
            onChange={(e) =>
              setValues((v) => ({ ...v, description: e.target.value }))
            }
            placeholder="素材やこだわりを一言で。"
            maxLength={140}
          />
        </Field>

        <Field
          label="画像URL"
          hint="任意。空欄なら IMAGE ラベルが表示されます。"
          error={errors.imageUrl}
        >
          <Input
            type="url"
            value={values.imageUrl}
            onChange={(e) => setValues((v) => ({ ...v, imageUrl: e.target.value }))}
            placeholder="https://example.com/photo.jpg"
          />
        </Field>

        <div className="flex items-center justify-between rounded border border-neutral-200 px-3 py-2">
          <div>
            <p className="text-xs font-medium text-neutral-800">公開する</p>
            <p className="text-[11px] text-neutral-500">
              非公開にするとお客様画面には表示されません。
            </p>
          </div>
          <Toggle
            checked={values.isPublished}
            onChange={(next) => setValues((v) => ({ ...v, isPublished: next }))}
          />
        </div>

        {/* 詳細ページ用のフィールド */}
        <details className="rounded border border-neutral-200 bg-neutral-50">
          <summary className="cursor-pointer select-none px-3 py-2 text-xs font-medium text-neutral-800">
            詳細ページの内容（こだわり・追加写真・動画）
          </summary>
          <div className="space-y-4 border-t border-neutral-200 px-3 py-4 sm:px-4 sm:py-5">
            <Field
              label="詳細ページの大きな画像URL"
              hint="任意。未指定なら上の「画像URL」が使われます。"
            >
              <Input
                type="url"
                value={values.heroImageUrl}
                onChange={(e) => setValues((v) => ({ ...v, heroImageUrl: e.target.value }))}
                placeholder="https://example.com/hero.jpg"
              />
            </Field>

            <Field
              label="こだわり（本文）"
              hint="改行を1行空けると段落になります。料理人の想い・素材・調理法など。"
            >
              <Textarea
                rows={6}
                value={values.story}
                onChange={(e) => setValues((v) => ({ ...v, story: e.target.value }))}
                placeholder={"例：このカルボナーラは…\n\n卵黄は…"}
                maxLength={2000}
              />
            </Field>

            <Field
              label="こだわり3点（箇条書き）"
              hint="1行1点。「タイトル | 本文」の形式で書いてください。"
            >
              <Textarea
                rows={4}
                value={values.storyPointsText}
                onChange={(e) => setValues((v) => ({ ...v, storyPointsText: e.target.value }))}
                placeholder={"素材へのこだわり | 北海道産の…\n伝統の製法 | 1880年から…\nシェフの一言 | 香りを楽しんで…"}
              />
            </Field>

            <Field label="追加写真URL（複数）" hint="1行1URL。最大10枚程度を推奨。">
              <Textarea
                rows={4}
                value={values.galleryText}
                onChange={(e) => setValues((v) => ({ ...v, galleryText: e.target.value }))}
                placeholder={"https://example.com/1.jpg\nhttps://example.com/2.jpg"}
              />
            </Field>

            <Field
              label="動画URL"
              hint="任意。YouTube/Vimeo の埋め込みURL、または mp4 の直URL。"
            >
              <Input
                type="url"
                value={values.videoUrl}
                onChange={(e) => setValues((v) => ({ ...v, videoUrl: e.target.value }))}
                placeholder="https://www.youtube.com/embed/xxxx"
              />
            </Field>

            <Field
              label="SNS・外部リンク（複数）"
              hint={`1行1リンク。形式: 「種類: URL | ラベル」。種類: ${LINK_TYPES.join(" / ")}`}
            >
              <Textarea
                rows={4}
                value={values.linksText}
                onChange={(e) => setValues((v) => ({ ...v, linksText: e.target.value }))}
                placeholder={"instagram: https://instagram.com/p/xxxx | 制作風景\nnote: https://note.com/xxxx/n/xxxx | シェフの記事\nyoutube: https://youtu.be/xxxx"}
              />
            </Field>
          </div>
        </details>
      </form>
    </Modal>
  );
}
