export interface User {
    email: string,
    password: string
}


export interface AuthToken {
    accessToken: string,
    refreshToken: string
}