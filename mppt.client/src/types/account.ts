export interface User {
    email: string,
    password: string,
    userName: string
}

export interface AuthToken {
    token: string,
    refreshToken: number
}