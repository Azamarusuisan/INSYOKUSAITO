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
  AppState,
  MenuCategory,
  MenuItem,
  ShopData,
  ShopType,
  StoreInfo,
} from "@/lib/types";
import { initialRestaurant } from "@/data/restaurant";
import { initialSalon } from "@/data/salon";
import { newId } from "@/lib/utils";

const STORAGE_KEY = "menu-tool:state:v1";

const buildInitialState = (): AppState => ({
  restaurant: structuredClone(initialRestaurant),
  salon: structuredClone(initialSalon),
});

type StoreApi = {
  state: AppState;
  ready: boolean;
  getShop: (type: ShopType) => ShopData;
  updateInfo: (type: ShopType, patch: Partial<StoreInfo>) => void;
  addCategory: (
    type: ShopType,
    input: { name: string; subName?: string; isPublished?: boolean },
  ) => MenuCategory;
  updateCategory: (
    type: ShopType,
    categoryId: string,
    patch: Partial<Omit<MenuCategory, "id" | "items">>,
  ) => void;
  deleteCategory: (type: ShopType, categoryId: string) => void;
  moveCategory: (type: ShopType, categoryId: string, dir: "up" | "down") => void;
  toggleCategoryPublished: (type: ShopType, categoryId: string) => void;
  addItem: (
    type: ShopType,
    categoryId: string,
    input: Omit<MenuItem, "id">,
  ) => MenuItem;
  updateItem: (
    type: ShopType,
    categoryId: string,
    itemId: string,
    patch: Partial<Omit<MenuItem, "id">>,
  ) => void;
  deleteItem: (type: ShopType, categoryId: string, itemId: string) => void;
  moveItem: (
    type: ShopType,
    categoryId: string,
    itemId: string,
    dir: "up" | "down",
  ) => void;
  toggleItemPublished: (type: ShopType, categoryId: string, itemId: string) => void;
  resetShop: (type: ShopType) => void;
  resetAll: () => void;
  exportShop: (type: ShopType) => string;
};

const StoreContext = createContext<StoreApi | null>(null);

const swap = <T,>(arr: T[], i: number, j: number): T[] => {
  if (i < 0 || j < 0 || i >= arr.length || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(buildInitialState);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AppState;
        if (parsed?.restaurant && parsed?.salon) {
          setState(parsed);
        }
      }
    } catch {
      // ignore corrupted state
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore quota errors
    }
  }, [state, ready]);

  const mutate = useCallback(
    (type: ShopType, fn: (shop: ShopData) => ShopData) => {
      setState((prev) => ({ ...prev, [type]: fn(prev[type]) }));
    },
    [],
  );

  const api = useMemo<StoreApi>(() => {
    return {
      state,
      ready,
      getShop: (type) => state[type],

      updateInfo: (type, patch) =>
        mutate(type, (shop) => ({ ...shop, info: { ...shop.info, ...patch } })),

      addCategory: (type, input) => {
        const cat: MenuCategory = {
          id: newId("cat"),
          name: input.name,
          subName: input.subName,
          isPublished: input.isPublished ?? true,
          items: [],
        };
        mutate(type, (shop) => ({ ...shop, categories: [...shop.categories, cat] }));
        return cat;
      },

      updateCategory: (type, categoryId, patch) =>
        mutate(type, (shop) => ({
          ...shop,
          categories: shop.categories.map((c) =>
            c.id === categoryId ? { ...c, ...patch } : c,
          ),
        })),

      deleteCategory: (type, categoryId) =>
        mutate(type, (shop) => ({
          ...shop,
          categories: shop.categories.filter((c) => c.id !== categoryId),
        })),

      moveCategory: (type, categoryId, dir) =>
        mutate(type, (shop) => {
          const idx = shop.categories.findIndex((c) => c.id === categoryId);
          if (idx < 0) return shop;
          const next = swap(shop.categories, idx, dir === "up" ? idx - 1 : idx + 1);
          return { ...shop, categories: next };
        }),

      toggleCategoryPublished: (type, categoryId) =>
        mutate(type, (shop) => ({
          ...shop,
          categories: shop.categories.map((c) =>
            c.id === categoryId ? { ...c, isPublished: !c.isPublished } : c,
          ),
        })),

      addItem: (type, categoryId, input) => {
        const item: MenuItem = { id: newId("item"), ...input };
        mutate(type, (shop) => ({
          ...shop,
          categories: shop.categories.map((c) =>
            c.id === categoryId ? { ...c, items: [...c.items, item] } : c,
          ),
        }));
        return item;
      },

      updateItem: (type, categoryId, itemId, patch) =>
        mutate(type, (shop) => ({
          ...shop,
          categories: shop.categories.map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  items: c.items.map((i) => (i.id === itemId ? { ...i, ...patch } : i)),
                }
              : c,
          ),
        })),

      deleteItem: (type, categoryId, itemId) =>
        mutate(type, (shop) => ({
          ...shop,
          categories: shop.categories.map((c) =>
            c.id === categoryId
              ? { ...c, items: c.items.filter((i) => i.id !== itemId) }
              : c,
          ),
        })),

      moveItem: (type, categoryId, itemId, dir) =>
        mutate(type, (shop) => ({
          ...shop,
          categories: shop.categories.map((c) => {
            if (c.id !== categoryId) return c;
            const idx = c.items.findIndex((i) => i.id === itemId);
            if (idx < 0) return c;
            const next = swap(c.items, idx, dir === "up" ? idx - 1 : idx + 1);
            return { ...c, items: next };
          }),
        })),

      toggleItemPublished: (type, categoryId, itemId) =>
        mutate(type, (shop) => ({
          ...shop,
          categories: shop.categories.map((c) =>
            c.id === categoryId
              ? {
                  ...c,
                  items: c.items.map((i) =>
                    i.id === itemId ? { ...i, isPublished: !i.isPublished } : i,
                  ),
                }
              : c,
          ),
        })),

      resetShop: (type) =>
        setState((prev) => ({
          ...prev,
          [type]: structuredClone(
            type === "restaurant" ? initialRestaurant : initialSalon,
          ),
        })),

      resetAll: () => setState(buildInitialState()),

      exportShop: (type) => JSON.stringify(state[type], null, 2),
    };
  }, [state, ready, mutate]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreApi {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

export function useShop(type: ShopType): ShopData {
  const { state } = useStore();
  return state[type];
}
