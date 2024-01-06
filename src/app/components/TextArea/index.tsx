import React, { TextareaHTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = (props) => {
  const dispatch = useDispatch()
  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const answer = event.target.value
    dispatch({ type: 'ANSWER', payload: answer })
  }
  return <textarea onChange={handleTextareaChange} className="border p-2 rounded-md text-black" {...props} />;
};

export default TextArea;
