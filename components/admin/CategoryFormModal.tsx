"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button, Field, Input, Toggle } from "@/components/ui/Form";
import type { MenuCategory } from "@/lib/types";

export type CategoryFormValues = {
  name: string;
  subName: string;
  isPublished: boolean;
};

type Props = {
  open: boolean;
  mode: "create" | "edit";
  initial?: MenuCategory | null;
  onClose: () => void;
  onSubmit: (values: CategoryFormValues) => void;
};

const empty: CategoryFormValues = { name: "", subName: "", isPublished: true };

export function CategoryFormModal({ open, mode, initial, onClose, onSubmit }: Props) {
  const [values, setValues] = useState<CategoryFormValues>(empty);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    if (initial) {
      setValues({
        name: initial.name,
        subName: initial.subName ?? "",
        isPublished: initial.isPublished,
      });
    } else {
      setValues(empty);
    }
    setError(null);
  }, [open, initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!values.name.trim()) {
      setError("カテゴリ名は必須です。");
      return;
    }
    onSubmit({
      name: values.name.trim(),
      subName: values.subName.trim(),
      isPublished: values.isPublished,
    });
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={mode === "create" ? "カテゴリを追加" : "カテゴリを編集"}
      description="お客様画面の見出しとして使われます。"
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            キャンセル
          </Button>
          <Button type="submit" form="category-form">
            保存
          </Button>
        </>
      }
    >
      <form id="category-form" onSubmit={handleSubmit} className="space-y-4">
        <Field label="カテゴリ名（日本語）" required>
          <Input
            type="text"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            placeholder="前菜 / カット など"
          />
        </Field>
        <Field label="サブ表記（原語・英語など）" hint="任意。例: Antipasti / Cut">
          <Input
            type="text"
            value={values.subName}
            onChange={(e) => setValues((v) => ({ ...v, subName: e.target.value }))}
            placeholder="Antipasti"
          />
        </Field>
        <div className="flex items-center justify-between rounded border border-neutral-200 px-3 py-2">
          <div>
            <p className="text-xs font-medium text-neutral-800">公開する</p>
            <p className="text-[11px] text-neutral-500">
              非公開のカテゴリと配下の商品はお客様画面に表示されません。
            </p>
          </div>
          <Toggle
            checked={values.isPublished}
            onChange={(next) => setValues((v) => ({ ...v, isPublished: next }))}
          />
        </div>
        {error && (
          <p role="alert" className="text-[11px] text-rose-600">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}
