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
          {
            id: "carbonara",
            name: "ローマ風カルボナーラ",
            subName: "Carbonara alla Romana",
            price: 1780,
            description: "生クリームを使わない本場の味。",
            badge: "人気",
            heroImageUrl: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=1600",
            story:
              "ローマの下町で食べた、一杯のカルボナーラ。シェフがそこで学んだ「卵・チーズ・豚の塩漬け・黒胡椒、たった四つの材料だけで完成させる」という哲学を、そのままお皿の上にうつしました。\n\n生クリームは一切使いません。卵黄とペコリーノ・ロマーノを湯煎で温めながら、グアンチャーレの脂を少しずつ落として、パスタの余熱だけで濃厚なソースに仕上げます。\n\n一口目はチーズの塩気、二口目で胡椒の香り、最後にグアンチャーレの旨味が広がります。ぜひ熱いうちに、一気にお召し上がりください。",
            storyPoints: [
              { title: "ローマ直伝の製法", body: "現地で修業したシェフが、伝統そのままの手順で仕上げます。" },
              { title: "国産卵黄を贅沢に", body: "卵黄は1皿あたり2個。とろみと黄金色はここから生まれます。" },
              { title: "グアンチャーレ", body: "豚頬肉の塩漬けをじっくり低温で。脂の香りが決め手です。" },
            ],
            gallery: [
              "https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=800",
              "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800",
              "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800",
            ],
            links: [
              { type: "instagram", url: "https://www.instagram.com/", label: "公式アカウント" },
              { type: "note", url: "https://note.com/", label: "シェフ修業記" },
              { type: "youtube", url: "https://www.youtube.com/", label: "調理の様子" },
            ],
          },
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
          {
            id: "margherita",
            name: "マルゲリータ",
            subName: "Margherita D.O.P.",
            price: 1880,
            description: "サンマルツァーノトマト、水牛モッツァレラ。",
            badge: "定番",
            heroImageUrl: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=1600",
            story:
              "ナポリの伝統を守る、最もシンプルなピッツァ。だからこそ、素材ひとつひとつに妥協はしません。\n\nトマトはイタリア・カンパーニア州のサンマルツァーノD.O.P.のみ。モッツァレラは水牛乳100%のブッファラ。バジルは契約農家から朝採りで届きます。\n\n薪窯で約450℃。90秒で焼き上げる、その一瞬の閃光が縁を香ばしく、中はもっちりとした生地に仕立てます。",
            storyPoints: [
              { title: "サンマルツァーノD.O.P.", body: "イタリア政府認証のトマトだけを使用。" },
              { title: "薪窯450℃", body: "高温短時間で、生地の水分を逃さず焼き上げます。" },
              { title: "朝採りバジル", body: "焼く直前にのせる、香りの主役。" },
            ],
          },
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
