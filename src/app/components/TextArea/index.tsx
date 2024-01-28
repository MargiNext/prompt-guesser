import { setAnswerData } from '@/app/reducers/dataReducer';
import React, { TextareaHTMLAttributes } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const dispatch = useDispatch()
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const answer = event.target.value
    dispatch(setAnswerData(answer))
  }
  return <textarea onChange={handleTextareaChange} className="w-full border p-2 rounded-md text-black" {...props} placeholder="Enter your prompt" rows={3} />;
};

export default TextArea;
