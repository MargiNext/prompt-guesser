"use client";
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import TextArea from '../components/TextArea'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store'
import { setCorrectData } from '@/app/reducers/dataReducer';

interface QuestionData {
  prompt: string;
  img: string;
}

export default function SinglePlay() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  // const textData = useSelector((state: RootState) => state.answerData.answerPrompt)

  const id = 2;
  const [questionData, setQuestionData] = useState<QuestionData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/question?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setQuestionData(data);
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
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      containerRef.current.style.height = `${width}px`;
    }
    fetchData();
  }, [id]);
  let prompt = '';
  let img = '';
  if (questionData) {
    prompt = questionData.prompt;
    img = questionData.img;
  }
  const handleSetText = () => {
    dispatch(setCorrectData({prompt, img}));
  };
  return (
    <main className="md:flex min-h-screen flex-col items-center text-center p-12">
      {loading ? (
        <div ref={containerRef} className='flex w-full justify-center items-center'>
          <div className="animate-spin h-14 w-14 bg-blue-300 rounded-xl"></div>
        </div>
      ) : (
        <Image
          src={`data:image/png;base64,${img}`}
          alt="correctImage"
          width={512}
          height={512}
          priority
        />
      )}
      {/* <p>あなたのプロンプト: {textData}</p> */}
      <div className="mt-12">
        <TextArea 
          placeholder="Enter your prompt"
          rows={3}
        />
      </div>
      
      <div className="mt-12">
        <Link href="/AnswerPage" onClick={handleSetText} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
          予測する
        </Link>
      </div>
    </main>
    // </Provider>
  )
}
