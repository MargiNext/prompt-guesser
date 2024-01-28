"use client";
import Image from 'next/image'
import Link from 'next/link';
import { use } from 'react';
import { useDispatch } from 'react-redux';
import { initQNum } from '@/app/reducers/dataReducer';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <main className="flex min-h-screen flex-col items-center text-center p-8">
      <div className='flex m-6 md:m-12 text-4xl font-Tektur'>
        Prompt Guesser
      </div>
      <Image
        src="/image.png"
        alt="Next.js Logo"
        width={300}
        height={300}
        priority
        className='m-6'
      />
      <div className='flex my-6 text-xg'>
        AIが生成した画像を見て<br/>
        生成に使用されたキーワードを<br/>
        予測しましょう！
      </div>
      <div className='m-6'>
        <Link href="/SinglePlayPage" onClick={()=>dispatch(initQNum())} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          ひとりであそぶ
        </Link>
      </div>
    </main>
  )
};

export default Home;