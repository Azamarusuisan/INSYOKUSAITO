import type { DemoDefinition } from "@/lib/demo-types";

const pub = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const italianDemo: DemoDefinition = {
  id: "italian",
  industry: "restaurant",
  industryLabel: "イタリアン",
  themeId: "italian",
  shortDescription: "陽だまりのトラットリア。温かみのある配色とセリフ書体。",
  initial: {
    type: "restaurant",
    info: {
      name: "Trattoria Sole",
      nameJa: "トラットリア・ソーレ",
      tagline: "陽だまりの食卓 — 季節のイタリア料理",
    },
    categories: [
      {
        id: "antipasti",
        name: "前菜",
        subName: "Antipasti",
        isPublished: true,
        items: pub([
          { id: "caprese", name: "水牛モッツァレラのカプレーゼ", subName: "Caprese di Bufala", price: 1480, description: "完熟トマトと水牛モッツァレラ、バジル。", badge: "定番" },
          { id: "prosciutto", name: "生ハムとメロン", subName: "Prosciutto e Melone", price: 1680, description: "パルマ産プロシュート18ヶ月熟成。" },
          { id: "bruschetta", name: "ブルスケッタ三種盛り", subName: "Bruschette Miste", price: 1280 },
          { id: "carpaccio", name: "真鯛のカルパッチョ", subName: "Carpaccio di Orata", price: 1580, description: "瀬戸内産真鯛と柑橘、ケッパー。" },
        ]),
      },
      {
        id: "pasta",
        name: "パスタ",
        subName: "Primi Piatti",
        isPublished: true,
        items: pub([
          { id: "carbonara", name: "ローマ風カルボナーラ", subName: "Carbonara alla Romana", price: 1780, description: "生クリームを使わない本場の味。", badge: "人気" },
          { id: "vongole", name: "ボンゴレ ビアンコ", subName: "Spaghetti alle Vongole", price: 1980, description: "活アサリと白ワイン。" },
          { id: "ragu", name: "牛ほほ肉のラグー", subName: "Tagliatelle al Ragù", price: 2080, description: "8時間煮込みの自家製麺。", badge: "シェフ推薦" },
        ]),
      },
      {
        id: "pizza",
        name: "ピッツァ",
        subName: "Pizza",
        isPublished: true,
        items: pub([
          { id: "margherita", name: "マルゲリータ", subName: "Margherita D.O.P.", price: 1880, description: "サンマルツァーノトマト、水牛モッツァレラ。", badge: "定番" },
          { id: "quattro", name: "クアトロフォルマッジ", subName: "Quattro Formaggi", price: 2280, description: "蜂蜜を添えて。" },
        ]),
      },
      {
        id: "dolce",
        name: "ドルチェ",
        subName: "Dolci",
        isPublished: true,
        items: pub([
          { id: "tiramisu", name: "自家製ティラミス", subName: "Tiramisù", price: 880, badge: "人気" },
          { id: "pannacotta", name: "パンナコッタ ベリーソース", subName: "Panna Cotta", price: 780 },
        ]),
      },
    ],
  },
};
