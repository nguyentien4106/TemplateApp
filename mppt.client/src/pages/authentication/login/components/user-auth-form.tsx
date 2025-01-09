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
import Cookies from 'js-cookie'
import { COOKIE_REFRESH_TOKEN_KEY, COOKIE_TOKEN_KEY } from '@/constants/cookie'
import { Loader, Loader2 } from 'lucide-react'
import { useLoading } from '@/hooks/use-loading'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
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
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState(false)
    const { error } = useToast()
    const navigate = useNavigate()
    const loading = useLoading()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        loading.show("")
        accountApis.login({ email: data.email, password: data.password }).then(res => {
            if(!res.succeed){
                error({
                    description: <ErrorMessage message={res.message} />,
                })
                return
            }
            Cookies.set(COOKIE_TOKEN_KEY, res.data.accessToken, { expires: 0.5 })
            Cookies.set(COOKIE_REFRESH_TOKEN_KEY, res.data.refreshToken, { expires: 1 })
            loading.hide()
            navigate("/")
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
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem className='space-y-1'>
                                    <div className='flex items-center justify-between'>
                                        <FormLabel>Password</FormLabel>
                                        <Link
                                            to='/forgot-password'
                                            className='text-sm font-medium text-muted-foreground hover:opacity-75'
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                    <FormControl>
                                        <PasswordInput placeholder='********' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className='mt-2' disabled={isLoading}>
                            Login
                        </Button>
                        <Button className='mt-2' disabled={isLoading} variant={'outline'}>
                            <Link to={'/sign-up'}>Sign Up</Link>
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

                        <div className='flex items-center gap-2'>
                            <Button
                                variant='outline'
                                className='w-full'
                                type='button'
                                disabled={isLoading}
                            >
                                <IconBrandGithub className='h-4 w-4' /> GitHub
                            </Button>
                            <Button
                                variant='outline'
                                className='w-full'
                                type='button'
                                disabled={isLoading}
                            >
                                <IconBrandFacebook className='h-4 w-4' /> Facebook
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
