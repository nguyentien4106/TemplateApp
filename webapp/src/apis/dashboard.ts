import apiClient from '@/configs/apiClient';
import { AUTH_PATH } from '../constants/path'

const dashboardApis = {
    async getProfile() {
        return apiClient.post<string>(AUTH_PATH.PROFILE).then(result => result.data);
    },
};

export default dashboardApis;