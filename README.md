# Kiji

Next.jsで作ったCMSアプリ（試作）

## 特徴

- Next.jsのApp Router
- ログイン機能
- サーバーアクションを使ったデータの取得や追加
- ダークモードあり
- MUI - UIフレームワーク
- Storybook
- Vitest - ユニットテスト
- Playwright - E2Eテスト
- Zod - フォームの検証

## 開発環境構築

1. .env.example ファイルを複製して.envファイルを作成します。

2. ADMIN_USERNAME、ADMIN_EMAIL、ADMIN_PASSWORD、AUTH_SECRETを記入します。

3. パッケージのインストールと、DBを初期化します。

```bash
npm install
```

4. next.jsを起動します。

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開きます。

[ログイン](http://localhost:3000/auth/login)すると、[管理ページ](http://localhost:3000/auth/register)にアクセスできます。
