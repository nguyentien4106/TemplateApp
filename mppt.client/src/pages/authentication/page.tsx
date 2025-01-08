import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { RegisterForm } from "@/components/register-form"
import { LoginForm } from "@/components/login-form"
import { useState } from "react"

export default function Authentication() {
    return (
        <div className="w-full h-full flex justify-center align-center">
            <Tabs defaultValue='login' className="w-[30%] content-center" orientation="vertical">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <LoginForm /> 
                </TabsContent>
                <TabsContent value="register">
                    <RegisterForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}
