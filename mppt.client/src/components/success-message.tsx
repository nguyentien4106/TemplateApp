import React from 'react';
import { MailCheck } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  className?: string; 
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, className }) => {
  return (
    <div className='flex bg-green-700'>
        <MailCheck size={64} color='white'></MailCheck>
        <div className={`text-zinc-100 font-bold p-2 rounded bg-green-700 ${className || ''}`}>
            {message}
        </div>
    </div>
  );
};

export default SuccessMessage;
