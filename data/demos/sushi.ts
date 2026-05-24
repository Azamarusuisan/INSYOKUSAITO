import type { DemoDefinition } from "@/lib/demo-types";

const pub = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const sushiDemo: DemoDefinition = {
  id: "sushi",
  industry: "sushi",
  industryLabel: "寿司",
  themeId: "sushi",
  shortDescription: "白と紺の凛とした和モダン。お品書きに近い列レイアウト。",
  initial: {
    type: "restaurant",
    info: {
      name: "Shop B",
      nameJa: "店舗 B",
      tagline: "旬の魚と、握りたての一貫を",
    },
    categories: [
      {
        id: "omakase",
        name: "おまかせ",
        subName: "Omakase",
        isPublished: true,
        items: pub([
          { id: "mizuki", name: "おまかせ みづき", subName: "握り12貫・椀物・玉子", price: 8800, badge: "おすすめ",
            heroImageUrl: "https://picsum.photos/seed/sushi-omakase/1600/900",
            story: "豊洲市場でその日に揚がった旬の魚を中心に、大将がその場で握り上げます。\n\n白身から始まり、光物、貝、最後に大とろ。一貫一貫、温度・酢加減・醤油の量まで調整した、お客様だけのお寿司です。" },
          { id: "tsuki", name: "おまかせ 月", subName: "握り10貫・椀物", price: 5500 },
          { id: "yuki", name: "おまかせ 雪", subName: "握り8貫", price: 3850 },
        ]),
      },
      {
        id: "nigiri",
        name: "握り（一貫）",
        subName: "Nigiri",
        isPublished: true,
        items: pub([
          { id: "otoro", name: "大とろ", price: 680, badge: "本日入荷" },
          { id: "chutoro", name: "中とろ", price: 520 },
          { id: "akami", name: "赤身 漬け", price: 380 },
          { id: "uni", name: "うに 軍艦", price: 720 },
          { id: "ikura", name: "いくら 軍艦", price: 480 },
          { id: "kohada", name: "小肌", price: 320 },
          { id: "anago", name: "煮穴子", price: 480 },
          { id: "tamago", name: "玉子", price: 280 },
        ]),
      },
      {
        id: "tsumami",
        name: "つまみ",
        subName: "Tsumami",
        isPublished: true,
        items: pub([
          { id: "sashimi-mori", name: "本日のお造り三種", price: 2200 },
          { id: "yakimono", name: "本日の焼き物", price: 1800 },
          { id: "wan", name: "椀物", price: 880 },
        ]),
      },
      {
        id: "drink",
        name: "お飲み物",
        subName: "Drink",
        isPublished: true,
        items: pub([
          { id: "junmai-daiginjo", name: "純米大吟醸 飛露喜", subName: "福島", price: 1480, badge: "稀少" },
          { id: "beer", name: "生ビール", price: 680 },
          { id: "agari", name: "あがり", price: 0, description: "お替り無料" },
        ]),
      },
    ],
  },
};
