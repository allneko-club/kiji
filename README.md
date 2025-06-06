# Kiji

Next.jsで作ったCMSアプリ（試作）


## 特徴
* Next.jsのApp Router
* ログイン機能
* サーバーアクションを使ったデータの取得や追加
* ダークモードあり
* Prisma - ORM
* MUI - UIフレームワーク
* Storybook
* Vitest - ユニットテスト
* Playwright - E2Eテスト
* husky & lint-staged - コミット前にリントを実行
* Zod - フォームの検証

## 開発環境構築

環境構築
```bash
npm install
npx prisma migrate dev --name init
npx prisma db seed
```

next.jsを起動
```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

[ユーザー登録](http://localhost:3000/auth/register)をし、[ログイン](http://localhost:3000/auth/login)します。

ログイン後、[管理ページ](http://localhost:3000/auth/register)でデータの管理ができます。


## スクリプト
```bash
# ユニットテスト
npm run test

# E2Eテスト
npm run e2e

# Storybookを起動
npm run storybook

# prisma studioを起動
npm run prisma-web
```
