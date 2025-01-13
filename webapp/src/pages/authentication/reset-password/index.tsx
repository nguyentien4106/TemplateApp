import { Card } from '@/components/ui/card'
import AuthLayout from '../auth-layout'
import { ResetPasswordForm } from './components/reset-password-form'

export default function ResetPassword() {
  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='flex flex-col space-y-2 text-left'>
          <h1 className='text-2xl font-semibold tracking-tight'>Reset Your Password</h1>
          <p className='text-sm text-muted-foreground mb-2'>
            Enter your new password below 
            to update your password
          </p>
        </div>
        <ResetPasswordForm />
      </Card>
    </AuthLayout>
  )
}
