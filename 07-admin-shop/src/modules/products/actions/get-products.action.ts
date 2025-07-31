import { tesloApi } from "@/api/tesloApi"
import type { Product } from "../interfaces/product.interface";
import { getProductImageAction } from "./get-products-image.actions";


export const getProducutos= async ( page: number = 1, limit:number = 10  ) =>{

    try {

        const { data } = await tesloApi.get<Product[]>(`/products?limit=${limit}&offset=${(page-1) * limit}`);

        const res = data.map(product => ({
            ...product,
            images: product.images.map(getProductImageAction)
        }));

        

        return res
    } catch (error) {
        throw new Error('Error getting products')
    }

}





