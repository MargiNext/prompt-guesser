"use client";
import { useRouter } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'
import TextArea from '../components/TextArea'
import fetch from 'node-fetch'
import { useSelector } from 'react-redux';

interface AnswerState {
  answer: string;
}

export default function AnswerPage() {
  const textData = useSelector((state: AnswerState) => state.answer)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/image.png"
        alt="Next.js Logo"
        width={300}
        height={300}
        priority
      />
       <p>あなたのプロンプト: {textData}</p>
      <Link href="/">
        戻る
      </Link>
    </main>
  )
}