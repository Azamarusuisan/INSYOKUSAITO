import type { DemoDefinition } from "@/lib/demo-types";

const pub = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const yakinikuDemo: DemoDefinition = {
  id: "yakiniku",
  industry: "yakiniku",
  industryLabel: "焼肉",
  themeId: "yakiniku",
  shortDescription: "黒×金×赤の高級感。インパクト重視のレイアウト。",
  initial: {
    type: "restaurant",
    info: {
      name: "Yakiniku Kogane",
      nameJa: "焼肉 黄金",
      tagline: "厳選A5、炭火で味わう極上の一皿",
    },
    categories: [
      {
        id: "premium",
        name: "特選盛り合わせ",
        subName: "Premium",
        isPublished: true,
        items: pub([
          { id: "tokujo", name: "黄金特上盛り合わせ", subName: "5種・2〜3名様", price: 8800, description: "シャトーブリアン・特上カルビ・ザブトンなど。", badge: "看板" },
          { id: "wagyu-mori", name: "黒毛和牛三種盛り", price: 5800, badge: "人気" },
        ]),
      },
      {
        id: "tan",
        name: "タン",
        subName: "Tongue",
        isPublished: true,
        items: pub([
          { id: "tokujo-tan", name: "特上厚切りタン", price: 2480, badge: "おすすめ" },
          { id: "tan-shio", name: "上タン塩", price: 1880 },
          { id: "negi-tan", name: "ねぎ塩タン", price: 1980 },
        ]),
      },
      {
        id: "karubi",
        name: "カルビ・ロース",
        subName: "Karubi",
        isPublished: true,
        items: pub([
          { id: "tokujo-karubi", name: "黄金特上カルビ", price: 2680, badge: "A5" },
          { id: "zabuton", name: "ザブトン", price: 2480 },
          { id: "harami", name: "上ハラミ", price: 1980 },
          { id: "rosu", name: "特上ロース", price: 2580 },
        ]),
      },
      {
        id: "horumon",
        name: "ホルモン",
        subName: "Horumon",
        isPublished: true,
        items: pub([
          { id: "marucho", name: "丸腸", price: 980 },
          { id: "hatsu", name: "ハツ", price: 880 },
          { id: "mino", name: "ミノサンド", price: 1080 },
        ]),
      },
      {
        id: "shime",
        name: "〆",
        subName: "Finish",
        isPublished: true,
        items: pub([
          { id: "reimen", name: "盛岡冷麺", price: 980, badge: "定番" },
          { id: "bibimbap", name: "石焼ビビンバ", price: 1180 },
          { id: "kuppa", name: "テールクッパ", price: 1280 },
        ]),
      },
    ],
  },
};
