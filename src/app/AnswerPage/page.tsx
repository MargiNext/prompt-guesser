"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store'
import { useEffect, useState, useRef } from 'react';
import { incrementQNum } from '../reducers/dataReducer';
import { Header } from '@/app/components/Header'

interface GenImg {
  // prompt: string;
  img: string;
}

export default function AnswerPage() {
  const dispatch = useDispatch();
  const textData = useSelector((state: RootState) => state.answerData.answerPrompt)
  const correctPrompt = useSelector((state: RootState) => state.correctData.correctPrompt)
  const correctImage = useSelector((state: RootState) => state.correctData.correctImage)
  const [genImg, setGenImg] = useState<GenImg | null>(null);
  const [loading, setLoading] = useState(true);
  const [preset, setPreset] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const createImageStyle: React.CSSProperties = {
    filter: `blur(10px)`,
  };
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      if (width > 512) {
        containerRef.current.style.height = `512px`;
      }
      else {
        // containerRef.current.style.height = `512px`;
        containerRef.current.style.height = `${width}px`;
      }
    }
  },[]);

  const handleGenImg = () => {
    setPreset(false);
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
        console.log(loading)
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
    <main className="flex min-h-screen flex-col w-full items-center text-center p-12">
    <Header />
      <div className='flex w-full flex-col md:flex-row'>
        <div className='flex w-full flex-col items-center justify-center'>
          <Image
            src={`data:image/png;base64,${correctImage}`}
            alt="correctImage"
            width={512}
            height={512}
            priority
          />
          <p>正解プロンプト: {correctPrompt}</p>
        </div>
        <div className='flex mt-8 md:mt-0 w-full flex-col items-center text-center justify-center'>
          {/* <div className='flex w-512 h-512 justify-center items-center'> */}
          {/* <div className='flex w-full justify-center items-center'> */}
          <div ref={containerRef} className='flex w-full justify-center items-center'>
            {preset && loading && (
              <Link href="/AnswerPage" onClick={handleGenImg} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                あなたのプロンプトで画像生成
              </Link>
            )}
            {!preset && loading && (
              <div className="animate-spin h-14 w-14 bg-blue-300 rounded-xl"></div>
            )}
            {!preset && !loading && (
              <Image
                src={`data:image/png;base64,${img}`}
                alt="correctImage"
                width={512}
                height={512}
                priority
                onLoad={()=>setLoading(false)}
              />
            )}
          </div>
          {/* <Link href="/AnswerPage" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'> */}
          <p>あなたのプロンプト: {textData}</p>
        </div>
      </div>
      <div className='flex flex-col m-12'>
        <Link href="/SinglePlayPage" onClick={() => dispatch(incrementQNum())} className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          次の問題へ
        </Link>
        <Link href="/" className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          ホームへ戻る
        </Link>
      </div>
    </main>
  )
}