"use client";
import Link from 'next/link'
interface HeaderProps {
  isHome: boolean;
}

export const Header: React.FC<HeaderProps> = (props) => {
  return (
    (props.isHome? (
      <Link href="/" className='flex m-6 md:m-12 text-4xl font-Tektur'>
        Prompt Guesser
      </Link>
    ) : (
      <Link href="/" className='flex mb-3 md:mt-3 md:mb-6 text-3xl font-Tektur'>
        Prompt Guesser
      </Link>
    ))
  );
};
