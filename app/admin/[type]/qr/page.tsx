"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { useShop } from "@/lib/store";
import type { ShopType } from "@/lib/types";
import { QRView } from "@/components/admin/QRView";

const isValidType = (t: string): t is ShopType =>
  t === "restaurant" || t === "salon";

export default function AdminQRPage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = use(params);
  if (!isValidType(type)) notFound();
  const shop = useShop(type);
  return <QRView publicPath={`/${type}`} shopName={shop.info.nameJa} />;
}
