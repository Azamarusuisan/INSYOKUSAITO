import type { DemoDefinition } from "@/lib/demo-types";
import { italianDemo } from "./italian";
import { izakayaDemo } from "./izakaya";
import { cafeDemo } from "./cafe";
import { yakinikuDemo } from "./yakiniku";
import { sushiDemo } from "./sushi";
import { ramenDemo } from "./ramen";
import { salonDemo } from "./salon";
import { nailDemo } from "./nail";
import { bakeryDemo } from "./bakery";
import {
  teishokuDemo,
  wagashiDemo,
  sobaDemo,
  kaisekiDemo,
  teppanyakiDemo,
  frenchDemo,
  chineseDemo,
  taishuDemo,
  okonomiyakiDemo,
  udonDemo,
  wineBarDemo,
  craftBeerDemo,
  cocktailBarDemo,
  patisserieDemo,
  gelatoDemo,
  burgerDemo,
  modernCafeDemo,
  teahouseDemo,
  eyelashDemo,
  barberDemo,
} from "./more";

export const DEMOS: DemoDefinition[] = [
  // 飲食店（和）
  italianDemo,
  sushiDemo,
  izakayaDemo,
  ramenDemo,
  teishokuDemo,
  sobaDemo,
  udonDemo,
  okonomiyakiDemo,
  taishuDemo,
  kaisekiDemo,
  // 飲食店（焼物）
  yakinikuDemo,
  teppanyakiDemo,
  // 飲食店（洋・中）
  frenchDemo,
  chineseDemo,
  burgerDemo,
  // バー系
  wineBarDemo,
  craftBeerDemo,
  cocktailBarDemo,
  // カフェ・スイーツ
  cafeDemo,
  modernCafeDemo,
  teahouseDemo,
  bakeryDemo,
  wagashiDemo,
  patisserieDemo,
  gelatoDemo,
  // 美容
  salonDemo,
  nailDemo,
  eyelashDemo,
  barberDemo,
];

export const DEMO_MAP: Record<string, DemoDefinition> = Object.fromEntries(
  DEMOS.map((d) => [d.id, d]),
);

export const getDemo = (id: string): DemoDefinition | undefined => DEMO_MAP[id];
