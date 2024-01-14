"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import { RootState } from '../store'
import { useEffect, useState } from 'react';

interface GenImg {
  // prompt: string;
  img: string;
}

export default function AnswerPage() {
  const textData = useSelector((state: RootState) => state.answerData.answerPrompt)
  const correctPrompt = useSelector((state: RootState) => state.correctData.correctPrompt)
  const correctImage = useSelector((state: RootState) => state.correctData.correctImage)
  const [genImg, setGenImg] = useState<GenImg | null>(null);
  const [loading, setLoading] = useState(false);
  const handleGenImg = () => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/question?id=2`);
        // const response = await fetch(`/api/create_image?prompt=${textData}`);
        if (response.ok) {
          const data = await response.json();
          setGenImg(data)
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };
  // let prompt = '';
  let img = '';
  if (genImg) {
    // prompt = genImg.prompt;
    img = genImg.img;
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src={`data:image/png;base64,${correctImage}`}
        alt="correctImage"
        width={512}
        height={512}
        priority
      />
      <p>正解プロンプト: {correctPrompt}</p>
      <div className='m-12'>
      <Image
        src={`data:image/png;base64,${img}`}
        alt="correctImage"
        width={512}
        height={512}
        priority
      />
        {/* <Link href="/AnswerPage" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'> */}
        <Link href="/AnswerPage" onClick={handleGenImg} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          あなたのプロンプトで画像を生成
          {/* {loading ? 'Loading...' : 'Fetch Image'} */}
        </Link>
      </div>
      <p>あなたのプロンプト: {textData}</p>
      <div className='m-12'>
        <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          ホームへ戻る
        </Link>
      </div>
    </main>
  )
}