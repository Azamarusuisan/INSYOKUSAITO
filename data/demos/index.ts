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

export const DEMOS: DemoDefinition[] = [
  italianDemo,
  izakayaDemo,
  cafeDemo,
  yakinikuDemo,
  sushiDemo,
  ramenDemo,
  salonDemo,
  nailDemo,
  bakeryDemo,
];

export const DEMO_MAP: Record<string, DemoDefinition> = Object.fromEntries(
  DEMOS.map((d) => [d.id, d]),
);

export const getDemo = (id: string): DemoDefinition | undefined => DEMO_MAP[id];
