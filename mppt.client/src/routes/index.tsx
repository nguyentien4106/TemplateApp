import AppLayout from "@/layouts/AppLayout";
import ErrorPage from "@/pages/ErrorPage";
import { accountRoutes } from "./account";

const router = [
    {
        path: '/',
        element: <AppLayout></AppLayout>,
        errorElement: <ErrorPage></ErrorPage>,
    },
    ...accountRoutes
]

export default router;