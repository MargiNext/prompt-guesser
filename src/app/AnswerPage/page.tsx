"use client";
import { useRouter } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'
import TextArea from '../components/TextArea'
import fetch from 'node-fetch'
import { useSelector } from 'react-redux';
import { RootState } from '../store'
// import { Provider } from 'react-redux'
// import { store } from '../store'

interface AnswerState {
  answer: string;
}

export default function AnswerPage() {
  const textData = useSelector((state: RootState) => state.answer.text)
  console.log('AnswerPage:' + textData)
  return (
    // <Provider store={store}>
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
    // </Provider>
  )
}