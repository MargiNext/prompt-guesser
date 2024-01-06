import { useRouter } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'
import TextArea from '../components/TextArea'
import fetch from 'node-fetch'

export default function AnswerPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/image.png"
        alt="Next.js Logo"
        width={300}
        height={300}
        priority
      />
      <h1>hogehogehoge
      </h1>
      <Link href="/">
        戻る
      </Link>
    </main>
  )
}