import apiClient from '@/configs/apiClient';
import { User, AuthToken } from '@/types/account';
import { Result } from '@/types/common';

const accountApis = {
    async login(params?: User) {
        const url = 'Account/Login';
        return apiClient.post<Result<AuthToken>>(url, { ...params }).then(result => result.data);
    },

};

export default accountApis;
