"use client";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store'

export const Header: React.FC = () => {
  const qnum = useSelector((state: RootState) => state.qNumData.qNumber)
  return (
    <header className="text-3xl mb-6">
        Question. {qnum}
    </header>
  );
};
