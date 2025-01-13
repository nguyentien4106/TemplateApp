import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
import { PasswordInput } from '@/components/password-input'
import { useLoading } from '@/hooks/use-loading'
import accountApis from '@/apis/account'
import { useToast } from '@/hooks/use-toast'
import ErrorMessage from '@/components/error-message'

type ResetPasswordFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
    password: z
        .string()
        .min(1, {
            message: 'Please enter your password',
        })
        .min(7, {
            message: 'Password must be at least 7 characters long',
        }),
    confirmPassword: z.string()
        .min(1, {
            message: 'Please enter your password',
        })
        .min(7, {
            message: 'Password must be at least 7 characters long',
        }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ['confirmPassword']
      });
    }
});

export function ResetPasswordForm({ className, ...props }: ResetPasswordFormProps) {
    const loading = useLoading()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const { error } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        loading.show("Loading...")
        // eslint-disable-next-line no-console
        console.log('model', { email: searchParams.get('email') ?? '', password: data.password }, searchParams.get("token") ?? '')
        accountApis.resetPassword({ email: searchParams.get('email') ?? '', password: data.password }, searchParams.get("token") ?? '').then(res => {
            console.log(res)
            if(!res.succeed){
                error({
                    description: <ErrorMessage message={res.message} />,
                })
                return
            }
            navigate("/sign-in")

        }).finally(() => loading.hide())
    }

    return (
        <div className={cn('grid gap-6', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='grid gap-2'>
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <div className='flex items-center justify-between'>
                                        <FormLabel>Password</FormLabel>
                                    </div>
                                    <FormControl>
                                        <PasswordInput placeholder='********' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <div className='flex items-center justify-between'>
                                        <FormLabel>Confirm Password</FormLabel>
                                    </div>
                                    <FormControl>
                                        <PasswordInput placeholder='********' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='mt-2' disabled={loading.isLoading}>
                            Update
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
