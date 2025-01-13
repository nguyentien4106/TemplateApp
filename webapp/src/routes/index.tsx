import AppLayout from "@/layouts/AppLayout";
import ErrorPage from "@/pages/ErrorPage";
import { accountRoutes } from "./account";
import DashBoard from "@/pages/dashboard/index"
import { Protected } from "@/layouts/Protected";

const router = [
    {
        path: '/',
        element: <AppLayout></AppLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [ { path: "/dashboard", element: <Protected><DashBoard /></Protected>, index: true }]
    },
    ...accountRoutes
]

export default router;