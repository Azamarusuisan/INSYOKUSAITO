// 各デモ画面のトンマナ定義。Tailwind クラスをそのまま埋め込む方式で
// 動的クラス名生成（v4のパージ対象外）を避ける。

export type ThemeId =
  | "italian"
  | "izakaya"
  | "cafe"
  | "yakiniku"
  | "sushi"
  | "ramen"
  | "salon"
  | "nail"
  | "bakery";

export type LayoutVariant = "card" | "list" | "grid-tight" | "rail";

export type Theme = {
  id: ThemeId;
  // ページ全体
  pageBg: string;
  pageText: string;
  // ヘッダー
  headerBg: string;
  headerText: string;
  headerAccent: string; // 飾り罫線・小見出し用
  // カテゴリ見出し
  catHeading: string; // h2
  catSub: string;
  catRule: string; // 罫線色（border-...）
  // 商品カード
  cardWrap: string; // 1商品分の枠
  cardName: string;
  cardSub: string;
  cardDesc: string;
  cardPrice: string;
  cardBadge: string;
  cardImagePh: string; // 画像未挿入のプレースホルダー
  // セクション間隔・グリッド
  sectionGap: string;
  grid: string;
  // フッター注記
  footerNote: string;
  // 全体フォント（layout で適用）
  fontFamily: string; // serif/sans 切替
  layout: LayoutVariant;
};

export const THEMES: Record<ThemeId, Theme> = {
  italian: {
    id: "italian",
    pageBg: "bg-[#f7f1e6]",
    pageText: "text-stone-900",
    headerBg: "bg-[#f7f1e6]",
    headerText: "text-stone-900",
    headerAccent: "text-amber-900/80",
    catHeading: "font-serif text-2xl text-stone-900 sm:text-3xl",
    catSub: "text-[11px] tracking-[0.3em] text-amber-900/70 uppercase",
    catRule: "border-amber-900/25",
    cardWrap:
      "flex gap-3 rounded-md border border-amber-900/10 bg-white p-3 shadow-[0_1px_0_rgba(120,80,30,0.04)] sm:gap-4 sm:p-4",
    cardName: "font-serif text-sm text-stone-900 sm:text-base",
    cardSub: "text-[10px] tracking-wider text-amber-900/70 sm:text-[11px]",
    cardDesc: "text-[11px] leading-relaxed text-stone-600 sm:text-xs",
    cardPrice: "font-serif text-sm text-stone-900 sm:text-base",
    cardBadge:
      "rounded-full border border-amber-900/30 px-2 py-0.5 text-[10px] tracking-wider text-amber-900",
    cardImagePh:
      "bg-stone-100 text-[10px] tracking-[0.2em] text-stone-400",
    sectionGap: "space-y-12 sm:space-y-16",
    grid: "grid gap-4 sm:grid-cols-2 sm:gap-5",
    footerNote: "text-stone-500",
    fontFamily: "font-serif",
    layout: "card",
  },
  izakaya: {
    id: "izakaya",
    pageBg: "bg-[#0f0f10]",
    pageText: "text-stone-100",
    headerBg: "bg-[#0f0f10]",
    headerText: "text-stone-100",
    headerAccent: "text-red-400/80",
    catHeading:
      "font-serif text-2xl tracking-widest text-stone-100 sm:text-3xl",
    catSub: "text-[11px] tracking-[0.4em] text-red-400/80",
    catRule: "border-stone-700",
    cardWrap:
      "flex gap-3 border-b border-stone-800 bg-transparent px-1 py-3 sm:gap-4 sm:py-4",
    cardName: "text-sm text-stone-100 sm:text-base",
    cardSub: "text-[10px] tracking-wider text-stone-400 sm:text-[11px]",
    cardDesc: "text-[11px] leading-relaxed text-stone-400 sm:text-xs",
    cardPrice: "font-serif text-sm text-red-300 sm:text-base",
    cardBadge:
      "border border-red-400/60 px-2 py-0.5 text-[10px] tracking-wider text-red-300",
    cardImagePh: "bg-stone-800 text-[10px] tracking-[0.2em] text-stone-600",
    sectionGap: "space-y-10 sm:space-y-14",
    grid: "grid gap-0 sm:grid-cols-2 sm:gap-x-8",
    footerNote: "text-stone-500",
    fontFamily: "font-serif",
    layout: "list",
  },
  cafe: {
    id: "cafe",
    pageBg: "bg-[#faf6ef]",
    pageText: "text-stone-800",
    headerBg: "bg-[#faf6ef]",
    headerText: "text-stone-800",
    headerAccent: "text-amber-800/70",
    catHeading:
      "font-serif text-xl italic text-stone-800 sm:text-2xl",
    catSub: "text-[10px] tracking-[0.3em] text-amber-800/70 uppercase",
    catRule: "border-stone-300",
    cardWrap:
      "flex gap-3 rounded-2xl border border-stone-200 bg-white p-3 sm:gap-4 sm:p-4",
    cardName: "text-sm text-stone-900 sm:text-base",
    cardSub: "text-[10px] tracking-wider text-amber-800/70 sm:text-[11px]",
    cardDesc: "text-[11px] leading-relaxed text-stone-500 sm:text-xs",
    cardPrice: "font-serif italic text-sm text-stone-900 sm:text-base",
    cardBadge:
      "rounded-full bg-amber-50 px-2 py-0.5 text-[10px] tracking-wider text-amber-800",
    cardImagePh: "bg-stone-100 text-[10px] tracking-[0.2em] text-stone-400",
    sectionGap: "space-y-10 sm:space-y-14",
    grid: "grid gap-3 sm:grid-cols-2 sm:gap-4",
    footerNote: "text-stone-500",
    fontFamily: "font-serif",
    layout: "card",
  },
  yakiniku: {
    id: "yakiniku",
    pageBg: "bg-[#111111]",
    pageText: "text-amber-50",
    headerBg: "bg-[#111111]",
    headerText: "text-amber-50",
    headerAccent: "text-amber-400",
    catHeading:
      "text-2xl font-bold tracking-wider text-amber-50 sm:text-3xl",
    catSub: "text-[11px] tracking-[0.4em] text-amber-400 uppercase",
    catRule: "border-amber-900/40",
    cardWrap:
      "flex gap-3 rounded border border-amber-900/30 bg-stone-900 p-3 sm:gap-4 sm:p-4",
    cardName: "text-sm font-semibold text-amber-50 sm:text-base",
    cardSub: "text-[10px] tracking-wider text-amber-200/70 sm:text-[11px]",
    cardDesc: "text-[11px] leading-relaxed text-stone-400 sm:text-xs",
    cardPrice: "text-sm font-bold text-amber-300 sm:text-base",
    cardBadge:
      "rounded-sm bg-red-700 px-2 py-0.5 text-[10px] font-medium tracking-wider text-amber-50",
    cardImagePh: "bg-stone-800 text-[10px] tracking-[0.2em] text-stone-600",
    sectionGap: "space-y-10 sm:space-y-14",
    grid: "grid gap-3 sm:grid-cols-2 sm:gap-4",
    footerNote: "text-stone-500",
    fontFamily: "font-sans",
    layout: "card",
  },
  sushi: {
    id: "sushi",
    pageBg: "bg-[#fbfaf6]",
    pageText: "text-slate-900",
    headerBg: "bg-[#fbfaf6]",
    headerText: "text-slate-900",
    headerAccent: "text-slate-500",
    catHeading:
      "font-serif text-2xl tracking-wider text-slate-900 sm:text-3xl",
    catSub: "text-[11px] tracking-[0.4em] text-slate-500 uppercase",
    catRule: "border-slate-300",
    cardWrap:
      "flex items-baseline justify-between gap-3 border-b border-dotted border-slate-300 px-1 py-3 sm:gap-6 sm:py-4",
    cardName: "font-serif text-sm text-slate-900 sm:text-base",
    cardSub: "text-[10px] tracking-wider text-slate-500 sm:text-[11px]",
    cardDesc: "text-[11px] leading-relaxed text-slate-500 sm:text-xs",
    cardPrice: "font-serif text-sm tabular-nums text-slate-900 sm:text-base",
    cardBadge:
      "border border-slate-400 px-2 py-0.5 text-[10px] tracking-wider text-slate-700",
    cardImagePh: "bg-slate-100 text-[10px] tracking-[0.2em] text-slate-400",
    sectionGap: "space-y-12 sm:space-y-16",
    grid: "grid gap-0 sm:grid-cols-2 sm:gap-x-10",
    footerNote: "text-slate-500",
    fontFamily: "font-serif",
    layout: "list",
  },
  ramen: {
    id: "ramen",
    pageBg: "bg-[#fff9eb]",
    pageText: "text-stone-900",
    headerBg: "bg-[#fff9eb]",
    headerText: "text-stone-900",
    headerAccent: "text-red-700",
    catHeading:
      "text-2xl font-extrabold tracking-wider text-stone-900 sm:text-3xl",
    catSub: "text-[11px] font-bold tracking-[0.3em] text-red-700",
    catRule: "border-red-800/40",
    cardWrap:
      "flex gap-3 rounded border-2 border-stone-900 bg-white p-3 sm:gap-4 sm:p-4",
    cardName: "text-base font-bold text-stone-900 sm:text-lg",
    cardSub: "text-[10px] tracking-wider text-red-700 sm:text-[11px]",
    cardDesc: "text-[11px] leading-relaxed text-stone-600 sm:text-xs",
    cardPrice:
      "text-base font-extrabold tabular-nums text-red-700 sm:text-lg",
    cardBadge:
      "rounded-sm bg-stone-900 px-2 py-0.5 text-[10px] font-bold tracking-wider text-amber-200",
    cardImagePh: "bg-stone-100 text-[10px] tracking-[0.2em] text-stone-400",
    sectionGap: "space-y-10 sm:space-y-12",
    grid: "grid gap-3 sm:grid-cols-2 sm:gap-4",
    footerNote: "text-stone-500",
    fontFamily: "font-sans",
    layout: "card",
  },
  salon: {
    id: "salon",
    pageBg: "bg-white",
    pageText: "text-neutral-900",
    headerBg: "bg-white",
    headerText: "text-neutral-900",
    headerAccent: "text-neutral-500",
    catHeading:
      "font-serif text-xl font-light tracking-wider text-neutral-900 sm:text-2xl",
    catSub: "text-[10px] tracking-[0.4em] text-neutral-500 uppercase",
    catRule: "border-neutral-200",
    cardWrap: "flex gap-4 bg-white p-4 sm:gap-5 sm:p-5",
    cardName: "font-serif text-sm font-normal tracking-wide text-neutral-900 sm:text-base",
    cardSub: "text-[10px] tracking-[0.25em] text-neutral-500 uppercase",
    cardDesc: "text-[11px] leading-relaxed text-neutral-600 sm:text-xs",
    cardPrice: "text-sm font-light tracking-wider text-neutral-900 sm:text-base",
    cardBadge:
      "border border-neutral-900 px-2 py-0.5 text-[10px] tracking-widest text-neutral-900",
    cardImagePh: "bg-neutral-100 text-[10px] tracking-[0.25em] text-neutral-400",
    sectionGap: "space-y-12 sm:space-y-16",
    grid: "grid gap-px border border-neutral-200 bg-neutral-200 sm:grid-cols-2",
    footerNote: "text-neutral-500",
    fontFamily: "font-serif",
    layout: "grid-tight",
  },
  nail: {
    id: "nail",
    pageBg: "bg-[#fdf4f3]",
    pageText: "text-stone-800",
    headerBg: "bg-[#fdf4f3]",
    headerText: "text-stone-800",
    headerAccent: "text-rose-400",
    catHeading:
      "font-serif text-xl text-stone-800 sm:text-2xl",
    catSub: "text-[10px] tracking-[0.4em] text-rose-400 uppercase",
    catRule: "border-rose-200",
    cardWrap:
      "flex gap-3 rounded-2xl border border-rose-100 bg-white p-3 sm:gap-4 sm:p-4",
    cardName: "font-serif text-sm text-stone-900 sm:text-base",
    cardSub: "text-[10px] tracking-[0.25em] text-rose-400 uppercase",
    cardDesc: "text-[11px] leading-relaxed text-stone-500 sm:text-xs",
    cardPrice: "font-serif text-sm text-stone-900 sm:text-base",
    cardBadge:
      "rounded-full bg-rose-100 px-2 py-0.5 text-[10px] tracking-wider text-rose-600",
    cardImagePh: "bg-rose-50 text-[10px] tracking-[0.2em] text-rose-300",
    sectionGap: "space-y-10 sm:space-y-14",
    grid: "grid gap-3 sm:grid-cols-2 sm:gap-4",
    footerNote: "text-stone-500",
    fontFamily: "font-serif",
    layout: "card",
  },
  bakery: {
    id: "bakery",
    pageBg: "bg-[#fbf6ee]",
    pageText: "text-amber-950",
    headerBg: "bg-[#fbf6ee]",
    headerText: "text-amber-950",
    headerAccent: "text-amber-700",
    catHeading:
      "font-serif text-2xl text-amber-950 sm:text-3xl",
    catSub: "text-[10px] tracking-[0.3em] text-amber-700 uppercase",
    catRule: "border-amber-200",
    cardWrap:
      "flex gap-3 rounded-md border border-amber-200 bg-white p-3 sm:gap-4 sm:p-4",
    cardName: "font-serif text-sm text-amber-950 sm:text-base",
    cardSub: "text-[10px] tracking-wider text-amber-700 sm:text-[11px]",
    cardDesc: "text-[11px] leading-relaxed text-stone-600 sm:text-xs",
    cardPrice: "font-serif text-sm text-amber-950 sm:text-base",
    cardBadge:
      "rounded-sm bg-amber-100 px-2 py-0.5 text-[10px] tracking-wider text-amber-800",
    cardImagePh: "bg-amber-50 text-[10px] tracking-[0.2em] text-amber-300",
    sectionGap: "space-y-10 sm:space-y-14",
    grid: "grid gap-3 sm:grid-cols-2 sm:gap-4",
    footerNote: "text-stone-500",
    fontFamily: "font-serif",
    layout: "card",
  },
};
