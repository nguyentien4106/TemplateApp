import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { PropsWithChildren } from "react"

interface DialogPanelProps extends PropsWithChildren
{
    title: string
    onOk: () => void
}

export function DeleteDialogPanel({ children, title, onOk }: DialogPanelProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {<i className="cursor-pointer">{title}</i>}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. Are you sure to delete this product ?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction color="red" className="bg-red-700" onClick={onOk}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
