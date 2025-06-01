# Kiji

Next.jsで作ったCMSアプリ（試作）


## 特徴
* Next.jsのApp Router
* ログイン機能
* マイページ機能
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

[登録ページ](http://localhost:3000/auth/register)でユーザー登録をします。

ログイン後、マイページから投稿の追加などができます。

タグやカテゴリーを編集する機能は無いためDBに直接データを追加する必要があります。

prisma studioを使うと、データの追加や編集が簡単にできます。


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
