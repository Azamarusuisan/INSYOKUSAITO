import type { DemoDefinition } from "@/lib/demo-types";

const pub = <T extends { id: string }>(arr: T[]) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const bakeryDemo: DemoDefinition = {
  id: "bakery",
  industry: "bakery",
  industryLabel: "ベーカリー",
  themeId: "bakery",
  shortDescription: "クリーム色の柔らかな配色。商品名がすっと読める。",
  initial: {
    type: "restaurant",
    info: {
      name: "Shop V",
      nameJa: "店舗 V",
      tagline: "毎朝の、ちいさな贅沢",
    },
    categories: [
      {
        id: "hard",
        name: "ハード系",
        subName: "Hard",
        isPublished: true,
        items: pub([
          { id: "baguette", name: "バゲット", subName: "Baguette", price: 380, badge: "毎日" },
          { id: "campagne", name: "カンパーニュ ハーフ", price: 580 },
          { id: "lye", name: "プレッツェル", price: 320 },
        ]),
      },
      {
        id: "soft",
        name: "ソフト系",
        subName: "Soft",
        isPublished: true,
        items: pub([
          { id: "shokupan", name: "湯種食パン 1.5斤", price: 880, badge: "人気" },
          { id: "milk", name: "ミルクフランス", price: 280 },
          { id: "anpan", name: "十勝あんぱん", price: 240 },
        ]),
      },
      {
        id: "viennoiserie",
        name: "ヴィエノワズリー",
        subName: "Viennoiserie",
        isPublished: true,
        items: pub([
          { id: "croissant", name: "クロワッサン", subName: "Croissant", price: 320, badge: "看板",
            heroImageUrl: "https://picsum.photos/seed/bakery-croissant/1600/900",
            story: "フランス産の発酵バター「イズニー」をたっぷり折り込んだ、贅沢なクロワッサン。\n\n生地は3日間かけて低温で発酵させ、薄い層を何枚も重ねます。焼き上がりはサクッと崩れて、内側はバターの香りでしっとり。",
            storyPoints: [
              { title: "イズニーバター", body: "ノルマンディー原産の発酵バターを贅沢に使用。" },
              { title: "3日間の発酵", body: "低温長時間発酵で、深い旨味を引き出します。" },
              { title: "27層の生地", body: "手作業で折り込み、サクサクの食感を実現。" },
            ] },
          { id: "pain-choco", name: "パン オ ショコラ", price: 360 },
          { id: "kouign", name: "クイニーアマン", price: 380 },
        ]),
      },
      {
        id: "savory",
        name: "総菜パン",
        subName: "Savory",
        isPublished: true,
        items: pub([
          { id: "curry", name: "焼きカレーパン", price: 320 },
          { id: "ham", name: "ハムチーズ", price: 360 },
          { id: "sausage", name: "粗挽きソーセージ", price: 380 },
        ]),
      },
    ],
  },
};
