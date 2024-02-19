"use client";
import { Header } from '@/app/components/Header'

export default function PrivacyPolicyPage() {
  return (
    <main className="flex min-h-screen flex-col w-full items-center text-center py-8 px-8 md:px-72">
      <Header isHome={false} />
      <div className='text-2xl m-5'>
        プライバシーポリシー
      </div>
      <div className='text-xl m-5'>
      広告について
      </div>

      <div className='mb-5'>
        当ブログでは、第三者配信の広告サービス（Googleアドセンス、A8.net）を利用しており、ユーザーの興味に応じた商品やサービスの広告を表示するため、クッキー（Cookie）を使用しております。
        クッキーを使用することで当サイトはお客様のコンピュータを識別できるようになりますが、お客様個人を特定できるものではありません。

        Cookieを無効にする方法やGoogleアドセンスに関する詳細は「広告 – ポリシーと規約 – Google」をご確認ください。
      </div>

      <div className='text-xl m-5'>
        アクセス解析ツールについて
      </div>

      <div className='mb-5'>
        当ブログでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにクッキー（Cookie）を使用しております。トラフィックデータは匿名で収集されており、個人を特定するものではありません。
      </div>
    </main>
  )
}