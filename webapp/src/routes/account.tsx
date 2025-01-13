import Login from "@/pages/authentication/login/index"
import Register from "@/pages/authentication/register/index"
import ForgotPassword from "@/pages/authentication/forgot-password";
import ResetPassword from "@/pages/authentication/reset-password";

export const accountRoutes = [
    {
        path: '/sign-in',
        element: <Login />,
    },
    {
        path: '/sign-up',
        element: <Register />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />
    },
    {
        path: '/reset-password',
        element: <ResetPassword />
    }
]