import type { ShopData } from "@/lib/types";

const items = (arr: Array<Omit<import("@/lib/types").MenuItem, "isPublished">>) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const initialRestaurant: ShopData = {
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
      items: items([
        {
          id: "caprese",
          name: "水牛モッツァレラのカプレーゼ",
          subName: "Caprese di Bufala",
          price: 1480,
          description: "完熟トマトと水牛モッツァレラ、バジル、エクストラバージンオリーブオイル。",
          badge: "定番",
        },
        {
          id: "prosciutto",
          name: "生ハムとメロン",
          subName: "Prosciutto e Melone",
          price: 1680,
          description: "パルマ産プロシュート18ヶ月熟成と完熟メロンの組み合わせ。",
        },
        {
          id: "bruschetta",
          name: "自家製ブルスケッタ三種盛り",
          subName: "Bruschette Miste",
          price: 1280,
          description: "トマト、きのこ、本日のリエットを焼きたてカンパーニュに。",
        },
        {
          id: "carpaccio",
          name: "真鯛のカルパッチョ",
          subName: "Carpaccio di Orata",
          price: 1580,
          description: "瀬戸内産真鯛と柑橘、ケッパー、ピンクペッパー。",
        },
      ]),
    },
    {
      id: "pasta",
      name: "パスタ",
      subName: "Primi Piatti",
      isPublished: true,
      items: items([
        {
          id: "carbonara",
          name: "ローマ風カルボナーラ",
          subName: "Carbonara alla Romana",
          price: 1780,
          description: "グアンチャーレと卵黄、ペコリーノロマーノ。生クリームを使わない本場の味。",
          badge: "人気",
        },
        {
          id: "peperoncino",
          name: "ペペロンチーノ",
          subName: "Aglio Olio e Peperoncino",
          price: 1380,
          description: "国産にんにくと赤唐辛子のシンプルなオイルパスタ。",
        },
        {
          id: "vongole",
          name: "ボンゴレ ビアンコ",
          subName: "Spaghetti alle Vongole",
          price: 1980,
          description: "活アサリと白ワイン、フレッシュパセリ。",
        },
        {
          id: "ragu",
          name: "牛ほほ肉のラグー タリアテッレ",
          subName: "Tagliatelle al Ragù",
          price: 2080,
          description: "8時間煮込んだ牛ほほ肉と自家製平打ち麺。",
          badge: "シェフ推薦",
        },
      ]),
    },
    {
      id: "pizza",
      name: "ピッツァ",
      subName: "Pizza",
      isPublished: true,
      items: items([
        {
          id: "margherita",
          name: "マルゲリータ",
          subName: "Margherita D.O.P.",
          price: 1880,
          description: "サンマルツァーノトマト、水牛モッツァレラ、バジル。",
          badge: "定番",
        },
        {
          id: "quattro",
          name: "クアトロフォルマッジ",
          subName: "Quattro Formaggi",
          price: 2280,
          description: "モッツァレラ、ゴルゴンゾーラ、タレッジョ、パルミジャーノ。蜂蜜を添えて。",
        },
        {
          id: "marinara",
          name: "マリナーラ",
          subName: "Marinara",
          price: 1580,
          description: "トマト、にんにく、オレガノ、オリーブオイル。チーズを使わない伝統の一枚。",
        },
      ]),
    },
    {
      id: "secondi",
      name: "メイン",
      subName: "Secondi Piatti",
      isPublished: true,
      items: items([
        {
          id: "cotoletta",
          name: "ミラノ風カツレツ",
          subName: "Cotoletta alla Milanese",
          price: 2680,
          description: "仔牛肉に粗挽きパン粉をまとわせ、澄ましバターでこんがりと。",
        },
        {
          id: "pollo",
          name: "鶏もも肉のディアボラ風",
          subName: "Pollo alla Diavola",
          price: 2280,
          description: "炭火で香ばしく焼いた鶏もも肉、レモンと黒胡椒。",
        },
        {
          id: "branzino",
          name: "本日の鮮魚のアクアパッツァ",
          subName: "Branzino all'Acqua Pazza",
          price: 2980,
          description: "丸ごと一尾とトマト、オリーブ、ケッパーで。2名様より。",
        },
      ]),
    },
    {
      id: "dolce",
      name: "ドルチェ",
      subName: "Dolci",
      isPublished: true,
      items: items([
        {
          id: "tiramisu",
          name: "自家製ティラミス",
          subName: "Tiramisù della Casa",
          price: 880,
          description: "マスカルポーネとエスプレッソ、ココアパウダー。",
          badge: "人気",
        },
        {
          id: "pannacotta",
          name: "パンナコッタ ベリーソース",
          subName: "Panna Cotta ai Frutti di Bosco",
          price: 780,
          description: "なめらかなパンナコッタに季節のベリーソースを。",
        },
        {
          id: "gelato",
          name: "本日のジェラート三種盛り",
          subName: "Gelati Misti",
          price: 880,
        },
      ]),
    },
    {
      id: "bevande",
      name: "ドリンク",
      subName: "Bevande",
      isPublished: true,
      items: items([
        {
          id: "house-red",
          name: "ハウスワイン 赤（グラス）",
          subName: "Vino della Casa Rosso",
          price: 680,
        },
        {
          id: "house-white",
          name: "ハウスワイン 白（グラス）",
          subName: "Vino della Casa Bianco",
          price: 680,
        },
        {
          id: "espresso",
          name: "エスプレッソ",
          subName: "Espresso",
          price: 480,
        },
        {
          id: "cappuccino",
          name: "カプチーノ",
          subName: "Cappuccino",
          price: 580,
        },
      ]),
    },
  ],
};
