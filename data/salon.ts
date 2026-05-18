import type { ShopData } from "@/lib/types";

const items = (arr: Array<Omit<import("@/lib/types").MenuItem, "isPublished">>) =>
  arr.map((it) => ({ ...it, isPublished: true }));

export const initialSalon: ShopData = {
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
      items: items([
        {
          id: "cut-women",
          name: "カット",
          subName: "Women's Cut",
          price: 5500,
          description: "シャンプー・ブロー込み。骨格と毛流れを見極めた丁寧な施術。",
          badge: "基本",
        },
        {
          id: "cut-men",
          name: "メンズカット",
          subName: "Men's Cut",
          price: 4400,
          description: "シャンプー・ブロー込み。",
        },
        {
          id: "cut-bang",
          name: "前髪カット",
          subName: "Bang Trim",
          price: 1100,
          description: "他メニューと併用の場合は無料。",
        },
      ]),
    },
    {
      id: "color",
      name: "カラー",
      subName: "Color",
      isPublished: true,
      items: items([
        {
          id: "color-full",
          name: "フルカラー",
          subName: "Full Color",
          price: 8800,
          description: "髪全体を均一に染め上げる、定番のカラーリング。",
        },
        {
          id: "color-retouch",
          name: "リタッチカラー",
          subName: "Retouch",
          price: 6600,
          description: "根元の伸びた部分のみを染めるメンテナンスメニュー。",
        },
        {
          id: "color-highlight",
          name: "ハイライト",
          subName: "Highlights",
          price: 12100,
          description: "細かい束で立体感と動きを演出。フルカラーとの併用がおすすめ。",
          badge: "人気",
        },
        {
          id: "color-balayage",
          name: "バレイヤージュ",
          subName: "Balayage",
          price: 16500,
          description: "手描きで自然なグラデーションを描く、上質なカラーリング。",
          badge: "おすすめ",
        },
      ]),
    },
    {
      id: "perm",
      name: "パーマ",
      subName: "Perm",
      isPublished: true,
      items: items([
        {
          id: "perm-regular",
          name: "パーマ",
          subName: "Regular Perm",
          price: 9900,
          description: "ダメージを抑えた薬剤で柔らかなウェーブを。",
        },
        {
          id: "perm-digital",
          name: "デジタルパーマ",
          subName: "Digital Perm",
          price: 13200,
          description: "毛先まで弾むカール感が長持ち。乾かすだけでスタイルが決まります。",
        },
        {
          id: "perm-straight",
          name: "ストレートパーマ",
          subName: "Straightening",
          price: 14300,
          description: "うねりやくせを抑え、自然なまとまりへ。",
        },
      ]),
    },
    {
      id: "treatment",
      name: "トリートメント",
      subName: "Treatment",
      isPublished: true,
      items: items([
        {
          id: "treat-basic",
          name: "ベーシックトリートメント",
          subName: "Basic Treatment",
          price: 2200,
          description: "毛髪内部の水分と油分を整える日常ケア。",
        },
        {
          id: "treat-premium",
          name: "プレミアムトリートメント",
          subName: "Premium Treatment",
          price: 5500,
          description: "サロン専売のミネラル成分を浸透させる集中補修コース。",
          badge: "人気",
        },
        {
          id: "treat-keratin",
          name: "ケラチントリートメント",
          subName: "Keratin Treatment",
          price: 8800,
          description: "髪の主成分ケラチンを補い、芯から潤いとツヤを取り戻す。",
        },
      ]),
    },
    {
      id: "spa",
      name: "ヘッドスパ",
      subName: "Head Spa",
      isPublished: true,
      items: items([
        {
          id: "spa-30",
          name: "ヘッドスパ 30分",
          subName: "Head Spa 30 min",
          price: 3300,
          description: "頭皮の血行を促進し、コリをほぐすリラックスメニュー。",
        },
        {
          id: "spa-60",
          name: "ヘッドスパ 60分",
          subName: "Head Spa 60 min",
          price: 6600,
          description: "クレンジングから本格マッサージまで、贅沢な至福の時間。",
          badge: "おすすめ",
        },
      ]),
    },
  ],
};
