"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ShopType } from "@/lib/types";

const SESSION_KEY = "menu-tool:admin-session:v1";

type Account = {
  id: string;
  password: string;
  shopType: ShopType;
  displayName: string;
};

const ACCOUNTS: Account[] = [
  {
    id: "restaurant",
    password: "demo",
    shopType: "restaurant",
    displayName: "トラットリア・ソーレ オーナー",
  },
  {
    id: "salon",
    password: "demo",
    shopType: "salon",
    displayName: "メゾン・ルミエール オーナー",
  },
];

export type AuthUser = {
  id: string;
  shopType: ShopType;
  displayName: string;
};

type AuthApi = {
  user: AuthUser | null;
  ready: boolean;
  signIn: (input: {
    id: string;
    password: string;
    shopType: ShopType;
  }) => { ok: true; user: AuthUser } | { ok: false; reason: string };
  signOut: () => void;
};

const AuthContext = createContext<AuthApi | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AuthUser;
        if (parsed?.id && parsed?.shopType) {
          setUser(parsed);
        }
      }
    } catch {
      // ignore
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      if (user) sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
      else sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }, [user, ready]);

  const signIn = useCallback<AuthApi["signIn"]>(({ id, password, shopType }) => {
    const trimmedId = id.trim();
    if (!trimmedId || !password) {
      return { ok: false, reason: "IDとパスワードを入力してください。" };
    }
    const account = ACCOUNTS.find(
      (a) => a.id === trimmedId && a.password === password,
    );
    if (!account) {
      return { ok: false, reason: "IDまたはパスワードが正しくありません。" };
    }
    if (account.shopType !== shopType) {
      return {
        ok: false,
        reason: "このアカウントは選択した業種ではご利用いただけません。",
      };
    }
    const u: AuthUser = {
      id: account.id,
      shopType: account.shopType,
      displayName: account.displayName,
    };
    setUser(u);
    return { ok: true, user: u };
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const api = useMemo<AuthApi>(() => ({ user, ready, signIn, signOut }), [
    user,
    ready,
    signIn,
    signOut,
  ]);

  return <AuthContext.Provider value={api}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthApi {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export const DEMO_ACCOUNTS = ACCOUNTS.map((a) => ({
  id: a.id,
  password: a.password,
  shopType: a.shopType,
  displayName: a.displayName,
}));
