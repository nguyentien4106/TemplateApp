import apiClient from '@/configs/apiClient';
import { User, AuthToken } from '@/types/account';
import { Result } from '@/types/common';
import { AUTH_PATH } from '../constants/path'

const accountApis = {
    async login(params?: User) {
        return apiClient.post<Result<AuthToken>>(AUTH_PATH.LOGIN, { ...params }).then(result => result.data);
    },

    async logout(){
        return await apiClient.post<Result<boolean>>(AUTH_PATH.LOGOUT).then(result => result.data);
    },

    async forgotPassword(email: string) {
        return await apiClient.post<Result<boolean>>(AUTH_PATH.FORGOT_PASSWORD + `?email=${email}`).then(result => result.data);
    },
    
    async resetPassword(user: User, token: string){
        return await apiClient.post<Result<boolean>>(AUTH_PATH.RESET_PASSWORD, { ...user, token }).then(res => res.data)
    },

    async refreshToken(params: AuthToken){
        return await apiClient.post<Result<AuthToken>>(AUTH_PATH.REFRESH_TOKEN, { ...params }).then(res => res.data)
    },

    async register(params: User){
        return apiClient.post<Result<AuthToken>>(AUTH_PATH.REGISTER, { ...params }).then(result => result.data);
    }
};

export default accountApis;
