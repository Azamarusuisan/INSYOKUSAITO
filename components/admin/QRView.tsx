"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Form";
import { useToast } from "@/lib/toast";

// 外部公開QR APIを利用（依存パッケージ追加なし）
// 推奨: 本番化時は qrcode npm package + サーバー側生成に切替
const qrUrl = (data: string, size = 800) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=20&data=${encodeURIComponent(data)}`;

export function QRView({
  publicPath,
  shopName,
}: {
  publicPath: string;
  shopName: string;
}) {
  const { push } = useToast();
  const [fullUrl, setFullUrl] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setFullUrl(`${window.location.origin}${publicPath}`);
  }, [publicPath]);

  if (!fullUrl) {
    return <div className="text-sm text-neutral-500">QRコードを生成中…</div>;
  }

  const qrSrc = qrUrl(fullUrl);
  const qrSrcLarge = qrUrl(fullUrl, 1200);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      push("URLをクリップボードにコピーしました");
    } catch {
      push("コピーに失敗しました", "error");
    }
  };

  const onDownload = async () => {
    try {
      const res = await fetch(qrSrcLarge);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `qr-${shopName.replace(/\s+/g, "-").toLowerCase()}-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      push("QRコード画像を保存しました");
    } catch {
      push("ダウンロードに失敗しました", "error");
    }
  };

  const onPrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <header className="print:hidden">
        <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
          QR Code
        </p>
        <h1 className="mt-1 font-serif text-2xl text-neutral-900 sm:text-3xl">
          お客様画面のQRコード
        </h1>
        <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
          このQRコードをテーブル等に掲示すると、お客様がスマートフォンでメニュー画面を開けます。
        </p>
      </header>

      <section className="rounded-lg border border-neutral-200 bg-white p-5 sm:p-8">
        <div className="flex flex-col items-center gap-5 print:gap-3">
          <p className="text-center text-[11px] tracking-[0.3em] text-neutral-500 uppercase print:text-[14px]">
            Scan to view menu
          </p>
          <h2 className="text-center font-serif text-xl text-neutral-900 print:text-2xl">
            {shopName}
          </h2>

          {/* QR本体 */}
          <div className="relative inline-block rounded-lg border border-neutral-200 bg-white p-3 sm:p-4 print:border-0 print:p-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrSrc}
              alt={`QRコード ${fullUrl}`}
              className="block h-64 w-64 sm:h-80 sm:w-80 print:h-96 print:w-96"
            />
          </div>

          <p className="break-all text-center text-[11px] text-neutral-500 print:text-[12px]">
            {fullUrl}
          </p>
        </div>
      </section>

      {/* 操作 */}
      <section className="flex flex-wrap gap-2 print:hidden">
        <Button onClick={onCopy} variant="secondary">
          URLをコピー
        </Button>
        <Button onClick={onDownload}>PNG画像をダウンロード</Button>
        <Button onClick={onPrint} variant="secondary">
          印刷する
        </Button>
        <a
          href={fullUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center rounded border border-neutral-300 bg-white px-4 text-sm text-neutral-700 hover:bg-neutral-50 sm:h-10"
        >
          お客様画面を別タブで開く →
        </a>
      </section>

      <section className="rounded-lg border border-dashed border-neutral-300 bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-600 print:hidden">
        <p className="font-medium text-neutral-800">運用のヒント</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>テーブルPOP・卓上スタンドに印刷して掲示</li>
          <li>店頭の窓や看板に貼って、店外でもメニューを見られるように</li>
          <li>SNSのプロフィールリンクとしてもこのURLを設定可能</li>
          <li>このURLを変更するには、デプロイ先のURL設定を見直してください</li>
        </ul>
      </section>

    </div>
  );
}
