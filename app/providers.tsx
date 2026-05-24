"use client";

import { StoreProvider } from "@/lib/store";
import { DemoStoreProvider } from "@/lib/demo-store";
import { AuthProvider } from "@/lib/auth";
import { ToastProvider } from "@/lib/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <DemoStoreProvider>
        <AuthProvider>
          <ToastProvider>{children}</ToastProvider>
        </AuthProvider>
      </DemoStoreProvider>
    </StoreProvider>
  );
}
