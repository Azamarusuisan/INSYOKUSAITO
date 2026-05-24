import type { DemoDefinition } from "@/lib/demo-types";

const pub = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const izakayaDemo: DemoDefinition = {
  id: "izakaya",
  industry: "izakaya",
  industryLabel: "居酒屋",
  themeId: "izakaya",
  shortDescription: "黒地に朱の差し色。和の力強さを感じる夜の店。",
  initial: {
    type: "restaurant",
    info: {
      name: "Izakaya Kuroshio",
      nameJa: "居酒屋 黒潮",
      tagline: "今宵の肴、今宵の酒",
    },
    categories: [
      {
        id: "otsumami",
        name: "お通し・小鉢",
        subName: "Otsumami",
        isPublished: true,
        items: pub([
          { id: "edamame", name: "丹波黒枝豆", price: 480, badge: "定番" },
          { id: "hiyayakko", name: "国産大豆の冷奴", price: 580 },
          { id: "asazuke", name: "本日の浅漬け", price: 520 },
          { id: "shiokara", name: "自家製いかの塩辛", price: 680 },
        ]),
      },
      {
        id: "yakitori",
        name: "串焼き",
        subName: "Yakitori",
        isPublished: true,
        items: pub([
          { id: "momo", name: "もも", subName: "塩 / タレ", price: 280, badge: "人気" },
          { id: "tsukune", name: "つくね 月見", price: 380 },
          { id: "kawa", name: "皮 パリパリ焼き", price: 260 },
          { id: "negima", name: "ねぎま", price: 320 },
          { id: "bonjiri", name: "ぼんじり", price: 320 },
        ]),
      },
      {
        id: "sashimi",
        name: "お造り",
        subName: "Sashimi",
        isPublished: true,
        items: pub([
          { id: "moriawase", name: "本日のお造り盛り合わせ", subName: "5種", price: 2480, badge: "おすすめ",
            heroImageUrl: "https://picsum.photos/seed/izakaya-sashimi/1600/900",
            story: "豊洲市場で大将自ら目利きした、その日一番の魚を5種盛り合わせます。\n\n何が入るかは、お楽しみ。季節と漁の状況によって毎日変わります。" },
          { id: "katsuo", name: "戻り鰹の藁焼き", price: 1480 },
          { id: "maguro", name: "本鮪 中とろ", price: 1880 },
        ]),
      },
      {
        id: "sake",
        name: "日本酒",
        subName: "Sake",
        isPublished: true,
        items: pub([
          { id: "junmai", name: "純米 久保田 千寿", subName: "新潟", price: 780 },
          { id: "daiginjo", name: "大吟醸 獺祭 二割三分", subName: "山口", price: 1480, badge: "稀少" },
          { id: "honjozo", name: "八海山 本醸造", subName: "新潟", price: 680 },
          { id: "nigori", name: "にごり酒 月の桂", subName: "京都", price: 820 },
        ]),
      },
    ],
  },
};
