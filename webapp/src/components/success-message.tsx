import React from 'react';
import { Circle, CircleCheck, MailCheck } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
  className?: string; 
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message, className }) => {
  return (
    <div className='flex bg-green-700 gap-2'>
        <CircleCheck size={64} color='white' />
        <div className={`text-zinc-100 font-bold p-2 rounded bg-green-700 content-center ${className || ''}`}>
            {message}
        </div>
    </div>
  );
};

export default SuccessMessage;
