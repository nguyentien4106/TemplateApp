"use client"

import {
    BadgeCheck,
    ChevronsUpDown,
    LogOut,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import accountApis from "@/apis/account"
import { useLoading } from "@/hooks/use-loading"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useAccountStore } from "@/stores/accountStore"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"
import { COOKIE_TOKEN_KEY } from "@/constants/cookie"
import { AuthUser } from "@/types/layout/common"

export function NavUser() {
    const { isMobile } = useSidebar()
    const loading = useLoading()
    const navigate = useNavigate()
    const { error } = useToast()
    const token = Cookies.get(COOKIE_TOKEN_KEY)
    let user = {}

    if(token) {
        user = jwtDecode<AuthUser>(token)
    }

    const logout = () => {
        loading.show("Loading")
        accountApis.logout().then(res => {
            loading.hide()
            if(!res.succeed){
                error({
                    title: "Error",
                    description: "Đăng xuất thất bại",
                })
                return
            }
            useAccountStore.getState().auth.reset()
            navigate("/sign-in")
        })
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                                <AvatarFallback className="rounded-lg">User</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user?.userName}</span>
                                <span className="truncate text-xs">{user?.userName}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={""} alt={user?.userName} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user?.userName}</span>
                                    <span className="truncate text-xs">{user?.userName}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {/* <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup> 
                        <DropdownMenuSeparator /> */}
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem> */}
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={logout}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
