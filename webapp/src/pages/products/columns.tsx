import { Product } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import dayjs from "dayjs";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
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
  },
];
