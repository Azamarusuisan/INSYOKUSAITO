"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type {
  MenuCategory,
  MenuItem,
  ShopData,
  StoreInfo,
} from "@/lib/types";
import { DEMOS, getDemo } from "@/data/demos";
import { newId } from "@/lib/utils";

const STORAGE_KEY = "menu-tool:demo-state:v1";

type DemoState = Record<string, ShopData>;

const buildInitialState = (): DemoState => {
  const map: DemoState = {};
  for (const d of DEMOS) map[d.id] = structuredClone(d.initial);
  return map;
};

type DemoStoreApi = {
  state: DemoState;
  ready: boolean;
  getShop: (id: string) => ShopData | undefined;
  updateInfo: (id: string, patch: Partial<StoreInfo>) => void;
  addCategory: (id: string, input: { name: string; subName?: string; isPublished?: boolean }) => void;
  updateCategory: (id: string, catId: string, patch: Partial<Omit<MenuCategory, "id" | "items">>) => void;
  deleteCategory: (id: string, catId: string) => void;
  moveCategory: (id: string, catId: string, dir: "up" | "down") => void;
  toggleCategoryPublished: (id: string, catId: string) => void;
  addItem: (id: string, catId: string, input: Omit<MenuItem, "id">) => void;
  updateItem: (id: string, catId: string, itemId: string, patch: Partial<Omit<MenuItem, "id">>) => void;
  deleteItem: (id: string, catId: string, itemId: string) => void;
  moveItem: (id: string, catId: string, itemId: string, dir: "up" | "down") => void;
  toggleItemPublished: (id: string, catId: string, itemId: string) => void;
  resetShop: (id: string) => void;
};

const Ctx = createContext<DemoStoreApi | null>(null);

const swap = <T,>(arr: T[], i: number, j: number): T[] => {
  if (i < 0 || j < 0 || i >= arr.length || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

export function DemoStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DemoState>(buildInitialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DemoState;
        if (parsed && typeof parsed === "object") {
          setState((prev) => ({ ...prev, ...parsed }));
        }
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, ready]);

  const mutate = useCallback((id: string, fn: (shop: ShopData) => ShopData) => {
    setState((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      return { ...prev, [id]: fn(cur) };
    });
  }, []);

  const api = useMemo<DemoStoreApi>(() => ({
    state,
    ready,
    getShop: (id) => state[id],

    updateInfo: (id, patch) =>
      mutate(id, (s) => ({ ...s, info: { ...s.info, ...patch } })),

    addCategory: (id, input) =>
      mutate(id, (s) => ({
        ...s,
        categories: [
          ...s.categories,
          {
            id: newId("cat"),
            name: input.name,
            subName: input.subName,
            isPublished: input.isPublished ?? true,
            items: [],
          },
        ],
      })),

    updateCategory: (id, catId, patch) =>
      mutate(id, (s) => ({
        ...s,
        categories: s.categories.map((c) => (c.id === catId ? { ...c, ...patch } : c)),
      })),

    deleteCategory: (id, catId) =>
      mutate(id, (s) => ({
        ...s,
        categories: s.categories.filter((c) => c.id !== catId),
      })),

    moveCategory: (id, catId, dir) =>
      mutate(id, (s) => {
        const idx = s.categories.findIndex((c) => c.id === catId);
        if (idx < 0) return s;
        return { ...s, categories: swap(s.categories, idx, dir === "up" ? idx - 1 : idx + 1) };
      }),

    toggleCategoryPublished: (id, catId) =>
      mutate(id, (s) => ({
        ...s,
        categories: s.categories.map((c) =>
          c.id === catId ? { ...c, isPublished: !c.isPublished } : c,
        ),
      })),

    addItem: (id, catId, input) =>
      mutate(id, (s) => ({
        ...s,
        categories: s.categories.map((c) =>
          c.id === catId
            ? { ...c, items: [...c.items, { id: newId("item"), ...input }] }
            : c,
        ),
      })),

    updateItem: (id, catId, itemId, patch) =>
      mutate(id, (s) => ({
        ...s,
        categories: s.categories.map((c) =>
          c.id === catId
            ? {
                ...c,
                items: c.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)),
              }
            : c,
        ),
      })),

    deleteItem: (id, catId, itemId) =>
      mutate(id, (s) => ({
        ...s,
        categories: s.categories.map((c) =>
          c.id === catId ? { ...c, items: c.items.filter((i) => i.id !== itemId) } : c,
        ),
      })),

    moveItem: (id, catId, itemId, dir) =>
      mutate(id, (s) => ({
        ...s,
        categories: s.categories.map((c) => {
          if (c.id !== catId) return c;
          const idx = c.items.findIndex((i) => i.id === itemId);
          if (idx < 0) return c;
          return { ...c, items: swap(c.items, idx, dir === "up" ? idx - 1 : idx + 1) };
        }),
      })),

    toggleItemPublished: (id, catId, itemId) =>
      mutate(id, (s) => ({
        ...s,
        categories: s.categories.map((c) =>
          c.id === catId
            ? {
                ...c,
                items: c.items.map((i) =>
                  i.id === itemId ? { ...i, isPublished: !i.isPublished } : i,
                ),
              }
            : c,
        ),
      })),

    resetShop: (id) => {
      const def = getDemo(id);
      if (!def) return;
      setState((prev) => ({ ...prev, [id]: structuredClone(def.initial) }));
    },
  }), [state, ready, mutate]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useDemoStore(): DemoStoreApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDemoStore must be used inside <DemoStoreProvider>");
  return ctx;
}

export function useDemoShop(id: string): ShopData | undefined {
  const { state } = useDemoStore();
  return state[id];
}
