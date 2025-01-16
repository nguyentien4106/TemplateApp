import { Trash, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator"
import { DeleteDialogPanel } from "@/components/delete-dialog-panel";



export default function DataRowActions({ row, onEdit, onDelete }: any) {
    return (
        <div className="flex h-5 items-center space-x-2 text-sm">
            <Pencil
                size={24}
                className="cursor-pointer" />
            <Separator orientation="vertical" />
            <DeleteDialogPanel 
                onOk={() => onDelete(row.getValue('id'))}
                title={row.getValue("name")}
            >
                <Trash
                    size={24}
                    color="red"
                    className="cursor-pointer" />
            </DeleteDialogPanel>
        </div>
  )
}
