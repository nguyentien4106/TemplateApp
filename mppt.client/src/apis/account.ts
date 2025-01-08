import apiClient from '@/configs/apiClient';
import { User, AuthToken } from '@/types/account';

const accountApis = {
    login(params?: User) {
        const url = 'Account/Login';
        return apiClient.post<AuthToken>(url, { ...params });
    },

};

export default accountApis;
