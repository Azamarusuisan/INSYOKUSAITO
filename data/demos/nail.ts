import type { DemoDefinition } from "@/lib/demo-types";

const pub = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const nailDemo: DemoDefinition = {
  id: "nail",
  industry: "nail",
  industryLabel: "ネイルサロン",
  themeId: "nail",
  shortDescription: "ローズベージュの華やか配色。柔らかな丸み。",
  initial: {
    type: "salon",
    info: {
      name: "Nail Atelier Fleur",
      nameJa: "ネイルアトリエ フルール",
      tagline: "指先から、特別な一日を",
    },
    categories: [
      {
        id: "care",
        name: "ケア",
        subName: "Care",
        isPublished: true,
        items: pub([
          { id: "basic", name: "ベーシックケア", subName: "Basic", price: 3300, description: "甘皮処理・整爪・保湿。" },
          { id: "spa", name: "ハンドスパケア", price: 4400, badge: "人気" },
        ]),
      },
      {
        id: "gel",
        name: "ジェルネイル",
        subName: "Gel",
        isPublished: true,
        items: pub([
          { id: "one-color", name: "ワンカラー", subName: "One Color", price: 6600 },
          { id: "french", name: "フレンチ", subName: "French", price: 7700 },
          { id: "gradation", name: "グラデーション", subName: "Gradation", price: 7700 },
          { id: "art-3", name: "アート 3本まで", price: 8800, badge: "おすすめ" },
          { id: "art-all", name: "アート 10本", price: 12100 },
        ]),
      },
      {
        id: "foot",
        name: "フットネイル",
        subName: "Foot",
        isPublished: true,
        items: pub([
          { id: "foot-care", name: "フットケア", price: 5500 },
          { id: "foot-gel", name: "フットジェル ワンカラー", price: 8800 },
        ]),
      },
      {
        id: "off",
        name: "オフ・その他",
        subName: "Option",
        isPublished: true,
        items: pub([
          { id: "off-own", name: "他店オフ", price: 1100 },
          { id: "repair", name: "リペア（1本）", price: 550 },
        ]),
      },
    ],
  },
};
