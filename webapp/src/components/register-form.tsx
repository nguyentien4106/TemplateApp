import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { LoadingSpinner } from "./loading-spinner"

export function RegisterForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const navigate = useNavigate()
    const { toast } = useToast()

    const signup = () => {
        // navigate("/dashboard")
        console.log('click ')
        toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: (
                <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
        })
    }
    
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Button onClick={signup}>
                Toast
            </Button>
            <LoadingSpinner></LoadingSpinner>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">MPPT System</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="username">Username</Label>
                                </div>
                                <Input required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="phone">Phone</Label>
                                </div>
                                <Input required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" type="password" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="re-password">Re-password</Label>
                                </div>
                                <Input type="password" required />
                            </div>

                            <Button type="submit" className="w-full" onClick={signup}>
                                Sign Up
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
