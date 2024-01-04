import React, { TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = (props) => {
  return <textarea className="border p-2 rounded-md w-1/2 text-black" {...props} />;
};

export default TextArea;
