# API の仕様

## API

- /api/question
    - 問題生成
- /api/create_image
    - 画像生成

## 環境変数

API を動かすために必要な環境変数

- AWS_ACCESS_KEY_ID
    - AWS リソースにアクセスするための ACCESS KEY ID
- AWS_SECRET_ACCESS_KEY
    - AWS リソースにアクセスするための SECRET ACCESS KEY
- STABILITY_API_KEY
    - STABILITY API に接続するための KEY
- NEXT_PUBLIC_GA_ID
    - Google Analytics 用の ID
- QUESTION_MIN_VALUE
    - 問題生成時に利用する問題番号の最小値
- QUESTION_MAX_VALUE
    - 問題生成時に利用する問題番号の最大値

## ローカルでのテスト方法

ex. question  

```
curl -G -d id=1 http://localhost:3000/api/question
```

ex. create_image   

```
curl -G -d prompt=house http://localhost:3000/api/create_image
```
