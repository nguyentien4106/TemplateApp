import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { useLoading } from '@/hooks/use-loading'
import accountApis from '@/apis/account'
import { useToast } from '@/hooks/use-toast'
import ErrorMessage from '@/components/error-message'
import SuccessMessage from '@/components/success-message'

type ForgotFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: 'Please enter your email' })
        .email({ message: 'Invalid email address' }),
})

export function ForgotForm({ className, ...props }: ForgotFormProps) {
    const loading = useLoading()
    const toast = useToast()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: { email: '' },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        loading.show('Loading...')
        accountApis.forgotPassword(data.email).then(res => {
            loading.hide()
            if (res.succeed) {
                toast.success({
                    description: <SuccessMessage message='A password reset link has been sent to your email. Please check your email and reset your password.' />,
                })
            }
            else {
                toast.error({
                    description: <ErrorMessage message={res.message} />,
                })
            }
            console.log(res)
        })
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid gap-2'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder='name@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='mt-2' disabled={loading.isLoading}>
                            Continue
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
