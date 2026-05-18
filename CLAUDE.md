@AGENTS.md

# メニューツール（menu-app）

飲食店と美容室の **店内メニュー表示ツール**。お客様に見せる画面と、将来の店舗側管理画面を備えるWebアプリ。

## 技術スタック

- Next.js 16.2 (App Router) / React 19 / TypeScript
- Tailwind CSS v4（`@import "tailwindcss"` 形式、`@theme inline` で変数管理）
- データ：当面はTypeScriptファイル内のモック配列。将来Prisma + DB（SQLite/PostgreSQL想定）に差し替え可能な形にしておく
- 認証：UIのみ。本実装は後日（NextAuth.js等を想定）

## ディレクトリ構成

```
menu-app/
├── app/
│   ├── layout.tsx                 ルートレイアウト（日本語フォント・viewport・<Providers>）
│   ├── providers.tsx              StoreProvider / AuthProvider / ToastProvider
│   ├── page.tsx                   お客様トップ（業種選択 + 管理画面リンク）
│   ├── globals.css                ベーススタイル・safe-area ユーティリティ
│   ├── restaurant/                飲食店（イタリアン）お客様画面
│   │   ├── layout.tsx
│   │   └── page.tsx               useShop("restaurant") で公開中のみ表示
│   ├── salon/                     美容室お客様画面
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── admin/
│       ├── login/page.tsx         業種別タブ + デモアカウント入力
│       └── [type]/                ダイナミックセグメント（restaurant | salon）
│           ├── layout.tsx         認証ガード + サイドバー（mobile drawer）
│           ├── page.tsx           ダッシュボード（統計 + クイック操作）
│           ├── menu/page.tsx      カテゴリ・商品 CRUD（並び替え・公開トグル）
│           ├── settings/page.tsx  店舗情報編集
│           └── data/page.tsx      JSON エクスポート / 初期化
├── components/
│   ├── ui/
│   │   ├── Form.tsx               Button / Field / Input / Textarea / Toggle
│   │   └── Modal.tsx              Modal / ConfirmDialog
│   └── admin/
│       ├── CategoryFormModal.tsx
│       └── ItemFormModal.tsx
├── data/                          初期サンプルデータ（モック）
│   ├── restaurant.ts              トラットリア・ソーレ（イタリアン）
│   └── salon.ts                   メゾン・ルミエール
└── lib/
    ├── types.ts                   ShopType / ShopData / MenuCategory / MenuItem 等
    ├── store.tsx                  React Context + localStorage 永続化
    ├── auth.tsx                   AuthContext + sessionStorage（モックアカウント）
    ├── toast.tsx                  ToastContext + Viewport
    └── utils.ts                   formatPrice / newId / cx / slug
```

将来：`app/api/` で REST、`lib/store.tsx` の localStorage を API 呼び出しに差し替え、`lib/auth.tsx` を NextAuth.js に置換。

## ルート

| パス                                | 認証 | 用途                                        |
|-------------------------------------|:---:|---------------------------------------------|
| `/`                                 | -   | お客様トップ（業種選択 + 管理画面ログイン導線） |
| `/restaurant`                       | -   | 飲食店お客様メニュー                        |
| `/salon`                            | -   | 美容室お客様メニュー                        |
| `/admin/login`                      | -   | 管理者ログイン（業種別タブ）                |
| `/admin/[type]`                     | 要  | ダッシュボード                              |
| `/admin/[type]/menu`                | 要  | カテゴリ・商品 CRUD                         |
| `/admin/[type]/settings`            | 要  | 店舗情報編集                                |
| `/admin/[type]/data`                | 要  | JSON エクスポート・初期化                   |

## モックアカウント

| 業種     | 店舗ID         | パスワード |
|----------|----------------|------------|
| 飲食店   | `restaurant`   | `demo`     |
| 美容室   | `salon`        | `demo`     |

業種違いのアカウントでログインしようとすると弾かれます。

## デザイン方針

- **ターゲットは日本人**。和の上品さに寄せ、過剰な装飾や中華風には振らない。
- **業種ごとにトンマナを分ける**：
  - 飲食店（イタリアン）：温かみのあるアイボリー／ボルドー系。セリフ寄り。手書きっぽいアクセント可。
  - 美容室：白／グレー／黒の上品配色。サンセリフ細字、余白広め、細い罫線。
- 日本語見出しに英文サブを添えて「上品さ」を出す（例：本日のおすすめ / Today's Special）。

## 厳守ルール

- **絵文字は使わない**。代わりにSVGアイコン、または「・」「—」「／」等の活字記号で表現する。
- **画像枠にSVGプレースホルダーを置かない**。画像未挿入の枠は、薄いグレー背景に小さく `IMAGE` の活字ラベルを置く程度に留める。装飾的なフォールバックSVGは作らない。
- **モバイル設計は iPhone First**。フォーム要素は font-size 16px（iOSの自動ズーム防止）、ボタンの最小高さは 44px 相当（`h-11`）、`viewport-fit=cover` でノッチ対応、`safe-top` / `safe-bottom` / `safe-x` ユーティリティを必要箇所で使用。
- 認証はモック実装。`lib/auth.tsx` の API を本実装（NextAuth.js）に差し替えるだけで切り替えられるように、ID/パスワード/業種違いのエラーハンドリングまでは本番同等。

## データ構造（モック）

```ts
// lib/types.ts
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
};

export type MenuCategory = {
  id: string;
  name: string;
  subName?: string;
  isPublished: boolean;
  items: MenuItem[];
};

export type ShopData = {
  type: ShopType;
  info: { name: string; nameJa: string; tagline: string };
  categories: MenuCategory[];
};
```

データは `lib/store.tsx` の `StoreProvider` が `localStorage`（キー: `menu-tool:state:v1`）と同期。管理画面で行った編集はリロード後も保持され、お客様画面に即時反映される。

## 開発コマンド

```bash
npm run dev      # 開発サーバー（http://localhost:3000）
npm run build    # 本番ビルド
npm run lint     # ESLint
```

## 将来の拡張ポイント

- 認証：NextAuth.js + DB（店舗アカウント単位）
- 管理画面：店舗オーナーがメニューをCRUD
- マルチテナント：店舗IDでデータを分離
- 画像アップロード：S3/Cloudinary
