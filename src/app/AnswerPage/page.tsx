"use client";
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store'
import { useEffect, useState, useRef } from 'react';
import { incrementQNum, initAnswerData } from '../reducers/dataReducer';
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
  const qnum = useSelector((state: RootState) => state.qNumData.qNumber)
  const [genImg, setGenImg] = useState<GenImg | null>(null);
  const [loading, setLoading] = useState(true);
  const [preset, setPreset] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const promptRefAns = useRef<HTMLDivElement>(null);
  const promptRefCor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      if (width > 512) {
        containerRef.current.style.height = `512px`;
        containerRef.current.style.width = `512px`;
      }
      else {
        containerRef.current.style.height = `${width}px`;
      }
    }
    if (promptRefAns.current) {
      const width = promptRefAns.current.offsetWidth;
      if (width >= 512) {
        promptRefAns.current.style.width = `512px`;
        promptRefAns.current.style.height = `64px`;
      }
      else {
        promptRefAns.current.style.height = `32px`;
      }
    }
    if (promptRefCor.current) {
      const width = promptRefCor.current.offsetWidth;
      if (width >= 512) {
        promptRefCor.current.style.width = `512px`;
        promptRefCor.current.style.height = `64px`;
      }
      else {
        promptRefCor.current.style.height = `32px`;
        console.log(width)
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
        <div className='flex w-full flex-col items-center text-center justify-center'>
          <p className='text-xl font-bold'>回答</p>
          <p ref={promptRefAns} className='border-2 border-indigo-500 flex justify-center items-center text-xl w-full rounded-md text-gray-600'>{textData}</p>
          <div ref={containerRef} className='rounded-md flex w-full justify-center items-center bg-gray-200'>
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
                className='rounded-md'
                onLoad={()=>setLoading(false)}
              />
            )}
          </div>
        </div>
        <div className='flex mt-8 md:mt-0 w-full flex-col items-center justify-center'>
          <p className='text-xl font-bold'>正解</p>
          <p ref={promptRefCor} className='border-2 border-indigo-500 flex justify-center items-center text-xl w-full rounded-md bg-gray-100 text-rose-500'>{correctPrompt}</p>
          <Image
            src={`data:image/png;base64,${correctImage}`}
            alt="correctImage"
            width={512}
            height={512}
            priority
            className='rounded-md'
          />
        </div>
      </div>
      <div className='flex flex-col m-12'>
        {qnum < 5 && (
          <Link href="/SinglePlayPage" onClick={()=>{
            dispatch(incrementQNum());
            dispatch(initAnswerData());
          }} className='m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
            次の問題へ
          </Link>
        )}
        <Link href="/" className='m-2 border-2 border-blue-500 hover:bg-blue-700 hover:text-white text-blue-500 font-bold py-2 px-4 rounded-full'>
          ホームへ戻る
        </Link>
      </div>
    </main>
  )
}