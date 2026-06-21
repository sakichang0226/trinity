![Trinity](public/trinity_logo_readable_centered.png)

<p align="center">
  現職の案件のクラス設計・実装の振り返りやPoC検証のためのサンドボックスとしてECサイトを作成<br/>
  本リポジトリは、モール面のフロント部分に該当します。
</p>

### 

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?logo=reactrouter&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/Vitest-4-6E9F18?logo=vitest&logoColor=white" alt="Vitest">
  <img src="https://img.shields.io/badge/coverage-89.84%25-brightgreen" alt="Coverage">
</p>

---

## 技術スタック

| カテゴリ         | 技術                     |
| ---------------- | ------------------------ |
| フレームワーク   | React 19                 |
| 言語             | TypeScript 6             |
| ビルドツール     | Vite 8                   |
| スタイリング     | Tailwind CSS 4           |
| ルーティング     | React Router 7           |
| UIコンポーネント | Headless UI / Heroicons  |
| HTTP             | Axios                    |
| テスト           | Vitest / Testing Library |

## セットアップ

```bash
npm install
npm run dev
```

## テスト

```bash
npm run test                                    # テスト実行
npm run test:coverage                           # カバレッジ付きテスト実行
npm run test:coverage && npm run badge:coverage  # カバレッジバッジ更新
```

## スクリプト

| コマンド | 説明 |
|----------|------|
| `npm run dev` | ローカル開発サーバー起動 |
| `npm run build` | プロダクションビルド |
| `npm run lint` | ESLint実行 |
| `npm run test` | テスト実行 |
| `npm run preview` | ビルド結果プレビュー |

## ディレクトリ構成

```
src/
├── contexts/
├── features/
│   ├── auth/
│   ├── cart/
│   ├── home/
│   ├── order/
│   └── product/
├── layout/
├── services/
├── shared/
└── types/
```

| ディレクトリ | 説明                                    |
| ------------ | --------------------------------------- |
| contexts/    | グローバルステート（Auth, Cart）        |
| features/    | 機能別モジュール                        |
| layout/      | Header, Footer, Layout                  |
| services/    | API通信などビジネスロジックの処理を記載 |
| shared/      | 共通コンポーネント                      |
| types/       | 型定義                                  |
