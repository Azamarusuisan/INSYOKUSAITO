"use client";

import { use, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { useShop, useStore } from "@/lib/store";
import { useToast } from "@/lib/toast";
import type { MenuCategory, MenuItem, ShopType } from "@/lib/types";
import { Button, Toggle } from "@/components/ui/Form";
import { ConfirmDialog } from "@/components/ui/Modal";
import { CategoryFormModal } from "@/components/admin/CategoryFormModal";
import { ItemFormModal } from "@/components/admin/ItemFormModal";
import { cx, formatPrice } from "@/lib/utils";

const isValidType = (t: string): t is ShopType =>
  t === "restaurant" || t === "salon";

type CategoryModalState =
  | { open: false }
  | { open: true; mode: "create" }
  | { open: true; mode: "edit"; category: MenuCategory };

type ItemModalState =
  | { open: false }
  | { open: true; mode: "create"; categoryId: string; categoryLabel: string }
  | {
      open: true;
      mode: "edit";
      categoryId: string;
      categoryLabel: string;
      item: MenuItem;
    };

type DeleteState =
  | { open: false }
  | { open: true; kind: "category"; categoryId: string; label: string }
  | {
      open: true;
      kind: "item";
      categoryId: string;
      itemId: string;
      label: string;
    };

export default function AdminMenuPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);
  if (!isValidType(type)) notFound();

  const shop = useShop(type);
  const store = useStore();
  const { push } = useToast();

  const [expanded, setExpanded] = useState<Set<string> | null>(null);
  const effectiveExpanded = useMemo(() => {
    if (expanded) return expanded;
    return new Set(shop.categories.map((c) => c.id));
  }, [expanded, shop.categories]);

  const toggleExpand = (id: string) => {
    const next = new Set(effectiveExpanded);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setExpanded(next);
  };

  const [catModal, setCatModal] = useState<CategoryModalState>({ open: false });
  const [itemModal, setItemModal] = useState<ItemModalState>({ open: false });
  const [del, setDel] = useState<DeleteState>({ open: false });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
            Menu
          </p>
          <h1 className="mt-1 font-serif text-2xl text-neutral-900 sm:text-3xl">
            メニュー編集
          </h1>
          <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
            カテゴリと商品を管理します。並び順は↑↓ボタンで変更できます。
          </p>
        </div>
        <Button onClick={() => setCatModal({ open: true, mode: "create" })}>
          ＋ カテゴリを追加
        </Button>
      </header>

      {shop.categories.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 bg-white p-10 text-center text-sm text-neutral-500">
          まだカテゴリがありません。「カテゴリを追加」から作成してください。
        </div>
      ) : (
        <ul className="space-y-3">
          {shop.categories.map((category, idx) => (
            <li key={category.id}>
              <CategoryBlock
                category={category}
                position={idx}
                total={shop.categories.length}
                expanded={effectiveExpanded.has(category.id)}
                onToggleExpand={() => toggleExpand(category.id)}
                onEdit={() =>
                  setCatModal({ open: true, mode: "edit", category })
                }
                onDelete={() =>
                  setDel({
                    open: true,
                    kind: "category",
                    categoryId: category.id,
                    label: category.name,
                  })
                }
                onMove={(dir) => store.moveCategory(type, category.id, dir)}
                onTogglePublished={() =>
                  store.toggleCategoryPublished(type, category.id)
                }
                onAddItem={() =>
                  setItemModal({
                    open: true,
                    mode: "create",
                    categoryId: category.id,
                    categoryLabel: category.name,
                  })
                }
                onEditItem={(item) =>
                  setItemModal({
                    open: true,
                    mode: "edit",
                    categoryId: category.id,
                    categoryLabel: category.name,
                    item,
                  })
                }
                onDeleteItem={(item) =>
                  setDel({
                    open: true,
                    kind: "item",
                    categoryId: category.id,
                    itemId: item.id,
                    label: item.name,
                  })
                }
                onMoveItem={(item, dir) =>
                  store.moveItem(type, category.id, item.id, dir)
                }
                onToggleItemPublished={(item) =>
                  store.toggleItemPublished(type, category.id, item.id)
                }
              />
            </li>
          ))}
        </ul>
      )}

      <CategoryFormModal
        open={catModal.open}
        mode={catModal.open ? catModal.mode : "create"}
        initial={catModal.open && catModal.mode === "edit" ? catModal.category : null}
        onClose={() => setCatModal({ open: false })}
        onSubmit={(values) => {
          if (catModal.open && catModal.mode === "edit") {
            store.updateCategory(type, catModal.category.id, {
              name: values.name,
              subName: values.subName || undefined,
              isPublished: values.isPublished,
            });
            push("カテゴリを更新しました");
          } else {
            store.addCategory(type, {
              name: values.name,
              subName: values.subName || undefined,
              isPublished: values.isPublished,
            });
            push("カテゴリを追加しました");
          }
          setCatModal({ open: false });
        }}
      />

      <ItemFormModal
        open={itemModal.open}
        mode={itemModal.open ? itemModal.mode : "create"}
        categoryLabel={itemModal.open ? itemModal.categoryLabel : ""}
        initial={
          itemModal.open && itemModal.mode === "edit" ? itemModal.item : null
        }
        onClose={() => setItemModal({ open: false })}
        onSubmit={(values) => {
          if (!itemModal.open) return;
          if (itemModal.mode === "edit") {
            store.updateItem(type, itemModal.categoryId, itemModal.item.id, values);
            push("商品を更新しました");
          } else {
            store.addItem(type, itemModal.categoryId, values);
            push("商品を追加しました");
          }
          setItemModal({ open: false });
        }}
      />

      <ConfirmDialog
        open={del.open}
        title={del.open && del.kind === "category" ? "カテゴリを削除" : "商品を削除"}
        message={
          del.open
            ? del.kind === "category"
              ? `「${del.label}」と配下のすべての商品が削除されます。よろしいですか？`
              : `「${del.label}」を削除します。よろしいですか？`
            : ""
        }
        confirmLabel="削除する"
        variant="danger"
        onCancel={() => setDel({ open: false })}
        onConfirm={() => {
          if (!del.open) return;
          if (del.kind === "category") {
            store.deleteCategory(type, del.categoryId);
            push("カテゴリを削除しました", "info");
          } else {
            store.deleteItem(type, del.categoryId, del.itemId);
            push("商品を削除しました", "info");
          }
          setDel({ open: false });
        }}
      />
    </div>
  );
}

type CategoryBlockProps = {
  category: MenuCategory;
  position: number;
  total: number;
  expanded: boolean;
  onToggleExpand: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (dir: "up" | "down") => void;
  onTogglePublished: () => void;
  onAddItem: () => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (item: MenuItem) => void;
  onMoveItem: (item: MenuItem, dir: "up" | "down") => void;
  onToggleItemPublished: (item: MenuItem) => void;
};

function CategoryBlock(props: CategoryBlockProps) {
  const {
    category,
    position,
    total,
    expanded,
    onToggleExpand,
    onEdit,
    onDelete,
    onMove,
    onTogglePublished,
    onAddItem,
    onEditItem,
    onDeleteItem,
    onMoveItem,
    onToggleItemPublished,
  } = props;

  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-neutral-200 p-3 sm:flex-row sm:items-center sm:gap-2 sm:p-4">
        <button
          type="button"
          onClick={onToggleExpand}
          className="flex flex-1 items-center gap-3 text-left"
          aria-expanded={expanded}
        >
          <span
            aria-hidden
            className={cx(
              "inline-block text-neutral-400 transition-transform",
              expanded && "rotate-90",
            )}
          >
            ▸
          </span>
          <div className="min-w-0">
            <p className="font-serif text-base text-neutral-900 sm:text-lg">
              {category.name}
            </p>
            {category.subName && (
              <p className="text-[11px] tracking-wider text-neutral-500">
                {category.subName}
              </p>
            )}
          </div>
          <span className="ml-2 inline-flex h-5 items-center rounded-full bg-neutral-100 px-2 text-[10px] text-neutral-600">
            {category.items.length}件
          </span>
          {!category.isPublished && (
            <span className="inline-flex h-5 items-center rounded-full border border-neutral-300 px-2 text-[10px] text-neutral-500">
              非公開
            </span>
          )}
        </button>

        <div className="flex flex-wrap items-center gap-1.5">
          <IconButton
            label="上へ"
            onClick={() => onMove("up")}
            disabled={position === 0}
          >
            ↑
          </IconButton>
          <IconButton
            label="下へ"
            onClick={() => onMove("down")}
            disabled={position === total - 1}
          >
            ↓
          </IconButton>
          <Toggle
            size="sm"
            checked={category.isPublished}
            onChange={onTogglePublished}
          />
          <Button variant="secondary" size="sm" onClick={onEdit}>
            編集
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            削除
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="space-y-2 p-3 sm:p-4">
          {category.items.length === 0 ? (
            <div className="rounded border border-dashed border-neutral-300 px-4 py-6 text-center text-xs text-neutral-500">
              まだ商品がありません。
            </div>
          ) : (
            <ul className="divide-y divide-neutral-200 rounded border border-neutral-200">
              {category.items.map((item, idx) => (
                <li key={item.id}>
                  <ItemRow
                    item={item}
                    position={idx}
                    total={category.items.length}
                    onEdit={() => onEditItem(item)}
                    onDelete={() => onDeleteItem(item)}
                    onMove={(dir) => onMoveItem(item, dir)}
                    onTogglePublished={() => onToggleItemPublished(item)}
                  />
                </li>
              ))}
            </ul>
          )}
          <div className="pt-1">
            <Button variant="secondary" size="sm" onClick={onAddItem}>
              ＋ 商品を追加
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

type ItemRowProps = {
  item: MenuItem;
  position: number;
  total: number;
  onEdit: () => void;
  onDelete: () => void;
  onMove: (dir: "up" | "down") => void;
  onTogglePublished: () => void;
};

function ItemRow({
  item,
  position,
  total,
  onEdit,
  onDelete,
  onMove,
  onTogglePublished,
}: ItemRowProps) {
  return (
    <div className="px-3 py-3 sm:px-4">
      <div className="flex items-start gap-3 sm:items-center sm:gap-4">
        <div className="hidden h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded bg-neutral-100 text-[10px] tracking-widest text-neutral-400 sm:flex">
          {item.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.imageUrl} alt="" className="h-12 w-12 object-cover" />
          ) : (
            "IMG"
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="font-medium text-[15px] text-neutral-900 sm:text-sm">
              {item.name}
            </p>
            <p className="shrink-0 text-[15px] font-medium tabular-nums text-neutral-900 sm:text-sm">
              {formatPrice(item.price)}
            </p>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1.5">
            {item.subName && (
              <p className="text-[11px] text-neutral-500">{item.subName}</p>
            )}
            {item.badge && (
              <span className="inline-flex h-4 items-center rounded-full border border-neutral-300 px-1.5 text-[10px] text-neutral-700">
                {item.badge}
              </span>
            )}
            {!item.isPublished && (
              <span className="inline-flex h-4 items-center rounded-full border border-neutral-300 px-1.5 text-[10px] text-neutral-500">
                非公開
              </span>
            )}
          </div>
          {item.description && (
            <p className="mt-1.5 line-clamp-2 text-[11px] text-neutral-500">
              {item.description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-neutral-100 pt-3 sm:mt-2 sm:border-0 sm:pt-0">
        <div className="flex items-center gap-1.5">
          <IconButton
            label="上へ"
            onClick={() => onMove("up")}
            disabled={position === 0}
          >
            ↑
          </IconButton>
          <IconButton
            label="下へ"
            onClick={() => onMove("down")}
            disabled={position === total - 1}
          >
            ↓
          </IconButton>
          <span className="ml-1">
            <Toggle
              size="sm"
              checked={item.isPublished}
              onChange={onTogglePublished}
            />
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="secondary" size="sm" onClick={onEdit}>
            編集
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            削除
          </Button>
        </div>
      </div>
    </div>
  );
}

function IconButton({
  label,
  children,
  onClick,
  disabled,
}: {
  label: string;
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-7 w-7 items-center justify-center rounded border border-neutral-300 bg-white text-sm text-neutral-700 hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}
