import apiClient from '@/configs/apiClient';
import { User, AuthToken } from '@/types/account';
import { Result } from '@/types/common';
import { ACCOUNT_PATH } from '../constants/path'

const accountApis = {
    async login(params?: User) {
        return apiClient.post<Result<AuthToken>>(ACCOUNT_PATH.LOGIN, { ...params }).then(result => result.data);
    },

    async logout(){
        return await apiClient.post<Result<boolean>>(ACCOUNT_PATH.LOGOUT).then(result => result.data);
    },

    async forgotPassword(email: string) {
        return await apiClient.post<Result<boolean>>(ACCOUNT_PATH.FORGOT_PASSWORD + `?email=${email}`).then(result => result.data);
    },
    
    async resetPassword(user: User, token: string){
        return await apiClient.post<Result<boolean>>(ACCOUNT_PATH.RESET_PASSWORD, { ...user, token }).then(res => res.data)
    }

};

export default accountApis;
