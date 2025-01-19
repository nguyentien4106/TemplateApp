/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7mayXWyeEWv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Input } from "./ui/input";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface UploadProps {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function Upload({ files, setFiles }: UploadProps) {
    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFiles(Array(10).fill(event.target.files[0]))
        }
    };

    const removeFile = (index: number) => {
        setFiles(prev => prev.filter((_, idx) => idx !== index))
    }

    return (
        <div className="grid gap-4 container">
            <div>
                <p className="text-gray-500 dark:text-gray-400">Drag and drop files or click to select.</p>
            </div>
            <div className="grid gap-2 max-w-full">
                <div className="flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 p-12 transition-colors hover:border-gray-400 dark:border-gray-700 dark:hover:border-gray-600 focus-within:outline-2 focus-within:outline-dashed focus-within:outline-gray-500 dark:focus-within:outline-gray-400">
                    <div className="text-center">
                        <UploadIcon className="mx-auto h-8 w-8 text-gray-400" />
                        <div className="mt-4 font-medium text-gray-900 dark:text-gray-50">Drop files to upload</div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">or click to select files</p>
                        <Input type="file" multiple className="" onChange={handleUpload} />
                    </div>

                </div>
                {files.map((file, index) => (
                    <div key={index}>
                        <div className="overflow-auto rounded-md">
                            <img
                                src={URL.createObjectURL(file)}
                                className="aspect-[3/4] object-cover"
                                width={80}
                                height={120}
                            />
                        </div>
                    </div>
                ))}
                <ScrollArea className=" whitespace-nowrap rounded-md border">
                    <div className="flex max-w-16 space-x-4 p-4">
                        {files.map((file, index) => (
                            <div key={index}>
                                <div className="overflow-hidden rounded-md">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        className="aspect-[3/4] h-fit w-fit object-cover"
                                        width={80}
                                        height={120}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div>
    )
}

function UploadIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" x2="12" y1="3" y2="15" />
        </svg>
    )
}

function XIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
        </svg>
    )
}