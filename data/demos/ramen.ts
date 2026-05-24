import type { DemoDefinition } from "@/lib/demo-types";

const pub = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const ramenDemo: DemoDefinition = {
  id: "ramen",
  industry: "ramen",
  industryLabel: "ラーメン",
  themeId: "ramen",
  shortDescription: "黄×赤×黒の活気ある配色。太字・タブロイド風。",
  initial: {
    type: "restaurant",
    info: {
      name: "Menya Hibari",
      nameJa: "麺屋 ひばり",
      tagline: "煮干と鶏白湯、毎日炊きたて",
    },
    categories: [
      {
        id: "ramen",
        name: "ラーメン",
        subName: "Ramen",
        isPublished: true,
        items: pub([
          { id: "tori-paitan", name: "鶏白湯 醤油", price: 950, description: "国産丸鶏8時間炊き、低温調理チャーシュー2枚。", badge: "看板",
            heroImageUrl: "https://picsum.photos/seed/ramen-toripaitan/1600/900",
            story: "国産の丸鶏を、骨ごと8時間炊き込みます。\n途中で何度も灰汁を取り、最後にミキサーにかけて、白濁したクリーミーなスープに。\n\n醤油ダレは三種の醤油をブレンド。低温調理のチャーシューは、噛んだ瞬間に肉の繊維が解けます。" },
          { id: "niboshi", name: "煮干し中華そば", price: 880, badge: "人気" },
          { id: "shoyu", name: "あっさり醤油そば", price: 850 },
          { id: "tantan", name: "汁なし担々麺", price: 980 },
        ]),
      },
      {
        id: "topping",
        name: "トッピング",
        subName: "Topping",
        isPublished: true,
        items: pub([
          { id: "ajitama", name: "味玉", price: 130 },
          { id: "chashu", name: "炙りチャーシュー", price: 350 },
          { id: "menma", name: "極太メンマ", price: 200 },
          { id: "negi", name: "白髪ねぎ", price: 180 },
          { id: "nori", name: "焼海苔3枚", price: 150 },
        ]),
      },
      {
        id: "side",
        name: "サイドメニュー",
        subName: "Side",
        isPublished: true,
        items: pub([
          { id: "gyoza", name: "焼き餃子 6個", price: 480, badge: "定番" },
          { id: "karaage", name: "鶏の唐揚げ", price: 580 },
          { id: "chahan", name: "半チャーハン", price: 380 },
          { id: "rice", name: "ライス", price: 180 },
        ]),
      },
    ],
  },
};
