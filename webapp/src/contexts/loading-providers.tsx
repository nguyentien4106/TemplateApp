import { Loader } from 'lucide-react';
import React, { ReactNode, createContext, useState } from 'react';

type LoadingContext = {
    isLoading: boolean;
    show: (message: string) => void;
    hide: () => void;
};

type LoadingContextProvider = {
    children: ReactNode;
};

export const LoadingContext = createContext<LoadingContext | undefined>(
    undefined
);

export const LoadingProvider: React.FC<LoadingContextProvider> = ({
    children,
}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [LoadingMessage, setLoadingMessage] = useState<string | undefined>();

    const contextValue: LoadingContext = {
        show: (message = "Loading...") => {
            setLoadingMessage(message);
            setIsVisible(true);
        },
        hide: () => {
            setIsVisible(false);
        },
        isLoading: isVisible,
    };

    return (
        <LoadingContext.Provider value={contextValue}>
            <div className=''>

            </div>
            {
                isVisible && (
                    <div className="fixed z-[99999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-white opacity-90 flex flex-col justify-center items-center">
                        <Loader size={64} className='animate-spin' />
                        <span className="mt-2 text-lg font-semibold text-[#2F73A3] font-sans">{LoadingMessage}</span>
                    </div>
                )
            }
            {children}
        </LoadingContext.Provider>
    );
};