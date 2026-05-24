import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-1 flex-col bg-neutral-50">
      <header className="px-6 pt-10 pb-6 text-center sm:pt-14 sm:pb-8">
        <p className="text-[11px] tracking-[0.4em] text-neutral-500 uppercase">
          Menu Tool
        </p>
        <h1 className="mt-3 font-serif text-2xl text-neutral-900 sm:text-3xl">
          メニューツール
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          ご覧になりたいお店の種類をお選びください
        </p>
      </header>

      <main className="flex-1 px-4 pb-12 sm:px-6">
        <div className="mx-auto grid w-full max-w-4xl gap-4 sm:gap-6 md:grid-cols-2">
          <ShopCard
            href="/restaurant"
            badge="Restaurant"
            title="飲食店"
            subtitle="店内メニューを見る"
            description="お客様のテーブルでご覧いただくメニューを表示します。"
            accent="warm"
          />
          <ShopCard
            href="/salon"
            badge="Beauty Salon"
            title="美容室"
            subtitle="サービスメニューを見る"
            description="施術メニューと料金を一覧でご案内します。"
            accent="cool"
          />
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-lg border-2 border-dashed border-neutral-300 bg-white/60 p-5 text-center sm:p-6">
          <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">For Sales</p>
          <h3 className="mt-2 font-serif text-lg text-neutral-900">営業提案用 — 業種別デザイン集</h3>
          <p className="mt-1 text-xs text-neutral-600">
            和食 / 洋食 / 中華 / バー / カフェ / スイーツ / 美容 など、29種類のデザインを業種別に用意。ボタン一つで切り替えながらお見せできます。
          </p>
          <Link
            href="/demo"
            className="mt-4 inline-flex h-10 items-center justify-center rounded bg-neutral-900 px-5 text-sm font-medium text-white hover:bg-neutral-700"
          >
            デモ集を開く →
          </Link>
        </div>

        <div className="mx-auto mt-8 max-w-4xl border-t border-neutral-200 pt-6 text-center">
          <p className="text-xs text-neutral-500">店舗オーナーの方</p>
          <Link
            href="/admin/login"
            className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-neutral-900 underline-offset-4 hover:underline"
          >
            管理画面にログイン →
          </Link>
        </div>
      </main>

      <footer className="border-t border-neutral-200 py-4 text-center text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
        Menu Tool — for restaurants and salons
      </footer>
    </div>
  );
}

type ShopCardProps = {
  href: string;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  accent: "warm" | "cool";
};

function ShopCard({
  href,
  badge,
  title,
  subtitle,
  description,
  accent,
}: ShopCardProps) {
  const styles =
    accent === "warm"
      ? {
          card: "border-amber-900/15 hover:border-amber-900/40",
          dot: "bg-amber-800",
          arrow: "text-amber-900",
        }
      : {
          card: "border-neutral-900/10 hover:border-neutral-900/40",
          dot: "bg-neutral-900",
          arrow: "text-neutral-900",
        };
  return (
    <Link
      href={href}
      className={`group flex flex-col rounded-lg border bg-white p-6 shadow-sm transition-colors sm:p-8 ${styles.card}`}
    >
      <div className="flex items-center gap-2">
        <span className={`inline-block h-1.5 w-1.5 rounded-full ${styles.dot}`} />
        <p className="text-[11px] tracking-[0.3em] text-neutral-500 uppercase">
          {badge}
        </p>
      </div>
      <h2 className="mt-4 font-serif text-xl text-neutral-900 sm:text-2xl">
        {title}
      </h2>
      <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
      <p className="mt-4 text-sm leading-relaxed text-neutral-500">{description}</p>
      <p
        className={`mt-6 inline-flex items-center gap-1 text-sm font-medium ${styles.arrow} transition-transform group-hover:translate-x-0.5`}
      >
        メニューを見る →
      </p>
    </Link>
  );
}
