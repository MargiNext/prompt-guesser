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
  const textData = useSelector((state: RootState) => state.answerData.answerPrompt)
  const correctPrompt = useSelector((state: RootState) => state.correctData.correctPrompt)
  const correctImage = useSelector((state: RootState) => state.correctData.correctImage)
  return (
    // <Provider store={store}>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <Image
        src={`data:image/png;base64,${correctImage}`}
        alt="correctImage"
        width={300}
        height={300}
        priority
      />
      {/* <img src={`data:image/png;base64,${correctImage}`} alt="correctImage"></img> */}
       {/* <p>正解画像: {correctImage}</p> */}
       <p>正解プロンプト: {correctPrompt}</p>
       <p>あなたのプロンプト: {textData}</p>
      <Link href="/">
        戻る
      </Link>
    </main>
    // </Provider>
  )
}