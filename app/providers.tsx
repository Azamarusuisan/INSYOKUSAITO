"use client";

import { StoreProvider } from "@/lib/store";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/lib/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </StoreProvider>
  );
}
