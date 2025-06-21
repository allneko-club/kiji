# Kiji

Next.jsで作ったCMSアプリ（試作）

## 特徴

- Next.jsのApp Router
- ログイン機能
- サーバーアクションを使ったデータの取得や追加
- ダークモードあり
- Prisma - ORM
- MUI - UIフレームワーク
- Storybook
- Vitest - ユニットテスト
- Playwright - E2Eテスト
- husky & lint-staged - コミット前にリントを実行
- Zod - フォームの検証

## 開発環境構築

1. .env.example ファイルを複製して.envファイルを作成します。

2. ADMIN_USERNAME、ADMIN_EMAIL、ADMIN_PASSWORDを記入します。

3. パッケージのインストールと、DBを初期化します。

```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
```

4. next.jsを起動します。

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

[ログイン](http://localhost:3000/auth/login)すると、[管理ページ](http://localhost:3000/auth/register)にアクセスできます。
