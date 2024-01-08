"use client";
import { useRouter } from "next/navigation"
import Image from 'next/image'
import Link from 'next/link'
import TextArea from '../components/TextArea'
import { useSelector } from 'react-redux';
import { RootState } from '../store'

interface AnswerState {
  answer: string;
}

export default function SinglePlay() {
  const textData = useSelector((state: RootState) => state.answer.text)
  console.log('PlayPage:' + textData)
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <Image
        src="/image.png"
        alt="Next.js Logo"
        width={300}
        height={300}
        priority
        className="m-12"
      />
      <p>あなたのプロンプト: {textData}</p>
      <div className="m-12">
        <TextArea 
          placeholder="Enter your prompt"
          rows={3}
          cols={50}
        />
      </div>
      
      <div className="m-12">
        <Link href="/AnswerPage" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          予測する
        </Link>
      </div>
    </main>
  )
}
