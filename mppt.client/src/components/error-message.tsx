import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string; 
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <div className={`text-red-600 font-bold p-2 rounded bg-red-200 ${className || ''}`}>
      {message}
    </div>
  );
};

export default ErrorMessage;
