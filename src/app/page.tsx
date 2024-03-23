"use client";
import Image from 'next/image'
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { initQNum, initAnswerData } from '@/app/reducers/dataReducer';
import { Header } from '@/app/components/Header';


const Home: React.FC = () => {
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const promptRefCor = useRef<HTMLDivElement>(null);
  const [carousel_width, setCWidth] = useState(0);
  const imagesDisplayNum = 3; //md以上の画面サイズで表示させる画像数
  const imagesNum = 8;

  useEffect(() => {
    if (promptRefCor.current) {
      const width = promptRefCor.current.offsetWidth;
      if (width >= 512) {
        setCWidth(imagesNum * 100 / imagesDisplayNum);
      }
      else {
        setCWidth(imagesNum * 100 / 1);
      }
    }
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % imagesNum);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  const handleTransitionEnd = () => {
    if (currentSlide === imagesNum - imagesDisplayNum) {
      setCurrentSlide(0);
    }
  };
  return (
    <main ref={promptRefCor} className="flex min-h-screen flex-col items-center text-center p-8 md:px-52">
      <Header isHome={true} />
      <div className="w-full overflow-x-hidden m-6">
        <div className="flex h-full transition-transform duration-1000 ease-in-out transform" style={{ width: carousel_width+`%`, transform: `translateX(-${currentSlide * (100 / imagesNum)}%)` }} onTransitionEnd={handleTransitionEnd}>
          { Array(8).fill(0).map((_, i) => i).map((url, index) => (
            <div key={index} className="flex flex-row items-center justify-center w-full h-full">
              <Image
                src={`/${url}.png`}
                alt={`Slide ${index + 1}`}
                width={300}
                height={300}
                priority
                objectFit='cover'
              />
            </div>
          ))}
        </div>
      </div>

      {/* <div>
      <h1>日本語の文字列比較</h1>
      <p>
        <label htmlFor="str1">文字列1:</label>
        <input
          type="text"
          id="str1"
          value={str1}
          onChange={(e) => setStr1(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="str2">文字列2:</label>
        <input
          type="text"
          id="str2"
          value={str2}
          onChange={(e) => setStr2(e.target.value)}
        />
      </p>
      <p>一致率: {matchRate}%</p>
    </div> */}

      <div className='flex my-6 text-xg'>
        AIが生成した画像を見て<br/>
        生成に使用されたキーワードを<br/>
        予測しましょう！
      </div>
      <Link href="/SinglePlayPage"
            onClick={()=>{
              dispatch(initQNum());
              dispatch(initAnswerData());
            }}
            className='mt-6 mb-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
      >
        ひとりであそぶ（English）
      </Link>
      <Link href=""
            className='m-3 bg-blue-300 text-white font-bold py-2 px-4 rounded-full'
      >
        ひとりであそぶ（Japanese）
      </Link>
      <Link href=""
            className='m-3 bg-blue-300 text-white font-bold py-2 px-4 rounded-full'
      >
        みんなであそぶ
      </Link>
      <div className='m-6'>
        <Link href="/PrivacyPolicyPage" className='text-gray py-2 px-4'>
          プライバシーポリシー
        </Link>
      </div>
    </main>
  )
};

export default Home;