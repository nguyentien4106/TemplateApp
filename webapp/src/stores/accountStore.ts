import { COOKIE_REFRESH_TOKEN_KEY, COOKIE_TOKEN_KEY } from '@/constants/cookie'
import Cookies from 'js-cookie'
import { create } from 'zustand'
import { AuthUser } from '@/types/layout/common'
const ROLE = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"

// interface AuthUser {
//     aud: string
//     exp: number,
//     id: string
//     iss: string
//     userName: string
//     email: string
// }

interface AuthState {
    auth: {
        user: AuthUser | null
        setUser: (user: AuthUser | null) => void
        accessToken: string
        setAccessToken: (accessToken: string) => void
        resetAccessToken: () => void
        reset: () => void
        refreshToken: string
        setRefreshToken: (refreshToken: string) => void
    }
}

export const useAccountStore = create<AuthState>()((set) => {
    const initAccessToken = Cookies.get(COOKIE_TOKEN_KEY) ?? ""
    const initRefreshToken = Cookies.get(COOKIE_REFRESH_TOKEN_KEY) ?? ""

    return {
        auth: {
            user: null,
            setUser: (user) =>
                set((state) => ({ ...state, auth: { ...state.auth, user } })),
            accessToken: initAccessToken,
            setAccessToken: (accessToken) =>
                set((state) => {
                    Cookies.set(COOKIE_TOKEN_KEY, accessToken, { expires: 0.5 })
                    return { ...state, auth: { ...state.auth, accessToken } }
                }),
            resetAccessToken: () =>
                set((state) => {
                    Cookies.remove(COOKIE_TOKEN_KEY)
                    return { ...state, auth: { ...state.auth, accessToken: '' } }
                }),
            reset: () =>
                set((state) => {
                    Cookies.remove(COOKIE_TOKEN_KEY)
                    Cookies.remove(COOKIE_REFRESH_TOKEN_KEY)
                    return {
                        ...state,
                        auth: { ...state.auth, user: null, accessToken: '', refreshToken: '' },
                    }
                }),
            refreshToken: initRefreshToken,
            setRefreshToken: (refreshToken) =>
                set((state) => {
                    Cookies.set(COOKIE_REFRESH_TOKEN_KEY, refreshToken, { expires: 1 })
                    return { ...state, auth: { ...state.auth, refreshToken } }
                }),
        },
    }
})

// export const useAuth = () => useAuthStore((state) => state.auth)
