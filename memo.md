<details>
<summary>ディレクトリ構造</summary>

```JAVA
movie-app/
├── client/        # フロントエンド
│   ├── public/    # 静的ファイル
│   └── src/       # ソースコード
│       ├── components/   # Reactコンポーネント
│       ├── pages/        # ページコンポーネント
│       ├── services/     # API通信などのサービス
│       ├── styles/       # スタイルシート
│       └── App.tsx       # メインコンポーネント
├── server/        # バックエンド
│   ├── src/       # ソースコード
│   │   ├── controllers/  # Expressコントローラー
│   │   ├── models/       # データモデル
│   │   ├── routes/       # ルーティング
│   │   ├── services/     # サービス層
│   │   ├── types/        # TypeScriptの型定義
│   │   └── server.ts     # Expressサーバー
│   └── tsconfig.json     # TypeScript設定ファイル
└── database/      # データベース関連
    ├── migrations/       # データベースマイグレーション
    └── seeders/          # データベースシード
```
</details>