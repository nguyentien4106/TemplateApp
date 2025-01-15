import { Product } from "@/types/product";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

function getData(): Product[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      price: 100,
      isActive: true,
      name: "Product Name 1",
      description: "Product Name 1 Description",
      createdDate: new Date(),
    },
    {
      id: "728ed52f1",
      price: 100,
      isActive: false,
      name: "Product Name 1",
      description: "Product Name 1 Description",
      createdDate: new Date(),
    },
    {
      id: "728ed52f2",
      price: 100,
      isActive: true,
      name: "Product Name 1",
      description: "Product Name 1 Description",
      createdDate: new Date(),
    },
    {
      id: "728ed52f3",
      price: 100,
      isActive: false,
      name: "Product Name 1",
      description: "Product Name 1 Description",
      createdDate: new Date(),
    },
    {
      id: "728ed52f4",
      price: 100,
      isActive: true,
      name: "Product Name 1",
      description: "Product Name 1 Description",
      createdDate: new Date(),
    },
    // ...
  ];
}

export default function DemoPage() {
  const data = getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
