"use client";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store'

export const QNumHeader: React.FC = () => {
  const qnum = useSelector((state: RootState) => state.qNumData.qNumber)
  return (
    <header className="text-2xl mb-3 font-Tektur">
        Question. {qnum}
    </header>
  );
};
