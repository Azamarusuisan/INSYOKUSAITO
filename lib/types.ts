export type ShopType = "restaurant" | "salon";

export type MenuItem = {
  id: string;
  name: string;
  subName?: string;
  price: number;
  description?: string;
  imageUrl?: string;
  badge?: string;
  isPublished: boolean;
  // --- 詳細ページ用（任意） ---
  heroImageUrl?: string; // 詳細ページの大きな画像。未設定なら imageUrl をフォールバック
  gallery?: string[]; // 追加写真URL（複数）
  videoUrl?: string; // YouTube/Vimeo の埋め込みURLか、mp4直URL
  story?: string; // 「この料理のこだわり」本文。改行=段落
  storyPoints?: Array<{ title: string; body: string }>; // 箇条書きのこだわり3点など
  links?: SnsLink[]; // 各種SNS・外部リンク
  tags?: string[]; // 任意の絞り込みタグ（人気/おすすめ/ベジタリアン/アルコール 等）
};

export type ShopActionType =
  | "phone"
  | "reserve"
  | "map"
  | "line"
  | "instagram"
  | "web";

export type ShopAction = {
  type: ShopActionType;
  value: string; // 電話番号 / URL / 地図URL など
  label?: string;
};

export const SHOP_ACTION_LABELS: Record<ShopActionType, string> = {
  phone: "電話",
  reserve: "予約",
  map: "地図",
  line: "LINE",
  instagram: "Instagram",
  web: "Webサイト",
};

export type SnsLinkType =
  | "instagram"
  | "note"
  | "x"
  | "youtube"
  | "tiktok"
  | "facebook"
  | "web";

export type SnsLink = {
  type: SnsLinkType;
  url: string;
  label?: string; // 任意。「公式アカウント」「制作秘話の記事」など
};

export const SNS_LABELS: Record<SnsLinkType, string> = {
  instagram: "Instagram",
  note: "note",
  x: "X",
  youtube: "YouTube",
  tiktok: "TikTok",
  facebook: "Facebook",
  web: "Webサイト",
};

export type MenuCategory = {
  id: string;
  name: string;
  subName?: string;
  isPublished: boolean;
  items: MenuItem[];
};

export type StoreInfo = {
  name: string;
  nameJa: string;
  tagline: string;
};

export type ShopData = {
  type: ShopType;
  info: StoreInfo;
  categories: MenuCategory[];
  actions?: ShopAction[]; // 電話・予約・地図・LINE 等の店舗導線
  filterTags?: string[]; // フィルター候補（指定があれば、このリストがチップに並ぶ）
};

export type AppState = {
  restaurant: ShopData;
  salon: ShopData;
};
