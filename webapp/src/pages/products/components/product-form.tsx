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
import { useToast } from '@/hooks/use-toast'
import ErrorMessage from '@/components/error-message'
import { useLoading } from '@/hooks/use-loading'
import { jwtDecode } from 'jwt-decode';
import { useAccountStore } from '@/stores/accountStore'
import { AuthUser } from '@/types/layout/common'
import { Textarea } from '@/components/ui/textarea'
import Upload from '@/components/upload'

type ProductFormProps = HTMLAttributes<HTMLDivElement>

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

export function ProductForm({ className, ...props }: ProductFormProps) {
    const { error } = useToast()
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
                        <Button className='mt-2' disabled={loading.isLoading}>
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
