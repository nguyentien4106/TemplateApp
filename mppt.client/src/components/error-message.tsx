import { CircleX } from "lucide-react";
import React from "react";

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  return (
    <div className="flex bg-red-200 gap-2">
      <CircleX size={64} color="red"></CircleX>
      <div
        className={`text-red-600 font-bold p-2 rounded bg-red-200 content-center ${
          className || ""
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ErrorMessage;
