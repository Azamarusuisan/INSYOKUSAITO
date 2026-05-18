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
};

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

    onSubmit({
      name: values.name.trim(),
      subName: values.subName.trim() || undefined,
      price: Math.round(priceNum),
      description: values.description.trim() || undefined,
      imageUrl: values.imageUrl.trim() || undefined,
      badge: values.badge.trim() || undefined,
      isPublished: values.isPublished,
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
      </form>
    </Modal>
  );
}
