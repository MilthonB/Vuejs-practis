import { tesloApi } from "@/api/tesloApi"
import type { Product } from "../interfaces/product.interface"
import { getProductImageAction } from "./get-products-image.actions"



export const getProductById = async(productId: string): Promise<Product>=> {

    if(productId === 'create') {
        return{
            id:'',
            description:'',
            slug:'',
            price:0,
            stock:0,
            images:[],
            tags:[],
            sizes:[],
            gender:'' as any,
            user:[] as any,
            title:''
        }
    }


    try {
        const {data} =  await tesloApi.get<Product>(`/products/${productId}`)

        return  {
            ...data,
            images: data.images.map(getProductImageAction)
        }
    } catch (error) {
        console.log(error)
        throw new Error(`Error getttin praduct by id${productId}`)
    }
}


