import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X, Trash, Pencil } from "lucide-react";
import dayjs from "dayjs";
import DataRowActions from "./components/data-row-actions";


interface ProductColumnsProps{
    onEdit: (productId: string) => void;
    onDelete: (productId: string) => void;
}

export const getProductColumns = ({ onEdit, onDelete }: ProductColumnsProps): ColumnDef<Product>[] => [
    {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => {
            return <a>{row.getValue<string>("id").slice(0, 8)}</a>
        }
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "createdDate",
        header: "Created At",
        cell: ({ row }) => {
            const date = row.getValue<Date>("createdDate");
            return <div>{dayjs(date).format("DD-MM-YYYY")}</div>;
        },
    },
    {
        accessorKey: "isActive",
        header: "Active",
        cell: ({ row }) => {
            const amount = row.getValue("isActive");
            return amount ? <Check color="green" /> : <X color="red" />;
        },
    },
    {
        accessorKey: "ac",
        header: "Action",
        cell: ({ row }) => <DataRowActions row={row} onEdit={onEdit} onDelete={onDelete}/>
    },
];
