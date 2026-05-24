import type { DemoDefinition } from "@/lib/demo-types";

const pub = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const salonDemo: DemoDefinition = {
  id: "salon",
  industry: "salon",
  industryLabel: "ヘアサロン",
  themeId: "salon",
  shortDescription: "白黒シックなモード調。細罫線のグリッド。",
  initial: {
    type: "salon",
    info: {
      name: "Maison Lumière",
      nameJa: "メゾン・ルミエール",
      tagline: "あなたらしさを、丁寧に。",
    },
    categories: [
      {
        id: "cut",
        name: "カット",
        subName: "Cut",
        isPublished: true,
        items: pub([
          { id: "cut-women", name: "カット", subName: "Women's Cut", price: 5500, description: "シャンプー・ブロー込み。", badge: "基本" },
          { id: "cut-men", name: "メンズカット", subName: "Men's Cut", price: 4400 },
          { id: "cut-bang", name: "前髪カット", subName: "Bang Trim", price: 1100 },
        ]),
      },
      {
        id: "color",
        name: "カラー",
        subName: "Color",
        isPublished: true,
        items: pub([
          { id: "color-full", name: "フルカラー", subName: "Full Color", price: 8800 },
          { id: "color-retouch", name: "リタッチカラー", subName: "Retouch", price: 6600 },
          { id: "color-highlight", name: "ハイライト", subName: "Highlights", price: 12100, badge: "人気" },
          { id: "color-balayage", name: "バレイヤージュ", subName: "Balayage", price: 16500, badge: "おすすめ" },
        ]),
      },
      {
        id: "perm",
        name: "パーマ",
        subName: "Perm",
        isPublished: true,
        items: pub([
          { id: "perm-regular", name: "パーマ", subName: "Regular Perm", price: 9900 },
          { id: "perm-digital", name: "デジタルパーマ", subName: "Digital Perm", price: 13200 },
          { id: "perm-straight", name: "ストレートパーマ", subName: "Straightening", price: 14300 },
        ]),
      },
      {
        id: "spa",
        name: "ヘッドスパ",
        subName: "Head Spa",
        isPublished: true,
        items: pub([
          { id: "spa-30", name: "ヘッドスパ 30分", price: 3300 },
          { id: "spa-60", name: "ヘッドスパ 60分", price: 6600, badge: "おすすめ" },
        ]),
      },
    ],
  },
};
