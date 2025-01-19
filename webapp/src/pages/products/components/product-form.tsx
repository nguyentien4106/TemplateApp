import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import accountApis from '@/apis/account'
import { toast, useToast } from '@/hooks/use-toast'
import ErrorMessage from '@/components/error-message'
import { useLoading } from '@/hooks/use-loading'
import { jwtDecode } from 'jwt-decode';
import { useAccountStore } from '@/stores/accountStore'
import { AuthUser } from '@/types/layout/common'
import { Textarea } from '@/components/ui/textarea'
import Upload from '@/components/upload'
import { productApis } from '@/apis/product'
import { Checkbox } from '@/components/ui/checkbox'
import SuccessMessage from '@/components/success-message'
import { Product } from '@/types/product'
import axios from 'axios'
import { PRODUCT_PATH } from '@/constants/path'

type ProductFormProps = HTMLAttributes<HTMLDivElement> & {
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Please enter product\'s name '}),

    price: z
        .number()
        .min(1000, {
            message: 'Price must be greater than 1000',
        }),
    description: z.string(),
    isActive: z.boolean().default(true)
})

export function ProductForm({ className, setProducts, closeRef, ...props }: ProductFormProps) {
    const toast = useToast()
    const [files, setFiles] = useState<File[]>([])
    const loading = useLoading()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            price: 1000,
            description: '',
            isActive: true
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        loading.show()
        const params = { ...data, createdDate: new Date()}
        productApis.add(params).then(res => {
            closeRef.current.click();
            if(res.succeed){
                toast.success({
                    description: <SuccessMessage message='Add new product successfully.'></SuccessMessage>
                })

                setProducts(prev => [res.data, ...prev])
                return
            }

            toast.error({
                description: <ErrorMessage message={res.message}/>
            })
        }).finally(() => {
            loading.hide()
            
        })
        // console.log(params)
        // axios.post('http://localhost:5087/api/'+ PRODUCT_PATH.INSERT, params, {headers: {
        //     'Content-Type': 'application/json'
        //   }}).then(res => console.log(res))
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid gap-2'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <FormLabel>Images</FormLabel>
                                    <Upload files={files} setFiles={setFiles}/>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder='Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='price'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input type='number' placeholder='Price' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder='Description' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='isActive'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <FormLabel>Is Active ? </FormLabel>
                                    <FormControl>
                                        <Checkbox />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='mt-2' disabled={loading.isLoading} hidden={true}>
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
