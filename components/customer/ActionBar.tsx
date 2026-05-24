"use client";

import type { ShopAction } from "@/lib/types";
import { SHOP_ACTION_LABELS } from "@/lib/types";
import type { Theme } from "@/lib/themes";

// 営業導線：電話/予約/地図/LINE/Instagram/Web をモバイル下部に固定
// 業種を問わず、店舗の「次の行動」を1タップで取れるようにする。
export function ActionBar({ actions, theme }: { actions: ShopAction[]; theme: Theme }) {
  if (actions.length === 0) return null;

  const barBg = theme.bgImage ? "bg-black/70 backdrop-blur-md" : `${theme.pageBg}/95 backdrop-blur`;

  return (
    <div className={`fixed inset-x-0 bottom-0 z-30 border-t border-current/15 safe-x safe-bottom ${barBg}`}>
      <div className="mx-auto flex max-w-5xl items-stretch gap-1.5 px-2 py-2 sm:gap-2 sm:px-4 sm:py-2.5">
        {actions.map((a, i) => (
          <ActionButton key={i} action={a} primary={i === 0} />
        ))}
      </div>
    </div>
  );
}

function ActionButton({ action, primary }: { action: ShopAction; primary: boolean }) {
  const label = action.label ?? SHOP_ACTION_LABELS[action.type];
  const href = hrefForAction(action);
  const isExternal = !href.startsWith("tel:");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={`group flex h-12 flex-1 items-center justify-center gap-1.5 rounded-md text-[12px] font-medium tracking-wider active:scale-[0.97] sm:h-11 sm:text-[13px] ${
        primary
          ? "bg-current text-white"
          : "border border-current/40 opacity-90 hover:opacity-100"
      }`}
    >
      <ActionIcon type={action.type} />
      <span className={primary ? "mix-blend-difference" : ""}>{label}</span>
    </a>
  );
}

function hrefForAction(a: ShopAction): string {
  switch (a.type) {
    case "phone":
      return `tel:${a.value.replace(/[^0-9+]/g, "")}`;
    default:
      return a.value;
  }
}

function ActionIcon({ type }: { type: ShopAction["type"] }) {
  // 絵文字禁止のためテキストアイコン（記号のみ）
  const m: Record<ShopAction["type"], string> = {
    phone: "TEL",
    reserve: "RSV",
    map: "MAP",
    line: "LN",
    instagram: "IG",
    web: "WEB",
  };
  return (
    <span className="text-[9px] tracking-[0.15em] opacity-70" aria-hidden>
      {m[type]}
    </span>
  );
}
