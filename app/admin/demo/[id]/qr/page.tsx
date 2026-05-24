"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { getDemo } from "@/data/demos";
import { useDemoShop } from "@/lib/demo-store";
import { QRView } from "@/components/admin/QRView";

export default function DemoQRPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const def = getDemo(id);
  if (!def) notFound();
  const shop = useDemoShop(id);
  if (!shop) return null;

  return <QRView publicPath={`/demo/${id}`} shopName={shop.info.nameJa} />;
}
