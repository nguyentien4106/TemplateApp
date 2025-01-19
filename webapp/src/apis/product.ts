import apiClient from "@/configs/apiClient"
import { PRODUCT_PATH } from "@/constants/path"
import { Result } from "@/types/common"
import { Product } from "@/types/product"

export const productApis = {
    async getAll() {
        return await apiClient.get<Result<Product[]>>(PRODUCT_PATH.GET_ALL).then(res => res.data);
    },

    async delete(id: string){
        return await apiClient.delete<Result<Product>>(PRODUCT_PATH.DELETE + id).then(res => res.data)
    },
    
    async add(product: Product){
        return await apiClient.post<Result<Product>>(PRODUCT_PATH.INSERT, {...product}).then(res => res.data)
    }
}