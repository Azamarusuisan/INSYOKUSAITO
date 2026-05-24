import type { DemoDefinition } from "@/lib/demo-types";

const pub = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const cafeDemo: DemoDefinition = {
  id: "cafe",
  industry: "cafe",
  industryLabel: "カフェ",
  themeId: "cafe",
  shortDescription: "ベージュ基調のやさしい雰囲気。読みやすさ重視。",
  initial: {
    type: "restaurant",
    info: {
      name: "Cafe Lumière",
      nameJa: "カフェ ルミエール",
      tagline: "光と珈琲の、すこやかな時間",
    },
    categories: [
      {
        id: "coffee",
        name: "コーヒー",
        subName: "Coffee",
        isPublished: true,
        items: pub([
          { id: "drip", name: "本日のドリップ", subName: "Hand Drip", price: 580, description: "シングルオリジンを浅煎りで。", badge: "おすすめ" },
          { id: "latte", name: "カフェラテ", subName: "Cafe Latte", price: 620 },
          { id: "cappuccino", name: "カプチーノ", subName: "Cappuccino", price: 620 },
          { id: "espresso", name: "エスプレッソ", subName: "Espresso", price: 480 },
          { id: "americano", name: "アメリカーノ", subName: "Americano", price: 520 },
        ]),
      },
      {
        id: "tea",
        name: "紅茶・ハーブ",
        subName: "Tea",
        isPublished: true,
        items: pub([
          { id: "darjeeling", name: "ダージリン セカンドフラッシュ", price: 680 },
          { id: "earlgrey", name: "アールグレイ", price: 620 },
          { id: "chamomile", name: "カモミール", price: 600 },
        ]),
      },
      {
        id: "sweets",
        name: "スイーツ",
        subName: "Sweets",
        isPublished: true,
        items: pub([
          { id: "scone", name: "焼きたてスコーン", subName: "クロテッドクリーム添え", price: 580, badge: "人気" },
          { id: "cheesecake", name: "バスクチーズケーキ", price: 680 },
          { id: "gateau", name: "ガトーショコラ", price: 620 },
          { id: "pudding", name: "ほうじ茶プリン", price: 520 },
        ]),
      },
      {
        id: "food",
        name: "フード",
        subName: "Food",
        isPublished: true,
        items: pub([
          { id: "toast", name: "厚切りバタートースト", price: 580 },
          { id: "croque", name: "クロックムッシュ", price: 980 },
          { id: "quiche", name: "本日のキッシュ プレート", price: 1280, badge: "ランチ" },
        ]),
      },
    ],
  },
};
