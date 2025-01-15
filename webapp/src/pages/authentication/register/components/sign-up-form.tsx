import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { useLoading } from '@/hooks/use-loading'
import accountApis from '@/apis/account'
import { useToast } from '@/hooks/use-toast'
import SuccessMessage from '@/components/success-message'
import { useNavigate } from 'react-router-dom'
import ErrorMessage from '@/components/error-message'

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z
    .object({
        email: z
            .string()
            .min(1, { message: 'Please enter your email' })
            .email({ message: 'Invalid email address' }),
        password: z
            .string()
            .min(1, {
                message: 'Please enter your password',
            })
            .min(7, {
                message: 'Password must be at least 7 characters long',
            }),
        confirmPassword: z.string(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: "custom",
                message: "The passwords did not match",
                path: ['confirmPassword']
            });
        }
    });

export function SignUpForm({ className, ...props }: SignUpFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const loading = useLoading()
    const toast = useToast()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        loading.show()
        accountApis.register({ email: data.email, password: data.password }).then(res => {
            if(!res.succeed){
                toast.error({
                    description: <ErrorMessage message={res.message} />,
                })
                return
            }

            toast.success({
                description: <SuccessMessage message='You have successfully registered. Navigating to Login page.' />,
            })

            setTimeout(() => {
                navigate("/sign-in")
            }, 2000);

        }).finally(loading.hide)
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
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <FormLabel>Password</FormLabel>
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
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder='********' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='mt-2' disabled={isLoading}>
                            Create Account
                        </Button>

                        <div className='relative my-2'>
                            <div className='absolute inset-0 flex items-center'>
                                <span className='w-full border-t' />
                            </div>
                            <div className='relative flex justify-center text-xs uppercase'>
                                <span className='bg-background px-2 text-muted-foreground'>
                                    Or continue with
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
