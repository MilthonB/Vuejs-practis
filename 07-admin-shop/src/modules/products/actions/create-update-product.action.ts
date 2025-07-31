import { tesloApi } from "@/api/tesloApi";
import type { Product } from "../interfaces/product.interface";


// partial Para volver toooodo opcion
export const createUpdateProductAction = async(product: Partial<Product>) => {

    const productId = product.id;

    console.log(product.images)
    const newImages = await uploadImages(product.images ?? []);
    product.images = newImages;

    product = cleanProductForCreateUpdate(product);

    


    if(productId && productId !== ''){
        return await uupdateProduct(productId!,product);
    }

    return await createProduct(product);
    

}

const uupdateProduct = async (productId:string, product:Partial<Product>) =>{
        

    try {
        
        const {data} = await tesloApi.patch<Product>(`/products/${productId}`, product);
        return data;
    } catch (error) {

        console.log(error);
        throw new Error('Error updating product');
        
    }

}


const cleanProductForCreateUpdate = ( product: Partial<Product>)=>{
const imagees: string[] =  product.images?.map(image => {
        if(image.startsWith('http')){
            const imageName =  image.split('/').pop();
            return imageName ? image : ''
        }

        return image;
    }) ?? [];



    delete product.id;
    delete product.user;

    product.images =  imagees;


    return product;
}


const createProduct = async (product:Partial<Product>) =>{

    

    try {
        
        const { data } = await tesloApi.post<Product>(`/products`, product);
        
        return data;
    } catch (error) {

        console.log(error);
        throw new Error('Error creating product');
        
    }

}



const uploadImages = async( images: (string|File)[]) =>{


    const  filestoUupload = images.filter(image => image instanceof File) as File[];
    const  currentImages = images.filter(image => typeof image === 'string') as string[];

        const uploadPromose = filestoUupload.map(async(file) =>{
            try {
        const formData = new FormData();
        formData.append('file', file);
        const {data} = await tesloApi.post<{secureUrl:string}>('/files/product', formData);

        return data.secureUrl;
    } catch (error) {
        console.log(error)
        throw new Error('Error uploading image')
    }
        });


        const uploadedImages = await Promise.all(uploadPromose);

        return [...currentImages, ...uploadedImages];
    

}