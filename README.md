# cinema_log
日記のように映画の感想を記録するアプリ

現在、従来の映画レコメンドシステムでは人気作品や他人の過去視聴作品に偏りがちで、新しいジャンルの発見が難しいという課題があります。そこで、映画のレビューから新規性のある推薦モデルを作成するという研究に取り組んでいます。その推薦モデルを利用する際に、映画の感想を記録できるアプリがあると便利だと考え、CinemaLogを作成しました。

## はじめに
1. このリポジトリをクローンします。
   ```bash
   git clone https://github.com/HwaI12/cinema_log.git
   ```
2. supabaseにてプロジェクトを作成し、作成したプロジェクトのURLとANONキーを.envファイルに設定します。

3. プロジェクトを開始します。
    ```bash
    npm run dev
    ```
    ブラウザで [http://localhost:3000](http://localhost:3000) を開いて確認してください。

## 実際の画面
会員登録する画面です。
![](https://github.com/user-attachments/assets/8a7adecf-3030-4a4a-9c21-8bf6b603a8d4)

ログインする画面です。
![](https://github.com/user-attachments/assets/3f6aebaa-5600-4879-9c8b-1555e51c7d78)

記録した映画のレビューが表示されます。
![](https://github.com/user-attachments/assets/1e8afdc7-03ba-4c78-b6a0-c0e00d2e8440)

映画のレビューを記録します。
![](https://github.com/user-attachments/assets/fb363e07-c53f-43d2-b5b3-c09ecb2189d2)