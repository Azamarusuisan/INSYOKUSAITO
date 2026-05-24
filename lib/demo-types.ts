import type { ShopData } from "@/lib/types";
import type { ThemeId } from "@/lib/themes";

export type Industry =
  | "restaurant"
  | "izakaya"
  | "cafe"
  | "yakiniku"
  | "sushi"
  | "ramen"
  | "salon"
  | "nail"
  | "bakery";

export type DemoMeta = {
  id: string;
  industry: Industry;
  industryLabel: string; // 「イタリアン」など
  themeId: ThemeId;
  shortDescription: string;
};

export type DemoDefinition = DemoMeta & {
  initial: ShopData;
};
