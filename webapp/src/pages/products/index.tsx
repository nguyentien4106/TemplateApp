import { Product } from "@/types/product";
import { DataTable } from "@/components/data-table";
import { getProductColumns } from "./columns";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { productApis } from "@/apis/product";
import { useToast } from "@/hooks/use-toast";
import ErrorMessage from "@/components/error-message";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SheetCustomization } from "@/components/sheet-customization";
import { ProductForm } from "./components/product-form";

export default function DemoPage() {
    const [products, setProducts] = useState<Product[]>([])
    const toast = useToast()

    useEffect(() => {
        productApis.getAll().then(res => {
            console.log(res)
            if(res.succeed){
                setProducts(res.data)
            }
        })
    }, [])

    const onAdd = useCallback((product: Product) => {

    }, [])

    const onEdit = useCallback((productId: string) => {

    }, [])

    const onDelete = useCallback((productId : string) => {
        productApis.delete(productId).then(res => {
            if(res.succeed){
                toast.success({ description: 'Product deleted successfully' })
                setProducts(prev => prev.filter(p => p.id !== productId))
                return
            }
            toast.error({ description: <ErrorMessage message={res.message} /> })
        })
    }, [])

    const columns = useMemo(() => getProductColumns({ onDelete, onEdit }), [])

    const closeRef = useRef()

    return (
        <div className="container mx-auto py-10 space-y-4">
            <div className="flex justify-end">
                <SheetCustomization
                    title="Add New Product"
                    description="Create a new product. Click save when you're done."
                    content={<ProductForm setProducts={setProducts} closeRef={closeRef}/>}
                    closeRef={closeRef}
                >
                    <Button>Add New</Button>
                </SheetCustomization>
            </div>
            <DataTable columns={columns} data={products} />
        </div>
    );
}
