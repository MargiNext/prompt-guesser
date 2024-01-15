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
  const [loading, setLoading] = useState(true);
  const createImageStyle: React.CSSProperties = {
    filter: `blur(10px)`,
  };
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
      <div className='flex flex-row items-start justify-between'>
        <div className='m-3 flex flex-col items-center justify-between'>
          <Image
            src={`data:image/png;base64,${correctImage}`}
            alt="correctImage"
            width={512}
            height={512}
            priority
          />
          <p>正解プロンプト: {correctPrompt}</p>
        </div>
        <div className='m-3 flex flex-col items-center text-center justify-between relative'>
          {loading ? (
            <Link href="/AnswerPage" onClick={handleGenImg}>
              <Image
                src="/image.png"
                alt="A dog"
                width={512}
                height={512}
                priority
                className='filter blur-md ml-auto mr-auto'
              />
              {/* <div className='absolute top-1/2 mx-auto'>あなたのプロンプトで生成</div> */}
            </Link>
          ) : (
            <Image
              src={`data:image/png;base64,${img}`}
              alt="correctImage"
              width={512}
              height={512}
              priority
              onLoad={()=>setLoading(false)}
            />
          )}
          {/* <Link href="/AnswerPage" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'> */}
          <p>あなたのプロンプト: {textData}</p>
        </div>
      </div>
      <div className='m-12'>
        <Link href="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          ホームへ戻る
        </Link>
      </div>
    </main>
  )
}