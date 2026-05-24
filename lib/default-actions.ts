import type { Industry } from "@/lib/demo-types";
import type { ShopAction } from "@/lib/types";

// 業種に応じた既定の店舗導線。デモ用のダミー値だが、営業時に
// 「うちの店だとここに本物の番号を入れます」と説明できる。
export function defaultActions(industry: Industry): ShopAction[] {
  const phone: ShopAction = { type: "phone", value: "03-0000-0000", label: "電話" };
  const map: ShopAction = {
    type: "map",
    value: "https://maps.google.com/?q=tokyo",
    label: "地図",
  };
  const reserve: ShopAction = {
    type: "reserve",
    value: "https://example.com/reserve",
    label: "予約",
  };
  const line: ShopAction = {
    type: "line",
    value: "https://line.me/R/ti/p/@example",
    label: "LINE",
  };
  const instagram: ShopAction = {
    type: "instagram",
    value: "https://www.instagram.com/",
    label: "Instagram",
  };

  // 業種別の優先順位
  switch (industry) {
    case "salon":
    case "nail":
      // 美容系：予約が最優先
      return [reserve, phone, line];
    case "izakaya":
      // 居酒屋：予約・電話・地図
      return [reserve, phone, map];
    case "cafe":
    case "bakery":
      // カフェ・パン：地図・電話・Instagram
      return [map, phone, instagram];
    case "restaurant":
    case "yakiniku":
    case "sushi":
    case "ramen":
    default:
      // 飲食店全般：予約・電話・地図
      return [reserve, phone, map];
  }
}
