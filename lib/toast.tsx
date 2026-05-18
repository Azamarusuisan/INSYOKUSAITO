"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { newId } from "@/lib/utils";

type ToastKind = "success" | "error" | "info";

type Toast = {
  id: string;
  kind: ToastKind;
  message: string;
};

type ToastApi = {
  toasts: Toast[];
  push: (message: string, kind?: ToastKind) => void;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback<ToastApi["push"]>((message, kind = "success") => {
    const id = newId("toast");
    setToasts((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const api = useMemo(() => ({ toasts, push, dismiss }), [toasts, push, dismiss]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

function ToastViewport() {
  const { toasts, dismiss } = useToast();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:top-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={
            "pointer-events-auto w-full max-w-sm rounded-md border px-4 py-3 text-sm shadow-md " +
            (t.kind === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : t.kind === "error"
              ? "border-rose-200 bg-rose-50 text-rose-900"
              : "border-neutral-200 bg-white text-neutral-900")
          }
          role="status"
        >
          <div className="flex items-start gap-3">
            <span className="flex-1">{t.message}</span>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="text-xs text-neutral-500 hover:text-neutral-900"
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
